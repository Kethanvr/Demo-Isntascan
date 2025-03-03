import { useState } from 'react';
import { Home, Clock, Filter, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const Sidebar = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  
  const filters = [
    { id: 'all', name: 'All' },
    { id: 'antibiotics', name: 'Antibiotics' },
    { id: 'painkillers', name: 'Painkillers' },
    { id: 'antidiabetics', name: 'Antidiabetics' },
    { id: 'antihistamines', name: 'Antihistamines' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden lg:block w-64 transition-all duration-300 border-r ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800 text-gray-200' : 'bg-white border-gray-100 text-gray-800'
        } ${isCollapsed ? 'w-20' : 'w-64'} pt-16`}
      >
        <div className="h-full flex flex-col">
          <nav className="flex-1 py-4 px-3">
            <div className="mb-6">
              <h3 className={`text-xs uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-3 px-2`}>
                Main
              </h3>
              <ul>
                <li>
                  <a href="#dashboard" className={`flex items-center py-2 px-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                    <Home size={20} className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}`} />
                    {!isCollapsed && <span className="ml-3">Dashboard</span>}
                  </a>
                </li>
                <li>
                  <a href="#history" className={`flex items-center py-2 px-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                    <Clock size={20} className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                    {!isCollapsed && <span className="ml-3">{t('scanHistory')}</span>}
                  </a>
                </li>
              </ul>
            </div>
            
            {!isCollapsed && (
              <div className="mb-6">
                <h3 className={`text-xs uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-3 px-2 flex items-center`}>
                  <Filter size={14} className="mr-1" /> {t('filters')}
                </h3>
                <ul>
                  {filters.map(filter => (
                    <li key={filter.id}>
                      <button
                        className={`w-full text-left py-2 px-2 rounded-lg transition-colors ${
                          selectedFilter === filter.id 
                            ? `${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'}`
                            : `${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`
                        }`}
                        onClick={() => setSelectedFilter(filter.id)}
                      >
                        {filter.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </nav>
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`self-end p-1.5 rounded-full mb-4 mr-3 ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
            >
              <path 
                d="M10 12L6 8L10 4" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </button>
        </div>
      </aside>
      
      {/* Mobile Sidebar - Will slide in from left */}
      <div className="block lg:hidden">
        {/* Mobile sidebar menu content here */}
      </div>
    </>
  );
};

export default Sidebar;