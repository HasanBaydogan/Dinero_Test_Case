import { ProvincesApiClient } from "./clients/provincesApiClient";
import { ResponseFormatter } from "../utils/responseFormatter";
import { DEFAULT_MESSAGES } from "../constants/apiConstants";

export class LocationApiService {
  constructor() {
    this.client = new ProvincesApiClient();
  }

  async getProvinces() {
    try {
      const response = await this.client.getProvinces();

      if (import.meta.env.DEV) {
        console.log("Provinces API Response:", response.data);
      }

      if (response.data?.success) {
        return ResponseFormatter.success(
          response.data.data || [],
          "Başarılı",
          response.data.message || DEFAULT_MESSAGES.PROVINCES_SUCCESS
        );
      }

      return ResponseFormatter.error(
        400,
        "Hata",
        response.data?.message || DEFAULT_MESSAGES.PROVINCES_ERROR,
        []
      );
    } catch (error) {
      console.error("Provinces API Error:", error);
      return ResponseFormatter.fromError(error, "İl Listesi Hatası");
    }
  }

  async getDistricts(provinceId) {
    try {
      const response = await this.client.getDistricts(provinceId);

      if (import.meta.env.DEV) {
        console.log("Districts API Response:", response.data);
      }

      if (response.data?.success) {
        return ResponseFormatter.success(
          response.data.data || [],
          "Başarılı",
          response.data.message || DEFAULT_MESSAGES.DISTRICTS_SUCCESS
        );
      }

      return ResponseFormatter.error(
        400,
        "Hata",
        response.data?.message || DEFAULT_MESSAGES.DISTRICTS_ERROR,
        []
      );
    } catch (error) {
      console.error("Districts API Error:", error);
      return ResponseFormatter.fromError(error, "İlçe Listesi Hatası");
    }
  }
}
