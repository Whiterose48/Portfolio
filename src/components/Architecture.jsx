import { motion } from 'framer-motion';
import { mlPipeline, dataArchitecture, mlOps } from '../data/portfolioData';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function Architecture() {
  return (
    <section id="architecture" className="relative py-32 overflow-hidden">
      <div className="grid-bg absolute inset-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section label */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#00f2fe]" />
            <span className="text-[#00f2fe] text-xs font-mono uppercase tracking-[0.3em]">./ system_architecture</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            How I Engineer<br />
            <span className="text-gradient-blue">AI Systems</span>
          </h2>
        </motion.div>

        {/* ML Pipeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          className="mb-20"
        >
          <h3 className="text-white text-lg font-semibold mb-2 flex items-center gap-2">
            <i className="fas fa-diagram-project text-[#4facfe]" />
            ML Pipeline Architecture
          </h3>
          <p className="text-white/30 text-sm mb-8">End-to-end machine learning workflow from data to production</p>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-0">
            {mlPipeline.map((step, i) => (
              <div key={i} className="flex items-center">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                  className="glass rounded-xl px-4 py-3 text-center min-w-[120px] group hover:glow-border-blue transition-all"
                >
                  <div className="text-[#4facfe] text-[10px] font-mono uppercase tracking-wider opacity-50 mb-1">
                    Step {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="text-white text-xs font-medium">{step}</div>
                </motion.div>
                {i < mlPipeline.length - 1 && (
                  <div className="hidden md:block text-[#4facfe]/30 mx-1">
                    <i className="fas fa-chevron-right text-xs" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Data Engineering Architecture */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          className="mb-20"
        >
          <h3 className="text-white text-lg font-semibold mb-2 flex items-center gap-2">
            <i className="fas fa-layer-group text-[#a855f7]" />
            Data Engineering Architecture
          </h3>
          <p className="text-white/30 text-sm mb-8">Scalable data flow from ingestion to model serving</p>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {dataArchitecture.map((step, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="relative"
              >
                <div className="glass rounded-xl p-5 text-center group hover:glow-border-purple transition-all h-full">
                  <div
                    className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.15), transparent)' }}
                  >
                    <span className="text-[#a855f7] font-mono text-sm font-bold">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="text-white text-sm font-medium">{step}</div>
                </div>
                {i < dataArchitecture.length - 1 && (
                  <div className="hidden sm:block absolute top-1/2 -right-2 text-[#a855f7]/30 -translate-y-1/2 z-10">
                    <i className="fas fa-chevron-right text-xs" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* MLOps */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
        >
          <h3 className="text-white text-lg font-semibold mb-2 flex items-center gap-2">
            <i className="fas fa-infinity text-[#f59e0b]" />
            MLOps Practices
          </h3>
          <p className="text-white/30 text-sm mb-8">Continuous integration and delivery for ML systems</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mlOps.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="glass glass-hover rounded-xl p-6 text-center"
              >
                <i className={`${item.icon} text-2xl text-[#f59e0b] mb-3`} />
                <div className="text-white text-sm font-medium">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
