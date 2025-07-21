import { useState, useRef, useEffect } from 'react';

export const Select = ({ label, error, options = [], icon, disabled, style, ...args }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);
  const hasValue = args.value && args.value !== '';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getDisplayValue = () => {
    if (!args.value) return '';
    
    const selectedOption = options.find(option => 
      option.value === args.value || 
      option.provincesId === args.value ||
      option.districtId === args.value
    );
    
    return selectedOption ? (
      selectedOption.label || 
      selectedOption.provincesName || 
      selectedOption.districtName
    ) : '';
  };

  const handleOptionSelect = (option) => {
    const value = option.value || option.provincesId || option.districtId;
    const label = option.label || option.provincesName || option.districtName;
    
    if (args.onChange) {
      const syntheticEvent = {
        target: {
          name: args.name,
          value: value,
          label: label
        }
      };
      args.onChange(syntheticEvent);
    }
    
    setIsOpen(false);
    setIsFocused(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Header Label */}
      <div className="absolute -top-3 left-4 z-10">
        <div className={`w-auto min-w-[66px] h-6 px-[14px] py-[6px] border border-input-header-border dark:border-gray-600 rounded-[15px] flex items-center justify-center transition-all duration-200 ${
          isFocused ? 'bg-white dark:bg-gray-800' : 'bg-label-default-bg dark:bg-gray-700'
        }`}>
          <span className="text-input-header-text dark:text-gray-300 text-sm font-normal font-red-hat-text leading-input-header whitespace-nowrap">
            {label}
          </span>
        </div>
      </div>

      {/* Select Field */}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        
        <div 
          className={`w-full h-[60px] pl-10 pr-10 border rounded-[60px] focus:outline-none transition-all duration-200 text-input-text dark:text-gray-200 font-red-hat-text font-normal text-base leading-input-text align-middle cursor-pointer flex items-center ${
            error ? 'border-strawberry-red bg-white dark:bg-gray-800' : 
            isFocused ? 'border-input-active-border dark:border-gray-500 bg-white dark:bg-gray-800' : 
            'border-input-active-border dark:border-gray-600 bg-input-inactive-bg dark:bg-gray-700'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={style}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onFocus={() => !disabled && setIsFocused(true)}
          onBlur={() => !isOpen && setIsFocused(false)}
        >
          <span className={`flex-1 ${!hasValue ? 'text-gray-400' : ''}`}>
            {hasValue ? getDisplayValue() : args.placeholder || 'Seçiniz'}
          </span>
          
          {/* Dropdown Arrow */}
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg 
              className={`h-4 w-4 text-cool-gray transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Dropdown Options */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-input-active-border dark:border-gray-600 rounded-[15px] shadow-lg z-50 max-h-60 overflow-y-auto">
                         {options.length > 0 ? (
               options.map((option, index) => {
                 const value = option.value || option.provincesId || option.districtId;
                 const label = option.label || option.provincesName || option.districtName;
                 const isSelected = value === args.value;
                
                return (
                  <div
                    key={value || index}
                    className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${
                      isSelected 
                        ? 'bg-[#3F2F70] text-white' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-input-text dark:text-gray-200'
                    } ${index === 0 ? 'rounded-t-[15px]' : ''} ${index === options.length - 1 ? 'rounded-b-[15px]' : ''}`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {label}
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-center">
                Seçenek bulunamadı
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-strawberry-red text-sm mt-1">{error}</p>
      )}
    </div>
  );
}; 