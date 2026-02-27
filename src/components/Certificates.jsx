import { certificates } from '../data/portfolioData';

export default function Certificates() {
  return (
    <section id="certificates" className="py-12 md:py-20 px-4 md:px-8 max-w-[1200px] mx-auto">
      <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-12 relative">
        <span className="gradient-text-primary">Certificates & Achievements</span>
        <div className="section-title-underline gradient-bg-accent" />
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {certificates.map((cert, i) => (
          <div key={i} className="text-center">
            <div className="gradient-frame h-[180px] md:h-[200px]">
              <img src={cert.img} alt={cert.alt} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-semibold mt-4 gradient-text-accent">{cert.title}</h3>
            <p className="text-gray-400 mt-2 text-sm">
              <i className="fa-solid fa-location-dot mr-1" />
              {cert.issuer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
