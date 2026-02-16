
import React from 'react';
import { MindMapNode } from '../types';
import { FileText, ChevronRight } from 'lucide-react';

interface Props {
  map: { title: string; nodes: MindMapNode[] };
}

const NodeItem: React.FC<{ node: MindMapNode; level: number }> = ({ node, level }) => {
  return (
    <div className={`space-y-2 ${level > 0 ? 'ml-6 pl-6 border-l border-slate-100 py-1' : ''}`}>
      <div className="group flex items-start gap-3">
        {level > 0 && <ChevronRight className="w-3 h-3 text-slate-300 mt-1 flex-shrink-0" />}
        <div className="space-y-1 min-w-0">
          <h4 className={`font-bold tracking-tight truncate ${level === 0 ? 'text-lg text-slate-900' : 'text-sm text-slate-800'}`}>
            {node.title}
          </h4>
          {node.notes && (
            <p className="text-[11px] text-slate-500 flex items-center gap-1.5 leading-snug">
              <FileText className="w-3 h-3 flex-shrink-0" />
              {node.notes}
            </p>
          )}
        </div>
      </div>
      {node.nodes && node.nodes.slice(0, 5).map((child, i) => (
        <NodeItem key={i} node={child} level={level + 1} />
      ))}
    </div>
  );
};

const ThemeMapView: React.FC<Props> = ({ map }) => {
  return (
    <div className="p-8 lg:p-12 overflow-y-auto h-full flex flex-col">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-indigo-600 rounded-full" />
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">{map.title}</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {map.nodes.map((node, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col min-w-0">
              <NodeItem node={node} level={0} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeMapView;
