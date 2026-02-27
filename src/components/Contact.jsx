import { contacts } from '../data/portfolioData';

export default function Contact() {
  return (
    <section id="contact" className="py-12 md:py-20 px-4 md:px-8 max-w-[1200px] mx-auto">
      <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-12 relative">
        <span className="gradient-text-primary">Get In Touch</span>
        <div className="section-title-underline gradient-bg-primary" />
      </h2>

      <div className="grid grid-cols-3 gap-6 md:gap-12 max-w-[600px] mx-auto">
        {contacts.map((contact, i) => (
          <a
            key={i}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center text-white no-underline font-semibold text-sm md:text-lg transition-all hover:-translate-y-1 hover:text-cyan-400"
          >
            <div className="w-16 h-16 md:w-28 md:h-28 lg:w-32 lg:h-32 gradient-bg-primary rounded-full flex items-center justify-center text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-5 transition-all relative group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_30px_rgba(0,245,255,0.3)]">
              <div className="absolute -top-[3px] -left-[3px] -right-[3px] -bottom-[3px] bg-gradient-to-r from-cyan-400 to-orange-500 rounded-full -z-10 opacity-60" />
              <i className={contact.icon} />
            </div>
            <span>{contact.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
