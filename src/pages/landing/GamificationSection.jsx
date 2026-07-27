import { motion } from "framer-motion";
import { Trophy, Medal, Star, TrendingUp, Sparkles, Target } from "lucide-react";
import { Card, Badge, XPChip, ProgressBar } from "../../components/ui";
import { staggerContainer, fadeInUp } from "../../utils/animations";

const rewards = [
  {
    icon: Trophy,
    title: "Leaderboard Rankings",
    description: "Compete with thousands of learners and climb the global ranks.",
    gradient: "from-amber-500/10 to-primary-500/10",
    border: "border-amber-500/10",
    color: "text-amber-400",
  },
  {
    icon: Medal,
    title: "Achievement Badges",
    description: "Unlock rare NFTs and badges for completing challenging quests.",
    gradient: "from-primary-500/10 to-accent-500/10",
    border: "border-primary-500/10",
    color: "text-primary-400",
  },
  {
    icon: Star,
    title: "Skill Trees",
    description: "Level up your abilities through branching specialization paths.",
    gradient: "from-accent-500/10 to-primary-500/10",
    border: "border-accent-500/10",
    color: "text-accent-400",
  },
  {
    icon: TrendingUp,
    title: "Streak Bonuses",
    description: "Maintain daily learning streaks for multiplied XP rewards.",
    gradient: "from-amber-500/10 to-accent-500/10",
    border: "border-amber-500/10",
    color: "text-amber-400",
  },
];

export default function GamificationSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/3 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <div>
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/8 px-4 py-1.5 text-sm text-amber-300 mb-4"
            >
              <Sparkles className="h-4 w-4" />
              Gamification
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Learn Like a{" "}
              <span className="text-gradient">Game</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-surface-400 leading-relaxed mb-8 max-w-lg"
            >
              We turned blockchain education into an RPG. Earn XP, unlock
              achievements, climb leaderboards, and collect NFT badges as you
              master new skills.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {rewards.map((reward) => (
                <motion.div key={reward.title} variants={fadeInUp}>
                  <Card hover="full" padding="md">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br ${reward.gradient} border ${reward.border}`}
                      >
                        <reward.icon className={`h-4 w-4 ${reward.color}`} />
                      </div>
                      <h3 className="text-sm font-semibold text-white">
                        {reward.title}
                      </h3>
                    </div>
                    <p className="text-xs text-surface-400 leading-relaxed">
                      {reward.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-sm space-y-4">
              <Card hover="none" padding="lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-accent-500">
                    <span className="text-xl font-bold text-white">Q7</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">QuestMaster</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge color="primary" size="sm">Level 24</Badge>
                      <span className="text-surface-500">Silver Tier</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-surface-400">XP to next level</span>
                  <span className="text-xs text-surface-400">1,240 / 2,500</span>
                </div>
                <ProgressBar value={1240} max={2500} size="md" />

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-dark-800">
                  <div className="text-center">
                    <Target className="h-4 w-4 text-primary-400 mx-auto mb-1" />
                    <p className="text-xs text-surface-500">Quests</p>
                    <p className="text-sm font-bold text-white">47</p>
                  </div>
                  <div className="text-center">
                    <Trophy className="h-4 w-4 text-amber-400 mx-auto mb-1" />
                    <p className="text-xs text-surface-500">Achievements</p>
                    <p className="text-sm font-bold text-white">23</p>
                  </div>
                  <div className="text-center">
                    <Star className="h-4 w-4 text-accent-400 mx-auto mb-1" />
                    <p className="text-xs text-surface-500">Streak</p>
                    <p className="text-sm font-bold text-white">12 days</p>
                  </div>
                </div>
              </Card>

              <div className="flex items-center justify-between px-2">
                <XPChip amount={850} size="md" />
                <Badge color="green" size="md" icon={Sparkles}>
                  Bonus Active
                </Badge>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
