import { motion } from "framer-motion";
import { memo } from "react";
const variants = {
  primary:
    "bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30",
  secondary:
    "border border-dark-700 bg-dark-800/50 text-surface-300 hover:text-white hover:bg-dark-700/50 hover:border-dark-600",
  ghost:
    "text-surface-400 hover:text-white hover:bg-dark-800/50",
  danger:
    "bg-red-600/10 border border-red-600/20 text-red-400 hover:bg-red-600/20 hover:border-red-600/30",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

const Button = memo(function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  disabled = false,
  icon: Icon,
  iconPosition = "left",
  type = "button",
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50";

  const classNames = `${baseClasses} ${variants[variant]} ${sizes[size]} ${
    disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer"
  } ${className}`;

  const content = (
    <>
      {Icon && iconPosition === "left" && (
        <Icon className="h-4 w-4 shrink-0" />
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <Icon className="h-4 w-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${classNames} group`}
        whileHover={{ scale: disabled ? 1 : 1.03 }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classNames} group`}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      {...props}
    >
      {content}
    </motion.button>
  );
});

export default Button;
