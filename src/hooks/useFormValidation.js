import { useCallback } from "react";
import { validateField } from "../validation/formSchema";
import { REDUCER_ACTIONS, useFormDispatch } from "../state/FormContext";

export const useFormValidation = () => {
  const dispatch = useFormDispatch();

  const validateFieldLocal = useCallback((fieldName, value) => {
    const result = validateField(fieldName, value);
    return result;
  }, []);

  const handleFieldChange = useCallback(
    (fieldName, value) => {
      dispatch({
        type: REDUCER_ACTIONS.UPDATE_INPUT,
        field: fieldName,
        payload: value,
      });

      // Real-time validation
      const fieldError = validateFieldLocal(fieldName, value);

      if (fieldError) {
        dispatch({
          type: REDUCER_ACTIONS.SET_ERROR,
          payload: { [fieldName]: fieldError },
        });
      } else {
        dispatch({
          type: REDUCER_ACTIONS.CLEAR_ERROR,
          field: fieldName,
        });
      }
    },
    [dispatch, validateFieldLocal]
  );

  const handleTextChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      handleFieldChange(name, value);
    },
    [handleFieldChange]
  );

  const handleEmailChange = useCallback(
    (e) => {
      const email = e.target.value;
      handleFieldChange("email", email);
    },
    [handleFieldChange]
  );

  const handleSalaryChange = useCallback(
    (e) => {
      const value = e.target.value;
      const formattedValue = value.replace(/[^\d,]/g, "");
      handleFieldChange("salary", formattedValue);
    },
    [handleFieldChange]
  );

  const handlePhoneChange = useCallback(
    (e) => {
      const value = e.target.value;
      const formattedValue = value.replace(/[^\d\s\(\)\-]/g, "");
      handleFieldChange("phone", formattedValue);
    },
    [handleFieldChange]
  );

  const handleCVChange = useCallback(
    (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        handleFieldChange("cv", file);
      } else {
        handleFieldChange("cv", null);
      }
    },
    [handleFieldChange]
  );

  return {
    validateFieldLocal,
    handleTextChange,
    handleEmailChange,
    handleSalaryChange,
    handlePhoneChange,
    handleCVChange,
  };
};
