import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { NAV_LINKS } from "../../data/navigation";
import { APP_NAME } from "../../utils/constants";
import { useScrollPosition } from "../../hooks/useScrollPosition";

const linkVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

const mobileMenuVariants = {
  closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
};

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isScrolled } = useScrollPosition();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-lg shadow-dark-950/50"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-shadow duration-300">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            {APP_NAME}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link, i) => (
            <motion.div
              key={link.path}
              custom={i}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
            >
              <NavLink
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white bg-primary-500/10 border border-primary-500/20"
                      : "text-surface-400 hover:text-white hover:bg-dark-800/50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-surface-400 hover:text-white hover:bg-dark-800/50 transition-colors"
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.nav
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden glass border-t border-dark-800/50 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-white bg-primary-500/10 border border-primary-500/20"
                        : "text-surface-400 hover:text-white hover:bg-dark-800/50"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
