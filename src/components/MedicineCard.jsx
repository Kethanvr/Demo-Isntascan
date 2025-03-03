import { useState } from 'react';
import { Info, AlertCircle, ExternalLink, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const MedicineCard = ({ medicine, onClick }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };
  
  return (
    <div 
      onClick={() => onClick && onClick(medicine)}
      className={`rounded-xl overflow-hidden ${
        theme === 'dark' 
          ? 'bg-gray-800 hover:bg-gray-750 border border-gray-700' 
          : 'bg-white hover:bg-gray-50 border border-gray-200'
      } transition-all duration-200 hover:shadow-md cursor-pointer`}
    >
      <div className="p-4 flex flex-col sm:flex-row gap-4">
        {/* Medicine Image */}
        <div className={`h-24 w-24 rounded-lg overflow-hidden flex-shrink-0 ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
        } flex items-center justify-center self-center`}>
          {medicine.image ? (
            <img src={medicine.image} alt={medicine.brand} className="w-full h-full object-cover" />
          ) : (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V16M8 12H16M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" 
                stroke={theme === 'dark' ? '#6B7280' : '#9CA3AF'} 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          )}
        </div>
        
        {/* Medicine Info */}
        <div className="flex-1">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {medicine.brand}
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {medicine.generic}
                </p>
              </div>
              
              {medicine.price && (
                <div className={`flex items-center px-2 py-1 rounded-full ${
                  theme === 'dark' ? 'bg-gray-700 text-green-300' : 'bg-green-50 text-green-700'
                }`}>
                  <DollarSign size={14} />
                  <span className="text-sm font-medium">{medicine.price}</span>
                </div>
              )}
            </div>
            
            {medicine.warnings && (
              <div className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full w-fit ${
                theme === 'dark' ? 'bg-red-900/30 text-red-300' : 'bg-red-50 text-red-700'
              }`}>
                <AlertCircle size={12} />
                <span>{medicine.warnings}</span>
              </div>
            )}
            
            <div className={`mt-2 ${expanded ? 'block' : 'hidden'}`}>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {medicine.description || 'No description available'}
              </p>
              
              {medicine.alternatives && medicine.alternatives.length > 0 && (
                <div className="mt-2">
                  <p className={`text-xs font-medium uppercase tracking-wider ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {t('alternatives')}:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {medicine.alternatives.map((alt, index) => (
                      <span key={index} className={`text-xs px-2 py-1 rounded-full ${
                        theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <button 
                className={`flex items-center gap-1 text-sm ${
                  theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}
                onClick={() => onClick && onClick(medicine)}
              >
                <Info size={16} />
                <span>{t('viewDetails')}</span>
              </button>
              
              <button 
                className={`p-1 rounded-full ${
                  theme === 'dark' ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'
                }`}
                onClick={toggleExpanded}
              >
                {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard