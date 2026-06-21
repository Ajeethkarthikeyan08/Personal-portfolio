'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOG_MESSAGES = [
  'Initializing portfolio kernel...',
  'Loading PyTorch & TensorFlow core frameworks...',
  'Importing dataset: NumPy, Pandas, Scikit-Learn...',
  'Configuring artificial intelligence nodes...',
  'Compiling transformer weights (12 attention heads)...',
  'Initializing data pipelines & visual telemetry...',
  'Resolving software development environments...',
  'Establishing secure connection to developer dashboard...',
  'Optimizing glassmorphism UI layouts...',
  'System operational. Launching Ajeeth\'s Portfolio v1.0...'
];

export default function LoadingScreen({ onFinished }: { onFinished: () => void }) {
  const [currentLogIdx, setCurrentLogIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [showExitScreen, setShowExitScreen] = useState(false);

  useEffect(() => {
    // Add logs sequentially
    if (currentLogIdx < LOG_MESSAGES.length) {
      const intervalTime = currentLogIdx === 0 ? 100 : Math.random() * 250 + 100;
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, LOG_MESSAGES[currentLogIdx]]);
        setCurrentLogIdx((prev) => prev + 1);
        setProgress((prev) => Math.min(100, Math.floor(((currentLogIdx + 1) / LOG_MESSAGES.length) * 100)));
      }, intervalTime);
      return () => clearTimeout(timer);
    } else {
      // Finished all logs
      const exitTimer = setTimeout(() => {
        setShowExitScreen(true);
      }, 500);
      return () => clearTimeout(exitTimer);
    }
  }, [currentLogIdx]);

  useEffect(() => {
    if (showExitScreen) {
      const finalTimer = setTimeout(() => {
        onFinished();
      }, 800);
      return () => clearTimeout(finalTimer);
    }
  }, [showExitScreen, onFinished]);

  return (
    <AnimatePresence>
      {!showExitScreen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F172A] font-mono text-xs text-text-base p-4"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Neon BG Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#102C26] opacity-35 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#D4A017] opacity-10 blur-[150px] pointer-events-none" />

          <div className="w-full max-w-2xl glass-panel rounded-xl overflow-hidden shadow-2xl flex flex-col h-[400px]">
            {/* Window bar */}
            <div className="flex items-center justify-between bg-primary/45 px-4 py-2 border-b border-border/80">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[10px] text-text-muted select-none">ajeeth@ai-terminal:~</span>
              <div className="w-12" />
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2 font-mono scrollbar-none">
              <div className="text-accent flex justify-between items-center select-none font-bold text-sm tracking-wider">
                <span>[AJEETH.AI KERNEL INIT]</span>
                <span>v1.0.0</span>
              </div>
              <div className="text-text-muted mb-2">-----------------------------------------------------</div>

              <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto">
                {logs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className={index === logs.length - 1 ? 'text-accent font-semibold' : 'text-text-base/80'}
                  >
                    <span className="text-primary-light font-bold select-none">&gt;&gt;</span> {log}
                  </motion.div>
                ))}
              </div>

              {/* Progress Section */}
              <div className="mt-4 border-t border-border/50 pt-3">
                <div className="flex justify-between text-[11px] text-text-muted mb-1.5">
                  <span>DEPLOYMENT PROGRESS</span>
                  <span className="text-accent font-semibold">{progress}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-border/50">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
