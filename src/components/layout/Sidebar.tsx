import React from 'react';
import {
  LayoutDashboard,
  Bot,
  Users,
  Ship,
  FileCheck,
  Building2,
  FileText,
  LineChart,
  GraduationCap,
  Briefcase,
  Settings,
  Zap,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Globe2,
  CheckCircle2,
  LogOut
} from 'lucide-react';
import { useTrade } from '../../context/TradeContext';
import type { NavigationItem, UserRole } from '../../types';

interface SidebarItem {
  id: NavigationItem;
  labelKey: string;
  icon: React.ElementType;
  badge?: string;
}

const NAV_ITEMS: SidebarItem[] = [
  { id: 'dashboard', labelKey: 'dashboard', icon: LayoutDashboard },
  { id: 'ai-assistant', labelKey: 'aiAssistant', icon: Bot },
  { id: 'partners', labelKey: 'partnerDiscovery', icon: Users },
  { id: 'shipments', labelKey: 'shipmentManagement', icon: Ship },
  { id: 'regulations', labelKey: 'tradeRegulations', icon: FileCheck },
  { id: 'marketplace', labelKey: 'logisticsMarketplace', icon: Building2 },
  { id: 'documents', labelKey: 'documentCenter', icon: FileText },
  { id: 'analytics', labelKey: 'analytics', icon: LineChart },
  { id: 'learning', labelKey: 'learningHub', icon: GraduationCap },
  { id: 'internships', labelKey: 'internshipPortal', icon: Briefcase },
  { id: 'settings', labelKey: 'settings', icon: Settings },
  { id: 'premium', labelKey: 'premium', icon: Zap, badge: '30% OFF' },
  { id: 'support', labelKey: 'support', icon: HelpCircle },
];

export const Sidebar: React.FC = () => {
  const {
    activeRoute,
    setActiveRoute,
    sidebarCollapsed,
    setSidebarCollapsed,
    userRole,
    setUserRole,
    t,
  } = useTrade();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRole(e.target.value as UserRole);
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out border-r border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md flex flex-col justify-between ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Brand Header */}
      <div>
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-800">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 font-bold text-xl">
                <Globe2 className="w-6 h-6 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-blue-950 to-blue-700 dark:from-white dark:via-slate-100 dark:to-blue-400 bg-clip-text text-transparent">
                  Trade Navigator
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Enterprise AI Ecosystem
                </span>
              </div>
            </div>
          ) : (
            <div className="mx-auto w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-lg font-bold text-xl">
              <Globe2 className="w-6 h-6" />
            </div>
          )}

          <button
            onClick={() => setSidebarCollapsed(prev => !prev)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="px-3 py-4 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)] scrollbar-none">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = activeRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveRoute(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 dark:bg-blue-600 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/60'
                } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                title={sidebarCollapsed ? t(item.labelKey) : undefined}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                
                {!sidebarCollapsed && (
                  <div className="flex items-center justify-between w-full">
                    <span className="truncate">{t(item.labelKey)}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.badge.includes('AI')
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sidebar Bottom Footer Section */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        {!sidebarCollapsed ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Active Domain Profile</span>
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Node
              </span>
            </div>

            <select
              value={userRole}
              onChange={handleRoleChange}
              className="w-full text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="exporter">Role: Enterprise Exporter</option>
              <option value="importer">Role: Importer & Buyer</option>
              <option value="msme">Role: MSME Manufacturer</option>
              <option value="logistics">Role: Freight Forwarder</option>
              <option value="customs_broker">Role: Customs Broker</option>
              <option value="government">Role: Trade Authority</option>
            </select>
          </div>
        ) : (
          <button
            onClick={() => setActiveRoute('profile')}
            className="w-full flex justify-center py-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            title="Profile & Role Settings"
          >
            <LogOut className="w-5 h-5 rotate-180" />
          </button>
        )}
      </div>
    </aside>
  );
};
