import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  User,
  Sparkles,
  MessageSquare,
  RefreshCw,
  AlertCircle,
  Lightbulb,
  BookOpen,
  Shield,
  Coins,
  Cpu,
  Zap,
} from "lucide-react";
import {
  Card,
  Button,
  AnimatedPageWrapper,
  Badge,
} from "../components/ui";
import { sendMessage, AIMentorError } from "../services/aiMentor";

const SUGGESTIONS = [
  { icon: Lightbulb, label: "What is blockchain?", question: "Can you explain what blockchain is in simple terms with a real-world analogy?" },
  { icon: BookOpen, label: "How do wallets work?", question: "How do cryptocurrency wallets work? Use an analogy to explain private keys and seed phrases." },
  { icon: Shield, label: "Are NFTs useful?", question: "What are NFTs actually used for besides digital art? Explain in beginner terms." },
  { icon: Coins, label: "What is DeFi?", question: "What is DeFi and how is it different from regular banking? Use a simple analogy." },
  { icon: Cpu, label: "Smart contracts?", question: "What are smart contracts? Explain like I am five years old." },
  { icon: Zap, label: "Gas fees?", question: "Why do I have to pay gas fees on Ethereum? Can you explain with an everyday example?" },
];

function ChatMessage({ message }) {
  const isAI = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isAI ? "" : "flex-row-reverse"}`}
    >
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-xl shrink-0 ${
          isAI
            ? "bg-gradient-to-br from-primary-500 to-accent-500"
            : "bg-dark-700 border border-dark-600"
        }`}
      >
        {isAI ? (
          <Bot className="h-4 w-4 text-white" />
        ) : (
          <User className="h-4 w-4 text-surface-300" />
        )}
      </div>

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isAI
            ? "bg-dark-800/80 border border-dark-700 text-surface-200 rounded-tl-sm"
            : "bg-primary-500/10 border border-primary-500/20 text-primary-200 rounded-tr-sm"
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.text}
        </p>
        {message.error && (
          <div className="mt-2 flex items-center gap-2 text-xs text-red-400">
            <AlertCircle className="h-3 w-3" />
            <span>{message.error}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shrink-0">
        <Bot className="h-4 w-4 text-white" />
      </div>
      <div className="rounded-2xl bg-dark-800/80 border border-dark-700 px-5 py-3.5">
        <div className="flex items-center gap-1.5">
          <motion.span
            className="w-2 h-2 rounded-full bg-primary-400"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="w-2 h-2 rounded-full bg-primary-400"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
          />
          <motion.span
            className="w-2 h-2 rounded-full bg-primary-400"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function SuggestionChip({ icon: Icon, label, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl border border-dark-700 bg-dark-800/50 px-3.5 py-2 text-xs text-surface-300 hover:text-white hover:border-primary-500/30 hover:bg-dark-800 transition-all duration-200"
    >
      <Icon className="h-3.5 w-3.5 text-primary-400" />
      {label}
    </motion.button>
  );
}

export default function AIMentor() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I am your blockchain mentor. Ask me anything about Web3, crypto, smart contracts, or anything blockchain-related. I will explain it in simple terms with real-world examples!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const lastSendTime = useRef(0);

  const handleSend = async (text) => {
    const message = (text || input).trim();
    if (!message || isLoading) return;

    const now = Date.now();
    if (now - lastSendTime.current < 2000) {
      return;
    }
    lastSendTime.current = now;

    setInput("");
    setShowSuggestions(false);

    setMessages((prev) => [...prev, { role: "user", text: message }]);
    setIsLoading(true);

    try {
      const history = messages.filter((m) => !m.error);
      const response = await sendMessage(history, message);

      setMessages((prev) => [...prev, { role: "assistant", text: response }]);
    } catch (error) {
      if (error instanceof AIMentorError) {
        const errorMsg =
          error.code === "NO_API_KEY"
            ? "The AI mentor is not connected yet. To enable it, create a `.env` file in the project root and add `VITE_OPENAI_API_KEY=your-key-here`. Get a key from aistudio.google.com or platform.openai.com."
            : error.message;

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "",
            error: errorMsg,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "",
            error: "Something went wrong. Please try again.",
          },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRetry = () => {
    const lastErrorIndex = [...messages]
      .reverse()
      .findIndex((m) => m.error);

    if (lastErrorIndex === -1) return;

    const errorMsg = messages[messages.length - 1 - lastErrorIndex];
    const userMsg = messages[messages.length - 2 - lastErrorIndex];

    if (userMsg?.role !== "user") return;

    setMessages((prev) => prev.slice(0, -1 - lastErrorIndex));
    handleSend(userMsg.text);
  };

  return (
    <AnimatedPageWrapper showGradient={false}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">AI Mentor</h1>
            <p className="text-xs text-surface-500">Your personal blockchain tutor</p>
          </div>
          <Badge color="green" size="sm" className="ml-auto">
            <span className="relative flex h-1.5 w-1.5 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
            </span>
            {import.meta.env.VITE_OPENAI_API_KEY && import.meta.env.VITE_OPENAI_API_KEY !== "sk-your-key-here"
              ? "Connected"
              : "Offline"}
          </Badge>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card hover="none" padding="none" className="h-[600px] flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                <AnimatePresence>
                  {messages.map((msg, i) => (
                    <ChatMessage key={`${i}-${msg.text.length}`} message={msg} />
                  ))}
                </AnimatePresence>

                {isLoading && <TypingIndicator />}

                {messages.some((m) => m.error) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center pt-2"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={RefreshCw}
                      onClick={handleRetry}
                    >
                      Retry Last Message
                    </Button>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-dark-800 p-4">
                <div className="flex items-end gap-2">
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask me anything about blockchain..."
                      rows={1}
                      className="w-full rounded-xl border border-dark-700 bg-dark-800/50 px-4 py-3 text-sm text-white placeholder-surface-600 resize-none focus:outline-none focus:border-primary-500/40 focus:ring-1 focus:ring-primary-500/20 transition-all"
                      style={{ minHeight: 44, maxHeight: 120 }}
                      onInput={(e) => {
                        e.target.style.height = "auto";
                        e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                      }}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className={`flex items-center justify-center w-11 h-11 rounded-xl shrink-0 transition-all duration-200 ${
                      input.trim() && !isLoading
                        ? "bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg shadow-primary-500/25"
                        : "bg-dark-800 text-surface-600 cursor-not-allowed"
                    }`}
                  >
                    <Send className="h-4 w-4" />
                  </motion.button>
                </div>
                <p className="text-[10px] text-surface-600 mt-2">
                  I only answer blockchain and Web3 questions. Unrelated questions will be politely declined.
                </p>
              </div>
            </Card>
          </div>

          <div className="hidden lg:block lg:col-span-1">
            <Card hover="none" padding="md" className="sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-primary-400" />
                <h2 className="text-sm font-semibold text-white">Try Asking</h2>
              </div>
              <div className="space-y-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => handleSend(s.question)}
                    disabled={isLoading}
                    className="w-full text-left flex items-center gap-2.5 rounded-xl border border-dark-700 bg-dark-800/30 px-3 py-2.5 text-xs text-surface-400 hover:text-white hover:border-primary-500/30 hover:bg-dark-800/50 transition-all duration-200 disabled:opacity-50"
                  >
                    <s.icon className="h-3.5 w-3.5 text-primary-400 shrink-0" />
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-dark-800">
                <div className="flex items-center gap-2 text-xs text-surface-500">
                  <MessageSquare className="h-3 w-3" />
                  <span>Blockchain only</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <AnimatePresence>
          {showSuggestions && messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="mt-6 lg:hidden"
            >
              <Card hover="none" padding="md">
                <p className="text-xs text-surface-400 mb-3">
                  Not sure where to start? Try one of these:
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.slice(0, 4).map((s) => (
                    <SuggestionChip
                      key={s.label}
                      icon={s.icon}
                      label={s.label}
                      onClick={() => handleSend(s.question)}
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedPageWrapper>
  );
}
