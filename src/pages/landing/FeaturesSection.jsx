import { motion } from "framer-motion";
import {
  Shield,
  Cpu,
  Coins,
  Zap,
  Globe,
  Layers,
} from "lucide-react";
import { Card } from "../../components/ui";
import { staggerContainer, fadeInUp } from "../../utils/animations";

const features = [
  {
    icon: Shield,
    title: "Secure Infrastructure",
    description: "Enterprise-grade security with audited smart contracts and encrypted data layers.",
    gradient: "from-primary-500/10 to-accent-500/10",
    border: "border-primary-500/10",
    iconColor: "text-primary-400",
  },
  {
    icon: Cpu,
    title: "Decentralized Learning",
    description: "Content hosted on-chain with immutable progress tracking and verified credentials.",
    gradient: "from-accent-500/10 to-primary-500/10",
    border: "border-accent-500/10",
    iconColor: "text-accent-400",
  },
  {
    icon: Coins,
    title: "Earn While You Learn",
    description: "Complete quests, earn XP, and unlock real token rewards for your achievements.",
    gradient: "from-amber-500/10 to-primary-500/10",
    border: "border-amber-500/10",
    iconColor: "text-amber-400",
  },
  {
    icon: Zap,
    title: "Lightning Performance",
    description: "Optimized L2 infrastructure delivering instant feedback and zero-gas interactions.",
    gradient: "from-primary-500/10 to-accent-500/10",
    border: "border-primary-500/10",
    iconColor: "text-primary-400",
  },
  {
    icon: Globe,
    title: "Multi-Chain Support",
    description: "Learn and deploy across Ethereum, Polygon, Solana, and 10+ other networks.",
    gradient: "from-accent-500/10 to-primary-500/10",
    border: "border-accent-500/10",
    iconColor: "text-accent-400",
  },
  {
    icon: Layers,
    title: "Modular Curriculum",
    description: "Adaptive learning paths that adjust to your skill level and pace.",
    gradient: "from-primary-500/10 to-accent-500/10",
    border: "border-primary-500/10",
    iconColor: "text-primary-400",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/3 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/8 px-4 py-1.5 text-sm text-primary-300 mb-4"
          >
            <Zap className="h-4 w-4" />
            Why BlockQuest
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
          >
            Built for the{" "}
            <span className="text-gradient">Next Generation</span>
            <br />
            of Developers
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-surface-400 max-w-2xl mx-auto"
          >
            Everything you need to go from zero to deployed, with real rewards
            at every milestone.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={fadeInUp}>
              <Card hover="full" padding="lg">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} border ${feature.border} mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon
                    className={`h-6 w-6 ${feature.iconColor}`}
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-surface-400 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
