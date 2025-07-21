import { API_CONFIG } from "../constants/apiConstants";
import { FormApiService } from "./formApiService";
import { LocationApiService } from "./locationApiService";

// Debug environment variables (only in development)
if (import.meta.env.DEV) {
  console.log("Environment Variables Debug:", {
    API_BASE_URL: API_CONFIG.BASE_URL,
    PROVINCES_API_URL: API_CONFIG.PROVINCES_URL,
    CLIENT_ID: API_CONFIG.CLIENT_ID,
    OS_ID: API_CONFIG.OS_ID,
    API_TIMEOUT: API_CONFIG.TIMEOUT,
    PROVINCES_API_TIMEOUT: API_CONFIG.PROVINCES_TIMEOUT,
    allEnv: import.meta.env,
  });
}

// Main API service class that combines all services
class ApiService {
  constructor() {
    this.formService = new FormApiService();
    this.locationService = new LocationApiService();
  }

  // Form-related methods
  async submitForm(formData, cvFile) {
    return this.formService.submitForm(formData, cvFile);
  }

  async uploadFile(file) {
    return this.formService.uploadFile(file);
  }

  // Location-related methods
  async getProvinces() {
    return this.locationService.getProvinces();
  }

  async getDistricts(provinceId) {
    return this.locationService.getDistricts(provinceId);
  }

  // Utility methods
  getConfig() {
    return {
      baseUrl: API_CONFIG.BASE_URL,
      provincesUrl: API_CONFIG.PROVINCES_URL,
      timeout: API_CONFIG.TIMEOUT,
      provincesTimeout: API_CONFIG.PROVINCES_TIMEOUT,
    };
  }

  isDevelopment() {
    return import.meta.env.DEV;
  }
}

// Singleton instance
const apiService = new ApiService();

export default apiService;
