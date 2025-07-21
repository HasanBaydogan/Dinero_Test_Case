import { Input } from "../Input";
import { Select } from "../Select";
import LocationVector from "../../../assets/images/Location_Vector.png";

export const AddressSection = ({ 
  formState, 
  handleTextChange, 
  handleProvinceChange,
  provinces,
  districts,
  isLoadingProvinces,
  isLoadingDistricts,
  isLoading 
}) => {
  if (!formState.includeAddress) return null;

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* İl ve İlçe - Yan Yana */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <Select
          label="İl"
          id="city"
          name="city"
          value={formState.city || ''}
          onChange={handleProvinceChange}
          placeholder={isLoadingProvinces ? "Yükleniyor..." : "İl Seçiniz"}
          error={formState.errors?.city}
          disabled={isLoading || isLoadingProvinces}
          options={provinces}
          icon={<img src={LocationVector} alt="location icon" />}
        />
        
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
          icon={<img src={LocationVector} alt="location icon" />}
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
          icon={<img src={LocationVector} alt="location icon" />}
          multiline={true}
        />
      </div>
    </div>
  );
}; 