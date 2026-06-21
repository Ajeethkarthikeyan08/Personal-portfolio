'use client';

import { useState, useId } from 'react';
import { motion } from 'framer-motion';
import { Brain, Database, Cpu, Terminal, Compass, Award } from 'lucide-react';

interface SkillNode {
  id: string;
  name: string;
  category: 'ai' | 'ds' | 'se' | 'lang' | 'tools';
  x: number;
  y: number;
  size: number;
  level: number; // 0-100
  details: string;
  projects: string[];
}

interface Connection {
  source: string;
  target: string;
}

const SKILL_NODES: SkillNode[] = [
  // Hubs
  { id: 'ds_ai', name: 'Data Science & AI', category: 'ai', x: 250, y: 180, size: 45, level: 88, details: 'Focusing on data modeling, neural architectures, analytics algorithms, and intelligent search systems.', projects: ['FakeSocial Media Account Detection', 'Sentiment Analysis reviews'] },
  { id: 'data_tools', name: 'Data Tools', category: 'ds', x: 130, y: 300, size: 45, level: 90, details: 'Building data visualization sheets, metrics tracking, and KPI dashboards using Power BI and Excel.', projects: ['Sales Dashboard'] },
  { id: 'web_dev', name: 'Web Dev', category: 'se', x: 370, y: 300, size: 45, level: 85, details: 'Constructing layouts and responsive user interfaces using HTML, CSS, and script query databases.', projects: ['Personal portfolio website'] },

  // Sub-skills (AI)
  { id: 'python', name: 'Beginner Python', category: 'ai', x: 290, y: 80, size: 30, level: 80, details: 'Python script development, cleaning files, logic calculations, and data processing.', projects: ['FakeSocial Media Account Detection', 'Sentiment Analysis reviews'] },
  { id: 'ds', name: 'Data Science', category: 'ai', x: 190, y: 90, size: 30, level: 85, details: 'Exploratory analysis, cleansing dataset matrices, finding trends, and modeling predictive paths.', projects: ['FakeSocial Media Account Detection', 'Sentiment Analysis reviews'] },
  { id: 'da', name: 'Data Analytics', category: 'ai', x: 330, y: 150, size: 30, level: 88, details: 'Extracting business insights, calculating metrics, and presenting report charts.', projects: ['Sales Dashboard', 'Sentiment Analysis reviews'] },

  // Sub-skills (DS)
  { id: 'excel', name: 'Excel', category: 'ds', x: 50, y: 220, size: 30, level: 90, details: 'Organizing tabular rows, writing spreadsheet formulas, and generating PivotCharts.', projects: ['Sales Dashboard'] },
  { id: 'powerbi', name: 'Power BI', category: 'ds', x: 50, y: 350, size: 30, level: 86, details: 'Designing dashboards, connecting model sources, and tracking visual KPIs.', projects: ['Sales Dashboard'] },

  // Sub-skills (SE)
  { id: 'html', name: 'HTML', category: 'se', x: 450, y: 220, size: 30, level: 92, details: 'Creating structured semantic layouts and elements for web projects.', projects: ['Personal portfolio website'] },
  { id: 'css', name: 'CSS', category: 'se', x: 450, y: 350, size: 30, level: 88, details: 'Responsive styling, media queries, flexbox grids, and custom gradient transitions.', projects: ['Personal portfolio website'] },
  { id: 'sql', name: 'SQL', category: 'se', x: 370, y: 400, size: 30, level: 85, details: 'Structuring databases, relational querying, and sorting datasets.', projects: ['Concern Infotech Chatbot API', 'Sales Dashboard'] }
];

const CONNECTIONS: Connection[] = [
  // AI connects to sub-skills
  { source: 'ds_ai', target: 'python' },
  { source: 'ds_ai', target: 'ds' },
  { source: 'ds_ai', target: 'da' },

  // DS connects to sub-skills
  { source: 'data_tools', target: 'excel' },
  { source: 'data_tools', target: 'powerbi' },

  // SE connects to sub-skills
  { source: 'web_dev', target: 'html' },
  { source: 'web_dev', target: 'css' },
  { source: 'web_dev', target: 'sql' },

  // Inter-hub connections
  { source: 'ds_ai', target: 'data_tools' },
  { source: 'ds_ai', target: 'web_dev' },
  { source: 'data_tools', target: 'web_dev' },

  // Secondary connections
  { source: 'sql', target: 'data_tools' },
  { source: 'da', target: 'data_tools' }
];

