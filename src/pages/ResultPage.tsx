import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { useGacha } from "../contexts";
import { motion } from "framer-motion";
import { Coins } from "lucide-react";

export function ResultPage() {
  const navigate = useNavigate();
  const { result } = useGacha();

  useEffect(() => {
    if (!result) {
      navigate("/");
    }
  }, [result, navigate]);

  if (!result) {
    return null;
  }

  return (
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

          <div className="relative space-y-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex justify-center"
            >
              <div className="relative">
                <Coins className="w-24 h-24 text-yellow-500" />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-yellow-400/30 rounded-full blur-xl"
                />
              </div>
            </motion.div>

            <div className="text-center space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-bold bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent"
              >
                {result.playerName}さん
                <br />
                おめでとうございます！
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <div className="text-5xl font-bold text-red-500 tracking-wider">
                  ¥{result.amount.toLocaleString()}
                </div>
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-red-400/20 blur-2xl rounded-full"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-gray-600"
              >
                今年も良い年になりますように！
              </motion.p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
