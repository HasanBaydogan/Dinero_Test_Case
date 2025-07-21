import { ToggleSwitch } from "./ToggleSwitch/ToggleSwitch";
import { REDUCER_ACTIONS, useForm, useFormDispatch } from "../../state/FormContext";

export function Header() {
  const formState = useForm();
  const dispatch = useFormDispatch();

  const handleToggleChange = (e) => {
    const newIncludeAddress = e.target.checked;
    dispatch({
      type: REDUCER_ACTIONS.UPDATE_INPUT,
      field: 'includeAddress',
      payload: newIncludeAddress,
    });
    
    if (!newIncludeAddress) {
      const currentErrors = { ...formState.errors };
      delete currentErrors.city;
      delete currentErrors.district;
      delete currentErrors.address;
      dispatch({
        type: REDUCER_ACTIONS.SET_ERROR,
        payload: currentErrors
      });
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-title-purple dark:text-gray-100 mb-4 leading-none tracking-title font-red-hat">
          [Title] İlanına Başvur
        </h1>
        <p className="text-base font-normal text-description-gray dark:text-gray-300 leading-description tracking-title font-red-hat-text">
          Aşağıdaki bilgileri doldurarak başvurunuzu tamamlayabilirsiniz.
        </p>
      </div>
      
      <div className="flex items-center">
        <ToggleSwitch 
          name="includeAddress"
          checked={formState.includeAddress || false}
          onChange={handleToggleChange}
          label="Adres Bilgilerimi Eklemek İstiyorum."
          error={formState.errors?.includeAddress}
        />
      </div>
    </div>
  );
}
