import { motion } from "framer-motion";

export default function GlassContainer({
  children,
  className = "",
  as = "div",
  animated = true,
  ...props
}) {
  const baseClasses =
    "glass rounded-2xl";

  const Element = as === "div" ? (animated ? motion.div : "div") : as;

  const motionProps = animated
    ? {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.4 },
      }
    : {};

  return (
    <Element
      className={`${baseClasses} ${className}`}
      {...motionProps}
      {...props}
    >
      {children}
    </Element>
  );
}
