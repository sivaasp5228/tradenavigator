import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  FileCheck,
  ShieldAlert,
  Download,
  FileText,
  DollarSign,
  Ship,
  CheckCircle2
} from 'lucide-react';
import { useTrade } from '../context/TradeContext';
import type { AiQueryResult } from '../types';

export const AiAssistantPage: React.FC = () => {
  const { currentCountryInfo } = useTrade();

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeReport, setActiveReport] = useState<AiQueryResult | null>({
    query: 'How can I export Cotton Shirts from India to Germany?',
    hsCode: '6109.10.00 (T-shirts, singlets and other vests, knitted or crocheted, of cotton)',
    productCategory: 'Textiles & Apparel (Chapter 61)',
    origin: 'India (INMUN)',
    destination: 'Germany (DEHAM)',
    requiredDocs: [
      'Commercial Invoice with EORI Number',
      'Packing List',
      'Bill of Lading / Air Waybill',
      'Certificate of Origin (EUR.1 / GSP Certificate)',
      'REX System Declaration Statement',
      'EU Customs Entry Summary Declaration (ENS)',
    ],
    importRestrictions: [
      'EU REACH Chemical Directive Annex XVII compliance (Azo Dyes < 30 ppm)',
      'OEKO-TEX / GOTS Certification mandatory for organic labeling',
      'CE Marking required if integrated with smart electronic sensors',
    ],
    taxesAndDuties: {
      basicCustomsDuty: '0.0% (Preferential FTA / GSP+ rate; standard MFN 12.0%)',
      igstOrVat: '19.0% German Import VAT (Einfuhrumsatzsteuer)',
      socialWelfareSurcharge: '0.0%',
    },
    tradeAgreements: 'India-EU Broad-based Trade & Investment Agreement (BTIA) negotiations ongoing. GSP General Scheme applies.',
    certificatesNeeded: ['GOTS (Global Organic Textile Standard)', 'OEKO-TEX Standard 100', 'ISO 9001:2015 Quality Certificate'],
    estimatedShippingDays: '14 - 18 Days (Sea Freight via Suez Canal)',
    bestCarriers: ['Maersk Line Spot', 'DHL Global Forwarding', 'MSC Ocean Express'],
    recommendedBuyers: ['Bavaria Motor Components GmbH', 'H&M Logistics Hamburg', 'Zalando SE Global Purchasing'],
    riskScore: 12,
    complianceScore: 98,
    summaryReport:
      'Exporting cotton shirts from India to Germany is highly favorable under GSP preferential tariffs. Ensure your manufacturing facility holds GOTS organic certification and azodyes test reports to prevent German Zollaussetzung customs holds at Hamburg Port.',
  });

  const SAMPLE_PROMPTS = [
    'How can I export Cotton Shirts from India to Germany?',
    'What is the HS Code & customs duty for Solar Panels exported to UAE?',
    'Explain US FDA clearance procedure for Indian Pharmaceutical APIs',
    'Calculate total import tax & VAT on Automotive Sensors in Japan',
  ];

  const handleRunAiQuery = (queryText: string) => {
    setInputQuery(queryText);
    setLoading(true);

    setTimeout(() => {
      setActiveReport({
        query: queryText,
        hsCode: '8541.40.20 (Photosensitive semiconductor devices, PV cells & panels)',
        productCategory: 'Renewable Energy Electronics (Chapter 85)',
        origin: currentCountryInfo.name,
        destination: 'Germany (DEHAM)',
        requiredDocs: [
          'Commercial Invoice with HS Code breakdown',
          'Packing List with gross/net weights',
          'TÜV Rheinland Safety Certificate',
          'CE Declaration of Conformity',
          'EU WEEE Recycling Registration',
        ],
        importRestrictions: [
          'Anti-dumping duty checks on specified crystalline silicon panels',
          'RoHS 2 Directive (Restriction of Hazardous Substances)',
        ],
        taxesAndDuties: {
          basicCustomsDuty: '0.0% (EU Common Customs Tariff)',
          igstOrVat: '19.0% German VAT',
          socialWelfareSurcharge: '0.0%',
        },
        tradeAgreements: 'EU-India Clean Energy & Climate Partnership',
        certificatesNeeded: ['IEC 61215 Solar Certification', 'CE Mark', 'TÜV Rheinland'],
        estimatedShippingDays: '12 - 16 Days',
        bestCarriers: ['DHL Global Forwarding', 'Maersk Line'],
        recommendedBuyers: ['Shenzhen Apex Solar Partner Branch', 'Bavaria Power GmbH'],
        riskScore: 18,
        complianceScore: 95,
        summaryReport: `AI Analysis for "${queryText}": Product qualifies for zero basic customs duty in EU. Standard 19% VAT applies. Ensure RoHS hazardous substance compliance.`,
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <Bot className="w-7 h-7 text-blue-600 dark:text-blue-400" /> TradeGPT AI Assistant
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Enterprise Generative AI for International Tariff Lookup, HS Code Classification & Compliance Risk Analysis
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> AI Engine 4.0 Active
          </span>
        </div>
      </div>

      {/* Interactive Prompt Search Bar */}
      <div className="glass-card p-4 md:p-6 space-y-4">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300">
          Ask any Trade Question or Enter Product + Origin + Destination
        </label>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputQuery}
              onChange={e => setInputQuery(e.target.value)}
              placeholder="e.g. How can I export Cotton Shirts from India to Germany?"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <button
            onClick={() => handleRunAiQuery(inputQuery || SAMPLE_PROMPTS[0])}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all"
          >
            {loading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>{loading ? 'Analyzing...' : 'Generate Analysis'}</span>
          </button>
        </div>

        {/* Sample Prompt Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Sample Prompts:</span>
          {SAMPLE_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleRunAiQuery(prompt)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </div>

      {/* AI Structured Analysis Output Report */}
      {activeReport && (
        <div className="space-y-6">
          {/* Top Summary Banner */}
          <div className="glass-card p-6 border-l-4 border-l-blue-600 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  AI Trade Intelligence Report
                </span>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">{activeReport.query}</h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => alert('TradeGPT PDF Export Generated Successfully!')}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-blue-600" /> Export PDF
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {activeReport.summaryReport}
            </p>
          </div>

          {/* Detailed Metric Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Classification & HS Code */}
            <div className="glass-card p-5 space-y-3">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-extrabold text-xs uppercase tracking-wider">
                <FileCheck className="w-4 h-4" /> HS Code & Category
              </div>
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs font-mono font-extrabold text-blue-900 dark:text-blue-200">
                {activeReport.hsCode}
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300">
                Category: <strong className="text-slate-900 dark:text-white">{activeReport.productCategory}</strong>
              </div>
            </div>

            {/* Taxes & Customs Duty */}
            <div className="glass-card p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
                <DollarSign className="w-4 h-4" /> Taxes & Customs Duty
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Basic Customs Duty:</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{activeReport.taxesAndDuties.basicCustomsDuty}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">IGST / Import VAT:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{activeReport.taxesAndDuties.igstOrVat}</span>
                </div>
              </div>
            </div>

            {/* Risk & Compliance Ring Gauges */}
            <div className="glass-card p-5 space-y-3">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-extrabold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" /> AI Risk & Compliance Score
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">{activeReport.complianceScore}%</div>
                  <div className="text-[10px] text-slate-700 dark:text-slate-300 uppercase font-extrabold">Compliance</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">{activeReport.riskScore}%</div>
                  <div className="text-[10px] text-slate-700 dark:text-slate-300 uppercase font-extrabold">Risk Level</div>
                </div>
              </div>
            </div>
          </div>

          {/* Required Docs & Logistics Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Mandatory Customs Documents */}
            <div className="glass-card p-6 space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <FileText className="w-4 h-4 text-blue-600" /> Mandatory Customs Documentation
              </h3>
              <ul className="space-y-2">
                {activeReport.requiredDocs.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-800 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Logistics & Recommended Verified Buyers */}
            <div className="glass-card p-6 space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <Ship className="w-4 h-4 text-emerald-600" /> Recommended Carriers & Buyers
              </h3>
              
              <div className="space-y-3">
                <div>
                  <span className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase">Top Logistics Freight Forwarders:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {activeReport.bestCarriers.map((c, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800">
                        🚢 {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase">Verified Importers in Destination:</span>
                  <div className="space-y-1.5 mt-1">
                    {activeReport.recommendedBuyers.map((b, i) => (
                      <div key={i} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <span className="font-bold text-slate-900 dark:text-slate-100">🏢 {b}</span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-black">96% AI Match</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
