import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Trophy, ArrowLeft } from "lucide-react";
import { Card, Button, Badge, XPChip, AnimatedPageWrapper } from "../components/ui";
import MatchGame from "../components/games/MatchGame";
import ArrangeGame from "../components/games/ArrangeGame";
import ScamGame from "../components/games/ScamGame";
import { GAMES } from "../data/games";
import { useLearning } from "../context/LearningContext";
import { staggerContainer, fadeInUp } from "../utils/animations";

const GAME_COMPONENTS = {
  "match-terms": MatchGame,
  "arrange-steps": ArrangeGame,
  "scam-or-safe": ScamGame,
};

function GameCard({ game, bestScore, total, isCompleted, onClick }) {
  return (
    <motion.button
      variants={fadeInUp}
      onClick={onClick}
      className="w-full text-left"
    >
      <Card hover="full" padding="lg">
        <div className="flex items-start gap-4">
          <div
            className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${game.gradient} shadow-lg shrink-0`}
          >
            <span className="text-2xl">{game.emoji}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-white">{game.title}</h3>
              {isCompleted && (
                <Badge color="green" size="sm">
                  <Trophy className="h-3 w-3 mr-0.5" />
                  Done
                </Badge>
              )}
            </div>
            <p className="text-sm text-surface-400 leading-relaxed mb-3">
              {game.description}
            </p>
            <div className="flex items-center justify-between">
              <XPChip amount={game.xpReward} size="sm" />
              {bestScore !== undefined && (
                <span className="text-xs text-surface-500">
                  Best: {bestScore}/{total}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.button>
  );
}

export default function Games() {
  const { gameScores, completedGames, addGameXP } = useLearning();
  const [activeGame, setActiveGame] = useState(null);

  const handlePlay = (gameId) => {
    setActiveGame(gameId);
  };

  const handleGameComplete = (xp, score, total) => {
    addGameXP(activeGame, score, total, xp);
  };

  const ActiveComponent = activeGame ? GAME_COMPONENTS[activeGame] : null;

  return (
    <AnimatedPageWrapper gradientColor="primary">
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <AnimatePresence mode="wait">
          {!activeGame ? (
            <motion.div
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-primary-500">
                  <Gamepad2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Learn by Playing</h1>
                  <p className="text-sm text-surface-400">Test your knowledge through fun challenges</p>
                </div>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {GAMES.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    bestScore={gameScores[game.id]}
                    total={game.totalItems}
                    isCompleted={completedGames.includes(game.id)}
                    onClick={() => handlePlay(game.id)}
                  />
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="game"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <button
                onClick={() => setActiveGame(null)}
                className="inline-flex items-center gap-2 text-sm text-surface-400 hover:text-white transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Games
              </button>

              <Card hover="none" padding="lg">
                <ActiveComponent onComplete={handleGameComplete} />
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </AnimatedPageWrapper>
  );
}
