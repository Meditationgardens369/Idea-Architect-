
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Milestone, 
  Table, 
  FolderKanban, 
  Zap, 
  Video, 
  HelpCircle, 
  Send,
  Loader2,
  Sparkles,
  PlusCircle,
  FileCode,
  AlertCircle,
  Menu,
  X
} from 'lucide-react';
import { processTranscript } from './geminiService';
import { ArchitectOutput } from './types';

// Components
import SummaryView from './components/SummaryView';
import ThemeMapView from './components/ThemeMapView';
import RoadmapView from './components/RoadmapView';
import DecisionBoardView from './components/DecisionBoardView';
import ProjectModulesView from './components/ProjectModulesView';
import AutomationsView from './components/AutomationsView';
import ContentExtractionView from './components/ContentExtractionView';
import OpenLoopsView from './components/OpenLoopsView';

type ViewType = 'summary' | 'mindmap' | 'roadmap' | 'decisions' | 'modules' | 'automations' | 'content' | 'loops';

const STORAGE_KEY = 'ka_pro_v3_store';

const App: React.FC = () => {
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [data, setData] = useState<ArchitectOutput | null>(null);
  const [activeView, setActiveView] = useState<ViewType>('summary');
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.executiveSummary) setData(parsed);
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (data) localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    else if (data === null) localStorage.removeItem(STORAGE_KEY);
  }, [data]);

  const handleProcess = async () => {
    if (!transcript.trim()) return;
    setIsProcessing(true);
    setError(null);
    try {
      const result = await processTranscript(transcript);
      setData(result);
      setActiveView('summary');
    } catch (err: any) {
      setError(err.message || "Something went wrong during architecting.");
    } finally {
      setIsProcessing(false);
    }
  };

  const startNewSession = () => {
    if (confirm("Reset current architect?")) {
      setData(null);
      setTranscript('');
      setActiveView('summary');
      setError(null);
    }
  };

  const navItems = [
    { id: 'summary', icon: LayoutDashboard, label: 'Executive' },
    { id: 'mindmap', icon: MapIcon, label: 'Theme Map' },
    { id: 'roadmap', icon: Milestone, label: 'Roadmap' },
    { id: 'decisions', icon: Table, label: 'Decisions' },
    { id: 'modules', icon: FolderKanban, label: 'Projects' },
    { id: 'automations', icon: Zap, label: 'AI/Automations' },
    { id: 'content', icon: Video, label: 'Content' },
    { id: 'loops', icon: HelpCircle, label: 'Open Loops' },
  ];

  const renderedContent = useMemo(() => {
    if (!data) return null;
    switch (activeView) {
      case 'summary': return <SummaryView summary={data.executiveSummary} move={data.theOneMove} />;
      case 'mindmap': return <ThemeMapView map={data.themeMap} />;
      case 'roadmap': return <RoadmapView roadmap={data.roadmap} />;
      case 'decisions': return <DecisionBoardView board={data.decisionBoard} />;
      case 'modules': return <ProjectModulesView modules={data.projectModules} />;
      case 'automations': return <AutomationsView automations={data.automations} />;
      case 'content': return <ContentExtractionView content={data.content} />;
      case 'loops': return <OpenLoopsView loops={data.openLoops} />;
      default: return <SummaryView summary={data.executiveSummary} move={data.theOneMove} />;
    }
  }, [activeView, data]);

  if (!data && !isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-10">
        <div className="max-w-4xl w-full space-y-12 animate-in fade-in zoom-in duration-1000">
          <div className="text-center space-y-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 blur-3xl bg-indigo-500/30 rounded-full animate-pulse"></div>
              <div className="relative glass-panel p-5 rounded-3xl mb-6 border border-white/10">
                <Sparkles className="w-10 h-10 text-indigo-400 float-anim" />
              </div>
            </div>
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight leading-none">
              Knowledge <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Architect</span>
            </h1>
            <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto px-4 font-medium leading-relaxed">
              Transform raw noise into high-fidelity systems and executable roadmaps.
            </p>
          </div>
          
          <div className="glass-panel rounded-[2.5rem] p-8 sm:p-12 border border-white/5 shadow-2xl relative">
            {error && (
              <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-4 text-rose-400 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="font-medium">{error}</p>
              </div>
            )}
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="w-full h-80 bg-black/40 text-slate-200 p-8 rounded-3xl border border-white/10 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none resize-none custom-scrollbar text-lg placeholder-slate-600 font-medium"
              placeholder="Drop your transcript or brain-dump here..."
            />
            <button
              onClick={handleProcess}
              disabled={!transcript.trim() || isProcessing}
              className="w-full mt-8 py-5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-30 text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 transition-all shadow-[0_0_40px_rgba(79,70,229,0.3)] active:scale-95"
            >
              <Send className="w-6 h-6" />
              Architect the System
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-10">
        <div className="relative mb-12">
           <div className="absolute inset-0 blur-[60px] bg-indigo-500/40 rounded-full animate-pulse"></div>
           <Loader2 className="w-24 h-24 text-indigo-400 animate-spin relative z-10" />
        </div>
        <h2 className="text-4xl font-black text-white tracking-tight animate-pulse mb-4 italic">Architecting...</h2>
        <p className="text-slate-400 text-lg max-w-md font-medium">Running advanced reasoning protocols to extract execution nodes.</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden relative">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 glass-panel border-b border-white/5 z-50">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-6 h-6 text-indigo-400" />
          <span className="font-bold text-white">KA Pro</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-white">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-0 lg:relative lg:inset-auto z-40 w-72 h-screen glass-panel 
        flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        border-r border-white/5
      `}>
        <div className="p-8 border-b border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.5)]">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-black text-white text-xl tracking-tighter">KA PRO</h2>
            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">v1.2 Stable</p>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id as ViewType);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group ${
                activeView === item.id 
                ? 'bg-indigo-600 text-white shadow-[0_0_30px_rgba(79,70,229,0.4)]' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 transition-transform ${activeView === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className="font-bold text-sm tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
           <button 
             onClick={startNewSession}
             className="w-full py-4 bg-white/5 hover:bg-white/10 text-slate-300 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 border border-white/5"
           >
             <PlusCircle className="w-4 h-4 text-indigo-400" />
             New Architect
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="px-8 py-8 lg:px-12 lg:py-10 sticky top-0 z-10 flex-shrink-0">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
            <div className="min-w-0">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-2">Architectural Blueprint</p>
              <h1 className="text-2xl lg:text-5xl font-extrabold text-white tracking-tighter truncate">
                {data?.themeMap?.title || 'Execution Dashboard'}
              </h1>
            </div>
            
            {data?.theOneMove && (
              <div className="hidden xl:flex items-center gap-4 glass-panel p-4 rounded-3xl border border-indigo-500/20 shadow-[0_0_40px_rgba(79,70,229,0.1)]">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-black text-indigo-300 uppercase tracking-widest mb-0.5">Primary Target</p>
                  <p className="text-white font-black text-sm truncate max-w-[200px]">{data.theOneMove.action}</p>
                </div>
              </div>
            )}
          </div>
        </header>

        <section className="flex-1 overflow-y-auto custom-scrollbar px-6 sm:px-10 lg:px-12 pb-12">
          <div className="max-w-7xl mx-auto h-full flex flex-col">
            <div className="bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth">
                {renderedContent}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
