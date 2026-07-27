import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function XPChip({
  amount = 0,
  size = "md",
  className = "",
  animated = false,
}) {
  const sizes = {
    sm: "px-2 py-0.5 text-[10px] gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
    lg: "px-3 py-1.5 text-sm gap-2",
  };

  const iconSizes = {
    sm: "h-2.5 w-2.5",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  };

  return (
    <motion.span
      className={`inline-flex items-center rounded-full bg-gradient-to-r from-amber-500/15 to-amber-600/10 border border-amber-500/20 text-amber-300 font-semibold ${sizes[size]} ${className}`}
      initial={animated ? { opacity: 0, scale: 0.85, y: 4 } : undefined}
      animate={animated ? { opacity: 1, scale: 1, y: 0 } : undefined}
      transition={{ duration: 0.3 }}
    >
      <Sparkles className={`${iconSizes[size]} text-amber-400`} />
      {amount.toLocaleString()} XP
    </motion.span>
  );
}
