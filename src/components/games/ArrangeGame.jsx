import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ArrowUp, ArrowDown, CheckCircle, RefreshCw, GripVertical } from "lucide-react";
import { Card, Button } from "../ui";
import { TRANSACTION_STEPS } from "../../data/games";

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ArrangeGame({ onComplete }) {
  const [resetCount, setResetCount] = useState(0);

  return <ArrangeGameInner key={resetCount} onComplete={onComplete} onRestart={() => setResetCount((c) => c + 1)} />;
}

function ArrangeGameInner({ onComplete, onRestart }) {
  const [items, setItems] = useState(() => shuffleArray(TRANSACTION_STEPS));
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);

  const moveUp = (index) => {
    if (index === 0 || checked) return;
    setItems((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };

  const moveDown = (index) => {
    if (index === items.length - 1 || checked) return;
    setItems((prev) => {
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  };

  const handleCheck = () => {
    setChecked(true);
    const correct = items.every((item, i) => item.order === i);
    if (correct) {
      setTimeout(() => setFinished(true), 600);
    }
  };

  const score = items.filter((item, i) => item.order === i).length;
  const total = items.length;
  const xpEarned = Math.round((score / total) * 200);

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
        <h3 className="text-xl font-bold text-white mb-2">Correct Order!</h3>
        <p className="text-surface-400 mb-1">All {total} steps in the right order</p>
        <p className="text-amber-400 font-semibold mb-6">+{xpEarned} XP</p>
        <div className="flex justify-center gap-3">
          <Button variant="primary" onClick={() => onComplete(xpEarned, score, total)}>
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
          Arrange the transaction steps in order
        </p>
        {!checked && (
          <Button variant="secondary" size="sm" onClick={handleCheck}>
            Check Order
          </Button>
        )}
        {checked && !finished && (
          <span className="flex items-center gap-1 text-sm text-red-400">
            <CheckCircle className="h-4 w-4" />
            Some steps are wrong — try again
          </span>
        )}
      </div>

      <div className="space-y-2">
        {items.map((item, i) => {
          const isCorrect = checked && item.order === i;
          const isWrong = checked && item.order !== i;
          return (
            <motion.div
              key={item.id}
              layout
              transition={{ duration: 0.2 }}
              className={`flex items-center gap-2 rounded-xl border px-3 py-3 transition-all duration-200 ${
                isCorrect
                  ? "border-green-500/20 bg-green-500/10"
                  : isWrong
                    ? "border-red-500/20 bg-red-500/10"
                    : "border-dark-700 bg-dark-800/50"
              }`}
            >
              <GripVertical className="h-4 w-4 text-surface-600 shrink-0" />

              <span
                className={`flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold shrink-0 ${
                  isCorrect
                    ? "bg-green-500/20 text-green-400"
                    : isWrong
                      ? "bg-red-500/20 text-red-400"
                      : "bg-dark-700 text-surface-400"
                }`}
              >
                {i + 1}
              </span>

              <span
                className={`text-sm flex-1 ${
                  isCorrect
                    ? "text-green-300"
                    : isWrong
                      ? "text-red-300"
                      : "text-surface-300"
                }`}
              >
                {item.label}
              </span>

              <div className="flex gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => moveUp(i)}
                  disabled={checked}
                  aria-label={`Move "${item.label}" up`}
                  className="flex items-center justify-center w-7 h-7 rounded-lg bg-dark-700/50 text-surface-500 hover:text-white hover:bg-dark-700 transition-colors disabled:opacity-30"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(i)}
                  disabled={checked}
                  aria-label={`Move "${item.label}" down"`}
                  className="flex items-center justify-center w-7 h-7 rounded-lg bg-dark-700/50 text-surface-500 hover:text-white hover:bg-dark-700 transition-colors disabled:opacity-30"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {checked && !finished && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={() => setChecked(false)}
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
