import React from 'react';
import { HelpCircle, PhoneCall, MessageSquare, ShieldCheck } from 'lucide-react';

export const SupportPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl">
      <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
        <HelpCircle className="w-7 h-7 text-blue-600 dark:text-blue-400" /> 24/7 Global Trade Support Desk
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card p-5 space-y-2">
          <PhoneCall className="w-6 h-6 text-blue-600" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Emergency Hotline</h3>
          <p className="text-xs text-slate-500">+1 (800) 994-TRADE-NAV</p>
          <span className="text-[10px] font-bold text-emerald-600 block">SLA: &lt; 5 Min Response</span>
        </div>

        <div className="glass-card p-5 space-y-2">
          <MessageSquare className="w-6 h-6 text-emerald-600" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Live Customs Broker Chat</h3>
          <p className="text-xs text-slate-500">Instant Chat with Licensed Broker</p>
          <button onClick={() => alert('Starting Live Chat Session...')} className="text-xs font-bold text-blue-600 hover:underline">Start Chat →</button>
        </div>

        <div className="glass-card p-5 space-y-2">
          <ShieldCheck className="w-6 h-6 text-purple-600" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Legal Tariff Dispute</h3>
          <p className="text-xs text-slate-500">File Appeals for Incorrect Duties</p>
          <button onClick={() => alert('Opening Dispute Ticket Form...')} className="text-xs font-bold text-blue-600 hover:underline">Open Ticket →</button>
        </div>
      </div>
    </div>
  );
};
