import type { TruckPart } from '@/types';

export const sampleTruckParts: TruckPart[] = [
  {
    id: '1',
    partNumber: 'ENG001',
    description: { en: 'Turbocharger Unit', de: 'Turbolader-Einheit', jp: 'ターボチャージャーユニット' },
    category: { en: 'Engine Components', de: 'Motorkomponenten', jp: 'エンジン部品' },
    failureRate: 0.5,
    region: { en: 'North America', de: 'Nordamerika', jp: '北米' },
    serviceCost: 1200,
    warrantyClaims: 15,
    serviceTime: 8,
    failureDate: '2023-01-15',
  },
  {
    id: '2',
    partNumber: 'TRN002',
    description: { en: 'Clutch Assembly', de: 'Kupplungsbaugruppe', jp: 'クラッチアセンブリ' },
    category: { en: 'Transmission Parts', de: 'Getriebeteile', jp: 'トランスミッション部品' },
    failureRate: 0.8,
    region: { en: 'Europe', de: 'Europa', jp: 'ヨーロッパ' },
    serviceCost: 800,
    warrantyClaims: 25,
    serviceTime: 6,
    failureDate: '2023-02-20',
  },
  {
    id: '3',
    partNumber: 'ELC003',
    description: { en: 'Alternator', de: 'Lichtmaschine', jp: 'オルタネーター' },
    category: { en: 'Electrical Systems', de: 'Elektrische Systeme', jp: '電気系統' },
    failureRate: 0.3,
    region: { en: 'Asia', de: 'Asien', jp: 'アジア' },
    serviceCost: 450,
    warrantyClaims: 10,
    serviceTime: 3,
    failureDate: '2023-03-10',
  },
  {
    id: '4',
    partNumber: 'BRK004',
    description: { en: 'Brake Pad Set', de: 'Bremsbelagsatz', jp: 'ブレーキパッドセット' },
    category: { en: 'Brake Systems', de: 'Bremssysteme', jp: 'ブレーキシステム' },
    failureRate: 1.2,
    region: { en: 'North America', de: 'Nordamerika', jp: '北米' },
    serviceCost: 250,
    warrantyClaims: 40,
    serviceTime: 2,
    failureDate: '2023-04-05',
  },
  {
    id: '5',
    partNumber: 'ENG005',
    description: { en: 'Fuel Injector', de: 'Einspritzdüse', jp: '燃料噴射装置' },
    category: { en: 'Engine Components', de: 'Motorkomponenten', jp: 'エンジン部品' },
    failureRate: 0.6,
    region: { en: 'Europe', de: 'Europa', jp: 'ヨーロッパ' },
    serviceCost: 600,
    warrantyClaims: 18,
    serviceTime: 4,
    failureDate: '2023-05-12',
  },
  {
    id: '6',
    partNumber: 'ELC006',
    description: { en: 'Starter Motor', de: 'Anlasser', jp: 'スターターモーター' },
    category: { en: 'Electrical Systems', de: 'Elektrische Systeme', jp: '電気系統' },
    failureRate: 0.4,
    region: { en: 'Asia', de: 'Asien', jp: 'アジア' },
    serviceCost: 700,
    warrantyClaims: 12,
    serviceTime: 5,
    failureDate: '2023-06-18',
  },
   {
    id: '7',
    partNumber: 'ENG007',
    description: { en: 'Piston Set', de: 'Kolbensatz', jp: 'ピストンセット' },
    category: { en: 'Engine Components', de: 'Motorkomponenten', jp: 'エンジン部品' },
    failureRate: 0.7,
    region: { en: 'North America', de: 'Nordamerika', jp: '北米' },
    serviceCost: 1500,
    warrantyClaims: 22,
    serviceTime: 10,
    failureDate: '2023-07-22',
  },
  {
    id: '8',
    partNumber: 'TRN008',
    description: { en: 'Gearbox Sensor', de: 'Getriebesensor', jp: 'ギアボックスセンサー' },
    category: { en: 'Transmission Parts', de: 'Getriebeteile', jp: 'トランスミッション部品' },
    failureRate: 0.9,
    region: { en: 'Europe', de: 'Europa', jp: 'ヨーロッパ' },
    serviceCost: 350,
    warrantyClaims: 30,
    serviceTime: 3,
    failureDate: '2023-08-30',
  },
  {
    id: '9',
    partNumber: 'BRK009',
    description: { en: 'Brake Caliper', de: 'Bremssattel', jp: 'ブレーキキャリパー' },
    category: { en: 'Brake Systems', de: 'Bremssysteme', jp: 'ブレーキシステム' },
    failureRate: 1.0,
    region: { en: 'Asia', de: 'Asien', jp: 'アジア' },
    serviceCost: 400,
    warrantyClaims: 28,
    serviceTime: 4,
    failureDate: '2024-01-10',
  },
  {
    id: '10',
    partNumber: 'ENG010',
    description: { en: 'Radiator Fan', de: 'Kühlerventilator', jp: 'ラジエーターファン' },
    category: { en: 'Engine Components', de: 'Motorkomponenten', jp: 'エンジン部品' },
    failureRate: 0.2,
    region: { en: 'North America', de: 'Nordamerika', jp: '北米' },
    serviceCost: 300,
    warrantyClaims: 5,
    serviceTime: 2.5,
    failureDate: '2024-02-15',
  }
];

export const partCategories = Array.from(new Set(sampleTruckParts.map(p => JSON.stringify(p.category))))
  .map(s => JSON.parse(s) as { en: string; de: string; jp: string; });

export const regions = Array.from(new Set(sampleTruckParts.map(p => JSON.stringify(p.region))))
  .map(s => JSON.parse(s) as { en: string; de: string; jp: string; });
