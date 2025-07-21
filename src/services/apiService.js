import axios from "axios";

// Environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PROVINCES_API_URL = import.meta.env.VITE_PROVINCES_API_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const OS_ID = import.meta.env.VITE_OS_ID;
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT);
const PROVINCES_API_TIMEOUT = parseInt(
  import.meta.env.VITE_PROVINCES_API_TIMEOUT
);

// HTTP status code error messages
// Örnek olarak eklenmiştir değişkenlik gösterebilir
// Bu mesajlar API'den dönen hata mesajları ile değiştirilebilir
const HTTP_ERROR_MESSAGES = {
  400: "Geçersiz veri formatı. Lütfen form alanlarını kontrol edin.",
  401: "Yetkilendirme hatası. Lütfen tekrar giriş yapın.",
  403: "Bu işlem için yetkiniz bulunmamaktadır.",
  404: "API endpoint bulunamadı.",
  409: "Bu kayıt zaten mevcut.",
  422: "Gönderilen veriler geçersiz.",
  429: "Çok fazla istek gönderildi. Lütfen biraz bekleyin.",
  500: "Sunucu hatası. Lütfen daha sonra tekrar deneyin.",
  502: "Sunucu geçici olarak kullanılamıyor.",
  503: "Servis geçici olarak kullanılamıyor.",
  504: "Sunucu yanıt vermiyor.",
};

// Response formatter utility
class ResponseFormatter {
  static success(
    data,
    title = "Başarılı",
    message = "İşlem başarıyla tamamlandı!"
  ) {
    return {
      success: true,
      status: 200,
      title,
      message,
      data: data || null,
    };
  }

  static error(
    status = 500,
    title = "Hata",
    message = "Bir hata oluştu.",
    data = null
  ) {
    return {
      success: false,
      status,
      title,
      message,
      data,
    };
  }

  static fromApiResponse(
    response,
    defaultTitle = "Başarılı",
    defaultMessage = "İşlem başarıyla tamamlandı!"
  ) {
    if (response.data && typeof response.data === "object") {
      return {
        success: true,
        status: response.status,
        title: response.data.title || defaultTitle,
        message: response.data.message || defaultMessage,
        data: response.data.data || response.data || null,
      };
    }

    return {
      success: true,
      status: response.status,
      title: defaultTitle,
      message: defaultMessage,
      data: response.data || null,
    };
  }

  static fromError(error, defaultTitle = "Hata") {
    if (error.response) {
      const { status, data } = error.response;
      const message =
        data?.message ||
        HTTP_ERROR_MESSAGES[status] ||
        "Bilinmeyen bir hata oluştu.";

      return {
        success: false,
        status,
        title: data?.title || defaultTitle,
        message,
        data: data?.data || null,
      };
    }

    if (error.request) {
      return {
        success: false,
        status: 0,
        title: "Bağlantı Hatası",
        message: "Ağ bağlantısı hatası. İnternet bağlantınızı kontrol edin.",
        data: null,
      };
    }

    return {
      success: false,
      status: 500,
      title: defaultTitle,
      message: "Bilinmeyen bir hata oluştu.",
      data: null,
    };
  }
}

// Form data transformer
class FormDataTransformer {
  static transform(formData, cvFile) {
    return {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      telephone: formData.phone
        ? `+90${formData.phone.replace(/\D/g, "")}`
        : "",
      linkedinUrl: formData.linkedin || "",
      cv: cvFile ? cvFile.name : "",
      salaryExpectation: formData.salary
        ? parseInt(formData.salary.replace(/,/g, ""))
        : 0,
      createdDate: new Date().toISOString(),
      province: formData.city || "",
      district: formData.district || "",
      address: formData.address || "",
      eMail: formData.email || "",
    };
  }
}

// API service class
class ApiService {
  constructor() {
    this.mainApi = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.provincesApi = axios.create({
      timeout: PROVINCES_API_TIMEOUT,
      headers: {
        "client-id": CLIENT_ID,
        "os-id": OS_ID,
      },
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor
    this.mainApi.interceptors.request.use(
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
    this.mainApi.interceptors.response.use(
      (response) => {
        console.log("API Response:", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
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

  async submitForm(formData, cvFile) {
    try {
      const transformedData = FormDataTransformer.transform(formData, cvFile);
      console.log("Transformed data:", transformedData);

      const response = await this.mainApi.post("", transformedData);
      return ResponseFormatter.fromApiResponse(
        response,
        "Başarılı",
        "Başvurunuz başarıyla gönderildi!"
      );
    } catch (error) {
      console.error("Form submission error:", error);
      return ResponseFormatter.fromError(error, "Başvuru Hatası");
    }
  }

  async getProvinces() {
    try {
      const response = await this.provincesApi.post(PROVINCES_API_URL, {});

      if (response.data?.success) {
        return ResponseFormatter.success(
          response.data.data || [],
          "Başarılı",
          response.data.message || "İller başarıyla getirildi."
        );
      }

      return ResponseFormatter.error(
        400,
        "Hata",
        response.data?.message || "İl listesi alınamadı.",
        []
      );
    } catch (error) {
      console.error("Provinces API Error:", error);
      return ResponseFormatter.fromError(error, "İl Listesi Hatası");
    }
  }

  async getDistricts(provinceId) {
    try {
      const response = await this.provincesApi.post(PROVINCES_API_URL, {
        provincesId: provinceId,
      });

      if (response.data?.success) {
        return ResponseFormatter.success(
          response.data.data || [],
          "Başarılı",
          response.data.message || "İlçeler başarıyla getirildi."
        );
      }

      return ResponseFormatter.error(
        400,
        "Hata",
        response.data?.message || "İlçe listesi alınamadı.",
        []
      );
    } catch (error) {
      console.error("Districts API Error:", error);
      return ResponseFormatter.fromError(error, "İlçe Listesi Hatası");
    }
  }

  async uploadFile(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await this.mainApi.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return ResponseFormatter.fromApiResponse(
        response,
        "Başarılı",
        "Dosya başarıyla yüklendi!"
      );
    } catch (error) {
      console.error("File upload error:", error);
      return ResponseFormatter.fromError(error, "Dosya Yükleme Hatası");
    }
  }
}

// Singleton instance
const apiService = new ApiService();

export default apiService;
