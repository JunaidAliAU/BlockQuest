import { motion } from "framer-motion";
import { memo } from "react";
const hoverEffects = {
  none: "",
  lift: "hover:-translate-y-1",
  glow: "hover:shadow-lg hover:shadow-primary-500/5",
  border: "hover:border-primary-500/30",
  full: "hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/5 hover:border-primary-500/30",
};

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10",
};

export default memo(function Card({
  children,
  className = "",
  hover = "full",
  padding = "md",
  as = "div",
  onClick,
  ...props
}) {
  const baseClasses =
    "rounded-2xl border border-dark-800 bg-dark-900/50 transition-all duration-300";

  const classNames = `${baseClasses} ${paddings[padding]} ${hoverEffects[hover]} ${
    onClick ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50" : ""
  } ${className}`;

  const handleKeyDown = (e) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(e);
    }
  };

  const motionProps = {
    className: classNames,
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.4 },
    ...(onClick && { role: "button", tabIndex: 0, onKeyDown: handleKeyDown }),
    ...(onClick && { onClick }),
    ...(onClick && { whileHover: { scale: 1.01 } }),
    ...(onClick && { whileTap: { scale: 0.99 } }),
    ...props,
  };

  const Component = as === "div" ? motion.div : motion[as];
  return <Component {...motionProps}>{children}</Component>;
});
