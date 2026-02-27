import { competitions } from '../data/portfolioData';

export default function Competitions() {
  return (
    <section id="competitions" className="py-12 md:py-20 px-4 md:px-8 max-w-[1200px] mx-auto">
      <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-12 relative">
        <span className="gradient-text-primary">Competitions & Awards</span>
        <div className="section-title-underline gradient-bg-secondary" />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 justify-center">
        {competitions.map((comp, i) => (
          <div key={i} className="text-center max-w-[450px] w-full mx-auto">
            <div className="gradient-frame max-w-[400px] h-[250px] md:h-[300px] mx-auto">
              <img src={comp.img} alt={comp.alt} className="w-full h-full object-contain" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mt-5 gradient-text-secondary">
              {comp.title}
            </h3>
            <p className="text-gray-400 mt-2 text-sm md:text-base">{comp.desc}</p>
            <span className="inline-block bg-gradient-to-r from-yellow-400 to-amber-300 text-black px-4 py-2 rounded-full font-semibold text-sm mt-4 shadow-[0_5px_15px_rgba(255,215,0,0.3)]">
              {comp.award}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
