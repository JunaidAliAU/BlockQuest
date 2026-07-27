import { motion } from "framer-motion";

export default function SectionTitle({
  title,
  subtitle,
  icon: Icon,
  align = "left",
  className = "",
  animated = true,
}) {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
  };

  const content = (
    <div className={`space-y-2 ${alignClasses[align]} ${className}`}>
      {Icon && (
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 mb-2">
          <Icon className="h-5 w-5 text-primary-400" />
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
      {subtitle && (
        <p className="text-surface-400 max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );

  if (!animated) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
    >
      {content}
    </motion.div>
  );
}
