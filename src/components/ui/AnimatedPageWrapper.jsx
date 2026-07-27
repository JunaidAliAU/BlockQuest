import { motion } from "framer-motion";
import { pageTransition } from "../../utils/animations";

export default function AnimatedPageWrapper({
  children,
  className = "",
  showGradient = true,
  gradientColor = "primary",
}) {
  const gradientClasses = {
    primary: "from-primary-500/5",
    accent: "from-accent-500/5",
  };

  return (
    <div className="relative overflow-hidden">
      {showGradient && (
        <div
          className={`absolute inset-0 bg-gradient-to-b ${gradientClasses[gradientColor]} via-transparent to-transparent pointer-events-none`}
        />
      )}
      <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
