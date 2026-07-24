import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  CountryCode,
  Currency,
  Language,
  NavigationItem,
  NotificationItem,
  UserRole,
  CountryInfo
} from '../types';
import { COUNTRY_DATA, CURRENCY_MAP, MOCK_NOTIFICATIONS, TRANSLATIONS } from '../data/mockData';

interface TradeContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  selectedCountry: CountryCode;
  setSelectedCountry: (country: CountryCode) => void;
  currentCountryInfo: CountryInfo;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeRoute: NavigationItem;
  setActiveRoute: (route: NavigationItem) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean | ((prev: boolean) => boolean)) => void;
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  formatAmount: (amountInUSD: number) => string;
  t: (key: string) => string;
}

const TradeContext = createContext<TradeContextType | undefined>(undefined);

export const TradeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('IN');
  const [userRole, setUserRole] = useState<UserRole>('exporter');
  const [activeRoute, setActiveRoute] = useState<NavigationItem>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const currentCountryInfo = COUNTRY_DATA[selectedCountry] || COUNTRY_DATA['IN'];

  const unreadNotificationCount = notifications.filter(n => n.unread).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const formatAmount = (amountInUSD: number): string => {
    const config = CURRENCY_MAP[currency] || CURRENCY_MAP['USD'];
    const converted = amountInUSD * config.rateFromUSD;
    
    if (currency === 'INR') {
      return `${config.symbol}${Math.round(converted).toLocaleString('en-IN')}`;
    }
    if (currency === 'JPY') {
      return `${config.symbol}${Math.round(converted).toLocaleString('ja-JP')}`;
    }
    return `${config.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS['en'];
    return langDict[key] || TRANSLATIONS['en'][key] || key;
  };

  return (
    <TradeContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        selectedCountry,
        setSelectedCountry,
        currentCountryInfo,
        userRole,
        setUserRole,
        activeRoute,
        setActiveRoute,
        sidebarCollapsed,
        setSidebarCollapsed,
        isDarkMode,
        setIsDarkMode,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        clearAllNotifications,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        formatAmount,
        t,
      }}
    >
      {children}
    </TradeContext.Provider>
  );
};

export const useTrade = () => {
  const context = useContext(TradeContext);
  if (!context) {
    throw new Error('useTrade must be used within a TradeProvider');
  }
  return context;
};
