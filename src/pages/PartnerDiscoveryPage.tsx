import React, { useState } from 'react';
import {
  Users,
  Search,
  CheckCircle2,
  ShieldCheck,
  Send,
  Globe2
} from 'lucide-react';
import { useTrade } from '../context/TradeContext';
import { PARTNERS_DATA } from '../data/mockData';
import type { PartnerCompany } from '../types';

export const PartnerDiscoveryPage: React.FC = () => {
  const { formatAmount } = useTrade();

  const [searchFilter, setSearchFilter] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [activePartnerModal, setActivePartnerModal] = useState<PartnerCompany | null>(null);
  const [proposalSentSuccess, setProposalSentSuccess] = useState<boolean>(false);
  const [proposalText, setProposalText] = useState('');

  const INDUSTRIES = ['All', 'Automotive & Industrial', 'Textiles & Apparel', 'Renewable Energy', 'Pharmaceuticals & Healthcare', 'Robotics & Electronics', 'Logistics & Distribution'];

  const filteredPartners = PARTNERS_DATA.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.countryName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.products.some(prod => prod.toLowerCase().includes(searchFilter.toLowerCase()));

    const matchesIndustry = selectedIndustry === 'All' || p.industry === selectedIndustry;

    return matchesSearch && matchesIndustry;
  });

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault();
    setProposalSentSuccess(true);
    setTimeout(() => {
      setProposalSentSuccess(false);
      setActivePartnerModal(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <Users className="w-7 h-7 text-blue-600 dark:text-blue-400" /> Verified Partner Discovery Network
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Connect with pre-vetted global importers, exporters, OEMs & manufacturers with 100% KYC verification
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            {PARTNERS_DATA.length} Verified Companies
          </span>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="glass-card p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
            placeholder="Search by company, product or country..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Industry Pill Selector */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {INDUSTRIES.map(ind => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                selectedIndustry === ind
                  ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-md shadow-blue-600/30'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Partner Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartners.map(partner => (
          <div key={partner.id} className="glass-card p-6 flex flex-col justify-between space-y-4 hover:border-blue-500 transition-all">
            <div className="space-y-3">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-inner">{partner.logo}</span>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      {partner.name}
                      {partner.verified && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                    </h3>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Globe2 className="w-3 h-3 text-slate-400" /> {partner.countryName} • Est. {partner.establishedYear}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 italic">
                "{partner.tagline}"
              </p>

              {/* Score Badges */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase">Trust Score</span>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{partner.trustScore}/100</span>
                </div>

                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-800 dark:text-blue-300 uppercase">AI Match</span>
                  <span className="text-xs font-black text-blue-600 dark:text-blue-400">{partner.aiMatchScore}%</span>
                </div>
              </div>

              {/* Product Tags */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">Key Offerings:</span>
                <div className="flex flex-wrap gap-1.5">
                  {partner.products.map((prod, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                      {prod}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                <span className="truncate">{partner.certifications.join(' • ')}</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {formatAmount(partner.totalVolumeUSD)} <span className="text-[10px] text-slate-400 font-normal">Vol</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActivePartnerModal(partner)}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" /> Proposal
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Send Proposal & Schedule Meeting Modal */}
      {activePartnerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{activePartnerModal.logo}</span>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">{activePartnerModal.name}</h3>
                  <p className="text-xs text-slate-400">{activePartnerModal.countryName} • Trust {activePartnerModal.trustScore}/100</p>
                </div>
              </div>
              <button onClick={() => setActivePartnerModal(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            {proposalSentSuccess ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">Trade Proposal Sent!</h4>
                <p className="text-xs text-slate-500">
                  Your business inquiry and verified KYC credentials have been transmitted to {activePartnerModal.contactEmail}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendProposal} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-slate-500">Select Proposal Intent</label>
                  <select className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white">
                    <option>Purchase Order Inquiry (Import Demand)</option>
                    <option>Supply Capacity Contract Offer (Export)</option>
                    <option>Exclusive Distribution Agency Request</option>
                    <option>Logistics & Storage Partnership</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-slate-500">Message / Terms Pitch</label>
                  <textarea
                    rows={4}
                    value={proposalText}
                    onChange={e => setProposalText(e.target.value)}
                    placeholder="Describe target products, expected container volume, target Incoterms (CIF/FOB)..."
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActivePartnerModal(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Submit Proposal
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
