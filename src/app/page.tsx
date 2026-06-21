'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, Moon, Search, Mail, MapPin, ExternalLink, 
  Download, Award, BookOpen, GraduationCap, ChevronRight, MessageSquare, 
  Terminal, Sparkles, FolderGit2, CheckCircle2, Star, BookOpenCheck, Phone,
  User
} from 'lucide-react';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

import LoadingScreen from '@/components/LoadingScreen';
import CommandPalette from '@/components/CommandPalette';
import SkillGraph from '@/components/SkillGraph';
import DevDashboard from '@/components/DevDashboard';

// Projects dataset
const PROJECTS_DATA = [
  {
    title: 'FakeSocial Media Account Detection Platform',
    category: 'Artificial Intelligence',
    description: 'Developed a Fake Social Media Account Detection Platform using machine learning and graph analytics. Detected fake and bot accounts through behavioral analysis and network graph visualization across socialmedia platforms.',
    tags: ['Python', 'PyTorch', 'Mediapipe', 'OpenCV', 'Next.js'],
    github: 'https://github.com/Ajeethkarthikeyan08',
    demo: '#',
    featured: false,
  },
  {
    title: 'Social media sentiment analysis for product reviews',
    category: 'Data Science',
    description: 'Developed an NLP-based sentiment analysis model to classify product reviews and extract key user insights, helping assess product performance and customer satisfaction.',
    tags: ['Python', 'Jupyter', 'Scikit-Learn', 'Pandas', 'Streamlit'],
    github: 'https://github.com/Ajeethkarthikeyan08',
    demo: '#',
    featured: false,
    metric: '89.5% ROC-AUC'
  },
  {
    title: 'Personal portfolio website',
    category: 'Web Development',
    description: 'Designed and deployed a responsive portfolio website using Node Js, CSS, and JavaScript to showcase projects and skills, with a modern mobile-friendly UI and optimized performance for a smooth user experience.',
    tags: ['Node Js', 'CSS', 'JavaScript'],
    github: 'https://github.com/Ajeethkarthikeyan08',
    featured: true,
  },
  {
    title: 'Sales Dashboard',
    category: 'Dashboard',
    description: 'Built a Power BI dashboard to track sales performance and KPIs with automated data preparation. Added drill-downfilters forregion, product, and time period to provide actionable insights.',
    tags: ['PyTorch', 'Hugging Face', 'FastAPI', 'Docker', 'React'],
    github: 'https://github.com/Ajeethkarthikeyan08',
    demo: '#',
    featured: false,
  },
  {
    title: 'Collaborative Skill Swap Platform',
    category: 'Web Development',
    description: 'Developed a Collaborative Skill Swap Platform that enables users to exchange skills through peer-to-peer learning. The platform helps learners connect with individuals who possess the expertise they seek while allowing them to share their own knowledge, creating a collaborative and accessible learning ecosystem.',
    tags: ['HTML', 'CSS', 'php', 'SQL'],
    github: 'https://github.com/Ajeethkarthikeyan08',
    demo: '#',
    featured: false,
  }
];

// Certificates dataset
const CERTIFICATES_DATA = [
  {
    title: 'CyberSecurity',
    issuer: 'Kriyavan Cyber Forensic Service',
    date: 'October 2023',
    link: '#'
  },
  {
    title: 'Time Management',
    issuer: 'Infosys',
    date: 'March 2024',
    link: '#'
  }
];


