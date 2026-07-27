import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Lightbulb,
  Sparkles,
  Zap,
  Trophy,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { getLesson } from "../data/lessons";
import {
  Card,
  Button,
  ProgressBar,
  AnimatedPageWrapper,
} from "../components/ui";
import QuizBlock from "../components/lesson/QuizBlock";

const BLOCK_META = {
  read: {
    icon: BookOpen,
    gradient: "from-primary-500/5 to-accent-500/5",
    border: "border-primary-500/10",
    iconBg: "bg-primary-500/10",
    iconBorder: "border-primary-500/20",
    iconColor: "text-primary-400",
  },
  example: {
    icon: Lightbulb,
    gradient: "from-amber-500/5 to-primary-500/5",
    border: "border-amber-500/10",
    iconBg: "bg-amber-500/10",
    iconBorder: "border-amber-500/20",
    iconColor: "text-amber-400",
  },
  quiz: {
    icon: Zap,
    gradient: "from-amber-500/5 to-accent-500/5",
    border: "border-amber-500/10",
    iconBg: "bg-amber-500/10",
    iconBorder: "border-amber-500/20",
    iconColor: "text-amber-400",
  },
  tips: {
    icon: Lightbulb,
    gradient: "from-accent-500/5 to-primary-500/5",
    border: "border-accent-500/10",
    iconBg: "bg-accent-500/10",
    iconBorder: "border-accent-500/20",
    iconColor: "text-accent-400",
  },
  fact: {
    icon: Sparkles,
    gradient: "from-purple-500/5 to-primary-500/5",
    border: "border-purple-500/10",
    iconBg: "bg-purple-500/10",
    iconBorder: "border-purple-500/20",
    iconColor: "text-purple-400",
  },
  summary: {
    icon: Trophy,
    gradient: "from-green-500/5 to-emerald-500/5",
    border: "border-green-500/10",
    iconBg: "bg-green-500/10",
    iconBorder: "border-green-500/20",
    iconColor: "text-green-400",
  },
};

function ReadBlock({ block }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{block.emoji}</span>
        <div>
          <h2 className="text-xl font-bold text-white">{block.title}</h2>
        </div>
      </div>
      <p className="text-base text-surface-300 leading-relaxed">
        {block.content}
      </p>
    </div>
  );
}

function ExampleBlock({ block }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{block.emoji}</span>
        <h2 className="text-xl font-bold text-white">{block.title}</h2>
      </div>
      <div className="rounded-xl border border-amber-500/10 bg-amber-500/5 p-5">
        <p className="text-base text-surface-300 leading-relaxed">
          {block.content}
        </p>
      </div>
    </div>
  );
}

function TipsBlock({ block }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{block.emoji}</span>
        <h2 className="text-xl font-bold text-white">{block.title}</h2>
      </div>
      <ul className="space-y-3">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-500/10 border border-accent-500/20 shrink-0">
              <span className="text-xs font-bold text-accent-400">{i + 1}</span>
            </span>
            <span className="text-sm text-surface-300 leading-relaxed pt-0.5">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FactBlock({ block }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{block.emoji}</span>
        <h2 className="text-xl font-bold text-white">{block.title}</h2>
      </div>
      <div className="rounded-xl border border-purple-500/10 bg-purple-500/5 p-5">
        <p className="text-base text-surface-300 leading-relaxed">
          {block.content}
        </p>
      </div>
    </div>
  );
}

function SummaryBlock({ block, onRestart, onGoBack }) {
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/25">
          <Trophy className="h-10 w-10 text-white" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-white">{block.title}</h2>
      <p className="text-base text-surface-300 leading-relaxed max-w-lg mx-auto">
        {block.content}
      </p>
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <Button variant="primary" onClick={onGoBack}>
          Back to Dashboard
        </Button>
        <Button variant="secondary" onClick={onRestart}>
          Restart Lesson
        </Button>
      </div>
    </div>
  );
}

export default function LessonViewer() {
  const { missionId } = useParams();
  const navigate = useNavigate();
  const lesson = getLesson(missionId);

  const [currentBlock, setCurrentBlock] = useState(0);
  const [completedBlocks, setCompletedBlocks] = useState(new Set());

  if (!lesson) {
    return (
      <AnimatedPageWrapper gradientColor="primary">
        <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-20 pb-20 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Lesson Not Found</h1>
          <p className="text-surface-400 mb-6">
            This mission does not have a lesson yet.
          </p>
          <Button variant="primary" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </section>
      </AnimatedPageWrapper>
    );
  }

  const blocks = lesson.blocks;
  const total = blocks.length;
  const current = blocks[currentBlock];
  const meta = BLOCK_META[current.type] ?? BLOCK_META.read;
  const Icon = meta.icon;
  const isLastBlock = currentBlock === total - 1;
  const progress = ((currentBlock + 1) / total) * 100;

  const handleNext = () => {
    if (isLastBlock) return;
    setCompletedBlocks((prev) => new Set(prev).add(currentBlock));
    setCurrentBlock((prev) => prev + 1);
  };

  const handleQuizComplete = () => {
    setCompletedBlocks((prev) => new Set(prev).add(currentBlock));
    setTimeout(() => {
      if (isLastBlock) return;
      setCurrentBlock((prev) => prev + 1);
    }, 400);
  };

  const handleRestart = () => {
    setCurrentBlock(0);
    setCompletedBlocks(new Set());
  };

  return (
    <AnimatedPageWrapper showGradient={false}>
      <section className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-2 text-sm text-surface-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20">
            <BookOpen className="h-5 w-5 text-primary-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-white truncate">
              {lesson.title}
            </h1>
            <p className="text-xs text-surface-500">
              Step {currentBlock + 1} of {total}
            </p>
          </div>
        </div>

        <ProgressBar
          value={progress}
          max={100}
          size="sm"
          className="mb-8"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentBlock}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <Card hover="none" padding="lg">
              {current.type === "read" && (
                <ReadBlock block={current} />
              )}
              {current.type === "example" && (
                <ExampleBlock block={current} />
              )}
              {current.type === "quiz" && (
                <QuizBlock block={current} onComplete={handleQuizComplete} />
              )}
              {current.type === "tips" && (
                <TipsBlock block={current} />
              )}
              {current.type === "fact" && (
                <FactBlock block={current} />
              )}
              {current.type === "summary" && (
                <SummaryBlock
                  block={current}
                  onRestart={handleRestart}
                  onGoBack={() => navigate("/dashboard")}
                />
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        {current.type !== "quiz" &&
          current.type !== "summary" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex justify-end"
            >
              <Button
                variant="primary"
                icon={ChevronRight}
                iconPosition="right"
                onClick={handleNext}
              >
                {isLastBlock ? "Finish" : "Continue"}
              </Button>
            </motion.div>
          )}
      </section>
    </AnimatedPageWrapper>
  );
}
