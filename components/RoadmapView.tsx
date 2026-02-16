
import React from 'react';
import { RoadmapColumn } from '../types';
import { CheckCircle2, Layers } from 'lucide-react';

interface Props {
  roadmap: { columns: RoadmapColumn[] };
}

const RoadmapView: React.FC<Props> = ({ roadmap }) => {
  const effortColors = {
    S: 'bg-emerald-100 text-emerald-700',
    M: 'bg-amber-100 text-amber-700',
    L: 'bg-rose-100 text-rose-700',
  };

  const columnHeaders = {
    NOW: { label: 'Immediate Execution', sub: 'Next 7 Days', color: 'text-indigo-600' },
    NEXT: { label: 'In Queue', sub: '2-4 Weeks', color: 'text-slate-600' },
    LATER: { label: 'On Horizon', sub: '1-3 Months', color: 'text-slate-400' },
  };

  const columns = roadmap?.columns || [];

  return (
    <div className="flex-1 flex overflow-x-auto bg-slate-50/50 p-6 gap-6 custom-scrollbar min-h-0">
      {columns.map((col) => {
        const header = columnHeaders[col.name as keyof typeof columnHeaders] || { label: col.name, sub: '', color: 'text-slate-600' };
        const tasks = col.tasks || [];
        return (
          <div key={col.name} className="w-[300px] flex-shrink-0 flex flex-col gap-6 h-full min-h-0">
            <div className="px-4">
              <h3 className={`text-xl font-extrabold ${header.color}`}>
                {col.name}
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                {header.label} • {header.sub}
              </p>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pb-6 pr-2">
              {tasks.map((task, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors group">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${effortColors[task.effort as keyof typeof effortColors] || 'bg-slate-100 text-slate-600'}`}>
                      Effort: {task.effort}
                    </span>
                  </div>
                  
                  <h4 className="text-slate-900 font-bold leading-tight mb-2 text-sm break-words">{task.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-3 mb-4 leading-relaxed italic break-words">
                    &ldquo;{task.why}&rdquo;
                  </p>

                  <div className="space-y-3 pt-4 border-t border-slate-50">
                     <div className="flex items-start gap-2">
                       <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                       <p className="text-[10px] text-slate-700 leading-tight break-words">
                         <span className="font-bold">DoD:</span> {task.dod}
                       </p>
                     </div>
                     {task.dependencies && task.dependencies.length > 0 && (
                       <div className="flex items-start gap-2">
                         <Layers className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                         <p className="text-[10px] text-slate-500 italic break-words">
                           Relies on: {task.dependencies.join(', ')}
                         </p>
                       </div>
                     )}
                  </div>
                </div>
              ))}
              {tasks.length === 0 && (
                <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl p-8 opacity-50">
                  <p className="text-xs text-center font-medium">No tasks assigned</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoadmapView;
