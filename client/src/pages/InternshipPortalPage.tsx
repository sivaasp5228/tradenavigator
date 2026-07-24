import React, { useState } from 'react';
import {
  Briefcase,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Upload
} from 'lucide-react';
import { useTrade } from '../context/TradeContext';
import { MOCK_INTERNSHIPS } from '../data/mockData';
import type { InternshipItem } from '../types';

export const InternshipPortalPage: React.FC = () => {
  const { formatAmount } = useTrade();

  const [selectedJob, setSelectedJob] = useState<InternshipItem | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedJob(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <Briefcase className="w-7 h-7 text-blue-600 dark:text-blue-400" /> Global Trade Internship & Talent Portal
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Connect students & domain specialists with top international logistics, freight forwarders & export houses
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            4 Active Openings
          </span>
        </div>
      </div>

      {/* Internship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_INTERNSHIPS.map(job => (
          <div key={job.id} className="glass-card p-6 flex flex-col justify-between space-y-4 hover:border-blue-500 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 rounded-2xl bg-slate-100 dark:bg-slate-800">{job.logo}</span>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{job.title}</h3>
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">{job.company}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {job.type}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                  Stipend: {formatAmount(job.stipendUSD)} / mo
                </span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.duration}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">Skills Required:</span>
                <div className="flex flex-wrap gap-1.5">
                  {job.skillsRequired.map((skill, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">{job.applicantCount} Applicants • Posted {job.postedDate}</span>
              <button
                onClick={() => setSelectedJob(job)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" /> Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Apply for {selectedJob.title}</h3>
                <p className="text-xs text-slate-400">{selectedJob.company} • {selectedJob.location}</p>
              </div>
              <button onClick={() => setSelectedJob(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            {submitted ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">Application Submitted!</h4>
                <p className="text-xs text-slate-500">
                  Your candidate profile and resume have been sent to {selectedJob.company} HR Talent Acquisition team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-slate-500">Full Candidate Name</label>
                  <input type="text" defaultValue="Alex Rivera" className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white" required />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-slate-500">Attach Resume (PDF / DOCX)</label>
                  <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-center space-y-2 bg-slate-50 dark:bg-slate-800/40">
                    <Upload className="w-6 h-6 text-blue-500 mx-auto" />
                    <span className="text-xs text-slate-600 dark:text-slate-300 font-bold block">
                      Alex_Rivera_Trade_Resume_2026.pdf
                    </span>
                    <span className="text-[10px] text-slate-400">File uploaded • 1.2 MB</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setSelectedJob(null)} className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500">Cancel</button>
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30">Submit Application</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
