import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { scrambledSentences } from './data';
import { ScrambledSentence } from './types';
import { RefreshCw, Star, ArrowLeftRight } from 'lucide-react';

export default function Game3Scrambler() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [constructedWords, setConstructedWords] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [solvedHistory, setSolvedHistory] = useState<{ sentence: ScrambledSentence; isCorrect: boolean }[]>([]);

  const currentSentence = scrambledSentences[currentIndex];

  useEffect(() => {
    if (currentSentence) {
      // Setup current sentence
      setAvailableWords([...currentSentence.scrambledWords]);
      setConstructedWords([]);
      setIsChecked(false);
      setIsCorrect(false);
    }
  }, [currentIndex, currentSentence]);

  const handleWordClick = (word: string, fromAvailable: boolean) => {
    if (isChecked) return; // Locked once checked
    
    if (fromAvailable) {
      // Find index in available, remove ONE instance, append to constructed
      const idx = availableWords.indexOf(word);
      if (idx !== -1) {
        const nextAvail = [...availableWords];
        nextAvail.splice(idx, 1);
        setAvailableWords(nextAvail);
        setConstructedWords([...constructedWords, word]);
      }
    } else {
      // Remove from constructed, return to available
      const idx = constructedWords.indexOf(word);
      if (idx !== -1) {
        const nextConstructed = [...constructedWords];
        nextConstructed.splice(idx, 1);
        setConstructedWords(nextConstructed);
        setAvailableWords([...availableWords, word]);
      }
    }
  };

  const handleCheck = () => {
    if (constructedWords.length === 0) return;
    
    const correctStr = currentSentence.correctWords.join(' ').toLowerCase();
    const userStr = constructedWords.join(' ').toLowerCase();
    
    const success = correctStr === userStr;
    setIsCorrect(success);
    setIsChecked(true);
    
    setSolvedHistory((prev) => [...prev, { sentence: currentSentence, isCorrect: success }]);
  };

  const handleNext = () => {
    if (currentIndex < scrambledSentences.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSolvedHistory([]);
    setIsFinished(false);
  };

  const correctCount = solvedHistory.filter(x => x.isCorrect).length;

  return (
    <div id="game-scrambler" className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl shadow-purple-500/5 border border-purple-100/60 overflow-hidden">
      {/* Game Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 p-6 text-white text-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        <span className="bg-white/15 px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border border-white/10">
          Խաղ 3: Նախադասությունների Կառուցող
        </span>
        <h3 className="text-2xl font-black font-display mt-2 tracking-tight">Հավաքիր նախադասությունը կտորներից</h3>
        <p className="text-purple-100 text-xs mt-1 font-medium max-w-md mx-auto">
          Տեղադրեք բառերը իսպաներենի ճիշտ շարահյուսական կարգով՝ օգտագործելով ճիշտ բայը։
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {!isFinished ? (
          <div className="space-y-6">
            {/* Translation Cue */}
            <div className="bg-purple-50/20 border border-purple-100/50 p-5 rounded-2xl flex items-center justify-between shadow-sm">
              <div>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-0.5">ՆԱԽԱԴԱՍՈՒԹՅԱՆ ԹԱՐԳՄԱՆՈՒԹՅՈՒՆԸ՝</span>
                <span className="text-base font-extrabold text-slate-800">{currentSentence.translation}</span>
              </div>
              <span className="text-xs font-black px-3 py-1.5 bg-pink-50/80 border border-pink-100 text-pink-700 rounded-xl shadow-sm uppercase tracking-wider">
                {currentSentence.verbType}
              </span>
            </div>

            {/* Answer Board */}
            <div className="min-h-24 p-5 rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/10 flex flex-wrap gap-2.5 items-center content-center relative shadow-inner">
              {constructedWords.length === 0 && (
                <div className="text-slate-400 text-sm absolute inset-0 flex items-center justify-center font-bold">
                  Կտտացրեք ներքևի բառերին՝ նախադասություն կազմելու համար
                </div>
              )}
              {constructedWords.map((word, idx) => (
                <motion.button
                  key={`constructed-${idx}`}
                  layoutId={`word-${word}`}
                  onClick={() => handleWordClick(word, false)}
                  className={`px-4.5 py-3 bg-white border border-purple-100 hover:border-pink-500 hover:text-pink-600 rounded-2xl font-black shadow-sm text-slate-850 cursor-pointer text-sm transition-all duration-300 ${
                    isChecked ? 'opacity-90 pointer-events-none' : ''
                  }`}
                >
                  {word}
                </motion.button>
              ))}
            </div>

            {/* Available Words pool */}
            {!isChecked && (
              <div className="space-y-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">ՀԱՍԱՆԵԼԻ ԲԱՌԵՐԸ՝</span>
                <div className="flex flex-wrap gap-2.5 justify-center p-4 bg-purple-50/20 rounded-2xl border border-purple-100/20 shadow-inner">
                  <AnimatePresence>
                    {availableWords.map((word, idx) => (
                      <motion.button
                        key={`available-${idx}`}
                        layoutId={`word-${word}`}
                        onClick={() => handleWordClick(word, true)}
                        className="px-4.5 py-3 bg-white border border-purple-100/60 hover:border-purple-400 hover:shadow-md rounded-2xl font-extrabold shadow-sm text-slate-850 cursor-pointer text-sm hover:-translate-y-0.5 transition-all duration-300"
                      >
                        {word}
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Correctness / Incorrectness Indicator */}
            {isChecked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-5 rounded-2xl border flex items-start space-x-3 shadow-sm font-medium ${
                  isCorrect 
                    ? 'bg-emerald-500/10 border-emerald-200 text-emerald-950' 
                    : 'bg-rose-500/10 border-rose-200 text-rose-950'
                }`}
              >
                <div className="space-y-1 text-sm">
                  <span className="font-black text-sm">
                    {isCorrect ? '¡Felicidades! Ճիշտ կազմված նախադասություն։' : 'Սխալ՝ բառերի դասավորության կամ բայի ձևի մեջ։'}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{currentSentence.explanation}</p>
                  {!isCorrect && (
                    <div className="text-xs font-black font-mono text-slate-700 bg-white/50 p-2 rounded-lg border border-rose-100 mt-2">
                      Ճիշտ տարբերակը՝ <span className="text-purple-700 font-extrabold">{currentSentence.correctWords.join(' ')}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Check / Next Actions */}
            <div className="pt-2">
              {!isChecked ? (
                <button
                  id="btn-scrambler-check"
                  disabled={constructedWords.length === 0}
                  onClick={handleCheck}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-purple-500/15 hover:opacity-95 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                >
                  Ստուգել բառերի կարգը
                </button>
              ) : (
                <button
                  id="btn-scrambler-next"
                  onClick={handleNext}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-purple-500/15 hover:opacity-95 transition-all duration-300 cursor-pointer"
                >
                  {currentIndex < scrambledSentences.length - 1 ? 'Հաջորդ նախադասությունը' : 'Ցույց տալ արդյունքները'}
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Game 3 Ends */
          <div className="text-center space-y-8 py-6">
            <div className="inline-flex p-5 rounded-full bg-purple-50/50 border border-purple-100/45 mb-2 relative shadow-inner">
              <Star className="w-12 h-12 text-pink-500 fill-current" />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-3xl font-black font-display text-slate-800 tracking-tight">Կառուցողը յուրացված է՛։</h4>
              <p className="text-sm text-slate-600 font-medium">
                Դուք ճիշտ եք կազմել կառուցվածքը <strong className="text-pink-600 font-black">{correctCount}</strong>-ում <strong className="text-slate-850">{scrambledSentences.length}</strong> նախադասություններից։
              </p>
            </div>

            <button
              id="btn-scrambler-restart"
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
