import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Card } from "../../components/ui";
import { staggerContainer, fadeInUp } from "../../utils/animations";

const testimonials = [
  {
    name: "Alex Chen",
    role: "Solidity Developer",
    avatar: "AC",
    content:
      "BlockQuest completely transformed how I learn Web3. The gamified approach kept me motivated, and I landed my first smart contract audit job within 3 months.",
    rating: 5,
    gradient: "from-primary-500 to-accent-500",
  },
  {
    name: "Sarah Johnson",
    role: "DeFi Protocol Engineer",
    avatar: "SJ",
    content:
      "The AI mentor feature is incredible. It identified my weak spots in gas optimization and created custom exercises. I reduced my contract deployment costs by 40%.",
    rating: 5,
    gradient: "from-accent-500 to-primary-500",
  },
  {
    name: "Marcus Williams",
    role: "Web3 Educator",
    avatar: "MW",
    content:
      "I recommend BlockQuest to all my students. The structured learning path from fundamentals to production deployment is the best in the space.",
    rating: 5,
    gradient: "from-primary-500 to-accent-500",
  },
  {
    name: "Priya Patel",
    role: "dApp Developer",
    avatar: "PP",
    content:
      "The real-time feedback and on-chain credentials set BlockQuest apart. My NFT certificates from completed courses helped me stand out to employers.",
    rating: 5,
    gradient: "from-accent-500 to-primary-500",
  },
];

export default function TestimonialsSection() {
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
            <Quote className="h-4 w-4" />
            Testimonials
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
          >
            Loved by{" "}
            <span className="text-gradient">Developers</span>
            <br />
            Worldwide
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeInUp}>
              <Card hover="full" padding="lg">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>

                <blockquote className="text-sm text-surface-300 leading-relaxed mb-6">
                  &ldquo;{t.content}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} text-sm font-bold text-white`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-surface-500">{t.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
