// Environment variables with production fallbacks
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  PROVINCES_URL: import.meta.env.VITE_PROVINCES_API_URL,
  CLIENT_ID: import.meta.env.VITE_CLIENT_ID,
  OS_ID: import.meta.env.VITE_OS_ID,
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT),
  PROVINCES_TIMEOUT: parseInt(import.meta.env.VITE_PROVINCES_API_TIMEOUT),
};

// HTTP status code error messages
export const HTTP_ERROR_MESSAGES = {
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

// Default response messages
export const DEFAULT_MESSAGES = {
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

// API Headers
export const API_HEADERS = {
  JSON: {
    "Content-Type": "application/json",
  },
  FORM_DATA: {
    "Content-Type": "multipart/form-data",
  },
  PROVINCES: {
    "client-id": API_CONFIG.CLIENT_ID,
    "os-id": API_CONFIG.OS_ID,
  },
};
