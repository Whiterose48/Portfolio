import { useState, useEffect } from 'react';
import { navLinks, personalInfo } from '../data/portfolioData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 100);

      if (window.innerWidth <= 768) {
        setHidden(currentY > lastScrollY && currentY > 100);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      className={`fixed top-0 w-full px-4 md:px-8 py-4 backdrop-blur-xl z-50 transition-all duration-300 border-b border-white/10 ${
        scrolled ? 'bg-white/8' : 'bg-white/5'
      } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="flex justify-between items-center max-w-[1200px] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="gradient-frame circle w-[50px] h-[50px]">
            <img src={personalInfo.profileImg} alt="Profile" />
          </div>
          <span className="font-bold text-lg gradient-text-primary">Phachara</span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex list-none gap-3 lg:gap-5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="nav-link-underline text-gray-400 hover:text-white font-medium text-sm transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div
          className="flex md:hidden flex-col cursor-pointer gap-[5px]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`w-6 h-[3px] bg-white rounded transition-all origin-center ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-[3px] bg-white rounded transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-[3px] bg-white rounded transition-all origin-center ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/5 backdrop-blur-xl border-t border-white/10 md:hidden animate-[slideIn_0.3s_ease]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="block px-6 py-3 text-white hover:text-[#667eea] hover:pl-8 transition-all border-b border-white/10 last:border-b-0"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
