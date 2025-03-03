import { useState } from 'react';
import { Search, Bell, Menu, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import ThemeToggle from '../ThemeToggle';
import LanguageSwitcher from '../LanguageSwitcher';

const Header = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleProfileMenu = () => setProfileOpen(!profileOpen);
  
  return (
    <header className={`fixed w-full z-50 ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'} border-b shadow-sm h-16 transition-colors duration-300`}>
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <button 
            type="button"
            className="mr-4 lg:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <title>MediScan AI Logo</title>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#0052CC" />
              <path d="M8 11L16 7L24 11V21L16 25L8 21V11Z" fill="white" stroke="white" strokeWidth="2" />
              <path d="M16 15L16 20" stroke="#0052CC" strokeWidth="2" strokeLinecap="round" />
              <circle cx="16" cy="12" r="2" fill="#0052CC" />
            </svg>
            <span className={`ml-2 font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              MediScan AI
            </span>
          </div>
        </div>
        
        {/* Search bar - hidden on mobile */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className={`flex items-center w-full px-3 py-2 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
            <Search size={18} className="mr-2 text-gray-400" />
            <input 
              type="text" 
              placeholder={t('search')}
              className={`w-full bg-transparent border-none focus:outline-none ${theme === 'dark' ? 'placeholder-gray-500' : 'placeholder-gray-400'}`}
            />
          </div>
        </div>
        
        {/* Right side icons */}
        <div className="flex items-center">
          <ThemeToggle />
          <LanguageSwitcher />
          <button type="button" aria-label="Notifications" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <Bell size={20} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
          </button>
          <div className="relative ml-2">
            <button 
              onClick={toggleProfileMenu}
              className={`flex items-center ml-2 p-1 rounded-full border-2 ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'}`}
              aria-label="User profile"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                MS
              </div>
            </button>
            
            {profileOpen && (
              <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}>
                <div className="py-1">
                  <a href="#profile" className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    {t('profile')}
                  </a>
                  <a href="#settings" className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    {t('settings')}
                  </a>
                  <a href="#logout" className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    {t('logout')}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;