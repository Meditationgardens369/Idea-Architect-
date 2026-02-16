
import React from 'react';
import { ExecutiveSummary } from '../types';
import { Target, TrendingUp, AlertCircle, ArrowRightCircle, Sparkles } from 'lucide-react';

interface Props {
  summary: ExecutiveSummary;
  move: { action: string; reason: string };
}

const SummaryView: React.FC<Props> = ({ summary, move }) => {
  return (
    <div className="p-6 sm:p-12 lg:p-16 space-y-12 sm:space-y-16">
      {/* Strategic Direction Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter">
            Strategic Direction
          </h3>
        </div>
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-100 relative group overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-125 transition-transform duration-700">
            <Target className="w-64 h-64" />
          </div>
          <p className="text-lg sm:text-2xl text-slate-700 leading-relaxed font-semibold break-words relative z-10">
            {summary.direction}
          </p>
        </div>
      </section>

      {/* Opps and Risks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <section className="bg-emerald-50 rounded-[2rem] p-8 sm:p-10 border border-emerald-100 shadow-sm transition-transform hover:-translate-y-2 duration-300">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="text-emerald-900 font-black text-lg tracking-tight">Key Opportunities</h4>
          </div>
          <ul className="space-y-6">
            {summary.opportunities.slice(0, 3).map((opt, i) => (
              <li key={i} className="flex items-start gap-4 text-emerald-900/80">
                <div className="mt-2.5 w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0" />
                <span className="text-base sm:text-lg font-bold leading-tight break-words">{opt}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-rose-50 rounded-[2rem] p-8 sm:p-10 border border-rose-100 shadow-sm transition-transform hover:-translate-y-2 duration-300">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center text-white">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h4 className="text-rose-900 font-black text-lg tracking-tight">Systemic Risks</h4>
          </div>
          <ul className="space-y-6">
            {summary.risks.slice(0, 3).map((risk, i) => (
              <li key={i} className="flex items-start gap-4 text-rose-900/80">
                <div className="mt-2.5 w-2 h-2 bg-rose-400 rounded-full flex-shrink-0" />
                <span className="text-base sm:text-lg font-bold leading-tight break-words">{risk}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* THE ONE MOVE - Hero Element */}
      <section className="relative rounded-[2.5rem] p-10 sm:p-16 overflow-hidden bg-slate-950 text-white shadow-2xl group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-950 to-indigo-950"></div>
        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
          <Sparkles className="w-64 h-64" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          <div className="px-6 py-2 bg-indigo-500/20 rounded-full border border-indigo-500/30 text-indigo-300 text-xs font-black uppercase tracking-[0.4em] mb-4">
            The High Leverage Action
          </div>
          <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-6 break-words leading-[1.1] tracking-tighter">
            {move.action}
          </h3>
          <p className="text-indigo-200/80 text-lg sm:text-xl lg:text-2xl max-w-3xl leading-relaxed font-medium">
            {move.reason}
          </p>
          <div className="pt-10">
            <ArrowRightCircle className="w-12 h-12 text-indigo-400 animate-bounce cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SummaryView;
