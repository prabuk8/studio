export type Language = 'en' | 'de' | 'jp';

export interface TranslatedString {
  en: string;
  de: string;
  jp: string;
}

export interface TruckPart {
  id: string;
  partNumber: string;
  description: TranslatedString;
  category: TranslatedString;
  failureRate: number; // percentage
  region: TranslatedString;
  serviceCost: number; // currency
  warrantyClaims: number;
  serviceTime: number; // hours
  failureDate: string; // YYYY-MM-DD
}

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}
