import { useState } from "react";
import { useForm } from "../state/FormContext";
import { useFormValidation } from "../hooks/useFormValidation";
import { useLocationData } from "../hooks/useLocationData";
import { useFormSubmission } from "../hooks/useFormSubmission";
import { Header } from "./form/Header";
import { PersonalInfoSection } from "./form/sections/PersonalInfoSection";
import { AddressSection } from "./form/sections/AddressSection";
import { AdditionalInfoSection } from "./form/sections/AdditionalInfoSection";
import { KvkkSection } from "./form/sections/KvkkSection";
import { ActionButtonsSection } from "./form/sections/ActionButtonsSection";
import ResponseModal from "./ResponseModal";

export function SingleForm() {
  const formState = useForm();
  const [kvkkConsent, setKvkkConsent] = useState(false);

  // Custom hooks
  const {
    handleTextChange,
    handleEmailChange,
    handlePhoneChange,
    handleSalaryChange,
    handleCVChange,
  } = useFormValidation();

  const {
    provinces,
    districts,
    isLoadingProvinces,
    isLoadingDistricts,
    handleProvinceChange,
  } = useLocationData(formState);

  const {
    isLoading,
    modalResponse,
    isModalOpen,
    kvkkError,
    handleSubmit,
    closeModal,
  } = useFormSubmission(formState, kvkkConsent, setKvkkConsent);

  return (
    <>
      {/* Response Modal */}
      <ResponseModal
        isOpen={isModalOpen}
        response={modalResponse}
        onClose={closeModal}
      />
      
      <div className="w-full h-full flex flex-col">
        <Header />
        
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6 sm:gap-8 lg:gap-[40px]">
          {/* Personal Information Section */}
          <PersonalInfoSection
            formState={formState}
            handleTextChange={handleTextChange}
            handleEmailChange={handleEmailChange}
            handlePhoneChange={handlePhoneChange}
            isLoading={isLoading}
          />
          
          {/* Address Section */}
          <AddressSection
            formState={formState}
            handleTextChange={handleTextChange}
            handleProvinceChange={handleProvinceChange}
            provinces={provinces}
            districts={districts}
            isLoadingProvinces={isLoadingProvinces}
            isLoadingDistricts={isLoadingDistricts}
            isLoading={isLoading}
          />

          {/* Additional Information Section */}
          <AdditionalInfoSection
            formState={formState}
            handleTextChange={handleTextChange}
            handleSalaryChange={handleSalaryChange}
            handleCVChange={handleCVChange}
            isLoading={isLoading}
          />

          {/* KVKK Section */}
          <KvkkSection
            kvkkConsent={kvkkConsent}
            setKvkkConsent={setKvkkConsent}
            kvkkError={kvkkError}
            isLoading={isLoading}
          />

          {/* Action Buttons Section */}
          <ActionButtonsSection isLoading={isLoading} />
      </form>
    </div>
    </>
  );
} 