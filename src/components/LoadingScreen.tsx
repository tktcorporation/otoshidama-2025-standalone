import { motion } from 'framer-motion';
import { Gift, Sparkles } from 'lucide-react';

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex items-center justify-center z-50"
    >
      <div className="text-center space-y-8">
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Gift className="w-24 h-24 text-white" />
          <motion.div
            className="absolute inset-0"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Sparkles className="w-8 h-8 text-yellow-300 absolute -top-4 left-1/2" />
            <Sparkles className="w-8 h-8 text-yellow-300 absolute top-1/2 -right-4" />
            <Sparkles className="w-8 h-8 text-yellow-300 absolute -bottom-4 left-1/2" />
            <Sparkles className="w-8 h-8 text-yellow-300 absolute top-1/2 -left-4" />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-white">お年玉を準備中...</h2>
          <p className="text-white/80">素敵な金額が当たりますように！</p>
        </motion.div>
      </div>
    </motion.div>
  );
}