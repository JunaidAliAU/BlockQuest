import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play, Zap } from "lucide-react";
import { Button } from "../../components/ui";
import { staggerContainerSlow, fadeInUp } from "../../utils/animations";

const floatingShape = (delay, x, y) => ({
  initial: { x: 0, y: 0, opacity: 0 },
  animate: {
    x: [0, x, 0],
    y: [0, y, 0],
    opacity: [0, 0.6, 0],
    transition: { duration: 8, repeat: Infinity, delay, ease: "easeInOut" },
  },
});

const shapes = [
  { size: "w-64 h-64", color: "bg-primary-500/10", blur: "blur-3xl", delay: 0, x: 30, y: -20 },
  { size: "w-48 h-48", color: "bg-accent-500/10", blur: "blur-3xl", delay: 1, x: -20, y: 30 },
  { size: "w-32 h-32", color: "bg-purple-400/8", blur: "blur-2xl", delay: 2, x: 40, y: 10 },
];

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          variants={floatingShape(s.delay, s.x, s.y)}
          initial="initial"
          animate="animate"
          className={`absolute ${s.size} ${s.color} ${s.blur} rounded-full pointer-events-none`}
          style={{
            top: `${25 + i * 15}%`,
            left: `${15 + i * 30}%`,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-500/8 via-transparent to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/8 px-4 py-1.5 text-sm text-primary-300 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
                </span>
                Live on Mainnet
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight"
            >
              <span className="text-white">Master </span>
              <span className="text-gradient">Web3</span>
              <br />
              <span className="text-white">One Quest at a Time</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 text-base sm:text-lg text-surface-400 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              An interactive learning platform where you earn real rewards while
              mastering blockchain development, smart contracts, and
              decentralized applications.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Button
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate("/dashboard")}
              >
                Start Your Quest
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={Play}
                onClick={() => navigate("/features")}
              >
                Learn More
              </Button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-12 flex flex-wrap items-center gap-8 justify-center lg:justify-start"
            >
              {[
                { label: "Active Learners", value: "12K+" },
                { label: "Courses", value: "50+" },
                { label: "XP Earned", value: "1M+" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-surface-500">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              <div className="relative w-80 h-96 rounded-2xl border border-primary-500/20 bg-gradient-to-br from-dark-800/80 to-dark-900/80 backdrop-blur-xl p-6 shadow-2xl shadow-primary-500/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">BlockQuest</p>
                    <p className="text-xs text-surface-500">Learning Dashboard</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Solidity Basics", progress: 75, color: "from-primary-500 to-accent-500" },
                    { label: "Smart Contracts", progress: 45, color: "from-accent-500 to-primary-500" },
                    { label: "DeFi Protocols", progress: 20, color: "from-primary-500 to-accent-500" },
                  ].map((module) => (
                    <div key={module.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-surface-300">{module.label}</span>
                        <span className="text-surface-500">{module.progress}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-dark-800 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${module.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${module.progress}%` }}
                          transition={{ duration: 1, delay: 0.8 + module.progress * 0.01 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-dark-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-surface-500">Total XP</span>
                    <span className="text-sm font-bold text-amber-400">2,450 XP</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-dark-800 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                      initial={{ width: 0 }}
                      animate={{ width: "62%" }}
                      transition={{ duration: 1, delay: 1.2 }}
                    />
                  </div>
                </div>
              </div>

              <motion.div
                className="absolute -top-3 -right-3 w-20 h-20 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/30"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <p className="text-center">
                  <span className="block text-lg font-bold text-white">#1</span>
                  <span className="block text-[8px] text-white/80 leading-tight">RANKED</span>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
