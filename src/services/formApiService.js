import { BaseApiClient } from "./clients/baseApiClient";
import { ResponseFormatter } from "../utils/responseFormatter";
import { FormDataTransformer } from "../utils/formDataTransformer";
import { DEFAULT_MESSAGES } from "../constants/apiConstants";

export class FormApiService {
  constructor() {
    this.client = new BaseApiClient();
  }

  async submitForm(formData, cvFile) {
    try {
      const transformedData = FormDataTransformer.transform(formData, cvFile);

      if (import.meta.env.DEV) {
        console.log("Transformed data:", transformedData);
      }

      const response = await this.client.post("", transformedData);

      return ResponseFormatter.fromApiResponse(
        response,
        "Başarılı",
        DEFAULT_MESSAGES.FORM_SUCCESS
      );
    } catch (error) {
      console.error("Form submission error:", error);
      return ResponseFormatter.fromError(error, "Başvuru Hatası");
    }
  }

  async uploadFile(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await this.client.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return ResponseFormatter.fromApiResponse(
        response,
        "Başarılı",
        DEFAULT_MESSAGES.FILE_SUCCESS
      );
    } catch (error) {
      console.error("File upload error:", error);
      return ResponseFormatter.fromError(error, "Dosya Yükleme Hatası");
    }
  }
}
