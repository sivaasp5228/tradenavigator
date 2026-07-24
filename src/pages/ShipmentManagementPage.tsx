import React, { useState } from 'react';
import {
  Ship,
  Search,
  CheckCircle2,
  AlertTriangle,
  Download,
  MapPin
} from 'lucide-react';
import { useTrade } from '../context/TradeContext';
import { SHIPMENTS_DATA } from '../data/mockData';
import type { ShipmentItem } from '../types';

export const ShipmentManagementPage: React.FC = () => {
  const { formatAmount } = useTrade();

  const [selectedShipment, setSelectedShipment] = useState<ShipmentItem>(SHIPMENTS_DATA[0]);
  const [searchTracking, setSearchTracking] = useState('');

  const filteredShipments = SHIPMENTS_DATA.filter(
    s =>
      s.trackingNumber.toLowerCase().includes(searchTracking.toLowerCase()) ||
      s.containerId.toLowerCase().includes(searchTracking.toLowerCase()) ||
      s.goodsDescription.toLowerCase().includes(searchTracking.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <Ship className="w-7 h-7 text-blue-600 dark:text-blue-400" /> Container Tracking & Shipment Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time IoT vessel tracking, AI port delay prediction & automatic customs documentation updates
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            4 Active Containers
          </span>
        </div>
      </div>

      {/* Main Content 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Shipment List */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTracking}
              onChange={e => setSearchTracking(e.target.value)}
              placeholder="Search container ID or tracking #..."
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-3">
            {filteredShipments.map(s => (
              <div
                key={s.id}
                onClick={() => setSelectedShipment(s)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedShipment.id === s.id
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 shadow-lg shadow-blue-500/10'
                    : 'glass-card hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <span className="text-xl">{s.carrierLogo}</span>
                    <span>{s.trackingNumber}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      s.status === 'In Transit'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                        : s.status === 'Customs Hold'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
                    }`}
                  >
                    {s.status}
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                  {s.goodsDescription}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>ETA: <strong className="text-slate-700 dark:text-slate-200">{s.eta}</strong></span>
                  <span>{formatAmount(s.valueUSD)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 2 Cols: Detailed Container View & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Card */}
          <div className="glass-card p-6 space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                  <span>{selectedShipment.carrier}</span> • <span>Container: {selectedShipment.containerId}</span>
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {selectedShipment.originPort} → {selectedShipment.destinationPort}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Bill of Lading downloaded for ${selectedShipment.trackingNumber}`)}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Download B/L
                </button>
              </div>
            </div>

            {/* AI Delay Risk Banner */}
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 text-xs ${
                selectedShipment.aiDelayRisk === 'High'
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              }`}
            >
              {selectedShipment.aiDelayRisk === 'High' ? (
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              )}
              <div>
                <div className="font-extrabold uppercase text-[10px]">
                  AI Predictive Delay Analysis Risk: {selectedShipment.aiDelayRisk}
                </div>
                <p className="mt-0.5">{selectedShipment.aiRiskReason}</p>
              </div>
            </div>

            {/* Progress Bar & Key Details */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500">Journey Progress</span>
                <span className="text-blue-600 dark:text-blue-400">{selectedShipment.progress}% Completed</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${selectedShipment.progress}%` }}
                />
              </div>
            </div>

            {/* Vessel Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
              <div>
                <span className="text-slate-400 font-medium block text-[10px]">DEPARTURE DATE</span>
                <strong className="text-slate-800 dark:text-slate-200">{selectedShipment.departureDate}</strong>
              </div>
              <div>
                <span className="text-slate-400 font-medium block text-[10px]">ESTIMATED ARRIVAL</span>
                <strong className="text-slate-800 dark:text-slate-200">{selectedShipment.eta}</strong>
              </div>
              <div>
                <span className="text-slate-400 font-medium block text-[10px]">GROSS WEIGHT</span>
                <strong className="text-slate-800 dark:text-slate-200">{selectedShipment.weightKg.toLocaleString()} kg</strong>
              </div>
              <div>
                <span className="text-slate-400 font-medium block text-[10px]">CARGO DECLARED VALUE</span>
                <strong className="text-slate-800 dark:text-slate-200">{formatAmount(selectedShipment.valueUSD)}</strong>
              </div>
            </div>

            {/* Timeline Events */}
            <div className="space-y-4 pt-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                Shipment Status Timeline
              </h3>

              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
                {selectedShipment.timeline.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 pl-8">
                    <div
                      className={`absolute left-0 top-0.5 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        step.completed
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                          : step.current
                          ? 'bg-amber-500 text-white animate-pulse'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                      }`}
                    >
                      {step.completed ? '✓' : idx + 1}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-xs font-bold ${step.completed ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                          {step.title}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400">{step.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" /> {step.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
