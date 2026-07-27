import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Shuffle, Trophy, RefreshCw } from "lucide-react";
import { Card, Button } from "../ui";
import { MATCH_PAIRS } from "../../data/games";

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MatchGame({ onComplete }) {
  const [resetCount, setResetCount] = useState(0);

  return <MatchGameInner key={resetCount} onComplete={onComplete} onRestart={() => setResetCount((c) => c + 1)} />;
}

function MatchGameInner({ onComplete, onRestart }) {
  const [terms] = useState(() => shuffleArray(MATCH_PAIRS));
  const [defs] = useState(() => shuffleArray(MATCH_PAIRS));
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [matches, setMatches] = useState({});
  const [wrongIndex, setWrongIndex] = useState(null);
  const [finished, setFinished] = useState(false);

  const termKey = (t) => t.term;
  const defKey = (d) => d.term;

  const handleTermClick = (term) => {
    if (matches[termKey(term)] || finished) return;
    setSelectedTerm(termKey(term));
  };

  const handleDefClick = (def) => {
    if (!selectedTerm || matches[defKey(def)] || finished) return;

    if (selectedTerm === defKey(def)) {
      setMatches((prev) => ({ ...prev, [selectedTerm]: true }));
      setSelectedTerm(null);

      const newCount = Object.keys(matches).length + 1;
      if (newCount === terms.length) {
        setTimeout(() => setFinished(true), 400);
      }
    } else {
      setWrongIndex(defKey(def));
      setTimeout(() => {
        setWrongIndex(null);
        setSelectedTerm(null);
      }, 600);
    }
  };

  const score = Object.keys(matches).length;
  const total = terms.length;
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
        <h3 className="text-xl font-bold text-white mb-2">All Matched!</h3>
        <p className="text-surface-400 mb-1">Score: {score}/{total}</p>
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
          Match {score}/{total}
        </p>
        <div className="flex items-center gap-2 text-xs text-surface-500">
          <Shuffle className="h-3 w-3" />
          <span>Click a term, then its definition</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          {terms.map((t) => {
            const isMatched = matches[termKey(t)];
            const isSelected = selectedTerm === termKey(t);
            return (
              <motion.button
                key={termKey(t)}
                onClick={() => handleTermClick(t)}
                whileTap={{ scale: isMatched ? 1 : 0.98 }}
                aria-label={`Select term: ${t.term}${isMatched ? " (matched)" : ""}`}
                aria-pressed={isSelected}
                className={`w-full text-left rounded-xl border px-4 py-3 text-sm transition-all duration-200 ${
                  isMatched
                    ? "border-green-500/20 bg-green-500/10 text-green-300"
                    : isSelected
                      ? "border-primary-500/40 bg-primary-500/10 text-white"
                      : "border-dark-700 bg-dark-800/50 text-surface-300 hover:border-primary-500/30"
                }`}
              >
                <div className="flex items-center gap-2">
                  {isMatched && <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />}
                  <span>{t.term}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="space-y-2">
          {defs.map((d) => {
            const isMatched = matches[defKey(d)];
            const isWrong = wrongIndex === defKey(d);
            return (
              <motion.button
                key={defKey(d)}
                onClick={() => handleDefClick(d)}
                initial={false}
                animate={isWrong ? { x: [0, -8, 8, -4, 4, 0] } : {}}
                transition={{ duration: 0.3 }}
                aria-label={`Definition for: ${d.definition.slice(0, 40)}${isMatched ? " (matched)" : ""}`}
                className={`w-full text-left rounded-xl border px-4 py-3 text-xs leading-relaxed transition-all duration-200 ${
                  isMatched
                    ? "border-green-500/20 bg-green-500/10 text-green-300/80"
                    : isWrong
                      ? "border-red-500/40 bg-red-500/10 text-red-300"
                      : "border-dark-700 bg-dark-800/30 text-surface-400 hover:border-primary-500/30"
                }`}
              >
                <div className="flex items-start gap-2">
                  {isMatched && <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 shrink-0" />}
                  {isWrong && <XCircle className="h-3.5 w-3.5 text-red-400 mt-0.5 shrink-0" />}
                  <span>{d.definition}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
