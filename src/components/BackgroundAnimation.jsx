import { useMemo } from 'react';

export default function BackgroundAnimation() {
  const particles = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 20}s`,
      duration: `${15 + Math.random() * 15}s`,
    }));
  }, []);

  const shapes = [
    { size: 600, top: '5%', left: '5%', duration: '50s', color: 'rgba(255,107,53,0.25)', shadow: 'rgba(255,107,53,0.15)' },
    { size: 500, top: '60%', right: '10%', duration: '35s', color: 'rgba(0,245,255,0.25)', shadow: 'rgba(0,245,255,0.15)', reverse: true },
    { size: 400, top: '30%', left: '65%', duration: '45s', color: 'rgba(124,58,237,0.3)', shadow: 'rgba(124,58,237,0.15)' },
    { size: 350, top: '15%', right: '20%', duration: '60s', color: 'rgba(0,245,255,0.2)', shadow: 'rgba(0,245,255,0.12)', reverse: true },
  ];

  return (
    <div className="background-animation fixed inset-0 pointer-events-none -z-1 overflow-hidden hidden lg:block">
      {/* Particles */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Gradient Waves */}
      <div
        className="absolute w-[300%] h-[300%]"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(0,245,255,0.12) 0%, transparent 60%),
            radial-gradient(circle at 80% 20%, rgba(255,107,53,0.1) 0%, transparent 60%),
            radial-gradient(circle at 40% 40%, rgba(124,58,237,0.08) 0%, transparent 60%)
          `,
          animation: 'waveMove 25s ease-in-out infinite',
        }}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.08) 2px, transparent 2px),
            linear-gradient(90deg, rgba(0,245,255,0.08) 2px, transparent 2px),
            linear-gradient(rgba(255,107,53,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,53,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 25px 25px, 25px 25px',
        }}
      />

      {/* Geometric Shapes */}
      <div className="absolute inset-0">
        {shapes.map((s, i) => (
          <div
            key={i}
            className="shape"
            style={{
              width: s.size,
              height: s.size,
              top: s.top,
              left: s.left,
              right: s.right,
              animationDuration: s.duration,
              animationDirection: s.reverse ? 'reverse' : 'normal',
              border: `3px solid ${s.color}`,
              boxShadow: `0 0 80px ${s.shadow}`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
