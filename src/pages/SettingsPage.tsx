import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { useTrade } from '../context/TradeContext';

export const SettingsPage: React.FC = () => {
  const { language, setLanguage, currency, setCurrency } = useTrade();

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl">
      <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
        <SettingsIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" /> Platform Settings & Governance
      </h1>

      <div className="glass-card p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Localization & Display Preferences
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">System Interface Language</label>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="en">English</option>
                <option value="ta">Tamil (தமிழ்)</option>
                <option value="hi">Hindi (हिन्दी)</option>
                <option value="ar">Arabic (العربية)</option>
                <option value="zh">Chinese (中文)</option>
                <option value="de">German (Deutsch)</option>
                <option value="fr">French (Français)</option>
                <option value="es">Spanish (Español)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Base Valuation Currency</label>
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="AED">AED (AED)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Security & Notification Controls
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 cursor-pointer">
              <span>Enable 2FA Hardware Security Key Authentication</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 cursor-pointer">
              <span>Automated WhatsApp & Email Customs Hold Alerts</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
