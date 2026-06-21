'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, GitBranch, Clock, Cpu, Code, Activity, Sparkles, CheckCircle2 } from 'lucide-react';

// Generates simulated commits for 53 weeks * 7 days = 371 days
const generateContributionData = () => {
  const data = [];
  const now = new Date();
  const startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

  for (let i = 0; i < 371; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    // Randomize contributions (heavier mid-week, sparse on weekends)
    const day = currentDate.getDay();
    let weight = Math.random() * 8;
    if (day === 0 || day === 6) weight = Math.random() * 2; // weekend dip

    const count = Math.floor(weight);
    data.push({
      date: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      count,
      level: count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4
    });
  }
  return data;
};

export default function DevDashboard() {
  const [contributions] = useState(generateContributionData());
  const [activeSquare, setActiveSquare] = useState<{ date: string; count: number } | null>(null);

  // Terminal State
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Ajeeth System Command Prompt v1.0',
    'Welcome! Type "help" for a list of available command commands.',
    'System status: ONLINE | Environment: VS Code',
    ''
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Telemetry Counters
  const [linesOfCode, setLinesOfCode] = useState(148200);
  const [gpuEpochs, setGpuEpochs] = useState(842);
  const [activeFile, setActiveFile] = useState('src/app/page.tsx');

  // Increment counters dynamically to look alive
  useEffect(() => {
    const locInterval = setInterval(() => {
      setLinesOfCode((prev) => prev + Math.floor(Math.random() * 4) + 1);
    }, 4000);

    const epochInterval = setInterval(() => {
      setGpuEpochs((prev) => prev + 1);
    }, 12000);

    const files = [
      'src/app/page.tsx',
      'src/components/SkillGraph.tsx',
      'src/components/DevDashboard.tsx',
      'notebooks/model_training.ipynb',
      'notebooks/data_preprocessing.py',
      'src/app/globals.css'
    ];
    const fileInterval = setInterval(() => {
      setActiveFile(files[Math.floor(Math.random() * files.length)]);
    }, 10000);

    return () => {
      clearInterval(locInterval);
      clearInterval(epochInterval);
      clearInterval(fileInterval);
    };
  }, []);

  // Terminal Submit
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    if (!command) return;

    let response: string[] = [];

    switch (command) {
      case 'help':
        response = [
          'Available commands:',
          '  help      - Show this manual screen',
          '  about     - Brief statement on professional bio',
          '  skills    - View technical capabilities summary',
          '  neofetch  - Display virtual system hardware specs',
          '  matrix    - Toggle Matrix code rain terminal visualization',
          '  clear     - Wipe command terminal history log'
        ];
        break;
      case 'about':
        response = [
          'Ajeeth - AI & Data Science Student & Software Engineer',
          'Academic: B.Tech in AI & Data Science',
          'Goal: Building highly scalable neural network systems and modern web applications.',
          'Focus: Deep Learning, Natural Language Processing, TypeScript React Stack.'
        ];
        break;
      case 'skills':
        response = [
          'Languages: Python, TypeScript, SQL, R, JavaScript, C++',
          'Frameworks: PyTorch, TensorFlow, Next.js, React, TailwindCSS, Express',
          'Libraries: Pandas, NumPy, Scikit-Learn, Hugging Face, Framer Motion',
          'Tools: Git, Docker, VS Code, Anaconda, Jupyter Notebook, Postman'
        ];
        break;
      case 'neofetch':
        response = [
          '  /\\_/\\      ajeeth@portfolio-terminal',
          ' ( o.o )     -------------------------',
          '  > ^ <      OS: AjeethOS v1.0.0 (x86_64)',
          '             Kernel: Linux 6.8.0-ai-science',
          '             Uptime: 2 days, 14 hours',
          '             Shell: zsh 5.9',
          '             IDE: Visual Studio Code 1.95',
          '             CPU: Neural Engine Core (8 Cores)',
          '             GPU: NVIDIA RTX 4080 (16GB VRAM)',
          '             Memory: 32 GB LPDDR5 (Data Pipelines)'
        ];
        break;
      case 'matrix':
        setIsMatrixActive(!isMatrixActive);
        response = [isMatrixActive ? 'Matrix code rain deactivated.' : 'Matrix code rain activated! Look closely...'];
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        response = [`Command not found: "${command}". Type "help" for a list of available actions.`];
    }

    setTerminalHistory((prev) => [...prev, `ajeeth@terminal:~$ ${terminalInput}`, ...response, '']);
    setTerminalInput('');
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  // Matrix Rain rendering inside terminal
  useEffect(() => {
    if (!isMatrixActive || !terminalBodyRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '5';
    canvas.style.opacity = '0.12';
    canvas.style.pointerEvents = 'none';

    const parent = terminalBodyRef.current;
    parent.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = parent.clientWidth);
    let height = (canvas.height = parent.clientHeight);

    const katakana = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEF';
    const alphabet = katakana.split('');

    const fontSize = 12;
    const columns = width / fontSize;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#D4A017'; // luxury gold rain drops!
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 30);

    const handleResize = () => {
      width = canvas.width = parent.clientWidth;
      height = canvas.height = parent.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      if (parent.contains(canvas)) {
        parent.removeChild(canvas);
      }
    };
  }, [isMatrixActive]);

  // Color mapping for Git contribution levels
  const getContributionColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-[#102C26]/40 dark:bg-[#102C26]/30 border-primary-light/30';
      case 2: return 'bg-[#102C26]/80 dark:bg-[#102C26]/60 border-primary-light/50';
      case 3: return 'bg-[#D4A017]/50 border-accent/30';
      case 4: return 'bg-[#D4A017] border-accent';
      default: return 'bg-slate-900 border-border/30 dark:bg-slate-950';
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Upper Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-xl p-4 flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-accent/5 rounded-full blur-lg pointer-events-none" />
          <Code className="w-8 h-8 text-accent shrink-0" />
          <div>
            <div className="text-[10px] text-text-muted font-bold tracking-wider uppercase">Active Environment</div>
            <div className="text-sm font-bold text-text-base truncate max-w-[170px]">{activeFile}</div>
            <span className="text-[9px] bg-green-500/20 text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded flex items-center gap-1 w-max mt-1 font-mono">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              VS Code Active
            </span>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-4 flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-accent/5 rounded-full blur-lg pointer-events-none" />
          <Activity className="w-8 h-8 text-accent shrink-0" />
          <div>
            <div className="text-[10px] text-text-muted font-bold tracking-wider uppercase">Cumulative Code lines</div>
            <div className="text-lg font-mono font-bold text-text-base">
              {linesOfCode.toLocaleString()}
            </div>
            <div className="text-[9px] text-text-muted mt-0.5">Mock Telemetry (Aggregated git commits)</div>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-4 flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-accent/5 rounded-full blur-lg pointer-events-none" />
          <Cpu className="w-8 h-8 text-accent shrink-0" />
          <div>
            <div className="text-[10px] text-text-muted font-bold tracking-wider uppercase">AI Training Runs</div>
            <div className="text-lg font-mono font-bold text-text-base">
              {gpuEpochs} Epochs
            </div>
            <span className="text-[9px] bg-accent/20 text-accent border border-accent/30 px-1.5 py-0.5 rounded flex items-center gap-1 w-max mt-1 font-mono">
              CUDA Active
            </span>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-4 flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-accent/5 rounded-full blur-lg pointer-events-none" />
          <Clock className="w-8 h-8 text-accent shrink-0" />
          <div>
            <div className="text-[10px] text-text-muted font-bold tracking-wider uppercase">Average Build Health</div>
            <div className="text-lg font-mono font-bold text-text-base">98.4% Success</div>
            <span className="text-[9px] bg-green-500/20 text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded flex items-center gap-1 w-max mt-1 font-mono">
              <CheckCircle2 className="w-2.5 h-2.5" />
              Builds Passing
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left (GitHub Grid) & Right (Interactive Console) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* GitHub Grid Showcase (Left 7 Cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 flex flex-col justify-between overflow-hidden relative min-h-[350px]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4.5 h-4.5 text-accent" />
                <h4 className="text-sm font-bold font-display uppercase tracking-wider text-text-base">
                  GitHub Contribution Activity
                </h4>
              </div>
              <span className="text-[10px] text-text-muted">1,248 commits/year</span>
            </div>

            {/* Grid Container */}
            <div className="overflow-x-auto pb-2 scrollbar-none w-full">
              <div className="flex flex-col flex-wrap gap-[3.5px] max-h-[105px] w-max select-none relative">
                {contributions.map((square, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveSquare({ date: square.date, count: square.count })}
                    onMouseLeave={() => setActiveSquare(null)}
                    className={`w-[10px] h-[10px] rounded-[1.5px] border transition-colors cursor-pointer ${getContributionColor(
                      square.level
                    )}`}
                  />
                ))}
              </div>
            </div>

            {/* Tooltip display */}
            <div className="h-6 flex items-center justify-center mt-3 text-xs text-text-muted border-b border-border/30 pb-3">
              <AnimatePresence mode="wait">
                {activeSquare ? (
                  <motion.span
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    className="font-mono text-text-base/90"
                  >
                    <strong className="text-accent">{activeSquare.count} contributions</strong> on {activeSquare.date}
                  </motion.span>
                ) : (
                  <span className="text-[11px] font-sans">Hover squares to inspect contribution counts</span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Grid Stats Footer */}
          <div className="grid grid-cols-3 gap-2 text-center mt-4">
            <div className="bg-primary/10 border border-border/40 p-2.5 rounded-lg">
              <div className="text-[10px] text-text-muted mb-0.5">LONGEST STREAK</div>
              <div className="text-sm font-bold text-accent font-mono">45 Days</div>
            </div>
            <div className="bg-primary/10 border border-border/40 p-2.5 rounded-lg">
              <div className="text-[10px] text-text-muted mb-0.5">CURRENT STREAK</div>
              <div className="text-sm font-bold text-accent font-mono">12 Days</div>
            </div>
            <div className="bg-primary/10 border border-border/40 p-2.5 rounded-lg">
              <div className="text-[10px] text-text-muted mb-0.5">CORE WORKSPACE</div>
              <div className="text-xs font-bold text-text-base font-mono truncate">AI / NextJS</div>
            </div>
          </div>
        </div>

        {/* Developer Sandbox Console (Right 5 Cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-4 flex flex-col justify-between overflow-hidden relative bg-black/60 min-h-[350px]">
          <div className="flex items-center justify-between pb-2.5 border-b border-border/40 mb-3 select-none">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold font-mono text-text-base">ajeeth_sandboxed_console.sh</span>
            </div>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
          </div>

          {/* Terminal Console Output area */}
          <div
            ref={terminalBodyRef}
            className="flex-1 overflow-y-auto font-mono text-[10.5px] leading-relaxed p-1 text-green-400 max-h-[230px] scrollbar-none relative"
          >
            {terminalHistory.map((line, idx) => {
              if (line.startsWith('ajeeth@terminal:~$')) {
                return (
                  <div key={idx} className="text-text-base font-semibold mt-1">
                    {line}
                  </div>
                );
              }
              if (line.startsWith('  ')) {
                return (
                  <div key={idx} className="text-accent/90 whitespace-pre">
                    {line}
                  </div>
                );
              }
              return (
                <div key={idx} className="text-[#F7E7CE]/80 whitespace-pre-wrap">
                  {line}
                </div>
              );
            })}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal input form */}
          <form onSubmit={handleTerminalSubmit} className="flex items-center gap-1.5 border-t border-border/40 pt-2.5 mt-2">
            <span className="text-xs font-mono font-bold text-accent select-none">&gt;&gt;</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder='Type "help", "neofetch" or "matrix"...'
              className="flex-1 bg-transparent border-none text-xs font-mono text-text-base focus:outline-none placeholder:text-text-muted"
            />
            <button
              type="submit"
              className="text-[9px] bg-primary-light border border-border/60 hover:border-accent text-accent font-mono px-2 py-0.5 rounded cursor-pointer transition-colors"
            >
              RUN
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
