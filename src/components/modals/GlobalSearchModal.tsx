import React, { useState, useEffect } from 'react';
import { Search, X, Ship, Users, FileText, ArrowRight, ShieldAlert } from 'lucide-react';
import { useTrade } from '../../context/TradeContext';
import { PARTNERS_DATA, SHIPMENTS_DATA, MOCK_DOCUMENTS } from '../../data/mockData';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setActiveRoute, formatAmount } = useTrade();
  const [query, setQuery] = useState('');

  // Handle Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredPartners = PARTNERS_DATA.filter(
    p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.industry.toLowerCase().includes(query.toLowerCase()) ||
      p.products.some(prod => prod.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredShipments = SHIPMENTS_DATA.filter(
    s =>
      s.trackingNumber.toLowerCase().includes(query.toLowerCase()) ||
      s.containerId.toLowerCase().includes(query.toLowerCase()) ||
      s.goodsDescription.toLowerCase().includes(query.toLowerCase()) ||
      s.hsCode.includes(query)
  );

  const filteredDocs = MOCK_DOCUMENTS.filter(
    d =>
      d.docNumber.toLowerCase().includes(query.toLowerCase()) ||
      d.type.toLowerCase().includes(query.toLowerCase()) ||
      d.exporterName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type to search HS codes (e.g. 6109.10), containers, suppliers, documents..."
            className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[480px] overflow-y-auto space-y-5">
          {/* Quick Shortcuts */}
          {query.trim() === '' && (
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Popular Enterprise Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'Organic Cotton (HS 6109.10)',
                  'Solar Panels to Germany',
                  'Container MSKU-489102-9',
                  'Bavaria Motor GmbH',
                  'Bill of Lading INV-2026',
                  'US FDA Compliance Rules',
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(chip.split(' ')[0])}
                    className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Container Shipments Results */}
          {filteredShipments.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Ship className="w-3.5 h-3.5 text-blue-500" /> Container & Cargo Tracking ({filteredShipments.length})
              </div>
              {filteredShipments.map(s => (
                <div
                  key={s.id}
                  onClick={() => {
                    setActiveRoute('shipments');
                    setIsSearchOpen(false);
                  }}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{s.carrierLogo}</span>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                        {s.trackingNumber} ({s.containerId})
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {s.goodsDescription} • {formatAmount(s.valueUSD)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                      {s.status}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Partners Network Results */}
          {filteredPartners.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Users className="w-3.5 h-3.5 text-emerald-500" /> Verified Partners & Suppliers ({filteredPartners.length})
              </div>
              {filteredPartners.map(p => (
                <div
                  key={p.id}
                  onClick={() => {
                    setActiveRoute('partners');
                    setIsSearchOpen(false);
                  }}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{p.logo}</span>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                        {p.name} ({p.countryName})
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {p.industry} • AI Match {p.aiMatchScore}%
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Trust {p.trustScore}/100
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Trade Documents Results */}
          {filteredDocs.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5 text-purple-500" /> Trade Documents & Records ({filteredDocs.length})
              </div>
              {filteredDocs.map(d => (
                <div
                  key={d.id}
                  onClick={() => {
                    setActiveRoute('documents');
                    setIsSearchOpen(false);
                  }}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between cursor-pointer transition-all"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      {d.docNumber} - {d.type}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Exporter: {d.exporterName} • Value: {formatAmount(d.totalAmountUSD)}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {d.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {query.trim() !== '' &&
            filteredPartners.length === 0 &&
            filteredShipments.length === 0 &&
            filteredDocs.length === 0 && (
              <div className="py-8 text-center text-slate-400 space-y-2">
                <ShieldAlert className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs font-medium">No direct trade items found matching "{query}"</p>
                <button
                  onClick={() => {
                    setActiveRoute('ai-assistant');
                    setIsSearchOpen(false);
                  }}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Ask TradeGPT AI Assistant to analyze "{query}" →
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
