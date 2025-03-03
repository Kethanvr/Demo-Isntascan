import { useState, useRef } from 'react';
import { Upload, Camera, File } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const DragDropUploader = ({ onFileSelect }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setFile(file);
    setIsLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      if (onFileSelect) {
        onFileSelect(file);
      }
    }, 2000);
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <div 
      className={`w-full p-6 rounded-xl border-2 border-dashed transition-all duration-300 ${
        isDragging 
          ? `${theme === 'dark' ? 'border-blue-400 bg-blue-900/20' : 'border-blue-400 bg-blue-50'}`
          : `${theme === 'dark' ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'}`
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
            <p className={`mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Processing your image...</p>
          </div>
        ) : file ? (
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <File size={32} className="text-green-500" />
            </div>
            <p className={`font-medium mt-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{file.name}</p>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <button
              onClick={() => setFile(null)}
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Upload another
            </button>
          </div>
        ) : (
          <>
            <div className={`w-16 h-16 rounded-full ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'} flex items-center justify-center`}>
              <Upload size={28} className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}`} />
            </div>
            <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('dragDrop')}
            </h3>
            <p className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Supported formats: JPG, PNG, JPEG
            </p>
            <div className="flex items-center gap-2 my-2">
              <div className={`h-px w-16 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{t('or')}</span>
              <div className={`h-px w-16 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            </div>
            <button
              onClick={openFileDialog}
              className={`px-4 py-2 rounded-lg ${
                theme === 'dark' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              } font-medium transition-colors`}
            >
              {t('browseFile')}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              accept="image/*"
              className="hidden"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DragDropUploader;