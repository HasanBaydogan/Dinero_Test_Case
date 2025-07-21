import React from 'react';
import Lottie from 'react-lottie';
import successAnimation from '../assets/animations/successAnimation.json';
import loadingAnimation from '../assets/animations/loadingAnimation.json';

const ResponseModal = ({ isOpen, response, onClose }) => {
  if (!isOpen) return null;

  // Lottie animation options
  const successLottieOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const errorLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const isSuccess = response?.success;
  const status = response?.status;
  const title = response?.title;
  const message = response?.message;
  const data = response?.data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`px-6 py-4 rounded-t-2xl ${
          isSuccess 
            ? 'bg-green-50 dark:bg-green-900/20' 
            : 'bg-red-50 dark:bg-red-900/20'
        }`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-semibold ${
              isSuccess 
                ? 'text-green-800 dark:text-green-200' 
                : 'text-red-800 dark:text-red-200'
            }`}>
              {title || (isSuccess ? 'Başarılı' : 'Hata')}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Animation */}
          <div className="flex justify-center mb-4">
            <div className="w-32 h-32">
              <Lottie 
                options={isSuccess ? successLottieOptions : errorLottieOptions}
                height={128}
                width={128}
              />
            </div>
          </div>

          {/* Status Code */}
          <div className="text-center mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              isSuccess 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
            }`}>
              {status ? `Durum: ${status}` : ''}
            </span>
          </div>

          {/* Message */}
          <div className="text-center mb-6">
            <p className={`text-lg ${
              isSuccess 
                ? 'text-green-700 dark:text-green-300' 
                : 'text-red-700 dark:text-red-300'
            }`}>
              {message || 'Mesaj bulunamadı'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isSuccess
                  ? 'bg-green-600 dark:bg-green-500 text-white hover:bg-green-700 dark:hover:bg-green-600'
                  : 'bg-red-600 dark:bg-red-500 text-white hover:bg-red-700 dark:hover:bg-red-600'
              }`}
            >
              {isSuccess ? 'Tamam' : 'Kapat'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseModal; 