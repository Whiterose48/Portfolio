import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolioData';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
};

const tagColors = {
  'Computer Vision': '#4facfe',
  'Predictive Analytics': '#a855f7',
  'Full-Stack': '#00f2fe',
  'Cloud AI': '#f59e0b',
  'Data Engineering': '#10b981',
  'Machine Learning': '#ec4899',
};

export default function Projects() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="grid-bg absolute inset-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section label */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#4facfe]" />
            <span className="text-[#4facfe] text-xs font-mono uppercase tracking-[0.3em]">./ lab_experiments</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Research &<br />
            <span className="text-gradient-blue">Projects</span>
          </h2>
          <p className="text-white/30 text-sm mt-3 max-w-lg">
            Each project follows systematic methodology — defining problems, engineering solutions, and measuring impact.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((proj, i) => {
            const color = tagColors[proj.tag] || '#4facfe';
            const isOpen = expanded === proj.id;

            return (
              <motion.div
                key={proj.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                custom={i}
                variants={fadeUp}
                className="glass glass-hover rounded-2xl overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={proj.img}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/50 to-transparent" />

                  {/* Tag */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-medium"
                      style={{
                        background: `${color}15`,
                        color: color,
                        border: `1px solid ${color}30`,
                      }}
                    >
                      {proj.tag}
                    </span>
                  </div>

                  {/* Link */}
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 w-8 h-8 rounded-lg glass flex items-center justify-center text-white/40 hover:text-[#4facfe] transition-colors"
                    >
                      <i className="fas fa-external-link-alt text-xs" />
                    </a>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-white text-lg font-semibold mb-2">{proj.title}</h3>

                  <div className="text-white/30 text-xs font-mono mb-3 flex items-center gap-2">
                    <i className="fas fa-exclamation-triangle" style={{ color }} />
                    <span>Problem:</span>
                  </div>
                  <p className="text-white/50 text-sm mb-4 leading-relaxed">{proj.problem}</p>

                  {/* Expand toggle */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : proj.id)}
                    className="text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors mb-2"
                    style={{ color: `${color}99` }}
                  >
                    <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-[10px]`} />
                    {isOpen ? 'Collapse' : 'View Details'}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 space-y-4 border-t border-white/5">
                          {/* Approach */}
                          <div>
                            <div className="text-white/40 text-[10px] font-mono uppercase tracking-wider mb-2">
                              Approach
                            </div>
                            <div className="space-y-1">
                              {proj.approach.map((a, j) => (
                                <div key={j} className="flex items-start gap-2 text-sm text-white/50">
                                  <i className="fas fa-angle-right mt-1 text-[10px]" style={{ color }} />
                                  {a}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Engineering */}
                          <div>
                            <div className="text-white/40 text-[10px] font-mono uppercase tracking-wider mb-2">
                              Engineering
                            </div>
                            <div className="space-y-1">
                              {proj.engineering.map((e, j) => (
                                <div key={j} className="flex items-start gap-2 text-sm text-white/50">
                                  <i className="fas fa-wrench mt-1 text-[10px]" style={{ color }} />
                                  {e}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Impact */}
                          <div>
                            <div className="text-white/40 text-[10px] font-mono uppercase tracking-wider mb-2">
                              Impact
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {proj.impact.map((imp, j) => (
                                <span
                                  key={j}
                                  className="tag text-[10px]"
                                  style={{ borderColor: `${color}30`, color: `${color}cc` }}
                                >
                                  {imp}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
