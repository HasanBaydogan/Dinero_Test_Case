import { BaseApiClient } from "./baseApiClient";
import { API_CONFIG, API_HEADERS } from "../../constants/apiConstants";

export class ProvincesApiClient extends BaseApiClient {
  constructor() {
    super({
      timeout: API_CONFIG.PROVINCES_TIMEOUT,
      headers: API_HEADERS.PROVINCES,
    });
  }

  async getProvinces() {
    return this.post(API_CONFIG.PROVINCES_URL, {});
  }

  async getDistricts(provinceId) {
    return this.post(API_CONFIG.PROVINCES_URL, {
      provincesId: provinceId,
    });
  }
}
