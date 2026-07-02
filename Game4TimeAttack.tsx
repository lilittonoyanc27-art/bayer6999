import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { timeAttackQuestions } from './data';
import { TimeAttackQuestion } from './types';
import { Zap, Clock, Star, RefreshCw, Trophy, Flame, Play } from 'lucide-react';

export default function Game4TimeAttack() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [questionsPool, setQuestionsPool] = useState<TimeAttackQuestion[]>([]);
  const [lastFeedback, setLastFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize pool of questions when starting
  const startGame = () => {
    // Shuffle questions
    const shuffled = [...timeAttackQuestions].sort(() => Math.random() - 0.5);
    setQuestionsPool(shuffled);
    setCurrentIdx(0);
    setTimeLeft(15);
    setScore(0);
    setStreak(0);
    setIsPlaying(true);
    setIsGameOver(false);
    setLastFeedback(null);
  };

  // Timer Countdown Effect
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsGameOver(true);
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, timeLeft]);

  // Handle high score updates
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  const currentQuestion = questionsPool[currentIdx];

  const handleAnswer = (verb: 'SER' | 'ESTAR') => {
    if (!isPlaying || isGameOver) return;

    const correct = currentQuestion.correctVerb === verb;
    const addedPoints = correct ? 10 * (Math.floor(streak / 3) + 1) : 0;

    if (correct) {
      setScore((prev) => prev + addedPoints);
      setStreak((prev) => prev + 1);
      setTimeLeft((prev) => Math.min(prev + 2, 20)); // cap max time at 20s
      setLastFeedback({
        isCorrect: true,
        text: `+${addedPoints} միավոր: Ճիշտ է՝ ${currentQuestion.explanation}`
      });
    } else {
      setStreak(0);
      setTimeLeft((prev) => Math.max(prev - 3, 0));
      setLastFeedback({
        isCorrect: false,
        text: `Օփս, սխալ է՝ ${currentQuestion.explanation}`
      });
    }

    // Move to next question or recycle pool
    if (currentIdx < questionsPool.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Re-shuffle to keep going infinitely
      const reshuffled = [...timeAttackQuestions].sort(() => Math.random() - 0.5);
      setQuestionsPool(reshuffled);
      setCurrentIdx(0);
    }
  };

  return (
    <div id="game-timeattack" className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl shadow-purple-500/5 border border-purple-100/60 overflow-hidden">
      {/* Game Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 p-6 text-white text-center relative shadow-lg overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute top-3 right-3 bg-white/15 border border-white/10 px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider">
          Ռեկորդ՝ {highScore}
        </div>
        <span className="bg-white/15 px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border border-white/10">
          Խաղ 4: Արագընթաց Բլից Հարցում
        </span>
        <h3 className="text-2xl font-black font-display mt-2 flex items-center justify-center space-x-1.5 tracking-tight">
          <Zap className="w-6 h-6 fill-amber-300 stroke-amber-300 animate-pulse" />
          <span>Մրցավազք Ժամանակի հետ</span>
        </h3>
        <p className="text-purple-100 text-xs mt-1 font-medium max-w-md mx-auto">
          Արագ ընտրեք SER կամ ESTAR: Ճիշտ պատասխանները ավելացնում են ժամանակը, իսկ հաղթանակների շարքը բազմապատկում է միավորները:
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {!isPlaying && !isGameOver ? (
          /* Start Screen */
          <div className="text-center py-10 space-y-6">
            <div className="inline-flex p-5 rounded-full bg-purple-50/50 border border-purple-100/45 mb-2 relative shadow-inner text-pink-500">
              <Zap className="w-10 h-10 fill-current" />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-2xl font-black font-display text-slate-800 tracking-tight">Պատրա՞ստ եք գիտելիքների արագ ստուգմանը:</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto font-medium leading-relaxed">
                Դուք ունեք <strong className="text-purple-600 font-extrabold">15 վայրկյան</strong> մեկնարկին: Յուրաքանչյուր ճիշտ պատասխան տալիս է <strong className="text-emerald-600 font-extrabold">+2 վ</strong>, իսկ սխալը խլում է <strong className="text-rose-600 font-extrabold">-3 վ</strong>: Հավաքեք 3 անընդմեջ ճիշտ պատասխանների շարք՝ կոմբո-բազմապատկիչ ստանալու համար:
              </p>
            </div>

            <button
              id="btn-timeattack-start"
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-purple-500/15 hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2.5 mx-auto cursor-pointer active:scale-95 animate-pulse"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Սկսել մրցավազքը</span>
            </button>
          </div>
        ) : isPlaying ? (
          /* Playing Screen */
          <div className="space-y-6">
            {/* Top Stats Bar */}
            <div className="grid grid-cols-3 gap-3">
              {/* Timer */}
              <div className="bg-rose-500/10 rounded-2xl p-3 border border-rose-200/50 flex flex-col items-center justify-center shadow-sm">
                <span className="text-[10px] uppercase font-black tracking-widest text-rose-600 flex items-center space-x-1 mb-0.5 animate-pulse">
                  <Clock className="w-3 h-3" />
                  <span>ԺԱՄԱՆԱԿ</span>
                </span>
                <span className="text-2xl font-black text-rose-600 font-mono">
                  {timeLeft}վ
                </span>
              </div>

              {/* Score */}
              <div className="bg-amber-500/10 rounded-2xl p-3 border border-amber-200/50 flex flex-col items-center justify-center shadow-sm">
                <span className="text-[10px] uppercase font-black tracking-widest text-amber-600 flex items-center space-x-1 mb-0.5">
                  <Star className="w-3 h-3" />
                  <span>ՄԻԱՎՈՐ</span>
                </span>
                <span className="text-2xl font-black text-amber-600 font-mono">
                  {score}
                </span>
              </div>

              {/* Streak */}
              <div className="bg-orange-500/10 rounded-2xl p-3 border border-orange-200/50 flex flex-col items-center justify-center shadow-sm">
                <span className="text-[10px] uppercase font-black tracking-widest text-orange-600 flex items-center space-x-1 mb-0.5">
                  <Flame className="w-3 h-3" />
                  <span>ՇԱՐՔ</span>
                </span>
                <span className="text-2xl font-black text-orange-600 font-mono flex items-center">
                  {streak}
                  {streak >= 3 && (
                    <span className="text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded-full ml-1 animate-bounce">
                      x{Math.floor(streak / 3) + 1}
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Question Text Card */}
            <div className="bg-purple-50/20 border border-purple-100/50 rounded-2xl p-6 text-center space-y-2 min-h-36 flex flex-col justify-center relative overflow-hidden shadow-inner">
              <span className="text-[10px] uppercase font-black tracking-widest text-purple-600/70 font-mono">
                {currentQuestion.translation}
              </span>
              <h4 className="text-2xl sm:text-3xl font-black font-display text-slate-800 tracking-wide leading-snug">
                {currentQuestion.sentence}
              </h4>
            </div>

            {/* Live feedback popup */}
            <div className="h-10 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {lastFeedback && (
                  <motion.div
                    key={lastFeedback.text}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className={`text-xs px-4 py-1.5 rounded-full font-semibold border ${
                      lastFeedback.isCorrect 
                        ? 'bg-emerald-500/10 text-emerald-800 border-emerald-200/50'
                        : 'bg-rose-500/10 text-rose-800 border-rose-200/50'
                    }`}
                  >
                    {lastFeedback.text}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Answer triggers */}
            <div className="grid grid-cols-2 gap-4">
              <button
                id="btn-timeattack-ser"
                onClick={() => handleAnswer('SER')}
                className="py-5 bg-gradient-to-tr from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black text-xl rounded-2xl shadow-lg shadow-pink-500/25 transition-all duration-300 active:scale-[0.97] cursor-pointer border border-pink-400/30"
              >
                SER
              </button>
              <button
                id="btn-timeattack-estar"
                onClick={() => handleAnswer('ESTAR')}
                className="py-5 bg-gradient-to-tr from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-black text-xl rounded-2xl shadow-lg shadow-indigo-500/25 transition-all duration-300 active:scale-[0.97] cursor-pointer border border-indigo-400/30"
              >
                ESTAR
              </button>
            </div>
          </div>
        ) : (
          /* Game Over Screen */
          <div className="text-center py-10 space-y-6">
            <div className="inline-flex p-5 rounded-full bg-purple-50/50 border border-purple-100/45 mb-2 relative shadow-inner text-amber-500">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-3xl font-black font-display text-slate-800 tracking-tight">Ժամանակն սպառվեց!</h4>
              <p className="text-sm text-slate-600 font-medium">Ձեր վերջնական հաշիվը այս մրցավազքում՝</p>
            </div>

            <div className="bg-purple-50/20 border border-purple-100/20 rounded-3xl p-6 max-w-sm mx-auto grid grid-cols-2 gap-4 shadow-inner">
              <div>
                <span className="text-[10px] uppercase font-black text-slate-400 font-mono block">ՎԵՐՋՆԱԿԱՆ ՀԱՇԻՎ</span>
                <span className="text-3xl font-black text-pink-600 font-mono">{score}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-black text-slate-400 font-mono block">ՌԵԿՈՐԴ</span>
                <span className="text-3xl font-black text-indigo-600 font-mono">{highScore}</span>
              </div>
            </div>

            <button
              id="btn-timeattack-retry"
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-black rounded-2xl transition-all duration-300 shadow-lg shadow-purple-500/20 flex items-center justify-center space-x-2 mx-auto cursor-pointer"
            >
              <RefreshCw className="w-4.5 h-4.5" />
              <span>Խաղալ ևս մեկ անգամ</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
