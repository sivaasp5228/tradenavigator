import React, { useState } from 'react';
import {
  FileText,
  Download,
  Plus,
  Trash2,
  QrCode,
  ShieldCheck
} from 'lucide-react';
import { useTrade } from '../context/TradeContext';
import type { TradeDocument } from '../types';

export const DocumentCenterPage: React.FC = () => {
  const { formatAmount } = useTrade();

  const [activeDocType, setActiveDocType] = useState<TradeDocument['type']>('Commercial Invoice');
  const [docNumber, setDocNumber] = useState('INV-2026-9904');
  const [exporter, setExporter] = useState('SilkRoad Organic Textiles Pvt Ltd');
  const [importer, setImporter] = useState('Bavaria Fashion Distribution GmbH');
  const [origin, setOrigin] = useState('India');
  const [destination, setDestination] = useState('Germany');

  const [items, setItems] = useState([
    { description: 'GOTS Certified Organic Cotton T-Shirts (Size M-XL)', quantity: 20000, unitPriceUSD: 5.5 },
    { description: 'Natural Indigo Dyed Cotton Yarn Spools', quantity: 4000, unitPriceUSD: 8.0 },
  ]);

  const totalUSD = items.reduce((acc, item) => acc + item.quantity * item.unitPriceUSD, 0);

  const addItem = () => {
    setItems([...items, { description: 'New Trade Line Item', quantity: 1000, unitPriceUSD: 10.0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-blue-600 dark:text-blue-400" /> Trade Document Generator & Registry
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Generate Incoterms® 2020 compliant Commercial Invoices, Bills of Lading, Certificates of Origin & Packing Lists
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert(`Document ${docNumber} downloaded as PDF`)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Official PDF
          </button>
        </div>
      </div>

      {/* Document Type Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          'Commercial Invoice',
          'Packing List',
          'Certificate of Origin',
          'Bill of Lading',
          'Purchase Order',
          'Sales Contract',
          'Shipping Label',
        ].map(type => (
          <button
            key={type}
            onClick={() => setActiveDocType(type as TradeDocument['type'])}
            className={`text-xs px-4 py-2 rounded-xl font-bold transition-all ${
              activeDocType === type
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'glass-card text-slate-600 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Editor & Live Preview 2-Col Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Editor */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Interactive Form Details ({activeDocType})
          </h3>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Document Number</label>
              <input
                type="text"
                value={docNumber}
                onChange={e => setDocNumber(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Issue Date</label>
              <input
                type="date"
                defaultValue="2026-07-24"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Exporter / Seller Name</label>
              <input
                type="text"
                value={exporter}
                onChange={e => setExporter(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Importer / Buyer Name</label>
              <input
                type="text"
                value={importer}
                onChange={e => setImporter(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Country of Origin</label>
              <input
                type="text"
                value={origin}
                onChange={e => setOrigin(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Destination Port/Country</label>
              <input
                type="text"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* Line Items Table Editor */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
              <span>Cargo Items</span>
              <button
                onClick={addItem}
                className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add Item
              </button>
            </div>

            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
                  <input
                    type="text"
                    value={item.description}
                    onChange={e => {
                      const copy = [...items];
                      copy[idx].description = e.target.value;
                      setItems(copy);
                    }}
                    className="flex-1 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={e => {
                      const copy = [...items];
                      copy[idx].quantity = Number(e.target.value);
                      setItems(copy);
                    }}
                    className="w-20 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-right"
                  />
                  <input
                    type="number"
                    value={item.unitPriceUSD}
                    onChange={e => {
                      const copy = [...items];
                      copy[idx].unitPriceUSD = Number(e.target.value);
                      setItems(copy);
                    }}
                    className="w-20 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-right"
                  />
                  <button onClick={() => removeItem(idx)} className="p-1 text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Official High-Fidelity Preview Paper Card */}
        <div className="bg-white text-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-200 space-y-6 font-sans">
          {/* Paper Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
            <div>
              <h2 className="text-xl font-black uppercase tracking-wider">{activeDocType}</h2>
              <p className="text-xs text-slate-500 font-bold">Ref: {docNumber}</p>
            </div>
            <div className="text-right">
              <div className="font-extrabold text-sm text-blue-900">TRADE NAVIGATOR ECOSYSTEM</div>
              <div className="text-[10px] text-slate-500">Customs Compliant Digital Standard</div>
            </div>
          </div>

          {/* Exporter / Importer Info */}
          <div className="grid grid-cols-2 gap-6 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Exporter (Seller):</span>
              <div className="font-bold text-slate-900">{exporter}</div>
              <div className="text-[11px] text-slate-500">Origin: {origin}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Importer (Buyer):</span>
              <div className="font-bold text-slate-900">{importer}</div>
              <div className="text-[11px] text-slate-500">Destination: {destination}</div>
            </div>
          </div>

          {/* Cargo Table */}
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b-2 border-slate-200 text-slate-500">
                <th className="py-2 font-bold uppercase">Item Description</th>
                <th className="py-2 text-right font-bold uppercase">Qty</th>
                <th className="py-2 text-right font-bold uppercase">Unit Price</th>
                <th className="py-2 text-right font-bold uppercase">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="py-2 font-semibold text-slate-800">{item.description}</td>
                  <td className="py-2 text-right text-slate-600">{item.quantity.toLocaleString()}</td>
                  <td className="py-2 text-right text-slate-600">${item.unitPriceUSD.toFixed(2)}</td>
                  <td className="py-2 text-right font-bold text-slate-900">${(item.quantity * item.unitPriceUSD).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total & Verification Stamp */}
          <div className="flex items-center justify-between border-t-2 border-slate-900 pt-4">
            <div className="flex items-center gap-3">
              <QrCode className="w-12 h-12 text-slate-800" />
              <div className="text-[10px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 inline mr-1" />
                Digital Customs Stamp Verified
                <br />
                Hash: 0x9a8f...44b1
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold uppercase text-slate-400">Grand Total ({activeDocType}):</span>
              <div className="text-2xl font-black text-blue-900">{formatAmount(totalUSD)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
