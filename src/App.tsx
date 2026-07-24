import React from 'react';
import { TradeProvider, useTrade } from './context/TradeContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';

import { DashboardPage } from './pages/DashboardPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { PartnerDiscoveryPage } from './pages/PartnerDiscoveryPage';
import { ShipmentManagementPage } from './pages/ShipmentManagementPage';
import { TradeRegulationsPage } from './pages/TradeRegulationsPage';
import { LogisticsMarketplacePage } from './pages/LogisticsMarketplacePage';
import { DocumentCenterPage } from './pages/DocumentCenterPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { LearningHubPage } from './pages/LearningHubPage';
import { InternshipPortalPage } from './pages/InternshipPortalPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { PremiumUpgradePage } from './pages/PremiumUpgradePage';
import { SupportPage } from './pages/SupportPage';

const MainContent: React.FC = () => {
  const { activeRoute, sidebarCollapsed } = useTrade();

  const renderActiveView = () => {
    switch (activeRoute) {
      case 'dashboard':
        return <DashboardPage />;
      case 'ai-assistant':
        return <AiAssistantPage />;
      case 'partners':
        return <PartnerDiscoveryPage />;
      case 'shipments':
        return <ShipmentManagementPage />;
      case 'regulations':
        return <TradeRegulationsPage />;
      case 'marketplace':
        return <LogisticsMarketplacePage />;
      case 'documents':
        return <DocumentCenterPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'learning':
        return <LearningHubPage />;
      case 'internships':
        return <InternshipPortalPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      case 'premium':
        return <PremiumUpgradePage />;
      case 'support':
        return <SupportPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Sidebar />
      <Navbar />

      {/* Main Scrollable View Area */}
      <main
        className={`transition-all duration-300 p-6 ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {renderActiveView()}
      </main>

      <GlobalSearchModal />
    </div>
  );
};

export function App() {
  return (
    <TradeProvider>
      <MainContent />
    </TradeProvider>
  );
}

export default App;
