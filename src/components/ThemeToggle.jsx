import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
      aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-gray-300" />
      ) : (
        <Moon size={20} className="text-gray-600" />
      )}
    </button>
  );
};

export default ThemeToggle;