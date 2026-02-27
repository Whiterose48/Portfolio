import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

const NeuralScene = lazy(() => import('../components/NeuralScene'));

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function PageLayout({ children, showScene = false }) {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative min-h-screen pt-20"
    >
      {showScene && (
        <Suspense fallback={null}>
          <NeuralScene />
        </Suspense>
      )}
      {children}
    </motion.main>
  );
}
