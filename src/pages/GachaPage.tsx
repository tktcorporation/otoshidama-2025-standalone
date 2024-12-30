import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Gift, Sparkles, Coins } from 'lucide-react';
import { cn } from '../lib/utils';
import { OTOSHIDAMA_CONFIG, spinGacha } from '../lib/gacha';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingScreen } from '../components/LoadingScreen';
import { GachaContext } from '../App';

export function GachaPage() {
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const { setResult } = useContext(GachaContext);

  const handleSpin = () => {
    if (!playerName.trim()) {
      setError('お名前を入力してください');
      return;
    }
    setError('');
    setIsSpinning(true);
    setShowLoading(true);
    
    setTimeout(() => {
      const amount = spinGacha(OTOSHIDAMA_CONFIG);
      setResult({ playerName: playerName.trim(), amount });
      navigate('/result');
    }, 3000);
  };

  return (
    <>
      <AnimatePresence>
        {showLoading && <LoadingScreen />}
      </AnimatePresence>
      
      <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-gradient-to-br from-red-500 via-red-600 to-red-700 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="relative overflow-hidden backdrop-blur-lg bg-white/90 p-6 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-white/10 pointer-events-none" />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative space-y-6"
            >
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                  お年玉ガチャ
                </h1>
                <p className="text-gray-600">今年はいくらもらえるかな？</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="playerName" className="text-sm font-medium">
                    お名前
                  </Label>
                  <Input
                    id="playerName"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="お名前を入力してください"
                    disabled={isSpinning}
                    className="h-12 px-4 border-2 focus:ring-red-500"
                  />
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm text-red-500"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="relative aspect-square flex items-center justify-center p-4">
                <motion.div
                  animate={{
                    rotate: isSpinning ? 360 : 0,
                  }}
                  transition={{
                    duration: 1,
                    repeat: isSpinning ? Infinity : 0,
                    ease: "linear"
                  }}
                  className="w-48 h-48 rounded-full border-8 border-red-600/30 flex items-center justify-center relative"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/20 to-transparent" />
                  <Gift className="w-20 h-20 text-red-600" />
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
                  "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
                  "shadow-lg hover:shadow-xl transition-all duration-300",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {isSpinning ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Coins className="w-5 h-5" />
                    </motion.span>
                    ガチャ回転中...
                  </span>
                ) : (
                  'ガチャを回す'
                )}
              </Button>

              <div className="text-center space-y-1 text-sm text-gray-500">
                <p>当選金額: ¥1,000 ～ ¥10,000</p>
              </div>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </>
  );
}