
import React from 'react';
import { ProjectModule } from '../types';
import { Box, Users, BarChart3, FlaskConical, Target } from 'lucide-react';

interface Props {
  modules: ProjectModule[];
}

const ProjectModulesView: React.FC<Props> = ({ modules }) => {
  return (
    <div className="p-4 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 bg-slate-50/50">
      {modules.map((mod, i) => (
        <div key={i} className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform flex-shrink-0">
              <Box className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight truncate">{mod.name}</h3>
              <p className="text-xs text-slate-400 font-medium">Project Module</p>
            </div>
          </div>

          <div className="space-y-6 flex-1">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Target className="w-3 h-3" /> Core Goal
              </p>
              <p className="text-slate-700 font-semibold text-sm sm:text-base break-words leading-snug">{mod.goal}</p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Users className="w-3 h-3" /> Target Audience
              </p>
              <p className="text-slate-600 text-xs sm:text-sm break-words">{mod.audience}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Key Assets</p>
                <ul className="space-y-1">
                  {mod.assets?.map((asset, idx) => (
                    <li key={idx} className="text-[11px] sm:text-xs text-slate-500 flex items-start gap-2 leading-tight">
                      <span className="w-1 h-1 bg-indigo-400 rounded-full mt-1.5 flex-shrink-0" /> <span className="break-words">{asset}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Success Metrics</p>
                <ul className="space-y-1">
                  {mod.metrics?.map((metric, idx) => (
                    <li key={idx} className="text-[11px] sm:text-xs text-slate-500 flex items-start gap-2 leading-tight">
                      <span className="w-1 h-1 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0" /> <span className="break-words">{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-indigo-50/50 p-4 rounded-xl sm:rounded-2xl border border-indigo-100 mt-auto">
              <p className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest flex items-center gap-1 mb-2">
                <FlaskConical className="w-3 h-3" /> Smallest Test (V0)
              </p>
              <p className="text-xs sm:text-sm text-indigo-900 leading-relaxed font-medium break-words italic">
                &ldquo;{mod.firstTest}&rdquo;
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectModulesView;
