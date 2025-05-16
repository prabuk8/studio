"use client";

import { useLanguage } from '@/hooks/use-language';
import type { Language } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages } from 'lucide-react';

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  const languages: { value: Language; labelKey: 'english' | 'german' | 'japanese' }[] = [
    { value: 'en', labelKey: 'english' },
    { value: 'de', labelKey: 'german' },
    { value: 'jp', labelKey: 'japanese' },
  ];

  return (
    <div className="flex items-center space-x-2">
      <Languages className="h-5 w-5 text-muted-foreground" />
      <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
        <SelectTrigger className="w-[180px] bg-card text-card-foreground border-border shadow-sm">
          <SelectValue placeholder={t('selectLanguage')} />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              {t(lang.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
