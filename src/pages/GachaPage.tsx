import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Gift, Sparkles, Coins, Info } from "lucide-react";
import { cn } from "../lib/utils";
import { OTOSHIDAMA_CONFIG, spinGacha } from "../lib/gacha";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingScreen } from "../components/LoadingScreen";
import { useGacha } from "../contexts/gacha";

const amounts = OTOSHIDAMA_CONFIG.map((item) => item.amount);
const probabilities = OTOSHIDAMA_CONFIG.map((item) => item.probability);

function ProbabilityModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">提供割合</h3>
        <div className="space-y-2">
          {amounts.map((amount, index) => (
            <div
              key={amount}
              className="flex justify-between items-center py-2 border-b border-gray-100"
            >
              <div className="flex items-center gap-2">
                <span className="text-red-600 font-medium">
                  ¥{amount.toLocaleString()}
                </span>
              </div>
              <span className="text-gray-600">
                {(probabilities[index] * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button onClick={onClose} variant="outline" className="w-full">
            閉じる
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function GachaPage() {
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState("");
  const [showProbability, setShowProbability] = useState(false);
  const { setResult, isLoading, setIsLoading } = useGacha();
  const timeoutRef = useRef<number>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSpin = () => {
    if (!playerName.trim()) {
      setError("お名前を入力してください");
      return;
    }
    setError("");
    setIsSpinning(true);
    setIsLoading(true);

    const amount = spinGacha(OTOSHIDAMA_CONFIG);
    setResult({ playerName: playerName.trim(), amount });

    timeoutRef.current = window.setTimeout(() => {
      setIsLoading(false);
      navigate("/result");
    }, 3000);
  };

  return (
    <>
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      <AnimatePresence mode="wait">
        {!isLoading && (
          <>
            <AnimatePresence>
              <ProbabilityModal
                isOpen={showProbability}
                onClose={() => setShowProbability(false)}
              />
            </AnimatePresence>

            <div className="h-full flex flex-col items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="w-full max-w-md"
                  >
                    <Card className="relative overflow-hidden backdrop-blur-lg bg-white/90 p-8 shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-white/10 pointer-events-none" />

                      <div className="relative space-y-7">
                        <div className="text-center space-y-2">
                          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">
                            お年玉ガチャ
                          </h1>
                          <p className="text-gray-600">
                            今年はいくらもらえるかな？
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="playerName"
                              className="text-sm font-medium"
                            >
                              お名前
                            </Label>
                            <Input
                              id="playerName"
                              value={playerName}
                              onChange={(e) => setPlayerName(e.target.value)}
                              placeholder="お名前を入力してください"
                              disabled={isSpinning}
                              className="h-12 px-4 border-2 border-gray-200 focus-visible:border-red-500 focus-visible:ring-0 transition-colors"
                            />
                            <AnimatePresence>
                              {error && (
                                <motion.p
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="text-sm text-red-500"
                                >
                                  {error}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        <div className="relative flex items-center justify-center">
                          <motion.div
                            animate={{
                              rotate: isSpinning ? 360 : 0,
                            }}
                            transition={{
                              duration: 1,
                              repeat: isSpinning ? Infinity : 0,
                              ease: "linear",
                            }}
                            className="relative w-48 h-48 flex items-center justify-center"
                          >
                            <div className="absolute top-3 right-4 rotate-12">
                              <Sparkles className="w-8 h-8 text-yellow-400" />
                            </div>
                            <div className="absolute bottom-4 left-2 -rotate-12">
                              <Coins className="w-10 h-10 text-yellow-500" />
                            </div>
                            <Gift
                              className="w-32 h-32 text-red-500 drop-shadow-lg relative"
                              strokeWidth={1.5}
                            />
                          </motion.div>
                          <AnimatePresence>
                            {isSpinning && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <Button
                          onClick={handleSpin}
                          disabled={isSpinning}
                          className={cn(
                            "w-full h-14 text-lg font-bold tracking-wider",
                            "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700",
                            "shadow-lg hover:shadow-xl transition-all duration-300",
                            "disabled:opacity-50 disabled:cursor-not-allowed"
                          )}
                        >
                          {isSpinning ? (
                            <span className="flex items-center gap-2">
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              >
                                <Coins className="w-5 h-5" />
                              </motion.span>
                              ガチャ回転中...
                            </span>
                          ) : (
                            "ガチャを回す"
                          )}
                        </Button>

                        <div className="text-center space-y-1 text-sm text-gray-500">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100 border-0"
                            onClick={() => setShowProbability(true)}
                          >
                            <Info className="w-4 h-4 mr-1" />
                            提供割合を確認する
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
