import { useCallback } from "react";

export const useSalaryFormatter = () => {
  const formatSalary = useCallback((value) => {
    // Sadece rakamları ve virgülü al
    const numbers = value.replace(/[^\d,]/g, "");

    // Birden fazla virgül varsa sadece ilkini tut
    const parts = numbers.split(",");
    if (parts.length > 2) {
      return parts[0] + "," + parts.slice(1).join("");
    }

    // Virgülden sonra maksimum 2 rakam
    if (parts.length === 2 && parts[1].length > 2) {
      return parts[0] + "," + parts[1].slice(0, 2);
    }

    return numbers;
  }, []);

  const getRawSalary = useCallback((formattedValue) => {
    // Formatlanmış değerden sadece rakamları çıkar
    return formattedValue.replace(/[^\d]/g, "");
  }, []);

  return {
    formatSalary,
    getRawSalary,
  };
};
