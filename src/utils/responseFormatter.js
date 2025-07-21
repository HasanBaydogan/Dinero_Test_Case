import {
  HTTP_ERROR_MESSAGES,
  DEFAULT_MESSAGES,
} from "../constants/apiConstants";

export class ResponseFormatter {
  static success(data, title = "Başarılı", message = DEFAULT_MESSAGES.SUCCESS) {
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
    message = DEFAULT_MESSAGES.ERROR,
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
    defaultMessage = DEFAULT_MESSAGES.SUCCESS
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
        DEFAULT_MESSAGES.UNKNOWN_ERROR;

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
        message: DEFAULT_MESSAGES.NETWORK_ERROR,
        data: null,
      };
    }

    return {
      success: false,
      status: 500,
      title: defaultTitle,
      message: DEFAULT_MESSAGES.UNKNOWN_ERROR,
      data: null,
    };
  }
}
