import { useState } from 'react';
import { X, Download, Save, Share2, ShoppingCart, AlertCircle, Info, Activity } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const MedicineDetailModal = ({ medicine, onClose }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('usage');

  if (!medicine) return null;

  const tabs = [
    { id: 'usage', label: t('usage'), icon: <Info size={16} /> },
    { id: 'sideEffects', label: t('sideEffects'), icon: <Activity size={16} /> },
    { id: 'warnings', label: t('warnings'), icon: <AlertCircle size={16} /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-xl shadow-xl ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`px-6 py-4 flex items-start justify-between border-b ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`h-12 w-12 rounded-lg overflow-hidden ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            } flex items-center justify-center flex-shrink-0`}>
              {medicine.image ? (
                <img src={medicine.image} alt={medicine.brand} className="w-full h-full object-cover" />
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V16M8 12H16M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" 
                    stroke={theme === 'dark' ? '#6B7280' : '#9CA3AF'} 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                </svg>
              )}
            </div>
            <div>
              <h2 className={`font-semibold text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {medicine.brand}
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {medicine.generic}
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className={`p-2 rounded-full ${
              theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
            }`}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Tabs */}
        <div className={`flex border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? theme === 'dark'
                    ? 'border-b-2 border-blue-500 text-blue-400'
                    : 'border-b-2 border-blue-600 text-blue-700'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:text-gray-300'
                    : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
          {activeTab === 'usage' && (
            <div>
              <h3 className={`text-lg font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                How to Use
              </h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {medicine.usage || 'No usage information available for this medicine.'}
              </p>
              
              {medicine.dosage && (
                <div className={`mt-4 p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'
                }`}>
                  <h4 className={`font-medium mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-blue-800'
                  }`}>
                    Recommended Dosage
                  </h4>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-blue-700'}`}>
                    {medicine.dosage}
                  </p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'sideEffects' && (
            <div>
              <h3 className={`text-lg font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Possible Side Effects
              </h3>
              
              {medicine.sideEffects ? (
                <div className="space-y-2">
                  {Array.isArray(medicine.sideEffects) ? (
                    medicine.sideEffects.map((effect, index) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                        }`}
                      >
                        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {effect}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {medicine.sideEffects}
                    </p>
                  )}
                </div>
              ) : (
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  No side effects information available for this medicine.
                </p>
              )}
            </div>
          )}
          
          {activeTab === 'warnings' && (
            <div>
              <h3 className={`text-lg font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Warnings and Precautions
              </h3>
              
              {medicine.warnings ? (
                <div className={`p-4 rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-red-900/20 border-red-900/30 text-red-300' 
                    : 'bg-red-50 border-red-100 text-red-700'
                }`}>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="flex-shrink-0 mt-1" size={20} />
                    <p>{medicine.warnings}</p>
                  </div>
                </div>
              ) : (
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  No warning information available for this medicine.
                </p>
              )}
              
              {medicine.interactions && (
                <div className="mt-6">
                  <h4 className={`font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Drug Interactions
                  </h4>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {medicine.interactions}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Footer Actions */}
        <div className={`px-6 py-4 flex items-center justify-between border-t ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-2">
            <button type="button" className={`p-2 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}>
              <Save size={18} />
            </button>
            <button className={`p-2 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}>
              <Download size={18} />
            </button>
            <button className={`p-2 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}>
              <Share2 size={18} />
            </button>
          </div>
          
          {medicine.buyLink && (
            <a 
              href={medicine.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 py-2 px-4 rounded-lg ${
                theme === 'dark' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              <ShoppingCart size={18} />
              <span>Buy online</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineDetailModal;