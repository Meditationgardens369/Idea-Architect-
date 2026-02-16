
import React from 'react';
import { HelpCircle, AlertTriangle, ArrowRight } from 'lucide-react';

interface Props {
  loops: string[];
}

const OpenLoopsView: React.FC<Props> = ({ loops }) => {
  return (
    <div className="p-10 max-w-3xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-3xl text-amber-600 mb-2">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-black text-slate-900">Open Loops & Conflicts</h2>
        <p className="text-slate-500 max-w-md mx-auto">
          These are the missing pieces or contradictions that require immediate clarification to unlock the roadmap.
        </p>
      </div>

      <div className="space-y-4">
        {loops.map((loop, i) => (
          <div key={i} className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100 flex items-start gap-5 hover:bg-amber-50 transition-colors group">
            <div className="mt-1 bg-white p-2 rounded-xl shadow-sm border border-amber-100 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div className="space-y-1">
              <p className="text-slate-900 font-bold leading-relaxed">{loop}</p>
              <div className="flex items-center gap-2 text-[10px] font-bold text-amber-600 uppercase tracking-widest">
                Status: Needs Input <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        ))}
        {loops.length === 0 && (
          <div className="bg-emerald-50 p-10 rounded-3xl border border-emerald-100 text-center">
            <p className="text-emerald-800 font-bold">No critical open loops detected. Proceed with the roadmap!</p>
          </div>
        )}
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
        <h4 className="font-bold text-lg mb-4">The Operating Rhythm</h4>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Daily Focus</p>
            <p className="text-sm text-slate-300">Complete one &ldquo;NOW&rdquo; task per day. Review blockers.</p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Weekly Audit</p>
            <p className="text-sm text-slate-300">Move tasks from NEXT to NOW. Archive finished projects.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenLoopsView;
