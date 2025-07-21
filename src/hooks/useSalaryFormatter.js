import { useCallback } from "react";
//Zod kullanılmak istenmezse örnek olarak yazdığım Maaş Beklenti formatlama hook'u
export const useSalaryFormatter = () => {
  const formatSalary = useCallback((value) => {
    const numbers = value.replace(/[^\d,]/g, "");

    const parts = numbers.split(",");
    if (parts.length > 2) {
      return parts[0] + "," + parts.slice(1).join("");
    }

    if (parts.length === 2 && parts[1].length > 2) {
      return parts[0] + "," + parts[1].slice(0, 2);
    }

    return numbers;
  }, []);

  const getRawSalary = useCallback((formattedValue) => {
    return formattedValue.replace(/[^\d]/g, "");
  }, []);

  return {
    formatSalary,
    getRawSalary,
  };
};
