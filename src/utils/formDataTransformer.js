export class FormDataTransformer {
  static transform(formData, cvFile) {
    return {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      telephone: this.formatPhoneNumber(formData.phone),
      linkedinUrl: formData.linkedin || "",
      cv: cvFile ? cvFile.name : "",
      salaryExpectation: this.formatSalary(formData.salary),
      createdDate: new Date().toISOString(),
      province: formData.city || "",
      district: formData.district || "",
      address: formData.address || "",
      eMail: formData.email || "",
    };
  }

  static formatPhoneNumber(phone) {
    if (!phone) return "";
    return `+90${phone.replace(/\D/g, "")}`;
  }

  static formatSalary(salary) {
    if (!salary) return 0;
    return parseInt(salary.replace(/,/g, ""));
  }

  static validateFormData(formData) {
    const errors = [];

    if (!formData.firstName?.trim()) {
      errors.push("Ad alanı zorunludur");
    }

    if (!formData.lastName?.trim()) {
      errors.push("Soyad alanı zorunludur");
    }

    if (!formData.email?.trim()) {
      errors.push("E-posta alanı zorunludur");
    }

    if (!formData.phone?.trim()) {
      errors.push("Telefon alanı zorunludur");
    }

    return errors;
  }
}
