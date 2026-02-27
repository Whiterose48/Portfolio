import { personalInfo } from '../data/portfolioData';

export default function About() {
  const info = [
    { label: 'Age', value: personalInfo.age },
    { label: 'Birth', value: personalInfo.birth },
    { label: 'Height', value: personalInfo.height },
    { label: 'Weight', value: personalInfo.weight },
    { label: 'Languages', value: personalInfo.languages },
    { label: 'Location', value: personalInfo.location },
  ];

  return (
    <section id="about" className="py-12 md:py-20 px-4 md:px-8 max-w-[1200px] mx-auto">
      <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-12 relative">
        <span className="gradient-text-primary">About Me</span>
        <div className="section-title-underline gradient-bg-primary" />
      </h2>

      <div className="card-shimmer relative overflow-hidden bg-white/8 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 transition-all hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] hover:-translate-y-2 hover:border-[#667eea]/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4 gradient-text-secondary">
              Personal Information
            </h3>
            <div className="grid gap-2">
              {info.map((item) => (
                <p key={item.label} className="text-gray-300">
                  <strong className="text-white">{item.label}:</strong> {item.value}
                </p>
              ))}
            </div>
          </div>
          <div className="text-center">
            <div className="gradient-frame circle w-[200px] h-[200px] md:w-[250px] md:h-[250px] mx-auto">
              <img src={personalInfo.profileImg} alt="Profile" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
