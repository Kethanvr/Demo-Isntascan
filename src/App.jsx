import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Layout>
          <Dashboard />
        </Layout>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;