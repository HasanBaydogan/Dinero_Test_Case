import { useState, useCallback } from "react";
import { REDUCER_ACTIONS, useFormDispatch } from "../state/FormContext";
import { validateForm as validateFormZod } from "../validation/formSchema";
import { submitForm, uploadFile } from "../services/apiService";

export const useFormSubmission = (formState, kvkkConsent, setKvkkConsent) => {
  const dispatch = useFormDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [modalResponse, setModalResponse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [kvkkError, setKvkkError] = useState("");

  // Zod validation wrapper
  const validateFormWithZod = useCallback((formData, kvkkConsent) => {
    const safeFormData = formData || {};
    const result = validateFormZod(
      safeFormData,
      kvkkConsent,
      safeFormData.includeAddress
    );
    return result.success ? {} : result.errors;
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Clear previous KVKK error
      setKvkkError("");

      // Validate form with Zod
      const validationErrors = validateFormWithZod(formState, kvkkConsent);

      if (Object.keys(validationErrors).length === 0) {
        // Start loading
        setIsLoading(true);

        try {
          // Submit form to API
          const result = await submitForm(formState, formState.cv);

          if (result.success) {
            // Show success modal
            setModalResponse(result);
            setIsModalOpen(true);

            // Reset form
            dispatch({ type: REDUCER_ACTIONS.RESET_FORM });
            setKvkkConsent(false);
          } else {
            // Show error modal
            console.error("Form submission failed:", {
              status: result.status,
              title: result.title,
              message: result.message,
              data: result.data,
            });

            setModalResponse(result);
            setIsModalOpen(true);
          }
        } catch (error) {
          console.error("Form submission error:", error);
          alert(
            "Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin."
          );
        } finally {
          // Stop loading
          setIsLoading(false);
        }
      } else {
        // Set form errors
        dispatch({
          type: REDUCER_ACTIONS.SET_ERROR,
          payload: validationErrors,
        });

        // Set KVKK error if exists
        if (validationErrors.kvkkConsent) {
          setKvkkError(validationErrors.kvkkConsent);
        }
      }
    },
    [formState, kvkkConsent, validateFormWithZod, dispatch, setKvkkConsent]
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalResponse(null);
  }, []);

  return {
    isLoading,
    modalResponse,
    isModalOpen,
    kvkkError,
    handleSubmit,
    closeModal,
  };
};
