import { motion } from "framer-motion";
import { BookOpen, Code, ShieldCheck, Rocket, Award } from "lucide-react";
import { Badge } from "../../components/ui";
import { staggerContainer, fadeInUp } from "../../utils/animations";

const steps = [
  {
    icon: BookOpen,
    title: "Learn Fundamentals",
    description: "Start with blockchain basics, Solidity syntax, and Web3 concepts through interactive lessons.",
    badge: "Beginner",
    badgeColor: "green",
  },
  {
    icon: Code,
    title: "Build Smart Contracts",
    description: "Write, test, and deploy real smart contracts in a sandboxed environment with instant feedback.",
    badge: "Intermediate",
    badgeColor: "primary",
  },
  {
    icon: ShieldCheck,
    title: "Security Auditing",
    description: "Master vulnerability detection, gas optimization, and industry-standard security patterns.",
    badge: "Advanced",
    badgeColor: "amber",
  },
  {
    icon: Rocket,
    title: "Deploy to Mainnet",
    description: "Launch your dApp to production with our guided deployment pipeline and monitoring tools.",
    badge: "Expert",
    badgeColor: "red",
  },
  {
    icon: Award,
    title: "Earn Credentials",
    description: "Receive verifiable on-chain credentials and NFT certificates for completed milestones.",
    badge: "Graduate",
    badgeColor: "primary",
  },
];

export default function LearningJourneySection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-500/3 to-transparent pointer-events-none" />
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary-500/20 to-transparent hidden lg:block" />

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
            className="inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/8 px-4 py-1.5 text-sm text-accent-300 mb-4"
          >
            <BookOpen className="h-4 w-4" />
            Your Journey
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
          >
            From Zero to{" "}
            <span className="text-gradient">Blockchain Hero</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-surface-400 max-w-2xl mx-auto"
          >
            A structured path that takes you from absolute beginner to
            production-ready blockchain developer.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative max-w-3xl mx-auto"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              variants={fadeInUp}
              className={`relative flex items-start gap-6 pb-12 last:pb-0 ${
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              <div className="hidden lg:flex absolute left-1/2 top-6 w-4 h-4 -translate-x-1/2">
                <div className="w-4 h-4 rounded-full bg-dark-900 border-2 border-primary-500/50 z-10" />
              </div>

              <div className="flex-1">
                <div className="rounded-2xl border border-dark-800 bg-dark-900/50 p-6 hover:border-primary-500/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/10 shrink-0">
                      <step.icon className="h-5 w-5 text-primary-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="text-lg font-semibold text-white">
                          {step.title}
                        </h3>
                        <Badge color={step.badgeColor} size="sm">
                          {step.badge}
                        </Badge>
                      </div>
                      <p className="text-sm text-surface-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block flex-1" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
