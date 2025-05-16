import type { Language, TranslatedString } from '@/types';

export type TranslationKey =
  | 'dashboardTitle'
  | 'selectLanguage'
  | 'english'
  | 'german'
  | 'japanese'
  | 'filters'
  | 'partCategory'
  | 'allCategories'
  | 'dateRange'
  | 'selectDateRange'
  | 'region'
  | 'allRegions'
  | 'kpis'
  | 'totalClaims'
  | 'averageServiceTime'
  | 'totalServiceCost'
  | 'hours'
  | 'regionalFailures'
  | 'failuresByRegion'
  | 'noData'
  | 'engineComponents'
  | 'transmissionParts'
  | 'electricalSystems'
  | 'brakeSystems'
  | 'northAmerica'
  | 'europe'
  | 'asia'
  | 'loadingData';

export const translations: Record<TranslationKey, TranslatedString> = {
  dashboardTitle: { en: 'LinguaTruck Dashboard', de: 'LinguaTruck Armaturenbrett', jp: 'LinguaTruck ダッシュボード' },
  selectLanguage: { en: 'Select Language', de: 'Sprache auswählen', jp: '言語を選択' },
  english: { en: 'English', de: 'Englisch', jp: '英語' },
  german: { en: 'German', de: 'Deutsch', jp: 'ドイツ語' },
  japanese: { en: 'Japanese', de: 'Japanisch', jp: '日本語' },
  filters: { en: 'Filters', de: 'Filter', jp: 'フィルター' },
  partCategory: { en: 'Part Category', de: 'Teilekategorie', jp: '部品カテゴリ' },
  allCategories: { en: 'All Categories', de: 'Alle Kategorien', jp: 'すべてのカテゴリ' },
  dateRange: { en: 'Date Range', de: 'Datumsbereich', jp: '日付範囲' },
  selectDateRange: { en: 'Select Date Range', de: 'Datumsbereich auswählen', jp: '日付範囲を選択' },
  region: { en: 'Region', de: 'Region', jp: '地域' },
  allRegions: { en: 'All Regions', de: 'Alle Regionen', jp: 'すべての地域' },
  kpis: { en: 'Key Performance Indicators', de: 'Leistungskennzahlen', jp: '主要業績評価指標' },
  totalClaims: { en: 'Total Claims', de: 'Gesamte Ansprüche', jp: '総請求件数' },
  averageServiceTime: { en: 'Avg. Service Time', de: 'Ø Servicezeit', jp: '平均サービス時間' },
  totalServiceCost: { en: 'Total Service Cost', de: 'Gesamte Servicekosten', jp: '総サービスコスト' },
  hours: { en: 'hrs', de: 'Std.', jp: '時間' },
  regionalFailures: { en: 'Regional Failures', de: 'Regionale Ausfälle', jp: '地域別故障' },
  failuresByRegion: { en: 'Failures by Region', de: 'Ausfälle nach Region', jp: '地域別故障件数' },
  noData: { en: 'No data available', de: 'Keine Daten verfügbar', jp: '利用可能なデータがありません' },
  engineComponents: { en: 'Engine Components', de: 'Motorkomponenten', jp: 'エンジン部品' },
  transmissionParts: { en: 'Transmission Parts', de: 'Getriebeteile', jp: 'トランスミッション部品' },
  electricalSystems: { en: 'Electrical Systems', de: 'Elektrische Systeme', jp: '電気系統' },
  brakeSystems: { en: 'Brake Systems', de: 'Bremssysteme', jp: 'ブレーキシステム' },
  northAmerica: { en: 'North America', de: 'Nordamerika', jp: '北米' },
  europe: { en: 'Europe', de: 'Europa', jp: 'ヨーロッパ' },
  asia: { en: 'Asia', de: 'Asien', jp: 'アジア' },
  loadingData: { en: 'Loading data...', de: 'Daten werden geladen...', jp: 'データを読み込んでいます...' },
};

export const translate = (key: TranslationKey, lang: Language): string => {
  return translations[key]?.[lang] || key;
};
