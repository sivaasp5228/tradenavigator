import React, { useState } from 'react';
import {
  FileCheck,
  ShieldAlert,
  CheckCircle2,
  FileText,
  DollarSign
} from 'lucide-react';
import { useTrade } from '../context/TradeContext';
import { COUNTRY_DATA } from '../data/mockData';
import type { CountryCode } from '../types';

export const TradeRegulationsPage: React.FC = () => {
  const { selectedCountry, setSelectedCountry } = useTrade();

  const [hsCodeInput, setHsCodeInput] = useState('6109.10');
  const [targetDestination, setTargetDestination] = useState<CountryCode>('DE');

  const targetCountryInfo = COUNTRY_DATA[targetDestination];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <FileCheck className="w-7 h-7 text-blue-600 dark:text-blue-400" /> Global Trade Regulations & Tariff Database
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time Harmonized System (HS Code) tariff calculator, non-tariff barrier checks & FTA agreement search
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            250+ Customs Authorities Synced
          </span>
        </div>
      </div>

      {/* Interactive Regulation Query Form */}
      <div className="glass-card p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Enter HS Code or Product Name
            </label>
            <input
              type="text"
              value={hsCodeInput}
              onChange={e => setHsCodeInput(e.target.value)}
              placeholder="e.g. 6109.10 Cotton Shirts"
              className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Exporting Country (Origin)
            </label>
            <select
              value={selectedCountry}
              onChange={e => setSelectedCountry(e.target.value as CountryCode)}
              className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              {(Object.keys(COUNTRY_DATA) as CountryCode[]).map(code => (
                <option key={code} value={code}>
                  {COUNTRY_DATA[code].flag} {COUNTRY_DATA[code].name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Importing Country (Destination)
            </label>
            <select
              value={targetDestination}
              onChange={e => setTargetDestination(e.target.value as CountryCode)}
              className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              {(Object.keys(COUNTRY_DATA) as CountryCode[]).map(code => (
                <option key={code} value={code}>
                  {COUNTRY_DATA[code].flag} {COUNTRY_DATA[code].name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Regulation Breakdown Display Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Taxes & Customs Tariffs */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-500" /> Tariff & Tax Breakdown
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Verified Tariff
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Basic Customs Duty (BCD)</span>
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                {targetCountryInfo.avgCustomDuty}
              </div>
              <p className="text-[11px] text-slate-500">Applied on CIF Cargo Value under {targetCountryInfo.name} Tariff Schedule.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Import VAT / Local GST</span>
              <div className="text-xl font-black text-slate-900 dark:text-white">
                {targetCountryInfo.gstVatRate}
              </div>
              <p className="text-[11px] text-slate-500">Collected by destination port customs authority upon arrival.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-1">
              <span className="text-[10px] text-blue-800 dark:text-blue-300 font-bold uppercase">Active Preferential Trade Agreement</span>
              <div className="text-xs font-bold text-blue-900 dark:text-blue-200">
                {targetCountryInfo.activeFTAs[0] || 'GSP Preferential Scheme'}
              </div>
              <p className="text-[11px] text-blue-700 dark:text-blue-300">0% concessional tariff available with Certificate of Origin.</p>
            </div>
          </div>
        </div>

        {/* Middle Col: Mandatory Certificates & Rules */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-500" /> Mandatory Compliance Certificates
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              Required
            </span>
          </div>

          <ul className="space-y-3">
            {[
              'Commercial Invoice signed with EORI Number',
              'GOTS Organic Textile Standard (if applicable)',
              'OEKO-TEX Standard 100 Non-toxic Chemical Test Report',
              'Certificate of Origin issued by Chamber of Commerce',
              'REX System Exporter Declaration Statement',
            ].map((cert, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 p-2 rounded-lg bg-slate-50/50 dark:bg-slate-800/50">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{cert}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Col: Restricted Goods & Government Guidelines */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" /> Restricted Goods & Guidelines
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              Alerts
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200">
              <strong className="font-bold block text-[11px] mb-1">Destination Entry Restrictions:</strong>
              {targetCountryInfo.restrictedItems.join(', ')}
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1.5">
              <strong className="font-bold text-slate-800 dark:text-slate-200 block">Export Incentive Schemes Available:</strong>
              <div className="flex flex-wrap gap-1">
                {['RoDTEP Rebate', 'Duty Drawback Scheme (DBK)', 'Advance Authorization'].map((scheme, i) => (
                  <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {scheme}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
