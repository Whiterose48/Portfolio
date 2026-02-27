import { useRef } from 'react';
import { projects } from '../data/portfolioData';

function ProjectCard({ project }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midW = rect.width / 2;
    const midH = rect.height / 2;
    const rotateX = ((y - midH) / midH) * 10;
    const rotateY = -((x - midW) / midW) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    card.style.zIndex = '3';
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    card.style.zIndex = '1';
  };

  const ImageWrapper = project.link ? 'a' : 'div';
  const imageProps = project.link
    ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <div
      ref={cardRef}
      className="bg-white/8 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 transition-transform duration-200"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ImageWrapper {...imageProps} className="gradient-frame block h-[200px]">
        <img src={project.img} alt={project.alt} className="w-full h-full object-cover" />
      </ImageWrapper>
      <div className="p-5 md:p-6">
        <h3 className="text-lg md:text-xl font-bold mb-3 gradient-text-accent">{project.title}</h3>
        <p className="text-gray-400 leading-relaxed text-sm">{project.desc}</p>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-12 md:py-20 px-4 md:px-8 max-w-[1200px] mx-auto">
      <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-12 relative">
        <span className="gradient-text-primary">Featured Projects</span>
        <div className="section-title-underline gradient-bg-primary" />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>
    </section>
  );
}
