import { useState, useRef, useEffect } from 'react';
import FolderVector from "../../assets/images/Folder_Vector.png";

export const CVUpload = ({ label, error, onChange, disabled, ...args }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSizeError, setFileSizeError] = useState('');
  const fileInputRef = useRef(null);

  // Clear file size error when error prop changes (when form is reset or valid file is selected)
  useEffect(() => {
    if (!error) {
      setFileSizeError('');
    }
  }, [error]);

  const handleInputClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e) => {
    // Clear any previous file size error
    setFileSizeError('');
    
    // Check if files exist and have length
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Check file size (1MB = 1024 * 1024 bytes)
      const maxSize = 1 * 1024 * 1024;
      if (file.size > maxSize) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        setFileSizeError(`Dosya boyutu 1MB'dan büyük olamaz. Seçilen dosya: ${fileSizeMB}MB`);
        // Clear the input
        e.target.value = '';
        setSelectedFile(null);
        return;
      }
      
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
        <span className="text-base leading-[22px]">PDF, DOC, DOCX</span>
        <span className="text-xs leading-[22px] ml-1">(Maks. Boyut: 1MB)</span>
      </span>
    );
  };

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
        {/* Upload Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <img src={FolderVector} alt="folder icon" />
        </div>

        {/* Clickable Input Area */}
        <div 
          className={`w-full h-[60px] pl-10 pr-4 border rounded-[60px] flex items-center transition-all duration-200 font-red-hat-text font-normal ${
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
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          {...args}
        />
      </div>

      {/* Error Messages */}
      {(error || fileSizeError) && (
        <p className="text-strawberry-red text-sm mt-1">{error || fileSizeError}</p>
      )}
    </div>
  );
}; 