import { motion } from "framer-motion";
import { memo } from "react";
const colorMap = {
  primary:
    "border-primary-500/20 bg-primary-500/10 text-primary-300",
  accent:
    "border-accent-500/20 bg-accent-500/10 text-accent-300",
  green:
    "border-green-500/20 bg-green-500/10 text-green-300",
  amber:
    "border-amber-500/20 bg-amber-500/10 text-amber-300",
  red:
    "border-red-500/20 bg-red-500/10 text-red-300",
  surface:
    "border-dark-700 bg-dark-800/50 text-surface-400",
};

const sizeMap = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
  lg: "px-3 py-1.5 text-sm",
};

const Badge = memo(function Badge({
  children,
  color = "primary",
  size = "md",
  className = "",
  icon: Icon,
  animated = false,
}) {
  return (
    <motion.span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${colorMap[color]} ${sizeMap[size]} ${className}`}
      initial={animated ? { opacity: 0, scale: 0.85 } : undefined}
      animate={animated ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.3 }}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {children}
    </motion.span>
  );
});

export default Badge;
