import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { mapStations } from './data';
import { Compass, RefreshCw, Award, ArrowRight, Sparkles } from 'lucide-react';

export default function Game5MapExplorer() {
  const [currentStationIdx, setCurrentStationIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const currentStation = mapStations[currentStationIdx];

  const handleOptionSelect = (option: string) => {
    if (showResult) return;
    setSelectedOption(option);
    const correct = option === currentStation.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    setSelectedOption(null);
    
    if (currentStationIdx < mapStations.length - 1) {
      setCurrentStationIdx((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentStationIdx(0);
    setSelectedOption(null);
    setShowResult(false);
    setIsCorrect(false);
    setIsFinished(false);
    setCorrectAnswersCount(0);
  };

  return (
    <div id="game-mapexplorer" className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl shadow-purple-500/5 border border-purple-100/60 overflow-hidden">
      {/* Game Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 p-6 text-white text-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        <span className="bg-white/15 px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border border-white/10">
          Խաղ 5: Քարտեզ-Ճանապարհորդություն
        </span>
        <h3 className="text-2xl font-black font-display mt-2 flex items-center justify-center space-x-1.5 tracking-tight">
          <Compass className="w-6 h-6 animate-spin-slow" />
          <span>Քերականական Էքսկուրսավար</span>
        </h3>
        <p className="text-purple-100 text-xs mt-1 font-medium max-w-md mx-auto">
          Կատարեք ճանապարհորդություն արևոտ Իսպանիայից մինչև հյուրընկալ Հայաստան՝ պատասխանելով ճանապարհին հանդիպող հարցերին:
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {!isFinished ? (
          <div className="space-y-6">
            {/* Interactive map visualization */}
            <div className="bg-indigo-50/25 border border-purple-100/40 rounded-3xl p-4 relative h-48 overflow-hidden shadow-inner">
              {/* Custom styled background representing sea and countries */}
              <div className="absolute inset-0 bg-indigo-50/10" />
              
              {/* Stylized land masses / borders (light green boxes/bubbles) */}
              <div className="absolute top-12 left-6 w-32 h-20 bg-purple-100/20 rounded-full blur-sm" />
              <div className="absolute top-8 right-12 w-28 h-20 bg-pink-100/20 rounded-full blur-sm" />
  
              {/* Draw connections lines between stations */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d={`M ${mapStations[0].coordinates.x}% ${mapStations[0].coordinates.y}% 
                     L ${mapStations[1].coordinates.x}% ${mapStations[1].coordinates.y}% 
                     L ${mapStations[2].coordinates.x}% ${mapStations[2].coordinates.y}% 
                     L ${mapStations[3].coordinates.x}% ${mapStations[3].coordinates.y}% 
                     L ${mapStations[4].coordinates.x}% ${mapStations[4].coordinates.y}% 
                     L ${mapStations[5].coordinates.x}% ${mapStations[5].coordinates.y}%`}
                  fill="none"
                  className="stroke-pink-400 stroke-2"
                  strokeDasharray="6 6"
                />
              </svg>
  
              {/* Station Markers */}
              {mapStations.map((station, idx) => {
                const isActive = idx === currentStationIdx;
                const isVisited = idx < currentStationIdx;
                
                return (
                  <div
                    key={station.id}
                    style={{ left: `${station.coordinates.x}%`, top: `${station.coordinates.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
                  >
                    <motion.div
                      animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                      transition={isActive ? { repeat: Infinity, duration: 1.5 } : {}}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                        isActive
                          ? 'bg-pink-500 text-white font-extrabold ring-4 ring-pink-200'
                          : isVisited
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white border-2 border-purple-100 text-purple-400'
                      }`}
                    >
                      {isVisited ? <span className="text-xs font-black">✓</span> : <span className="text-xs font-black">{idx + 1}</span>}
                    </motion.div>
                    <span className="text-[10px] font-black text-slate-800 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded-lg shadow-sm mt-1.5 whitespace-nowrap border border-purple-50/50">
                      {station.name}
                    </span>
                  </div>
                );
              })}
  
              {/* Current Active Pin Label */}
              <div className="absolute bottom-3 left-4 flex items-center space-x-1.5 bg-indigo-600 text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md shadow-indigo-600/10">
                <span>Կանգառ՝ {currentStation.name} ({currentStation.translation})</span>
              </div>
            </div>
  
            {/* Questions at current station */}
            <div className="bg-purple-50/20 border border-purple-100/50 rounded-2xl p-6 space-y-3 relative overflow-hidden shadow-inner">
              <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100/40 px-2.5 py-1 rounded-full uppercase">
                Հարց Կանգառում՝ {currentStationIdx + 1}
              </span>
              <h4 className="text-xl font-black text-slate-800 font-display tracking-tight">
                {currentStation.sentence}
              </h4>
              <p className="text-xs text-slate-400 font-medium italic">
                (Ընտրեք SER կամ ESTAR բայի համապատասխան ձևը)
              </p>
            </div>
  
            {/* Options Selection */}
            <div className="grid grid-cols-3 gap-3">
              {currentStation.options.map((option) => {
                const isSelected = selectedOption === option;
                const correct = currentStation.correctAnswer === option;
                
                let btnStyle = "border-purple-100 hover:border-purple-500 bg-white text-slate-850 hover:bg-purple-50/30 cursor-pointer";
                if (showResult) {
                  if (correct) {
                    btnStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-950 font-black";
                  } else if (isSelected) {
                    btnStyle = "bg-rose-500/10 border-rose-400 text-rose-950 font-black";
                  } else {
                    btnStyle = "opacity-50 border-purple-50/30 text-slate-400 pointer-events-none";
                  }
                }
  
                return (
                  <button
                    key={option}
                    id={`map-option-${option}`}
                    disabled={showResult}
                    onClick={() => handleOptionSelect(option)}
                    className={`py-4.5 rounded-2xl border-2 transition-all duration-300 font-mono font-black text-base text-center shadow-sm ${btnStyle}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
  
            {/* Answer Result & Explanation */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className={`p-5 rounded-2xl border flex items-start space-x-3 text-sm shadow-sm font-medium ${
                  isCorrect ? 'bg-emerald-500/10 border-emerald-200 text-emerald-950' : 'bg-rose-500/10 border-rose-200 text-rose-950'
                }`}>
                  <div className="space-y-1">
                    <span className="font-black text-sm">
                      {isCorrect ? 'Թռիչքը նորմալ է: Գերազանց ընտրություն:' : 'Շեղվեցիք կուրսից: Ճիշտ պատասխանն էր՝ ' + currentStation.correctAnswer}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">{currentStation.explanation}</p>
                  </div>
                </div>
  
                <button
                  id="btn-map-next"
                  onClick={handleNext}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-black rounded-2xl transition-all duration-300 shadow-lg shadow-purple-500/15 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>
                    {currentStationIdx < mapStations.length - 1 ? 'Թռչել դեպի հաջորդ կանգառը' : 'Ավարտել արշավախումբը'}
                  </span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          /* Travel Completed Screen */
          <div className="text-center space-y-8 py-6">
            <div className="inline-flex p-5 rounded-full bg-purple-50/50 border border-purple-100/45 mb-2 relative shadow-inner text-indigo-600">
              <Award className="w-14 h-14" />
              <div className="absolute top-0 right-0 bg-pink-500 text-white p-1 rounded-full">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
            </div>
  
            <div className="space-y-1.5">
              <h4 className="text-3xl font-black font-display text-slate-800 tracking-tight">Արշավախումբը հաջողությամբ ավարտվեց:</h4>
              <p className="text-sm text-slate-600 font-medium max-w-md mx-auto">
                Դուք անցել եք ողջ ճանապարհը Բարսելոնայից մինչև Երևան՝ տալով <strong className="text-pink-600 font-black">{correctAnswersCount}</strong> ճիշտ պատասխան <strong className="text-slate-850">{mapStations.length}</strong>-ից:
              </p>
            </div>
  
            {/* Medal card */}
            <div className="bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-indigo-500/5 border border-purple-100/50 rounded-3xl p-6 max-w-sm mx-auto space-y-2 shadow-inner">
              <span className="text-xs font-black text-pink-600 tracking-widest uppercase font-mono block">ՀԵՏԱԶՈՏՈՂԻ ԴԻՊԼՈՄ</span>
              <h5 className="font-black text-lg text-slate-850 font-display animate-pulse">SER և ESTAR բայերի վարպետ</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Տրվում է իսպանա-հայկական լեզվաբանական երթուղին հաջողությամբ հաղթահարելու և բոլոր քերականական կանոնները մանրամասն վերլուծելու համար:
              </p>
            </div>
  
            <button
              id="btn-map-restart"
              onClick={handleRestart}
              className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-black rounded-2xl transition-all duration-300 shadow-lg shadow-purple-500/20 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <RefreshCw className="w-4.5 h-4.5" />
              <span>Անցնել արշավախումբը նորից</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
