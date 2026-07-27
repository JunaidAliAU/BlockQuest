import { Info } from "lucide-react";
import { Card, AnimatedPageWrapper } from "../components/ui";
import { staggerContainer, fadeInUp } from "../utils/animations";
import { motion } from "framer-motion";

const values = [
  {
    label: "Innovation",
    description: "Pushing the boundaries of what\u2019s possible on-chain.",
    color: "bg-primary-500",
  },
  {
    label: "Accessibility",
    description: "Making Web3 development available to all skill levels.",
    color: "bg-accent-500",
  },
  {
    label: "Community",
    description: "Building together through open collaboration.",
    color: "bg-primary-500",
  },
];

export default function About() {
  return (
    <AnimatedPageWrapper gradientColor="primary">
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20">
                <Info className="h-5 w-5 text-primary-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                About <span className="text-gradient">BlockQuest</span>
              </h1>
            </div>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-surface-400 leading-relaxed mb-8"
          >
            BlockQuest is a cutting-edge platform designed to bridge the gap
            between developers and the decentralized web. Our mission is to
            make blockchain technology accessible, scalable, and rewarding for
            everyone.
          </motion.p>

          <Card hover="none" padding="lg" className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Our Mission</h2>
            <p className="text-surface-400 leading-relaxed">
              We believe in a future where decentralized applications are as
              easy to build as traditional web apps. BlockQuest provides the
              tools, infrastructure, and community support needed to bring
              your Web3 ideas to life.
            </p>
          </Card>

          <Card hover="none" padding="lg">
            <h2 className="text-xl font-semibold text-white mb-4">Our Values</h2>
            <ul className="space-y-3 text-surface-400">
              {values.map((v) => (
                <li key={v.label} className="flex items-start gap-3">
                  <span
                    className={`mt-1.5 h-2 w-2 rounded-full ${v.color} shrink-0`}
                  />
                  <span>
                    <strong className="text-white">{v.label}</strong>{" "}&mdash;{" "}{v.description}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </section>
    </AnimatedPageWrapper>
  );
}
