# Trade Navigator - AI-Powered Global Trade Ecosystem

Trade Navigator is an enterprise-grade International Trade Management Platform designed to streamline cross-border trade operations for Importers, Exporters, MSMEs, Manufacturers, Logistics Companies, Freight Forwarders, Customs Brokers, and Government Organizations.

## Key Features & Modules

### 1. Global Context & Localization Engine
- **Multi-Country Switcher**: Supports dynamic country nodes (India 🇮🇳, USA 🇺🇸, Germany 🇩🇪, China 🇨🇳, Japan 🇯🇵, Singapore 🇸🇬, UK 🇬🇧, UAE 🇦🇪) updating import/export duty rates, VAT, ports, and compliance checklists.
- **Multi-Currency Converter**: Live currency switcher (USD, INR, EUR, GBP, AED, JPY, CNY) dynamically converting all metrics, prices, and rates.
- **13-Language Engine**: Interactive dropdown with localization dictionary translating UI elements across 13 major languages.
- **Search System**: Global search modal triggered by `⌘ K` searching active containers, suppliers, products, and documents.

### 2. Interactive Enterprise Modules
1. **Executive Dashboard**: Features circular trade readiness & compliance gauges, container tracking spotlights, a monthly revenue trajectory chart, and an **AI Global Trade Intelligence Map** containing animated trade routes, pulsing nodes, and container status tooltips.
2. **TradeGPT AI Assistant**: Enterprise generative AI interface analyzing HS codes, import/export restrictions, duty taxes, required documents, and verified carrier/buyer matching.
3. **Partner Discovery**: A vetted supplier and buyer directory with AI Match scores, Trust Ratings, proposal templates, and meeting schedulers.
4. **Shipment Tracker**: Container tracking timelines with port status updates and AI delay risk predictions.
5. **Logistics Spot Rates**: Carrier rate engine (DHL, FedEx, Maersk, MSC, UPS, Blue Dart) showing transit timelines, transit routes, and carbon footprint.
6. **Customs duty & Tariff Calculator**: Database for customs basic duty, VAT/GST breakdown, entry warnings, and incentive policies.
7. **Document Generator**: Generates international trade papers (Commercial Invoice, Bill of Lading, Packing List) with an interactive form editor and a printable PDF preview featuring digital customs stamps.
8. **Learning Hub & Internship Board**: Certified trade curriculum and talent boards matching MSMEs with young graduates.
9. **Settings & Governance**: API Key manager, 2FA hardware security keys, and automated alert controls.

## Tech Stack
- **Framework**: React 19 (TypeScript)
- **Bundler**: Vite 8 & Rolldown
- **Styles**: Tailwind CSS v4 & custom glassmorphism panels
- **Charts**: Recharts (responsive Area & Pie layouts)
- **Icons**: Lucide React

---

## Installation & Local Development

### Prerequisites
- Node.js (v18+)
- npm

### Setup instructions
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Build the production bundle:
   ```bash
   npm run build
   ```
