import React, { useState } from 'react';
import {
  Building2,
  Star,
  Clock,
  Zap,
  CheckCircle2,
  Leaf
} from 'lucide-react';
import { useTrade } from '../context/TradeContext';
import { CARRIERS_DATA } from '../data/mockData';
import type { CarrierRate } from '../types';

export const LogisticsMarketplacePage: React.FC = () => {
  const { formatAmount, currentCountryInfo } = useTrade();

  const [searchCarrier] = useState('');
  const [selectedCarrierForBooking, setSelectedCarrierForBooking] = useState<CarrierRate | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const filteredCarriers = CARRIERS_DATA.filter(
    c =>
      c.carrierName.toLowerCase().includes(searchCarrier.toLowerCase()) ||
      c.serviceType.toLowerCase().includes(searchCarrier.toLowerCase())
  );

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setSelectedCarrierForBooking(null);
    }, 2500);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <Building2 className="w-7 h-7 text-blue-600 dark:text-blue-400" /> Global Freight Logistics Marketplace
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare instant ocean & air spot rates across DHL, FedEx, Maersk, MSC, UPS & Blue Dart with verified SLAs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Live Spot Rates Active
          </span>
        </div>
      </div>

      {/* Origin-Destination Route Selector & Search */}
      <div className="glass-card p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Origin Port / City
            </label>
            <input
              type="text"
              defaultValue={`${currentCountryInfo.name} (${currentCountryInfo.mainPorts[0] || 'INMUN'})`}
              className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Destination Port / City
            </label>
            <input
              type="text"
              defaultValue="Germany (Hamburg Port DEHAM)"
              className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Cargo Container Specification
            </label>
            <select className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
              <option>1x 40ft High Cube Dry Container (FCL)</option>
              <option>1x 20ft Standard Ocean Container (FCL)</option>
              <option>Air Freight Pallet (LCL Express)</option>
              <option>Reefer Temperature Controlled (-20°C)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Carrier Rate Cards List */}
      <div className="space-y-4">
        {filteredCarriers.map(carrier => (
          <div key={carrier.id} className="glass-card p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-blue-500 transition-all">
            {/* Carrier info */}
            <div className="flex items-start gap-4 flex-1">
              <div className="text-4xl p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 shadow-inner flex-shrink-0">
                {carrier.logo}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{carrier.carrierName}</h3>
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-amber-500" /> {carrier.rating}
                  </span>
                </div>

                <div className="text-xs text-slate-500 font-medium">
                  {carrier.serviceType} • On-Time SLA: <strong className="text-emerald-600 dark:text-emerald-400">{carrier.onTimeRate}%</strong>
                </div>

                {/* Features Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {carrier.features.map((feat, idx) => (
                    <span key={idx} className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics & Pricing */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 pt-4 lg:pt-0 lg:pl-6">
              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-bold uppercase">Transit Time</div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
                  <Clock className="w-4 h-4 text-blue-500" /> {carrier.transitDays}
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Leaf className="w-3 h-3" /> {carrier.co2Kg} kg CO₂ / Container
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="text-xs text-slate-400 font-bold uppercase">Total Spot Rate</div>
                <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
                  {formatAmount(carrier.priceUSD)}
                </div>
                <span className="text-[10px] text-slate-400 block">Includes Port Terminal Handling</span>
              </div>

              <button
                onClick={() => setSelectedCarrierForBooking(carrier)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-amber-300" /> Book Freight Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Freight Booking Modal */}
      {selectedCarrierForBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedCarrierForBooking.logo}</span>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">{selectedCarrierForBooking.carrierName}</h3>
                  <p className="text-xs text-slate-400">Spot Rate: {formatAmount(selectedCarrierForBooking.priceUSD)} • {selectedCarrierForBooking.transitDays}</p>
                </div>
              </div>
              <button onClick={() => setSelectedCarrierForBooking(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            {bookingConfirmed ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">Freight Booking Confirmed!</h4>
                <p className="text-xs text-slate-500">
                  Tracking ID <strong className="text-blue-600">TN-SPOT-{Math.floor(100000 + Math.random() * 900000)}</strong> generated. Container equipment release note sent to terminal.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-slate-500">Shipper / Exporter EORI / IEC</label>
                  <input type="text" defaultValue="IEC-0309481029 / EORI-DE99102" className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white" required />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-slate-500">Pickup Date at Origin Port</label>
                  <input type="date" defaultValue="2026-08-01" className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white" required />
                </div>

                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 flex items-center justify-between">
                  <span>Total Payable Spot Amount:</span>
                  <strong className="text-base font-black text-blue-600">{formatAmount(selectedCarrierForBooking.priceUSD)}</strong>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCarrierForBooking(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2"
                  >
                    Confirm Freight Booking
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
