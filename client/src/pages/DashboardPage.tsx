import React, { useState } from 'react';
import {
  TrendingUp,
  Ship,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Sparkles,
  FileText,
  CheckCircle2,
  ChevronRight,
  Globe
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer
} from 'recharts';
import { useTrade } from '../context/TradeContext';
import { SHIPMENTS_DATA } from '../data/mockData';

interface TradeRouteData {
  id: string;
  containerId: string;
  origin: string;
  destination: string;
  carrier: string;
  cargo: string;
  eta: string;
  progress: number;
  aiRisk: 'Low' | 'Medium' | 'High';
  status: string;
  type: 'active' | 'planned' | 'clearance' | 'delayed';
  color: string;
  d: string;
  originX: number;
  originY: number;
  destX: number;
  destY: number;
  originFlag: string;
  destFlag: string;
}

export const DashboardPage: React.FC = () => {
  const {
    currentCountryInfo,
    userRole,
    formatAmount,
    setActiveRoute,
    t,
  } = useTrade();

  const [hoveredRoute, setHoveredRoute] = useState<TradeRouteData | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const REVENUE_DATA = [
    { month: 'Jan', revenueUSD: 1850000, volumeUSD: 2400000 },
    { month: 'Feb', revenueUSD: 2100000, volumeUSD: 2800000 },
    { month: 'Mar', revenueUSD: 1950000, volumeUSD: 2600000 },
    { month: 'Apr', revenueUSD: 2450000, volumeUSD: 3100000 },
    { month: 'May', revenueUSD: 2900000, volumeUSD: 3700000 },
    { month: 'Jun', revenueUSD: 3200000, volumeUSD: 4100000 },
    { month: 'Jul', revenueUSD: 3850000, volumeUSD: 4900000 },
  ];

  const COUNTRY_PERFORMANCE = [
    { country: 'Germany 🇩🇪', exportsUSD: 1450000, growth: '+18.4%' },
    { country: 'USA 🇺🇸', exportsUSD: 1220000, growth: '+12.1%' },
    { country: 'UAE 🇦🇪', exportsUSD: 890000, growth: '+24.5%' },
    { country: 'Japan 🇯🇵', exportsUSD: 640000, growth: '+8.2%' },
  ];

  const activeShipment = SHIPMENTS_DATA[0];

  const MAP_ROUTES: TradeRouteData[] = [
    {
      id: 'route-1',
      containerId: 'TN-MAEU-992810',
      origin: 'India',
      destination: 'Germany',
      carrier: 'Maersk',
      cargo: 'Cotton Garments',
      eta: '04 Aug 2026',
      progress: 68,
      aiRisk: 'Low',
      status: 'In Transit',
      type: 'active',
      color: '#10b981', // Green
      d: 'M 550,210 Q 460,130 380,110',
      originX: 550,
      originY: 210,
      destX: 380,
      destY: 110,
      originFlag: '🇮🇳',
      destFlag: '🇩🇪'
    },
    {
      id: 'route-2',
      containerId: 'TN-MSCU-302910',
      origin: 'India',
      destination: 'UAE',
      carrier: 'MSC',
      cargo: 'Renewable Components',
      eta: '28 Jul 2026',
      progress: 95,
      aiRisk: 'Low',
      status: 'Customs Hold',
      type: 'clearance',
      color: '#f59e0b', // Orange
      d: 'M 550,210 Q 515,195 480,190',
      originX: 550,
      originY: 210,
      destX: 480,
      destY: 190,
      originFlag: '🇮🇳',
      destFlag: '🇦🇪'
    },
    {
      id: 'route-3',
      containerId: 'TN-DHL-440192',
      origin: 'India',
      destination: 'USA',
      carrier: 'DHL Global',
      cargo: 'Pharmaceuticals',
      eta: '09 Aug 2026',
      progress: 45,
      aiRisk: 'High',
      status: 'Delayed (Weather)',
      type: 'delayed',
      color: '#ef4444', // Red
      d: 'M 550,210 Q 350,110 150,160',
      originX: 550,
      originY: 210,
      destX: 150,
      destY: 160,
      originFlag: '🇮🇳',
      destFlag: '🇺🇸'
    },
    {
      id: 'route-4',
      containerId: 'TN-FEDEX-881920',
      origin: 'China',
      destination: 'Singapore',
      carrier: 'FedEx',
      cargo: 'Electronics',
      eta: '12 Aug 2026',
      progress: 10,
      aiRisk: 'Low',
      status: 'Planned',
      type: 'planned',
      color: '#3b82f6', // Blue
      d: 'M 680,190 Q 665,225 650,260',
      originX: 680,
      originY: 190,
      destX: 650,
      destY: 260,
      originFlag: '🇨🇳',
      destFlag: '🇸🇬'
    }
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left + 15,
      y: e.clientY - rect.top + 15
    });
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 md:p-8 shadow-xl border border-blue-800/40">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-bold text-blue-300 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>AI System Status: Optimal • Active Node {currentCountryInfo.flag} {currentCountryInfo.name}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              {t('welcome')}, <span className="text-blue-400">Enterprise {userRole.toUpperCase()}</span>
            </h1>
            
            <p className="text-sm text-slate-200 max-w-2xl leading-relaxed">
              Cross-border compliance is 100% verified. You have <span className="text-emerald-400 font-bold">4 active shipments</span> under tracking and <span className="text-amber-400 font-bold">1 pending customs clearance action</span> at Los Angeles Port.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveRoute('ai-assistant')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Ask TradeGPT</span>
            </button>

            <button
              onClick={() => setActiveRoute('documents')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs backdrop-blur-md transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Create Invoice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Readiness & KPI Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Trade Readiness Ring Card */}
        <div className="glass-card p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t('tradeReadiness')}</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">96 / 100</div>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" /> Tier 1 Export Rating
            </div>
          </div>
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-slate-200 dark:text-slate-700 stroke-current" strokeWidth="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-blue-600 stroke-current" strokeDasharray="96, 100" strokeWidth="3.5" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <span className="absolute text-xs font-black text-slate-900 dark:text-white">96%</span>
          </div>
        </div>

        {/* Compliance Score Card */}
        <div className="glass-card p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t('complianceScore')}</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">98.4%</div>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Zero Violations
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50">
            <ShieldCheck className="w-7 h-7" />
          </div>
        </div>

        {/* Total Trade Revenue */}
        <div className="glass-card p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t('totalRevenue')}</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{formatAmount(3850000)}</div>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5" /> +24.8% vs last month
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50">
            <TrendingUp className="w-7 h-7" />
          </div>
        </div>

        {/* Active Shipments */}
        <div className="glass-card p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t('activeShipments')}</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">4 Containers</div>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400">
              <Ship className="w-3.5 h-3.5" /> {SHIPMENTS_DATA.length} Under Tracking
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-800/50">
            <Ship className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Main Content Grid: Heatmap & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Premium AI Global Trade Intelligence Map */}
        <div className="lg:col-span-2 glass-card p-6 space-y-4 relative">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin" />
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">AI Global Trade Intelligence Map</h3>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Live AI Trade Intelligence
              </span>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 font-bold">
                <span>12 Active Routes</span>
                <span>•</span>
                <span>4 Customs Clearance</span>
                <span>•</span>
                <span>2 Delayed Routes</span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400">18 Successful Deliveries Today</span>
              </div>
            </div>
          </div>

          {/* SVG Map Container */}
          <div 
            className="relative h-64 w-full bg-slate-950 rounded-xl overflow-hidden p-4 flex items-center justify-center border border-slate-800 shadow-inner"
            onMouseMove={handleMouseMove}
          >
            {/* Background Map Grid Matrix System */}
            <svg className="absolute inset-0 w-full h-full text-slate-900/60" viewBox="0 0 800 400" fill="none">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            <svg className="w-full h-full relative z-10" viewBox="0 0 800 400" fill="none">
              {/* World Continent Stylized Background Coordinates */}
              <path d="M 50,100 L 120,80 L 220,110 L 280,180 L 250,280 L 150,220 Z" fill="#1e293b" opacity="0.15" /> 
              <path d="M 320,80 L 400,60 L 450,110 L 380,160 Z" fill="#1e293b" opacity="0.15" /> 
              <path d="M 450,150 L 530,170 L 510,230 L 440,210 Z" fill="#1e293b" opacity="0.15" /> 
              <path d="M 510,180 L 680,120 L 720,200 L 600,320 L 550,230 Z" fill="#1e293b" opacity="0.15" /> 

              {/* Trade Routes Paths */}
              {MAP_ROUTES.map((route) => (
                <g key={route.id}>
                  {/* Glowing Outline Curve */}
                  <path
                    d={route.d}
                    stroke={route.color}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.15"
                  />
                  {/* High Contrast Core Line */}
                  <path
                    d={route.d}
                    stroke={route.color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    className="cursor-pointer transition-all duration-300 hover:stroke-[3.5px]"
                    onMouseEnter={() => setHoveredRoute(route)}
                    onMouseLeave={() => setHoveredRoute(null)}
                  />

                  {/* Pulsing Origin Node */}
                  <circle cx={route.originX} cy={route.originY} r="6" fill={route.color} className="animate-ping opacity-60" />
                  <circle cx={route.originX} cy={route.originY} r="4" fill={route.color} />

                  {/* Pulsing Destination Node */}
                  <circle cx={route.destX} cy={route.destY} r="6" fill={route.color} className="animate-ping opacity-60" />
                  <circle cx={route.destX} cy={route.destY} r="4" fill={route.color} />

                  {/* Animated Glowing Cargo Container dot along path */}
                  <circle r="3.5" fill="#ffffff" stroke={route.color} strokeWidth="1.5">
                    <animateMotion
                      dur="8s"
                      repeatCount="indefinite"
                      path={route.d}
                    />
                  </circle>
                </g>
              ))}

              {/* Node Labels */}
              <g fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace" opacity="0.8">
                <text x="560" y="215">IN (India)</text>
                <text x="365" y="100">DE (Germany)</text>
                <text x="492" y="195">AE (UAE)</text>
                <text x="115" y="155">US (USA)</text>
                <text x="660" y="265">SG (Singapore)</text>
                <text x="690" y="185">CN (China)</text>
              </g>
            </svg>

            {/* Premium Tooltip overlay inside the relative container */}
            {hoveredRoute && (
              <div
                className="absolute z-50 bg-slate-950/95 border border-slate-800 rounded-xl p-4 w-60 shadow-2xl text-[11px] font-sans text-slate-200 space-y-2 pointer-events-none animate-fadeIn backdrop-blur-md"
                style={{
                  left: `${Math.min(tooltipPos.x, 500)}px`,
                  top: `${Math.min(tooltipPos.y, 140)}px`
                }}
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span className="font-extrabold text-white text-[12px]">{hoveredRoute.containerId}</span>
                  <span 
                    className="px-2 py-0.5 rounded text-[9px] font-black"
                    style={{ 
                      backgroundColor: `${hoveredRoute.color}20`, 
                      color: hoveredRoute.color,
                      border: `1px solid ${hoveredRoute.color}50` 
                    }}
                  >
                    {hoveredRoute.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  <div>
                    <span className="text-slate-500 font-bold block uppercase tracking-wider text-[8px]">Origin</span>
                    <span className="text-slate-200 font-semibold">{hoveredRoute.originFlag} {hoveredRoute.origin}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block uppercase tracking-wider text-[8px]">Destination</span>
                    <span className="text-slate-200 font-semibold">{hoveredRoute.destFlag} {hoveredRoute.destination}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block uppercase tracking-wider text-[8px]">Carrier</span>
                    <span className="text-slate-200 font-semibold">{hoveredRoute.carrier}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block uppercase tracking-wider text-[8px]">Cargo Type</span>
                    <span className="text-slate-200 font-semibold">{hoveredRoute.cargo}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block uppercase tracking-wider text-[8px]">Estimated Arrival</span>
                    <span className="text-slate-200 font-semibold">{hoveredRoute.eta}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block uppercase tracking-wider text-[8px]">Progress</span>
                    <span className="text-slate-200 font-semibold">{hoveredRoute.progress}%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1 border-t border-slate-800 text-[10px]">
                  <span className="text-slate-400 font-bold">AI Risk Assessment:</span>
                  <span className={`font-black ${hoveredRoute.aiRisk === 'Low' ? 'text-emerald-500' : hoveredRoute.aiRisk === 'Medium' ? 'text-amber-500' : 'text-red-500'}`}>
                    {hoveredRoute.aiRisk}
                  </span>
                </div>
              </div>
            )}

            {/* Bottom-left interactive map legend */}
            <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800/80 flex flex-wrap items-center gap-3 text-[10px] font-bold text-slate-300 shadow-xl max-w-[90%]">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Active Trade Route</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span> Planned Shipment</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Customs Clearance</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span> Delayed Shipment</span>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="pt-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Monthly Trade Revenue & Volume Trajectory
            </h4>
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_DATA}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} fontWeight={600} />
                  <YAxis stroke="#64748b" fontSize={11} fontWeight={600} tickFormatter={val => `$${val / 1000000}M`} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontWeight: 600 }}
                    formatter={(val: any) => [formatAmount(Number(val)), 'Revenue']}
                  />
                  <Area type="monotone" dataKey="revenueUSD" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Col: Active Shipment Tracker & AI Insights Feed */}
        <div className="space-y-6">
          <div className="glass-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Ship className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Active Container Spotlight</h3>
              </div>
              <button
                onClick={() => setActiveRoute('shipments')}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                Track All <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-slate-100 dark:bg-slate-800/80 p-4 rounded-xl space-y-3 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between text-xs">
                <span className="font-black text-slate-900 dark:text-white">{activeShipment.trackingNumber}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 dark:bg-blue-900/80 dark:text-blue-200 border border-blue-300 dark:border-blue-700">
                  {activeShipment.status} ({activeShipment.progress}%)
                </span>
              </div>

              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {activeShipment.originPort} → {activeShipment.destinationPort}
              </div>

              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${activeShipment.progress}%` }} />
              </div>

              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                <span>ETA: <strong className="text-slate-900 dark:text-white">{activeShipment.eta}</strong></span>
                <span>Carrier: <strong className="text-slate-900 dark:text-white">{activeShipment.carrier}</strong></span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-start gap-2.5 text-xs text-emerald-950 dark:text-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold">AI Risk Assessment:</span> {activeShipment.aiRiskReason}
              </div>
            </div>
          </div>

          <div className="glass-card p-5 space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              Top Destination Markets
            </h3>
            <div className="space-y-3">
              {COUNTRY_PERFORMANCE.map((cp, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 dark:border-slate-800/60 last:border-0">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{cp.country}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-black text-slate-900 dark:text-white">{formatAmount(cp.exportsUSD)}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{cp.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
