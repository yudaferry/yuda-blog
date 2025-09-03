'use client';

import Link from "next/link";
import { useState, useEffect } from 'react';
import i18n from 'i18next';

interface TranslatedLinkProps {
  href: string;
  translationKey: string;
  className?: string;
}

export default function TranslatedLink({ href, translationKey, className }: TranslatedLinkProps) {
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
    const translation = i18n.t(key, { ns: 'common' });
    return translation !== key ? translation : key;
  };

  if (!mounted) {
    return <Link href={href} className={className}>Loading...</Link>;
  }

  return (
    <Link href={href} className={className}>
      {getTranslation(translationKey)}
    </Link>
  );
}