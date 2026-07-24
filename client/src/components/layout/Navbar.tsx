import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Globe,
  DollarSign,
  Moon,
  Sun,
  Bell,
  ChevronDown,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { useTrade } from '../../context/TradeContext';
import { COUNTRY_DATA, CURRENCY_MAP } from '../../data/mockData';
import type { CountryCode, Currency, Language } from '../../types';

export const Navbar: React.FC = () => {
  const {
    sidebarCollapsed,
    language,
    setLanguage,
    currency,
    setCurrency,
    selectedCountry,
    setSelectedCountry,
    isDarkMode,
    setIsDarkMode,
    unreadNotificationCount,
    setIsSearchOpen,
    setActiveRoute,
    currentCountryInfo,
  } = useTrade();

  const [currentTime, setCurrentTime] = useState<string>('');
  const [activeDropdown, setActiveDropdown] = useState<'country' | 'currency' | 'language' | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }) +
          ' • ' +
          now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const LANGUAGES: { code: Language; name: string; native: string }[] = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'ar', name: 'Arabic', native: 'العربية' },
    { code: 'zh', name: 'Chinese', native: '中文' },
    { code: 'ja', name: 'Japanese', native: '日本語' },
    { code: 'ko', name: 'Korean', native: '한국어' },
    { code: 'de', name: 'German', native: 'Deutsch' },
    { code: 'fr', name: 'French', native: 'Français' },
    { code: 'es', name: 'Spanish', native: 'Español' },
    { code: 'it', name: 'Italian', native: 'Italiano' },
    { code: 'ru', name: 'Russian', native: 'Русский' },
    { code: 'pt', name: 'Portuguese', native: 'Português' },
    { code: 'tr', name: 'Turkish', native: 'Türkçe' },
  ];

  const toggleDropdown = (name: 'country' | 'currency' | 'language') => {
    setActiveDropdown(prev => (prev === name ? null : name));
  };

  return (
    <header
      className={`sticky top-0 z-30 h-16 transition-all duration-300 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md flex items-center justify-between px-6 ${
        sidebarCollapsed ? 'ml-20' : 'ml-64'
      }`}
    >
      {/* Search Input Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-blue-400 dark:hover:border-blue-500 transition-all shadow-inner"
        >
          <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="truncate text-xs font-medium">Search products, HS Codes, partners, shipments, tariffs...</span>
          <kbd className="hidden sm:inline-block ml-auto text-[10px] font-bold px-2 py-0.5 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-300 shadow-xs">
            ⌘ K
          </kbd>
        </button>
      </div>

      {/* Global Controls & Switchers */}
      <div ref={dropdownRef} className="flex items-center gap-3">
        {/* Country Switcher */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('country')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              activeDropdown === 'country'
                ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400 shadow-sm'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            <span className="text-base">{currentCountryInfo.flag}</span>
            <span className="hidden md:inline">{currentCountryInfo.name}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'country' ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
          </button>

          {activeDropdown === 'country' && (
            <div className="absolute right-0 mt-2 w-64 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl z-50 animate-fadeIn">
              <div className="px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-1">
                Select Active Trade Domain
              </div>
              <div className="max-h-64 overflow-y-auto space-y-1 px-1.5">
                {(Object.keys(COUNTRY_DATA) as CountryCode[]).map(code => {
                  const country = COUNTRY_DATA[code];
                  const isSelected = selectedCountry === code;
                  return (
                    <button
                      key={code}
                      onClick={() => {
                        setSelectedCountry(code);
                        setActiveDropdown(null);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                          : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-base">{country.flag}</span>
                        <span className="font-semibold">{country.name}</span>
                      </span>
                      <span className={`text-[10px] font-bold whitespace-nowrap ${isSelected ? 'text-blue-100' : 'text-slate-400 dark:text-slate-400'}`}>
                        {country.avgCustomDuty} Duty
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Currency Switcher */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('currency')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              activeDropdown === 'currency'
                ? 'border-emerald-600 bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 shadow-sm'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
            <span>{currency}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'currency' ? 'rotate-180 text-emerald-600' : 'text-slate-400'}`} />
          </button>

          {activeDropdown === 'currency' && (
            <div className="absolute right-0 mt-2 w-52 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl z-50 animate-fadeIn">
              <div className="px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-1">
                Select Base Currency
              </div>
              <div className="space-y-1 px-1.5">
                {(Object.keys(CURRENCY_MAP) as Currency[]).map(curr => {
                  const isSelected = currency === curr;
                  return (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setActiveDropdown(null);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                        isSelected
                          ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-500/20'
                          : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="font-semibold">{curr} ({CURRENCY_MAP[curr].symbol.trim()})</span>
                      <span className={`text-[10px] font-bold ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                        {CURRENCY_MAP[curr].name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Language Switcher */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('language')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              activeDropdown === 'language'
                ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400 shadow-sm'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-blue-500" />
            <span className="uppercase">{language}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'language' ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
          </button>

          {activeDropdown === 'language' && (
            <div className="absolute right-0 mt-2 w-56 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl z-50 animate-fadeIn">
              <div className="px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-1">
                13 System Languages
              </div>
              <div className="max-h-64 overflow-y-auto space-y-1 px-1.5">
                {LANGUAGES.map(lang => {
                  const isSelected = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setActiveDropdown(null);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                          : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="font-semibold">{lang.name}</span>
                      <span className={`text-[10px] font-bold ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                        {lang.native}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setIsDarkMode(prev => !prev)}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-xs"
          title="Toggle Dark/Light Mode"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => setActiveRoute('dashboard')}
          className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-xs"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center animate-pulse">
              {unreadNotificationCount}
            </span>
          )}
        </button>

        {/* Live Date & Time Display */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700 pl-3">
          <Clock className="w-3.5 h-3.5 text-blue-500" />
          <span className="font-mono text-[11px] font-semibold">{currentTime}</span>
        </div>

        {/* User Profile Badge */}
        <button
          onClick={() => setActiveRoute('profile')}
          className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-xs flex items-center justify-center shadow-md">
            TN
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
              Global Trade Corp <ShieldCheck className="w-3 h-3 text-blue-500" />
            </span>
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Enterprise Verified</span>
          </div>
        </button>
      </div>
    </header>
  );
};
