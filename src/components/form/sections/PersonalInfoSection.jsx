import { Input } from "../Input";
import NameVector from "../../../assets/images/Name_Vector.png";
import MailVector from "../../../assets/images/Mail_Vector.png";
import PhoneVector from "../../../assets/images/Phone_Vector.png";

export const PersonalInfoSection = ({ 
  formState, 
  handleTextChange, 
  handleEmailChange, 
  handlePhoneChange, 
  isLoading 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
      {/* Left Column */}
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
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
          icon={<img src={NameVector} alt="name icon" />}
        />

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
          icon={<img src={MailVector} alt="mail icon" />}
        />
      </div>

      {/* Right Column */}
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
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
          icon={<img src={NameVector} alt="name icon" />}
        />

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
          icon={<img src={PhoneVector} alt="phone icon" />}
        />
      </div>
    </div>
  );
}; 