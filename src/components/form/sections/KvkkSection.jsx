import VectorIcon from "../../../assets/images/Vector.png";

export const KvkkSection = ({ 
  kvkkConsent, 
  setKvkkConsent, 
  kvkkError, 
  isLoading 
}) => {
  const handleKvkkChange = () => {
    setKvkkConsent(!kvkkConsent);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* KVKK Consent */}
      <div className="flex items-start gap-[7.69px] w-full">
        {/* Checkbox */}
        <div className="flex-shrink-0 mt-1">
          <div 
            className={`w-5 h-5 rounded border-2 relative transition-all duration-200 ${
              kvkkConsent 
                ? 'bg-[#3F2F70] border-[#3F2F70]' 
                : 'bg-white dark:bg-gray-800 border-[#5A5A59] dark:border-gray-400'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={!isLoading ? handleKvkkChange : undefined}
          >
            {kvkkConsent && (
              <img 
                src={VectorIcon} 
                alt="checkmark" 
                className="absolute"
                style={{
                  width: '11.67px',
                  height: '11.54px',
                  top: '3.06px',
                  left: '1.33px'
                }}
              />
            )}
          </div>
        </div>

        {/* Text */}
        <p className="text-[#5A5A59] dark:text-gray-300 text-xs font-red-hat-text font-normal leading-[18px] tracking-[-0.01em] flex-1">
          Tarafıma hizmet sunulması amacıyla paylaştığım kişisel verilerimin işlenmesine ilişkin{' '}
          <a href="#" className="text-[#5A5A59] dark:text-gray-300 underline underline-offset-0 decoration-[#5A5A59] dark:decoration-gray-300 decoration-solid">
            KVKK Metni
          </a>'ni okudum. Kişisel verilerimin belirtilen kapsamda işlenmesine onay veriyorum.
        </p>
      </div>
      
      {/* KVKK Error Message */}
      {kvkkError && (
        <p className="text-strawberry-red text-sm mt-2 ml-7 font-medium">{kvkkError}</p>
      )}
    </div>
  );
}; 