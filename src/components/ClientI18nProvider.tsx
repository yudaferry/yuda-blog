'use client';

import { useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from '../../public/locales/en/common.json';
import idCommon from '../../public/locales/id/common.json';
import enHome from '../../public/locales/en/home.json';
import idHome from '../../public/locales/id/home.json';
import enBlog from '../../public/locales/en/blog.json';
import idBlog from '../../public/locales/id/blog.json';
import enProfile from '../../public/locales/en/profile.json';
import idProfile from '../../public/locales/id/profile.json';
import enProfileData from '../../public/locales/en/profile-data.json';
import idProfileData from '../../public/locales/id/profile-data.json';

const resources = {
  en: {
    common: enCommon,
    home: enHome,
    blog: enBlog,
    profile: enProfile,
    'profile-data': enProfileData,
  },
  id: {
    common: idCommon,
    home: idHome,
    blog: idBlog,
    profile: idProfile,
    'profile-data': idProfileData,
  },
};

export default function ClientI18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!i18n.isInitialized) {
      i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
          resources,
          fallbackLng: 'en',
          debug: process.env.NODE_ENV === 'development',

          interpolation: {
            escapeValue: false,
          },

          detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
          },
        });
    }
  }, []);

  return <>{children}</>;
}