import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ArchitecturePage from './pages/ArchitecturePage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage from './pages/ContactPage';

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#030014] flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-8">
        <div className="text-3xl font-bold text-gradient-blue font-mono tracking-wider">PHACHARA</div>
        <div className="text-white/20 text-xs font-mono text-center mt-1 tracking-[0.4em]">AI RESEARCH LAB</div>
      </div>
      <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#4facfe] to-[#00f2fe]"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ ease: 'easeOut' }}
        />
      </div>
      <div className="mt-3 text-white/20 text-[10px] font-mono tracking-wider">
        INITIALIZING NEURAL SYSTEMS... {Math.min(Math.round(progress), 100)}%
      </div>
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <div className="bg-[#030014] min-h-screen text-white overflow-x-hidden">
        <AnimatePresence>
          {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar />
            <AnimatedRoutes />
          </motion.div>
        )}
      </div>
    </BrowserRouter>
  );
}
