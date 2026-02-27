import LoadingScreen from './components/LoadingScreen';
import BackgroundAnimation from './components/BackgroundAnimation';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Competitions from './components/Competitions';
import Certificates from './components/Certificates';
import Contact from './components/Contact';

export default function App() {
  return (
    <>
      <LoadingScreen />
      <BackgroundAnimation />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Experience />
      <Projects />
      <Competitions />
      <Certificates />
      <Contact />
    </>
  );
}
