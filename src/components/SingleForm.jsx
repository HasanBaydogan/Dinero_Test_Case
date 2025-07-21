import { useState, useCallback, useEffect } from "react";
import { Input } from "./form/Input";
import { Select } from "./form/Select";
import { CVUpload } from "./form/CVUpload";
import { Header } from "./form/Header";
import { REDUCER_ACTIONS, useForm, useFormDispatch } from "../state/FormContext";
import VectorIcon from "../assets/images/Vector.png";
import NameVector from "../assets/images/Name_Vector.png";
import MailVector from "../assets/images/Mail_Vector.png";
import PhoneVector from "../assets/images/Phone_Vector.png";
import LocationVector from "../assets/images/Location_Vector.png";
import LinkedinVector from "../assets/images/Linkedin_Vector.png";
import FolderVector from "../assets/images/Folder_Vector.png";
import WalletVector from "../assets/images/Wallet_Vector.png";
import loadingAnimation from "../assets/animations/loadingAnimation.json";
import Lottie from "react-lottie";
import { validateForm as validateFormZod, validateField } from "../validation/formSchema";
import apiService from "../services/apiService";
import ResponseModal from "./ResponseModal";

// Zod validation wrapper
const validateFormWithZod = (formData, kvkkConsent) => {
  // Ensure formData is not undefined
  const safeFormData = formData || {};
  
  const result = validateFormZod(safeFormData, kvkkConsent, safeFormData.includeAddress);
  return result.success ? {} : result.errors;
};

