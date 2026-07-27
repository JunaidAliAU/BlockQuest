import { useNavigate } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";
import { Button, AnimatedPageWrapper } from "../components/ui";
import { scaleIn } from "../utils/animations";
import { motion } from "framer-motion";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <AnimatedPageWrapper showGradient={false}>
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="text-center px-4"
        >
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-500/10 border border-primary-500/20">
              <AlertTriangle className="h-10 w-10 text-primary-400" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-white mb-2">404</h1>
          <p className="text-xl text-surface-400 mb-8">
            This page does not exist.
          </p>
          <Button
            variant="primary"
            size="lg"
            icon={Home}
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </motion.div>
      </div>
    </AnimatedPageWrapper>
  );
}
