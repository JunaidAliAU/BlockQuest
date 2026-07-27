import { createContext, useContext, useCallback, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  MISSIONS,
  BADGES,
  LEVEL_THRESHOLD,
  INITIAL_LEVEL,
} from "../data/missions";

const LearningContext = createContext(undefined);

const STORAGE_KEY = "blockquest-learning";

function getInitialState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === "object") {
        return parsed;
      }
    }
  } catch {
    // corrupted data — reset
  }
  return {
    completedMissions: [],
    missionProgress: {},
    currentLevel: INITIAL_LEVEL,
    currentXP: 0,
    latestBadgeId: null,
    gameScores: {},
    completedGames: [],
  };
}

function calculateLevel(xp) {
  let level = INITIAL_LEVEL;
  let remaining = xp;
  while (remaining >= level * LEVEL_THRESHOLD) {
    remaining -= level * LEVEL_THRESHOLD;
    level++;
  }
  return { level, xpIntoLevel: remaining };
}

function calculateXPForLevel(level) {
  return level * LEVEL_THRESHOLD;
}

function checkNewBadges(completedCount, earnedBadgeIds) {
  return BADGES.filter(
    (b) =>
      completedCount >= b.requiredMissions && !earnedBadgeIds.includes(b.id)
  ).map((b) => b.id);
}

export function LearningProvider({ children }) {
  const [state, setState] = useLocalStorage(STORAGE_KEY, getInitialState());

  const completeMission = useCallback(
    (missionId) => {
      const mission = MISSIONS.find((m) => m.id === missionId);
      if (!mission) return;

      setState((prev) => {
        if (prev.completedMissions.includes(missionId)) return prev;

        const newCompleted = [...prev.completedMissions, missionId];
        const { level, xpIntoLevel } = calculateLevel(
          prev.currentXP + mission.xpReward
        );

        const newBadgeIds = checkNewBadges(
          newCompleted.length,
          BADGES.filter(
            (b) =>
              b.requiredMissions <= newCompleted.length &&
              b.requiredMissions > prev.completedMissions.length
          ).map((b) => b.id)
        );

        const latestBadgeId =
          newBadgeIds.length > 0
            ? newBadgeIds[newBadgeIds.length - 1]
            : prev.latestBadgeId;

        return {
          ...prev,
          completedMissions: newCompleted,
          missionProgress: {
            ...prev.missionProgress,
            [missionId]: 100,
          },
          currentLevel: level,
          currentXP: xpIntoLevel,
          latestBadgeId,
        };
      });
    },
    [setState]
  );

  const updateProgress = useCallback(
    (missionId, progress) => {
      setState((prev) => ({
        ...prev,
        missionProgress: {
          ...prev.missionProgress,
          [missionId]: Math.min(progress, 100),
        },
      }));
    },
    [setState]
  );

  const resetProgress = useCallback(() => {
    setState({
      completedMissions: [],
      missionProgress: {},
      currentLevel: INITIAL_LEVEL,
      currentXP: 0,
      latestBadgeId: null,
      gameScores: {},
      completedGames: [],
    });
  }, [setState]);

  const addGameXP = useCallback(
    (gameId, score, total, xpAmount) => {
      setState((prev) => {
        const prevBest = prev.gameScores[gameId] ?? 0;
        const isNewBest = score > prevBest;

        const newScores = { ...prev.gameScores, [gameId]: Math.max(prevBest, score) };
        const newCompleted = prev.completedGames.includes(gameId)
          ? prev.completedGames
          : [...prev.completedGames, gameId];

        const { level, xpIntoLevel } = calculateLevel(prev.currentXP + xpAmount);

        return {
          ...prev,
          gameScores: newScores,
          completedGames: newCompleted,
          currentLevel: level,
          currentXP: xpIntoLevel,
        };
      });
    },
    [setState]
  );

  const totalMissions = MISSIONS.length;
  const completedCount = state.completedMissions.length;
  const completionPercent = Math.round((completedCount / totalMissions) * 100);

  const missionsWithState = useMemo(
    () =>
      MISSIONS.map((mission) => {
        const isCompleted = state.completedMissions.includes(mission.id);
        const isLocked =
          !isCompleted &&
          mission.prerequisites.length > 0 &&
          !mission.prerequisites.every((p) =>
            state.completedMissions.includes(p)
          );
        const progress = state.missionProgress[mission.id] ?? 0;

        return {
          ...mission,
          isCompleted,
          isLocked,
          progress,
          isUnlocked: !isLocked && !isCompleted,
        };
      }),
    [state.completedMissions, state.missionProgress]
  );

  const latestBadge = state.latestBadgeId
    ? BADGES.find((b) => b.id === state.latestBadgeId) ?? null
    : null;

  const xpToNextLevel = calculateXPForLevel(state.currentLevel);

  const value = useMemo(
    () => ({
      missions: missionsWithState,
      completedMissions: state.completedMissions,
      currentLevel: state.currentLevel,
      currentXP: state.currentXP,
      xpToNextLevel,
      completionPercent,
      latestBadge,
      gameScores: state.gameScores,
      completedGames: state.completedGames,
      completeMission,
      updateProgress,
      resetProgress,
      addGameXP,
    }),
    [
      missionsWithState,
      state.completedMissions,
      state.currentLevel,
      state.currentXP,
      xpToNextLevel,
      completionPercent,
      latestBadge,
      state.gameScores,
      state.completedGames,
      completeMission,
      updateProgress,
      resetProgress,
      addGameXP,
    ]
  );

  return (
    <LearningContext.Provider value={value}>{children}</LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error("useLearning must be used within a LearningProvider");
  }
  return context;
}
