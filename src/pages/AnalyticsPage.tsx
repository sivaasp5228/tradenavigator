import React from 'react';
import {
  LineChart as LineChartIcon,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useTrade } from '../context/TradeContext';

export const AnalyticsPage: React.FC = () => {
  const { formatAmount } = useTrade();

  const REVENUE_DATA = [
    { month: 'Q1 2025', exportsUSD: 4200000, importsUSD: 2100000 },
    { month: 'Q2 2025', exportsUSD: 5100000, importsUSD: 2800000 },
    { month: 'Q3 2025', exportsUSD: 4800000, importsUSD: 2400000 },
    { month: 'Q4 2025', exportsUSD: 6200000, importsUSD: 3100000 },
    { month: 'Q1 2026', exportsUSD: 7400000, importsUSD: 3900000 },
    { month: 'Q2 2026', exportsUSD: 8900000, importsUSD: 4200000 },
  ];

  const PRODUCT_SHARE = [
    { name: 'Textiles & Garments', value: 45, color: '#2563eb' },
    { name: 'Solar & Renewable', value: 25, color: '#10b981' },
    { name: 'Pharmaceuticals', value: 15, color: '#8b5cf6' },
    { name: 'Industrial Machinery', value: 15, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <LineChartIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" /> Executive Trade Analytics & Market Forecasting
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time revenue performance, commodity price trend predictions & regional trade volume analytics
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Market Intelligence Active
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card p-5 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Net Export Surplus</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{formatAmount(4700000)}</div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4" /> +31.2% Growth YOY
          </div>
        </div>

        <div className="glass-card p-5 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Customs Pass Rate</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">99.2%</div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> Zero Demurrage Penalties
          </div>
        </div>

        <div className="glass-card p-5 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Avg Shipping Lead Time</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">14.2 Days</div>
          <div className="text-xs text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
            <Zap className="w-4 h-4" /> 2.1 Days Faster than Industry Avg
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Export vs Import Revenue Area Chart */}
        <div className="lg:col-span-2 glass-card p-6 space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Quarterly Export Revenue vs Import Volume
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorImp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={val => `$${val / 1000000}M`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  formatter={(val: any) => [formatAmount(Number(val)), 'Value']}
                />
                <Legend />
                <Area type="monotone" dataKey="exportsUSD" name="Exports Revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorExp)" />
                <Area type="monotone" dataKey="importsUSD" name="Imports Volume" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorImp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Category Distribution Pie Chart */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Export Commodity Breakdown
          </h3>
          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={PRODUCT_SHARE} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {PRODUCT_SHARE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