export function SingleForm() {
  const formState = useForm();
  const dispatch = useFormDispatch();
  const [kvkkConsent, setKvkkConsent] = useState(false);
  const [kvkkError, setKvkkError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalResponse, setModalResponse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);

  // Lottie animation options
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  // Load provinces on component mount
  useEffect(() => {
    const loadProvinces = async () => {
      setIsLoadingProvinces(true);
      try {
        const result = await apiService.getProvinces();
        if (result.success) {
          setProvinces(result.data);
          console.log("Provinces loaded:", result.data);
        } else {
          console.error("Failed to load provinces:", result.message);
        }
      } catch (error) {
        console.error("Error loading provinces:", error);
      } finally {
        setIsLoadingProvinces(false);
      }
    };

    loadProvinces();
  }, []);

  // Load districts when province changes
  const loadDistricts = async (provinceId) => {
    if (!provinceId) {
      setDistricts([]);
      return;
    }

    setIsLoadingDistricts(true);
    try {
      const result = await apiService.getDistricts(provinceId);
      if (result.success) {
        setDistricts(result.data);
        console.log("Districts loaded:", result.data);
        console.log("District structure example:", result.data[0]);
      } else {
        console.error("Failed to load districts:", result.message);
        setDistricts([]);
      }
    } catch (error) {
      console.error("Error loading districts:", error);
      setDistricts([]);
    } finally {
      setIsLoadingDistricts(false);
    }
  };

  // Clear districts when address is toggled off
  useEffect(() => {
    if (!formState.includeAddress) {
      setDistricts([]);
      setIsLoadingDistricts(false);
    }
  }, [formState.includeAddress]);

  // Real-time validation helper with Zod
  const validateFieldLocal = (fieldName, value) => {
    const result = validateField(fieldName, value);
    return result; // Artık direkt string | null döndürüyor
  };

  const handleTextChange = useCallback((e) => {
    const { name, value } = e.target;
    
    dispatch({
      type: REDUCER_ACTIONS.UPDATE_INPUT,
      field: name,
      payload: value,
    });

    // If province is selected, load districts
    if (name === 'city' && value) {
      loadDistricts(value);
      // Clear district when province changes
      dispatch({
        type: REDUCER_ACTIONS.UPDATE_INPUT,
        field: 'district',
        payload: '',
      });
      dispatch({
        type: REDUCER_ACTIONS.CLEAR_ERROR,
        field: 'district'
      });
    }

    // Real-time validation
    const fieldError = validateFieldLocal(name, value);
    
    if (fieldError) {
      dispatch({
        type: REDUCER_ACTIONS.SET_ERROR,
        payload: { [name]: fieldError }
      });
    } else {
      dispatch({
        type: REDUCER_ACTIONS.CLEAR_ERROR,
        field: name
      });
    }
  }, [dispatch, loadDistricts]);

  const handleEmailChange = useCallback((e) => {
    const email = e.target.value;
    dispatch({
      type: REDUCER_ACTIONS.UPDATE_INPUT,
      field: 'email',
      payload: email,
    });

    // Real-time validation
    const fieldError = validateFieldLocal('email', email);
    
    if (fieldError) {
      dispatch({
        type: REDUCER_ACTIONS.SET_ERROR,
        payload: { email: fieldError }
      });
    } else {
      dispatch({
        type: REDUCER_ACTIONS.CLEAR_ERROR,
        field: 'email'
      });
    }
  }, [dispatch]);

  const handleSalaryChange = useCallback((e) => {
    const value = e.target.value;
    // Sadece rakam ve virgül kabul et
    const formattedValue = value.replace(/[^\d,]/g, '');
    
    dispatch({
      type: REDUCER_ACTIONS.UPDATE_INPUT,
      field: 'salary',
      payload: formattedValue,
    });

    // Real-time validation
    const fieldError = validateFieldLocal('salary', formattedValue);
    
    if (fieldError) {
      dispatch({
        type: REDUCER_ACTIONS.SET_ERROR,
        payload: { salary: fieldError }
      });
    } else {
      dispatch({
        type: REDUCER_ACTIONS.CLEAR_ERROR,
        field: 'salary'
      });
    }
  }, [dispatch]);

  const handlePhoneChange = useCallback((e) => {
    const value = e.target.value;
    // Sadece rakam, parantez, boşluk ve tire kabul et
    const formattedValue = value.replace(/[^\d\s\(\)\-]/g, '');
    
    dispatch({
      type: REDUCER_ACTIONS.UPDATE_INPUT,
      field: 'phone',
      payload: formattedValue,
    });

    // Real-time validation for phone
    const fieldError = validateFieldLocal('phone', formattedValue);
    
    if (fieldError) {
      dispatch({
        type: REDUCER_ACTIONS.SET_ERROR,
        payload: { phone: fieldError }
      });
    } else {
      dispatch({
        type: REDUCER_ACTIONS.CLEAR_ERROR,
        field: 'phone'
      });
    }
  }, [dispatch]);

  const handleKvkkChange = () => {
    setKvkkConsent(!kvkkConsent);
    // Clear KVKK error when user checks the box
    if (!kvkkConsent) {
      setKvkkError('');
    }
  };





    const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous KVKK error
    setKvkkError('');
    
    // Validate form with Zod
    const validationErrors = validateFormWithZod(formState, kvkkConsent);
    
    if (Object.keys(validationErrors).length === 0) {
      // Start loading
      setIsLoading(true);
      
      try {
        // API'ye form verilerini gönder
        const result = await apiService.submitForm(formState, formState.cv);
        
        if (result.success) {
          // Başarılı gönderim
          console.log("Form submitted successfully:", {
            status: result.status,
            title: result.title,
            message: result.message,
            data: result.data
          });
          
          // Modal'ı göster
          setModalResponse(result);
          setIsModalOpen(true);
          
          // Form'u temizle
          dispatch({ type: REDUCER_ACTIONS.RESET_FORM });
          setKvkkConsent(false);
        } else {
          // Hata durumu
          console.error("Form submission failed:", {
            status: result.status,
            title: result.title,
            message: result.message,
            data: result.data
          });
          
          // Modal'ı göster
          setModalResponse(result);
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error("Form submission error:", error);
        alert("Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
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
  };

  return (
    <>
      {/* Response Modal */}
      <ResponseModal
        isOpen={isModalOpen}
        response={modalResponse}
        onClose={() => {
          setIsModalOpen(false);
          setModalResponse(null);
        }}
      />
      
      <div className="w-full h-full flex flex-col">
        <Header />
        
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6 sm:gap-8 lg:gap-[40px]">
        {/* Form Fields - Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Adınız */}
            <Input
              label="Adınız"
              type="text"
              id="firstName"
              name="firstName"
              value={formState.firstName || ''}
              onChange={handleTextChange}
              placeholder="Adınızı girin"
              error={formState.errors?.firstName}
              disabled={isLoading}
              icon={
                <img src={NameVector} alt="name icon" />
              }
            />

            {/* E-Posta */}
            <Input
              label="E-Posta Adresiniz"
              type="email"
              id="email"
              name="email"
              value={formState.email || ''}
              onChange={handleEmailChange}
              placeholder="E-posta adresinizi girin"
              error={formState.errors?.email}
              disabled={isLoading}
              icon={
                <img src={MailVector} alt="mail icon" />
              }
            />
          </div>
          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Soyadınız */}
            <Input
              label="Soyadınız"
              type="text"
              id="lastName"
              name="lastName"
              value={formState.lastName || ''}
              onChange={handleTextChange}
              placeholder="Soyadınızı girin"
              error={formState.errors?.lastName}
              disabled={isLoading}
              icon={
                <img src={NameVector} alt="name icon" />
              }
            />
            {/* Telefon */}
            <Input
              label="Telefon Numaranız"
              type="tel"
              id="phone"
              name="phone"
              value={formState.phone || ''}
              onChange={handlePhoneChange}
              placeholder="(5xx) 123 45 67"
              error={formState.errors?.phone}
              disabled={isLoading}
              icon={
                <img src={PhoneVector} alt="phone icon" />
              }
            />
          </div>
        </div>
        
        {/* Adres Bilgileri - Koşullu Görünüm */}
        {formState.includeAddress && (
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* İl ve İlçe - Yan Yana */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {/* İl */}
              <Select
                label="İl"
                id="city"
                name="city"
                value={formState.city || ''}
                onChange={handleTextChange}
                placeholder={isLoadingProvinces ? "Yükleniyor..." : "İl Seçiniz"}
                error={formState.errors?.city}
                disabled={isLoading || isLoadingProvinces}
                options={provinces}
                icon={
                  <img src={LocationVector} alt="location icon" />
                }
              />
              
              {/* İlçe */}
              <Select
                label="İlçe"
                id="district"
                name="district"
                value={formState.district || ''}
                onChange={handleTextChange}
                placeholder={!formState.city ? "Önce il seçiniz" : isLoadingDistricts ? "Yükleniyor..." : "İlçe Seçiniz"}
                error={formState.errors?.district}
                disabled={isLoading || isLoadingDistricts || !formState.city}
                options={districts}
                icon={
                  <img src={LocationVector} alt="location icon" />
                }
              />
            </div>
            
            {/* Açık Adres - Tam Genişlik */}
            <div className="w-full">
              <Input
                label="Açık Adres"
                type="textarea"
                id="address"
                name="address"
                value={formState.address || ''}
                onChange={handleTextChange}
                placeholder="Açık Adres Giriniz"
                error={formState.errors?.address}
                disabled={isLoading}
                icon={
                  <img src={LocationVector} alt="location icon" />
                }
                multiline={true}
              />
            </div>
          </div>
        )}

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
            icon={
              <img src={LinkedinVector} alt="linkedin icon" />
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column */}
                     <div className="space-y-4 sm:space-y-6 lg:space-y-8">
             {/* CV Upload */}
             <CVUpload
               label="CV Yükleyin"
               id="cv"
               name="cv"
               onChange={(e) => {
                 // Check if files exist and have length
                 if (e.target.files && e.target.files.length > 0) {
                   const file = e.target.files[0];
                   
                   console.log('CV File selected:', file);
                   console.log('File type:', file?.type);
                   console.log('File size:', file?.size);
                   
                   dispatch({
                     type: REDUCER_ACTIONS.UPDATE_INPUT,
                     field: 'cv',
                     payload: file,
                   });
                   
                   // Real-time validation for CV
                   const fieldError = validateFieldLocal('cv', file);
                   
                   console.log('CV validation error:', fieldError);
                   
                   if (fieldError) {
                     dispatch({
                       type: REDUCER_ACTIONS.SET_ERROR,
                       payload: { cv: fieldError }
                     });
                   } else {
                     dispatch({
                       type: REDUCER_ACTIONS.CLEAR_ERROR,
                       field: 'cv'
                     });
                   }
                 } else {
                   // No file selected, clear the field
                   dispatch({
                     type: REDUCER_ACTIONS.UPDATE_INPUT,
                     field: 'cv',
                     payload: null,
                   });
                   
                   dispatch({
                     type: REDUCER_ACTIONS.SET_ERROR,
                     payload: { cv: "CV dosyası yüklemeniz zorunludur" }
                   });
                 }
               }}
               error={formState.errors?.cv}
               disabled={isLoading}
             />
           </div>
          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Maaş Beklentisi */}
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
              icon={
                <img src={WalletVector} alt="wallet icon" />
              }
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

        {/* KVKK Consent and Action Buttons */}
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
            {/* KVKK için yönlendirme a tag'i ile yapıldı ama bir uzantı beklentisi olmadığı için # olarak boş bırakıldı. */}
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

          {/* Action Buttons */}
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
        </div>
      </form>
    </div>
    </>
  );
} 