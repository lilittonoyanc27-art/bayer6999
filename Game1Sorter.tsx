import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sorterItems } from './data';
import { SorterItem } from './types';
import { Check, AlertCircle, RefreshCw, Trophy } from 'lucide-react';

export default function Game1Sorter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [solvedItems, setSolvedItems] = useState<{ item: SorterItem; isCorrect: boolean }[]>([]);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState<string | null>(null);

  const currentItem = sorterItems[currentIndex];

  const handleSort = (category: 'SER' | 'ESTAR') => {
    if (showExplanation !== null) return; // Prevent clicking while reviewing
    
    const isCorrect = currentItem.category === category;
    setSlideDirection(category === 'SER' ? 'left' : 'right');
    
    // Add to history list
    setSolvedItems((prev) => [...prev, { item: currentItem, isCorrect }]);
    
    // Trigger explanation/feedback
    setShowExplanation(
      isCorrect 
        ? `¡Correcto! «${currentItem.text}»-ը (${currentItem.translation}) վերաբերում է ${category}-ին ըստ կանոնի՝ ${currentItem.reason}։` 
        : `¡Incorrecto! «${currentItem.text}»-ը (${currentItem.translation}) իրականում վերաբերում է ${currentItem.category}-ին ըստ կանոնի՝ ${currentItem.reason}։`
    );
  };

  const handleNext = () => {
    setShowExplanation(null);
    setSlideDirection(null);
    
    if (currentIndex < sorterItems.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSolvedItems([]);
    setSlideDirection(null);
    setIsFinished(false);
    setShowExplanation(null);
  };

  const correctCount = solvedItems.filter((x) => x.isCorrect).length;

  return (
    <div id="game-sorter" className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl shadow-purple-500/5 border border-purple-100/60 overflow-hidden">
      {/* Game Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 p-6 text-white text-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        <span className="bg-white/15 px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border border-white/10">
          Խաղ 1: DOCTOR & PLACE Տեսակավորող
        </span>
        <h3 className="text-2xl font-black font-display mt-2 tracking-tight">Ո՞ւր ուղարկել արտահայտությունը:</h3>
        <p className="text-purple-100 text-xs mt-1 font-medium max-w-md mx-auto">
          Տեղադրեք արտահայտությունները ճիշտ զամբյուղների մեջ՝ SER (մշտական/էություն) կամ ESTAR (ժամանակավոր/գտնվելու վայր):
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {!isFinished ? (
          <div className="space-y-6">
            {/* Cards container */}
            <div className="h-64 flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: slideDirection === 'left' ? -100 : slideDirection === 'right' ? 100 : 0,
                    rotate: slideDirection === 'left' ? -5 : slideDirection === 'right' ? 5 : 0
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 150, damping: 15 }}
                  className="w-72 bg-gradient-to-tr from-purple-50/20 via-white to-pink-50/10 border-2 border-purple-100/50 rounded-3xl p-6 shadow-xl shadow-purple-500/5 text-center flex flex-col justify-between h-56 relative overflow-hidden"
                >
                  <div className="absolute top-3 right-3 text-[10px] font-black text-slate-400 font-mono">
                    {currentIndex + 1} / {sorterItems.length}
                  </div>

                  {/* Word / Phrase */}
                  <div className="my-auto space-y-2">
                    <h4 className="text-3xl font-black font-display text-slate-800 tracking-wide">
                      {currentItem.text}
                    </h4>
                    <p className="text-sm text-slate-500 italic font-medium">
                      ({currentItem.translation})
                    </p>
                  </div>

                  {/* Hints */}
                  <div className="text-[10px] uppercase font-black tracking-widest text-pink-600/95 bg-pink-50/50 border border-pink-100/40 px-3 py-1.5 rounded-full inline-block mx-auto shadow-sm">
                    Կատեգորիա՝ {currentItem.acronymLabel}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Explanations & Controls */}
            {showExplanation ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className={`p-4 rounded-2xl border flex items-start space-x-3 text-sm font-medium leading-relaxed ${
                  solvedItems[solvedItems.length - 1]?.isCorrect
                    ? 'bg-emerald-500/10 border-emerald-200 text-emerald-950 shadow-sm'
                    : 'bg-rose-500/10 border-rose-200 text-rose-950 shadow-sm'
                }`}>
                  {solvedItems[solvedItems.length - 1]?.isCorrect ? (
                    <Check className="w-5.5 h-5.5 shrink-0 text-emerald-600 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5.5 h-5.5 shrink-0 text-rose-600 mt-0.5" />
                  )}
                  <span>{showExplanation}</span>
                </div>

                <button
                  id="btn-sorter-next"
                  onClick={handleNext}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-purple-500/15 hover:opacity-95 transition-all duration-300 cursor-pointer"
                >
                  Հաջորդ արտահայտությունը
                </button>
              </motion.div>
            ) : (
              /* Sorter Action Buttons */
              <div className="grid grid-cols-2 gap-4">
                <button
                  id="btn-sort-ser"
                  onClick={() => handleSort('SER')}
                  className="py-4.5 bg-gradient-to-tr from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black rounded-2xl shadow-lg shadow-pink-500/25 active:scale-95 transition-all duration-300 text-center flex flex-col items-center justify-center space-y-1 cursor-pointer border border-pink-400/40"
                >
                  <span className="text-xl font-black tracking-wider font-display">SER</span>
                  <span className="text-[10px] text-pink-50 font-semibold tracking-wide">DOCTOR (Մշտական)</span>
                </button>

                <button
                  id="btn-sort-estar"
                  onClick={() => handleSort('ESTAR')}
                  className="py-4.5 bg-gradient-to-tr from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-black rounded-2xl shadow-lg shadow-indigo-500/25 active:scale-95 transition-all duration-300 text-center flex flex-col items-center justify-center space-y-1 cursor-pointer border border-indigo-400/40"
                >
                  <span className="text-xl font-black tracking-wider font-display">ESTAR</span>
                  <span className="text-[10px] text-indigo-50 font-semibold tracking-wide font-sans">PLACE (Ժամանակավոր)</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Game 1 End Screen */
          <div className="text-center space-y-8 py-6">
            <div className="inline-flex p-5 rounded-full bg-purple-50/50 border border-purple-100/45 mb-2 relative shadow-inner">
              <Trophy className="w-12 h-12 text-pink-500" />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-3xl font-black font-display text-slate-800 tracking-tight">Տեսակավորման արդյունքները</h4>
              <p className="text-sm text-slate-600 font-medium">
                Դուք ճիշտ եք տեսակավորել <strong className="text-pink-600 font-black">{correctCount}</strong>-ը <strong className="text-slate-800">{sorterItems.length}</strong> արտահայտություններից:
              </p>
            </div>

            {/* List of items and results */}
            <div className="max-h-60 overflow-y-auto rounded-2xl border border-purple-100/30 bg-purple-50/20 divide-y divide-purple-100/20 text-left text-xs">
              {solvedItems.map((solved, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800">{solved.item.text}</span>{' '}
                    <span className="text-slate-500">({solved.item.translation})</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">
                      Ճիշտ է՝ <strong className="text-purple-600 font-bold">{solved.item.category}</strong> — {solved.item.acronymLabel}
                    </span>
                  </div>
                  <span>
                    {solved.isCorrect ? (
                      <span className="bg-emerald-500/10 text-emerald-800 border border-emerald-200/55 px-2.5 py-1 rounded-full font-extrabold text-[10px]">Ճիշտ է</span>
                    ) : (
                      <span className="bg-rose-500/10 text-rose-800 border border-rose-200/55 px-2.5 py-1 rounded-full font-extrabold text-[10px]">Սխալ է</span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            <button
              id="btn-restart-sorter"
              onClick={handleRestart}
              className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-black rounded-2xl transition-all duration-300 shadow-lg shadow-purple-500/20 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <RefreshCw className="w-4.5 h-4.5" />
              <span>Խաղալ նորից</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
