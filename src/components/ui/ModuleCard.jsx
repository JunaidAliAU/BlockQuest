import { motion } from "framer-motion";
import { Clock, Play } from "lucide-react";
import Card from "./Card";
import Badge from "./Badge";
import XPChip from "./XPChip";
import ProgressBar from "./ProgressBar";

export default function ModuleCard({
  title,
  description,
  icon: Icon,
  progress = 0,
  xp = 0,
  duration,
  badge,
  badgeColor = "primary",
  onClick,
  className = "",
}) {
  return (
    <Card
      hover="full"
      padding="md"
      onClick={onClick}
      className={`cursor-pointer ${className}`}
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/10 shrink-0">
            <Icon className="h-6 w-6 text-primary-400" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-base font-semibold text-white truncate">
              {title}
            </h3>
            <div className="flex items-center gap-2 shrink-0">
              {badge && (
                <Badge color={badgeColor} size="sm">
                  {badge}
                </Badge>
              )}
              <XPChip amount={xp} size="sm" />
            </div>
          </div>

          {description && (
            <p className="text-sm text-surface-400 leading-relaxed line-clamp-2 mb-3">
              {description}
            </p>
          )}

          <div className="flex items-center justify-between gap-4">
            <ProgressBar value={progress} size="sm" className="flex-1" />
            <div className="flex items-center gap-3 shrink-0">
              {duration && (
                <span className="flex items-center gap-1 text-xs text-surface-500">
                  <Clock className="h-3 w-3" />
                  {duration}
                </span>
              )}
              <motion.div
                className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary-500/10 text-primary-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="h-3.5 w-3.5" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
