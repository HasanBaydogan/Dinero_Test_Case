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
      if (!file) return false;

      if (file instanceof File) {
        if (file.size > 1 * 1024 * 1024) {
          return false;
        }
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
      if (file && typeof file === "object" && file.name) return true;

      if (typeof file === "string" && file.trim()) return true;
      return false;
    }, "CV dosyası yüklemeniz zorunludur")
    .refine((file) => {
      if (!file || !(file instanceof File)) return true;
      return file.size <= 1 * 1024 * 1024;
    }, "CV dosyası 1MB'dan küçük olmalıdır")
    .refine((file) => {
      if (!file || !(file instanceof File)) return true;
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      return allowedTypes.includes(file.type);
    }, "CV dosyası PDF, DOC veya DOCX formatında olmalıdır"),

  linkedin: z
    .string({ invalid_type_error: "LinkedIn URL'si metin olmalıdır" })
    .optional()
    .refine((value) => {
      if (!value) return true;
      const linkedinRegex =
        /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
      return linkedinRegex.test(value);
    }, "Geçerli bir LinkedIn URL'si giriniz (örn: https://linkedin.com/in/kullanici-adi)")
    .transform((val) => val || ""),

  salary: z
    .string({ invalid_type_error: "Maaş alanı metin olmalıdır" })
    .optional()
    .refine((value) => {
      if (!value) return true;
      const salaryRegex = /^[\d,]+$/;
      return salaryRegex.test(value);
    }, "Maaş alanı sadece rakam ve virgül içerebilir (örn: 15000,50)")
    .transform((val) => val || ""),

  city: z
    .union([z.string().optional(), z.number().optional()], {
      invalid_type_error: "İl alanı geçerli olmalıdır",
    })
    .transform((val) => val || ""),

  district: z
    .union([z.string().optional(), z.number().optional()], {
      invalid_type_error: "İlçe alanı geçerli olmalıdır",
    })
    .transform((val) => val || ""),

  address: z
    .string({ invalid_type_error: "Açık adres alanı metin olmalıdır" })
    .optional()
    .transform((val) => val || ""),

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

export const addressSchema = z.object({
  city: z
    .union(
      [
        z.string().min(1, "İl seçimi zorunludur"),
        z.number().min(1, "İl seçimi zorunludur"),
      ],
      {
        required_error: "İl seçimi zorunludur",
        invalid_type_error: "İl alanı geçerli olmalıdır",
      }
    )
    .refine((val) => val && val.toString().length > 0, "İl seçimi zorunludur"),

  district: z
    .union(
      [
        z.string().min(1, "İlçe seçimi zorunludur"),
        z.number().min(1, "İlçe seçimi zorunludur"),
      ],
      {
        required_error: "İlçe seçimi zorunludur",
        invalid_type_error: "İlçe alanı geçerli olmalıdır",
      }
    )
    .refine(
      (val) => val && val.toString().length > 0,
      "İlçe seçimi zorunludur"
    ),

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
    const safeFormData = formData || {};

    const result = formSchema.parse({
      ...safeFormData,
      kvkkConsent,
    });

    if (includeAddress) {
      addressSchema.parse({
        city: safeFormData.city,
        district: safeFormData.district,
        address: safeFormData.address,
      });
    }

    return { success: true, data: result };
  } catch (error) {
    try {
      if (error instanceof z.ZodError) {
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
    } catch (parseError) {}
    return {
      success: false,
      errors: { general: "Bilinmeyen bir hata oluştu" },
    };
  }
};

export const validateField = (
  fieldName,
  value,
  formData = {},
  kvkkConsent = false
) => {
  try {
    const partialSchema = z.object({
      [fieldName]: formSchema.shape[fieldName],
    });

    partialSchema.parse({ [fieldName]: value });
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues || error.errors || [];
      const fieldError = issues.find((err) => err.path[0] === fieldName);
      return fieldError?.message || null;
    }
    return "Bilinmeyen bir hata oluştu";
  }
};
