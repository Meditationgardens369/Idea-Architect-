
import React from 'react';
import { Automation } from '../types';
import { Zap, Play, Workflow, ArrowRight } from 'lucide-react';

interface Props {
  automations: Automation[];
}

const AutomationsView: React.FC<Props> = ({ automations }) => {
  return (
    <div className="p-8 lg:p-12 overflow-y-auto h-full bg-slate-50/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {automations.map((auto, i) => (
            <div key={i} className="group relative bg-slate-900 text-white rounded-3xl p-6 lg:p-8 overflow-hidden shadow-2xl border border-slate-800 flex flex-col h-full min-w-0">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 space-y-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-4">
                  <div className="p-2.5 bg-indigo-600/20 rounded-xl border border-indigo-500/30 flex-shrink-0">
                    <Zap className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {auto.tools.slice(0, 3).map((tool, idx) => (
                      <span key={idx} className="text-[9px] font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded uppercase border border-slate-700 truncate max-w-[80px]">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="text-xl font-black mb-1 tracking-tight truncate">{auto.name}</h3>
                  <p className="text-slate-400 text-xs flex items-center gap-2 truncate">
                    <Play className="w-2.5 h-2.5 fill-indigo-500 text-indigo-500" />
                    Trigger: <span className="text-slate-200 font-semibold truncate">{auto.trigger}</span>
                  </p>
                </div>

                <div className="space-y-3 flex-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Workflow Steps</p>
                  <div className="space-y-3">
                    {auto.steps.slice(0, 4).map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-indigo-600/10 rounded-2xl p-4 border border-indigo-500/20 mt-4">
                  <div className="flex items-center gap-3 text-[10px] text-indigo-200 font-bold mb-1 uppercase tracking-tighter">
                    <Workflow className="w-3.5 h-3.5" /> Output
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2 italic">{auto.output}</p>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-800/50 mt-4">
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold text-slate-500 uppercase">MVP VERSION</p>
                    <p className="text-xs text-indigo-300 font-medium truncate">{auto.mvp}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-indigo-400 transition-colors flex-shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutomationsView;
