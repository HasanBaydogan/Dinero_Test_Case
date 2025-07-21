import React from 'react';
import Lottie from 'react-lottie';
import successAnimation from '../assets/animations/successAnimation.json';

const ResponseModal = ({ isOpen, response, onClose }) => {
  if (!isOpen) return null;

  // Lottie animation options
  const lottieOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
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
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`px-6 py-4 rounded-t-2xl ${
          isSuccess ? 'bg-green-50' : 'bg-red-50'
        }`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-semibold ${
              isSuccess ? 'text-green-800' : 'text-red-800'
            }`}>
              {title || (isSuccess ? 'Başarılı' : 'Hata')}
            </h2>
            <button
              onClick={onClose}
              className="bg-red-600 text-white hover:bg-red-700 transition-colors"
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
          {isSuccess && (
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32">
                <Lottie 
                  options={lottieOptions}
                  height={128}
                  width={128}
                />
              </div>
            </div>
          )}

          {/* Status Code */}
          <div className="text-center mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              isSuccess 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
            </span>
          </div>

          {/* Message */}
          <div className="text-center mb-6">
            <p className={`text-lg ${
              isSuccess ? 'text-green-700' : 'text-red-700'
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
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-red-600 text-white hover:bg-red-700'
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