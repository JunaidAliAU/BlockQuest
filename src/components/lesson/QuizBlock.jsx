import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";

export default function QuizBlock({ block, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const isCorrect = selected === block.correct;

  const handleSelect = (index) => {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);
    if (index === block.correct) {
      setTimeout(() => onComplete?.(), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <HelpCircle className="h-4 w-4 text-amber-400" />
        </div>
        <span className="text-sm font-medium text-amber-300">Quick Quiz</span>
      </div>

      <p className="text-base text-white font-medium leading-relaxed">
        {block.question}
      </p>

      <div className="space-y-2" role="radiogroup" aria-label="Quiz options">
        {block.options.map((option, i) => {
          const isSelected = selected === i;
          let stateClass =
            "border-dark-700 bg-dark-800/50 hover:border-primary-500/40 hover:bg-dark-800";

          if (revealed) {
            if (i === block.correct) {
              stateClass = "border-green-500/40 bg-green-500/10";
            } else if (isSelected && !isCorrect) {
              stateClass = "border-red-500/40 bg-red-500/10";
            } else {
              stateClass = "border-dark-700 bg-dark-800/30 opacity-50";
            }
          }

          return (
            <motion.button
              key={i}
              onClick={() => handleSelect(i)}
              role="radio"
              aria-checked={isSelected}
              aria-label={`Option ${String.fromCharCode(65 + i)}: ${option}`}
              className={`w-full text-left rounded-xl border px-4 py-3 text-sm transition-all duration-200 ${stateClass} ${
                revealed ? "cursor-default" : "cursor-pointer"
              }`}
              whileTap={!revealed ? { scale: 0.99 } : {}}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium shrink-0 ${
                    revealed && i === block.correct
                      ? "bg-green-500 text-white"
                      : revealed && isSelected && !isCorrect
                        ? "bg-red-500 text-white"
                        : "bg-dark-700 text-surface-400"
                  }`}
                >
                  {revealed && i === block.correct ? (
                    <CheckCircle className="h-3.5 w-3.5" />
                  ) : revealed && isSelected && !isCorrect ? (
                    <XCircle className="h-3.5 w-3.5" />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                <span
                  className={`${
                    revealed && i === block.correct
                      ? "text-green-300"
                      : revealed && isSelected && !isCorrect
                        ? "text-red-300"
                        : "text-surface-200"
                  }`}
                >
                  {option}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`rounded-xl border p-4 text-sm ${
              isCorrect
                ? "border-green-500/20 bg-green-500/5 text-green-300"
                : "border-red-500/20 bg-red-500/5 text-red-300"
            }`}
          >
            <div className="flex items-start gap-2">
              {isCorrect ? (
                <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 mt-0.5 shrink-0" />
              )}
              <span>{block.feedback}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
