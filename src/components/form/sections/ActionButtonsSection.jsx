import loadingAnimation from "../../../assets/animations/loadingAnimation.json";
import Lottie from "react-lottie";

export const ActionButtonsSection = ({ isLoading }) => {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="flex flex-row gap-3 sm:gap-4 w-full justify-end">
      <button
        type="button"
        className="font-medium focus:outline-none focus:ring-2 focus:ring-purplish-blue focus:ring-offset-2 transition-colors duration-200 bg-white dark:bg-[#374151] border border-[#E4E1EC] dark:border-[#374151] text-gray-800 dark:text-[#FFFFFF] flex-1 sm:flex-none whitespace-nowrap"
        style={{
          minWidth: '140px',
          maxWidth: '228px',
          height: '56px',
          borderRadius: '20px',
          padding: '15px 16px',
          gap: '10px',
          fontSize: '14px'
        }}
      >
        İş Tanımına Geri Dön
      </button>
      <button
        type="submit"
        disabled={isLoading}
        className="text-white font-medium focus:outline-none focus:ring-2 focus:ring-purplish-blue focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center flex-1 sm:flex-none whitespace-nowrap"
        style={{
          minWidth: '140px',
          maxWidth: '224px',
          height: '56px',
          borderRadius: '20px',
          backgroundColor: '#3F2F70',
          padding: '15px 16px',
          gap: '10px',
          fontSize: '14px',
          boxShadow: '0px 4px 8px 0px #3F2F7040'
        }}
      >
        {isLoading ? (
          <Lottie 
            options={lottieOptions}
            height={24}
            width={24}
          />
        ) : (
          'Başvuruyu Tamamla'
        )}
      </button>
    </div>
  );
}; 