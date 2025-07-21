// src/services/apiService.js
import axios from "axios";

// Default messages
const DEFAULT_MESSAGES = {
  SUCCESS: "İşlem başarıyla tamamlandı!",
  ERROR: "Bir hata oluştu.",
  UNKNOWN_ERROR: "Bilinmeyen bir hata oluştu.",
  NETWORK_ERROR: "Ağ bağlantısı hatası. İnternet bağlantınızı kontrol edin.",
  FORM_SUCCESS: "Başvurunuz başarıyla gönderildi!",
  FILE_SUCCESS: "Dosya başarıyla yüklendi!",
  PROVINCES_SUCCESS: "İller başarıyla getirildi.",
  DISTRICTS_SUCCESS: "İlçeler başarıyla getirildi.",
  PROVINCES_ERROR: "İl listesi alınamadı.",
  DISTRICTS_ERROR: "İlçe listesi alınamadı.",
  PROVINCES_LOAD_ERROR: "İl listesi alınırken bir hata oluştu.",
  DISTRICTS_LOAD_ERROR: "İlçe listesi alınırken bir hata oluştu.",
  FORM_ERROR: "Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
  FILE_ERROR: "Dosya yüklenirken bir hata oluştu.",
};

// Environment variables
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  PROVINCES_URL: import.meta.env.VITE_PROVINCES_API_URL,
  CLIENT_ID: import.meta.env.VITE_CLIENT_ID,
  OS_ID: import.meta.env.VITE_OS_ID,
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT),
  PROVINCES_TIMEOUT: Number(import.meta.env.VITE_PROVINCES_API_TIMEOUT),
};

// Debug environment variables
if (import.meta.env.DEV) {
  console.log("Environment Variables Debug:", API_CONFIG);
}

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.API_TIMEOUT,
  headers: { "Content-Type": "application/json" },
});

// Provinces API client
const provincesApi = axios.create({
  timeout: API_CONFIG.PROVINCES_TIMEOUT,
  headers: {
    "client-id": API_CONFIG.CLIENT_ID,
    "os-id": API_CONFIG.OS_ID,
  },
});

// Form data transformer
const transformFormData = (formData, cvFile) => {
  return {
    firstName: formData.firstName || "",
    lastName: formData.lastName || "",
    telephone: formData.phone ? `+90${formData.phone.replace(/\D/g, "")}` : "",
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
};

export const submitForm = async (formData, cvFile) => {
  try {
    const transformedData = transformFormData(formData, cvFile);

    if (import.meta.env.DEV) {
      console.log("Submitting form data:", transformedData);
    }

    const response = await api.post("/", transformedData);

    return {
      success: true,
      data: response.data,
      message: response.data?.message || DEFAULT_MESSAGES.FORM_SUCCESS,
    };
  } catch (err) {
    console.error("Form submission error:", err);
    return {
      success: false,
      data: null,
      message: err.response?.data?.message || DEFAULT_MESSAGES.FORM_ERROR,
    };
  }
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "File upload error" };
  }
};

export const getProvinces = async () => {
  try {
    if (import.meta.env.DEV) {
      console.log("Calling provinces API:", API_CONFIG.PROVINCES_URL);
      console.log("Headers:", provincesApi.defaults.headers);
    }

    const response = await provincesApi.post(API_CONFIG.PROVINCES_URL, {});

    if (response.data?.success) {
      return {
        success: true,
        data: response.data.data || [],
        message: response.data.message || DEFAULT_MESSAGES.PROVINCES_SUCCESS,
      };
    }

    return {
      success: false,
      data: [],
      message: response.data?.message || DEFAULT_MESSAGES.PROVINCES_ERROR,
    };
  } catch (error) {
    console.error("Provinces API Error:", error);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: API_CONFIG.PROVINCES_URL,
    });

    return {
      success: false,
      data: [],
      message: DEFAULT_MESSAGES.PROVINCES_LOAD_ERROR,
    };
  }
};

export const getDistricts = async (provinceId) => {
  try {
    if (import.meta.env.DEV) {
      console.log(
        "Calling districts API:",
        API_CONFIG.PROVINCES_URL,
        "for province:",
        provinceId
      );
    }

    const response = await provincesApi.post(API_CONFIG.PROVINCES_URL, {
      provincesId: provinceId,
    });

    if (response.data?.success) {
      return {
        success: true,
        data: response.data.data || [],
        message: response.data.message || DEFAULT_MESSAGES.DISTRICTS_SUCCESS,
      };
    }

    return {
      success: false,
      data: [],
      message: response.data?.message || DEFAULT_MESSAGES.DISTRICTS_ERROR,
    };
  } catch (error) {
    console.error("Districts API Error:", error);

    return {
      success: false,
      data: [],
      message: DEFAULT_MESSAGES.DISTRICTS_LOAD_ERROR,
    };
  }
};
