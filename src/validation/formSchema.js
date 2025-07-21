import { z } from "zod";

// Türkiye telefon numarası validation
const phoneRegex = /^5\d{9}$/;

// Form validation schema
export const formSchema = z.object({
  // Zorunlu alanlar
  firstName: z
    .string({
      required_error: "Ad alanı boş bırakılamaz",
      invalid_type_error: "Ad alanı metin olmalıdır",
    })
    .min(1, "Ad alanı boş bırakılamaz")
    .min(2, "Ad en az 2 karakter olmalıdır")
    .max(50, "Ad en fazla 50 karakter olabilir")
    .transform((val) => val || ""),

  lastName: z
    .string({
      required_error: "Soyad alanı boş bırakılamaz",
      invalid_type_error: "Soyad alanı metin olmalıdır",
    })
    .min(1, "Soyad alanı boş bırakılamaz")
    .min(2, "Soyad en az 2 karakter olmalıdır")
    .max(50, "Soyad en fazla 50 karakter olabilir")
    .transform((val) => val || ""),

  email: z
    .string({
      required_error: "E-posta alanı boş bırakılamaz",
      invalid_type_error: "E-posta alanı metin olmalıdır",
    })
    .min(1, "E-posta alanı boş bırakılamaz")
    .email("Geçerli bir e-posta adresi giriniz (örn: ornek@email.com)")
    .transform((val) => val || ""),

  phone: z
    .string({
      required_error: "Telefon numarası boş bırakılamaz",
      invalid_type_error: "Telefon numarası metin olmalıdır",
    })
    .min(1, "Telefon numarası boş bırakılamaz")
    .refine((value) => {
      const numbersOnly = value.replace(/\D/g, "");
      return numbersOnly.length >= 10 && numbersOnly.length <= 11;
    }, "Telefon numarası 10-11 haneli olmalıdır")
    .refine((value) => {
      const numbersOnly = value.replace(/\D/g, "");
      return numbersOnly.startsWith("5");
    }, "Telefon numarası 5 ile başlamalıdır (örn: 545 324 22 41)")
    .transform((val) => val || ""),

  cv: z
    .any()
    .refine((file) => {
      // Dosya yoksa hata ver
      if (!file) return false;

      // File object kontrolü
      if (file instanceof File) {
        // Dosya boyutu kontrolü (5MB)
        if (file.size > 1 * 1024 * 1024) {
          return false;
        }
        // Dosya tipi kontrolü
        const allowedTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        if (!allowedTypes.includes(file.type)) {
          return false;
        }
        return true;
      }
      // File-like object kontrolü (name property'si varsa)
      if (file && typeof file === "object" && file.name) return true;
      // String kontrolü (dosya adı)
      if (typeof file === "string" && file.trim()) return true;
      return false;
    }, "CV dosyası yüklemeniz zorunludur")
    .refine((file) => {
      if (!file || !(file instanceof File)) return true;
      return file.size <= 1 * 1024 * 1024;
    }, "CV dosyası 5MB'dan küçük olmalıdır")
    .refine((file) => {
      if (!file || !(file instanceof File)) return true;
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      return allowedTypes.includes(file.type);
    }, "CV dosyası PDF, DOC veya DOCX formatında olmalıdır"),

  // Opsiyonel alanlar
  linkedin: z
    .string({ invalid_type_error: "LinkedIn URL'si metin olmalıdır" })
    .optional()
    .refine((value) => {
      if (!value) return true; // Opsiyonel
      const linkedinRegex =
        /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
      return linkedinRegex.test(value);
    }, "Geçerli bir LinkedIn URL'si giriniz (örn: https://linkedin.com/in/kullanici-adi)")
    .transform((val) => val || ""),

  salary: z
    .string({ invalid_type_error: "Maaş alanı metin olmalıdır" })
    .optional()
    .refine((value) => {
      if (!value) return true; // Opsiyonel
      const salaryRegex = /^[\d,]+$/;
      return salaryRegex.test(value);
    }, "Maaş alanı sadece rakam ve virgül içerebilir (örn: 15000,50)")
    .transform((val) => val || ""),

  // Adres alanları (sadece adres seçilirse zorunlu)
  city: z
    .string({ invalid_type_error: "İl alanı metin olmalıdır" })
    .optional()
    .transform((val) => val || ""),

  district: z
    .string({ invalid_type_error: "İlçe alanı metin olmalıdır" })
    .optional()
    .transform((val) => val || ""),

  address: z
    .string({ invalid_type_error: "Açık adres alanı metin olmalıdır" })
    .optional()
    .transform((val) => val || ""),

  // KVKK consent
  kvkkConsent: z
    .boolean({
      required_error: "KVKK onayı zorunludur",
      invalid_type_error: "KVKK onayı seçim olmalıdır",
    })
    .refine(
      (value) => value === true,
      "KVKK metnini okudum ve onaylıyorum seçeneğini işaretlemelisiniz"
    ),
});

// Adres alanları için ayrı schema (adres seçilirse zorunlu)
export const addressSchema = z.object({
  city: z
    .string({
      required_error: "İl seçimi zorunludur",
      invalid_type_error: "İl alanı metin olmalıdır",
    })
    .min(1, "İl seçimi zorunludur"),

  district: z
    .string({
      required_error: "İlçe seçimi zorunludur",
      invalid_type_error: "İlçe alanı metin olmalıdır",
    })
    .min(1, "İlçe seçimi zorunludur"),

  address: z
    .string({
      required_error: "Açık adres zorunludur",
      invalid_type_error: "Açık adres alanı metin olmalıdır",
    })
    .min(1, "Açık adres zorunludur"),
});

// Form validation fonksiyonu
export const validateForm = (formData, kvkkConsent, includeAddress = false) => {
  try {
    // Ensure formData is not undefined
    const safeFormData = formData || {};

    // Ana form validation
    const result = formSchema.parse({
      ...safeFormData,
      kvkkConsent,
    });

    // Eğer adres seçilmişse adres alanlarını da validate et
    if (includeAddress) {
      addressSchema.parse({
        city: safeFormData.city,
        district: safeFormData.district,
        address: safeFormData.address,
      });
    }

    return { success: true, data: result };
  } catch (error) {
    // Safe error handling
    try {
      if (error instanceof z.ZodError) {
        // ZodError'da errors yerine issues kullanılır
        const issues = error.issues || error.errors || [];

        if (Array.isArray(issues)) {
          const errors = {};
          issues.forEach((err) => {
            if (err && err.path && err.path[0] && err.message) {
              const field = err.path[0];
              errors[field] = err.message;
            }
          });
          return { success: false, errors };
        }
      }
    } catch (parseError) {
      // Silent error handling
    }
    return {
      success: false,
      errors: { general: "Bilinmeyen bir hata oluştu" },
    };
  }
};

// Tek alan validation fonksiyonu
export const validateField = (
  fieldName,
  value,
  formData = {},
  kvkkConsent = false
) => {
  try {
    // Sadece belirli alanı validate et
    const partialSchema = z.object({
      [fieldName]: formSchema.shape[fieldName],
    });

    partialSchema.parse({ [fieldName]: value });
    return null; // Başarılı ise null döndür
  } catch (error) {
    if (error instanceof z.ZodError) {
      // ZodError'da errors yerine issues kullanılır
      const issues = error.issues || error.errors || [];
      const fieldError = issues.find((err) => err.path[0] === fieldName);
      return fieldError?.message || null;
    }
    return "Bilinmeyen bir hata oluştu";
  }
};
