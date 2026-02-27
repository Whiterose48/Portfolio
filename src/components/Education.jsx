import { education } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="py-12 md:py-20 px-4 md:px-8 max-w-[1200px] mx-auto">
      <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-12 relative">
        <span className="gradient-text-primary">Education Journey</span>
        <div className="section-title-underline gradient-bg-primary" />
      </h2>

      <div className="relative max-w-[800px] mx-auto">
        {/* Timeline Line */}
        <div className="timeline-line hidden md:block" />

        {education.map((edu, i) => (
          <div
            key={i}
            className={`relative mb-8 md:w-1/2 ${
              i % 2 === 0 ? 'md:pr-8 md:left-0' : 'md:pl-8 md:left-1/2'
            } w-full pl-10 md:pl-0`}
          >
            {/* Timeline dot */}
            <div
              className={`timeline-dot hidden md:block ${
                i % 2 === 0 ? '-right-[10px]' : '-left-[10px]'
              }`}
            />

            {/* Mobile dot */}
            <div className="md:hidden absolute left-0 top-8 w-4 h-4 gradient-bg-primary rounded-full border-4 border-[#0a0a0a]" />

            {/* Content Card */}
            <div className="bg-white/8 backdrop-blur-xl rounded-3xl p-5 md:p-6 border border-white/10 relative">
              <div className="gradient-frame mb-4">
                <img src={edu.img} alt={edu.alt} className="w-full h-[150px] md:h-[180px] object-cover" />
              </div>
              <div className="text-[#667eea] font-semibold text-base">{edu.year}</div>
              <h3 className="text-lg md:text-xl font-bold my-2 text-white">{edu.title}</h3>
              <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                {edu.desc}
                <br />GPA: {edu.gpa}
              </p>
            </div>
          </div>
        ))}

        {/* Mobile timeline line */}
        <div className="md:hidden absolute left-[7px] top-0 bottom-0 w-[2px] gradient-bg-primary" />
      </div>
    </section>
  );
}
