export type Language =
  | 'en' | 'ta' | 'hi' | 'ar' | 'zh'
  | 'ja' | 'ko' | 'de' | 'fr' | 'es'
  | 'it' | 'ru' | 'pt' | 'tr';

export type Currency = 'USD' | 'INR' | 'EUR' | 'GBP' | 'AED' | 'JPY' | 'CNY';

export type CountryCode = 'IN' | 'US' | 'DE' | 'CN' | 'JP' | 'SG' | 'GB' | 'AE';

export type UserRole =
  | 'importer'
  | 'exporter'
  | 'msme'
  | 'manufacturer'
  | 'logistics'
  | 'customs_broker'
  | 'student'
  | 'consultant'
  | 'government';

export type NavigationItem =
  | 'dashboard'
  | 'ai-assistant'
  | 'partners'
  | 'shipments'
  | 'regulations'
  | 'marketplace'
  | 'documents'
  | 'analytics'
  | 'learning'
  | 'internships'
  | 'profile'
  | 'settings'
  | 'premium'
  | 'support';

export interface CountryInfo {
  code: CountryCode;
  name: string;
  flag: string;
  region: string;
  currency: Currency;
  importRulesCount: number;
  exportRulesCount: number;
  avgCustomDuty: string;
  gstVatRate: string;
  mainPorts: string[];
  keyExportProducts: string[];
  restrictedItems: string[];
  activeFTAs: string[];
}

export interface PartnerCompany {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  country: CountryCode;
  countryName: string;
  industry: string;
  trustScore: number; // 0-100
  rating: number; // 1-5
  aiMatchScore: number; // %
  verified: boolean;
  tradeHistoryCount: number;
  totalVolumeUSD: number;
  products: string[];
  certifications: string[];
  contactEmail: string;
  establishedYear: number;
  employeeCount: string;
  bio: string;
}

export interface TimelineStep {
  title: string;
  location: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
}

export interface ShipmentItem {
  id: string;
  trackingNumber: string;
  containerId: string;
  originCountry: CountryCode;
  originPort: string;
  destinationCountry: CountryCode;
  destinationPort: string;
  carrier: string;
  carrierLogo: string;
  status: 'In Transit' | 'Customs Hold' | 'Port Handling' | 'Delivered' | 'Booking Confirmed';
  progress: number; // 0 - 100%
  eta: string;
  departureDate: string;
  goodsDescription: string;
  weightKg: number;
  valueUSD: number;
  aiDelayRisk: 'Low' | 'Medium' | 'High';
  aiRiskReason?: string;
  timeline: TimelineStep[];
  temperatureControl?: string;
  hsCode: string;
}

export interface CarrierRate {
  id: string;
  carrierName: string;
  logo: string;
  serviceType: string;
  priceUSD: number;
  transitDays: string;
  rating: number;
  co2Kg: number;
  onTimeRate: number;
  insuranceIncluded: boolean;
  features: string[];
}

export interface RegulationResult {
  hsCode: string;
  productName: string;
  originCountry: string;
  destinationCountry: string;
  importRules: string[];
  exportRules: string[];
  customDutyRate: string;
  gstVat: string;
  antiDumpingDuty: string;
  requiredCertificates: string[];
  restrictedNotes: string;
  tradeAgreementBenefits: string;
  complianceChecklist: string[];
}

export interface TradeDocument {
  id: string;
  type: 'Commercial Invoice' | 'Packing List' | 'Certificate of Origin' | 'Bill of Lading' | 'Purchase Order' | 'Sales Contract' | 'Shipping Label';
  docNumber: string;
  date: string;
  exporterName: string;
  importerName: string;
  origin: string;
  destination: string;
  totalAmountUSD: number;
  status: 'Draft' | 'Generated' | 'Signed' | 'Customs Approved';
  hsCode: string;
  items: { description: string; quantity: number; unitPriceUSD: number; totalUSD: number }[];
}

export interface CourseItem {
  id: string;
  title: string;
  category: 'Customs Compliance' | 'Incoterms' | 'Export Finance' | 'Logistics Management' | 'Trade Agreements';
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  enrolledStudents: number;
  image: string;
  certificationOffered: string;
}

export interface InternshipItem {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: 'Full-time' | 'Remote' | 'Hybrid';
  stipendUSD: number;
  duration: string;
  skillsRequired: string[];
  postedDate: string;
  applicantCount: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'shipment' | 'ai' | 'compliance' | 'payment' | 'partner';
  unread: boolean;
}

export interface AiQueryResult {
  query: string;
  hsCode: string;
  productCategory: string;
  origin: string;
  destination: string;
  requiredDocs: string[];
  importRestrictions: string[];
  taxesAndDuties: {
    basicCustomsDuty: string;
    igstOrVat: string;
    socialWelfareSurcharge: string;
  };
  tradeAgreements: string;
  certificatesNeeded: string[];
  estimatedShippingDays: string;
  bestCarriers: string[];
  recommendedBuyers: string[];
  riskScore: number; // 0 - 100
  complianceScore: number; // 0 - 100
  summaryReport: string;
}
