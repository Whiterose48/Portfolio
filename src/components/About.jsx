import { motion } from 'framer-motion';
import { coreExpertise } from '../data/portfolioData';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background grid */}
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
            <span className="text-[#4facfe] text-xs font-mono uppercase tracking-[0.3em]">./ research_profile</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            AI Engineer &<br />
            <span className="text-gradient-purple">Data Scientist</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Description */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={1}
            variants={fadeUp}
            className="space-y-5"
          >
            <p className="text-white/50 leading-relaxed text-sm md:text-base">
              I'm Phachara Pornanothai — an AI Engineer and Data Scientist with a strong foundation in
              building real-world machine learning systems that go beyond notebooks and into production environments.
            </p>
            <p className="text-white/50 leading-relaxed text-sm md:text-base">
              My work spans the full ML lifecycle: from exploratory data analysis and feature engineering
              to model development, optimization, and deployment. I care deeply about transforming messy data
              into reliable, high-impact AI systems that create measurable value.
            </p>
            <p className="text-white/50 leading-relaxed text-sm md:text-base">
              Whether it's building NLP pipelines for document understanding, designing predictive models
              for operational efficiency, or crafting data engineering architectures — every project in my
              lab is engineered with scalability and precision in mind.
            </p>
          </motion.div>

          {/* Philosophy card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={2}
            variants={fadeUp}
            className="flex items-center"
          >
            <div className="glass rounded-2xl p-8 border-l-2 border-[#a855f7]">
              <p className="text-white/70 italic text-lg md:text-xl leading-relaxed mb-4">
                "The best AI isn't magic — it's engineering.
                <br />
                Clean data, robust pipelines, rigorous evaluation."
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a855f7] to-[#4facfe] flex items-center justify-center text-white text-sm font-bold">
                  P
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Phachara Pornanothai</div>
                  <div className="text-white/30 text-xs font-mono">Engineering Philosophy</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Expertise */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreExpertise.map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
              variants={fadeUp}
              className="glass glass-hover rounded-2xl p-6 group"
            >
              <div
                className="text-3xl mb-4 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${item.color}20, transparent)` }}
              >
                <i className={`${item.icon}`} style={{ color: item.color }} />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-4">{item.desc}</p>
              <div className="flex flex-wrap gap-2">
                {item.tools.map((tool, j) => (
                  <span
                    key={j}
                    className="tag text-[10px]"
                    style={{ borderColor: `${item.color}30`, color: `${item.color}cc` }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
