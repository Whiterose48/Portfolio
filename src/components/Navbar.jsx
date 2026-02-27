import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/portfolioData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#030014]/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4facfe] to-[#764ba2] flex items-center justify-center text-white font-bold text-sm transition-transform group-hover:scale-110">
            P
          </div>
          <span className="text-white/80 font-medium text-sm tracking-wide hidden sm:block">
            PHACHARA<span className="text-white/30 ml-1">/ AI Lab</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link text-xs font-medium uppercase tracking-widest ${
                location.pathname === link.path ? 'text-[#4facfe]! after:w-full!' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="px-4 py-1.5 rounded-full border border-[#4facfe]/30 text-[#4facfe] text-xs font-semibold uppercase tracking-wider hover:bg-[#4facfe]/10 transition-all"
          >
            Let's Talk
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`w-5 h-[1.5px] bg-white/70 transition-all ${mobileOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
          <span className={`w-5 h-[1.5px] bg-white/70 transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-[1.5px] bg-white/70 transition-all ${mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[#030014]/95 backdrop-blur-2xl border-t border-white/5 px-6 py-6"
          >
            {navLinks.map((link, i) => (
              <motion.div key={link.path} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Link
                  to={link.path}
                  className={`block py-3 text-sm font-medium tracking-wide border-b border-white/5 last:border-0 transition-colors ${
                    location.pathname === link.path ? 'text-[#4facfe]' : 'text-white/60 hover:text-[#4facfe]'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
