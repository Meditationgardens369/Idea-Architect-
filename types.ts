
export interface ExecutiveSummary {
  direction: string;
  opportunities: string[];
  risks: string[];
}

export interface MindMapNode {
  title: string;
  nodes?: MindMapNode[];
  notes?: string;
}

export interface Task {
  title: string;
  why: string;
  dod: string;
  effort: 'S' | 'M' | 'L';
  dependencies: string[];
}

export interface RoadmapColumn {
  name: 'NOW' | 'NEXT' | 'LATER';
  tasks: Task[];
}

export interface ProjectModule {
  name: string;
  goal: string;
  audience: string;
  assets: string[];
  metrics: string[];
  firstTest: string;
}

export interface Automation {
  name: string;
  trigger: string;
  steps: string[];
  output: string;
  tools: string[];
  mvp: string;
}

export interface ContentExtraction {
  hooks: string[];
  shortScripts: { title: string; outline: string }[];
  longOutlines: { title: string; structure: string[] }[];
}

export interface ArchitectOutput {
  executiveSummary: ExecutiveSummary;
  themeMap: { title: string; nodes: MindMapNode[] };
  roadmap: { columns: RoadmapColumn[] };
  decisionBoard: {
    keep: string[];
    kill: string[];
    park: string[];
    research: string[];
  };
  projectModules: ProjectModule[];
  automations: Automation[];
  content: ContentExtraction;
  openLoops: string[];
  theOneMove: {
    action: string;
    reason: string;
  };
}
