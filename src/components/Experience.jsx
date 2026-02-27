import { experiences } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-12 md:py-20 px-4 md:px-8 max-w-[1400px] mx-auto">
      <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-12 relative">
        <span className="gradient-text-primary">Experience</span>
        <div className="section-title-underline gradient-bg-accent" />
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="group relative bg-white/8 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden min-h-[380px] md:min-h-[420px] flex flex-col transition-all duration-200 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.5)] hover:border-cyan-400"
          >
            {/* Top accent bar */}
            <div className="experience-top-bar" />

            {/* Header */}
            <div className="relative p-4 md:p-5 pb-3 text-center flex flex-col items-center justify-center">
              <div className="gradient-frame w-full max-w-[300px] md:max-w-[350px] h-[160px] md:h-[200px] mb-4 transition-transform duration-200 group-hover:scale-105 group-hover:rotate-1">
                <img src={exp.img} alt={exp.alt} className="w-full h-full object-cover" />
              </div>
              <span className="inline-block gradient-bg-primary text-[#0a0a0a] px-3 py-1 rounded-full font-semibold text-xs uppercase tracking-wider mb-3 shadow-[0_3px_10px_rgba(0,245,255,0.2)]">
                {exp.period}
              </span>
              <h3 className="text-lg md:text-xl font-bold gradient-text-accent leading-tight text-center mb-1">
                {exp.role}
              </h3>
              <div className="text-[#ff6b35] font-semibold text-sm md:text-base text-center mb-3">
                {exp.company}
              </div>
            </div>

            {/* Body */}
            <div className="px-4 md:px-5 pb-4 md:pb-5 mt-auto flex-1 flex flex-col justify-between">
              <p className="text-gray-400 leading-relaxed text-sm text-left break-words hyphens-auto">
                {exp.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
