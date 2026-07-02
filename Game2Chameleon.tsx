import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { chameleonScenarios } from './data';
import { ChameleonScenario } from './types';
import { RefreshCw, Star, Info } from 'lucide-react';

export default function Game2Chameleon() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'SER' | 'ESTAR' | null>(null);
  const [solvedScenarios, setSolvedScenarios] = useState<{ scenario: ChameleonScenario; isCorrect: boolean }[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  
  const currentScenario = chameleonScenarios[currentIndex];

  // Colors of Chameleon depending on correctness / scenario
  const getChameleonColor = () => {
    if (selectedOption === null) {
      // Different base color per level
      const colors = ["fill-emerald-500", "fill-amber-500", "fill-teal-500", "fill-orange-400", "fill-indigo-500"];
      return colors[currentIndex % colors.length];
    }
    const isCorrect = selectedOption === currentScenario.correctOption;
    return isCorrect ? "fill-emerald-600 stroke-emerald-800" : "fill-rose-500 stroke-rose-800";
  };

  const handleOptionSelect = (option: 'SER' | 'ESTAR') => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    const isCorrect = option === currentScenario.correctOption;
    setSolvedScenarios((prev) => [...prev, { scenario: currentScenario, isCorrect }]);
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (currentIndex < chameleonScenarios.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setSolvedScenarios([]);
    setIsFinished(false);
  };

  const correctCount = solvedScenarios.filter((x) => x.isCorrect).length;

  return (
    <div id="game-chameleon" className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl shadow-purple-500/5 border border-purple-100/60 overflow-hidden">
      {/* Game Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 p-6 text-white text-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        <span className="bg-white/15 px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border border-white/10">
          Խաղ 2: Իմաստների Քամելեոն
        </span>
        <h3 className="text-2xl font-black font-display mt-2 tracking-tight">Մեկ ածական — երկու իմաստ:</h3>
        <p className="text-purple-100 text-xs mt-1 font-medium max-w-md mx-auto">
          Օգնեք մեր քամելեոնին ընտրել ճիշտ բայը՝ նուրբ իմաստն արտահայտելու համար:
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {!isFinished ? (
          <div className="space-y-6">
            {/* Chameleon Area */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-32 h-32 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full transition-all duration-500">
                  {/* Eye */}
                  <circle cx="65" cy="30" r="8" className="fill-white stroke-slate-700" strokeWidth="2" />
                  <circle cx="67" cy="30" r="3" className="fill-slate-800" />
                  {/* Chameleon Body */}
                  <path
                    d="M 15,60 C 15,30 35,15 65,25 C 75,28 85,38 80,50 C 75,58 60,65 50,65 C 40,65 30,70 25,80 C 22,85 10,85 10,75 C 10,70 15,65 15,60 Z"
                    className={`${getChameleonColor()} transition-colors duration-500 stroke-2 stroke-slate-800`}
                  />
                  {/* Tail spiral */}
                  <path d="M 12,75 C 5,72 8,60 15,63" fill="none" className="stroke-slate-800" strokeWidth="2" />
                  {/* Legs */}
                  <path d="M 32,65 L 32,82 M 35,82 L 29,82" className="stroke-slate-800" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 52,65 L 52,82 M 55,82 L 49,82" className="stroke-slate-800" strokeWidth="3" strokeLinecap="round" />
                  {/* Smile */}
                  <path d="M 72,40 Q 68,43 65,40" fill="none" className="stroke-slate-800" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              {/* Scenario description block */}
              <div className="bg-purple-50/20 border border-purple-100/50 rounded-2xl p-5 text-center space-y-3 w-full shadow-inner">
                <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100/40 px-2.5 py-1 rounded-full uppercase">
                  Մակարդակ {currentIndex + 1} / {chameleonScenarios.length}-ից
                </span>
                <h4 className="text-xl font-black text-slate-800 font-display tracking-tight">
                  {currentScenario.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto font-sans font-medium">
                  {currentScenario.description}
                </p>
                <div className="p-3.5 bg-white/95 rounded-xl border border-purple-100/30 text-xs text-slate-500 italic font-medium shadow-sm">
                  &ldquo;{currentScenario.context}&rdquo;
                </div>
              </div>
            </div>

            {/* Options selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option SER */}
              <button
                id="btn-chameleon-ser"
                disabled={selectedOption !== null}
                onClick={() => handleOptionSelect('SER')}
                className={`p-5 rounded-2xl border-2 text-left transition-all duration-300 hover:-translate-y-0.5 relative ${
                  selectedOption === null
                    ? 'border-purple-100/60 bg-white/95 hover:border-purple-400 hover:shadow-md cursor-pointer'
                    : selectedOption === 'SER' && currentScenario.correctOption === 'SER'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-950 font-black shadow-md shadow-emerald-500/5'
                    : selectedOption === 'SER' && currentScenario.correctOption !== 'SER'
                    ? 'border-rose-400 bg-rose-500/10 text-rose-950 font-black shadow-md shadow-rose-500/5'
                    : 'border-purple-50/30 bg-white/45 opacity-60 text-slate-400'
                }`}
              >
                <div className="font-mono text-[9px] uppercase font-black text-slate-400 mb-1 tracking-wider">SER բայով՝</div>
                <div className="font-extrabold text-base text-slate-800">{currentScenario.optionSer}</div>
                <div className="text-xs text-slate-500 mt-1 italic font-medium">{currentScenario.meaningSer}</div>
              </button>

              {/* Option ESTAR */}
              <button
                id="btn-chameleon-estar"
                disabled={selectedOption !== null}
                onClick={() => handleOptionSelect('ESTAR')}
                className={`p-5 rounded-2xl border-2 text-left transition-all duration-300 hover:-translate-y-0.5 relative ${
                  selectedOption === null
                    ? 'border-purple-100/60 bg-white/95 hover:border-purple-400 hover:shadow-md cursor-pointer'
                    : selectedOption === 'ESTAR' && currentScenario.correctOption === 'ESTAR'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-950 font-black shadow-md shadow-emerald-500/5'
                    : selectedOption === 'ESTAR' && currentScenario.correctOption !== 'ESTAR'
                    ? 'border-rose-400 bg-rose-500/10 text-rose-950 font-black shadow-md shadow-rose-500/5'
                    : 'border-purple-50/30 bg-white/45 opacity-60 text-slate-400'
                }`}
              >
                <div className="font-mono text-[9px] uppercase font-black text-slate-400 mb-1 tracking-wider">ESTAR բայով՝</div>
                <div className="font-extrabold text-base text-slate-800">{currentScenario.optionEstar}</div>
                <div className="text-xs text-slate-500 mt-1 italic font-medium">{currentScenario.meaningEstar}</div>
              </button>
            </div>

            {/* Explanation & Next controls */}
            {selectedOption !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-4.5 rounded-2xl border flex items-start space-x-3 text-sm bg-indigo-50/40 border-indigo-100/60 shadow-sm font-medium">
                  <Info className="w-5.5 h-5.5 text-indigo-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-black text-slate-800 text-sm">
                      {selectedOption === currentScenario.correctOption ? '¡Exacto! Լիովին ճիշտ է՛։' : 'Օփս, արի՛ հասկանանք՝'}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">{currentScenario.explanation}</p>
                  </div>
                </div>

                <button
                  id="btn-chameleon-next"
                  onClick={handleNext}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-black rounded-2xl transition-all duration-300 shadow-lg shadow-purple-500/15 hover:opacity-95 cursor-pointer"
                >
                  Հաջորդ մակարդակը
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          /* Chameleon Game Ends */
          <div className="text-center space-y-8 py-6">
            <div className="inline-flex p-5 rounded-full bg-purple-50/50 border border-purple-100/45 mb-2 relative shadow-inner">
              <Star className="w-12 h-12 text-pink-500 fill-current" />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-3xl font-black font-display text-slate-800 tracking-tight">Քամելեոնը շատ գոհ է՛։</h4>
              <p className="text-sm text-slate-600 font-medium">
                Դուք ճիշտ եք որոշել իմաստային նրբությունները <strong className="text-pink-600 font-black">{correctCount}</strong>-ում <strong className="text-slate-850">{chameleonScenarios.length}</strong> իրավիճակներից։
              </p>
            </div>

            {/* Scenarios summary */}
            <div className="space-y-2 max-w-md mx-auto text-left text-xs bg-purple-50/20 border border-purple-100/20 rounded-2xl p-4">
              {solvedScenarios.map((solved, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-purple-100/10 last:border-0">
                  <span className="text-slate-700 font-semibold">{solved.scenario.title}</span>
                  <span className={`px-2.5 py-1 rounded-full font-extrabold text-[10px] ${
                    solved.isCorrect ? 'bg-emerald-500/10 text-emerald-800 border border-emerald-200/50' : 'bg-rose-500/10 text-rose-800 border border-rose-200/50'
                  }`}>
                    {solved.isCorrect ? 'Ճիշտ է' : 'Սխալ է'}
                  </span>
                </div>
              ))}
            </div>

            <button
              id="btn-chameleon-restart"
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
