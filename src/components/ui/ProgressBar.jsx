import { motion } from "framer-motion";
import { memo } from "react";

const ProgressBar = memo(function ProgressBar({
  value = 0,
  max = 100,
  size = "md",
  showLabel = false,
  className = "",
  color = "gradient",
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };

  const colorClasses = {
    gradient: "bg-gradient-to-r from-primary-500 to-accent-500",
    primary: "bg-primary-500",
    accent: "bg-accent-500",
    green: "bg-green-500",
    amber: "bg-amber-500",
  };

  return (
    <div
      className={`w-full ${className}`}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${Math.round(percentage)}% complete`}
    >
      {showLabel && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-surface-400">Progress</span>
          <span className="text-xs font-medium text-surface-300">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div
        className={`w-full rounded-full bg-dark-800 overflow-hidden ${heights[size]}`}
      >
        <motion.div
          className={`h-full rounded-full ${colorClasses[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
});

export default ProgressBar;
