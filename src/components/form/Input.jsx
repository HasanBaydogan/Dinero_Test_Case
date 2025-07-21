import { useState } from 'react';

/**
 * Input with floating label, header, error, and any input args
 * @param {string} label
 * @param {string | undefined} error
 * @param {HTMLInputElement} args
 * @returns Input Component
 */
export const Input = ({ label, error, icon, dropdownIcon, multiline, style, disabled, ...args }) => {
  const hasValue = args.value && args.value.trim() !== '';
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
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

      {/* Input Field */}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        {dropdownIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {dropdownIcon}
          </div>
        )}
        {multiline ? (
          <textarea 
            className={`w-full h-[60px] pl-10 pr-4 py-4 border rounded-[60px] focus:outline-none transition-all duration-200 text-input-text dark:text-gray-200 font-red-hat-text font-normal text-base leading-input-text resize-none ${
              error ? 'border-strawberry-red bg-white dark:bg-gray-800' : 
              isFocused ? 'border-input-active-border dark:border-gray-500 bg-white dark:bg-gray-800' : 
              'border-input-active-border dark:border-gray-600 bg-input-inactive-bg dark:bg-gray-700'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
            style={style}
            onFocus={() => !disabled && setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            {...args} 
          />
        ) : (
          <input 
            className={`w-full h-[60px] pl-10 pr-4 border rounded-[60px] focus:outline-none transition-all duration-200 text-input-text dark:text-gray-200 font-red-hat-text font-normal text-base leading-input-text align-middle ${
              dropdownIcon ? 'pr-10' : ''
            } ${
              error ? 'border-strawberry-red bg-white dark:bg-gray-800' : 
              isFocused ? 'border-input-active-border dark:border-gray-500 bg-white dark:bg-gray-800' : 
              'border-input-active-border dark:border-gray-600 bg-input-inactive-bg dark:bg-gray-700'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
            style={style}
            onFocus={() => !disabled && setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            {...args} 
          />
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-strawberry-red text-sm mt-1">{error}</p>
      )}
    </div>
  );
};