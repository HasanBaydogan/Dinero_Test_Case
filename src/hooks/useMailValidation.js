import { useState, useCallback } from "react";

export const useMailValidation = () => {
  const [emailError, setEmailError] = useState("");

  const validateEmail = useCallback((email) => {
    // Boş e-posta kontrolü
    if (!email || email.trim() === "") {
      setEmailError("E-posta alanı zorunludur");
      return false;
    }

    // E-posta format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Geçerli bir e-posta adresi giriniz");
      return false;
    }

    // E-posta uzunluk kontrolü
    if (email.length > 254) {
      setEmailError("E-posta adresi çok uzun");
      return false;
    }

    // Local part uzunluk kontrolü (64 karakter)
    const localPart = email.split("@")[0];
    if (localPart.length > 64) {
      setEmailError("E-posta adresi geçersiz");
      return false;
    }

    // Domain kontrolü
    const domain = email.split("@")[1];
    if (!domain || domain.length === 0) {
      setEmailError("Geçerli bir e-posta adresi giriniz");
      return false;
    }

    // Domain uzunluk kontrolü
    if (domain.length > 253) {
      setEmailError("E-posta adresi geçersiz");
      return false;
    }

    // Özel karakterler kontrolü
    const invalidChars = /[<>()[\]\\,;:\s"]/;
    if (invalidChars.test(email)) {
      setEmailError("E-posta adresi geçersiz karakterler içeriyor");
      return false;
    }

    // Başarılı validasyon
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
