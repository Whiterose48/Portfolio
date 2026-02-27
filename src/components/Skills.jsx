import { useEffect, useRef, useState } from 'react';
import { techSkills, softSkills } from '../data/portfolioData';

const variants = ['variant-1', 'variant-2', 'variant-3', 'variant-4', 'variant-5', 'variant-6', 'variant-7', 'variant-8'];

function SkillItem({ skill, index, visible }) {
  return (
    <div
      className={`${variants[index % variants.length]} bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 flex items-center gap-4 cursor-pointer transition-all duration-300 relative overflow-hidden hover:-translate-y-1 hover:scale-[1.02] hover:border-[#ff6b35] hover:shadow-[0_10px_30px_rgba(255,107,53,0.2)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <i className={`${skill.icon} skill-icon-gradient text-2xl flex-shrink-0 w-[50px] text-center transition-transform hover:scale-110`} />
      <div className="flex-1">
        <div className="text-base font-semibold text-white mb-0.5">{skill.name}</div>
        <div className="text-sm text-gray-400 leading-relaxed">{skill.desc}</div>
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-12 md:py-20 px-4 md:px-8 max-w-[1200px] mx-auto" ref={sectionRef}>
      <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-12 relative">
        <span className="gradient-text-primary">Skills & Expertise</span>
        <div className="section-title-underline gradient-bg-primary" />
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Technical Skills */}
        <div className="card-shimmer relative overflow-hidden bg-white/8 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10">
          <div className="experience-top-bar" />
          <h3 className="text-xl md:text-2xl font-bold mb-6 text-center gradient-text-accent">
            Technical Skills
          </h3>
          <div className="flex flex-col gap-3">
            {techSkills.map((skill, i) => (
              <SkillItem key={skill.name} skill={skill} index={i} visible={visible} />
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="card-shimmer relative overflow-hidden bg-white/8 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10">
          <div className="absolute top-0 left-0 right-0 h-[3px] gradient-bg-secondary" />
          <h3 className="text-xl md:text-2xl font-bold mb-6 text-center gradient-text-secondary">
            Soft Skills
          </h3>
          <div className="flex flex-col gap-3">
            {softSkills.map((skill, i) => (
              <SkillItem key={skill.name} skill={skill} index={i} visible={visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
