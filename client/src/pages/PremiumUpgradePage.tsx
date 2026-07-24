import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useTrade } from '../context/TradeContext';

export const PremiumUpgradePage: React.FC = () => {
  const { formatAmount } = useTrade();

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          ENTERPRISE SaaS TIERS
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Upgrade to Trade Navigator Enterprise Pro</h1>
        <p className="text-xs text-slate-500">
          Unlock unlimited AI TradeGPT queries, direct SAP/Oracle EDI integrations & 24/7 dedicated trade legal desk.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* Growth */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Growth MSME</h3>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{formatAmount(499)} <span className="text-xs text-slate-400 font-normal">/ mo</span></div>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Up to 20 Container Trackings</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100 AI TradeGPT Queries</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Standard Document Generator</li>
          </ul>
          <button onClick={() => alert('Upgraded to Growth Plan!')} className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800">
            Select Plan
          </button>
        </div>

        {/* Global Enterprise (Featured) */}
        <div className="glass-card p-6 space-y-4 border-2 border-blue-600 relative bg-blue-50/20 dark:bg-blue-950/20">
          <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase shadow-md">
            Most Popular
          </span>
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Global Enterprise Pro</h3>
          <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{formatAmount(1499)} <span className="text-xs text-slate-400 font-normal">/ mo</span></div>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Unlimited Container Tracking</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Unlimited TradeGPT AI Reports</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Dedicated Customs Legal Hotline</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> SAP / Oracle / Customs EDI API</li>
          </ul>
          <button onClick={() => alert('Upgraded to Global Enterprise Pro!')} className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30">
            Upgrade Now
          </button>
        </div>

        {/* Government / Institutional */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Institutional & Govt</h3>
          <div className="text-3xl font-black text-slate-900 dark:text-white">Custom SLA</div>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Sovereign Cloud Deployment</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> National Port Authority Sync</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Custom Trade Model Fine-tuning</li>
          </ul>
          <button onClick={() => alert('Contacting Sovereign Sales Desk...')} className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};
