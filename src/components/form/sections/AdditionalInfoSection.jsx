import { Input } from "../Input";
import { CVUpload } from "../CVUpload";
import LinkedinVector from "../../../assets/images/Linkedin_Vector.png";
import WalletVector from "../../../assets/images/Wallet_Vector.png";

export const AdditionalInfoSection = ({ 
  formState, 
  handleTextChange, 
  handleSalaryChange,
  handleCVChange,
  isLoading 
}) => {
  return (
    <>
      {/* LinkedIn URL - Tam Genişlik */}
      <div className="w-full">
        <Input
          label="LinkedIn URL"
          type="url"
          id="linkedin"
          name="linkedin"
          value={formState.linkedin || ''}
          onChange={handleTextChange}
          placeholder="https://www.linkedin.com/in/"
          error={formState.errors?.linkedin}
          disabled={isLoading}
          icon={<img src={LinkedinVector} alt="linkedin icon" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Left Column - CV Upload */}
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <CVUpload
            label="CV Yükleyin"
            id="cv"
            name="cv"
            onChange={handleCVChange}
            error={formState.errors?.cv}
            disabled={isLoading}
          />
        </div>

        {/* Right Column - Salary */}
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <Input
            label="Maaş Beklentisi"
            type="text"
            inputMode="decimal"
            id="salary"
            name="salary"
            value={formState.salary || ''}
            onChange={handleSalaryChange}
            placeholder="00,000 ₺"
            error={formState.errors?.salary}
            disabled={isLoading}
            icon={<img src={WalletVector} alt="wallet icon" />}
            style={{
              fontFamily: 'Red Hat Text',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '22px',
              letterSpacing: '0%',
              verticalAlign: 'middle'
            }}
          />
        </div>
      </div>
    </>
  );
}; 