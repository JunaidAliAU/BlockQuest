import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertTriangle, Trophy, RefreshCw, ThumbsUp, ThumbsDown, CheckCircle, XCircle } from "lucide-react";
import { Card, Button } from "../ui";
import { SCAM_SCENARIOS } from "../../data/games";

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ScamGame({ onComplete }) {
  const [resetCount, setResetCount] = useState(0);

  return <ScamGameInner key={resetCount} onComplete={onComplete} onRestart={() => setResetCount((c) => c + 1)} />;
}

function ScamGameInner({ onComplete, onRestart }) {
  const [scenarios] = useState(() => shuffleArray(SCAM_SCENARIOS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = scenarios[currentIndex];
  const isAnswered = answers[currentIndex] !== undefined;

  const handleAnswer = (userSaysScam) => {
    if (isAnswered) return;

    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: { userSaysScam, correct: userSaysScam === current.isScam },
    }));
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const correctCount = Object.values(answers).filter((a) => a.correct).length;
  const answeredCount = Object.keys(answers).length;
  const total = scenarios.length;
  const xpEarned = Math.round((correctCount / total) * 200);

  if (finished) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-8"
      >
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/25">
            <Trophy className="h-10 w-10 text-white" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Scam Scanner Complete!</h3>
        <p className="text-surface-400 mb-1">
          Correct: {correctCount}/{total}
        </p>
        <p className="text-amber-400 font-semibold mb-6">+{xpEarned} XP</p>
        <div className="flex justify-center gap-3">
          <Button variant="primary" onClick={() => onComplete(xpEarned, correctCount, total)}>
            Claim XP
          </Button>
          <Button
            variant="secondary"
            icon={RefreshCw}
            onClick={onRestart}
          >
            Play Again
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-surface-400">
          Scenario {currentIndex + 1} of {total}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          <Card hover="none" padding="lg" className="mb-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 shrink-0">
                <Shield className="h-4 w-4 text-amber-400" />
              </div>
              <p className="text-sm text-white leading-relaxed italic">
                &ldquo;{current.text}&rdquo;
              </p>
            </div>

            {!isAnswered ? (
              <div className="flex gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(true)}
                  aria-label="Classify as scam"
                  className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-6 py-3 text-sm font-semibold text-red-300 hover:bg-red-500/20 transition-colors"
                >
                  <AlertTriangle className="h-4 w-4" />
                  Scam
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(false)}
                  aria-label="Classify as safe"
                  className="inline-flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-6 py-3 text-sm font-semibold text-green-300 hover:bg-green-500/20 transition-colors"
                >
                  <ThumbsUp className="h-4 w-4" />
                  Safe
                </motion.button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div
                  className={`rounded-xl border p-4 text-sm mb-4 ${
                    answers[currentIndex].correct
                      ? "border-green-500/20 bg-green-500/5 text-green-300"
                      : "border-red-500/20 bg-red-500/5 text-red-300"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {answers[currentIndex].correct ? (
                      <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 mt-0.5 shrink-0" />
                    )}
                    <span>{current.explanation}</span>
                  </div>
                </div>
                <Button variant="primary" onClick={handleNext}>
                  {currentIndex < total - 1 ? "Next Scenario" : "See Results"}
                </Button>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      {answeredCount > 0 && !isAnswered && (
        <p className="text-center text-xs text-surface-500">
          Correct so far: {correctCount}/{answeredCount}
        </p>
      )}
    </div>
  );
}
