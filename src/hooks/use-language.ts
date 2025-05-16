"use client";

import { useContext } from 'react';
import { LanguageContext } from '@/contexts/language-context';
import { translate, TranslationKey } from '@/lib/translations';
import type { Language } from '@/types';

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  const t = (key: TranslationKey) => translate(key, context.language);

  return {
    language: context.language,
    setLanguage: context.setLanguage,
    t,
  };
};
