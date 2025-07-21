import { createContext, useContext, useReducer } from "react";

const FormContext = createContext(null);
const FormDispatchContext = createContext(null);

// custom hook to allow us to access formState
export function useForm() {
  return useContext(FormContext);
}

// custom hook to allow us to access formDispatch
export function useFormDispatch() {
  return useContext(FormDispatchContext);
}

// actions stored in ENUM for future action support
export const REDUCER_ACTIONS = {
  UPDATE_INPUT: "UPDATE_INPUT",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  CLEAR_ALL_ERRORS: "CLEAR_ALL_ERRORS",
  RESET_FORM: "RESET_FORM",
};

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  linkedin: "",
  salary: "",
  cv: null,
  city: "",
  district: "",
  address: "",
  includeAddress: false,
  errors: {},
};

const formReducer = (state, action) => {
  switch (action.type) {
    case REDUCER_ACTIONS.UPDATE_INPUT:
      return {
        ...state,
        [action.field]: action.payload,
      };
    case REDUCER_ACTIONS.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload,
        },
      };
    case REDUCER_ACTIONS.CLEAR_ERROR:
      const { [action.field]: removed, ...remainingErrors } = state.errors;
      return {
        ...state,
        errors: remainingErrors,
      };
    case REDUCER_ACTIONS.CLEAR_ALL_ERRORS:
      return {
        ...state,
        errors: {},
      };
    case REDUCER_ACTIONS.RESET_FORM:
      return {
        ...initialFormState,
        errors: {},
      };

    default:
      return state;
  }
};

export function FormProvider({ children }) {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  return (
    <FormContext.Provider value={formState}>
      <FormDispatchContext.Provider value={dispatch}>
        {children}
      </FormDispatchContext.Provider>
    </FormContext.Provider>
  );
}
