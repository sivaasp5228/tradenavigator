import React from 'react';
import { ShieldCheck, Building, Key, UserCheck } from 'lucide-react';
import { useTrade } from '../context/TradeContext';

export const ProfilePage: React.FC = () => {
  const { currentCountryInfo } = useTrade();

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <Building className="w-7 h-7 text-blue-600 dark:text-blue-400" /> Enterprise Business Profile & KYC Verification
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage corporate credentials, Importer Exporter Code (IEC), Legal Entity Identifier (LEI) & EORI numbers
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> 100% Level-3 Verified Node
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Corporate Details */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              GTC
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Global Trade Corp Inc.</h3>
              <p className="text-xs text-slate-400">HQ: {currentCountryInfo.name} • Est. 2004</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">IEC / Exporter Code</span>
              <div className="font-mono font-extrabold text-slate-900 dark:text-white">IEC-0309481029</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">EU EORI Customs Registration</span>
              <div className="font-mono font-extrabold text-slate-900 dark:text-white">EORI-DE9910294810</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Global LEI Number</span>
              <div className="font-mono font-extrabold text-slate-900 dark:text-white">5493001KJ92049182390</div>
            </div>
          </div>
        </div>

        {/* Right 2 Cols: API Keys & KYC Audit Documents */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <Key className="w-4 h-4 text-blue-500" /> Enterprise API Access Keys & Webhooks
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 text-white font-mono flex items-center justify-between">
                <span>tn_live_sec_99481029481092841...</span>
                <button onClick={() => alert('API Key Copied to Clipboard!')} className="text-xs text-blue-400 font-bold hover:underline">Copy</button>
              </div>
              <p className="text-[11px] text-slate-500">Connect Trade Navigator API directly with SAP S/4HANA, Oracle ERP & Customs EDI platforms.</p>
            </div>
          </div>

          <div className="glass-card p-6 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-500" /> Verified Audit Certificates
            </h3>

            <div className="space-y-2 text-xs">
              {[
                { name: 'Authorized Economic Operator (AEO-F) Certificate', status: 'Active Verified' },
                { name: 'ISO 27001 Information Security Audit', status: 'Active Verified' },
                { name: 'Global Dun & Bradstreet (D-U-N-S®) Rating 5A1', status: 'Active Verified' },
              ].map((cert, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{cert.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    ✓ {cert.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
