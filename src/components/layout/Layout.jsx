import Header from './Header';
import Sidebar from './Sidebar';
import { useTheme } from '../../contexts/ThemeContext';

const Layout = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme === 'dark' ? 'from-gray-900 to-gray-800' : 'from-gray-50 to-white'} transition-colors duration-300`}>
      <Header />
      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar />
        <main className="flex-1 px-4 md:px-6 lg:px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;