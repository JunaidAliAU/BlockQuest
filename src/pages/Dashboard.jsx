import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Trophy,
  Zap,
  Lock,
  CheckCircle,
  Clock,
  Compass,
  TrendingUp,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import {
  Card,
  Badge,
  ProgressBar,
  XPChip,
  SectionTitle,
  AnimatedPageWrapper,
  Button,
} from "../components/ui";
import { useLearning } from "../context/LearningContext";
import { DIFFICULTY } from "../data/missions";
import { staggerContainer, fadeInUp } from "../utils/animations";

const BADGE_ICONS = {
  Compass,
  Zap,
  TrendingUp,
  GraduationCap,
  Trophy,
};

export default function Dashboard() {
  const {
    missions,
    currentLevel,
    currentXP,
    xpToNextLevel,
    completionPercent,
    latestBadge,
    completeMission,
    updateProgress,
    resetProgress,
  } = useLearning();

  const navigate = useNavigate();
  const completedCount = missions.filter((m) => m.isCompleted).length;
  const totalMissions = missions.length;

  return (
    <AnimatedPageWrapper gradientColor="primary">
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <SectionTitle
              title="Learning Dashboard"
              icon={LayoutDashboard}
              className="mb-10"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
            <motion.div variants={fadeInUp} className="lg:col-span-1">
              <Card hover="none" padding="lg">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mb-4 shadow-lg shadow-primary-500/25">
                    <span className="text-3xl font-bold text-white">
                      {currentLevel}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">Current Level</p>
                  <p className="text-xs text-surface-500 mt-1">
                    {currentXP.toLocaleString()} / {xpToNextLevel.toLocaleString()} XP
                  </p>
                  <ProgressBar
                    value={currentXP}
                    max={xpToNextLevel}
                    size="sm"
                    className="mt-3"
                  />
                </div>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} className="lg:col-span-1">
              <Card hover="none" padding="lg">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-400 mb-4 shadow-lg shadow-amber-500/25">
                    <span className="text-3xl font-bold text-white">
                      {currentXP.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">Total XP</p>
                  <p className="text-xs text-surface-500 mt-1">
                    Earned across all missions
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} className="lg:col-span-1">
              <Card hover="none" padding="lg">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-500 to-primary-500 mb-4 shadow-lg shadow-accent-500/25">
                    <span className="text-3xl font-bold text-white">
                      {completionPercent}%
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">Completion</p>
                  <p className="text-xs text-surface-500 mt-1">
                    {completedCount} of {totalMissions} missions
                  </p>
                  <ProgressBar
                    value={completedCount}
                    max={totalMissions}
                    size="sm"
                    className="mt-3"
                    color="accent"
                  />
                </div>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} className="lg:col-span-1">
              <Card hover="none" padding="lg">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 mb-4 shadow-lg shadow-green-500/25">
                    {latestBadge ? (
                      (() => {
                        const Icon =
                          BADGE_ICONS[latestBadge.icon] || Trophy;
                        return <Icon className="h-9 w-9 text-white" />;
                      })()
                    ) : (
                      <Sparkles className="h-9 w-9 text-white" />
                    )}
                  </div>
                  <p className="text-sm font-semibold text-white">
                    {latestBadge ? latestBadge.name : "No Badge Yet"}
                  </p>
                  <p className="text-xs text-surface-500 mt-1">
                    {latestBadge
                      ? latestBadge.description
                      : "Complete missions to earn badges"}
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>

          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-between mb-6"
          >
            <h2 className="text-xl font-bold text-white">All Missions</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetProgress}
            >
              Reset Progress
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {missions.map((mission, i) => {
              const diff = DIFFICULTY[mission.difficulty];
              const BadgeIconComponent = mission.isCompleted
                ? CheckCircle
                : mission.isLocked
                  ? Lock
                  : undefined;

              return (
                <motion.div
                  key={mission.id}
                  variants={fadeInUp}
                  custom={i}
                >
                  <Card
                    hover={mission.isLocked ? "none" : "full"}
                    padding="md"
                    className={`relative ${
                      mission.isLocked ? "opacity-50 pointer-events-none" : "cursor-pointer"
                    } ${mission.isCompleted ? "border-green-500/20" : ""}`}
                    onClick={() => navigate(`/lesson/${mission.id}`)}
                  >
                    {mission.isCompleted && (
                      <div className="absolute top-3 right-3">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      </div>
                    )}

                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${
                          mission.isCompleted
                            ? "bg-green-500/10 border border-green-500/20"
                            : mission.isLocked
                              ? "bg-dark-800 border border-dark-700"
                              : "bg-primary-500/10 border border-primary-500/20"
                        }`}
                      >
                        {BadgeIconComponent ? (
                          <BadgeIconComponent
                            className={`h-5 w-5 ${
                              mission.isCompleted
                                ? "text-green-400"
                                : "text-surface-500"
                            }`}
                          />
                        ) : (
                          <span className="text-sm font-bold text-primary-400">
                            {String(mission.order).padStart(2, "0")}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-sm font-semibold truncate ${
                            mission.isLocked
                              ? "text-surface-500"
                              : "text-white"
                          }`}
                        >
                          {mission.title}
                        </h3>
                        <p className="text-xs text-surface-500 leading-relaxed line-clamp-1 mt-0.5">
                          {mission.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge color={diff.color} size="sm">
                        {diff.label}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-surface-500">
                        <Clock className="h-3 w-3" />
                        {mission.estimatedTime}
                      </span>
                      <XPChip amount={mission.xpReward} size="sm" />
                    </div>

                    {!mission.isCompleted && (
                      <ProgressBar
                        value={mission.progress}
                        max={100}
                        size="sm"
                      />
                    )}

                    {mission.isUnlocked && !mission.isCompleted && (
                      <div className="flex gap-2 mt-3">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            updateProgress(mission.id, 100);
                            setTimeout(
                              () => completeMission(mission.id),
                              400
                            );
                          }}
                          className="flex-1"
                        >
                          Complete Mission
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            updateProgress(
                              mission.id,
                              Math.min(mission.progress + 25, 100)
                            )
                          }
                        >
                          +25%
                        </Button>
                      </div>
                    )}

                    {mission.isLocked && (
                      <p className="text-xs text-surface-600 mt-2">
                        Complete &ldquo;
                        {mission.prerequisites
                          .map((p) => missions.find((m) => m.id === p)?.title)
                          .filter(Boolean)
                          .join(", ")}
                        &rdquo; first
                      </p>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>
    </AnimatedPageWrapper>
  );
}
