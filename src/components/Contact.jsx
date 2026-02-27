import { motion } from 'framer-motion';
import { contacts, certificates, siteConfig } from '../data/portfolioData';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="grid-bg absolute inset-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section label */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#00f2fe]" />
            <span className="text-[#00f2fe] text-xs font-mono uppercase tracking-[0.3em]">./ initiate_contact</span>
            <span className="w-8 h-[1px] bg-[#00f2fe]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
            Let's Build<br />
            <span className="text-gradient-blue">Something Intelligent</span>
          </h2>
          <p className="text-white/30 text-sm max-w-lg mx-auto">
            Open to AI Engineering, Data Science, and ML roles.
            Currently exploring opportunities where I can contribute to impactful AI systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={1}
            variants={fadeUp}
          >
            <div className="glass rounded-2xl p-8 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4facfe] to-[#a855f7] flex items-center justify-center text-white text-xl font-bold">
                  P
                </div>
                <div>
                  <div className="text-white font-semibold">{siteConfig.name}</div>
                  <div className="text-[#4facfe] text-sm font-mono">{siteConfig.title}</div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-white/40 text-sm">
                  <i className="fas fa-envelope text-[#4facfe]" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-[#4facfe] transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-white/40 text-sm">
                  <i className="fas fa-map-marker-alt text-[#a855f7]" />
                  <span>{siteConfig.location}</span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-6">
                <div className="text-white/20 text-[10px] font-mono uppercase tracking-wider mb-4">Connect</div>
                <div className="flex gap-3">
                  {contacts.map((c, i) => (
                    <a
                      key={i}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/30 hover:text-[#4facfe] hover:glow-border-blue transition-all"
                      aria-label={c.label}
                    >
                      <i className={`${c.icon} text-lg`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Message card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={2}
            variants={fadeUp}
          >
            <div className="glass rounded-2xl p-8 h-full flex flex-col justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4facfe]/10 to-[#a855f7]/10 border border-white/5 flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-paper-plane text-2xl text-[#4facfe]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-3">Get In Touch</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">
                  Feel free to reach out for collaborations, opportunities, or just to say hello.
                  I'm always eager to discuss AI, data, and technology!
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4facfe] to-[#00f2fe] text-[#030014] font-semibold text-sm hover:shadow-[0_0_30px_rgba(79,172,254,0.3)] transition-all hover:scale-105"
                >
                  <i className="fas fa-envelope" />
                  Send Email
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Certificates */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
        >
          <div className="text-center mb-8">
            <div className="text-white/20 text-[10px] font-mono uppercase tracking-wider">Certifications & Achievements</div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {certificates.map((cert, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="glass glass-hover rounded-xl overflow-hidden group"
              >
                <div className="h-36 overflow-hidden">
                  <img
                    src={cert.img}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 text-center">
                  <div className="text-white text-sm font-medium">{cert.title}</div>
                  <div className="text-white/30 text-xs font-mono mt-1">{cert.issuer}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-white/5 text-center">
          <p className="text-white/20 text-xs font-mono">
            © {new Date().getFullYear()} {siteConfig.name} — AI Research Lab. Built with React, Three.js & Framer Motion.
          </p>
        </div>
      </div>
    </section>
  );
}
