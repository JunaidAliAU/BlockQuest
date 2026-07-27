import { motion } from "framer-motion";
import { Sparkles, Server, Globe, Lock, Zap, Layers } from "lucide-react";
import { Card, AnimatedPageWrapper } from "../components/ui";
import { staggerContainer, fadeInUp } from "../utils/animations";

const featuresList = [
  {
    icon: Server,
    title: "Decentralized Infrastructure",
    description: "Fully distributed architecture ensuring uptime and censorship resistance.",
  },
  {
    icon: Globe,
    title: "Multi-Chain Support",
    description: "Deploy across multiple blockchain networks with a single interface.",
  },
  {
    icon: Lock,
    title: "Built-in Security",
    description: "Automated auditing and security checks for your smart contracts.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for performance with minimal latency and high throughput.",
  },
  {
    icon: Layers,
    title: "Modular Architecture",
    description: "Plugin-based system for extensibility and customization.",
  },
  {
    icon: Sparkles,
    title: "Developer Tools",
    description: "Comprehensive SDKs, APIs, and CLI tools for rapid development.",
  },
];

export default function Features() {
  return (
    <AnimatedPageWrapper gradientColor="accent">
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />

      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Everything you need to{" "}
              <span className="text-gradient">build</span>
            </h1>
            <p className="text-surface-400 max-w-2xl mx-auto">
              A comprehensive suite of tools and services designed for modern Web3 development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresList.map((feature) => (
              <motion.div key={feature.title} variants={fadeInUp}>
                <Card hover="full" padding="md">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500/10 to-primary-500/10 border border-accent-500/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-accent-400" />
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
          </div>
        </motion.div>
      </section>
    </AnimatedPageWrapper>
  );
}
