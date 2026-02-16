
import React from 'react';
import { ShieldCheck, Trash2, Coffee, Search } from 'lucide-react';

interface Props {
  board: {
    keep: string[];
    kill: string[];
    park: string[];
    research: string[];
  };
}

const DecisionBoardView: React.FC<Props> = ({ board }) => {
  const sections = [
    { id: 'keep', title: 'KEEP (Commit)', items: board.keep, icon: ShieldCheck, color: 'bg-emerald-50 text-emerald-800 border-emerald-100', dot: 'bg-emerald-500' },
    { id: 'kill', title: 'KILL (Eliminate)', items: board.kill, icon: Trash2, color: 'bg-rose-50 text-rose-800 border-rose-100', dot: 'bg-rose-500' },
    { id: 'park', title: 'PARK (Delayed)', items: board.park, icon: Coffee, color: 'bg-indigo-50 text-indigo-800 border-indigo-100', dot: 'bg-indigo-500' },
    { id: 'research', title: 'RESEARCH (Unknowns)', items: board.research, icon: Search, color: 'bg-amber-50 text-amber-800 border-amber-100', dot: 'bg-amber-500' },
  ];

  return (
    <div className="p-6 sm:p-12 lg:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      {sections.map((section) => (
        <div key={section.id} className={`rounded-[2.5rem] border-2 p-8 sm:p-12 flex flex-col h-full transition-all duration-300 hover:shadow-2xl ${section.color}`}>
          <div className="flex items-center gap-5 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center flex-shrink-0">
              <section.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tighter uppercase italic">{section.title}</h3>
          </div>
          
          <ul className="space-y-6 flex-1">
            {section.items && section.items.length > 0 ? (
              section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <div className={`mt-2.5 w-2 h-2 rounded-full flex-shrink-0 ${section.dot} shadow-lg`} />
                  <span className="text-base sm:text-lg font-bold leading-snug break-words">
                    {item}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-sm italic opacity-40 font-bold">No assets detected</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DecisionBoardView;
