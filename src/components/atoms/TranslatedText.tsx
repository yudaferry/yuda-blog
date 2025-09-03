'use client';

import { useState, useEffect } from 'react';
import i18n from 'i18next';

interface TranslatedTextProps {
  translationKey: string;
  namespace?: string;
  interpolation?: Record<string, string | number>;
  className?: string;
}

export default function TranslatedText({ 
  translationKey, 
  namespace = 'common', 
  interpolation,
  className 
}: TranslatedTextProps) {
  const [mounted, setMounted] = useState(false);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    setMounted(true);
    
    const handleLanguageChange = () => {
      forceUpdate({});
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  const getTranslation = (key: string) => {
    if (!i18n.isInitialized) return key;
    const options = {
      ns: namespace,
      ...interpolation
    };
    const translation = i18n.t(key, options);
    return translation !== key ? translation : key;
  };

  if (!mounted) {
    return <span className={className}>Loading...</span>;
  }

  return <span className={className}>{getTranslation(translationKey)}</span>;
}