export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState('All');
  const [profileImageError, setProfileImageError] = useState(false);
  const [aboutImageError, setAboutImageError] = useState(false);

  // Read initial theme on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLight = document.documentElement.classList.contains('light');
      setIsLightMode(isLight);
    }
  }, []);

  // Theme Toggle function
  const toggleTheme = () => {
    if (isLightMode) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
      setIsLightMode(false);
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
      setIsLightMode(true);
    }
  };

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered projects
  const filteredProjects = projectFilter === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === projectFilter);

  // Stats Counters data
  const stats = [
    { label: 'Total Projects', value: PROJECTS_DATA.length },
    { label: 'Certificates Earned', value: CERTIFICATES_DATA.length },
    { label: 'GitHub Repositories', value: 5 },
    { label: 'Academic CGPA', value: '7.97' }
  ];

  // Bypassed loading screen preloader

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Search Overlay Keybind Listener indicator */}
      <CommandPalette
        isOpen={isPaletteOpen}
        setIsOpen={setIsPaletteOpen}
        isLightMode={isLightMode}
        toggleTheme={toggleTheme}
        scrollToSection={scrollToSection}
      />

      {/* Floating Animated Grid BG */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-40 z-0" />

      {/* Modern Floating Header Navigation */}
      <header className="sticky top-0 z-40 w-full px-4 py-3 bg-bg-base/70 backdrop-blur-md border-b border-border/80 transition-all duration-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('hero')} 
            className="text-lg font-bold font-display tracking-widest text-gradient-gold select-none cursor-pointer"
          >
            AJEETH.K
          </button>

          {/* Nav links desktop */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-text-base/80 select-none">
            <button onClick={() => scrollToSection('about')} className="hover:text-accent cursor-pointer transition-colors">About</button>
            <button onClick={() => scrollToSection('experience')} className="hover:text-accent cursor-pointer transition-colors">Experience</button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-accent cursor-pointer transition-colors">Skills</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-accent cursor-pointer transition-colors">Projects</button>
            <button onClick={() => scrollToSection('education')} className="hover:text-accent cursor-pointer transition-colors">Education</button>
            <button onClick={() => scrollToSection('certificates')} className="hover:text-accent cursor-pointer transition-colors">Credentials</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-accent cursor-pointer transition-colors">Contact</button>
          </nav>

          {/* Quick Toolbar */}
          <div className="flex items-center gap-2">
            {/* Search Palette Toggle Button */}
            {/* Search Palette disabled in header */}

            {/* Dark Mode Light Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-primary-light/20 border border-border/60 text-accent hover:border-accent hover:bg-primary-light/40 transition-all cursor-pointer"
              aria-label="Toggle theme mode"
            >
              {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Sections */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 relative z-10 flex flex-col gap-24">
        
        {/* HERO SECTION */}
        <section id="hero" className="min-h-[85vh] flex items-center relative py-12">
          {/* Neon background overlays */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary/20 blur-[130px] pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 w-[250px] h-[250px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10 text-center lg:text-left">
            {/* Left intro text (7 Cols) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 flex flex-col items-center lg:items-start"
            >
              {/* Status chip */}
              <div className="flex items-center gap-1.5 bg-[#102C26]/20 border border-[#F7E7CE]/20 px-3.5 py-1 rounded-full text-[10.5px] text-accent tracking-wider font-bold uppercase mb-6 shadow-sm w-max">
                <Sparkles className="w-3 h-3 text-accent animate-pulse" />
                <span>AI & Data Science Student & Developer</span>
              </div>

              {/* Headings */}
              <h1 className="text-4xl sm:text-6xl font-extrabold font-display leading-[1.1] tracking-tight mb-4 text-text-base">
                Hi, I am <span className="text-gradient-gold text-glow">Ajeeth</span>
              </h1>

              {/* Typing subtitle */}
              <h2 className="text-lg sm:text-2xl font-mono text-text-muted mb-6">
                Engineering{' '}
                <span className="text-text-base border-b-2 border-accent typing-cursor pb-0.5">
                  Machine Learning & Web Systems
                </span>
              </h2>

              {/* Personal branding statement */}
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-xl mb-10">
                Enthusiastic final-year engineering student passionate about Data Science, Artificial Intelligence, and Machine Learning. Skilled in Python and data analytics, with a keen interest in solving real-world problems using AI-driven insights.
              </p>

              {/* CTA Controls */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 w-full max-w-2xl">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent-hover text-secondary font-bold text-xs px-5 py-3 rounded-lg shadow-lg cursor-pointer transition-all hover:scale-[1.02]"
                >
                  View Projects
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                <button 
                  onClick={() => scrollToSection('certificates')}
                  className="flex items-center gap-2 bg-primary-light/20 hover:bg-primary-light/40 border border-border/80 text-text-base font-semibold text-xs px-5 py-3 rounded-lg cursor-pointer transition-all hover:scale-[1.02]"
                >
                  Certificates
                </button>

                <a
                  href="/AJEETH_K_RESUME.pdf"
                  download="AJEETH_K_RESUME.pdf"
                  className="flex items-center gap-2 bg-primary-light/20 hover:bg-primary-light/40 border border-border/80 text-text-base font-semibold text-xs px-5 py-3 rounded-lg cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <Download className="w-3.5 h-3.5 text-accent" />
                  Download Resume
                </a>

                <a
                  href="/AJEETH_K_RESUME.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-primary-light/20 hover:bg-primary-light/40 border border-border/80 text-text-base font-semibold text-xs px-5 py-3 rounded-lg cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-accent" />
                  View Resume
                </a>

                <button 
                  onClick={() => scrollToSection('contact')}
                  className="flex items-center gap-2 bg-primary-light/20 hover:bg-primary-light/40 border border-border/80 text-text-base font-semibold text-xs px-5 py-3 rounded-lg cursor-pointer transition-all hover:scale-[1.02]"
                >
                  Contact Me
                </button>
              </div>

              {/* Social links row */}
              <div className="flex items-center gap-6 mt-10 text-text-muted">
                <a href="https://github.com/Ajeethkarthikeyan08" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/ajeeth-k-3406a7297?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a href="mailto:ajeethkarthikeyan08@gmail.com" className="hover:text-accent transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            {/* Right profile image (5 Cols) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 flex justify-center items-center relative"
            >
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square group select-none">
                {/* Offset decorative frame */}
                <div className="absolute -inset-3 rounded-2xl border border-accent/20 translate-x-2.5 translate-y-2.5 pointer-events-none transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
                
                {/* Main profile visual frame */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden glass-panel border border-border flex items-center justify-center bg-slate-950/20 group">
                  {!profileImageError ? (
                    <img
                      src="/ajeeth_image.jpg"
                      alt="Ajeeth K Profile"
                      onError={() => setProfileImageError(true)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center text-text-muted">
                      <User className="w-12 h-12 text-accent mb-3.5 animate-pulse" />
                      <span className="text-[10px] tracking-widest font-mono text-accent uppercase font-bold">profile.jpg</span>
                      <span className="text-[9px] mt-2 text-text-muted max-w-[190px] leading-relaxed">
                        Add your photo in <code>public/ajeeth_image.jpg</code> to display here
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* QUICK STATS SECTION */}
        <section id="stats" className="scroll-mt-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="glass-card rounded-xl p-4 text-center flex flex-col justify-center relative overflow-hidden">
                <div className="text-[10px] text-text-muted font-bold tracking-wider uppercase mb-1">{stat.label}</div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-accent">{stat.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section id="about" className="scroll-mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="border-l-4 border-accent pl-4">
              <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-text-base">
                About Me
              </h2>
              <p className="text-xs text-text-muted mt-1">My educational vector and developmental journey.</p>
            </div>
            
            <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4 text-xs sm:text-sm text-text-base/80 leading-relaxed">
              <p>
                Enthusiastic Final-year engineering student passionate about <strong>Data Science, Artificial Intelligence, and Machine Learning</strong>. Skilled in Python and data analytics, with a keen interest in solving real-world problems using AI-driven insights. Constantly exploring new technologies to enhance learning and innovation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/40 pt-4 mt-2">
                <div>
                  <h4 className="font-bold text-accent mb-1 uppercase text-[10.5px]">Core Strengths</h4>
                  <ul className="list-disc list-inside flex flex-col gap-1 text-[11px] text-text-muted">
                    <li>Predictive Modeling / Statistics</li>
                    <li>Frontend UI Component Architectures</li>
                    <li>Algorithm Graph Optimizations</li>
                    <li>Clean Data Cleansing Pipelines</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE SKILL GRAPH SECTION */}
        <section id="skills" className="scroll-mt-20 flex flex-col gap-6">
          <div className="border-l-4 border-accent pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-text-base">
              Interactive Skill Topology
            </h2>
            <p className="text-xs text-text-muted mt-1">
              Select nodes on the map to display competence scores and applied project applications.
            </p>
          </div>
          <SkillGraph />
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="scroll-mt-20 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-l-4 border-accent pl-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-text-base">
                Engineering Showcase
              </h2>
              <p className="text-xs text-text-muted mt-1">
                Filterable gallery displaying key academic and standalone development projects.
              </p>
            </div>
            {/* Filter buttons */}
            <div className="flex gap-1.5 self-start sm:self-auto select-none">
              {['All', 'Artificial Intelligence', 'Data Science', 'Software Development'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectFilter(cat)}
                  className={`text-[10px] px-3 py-1 rounded-md border font-semibold cursor-pointer transition-all ${
                    projectFilter === cat
                      ? 'bg-primary text-secondary border-accent'
                      : 'bg-primary-light/10 border-border/80 text-text-muted hover:text-text-base'
                  }`}
                >
                  {cat.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-card rounded-xl p-3 flex items-center gap-3">
              <FolderGit2 className="w-5 h-5 text-accent shrink-0" />
              <div>
                <div className="text-[9px] text-text-muted font-bold uppercase">Total Showcase</div>
                <div className="text-xs font-mono font-bold">{PROJECTS_DATA.length} Projects</div>
              </div>
            </div>
            <div className="glass-card rounded-xl p-3 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
              <div>
                <div className="text-[9px] text-text-muted font-bold uppercase">Completed</div>
                <div className="text-xs font-mono font-bold">4 Verified</div>
              </div>
            </div>
            <div className="glass-card rounded-xl p-3 flex items-center gap-3">
              <Star className="w-5 h-5 text-accent shrink-0" />
              <div>
                <div className="text-[9px] text-text-muted font-bold uppercase">Featured</div>
                <div className="text-xs font-mono font-bold">2 Selected</div>
              </div>
            </div>
            <div className="glass-card rounded-xl p-3 flex items-center gap-3">
              <BookOpenCheck className="w-5 h-5 text-accent shrink-0" />
              <div>
                <div className="text-[9px] text-text-muted font-bold uppercase">Academic R&D</div>
                <div className="text-xs font-mono font-bold">AI / DS Track</div>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj) => (
                <motion.div
                  key={proj.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="text-[9.5px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-primary-light/35 border border-border/80 text-accent">
                        {proj.category}
                      </span>
                      {proj.featured && (
                        <span className="text-[9px] font-bold text-accent flex items-center gap-1 select-none">
                          <Star className="w-3.5 h-3.5 fill-accent stroke-accent" />
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-display text-text-base mb-2">
                      {proj.title}
                    </h3>
                    
                    <p className="text-[11.5px] text-text-muted leading-relaxed mb-6">
                      {proj.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5 select-none">
                      {proj.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[9.5px] bg-[#102C26]/20 border border-border/50 text-[#F7E7CE] dark:text-[#F8FAFC]/80 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between border-t border-border/40 pt-4 mt-2">
                      <span className="text-[10px] text-accent font-bold font-mono">
                        {proj.metric}
                      </span>
                      
                      <div className="flex items-center gap-3">
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-semibold text-text-muted hover:text-accent transition-colors flex items-center gap-1"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          Code
                        </a>
                        <a
                          href={proj.demo}
                          className="text-[11px] font-semibold text-text-muted hover:text-accent transition-colors flex items-center gap-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Demo
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* WORK EXPERIENCE SECTION */}
        <section id="experience" className="scroll-mt-20 flex flex-col gap-6">
          <div className="border-l-4 border-accent pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-text-base">
              Work Experience
            </h2>
            <p className="text-xs text-text-muted mt-1">Professional internship milestones.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-primary-light/20 border border-border/80 text-accent">
                    AI & Data Analyst Intern
                  </span>
                  <span className="text-[10px] font-mono text-text-muted">Feb - Apr 2026</span>
                </div>
                <h3 className="text-base font-bold font-display text-text-base mb-1">
                  Concern Infotech
                </h3>
                <div className="text-[10px] text-accent mb-4 font-semibold">Chennai, Tamil Nadu</div>
                <p className="text-[11.5px] text-text-muted leading-relaxed">
                  Completed a stipend-based AI & Data Analytics Internship, developing dashboards, implementing search features, building chatbots, and integrating APIs to create data-driven and intelligent applications.
                </p>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-primary-light/20 border border-border/80 text-accent">
                    Data Science Intern
                  </span>
                  <span className="text-[10px] font-mono text-text-muted">Nov - Dec 2025</span>
                </div>
                <h3 className="text-base font-bold font-display text-text-base mb-1">
                  Oneyes Infotech Solutions
                </h3>
                <div className="text-[10px] text-accent mb-4 font-semibold">Chennai, Tamil Nadu</div>
                <p className="text-[11.5px] text-text-muted leading-relaxed">
                  Executed data cleaning and pre-processing to ensure data integrity, followed by detailed exploratory analysis to uncover key trends. Supported analytical projects by preparing high quality datasets and delivering actionable insights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATION & COURSEWORK SECTION */}
        <section id="education" className="scroll-mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Education timeline */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="border-l-4 border-accent pl-4">
              <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-text-base">
                Academic Milestones
              </h2>
              <p className="text-xs text-text-muted mt-1">Formal studies timeline details.</p>
            </div>

            <div className="glass-panel rounded-2xl p-6 flex flex-col gap-6 relative">
              <div className="absolute left-[29px] top-6 bottom-6 w-0.5 bg-primary-light/50 pointer-events-none" />
              
              {/* College node */}
              <div className="flex gap-4 items-start relative z-10">
                <div className="w-7 h-7 rounded-full bg-primary border border-accent flex items-center justify-center text-secondary shrink-0 select-none">
                  <GraduationCap className="w-3.5 h-3.5 text-accent" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-text-base">
                      B.Tech / Artificial Intelligence and Data Science
                    </h3>
                    <span className="text-[9px] bg-accent/20 border border-accent/30 text-accent font-semibold px-2 py-0.2 rounded font-mono">
                      Sep 2023 - Present
                    </span>
                  </div>
                  <div className="text-[10px] text-accent mt-0.5 font-semibold">Jeppiaar Institute of Technology, Chennai, Tamil nadu</div>
                  <div className="text-[10px] text-text-muted mt-1 font-mono">CGPA (upto 5th sem): 7.97</div>
                  <p className="text-[11px] text-text-muted mt-2 leading-relaxed font-sans">
                    Concentrated study in data science structures, artificial neural frameworks, algorithms search matrices, and KPI analytic dashboards.
                  </p>
                  
                  <div className="mt-4 bg-primary/10 border border-border/40 p-3 rounded-lg">
                    <h4 className="text-[10.5px] font-bold text-text-base mb-1.5 uppercase">Relevant Syllabus Fields</h4>
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-text-muted font-mono">
                      <div className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-accent shrink-0" /> Data Science</div>
                      <div className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-accent shrink-0" /> Python (Beginner)</div>
                      <div className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-accent shrink-0" /> SQL Databases</div>
                      <div className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-accent shrink-0" /> Power BI & Excel</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* School node */}
              <div className="flex gap-4 items-start relative z-10 pt-4 border-t border-border/30">
                <div className="w-7 h-7 rounded-full bg-primary border border-accent flex items-center justify-center text-secondary shrink-0 select-none">
                  <BookOpenCheck className="w-3.5 h-3.5 text-accent" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-text-base">
                      HSC (Higher Secondary Certificate)
                    </h3>
                    <span className="text-[9px] bg-accent/20 border border-accent/30 text-accent font-semibold px-2 py-0.2 rounded font-mono">
                      Jun 2022 - Apr 2023
                    </span>
                  </div>
                  <div className="text-[10px] text-accent mt-0.5 font-semibold">Government boys higher secondary school</div>
                  <div className="text-[10px] text-text-muted mt-0.5">Guduvanchery, Nandhivaram, Tamil nadu</div>
                  <div className="text-[10px] text-accent mt-1 font-mono">Percentage: 78.16%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Achievements (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="border-l-4 border-accent pl-4">
              <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-text-base">
                Achievements & Honor Roll
              </h2>
              <p className="text-xs text-text-muted mt-1">Competitive awards & leadership highlights</p>
            </div>

            <div className="glass-panel rounded-2xl p-6 flex flex-col gap-5">
              {[
                { title: 'FakeSocial Media Account Detection Platform', org: '', desc: 'Developed a Fake Social Media Account Detection Platform using machine learning and graph analytics. Detected fake and bot accounts through behavioral analysis and network graph visualization across social media platforms.' },
              ].map((ach, idx) => (
                <div key={idx} className="border-b border-border/30 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-start justify-between">
                    <h4 className="text-[11.5px] font-bold text-text-base leading-tight">{ach.title}</h4>
                    <Award className="w-3.5 h-3.5 text-accent shrink-0" />
                  </div>
                  <div className="text-[9px] text-accent mt-0.5 font-medium">{ach.org}</div>
                  <p className="text-[10px] text-text-muted mt-1.5 leading-relaxed">{ach.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICATES SECTION */}
        <section id="certificates" className="scroll-mt-20 flex flex-col gap-6">
          <div className="border-l-4 border-accent pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-text-base">
              Verified Credentials
            </h2>
            <p className="text-xs text-text-muted mt-1">Professional certification gallery & credentials verification.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATES_DATA.map((cert, idx) => (
              <div key={idx} className="glass-card rounded-xl p-5 flex flex-col justify-between min-h-[145px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-full blur-xl pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between mb-2.5 text-text-muted">
                    <BookOpen className="w-4.5 h-4.5" />
                    <span className="text-[9.5px] font-mono font-semibold">{cert.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-text-base leading-tight mb-1.5">
                    {cert.title}
                  </h4>
                  <div className="text-[9px] text-accent font-semibold">{cert.issuer}</div>
                </div>
                
                <a
                  href={cert.link}
                  className="text-[9.5px] font-semibold text-text-muted hover:text-accent flex items-center gap-1 border-t border-border/40 pt-2.5 mt-3 transition-colors"
                >
                  Verify Credential
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* RESUME PREVIEW SECTION */}
        <section id="resume-preview" className="scroll-mt-20 flex flex-col gap-6">
          <div className="border-l-4 border-accent pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-text-base">
              Resume Preview
            </h2>
            <p className="text-xs text-text-muted mt-1">Brief high-level overview of experience credentials.</p>
          </div>

          <div className="glass-panel rounded-2xl p-6 grid grid-cols-1 md:grid-cols-12 gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />
            
            {/* Left summary details (7 Cols) */}
            <div className="md:col-span-8 flex flex-col gap-4 text-xs">
              <h3 className="text-base font-bold font-display text-text-base">
                Ajeeth K - AI & Data Analyst | Data Scientist
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/40 pt-4 mt-1">
                <div>
                  <h4 className="font-bold text-accent uppercase text-[9px] tracking-wider mb-2">Education Core</h4>
                  <p className="text-text-muted leading-relaxed font-mono text-[10.5px]">
                    B.Tech / Artificial Intelligence and Data Science<br />
                    Jeppiaar Institute of Technology. CGPA: 7.97
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-accent uppercase text-[9px] tracking-wider mb-2">Key Certification Track</h4>
                  <p className="text-text-muted leading-relaxed text-[10.5px]">
                    CyberSecurity (Kriyavan Cyber Forensic Service) & Time Management (Infosys).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-accent uppercase text-[9px] tracking-wider mb-2">Technical Competency</h4>
                  <p className="text-text-muted leading-relaxed text-[10.5px]">
                    Beginner Python, Data Science, SQL, Excel, Power BI, Data Analytics, HTML & CSS.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-accent uppercase text-[9px] tracking-wider mb-2">Applied Projects</h4>
                  <p className="text-text-muted leading-relaxed text-[10.5px]">
                    FakeSocial Media Account Detection Platform, Social media sentiment analysis, Sales Dashboard, Personal portfolio website.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Quick Download Box (4 Cols) */}
            <div className="md:col-span-4 bg-primary/10 border border-border/60 p-6 rounded-xl flex flex-col justify-center items-center text-center gap-4">
              <Terminal className="w-8 h-8 text-accent animate-pulse" />
              <div>
                <h4 className="text-[11.5px] font-bold text-text-base">Full Resume PDF</h4>
                <p className="text-[10px] text-text-muted mt-1 leading-relaxed">
                  Download or view the official PDF containing complete course specifications and experiences.
                </p>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <a
                  href="/AJEETH_K_RESUME.pdf"
                  download="AJEETH_K_RESUME.pdf"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent-hover text-secondary font-bold text-xs py-2.5 rounded-lg transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PDF
                </a>
                <a
                  href="/AJEETH_K_RESUME.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-primary-light/20 hover:bg-primary-light/40 border border-border/60 text-text-base font-semibold text-xs py-2.5 rounded-lg transition-all cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-accent" />
                  View PDF
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION (Frontend-only) */}
        <section id="contact" className="scroll-mt-20 flex flex-col gap-6">
          <div className="border-l-4 border-accent pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-text-base">
              Get in Touch
            </h2>
            <p className="text-xs text-text-muted mt-1">Direct professional contact routes.</p>
          </div>

          <div className="glass-panel rounded-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-6 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/15 border border-border/80 flex items-center justify-center text-accent shrink-0">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="text-[9px] text-text-muted font-bold uppercase">Direct Email</div>
                <a href="mailto:ajeethkarthikeyan08@gmail.com" className="text-xs font-semibold text-text-base hover:text-accent transition-colors font-mono block truncate max-w-[170px]">
                  ajeethkarthikeyan08@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/15 border border-border/80 flex items-center justify-center text-accent shrink-0">
                <LinkedinIcon className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="text-[9px] text-text-muted font-bold uppercase">LinkedIn Connect</div>
                <a 
                  href="https://www.linkedin.com/in/ajeeth-k-3406a7297?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs font-semibold text-text-base hover:text-accent transition-colors font-mono block truncate max-w-[170px]"
                >
                  linkedin.com/in/ajeeth-k
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/15 border border-border/80 flex items-center justify-center text-accent shrink-0">
                <MapPin className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="text-[9px] text-text-muted font-bold uppercase">Location</div>
                <span className="text-xs font-semibold text-text-base font-mono block">
                  Chengalpattu, Tamil Nadu
                </span>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
