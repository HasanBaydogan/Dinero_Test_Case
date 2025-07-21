import { useState, useCallback } from "react";

// Form sadece Türkçe karakterler içerdiği için ve örnekte bu şekilde olduğu için Türkiyeye özel formatlama yapıyorum.
//Zod kullanılmak istenmezse örnek olarak yazdığım Telefon Numarası formatlama hook'u
export const usePhoneFormatter = () => {
  const [formattedPhone, setFormattedPhone] = useState("");

  const formatPhoneNumber = useCallback((value) => {
    const numbers = value.replace(/\D/g, "");

    // Türkiye telefon numarası formatı: (5XX) XXX XX XX
    let formatted = "";

    if (numbers.length <= 0) {
      formatted = "";
    } else if (numbers.length <= 3) {
      formatted = `(${numbers}`;
    } else if (numbers.length <= 6) {
      formatted = `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    } else if (numbers.length <= 8) {
      formatted = `(${numbers.slice(0, 3)}) ${numbers.slice(
        3,
        6
      )} ${numbers.slice(6)}`;
    } else if (numbers.length <= 10) {
      formatted = `(${numbers.slice(0, 3)}) ${numbers.slice(
        3,
        6
      )} ${numbers.slice(6, 8)} ${numbers.slice(8)}`;
    } else {
      formatted = `(${numbers.slice(0, 3)}) ${numbers.slice(
        3,
        6
      )} ${numbers.slice(6, 8)} ${numbers.slice(8, 10)}`;
    }

    setFormattedPhone(formatted);
    return formatted;
  }, []);

  const getRawPhoneNumber = useCallback((formattedValue) => {
    return formattedValue.replace(/\D/g, "");
  }, []);

  return {
    formattedPhone,
    formatPhoneNumber,
    getRawPhoneNumber,
  };
};
