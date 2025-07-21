import { useState, useRef } from 'react';
import FolderVector from "../../assets/images/Folder_Vector.png";

export const CVUpload = ({ label, error, onChange, disabled, ...args }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e) => {
    // Check if files exist and have length
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (onChange) {
        // Pass the original event to parent component
        onChange(e);
      }
    } else {
      // No file selected
      setSelectedFile(null);
      if (onChange) {
        // Create an event with no files
        const emptyEvent = {
          target: {
            files: []
          }
        };
        onChange(emptyEvent);
      }
    }
  };

  const getDisplayText = () => {
    if (selectedFile) {
      return selectedFile.name;
    }
    return (
      <span>
        <span className="text-base leading-[22px]">PNG, JPEG, PDF</span>
        <span className="text-xs leading-[22px] ml-1">(Maks. Boyut: 1MB)</span>
      </span>
    );
  };

  return (
    <div className="relative mb-4">
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
        {/* Upload Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <img src={FolderVector} alt="folder icon" />
        </div>

        {/* Clickable Input Area */}
        <div 
          className={`w-[450px] h-[60px] pl-10 pr-4 border rounded-[60px] flex items-center transition-all duration-200 font-red-hat-text font-normal ${
            error ? 'border-strawberry-red bg-white dark:bg-gray-800' : 
            isFocused ? 'border-input-active-border dark:border-gray-500 bg-white dark:bg-gray-800' : 
            'border-input-active-border dark:border-gray-600 bg-input-inactive-bg dark:bg-gray-700'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={handleInputClick}
          onMouseEnter={() => !disabled && setIsFocused(true)}
          onMouseLeave={() => setIsFocused(false)}
        >
          <span className={`${selectedFile ? 'text-input-text dark:text-gray-200 text-base leading-[22px]' : 'text-cool-gray dark:text-gray-400'}`}>
            {getDisplayText()}
          </span>
        </div>

        {/* Hidden File Input */}
        <input 
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".png,.jpeg,.jpg,.pdf"
          onChange={handleFileChange}
          {...args}
        />
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-strawberry-red text-sm mt-1">{error}</p>
      )}
    </div>
  );
}; 