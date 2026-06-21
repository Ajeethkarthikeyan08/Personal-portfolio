'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Folder, Award, Phone, User, GraduationCap, FileText, Sun, Moon, Sparkles, Terminal, Briefcase, ExternalLink } from 'lucide-react';

interface CommandItem {
  icon: React.ReactNode;
  label: string;
  category: string;
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette({
  isOpen,
  setIsOpen,
  isLightMode,
  toggleTheme,
  scrollToSection
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isLightMode: boolean;
  toggleTheme: () => void;
  scrollToSection: (id: string) => void;
}) {
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const commands: CommandItem[] = [
    {
      icon: <User className="w-4.5 h-4.5" />,
      label: 'Navigate to About Me',
      category: 'Navigation',
      shortcut: 'G + A',
      action: () => scrollToSection('about')
    },
    {
      icon: <Briefcase className="w-4.5 h-4.5" />,
      label: 'Navigate to Experience',
      category: 'Navigation',
      shortcut: 'G + W',
      action: () => scrollToSection('experience')
    },
    {
      icon: <Sparkles className="w-4.5 h-4.5" />,
      label: 'Navigate to Skills',
      category: 'Navigation',
      shortcut: 'G + S',
      action: () => scrollToSection('skills')
    },
    {
      icon: <Folder className="w-4.5 h-4.5" />,
      label: 'Navigate to Projects',
      category: 'Navigation',
      shortcut: 'G + P',
      action: () => scrollToSection('projects')
    },
    {
      icon: <Award className="w-4.5 h-4.5" />,
      label: 'Navigate to Certificates',
      category: 'Navigation',
      shortcut: 'G + C',
      action: () => scrollToSection('certificates')
    },
    {
      icon: <GraduationCap className="w-4.5 h-4.5" />,
      label: 'Navigate to Education',
      category: 'Navigation',
      shortcut: 'G + E',
      action: () => scrollToSection('education')
    },
    {
      icon: <Phone className="w-4.5 h-4.5" />,
      label: 'Navigate to Contact',
      category: 'Navigation',
      shortcut: 'G + K',
      action: () => scrollToSection('contact')
    },
    {
      icon: isLightMode ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />,
      label: `Switch to ${isLightMode ? 'Dark' : 'Light'} Mode`,
      category: 'Theme',
      shortcut: 'T + M',
      action: () => toggleTheme()
    },
    {
      icon: <FileText className="w-4.5 h-4.5" />,
      label: 'Download Resume PDF',
      category: 'Resume',
      shortcut: 'D + R',
      action: () => {
        const link = document.createElement('a');
        link.href = '/AJEETH_K_RESUME.pdf';
        link.download = 'AJEETH_K_RESUME.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    {
      icon: <ExternalLink className="w-4.5 h-4.5" />,
      label: 'View Resume PDF',
      category: 'Resume',
      shortcut: 'V + R',
      action: () => {
        window.open('/AJEETH_K_RESUME.pdf', '_blank');
      }
    },
    {
      icon: <Terminal className="w-4.5 h-4.5" />,
      label: 'Open Dev Sandbox Console',
      category: 'Developer Tools',
      shortcut: 'C + S',
      action: () => scrollToSection('dev-dashboard')
    }
  ];

  // Shortcut hooks
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Command Palette
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      
      // Close on Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setSearch('');
      setActiveIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen]);

  // Filter commands
  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  // Keyboard navigation within the dropdown list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[activeIndex]) {
        filteredCommands[activeIndex].action();
        setIsOpen(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-slate-950/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={containerRef}
            className="w-full max-w-xl glass-panel rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[420px]"
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/80">
              <Search className="w-5 h-5 text-text-muted" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search sections..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-sm text-text-base border-none focus:outline-none placeholder:text-text-muted"
              />
              <span className="text-[10px] bg-primary-light px-2 py-0.5 rounded border border-border/50 text-accent font-semibold select-none">
                ESC
              </span>
            </div>

            {/* Commands List */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-none">
              {filteredCommands.length > 0 ? (
                Object.entries(
                  filteredCommands.reduce((groups, item) => {
                    if (!groups[item.category]) groups[item.category] = [];
                    groups[item.category].push(item);
                    return groups;
                  }, {} as Record<string, typeof commands>)
                ).map(([category, items]) => (
                  <div key={category} className="mb-2">
                    {/* Category Label */}
                    <div className="text-[10px] text-accent tracking-wider font-bold uppercase px-3 py-1.5 select-none">
                      {category}
                    </div>
                    {/* Items */}
                    <div className="flex flex-col gap-0.5">
                      {items.map((cmd) => {
                        // Find global index of item
                        const globalIndex = filteredCommands.findIndex((c) => c.label === cmd.label);
                        const isSelected = globalIndex === activeIndex;

                        return (
                          <button
                            key={cmd.label}
                            onClick={() => {
                              cmd.action();
                              setIsOpen(false);
                            }}
                            onMouseEnter={() => setActiveIndex(globalIndex)}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-xs transition-all ${
                              isSelected
                                ? 'bg-primary text-secondary font-medium'
                                : 'text-text-base/80 hover:bg-primary-light/35'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={isSelected ? 'text-accent' : 'text-text-muted'}>
                                {cmd.icon}
                              </span>
                              <span>{cmd.label}</span>
                            </div>
                            {cmd.shortcut && (
                              <span
                                className={`text-[9px] px-1.5 py-0.5 rounded font-mono border ${
                                  isSelected
                                    ? 'bg-[#102C26] border-[#F7E7CE]/40 text-[#F7E7CE]'
                                    : 'bg-slate-900 border-border/50 text-text-muted'
                                }`}
                              >
                                {cmd.shortcut}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-text-muted select-none">
                  No commands match "{search}"
                </div>
              )}
            </div>

            {/* Status Footer */}
            <div className="px-4 py-2 bg-primary/20 border-t border-border/50 text-[10px] text-text-muted flex justify-between select-none">
              <span>Use arrows to navigate, Enter to run</span>
              <span>Press <kbd className="font-mono">Ctrl + K</kbd> anytime</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
