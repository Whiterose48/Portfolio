import { useState, useEffect } from 'react';
import { personalInfo, heroStats, typingTitles } from '../data/portfolioData';

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = typingTitles[titleIndex];
    const typingSpeed = isDeleting ? 60 : 100;

    if (!isDeleting && displayText === currentTitle) {
      const timeout = setTimeout(() => setIsDeleting(true), 1500);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % typingTitles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentTitle.substring(0, displayText.length - 1)
          : currentTitle.substring(0, displayText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, titleIndex, isDeleting]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center text-center px-4 md:px-8 relative">
      <div className="max-w-[800px] z-10 animate-[fadeInUp_0.8s_ease_forwards]">
        {/* Avatar */}
        <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] mx-auto mb-8 relative">
          <div className="gradient-frame circle w-full h-full">
            <img src={personalInfo.heroImg} alt={personalInfo.name} />
          </div>
        </div>

        {/* Name */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 gradient-text-primary">
          {personalInfo.name}
        </h1>

        {/* Typing Text */}
        <div className="text-xl md:text-2xl mb-8 flex items-center justify-center flex-wrap">
          <span className="text-gray-400 font-medium mr-1 text-lg md:text-2xl">Hi I'm a </span>
          <span className="gradient-text-accent font-semibold">{displayText}</span>
          <div className="w-[3px] h-6 bg-cyan-400 animate-[blink_1.5s_infinite] rounded-sm ml-0.5" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mt-8">
          {heroStats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text-accent">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
