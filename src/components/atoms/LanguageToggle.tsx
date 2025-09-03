'use client';

import { useState, useEffect } from 'react';
import i18n from 'i18next';

export default function LanguageToggle() {
  const [mounted, setMounted] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    setMounted(true);
    
    // Wait for i18n to initialize
    const checkInitialization = () => {
      if (i18n.isInitialized) {
        setCurrentLang(i18n.language);
        
        const handleLanguageChange = (lng: string) => {
          setCurrentLang(lng);
          // Force re-render of components by triggering a custom event
          window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lng } }));
        };

        i18n.on('languageChanged', handleLanguageChange);
        
        return () => {
          i18n.off('languageChanged', handleLanguageChange);
        };
      } else {
        setTimeout(checkInitialization, 100);
      }
    };
    
    checkInitialization();
  }, []);

  const toggleLanguage = async () => {
    const newLang = currentLang === 'en' ? 'id' : 'en';
    await i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
    // Force page refresh to update all components
    window.location.reload();
  };

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200">
        <span className="text-lg">🌐</span>
        <span className="hidden sm:inline">Loading...</span>
      </div>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
      aria-label="Switch Language"
    >
      <span className="text-lg">
        {currentLang === 'en' ? '🇮🇩' : '🇺🇸'}
      </span>
      <span className="hidden sm:inline">
        {currentLang === 'en' ? 'Bahasa Indonesia' : 'English'}
      </span>
    </button>
  );
}