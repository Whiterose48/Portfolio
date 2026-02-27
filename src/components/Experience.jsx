import { motion } from 'framer-motion';
import { experiences } from '../data/portfolioData';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 overflow-hidden">
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
            <span className="w-8 h-[1px] bg-[#a855f7]" />
            <span className="text-[#a855f7] text-xs font-mono uppercase tracking-[0.3em]">./ experience_log</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Milestones &<br />
            <span className="text-gradient-purple">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#a855f7]/30 via-[#4facfe]/30 to-transparent" />

          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className={`flex flex-col md:flex-row items-center gap-6 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content side */}
                  <div className={`w-full md:w-[45%] ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="glass glass-hover rounded-2xl p-6 group">
                      {/* Period badge */}
                      <div className={`flex ${isLeft ? 'md:justify-end' : 'md:justify-start'} mb-3`}>
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/20">
                          <i className="fas fa-calendar-alt text-[8px]" />
                          {exp.period}
                        </span>
                      </div>

                      <h3 className="text-white text-lg font-semibold mb-1">{exp.role}</h3>
                      <div className="text-[#4facfe] text-sm font-mono mb-3">{exp.company}</div>
                      <p className="text-white/40 text-sm leading-relaxed mb-4">{exp.desc}</p>

                      {/* Skills */}
                      <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                        {exp.skills.map((s, j) => (
                          <span key={j} className="tag text-[10px]">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex items-center justify-center w-[10%]">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#a855f7] to-[#4facfe] ring-4 ring-[#030014] z-10" />
                  </div>

                  {/* Image side */}
                  <div className={`w-full md:w-[45%] ${isLeft ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="glass rounded-xl overflow-hidden max-w-[280px] mx-auto md:mx-0 group">
                      <img
                        src={exp.img}
                        alt={exp.role}
                        className="w-full h-40 object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