export default function SkillGraph() {
  const [selectedNode, setSelectedNode] = useState<SkillNode>(SKILL_NODES[0]);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const layoutId = useId();

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'ai': return 'text-[#D4A017] stroke-[#D4A017] fill-[#D4A017]/10'; // Gold
      case 'ds': return 'text-[#F7E7CE] stroke-[#F7E7CE] fill-[#F7E7CE]/10'; // Cream
      case 'se': return 'text-[#102C26] stroke-[#102C26] fill-[#102C26]/20'; // Green
      default: return 'text-[#94A3B8] stroke-[#94A3B8] fill-slate-800';
    }
  };

  const getCategoryGlow = (cat: string) => {
    switch (cat) {
      case 'ai': return 'shadow-[0_0_15px_rgba(212,160,23,0.35)]';
      case 'ds': return 'shadow-[0_0_15px_rgba(247,231,206,0.35)]';
      case 'se': return 'shadow-[0_0_15px_rgba(16,44,38,0.45)]';
      default: return 'shadow-none';
    }
  };

  // Node filtering highlight logic
  const isHighlighted = (nodeId: string) => {
    if (!hoveredNodeId) return true;
    if (hoveredNodeId === nodeId) return true;
    return CONNECTIONS.some(
      (conn) =>
        (conn.source === hoveredNodeId && conn.target === nodeId) ||
        (conn.target === hoveredNodeId && conn.source === nodeId)
    );
  };

  const isLinkHighlighted = (conn: Connection) => {
    if (!hoveredNodeId) return true;
    return conn.source === hoveredNodeId || conn.target === hoveredNodeId;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Network Visualization (Left 7 Cols) */}
      <div className="lg:col-span-7 glass-panel rounded-2xl p-6 flex flex-col justify-between items-center relative overflow-hidden min-h-[480px]">
        {/* Background Grids */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        
        {/* Instructions */}
        <div className="w-full flex items-center justify-between text-xs text-text-muted z-10 select-none">
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-accent animate-spin-slow" />
            <span>Interactive Node Topology Map</span>
          </div>
          <span>Click nodes to inspect details</span>
        </div>

        {/* SVG Viewport */}
        <svg 
          viewBox="0 0 500 480" 
          className="w-full max-w-[480px] h-auto z-10 cursor-pointer overflow-visible select-none mt-2"
        >
          {/* Connection Links */}
          <g>
            {CONNECTIONS.map((conn, idx) => {
              const src = SKILL_NODES.find((n) => n.id === conn.source);
              const tgt = SKILL_NODES.find((n) => n.id === conn.target);
              if (!src || !tgt) return null;

              const highlighted = isLinkHighlighted(conn);

              return (
                <line
                  key={`${conn.source}-${conn.target}-${idx}`}
                  x1={src.x}
                  y1={src.y}
                  x2={tgt.x}
                  y2={tgt.y}
                  stroke={highlighted ? 'var(--accent)' : 'var(--border-color)'}
                  strokeWidth={highlighted ? 1.5 : 0.8}
                  strokeDasharray={src.size > 40 && tgt.size > 40 ? '4 4' : 'none'}
                  className="transition-all duration-300"
                  opacity={highlighted ? 0.75 : 0.15}
                />
              );
            })}
          </g>

          {/* Node Circles */}
          <g>
            {SKILL_NODES.map((node) => {
              const active = selectedNode.id === node.id;
              const highlighted = isHighlighted(node.id);
              const isHub = node.size > 40;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer"
                  onClick={() => setSelectedNode(node)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                >
                  {/* Outer Pulsing Glow */}
                  {active && (
                    <motion.circle
                      r={node.size + 8}
                      className="fill-none stroke-accent opacity-30"
                      strokeWidth={1.5}
                      animate={{ r: [node.size + 4, node.size + 12, node.size + 4] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    />
                  )}

                  {/* Inner Node Body */}
                  <circle
                    r={node.size}
                    className={`stroke-2 transition-all duration-300 ${getCategoryColor(node.category)} ${
                      active ? 'stroke-accent' : 'stroke-border'
                    }`}
                    opacity={highlighted ? 1 : 0.25}
                  />

                  {/* Icon or Initials */}
                  <g className="pointer-events-none select-none">
                    <text
                      textAnchor="middle"
                      dy="4"
                      fontSize={isHub ? '9.5px' : '8.5px'}
                      fontWeight="bold"
                      fill={highlighted ? 'var(--text-base)' : 'var(--text-muted)'}
                      opacity={highlighted ? 1 : 0.25}
                      className="font-sans"
                    >
                      {node.name.length > 15 ? node.name.split(' ')[0] : node.name}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Legend */}
        <div className="w-full flex justify-center gap-6 text-[10px] text-text-muted z-10 border-t border-border/40 pt-4 select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4A017]" />
            <span>AI & DS Hub</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F7E7CE]" />
            <span>Data Tools Hub</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#102C26]" />
            <span>Web Dev Hub</span>
          </div>
        </div>
      </div>

      {/* Node Metrics Panel (Right 5 Cols) */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {/* Selected Skill Information Card */}
        <div className="glass-panel rounded-2xl p-6 flex-1 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-accent/5 blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex items-start justify-between mb-4">
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border border-border/80 ${
                selectedNode.category === 'ai' ? 'bg-[#D4A017]/10 text-[#D4A017]' :
                selectedNode.category === 'ds' ? 'bg-[#F7E7CE]/10 text-[#F7E7CE]' :
                'bg-[#102C26]/20 text-[#102C26] dark:text-[#F7E7CE]'
              }`}>
                {selectedNode.category.toUpperCase()} Node
              </span>
              {selectedNode.category === 'ai' && <Brain className="w-5 h-5 text-accent" />}
              {selectedNode.category === 'ds' && <Database className="w-5 h-5 text-secondary" />}
              {selectedNode.category === 'se' && <Cpu className="w-5 h-5 text-primary-light" />}
              {selectedNode.category === 'lang' && <Terminal className="w-5 h-5 text-text-muted" />}
            </div>

            <h3 className="text-xl font-bold font-display text-text-base mb-2">
              {selectedNode.name}
            </h3>
            
            <p className="text-xs text-text-muted leading-relaxed mb-6">
              {selectedNode.details}
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {/* Proficiency Meter */}
            <div>
              <div className="flex justify-between items-center text-xs text-text-muted mb-1.5">
                <span>SKILL PROFIENCY</span>
                <span className="font-bold text-accent">{selectedNode.level}%</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-border/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedNode.level}%` }}
                  key={`${layoutId}-${selectedNode.id}-bar`}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Project Applications */}
            <div className="border-t border-border/50 pt-4">
              <div className="flex items-center gap-1.5 text-xs text-text-muted mb-3 font-semibold">
                <Award className="w-4 h-4 text-accent" />
                <span>Featured Practical Applications</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedNode.projects.map((proj, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-primary-light/35 border border-border/40 text-text-base px-2.5 py-1 rounded-md"
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
