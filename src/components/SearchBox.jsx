import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const SearchBox = ({ onSearch }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      if (onSearch) {
        onSearch(query);
      }
    }, 1000);
  };

  const clearSearch = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className={`relative rounded-xl overflow-hidden shadow-sm ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } border ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center h-12">
          <div className="flex items-center justify-center w-12">
            {isSearching ? (
              <div className="w-5 h-5 border-2 border-t-blue-500 border-blue-500/30 rounded-full animate-spin"></div>
            ) : (
              <Search size={18} className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            )}
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search')}
            className={`w-full h-full px-0 border-none bg-transparent focus:ring-0 ${
              theme === 'dark' ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
            }`}
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="w-12 flex items-center justify-center"
            >
              <X size={18} className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} hover:text-gray-600`} />
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default SearchBox;