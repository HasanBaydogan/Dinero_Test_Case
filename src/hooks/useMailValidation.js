import { useState, useCallback } from "react";

//Zod kullanılmak istenmezse örnek olarak yazdığım E-posta Validasyon hook'u

export const useMailValidation = () => {
  const [emailError, setEmailError] = useState("");

  const validateEmail = useCallback((email) => {
    if (!email || email.trim() === "") {
      setEmailError("E-posta alanı zorunludur");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Geçerli bir e-posta adresi giriniz");
      return false;
    }

    if (email.length > 254) {
      setEmailError("E-posta adresi çok uzun");
      return false;
    }

    const localPart = email.split("@")[0];
    if (localPart.length > 64) {
      setEmailError("E-posta adresi geçersiz");
      return false;
    }

    const domain = email.split("@")[1];
    if (!domain || domain.length === 0) {
      setEmailError("Geçerli bir e-posta adresi giriniz");
      return false;
    }
    if (domain.length > 253) {
      setEmailError("E-posta adresi geçersiz");
      return false;
    }

    const invalidChars = /[<>()[\]\\,;:\s"]/;
    if (invalidChars.test(email)) {
      setEmailError("E-posta adresi geçersiz karakterler içeriyor");
      return false;
    }

    setEmailError("");
    return true;
  }, []);

  const clearEmailError = useCallback(() => {
    setEmailError("");
  }, []);

  return {
    emailError,
    validateEmail,
    clearEmailError,
  };
};
