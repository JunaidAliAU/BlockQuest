import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";

const About = lazy(() => import("./pages/About"));
const Features = lazy(() => import("./pages/Features"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const LessonViewer = lazy(() => import("./pages/LessonViewer"));
const AIMentor = lazy(() => import("./pages/AIMentor"));
const Games = lazy(() => import("./pages/Games"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex items-center gap-2 text-surface-400">
        <div className="w-5 h-5 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
        <span className="text-sm">Loading...</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<Suspense fallback={<PageLoading />}><About /></Suspense>} />
        <Route path="features" element={<Suspense fallback={<PageLoading />}><Features /></Suspense>} />
        <Route path="dashboard" element={<Suspense fallback={<PageLoading />}><Dashboard /></Suspense>} />
        <Route path="lesson/:missionId" element={<Suspense fallback={<PageLoading />}><LessonViewer /></Suspense>} />
        <Route path="ai-mentor" element={<Suspense fallback={<PageLoading />}><AIMentor /></Suspense>} />
        <Route path="games" element={<Suspense fallback={<PageLoading />}><Games /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<PageLoading />}><NotFound /></Suspense>} />
      </Route>
    </Routes>
  );
}
