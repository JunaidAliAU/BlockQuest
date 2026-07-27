import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Zap, Shield, Sparkles } from "lucide-react";
import { Button } from "../../components/ui";
import { staggerContainer, fadeInUp } from "../../utils/animations";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-dark-950 to-accent-600/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div variants={fadeInUp}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-sm text-primary-300 mb-6">
            <Sparkles className="h-4 w-4" />
            Start Free Today
          </span>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
        >
          Ready to Start Your{" "}
          <span className="text-gradient">Blockchain Journey</span>?
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="mt-6 text-lg text-surface-400 max-w-2xl mx-auto leading-relaxed"
        >
          Join 12,000+ developers already learning, building, and earning on
          BlockQuest. Your first quest is on the house.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <Button
            variant="primary"
            size="lg"
            icon={Zap}
            onClick={() => navigate("/dashboard")}
          >
            Claim Free Starter Pack
          </Button>
          <Button
            variant="secondary"
            size="lg"
            icon={Shield}
            onClick={() => navigate("/features")}
          >
            View Plans
          </Button>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="mt-6 text-xs text-surface-600"
        >
          No credit card required &bull; Cancel anytime &bull; 14-day free trial
        </motion.p>
      </motion.div>
    </section>
  );
}
