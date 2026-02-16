
import React from 'react';
import { ContentExtraction } from '../types';
import { Quote, Youtube, FileText } from 'lucide-react';

interface Props {
  content: ContentExtraction;
}

const ContentExtractionView: React.FC<Props> = ({ content }) => {
  return (
    <div className="p-6 lg:p-10 space-y-12 max-w-full overflow-hidden">
      <section className="space-y-6">
        <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
          <Quote className="w-7 h-7 text-indigo-600 flex-shrink-0" />
          Viral Hooks
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {content.hooks.map((hook, i) => (
            <div key={i} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-indigo-300 transition-colors flex items-start gap-3 min-w-0">
              <span className="text-indigo-600 font-black text-lg">“</span>
              <p className="text-slate-700 font-semibold leading-relaxed italic text-sm break-words overflow-hidden">{hook}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
          <Youtube className="w-7 h-7 text-rose-600 flex-shrink-0" />
          Short-Form Scripts (30-60s)
        </h3>
        <div className="space-y-6">
          {content.shortScripts.map((script, i) => (
            <div key={i} className="bg-slate-50 rounded-3xl p-6 lg:p-8 border border-slate-200 min-w-0">
              <h4 className="text-xl font-bold text-slate-900 mb-4 truncate">{script.title}</h4>
              <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-wrap break-words">{script.outline}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
          <FileText className="w-7 h-7 text-sky-600 flex-shrink-0" />
          Long-Form Video Outlines
        </h3>
        <div className="grid gap-6">
          {content.longOutlines.map((outline, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm min-w-0">
              <h4 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 truncate">{outline.title}</h4>
              <div className="space-y-4">
                {outline.structure.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500 flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-slate-700 text-sm font-medium break-words overflow-hidden">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContentExtractionView;
