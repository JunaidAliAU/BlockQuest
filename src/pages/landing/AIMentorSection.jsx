import { motion } from "framer-motion";
import {
  Bot,
  MessageSquare,
  Code2,
  Lightbulb,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { Card, Badge } from "../../components/ui";
import { staggerContainer, fadeInUp } from "../../utils/animations";

const features = [
  { icon: Code2, text: "Real-time code review and debugging assistance" },
  { icon: Lightbulb, text: "Personalized study plans based on your progress" },
  { icon: MessageSquare, text: "Natural language Q&A about any Web3 concept" },
  { icon: CheckCircle, text: "Automated quiz generation from your weak areas" },
];

const messages = [
  {
    role: "ai",
    content: "I notice you struggled with the reentrancy guard challenge. Want to review the pattern?",
  },
  {
    role: "user",
    content: "Yes, I keep getting the vulnerability wrong.",
  },
  {
    role: "ai",
    content: "Sure! The Checks-Effects-Interactions pattern prevents reentrancy by updating state before external calls. Here\u2019s an example...",
  },
];

export default function AIMentorSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-500/3 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <motion.div variants={fadeInUp} className="order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-2xl border border-dark-800 bg-dark-900/50 p-4">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-dark-800">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-primary-500">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">AI Mentor</p>
                    <p className="text-xs text-surface-500">Online \u2022 Powered by BlockQuest</p>
                  </div>
                  <Badge color="green" size="sm" className="ml-auto">
                    Active
                  </Badge>
                </div>

                <div className="space-y-3">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.4 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm ${
                          msg.role === "user"
                            ? "bg-primary-500/10 border border-primary-500/20 text-primary-200"
                            : "bg-dark-800 border border-dark-700 text-surface-300"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-dark-800">
                  <div className="flex items-center gap-2 rounded-xl bg-dark-800/50 border border-dark-700 px-4 py-2.5">
                    <MessageSquare className="h-4 w-4 text-surface-500 shrink-0" />
                    <span className="text-sm text-surface-600 flex-1">
                      Ask your AI mentor anything...
                    </span>
                    <motion.div
                      className="flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-br from-accent-500 to-primary-500"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Sparkles className="h-3 w-3 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>

              <motion.div
                className="absolute -bottom-2 -left-2 w-full h-full rounded-2xl border border-accent-500/10 -z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              />
            </div>
          </motion.div>

          <div className="order-1 lg:order-2">
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/8 px-4 py-1.5 text-sm text-accent-300 mb-4"
            >
              <Bot className="h-4 w-4" />
              AI Mentor
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Your Personal{" "}
              <span className="text-gradient">AI Tutor</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-surface-400 leading-relaxed mb-8"
            >
              Our AI mentor adapts to your learning style, identifies knowledge
              gaps, and provides personalized guidance every step of the way.
            </motion.p>

            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {features.map((f) => (
                <motion.li
                  key={f.text}
                  variants={fadeInUp}
                  className="flex items-center gap-3"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-500/10 border border-accent-500/20 shrink-0">
                    <f.icon className="h-4 w-4 text-accent-400" />
                  </div>
                  <span className="text-sm text-surface-300">{f.text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
