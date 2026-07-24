import React from 'react';
import {
  GraduationCap,
  Award,
  Star,
  Users,
  Clock,
  PlayCircle,
  Download
} from 'lucide-react';
import { MOCK_COURSES } from '../data/mockData';

export const LearningHubPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <GraduationCap className="w-7 h-7 text-blue-600 dark:text-blue-400" /> Global Trade Academy & Certification Hub
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Master Incoterms® 2020, customs valuation, DGFT government export schemes & international trade finance
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            ICC Certified Curriculum
          </span>
        </div>
      </div>

      {/* Featured Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_COURSES.map(course => (
          <div key={course.id} className="glass-card p-6 flex flex-col justify-between space-y-4 hover:border-blue-500 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-4xl p-2 rounded-2xl bg-slate-100 dark:bg-slate-800">{course.image}</span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  {course.level}
                </span>
              </div>

              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{course.title}</h3>
              <p className="text-xs text-slate-500">Instructor: <strong>{course.instructor}</strong></p>

              <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {course.enrolledStudents.toLocaleString()} Enrolled</span>
                <span className="flex items-center gap-1 text-amber-500 font-bold"><Star className="w-3.5 h-3.5 fill-amber-500" /> {course.rating}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <Award className="w-4 h-4 text-blue-600 inline mr-1.5" />
                Certification: <strong>{course.certificationOffered}</strong>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => alert(`Enrolled in ${course.title} successfully!`)}
                className="w-full px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <PlayCircle className="w-4 h-4" /> Start Course Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Government Trade Schemes & Playbooks Section */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
          Downloadable Official Export Guides & Government Incentive Schemes
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'RoDTEP Export Rebate Claim Playbook 2026', format: 'PDF • 4.2 MB' },
            { title: 'EU CBAM Carbon Border Adjustment Tax Compliance Guide', format: 'PDF • 6.8 MB' },
            { title: 'US Customs C-TPAT Supply Chain Security Manual', format: 'PDF • 3.5 MB' },
          ].map((guide, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 space-y-3">
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">{guide.title}</h4>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>{guide.format}</span>
                <button
                  onClick={() => alert(`Downloading ${guide.title}`)}
                  className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
