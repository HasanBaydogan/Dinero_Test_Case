import axios from "axios";

// Environment variables
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://test.com.tr/api/test/case";
const PROVINCES_API_URL =
  import.meta.env.VITE_PROVINCES_API_URL ||
  "https://api.aidath.com/api/v1/global/public/getprovincesordistricts";
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || "2";
const OS_ID = import.meta.env.VITE_OS_ID || "2";
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000;
const PROVINCES_API_TIMEOUT =
  parseInt(import.meta.env.VITE_PROVINCES_API_TIMEOUT) || 10000;

// API service class
class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT, // Environment variable timeout
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        console.log("API Request:", config);
        return config;
      },
      (error) => {
        console.error("API Request Error:", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => {
        console.log("API Response:", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          headers: response.headers,
        });
        return response;
      },
      (error) => {
        console.error("API Response Error:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message,
        });
        return Promise.reject(error);
      }
    );
  }

  // Form verilerini API formatına dönüştür
  transformFormData(formData, cvFile) {
    const transformedData = {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      telephone: formData.phone
        ? `+90${formData.phone.replace(/\D/g, "")}`
        : "",
      linkedinUrl: formData.linkedin || "",
      cv: cvFile ? cvFile.name : "", // Gerçek uygulamada dosya upload URL'i olacak
      salaryExpectation: formData.salary
        ? parseInt(formData.salary.replace(/,/g, ""))
        : 0,
      createdDate: new Date().toISOString(),
      province: formData.city || "",
      district: formData.district || "",
      address: formData.address || "",
      eMail: formData.email || "",
    };

    return transformedData;
  }

  // Form verilerini API'ye gönder
  async submitForm(formData, cvFile) {
    try {
      const transformedData = this.transformFormData(formData, cvFile);

      console.log("Transformed data:", transformedData);

      const response = await this.api.post("", transformedData);

      // API'den gelen response'u kontrol et
      let successResponse;

      if (response.data && typeof response.data === "object") {
        // API'den gelen format varsa kullan
        successResponse = {
          status: response.status,
          title: response.data.title || "Başarılı",
          message: response.data.message || "Başvurunuz başarıyla gönderildi!",
          data: response.data.data || response.data || null,
        };
      } else {
        // Varsayılan format
        successResponse = {
          status: response.status,
          title: "Başarılı",
          message: "Başvurunuz başarıyla gönderildi!",
          data: response.data || null,
        };
      }

      console.log("Success response:", successResponse);
      return {
        success: true,
        ...successResponse,
      };
    } catch (error) {
      console.error("Form submission error:", error);

      // Başarısız response formatı
      let errorResponse = {
        status: 500,
        title: "Hata",
        message:
          "Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
        data: null,
      };

      if (error.response) {
        // Server error response
        const status = error.response.status;
        const data = error.response.data;

        // API'den gelen hata mesajlarını kullan
        if (data && typeof data === "object") {
          errorResponse = {
            status: status,
            title: data.title || "Hata",
            message: data.message || this.getDefaultErrorMessage(status),
            data: data.data || null,
          };
        } else {
          // Standart HTTP hata mesajları
          errorResponse = {
            status: status,
            title: "Hata",
            message: this.getDefaultErrorMessage(status),
            data: data || null,
          };
        }
      } else if (error.request) {
        // Network error
        errorResponse = {
          status: 0,
          title: "Bağlantı Hatası",
          message: "Ağ bağlantısı hatası. İnternet bağlantınızı kontrol edin.",
          data: null,
        };
      }

      console.log("Error response:", errorResponse);
      return {
        success: false,
        ...errorResponse,
        details: error,
      };
    }
  }

  // HTTP durum kodlarına göre varsayılan hata mesajları
  getDefaultErrorMessage(status) {
    switch (status) {
      case 400:
        return "Geçersiz veri formatı. Lütfen form alanlarını kontrol edin.";
      case 401:
        return "Yetkilendirme hatası. Lütfen tekrar giriş yapın.";
      case 403:
        return "Bu işlem için yetkiniz bulunmamaktadır.";
      case 404:
        return "API endpoint bulunamadı.";
      case 409:
        return "Bu kayıt zaten mevcut.";
      case 422:
        return "Gönderilen veriler geçersiz.";
      case 429:
        return "Çok fazla istek gönderildi. Lütfen biraz bekleyin.";
      case 500:
        return "Sunucu hatası. Lütfen daha sonra tekrar deneyin.";
      case 502:
        return "Sunucu geçici olarak kullanılamıyor.";
      case 503:
        return "Servis geçici olarak kullanılamıyor.";
      case 504:
        return "Sunucu yanıt vermiyor.";
      default:
        return "Bilinmeyen bir hata oluştu.";
    }
  }

  // İl listesini getir
  async getProvinces() {
    try {
      const response = await axios.post(
        PROVINCES_API_URL,
        {},
        {
          timeout: PROVINCES_API_TIMEOUT, // Environment variable timeout
          headers: {
            "client-id": CLIENT_ID,
            "os-id": OS_ID,
          },
        }
      );

      console.log("Provinces API Response:", response.data);

      if (response.data && response.data.success) {
        return {
          success: true,
          data: response.data.data || [],
          message: response.data.message || "İller başarıyla getirildi.",
        };
      } else {
        return {
          success: false,
          data: [],
          message: response.data?.message || "İl listesi alınamadı.",
        };
      }
    } catch (error) {
      console.error("Provinces API Error:", error);

      let errorMessage = "İl listesi alınırken bir hata oluştu.";

      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage =
          "Ağ bağlantısı hatası. İnternet bağlantınızı kontrol edin.";
      }

      return {
        success: false,
        data: [],
        message: errorMessage,
        details: error,
      };
    }
  }

  // İlçe listesini getir
  async getDistricts(provinceId) {
    try {
      const response = await axios.post(
        PROVINCES_API_URL,
        {
          provincesId: provinceId,
        },
        {
          timeout: PROVINCES_API_TIMEOUT, // Environment variable timeout
          headers: {
            "client-id": CLIENT_ID,
            "os-id": OS_ID,
          },
        }
      );

      console.log("Districts API Response:", response.data);

      if (response.data && response.data.success) {
        return {
          success: true,
          data: response.data.data || [],
          message: response.data.message || "İlçeler başarıyla getirildi.",
        };
      } else {
        return {
          success: false,
          data: [],
          message: response.data?.message || "İlçe listesi alınamadı.",
        };
      }
    } catch (error) {
      console.error("Districts API Error:", error);

      let errorMessage = "İlçe listesi alınırken bir hata oluştu.";

      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage =
          "Ağ bağlantısı hatası. İnternet bağlantınızı kontrol edin.";
      }

      return {
        success: false,
        data: [],
        message: errorMessage,
        details: error,
      };
    }
  }

  // Dosya upload fonksiyonu (gelecekte kullanılabilir)
  async uploadFile(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await this.api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Başarılı response formatı
      const successResponse = {
        status: response.status,
        title: "Başarılı",
        message: "Dosya başarıyla yüklendi!",
        data: response.data || null,
      };

      console.log("File upload success response:", successResponse);
      return {
        success: true,
        ...successResponse,
      };
    } catch (error) {
      console.error("File upload error:", error);

      // Başarısız response formatı
      let errorResponse = {
        status: 500,
        title: "Dosya Yükleme Hatası",
        message: "Dosya yüklenirken bir hata oluştu.",
        data: null,
      };

      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        if (data && typeof data === "object") {
          errorResponse = {
            status: status,
            title: data.title || "Dosya Yükleme Hatası",
            message: data.message || this.getDefaultErrorMessage(status),
            data: data.data || null,
          };
        } else {
          errorResponse = {
            status: status,
            title: "Dosya Yükleme Hatası",
            message: this.getDefaultErrorMessage(status),
            data: data || null,
          };
        }
      } else if (error.request) {
        errorResponse = {
          status: 0,
          title: "Bağlantı Hatası",
          message: "Ağ bağlantısı hatası. İnternet bağlantınızı kontrol edin.",
          data: null,
        };
      }

      console.log("File upload error response:", errorResponse);
      return {
        success: false,
        ...errorResponse,
        details: error,
      };
    }
  }
}

// Singleton instance
const apiService = new ApiService();

export default apiService;
