import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { quizQuestions } from './data';
import { Question } from './types';
import { CheckCircle, XCircle, ArrowRight, RefreshCw, Eye, HelpCircle, Star, Sparkles } from 'lucide-react';

export default function MainQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: 'A' | 'B' | 'C' }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  
  // To support retrying only the mistakes
  const [onlyMistakesMode, setOnlyMistakesMode] = useState(false);
  const [activeQuestionList, setActiveQuestionList] = useState<Question[]>(quizQuestions);

  const currentQuestion = activeQuestionList[currentIndex];

  const handleOptionSelect = (option: 'A' | 'B' | 'C') => {
    if (selectedOption !== null) return; // Prevent changing answer
    setSelectedOption(option);
    setUserAnswers({ ...userAnswers, [currentQuestion.id]: option });
    
    const isCorrect = option === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setShowTranslation(false);

    if (currentIndex < activeQuestionList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setUserAnswers({});
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
    setShowTranslation(false);
    setOnlyMistakesMode(false);
    setActiveQuestionList(quizQuestions);
  };

  const handleRetryMistakes = () => {
    const mistakes = activeQuestionList.filter(q => userAnswers[q.id] !== q.correctAnswer);
    if (mistakes.length === 0) return;
    
    setActiveQuestionList(mistakes);
    setCurrentIndex(0);
    setSelectedOption(null);
    setUserAnswers({});
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
    setShowTranslation(false);
    setOnlyMistakesMode(true);
  };

  // Helper for rendering summary messages
  const getSummaryFeedback = () => {
    const percentage = Math.round((score / activeQuestionList.length) * 100);
    if (percentage === 100) return { title: "¡Excelente! Կատարյալ է՛:", desc: "Դուք հիանալի տիրապետում եք Ser-ի և Estar-ի տարբերությանը:", color: "text-emerald-600", bg: "bg-emerald-50", emoji: "🏆" };
    if (percentage >= 80) return { title: "¡Muy bien! Գերազանց արդյունք:", desc: "Հրաշալի գիտելիքներ: Դուք թույլ եք տվել ընդամենը մի քանի փոքր սխալ:", color: "text-teal-600", bg: "bg-teal-50", emoji: "⭐" };
    if (percentage >= 50) return { title: "¡Buen intento! Լավ փորձ էր:", desc: "Դուք հասկանում եք հիմունքները, բայց որոշ կանոններ արժե կրկնել:", color: "text-amber-600", bg: "bg-amber-50", emoji: "👍" };
    return { title: "¡Sigue practicando! Հարկավոր է մարզվել:", desc: "Խորհուրդ ենք տալիս ուսումնասիրել կանոնները «Տեսություն» բաժնում և փորձել նորից:", color: "text-rose-600", bg: "bg-rose-50", emoji: "📚" };
  };

  const feedback = getSummaryFeedback();

  return (
    <div id="main-quiz" className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl shadow-purple-500/5 border border-purple-100/60 overflow-hidden">
      {!isFinished ? (
        <div className="p-6 sm:p-8">
          {/* Progress and Score Bar */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400 font-mono">
              {onlyMistakesMode ? 'Սխալների ուղղում' : 'Հիմնական հարցաշար'}
            </span>
            <span className="text-sm font-black text-purple-700 bg-purple-50 border border-purple-100/40 px-3.5 py-1.5 rounded-full">
              Հարց {currentIndex + 1} / {activeQuestionList.length}-ից
            </span>
          </div>

          {/* Progress Bar with high vibrancy gradient */}
          <div className="w-full bg-purple-50 h-2.5 rounded-full mb-8 overflow-hidden border border-purple-100/20 shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / activeQuestionList.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Question card */}
              <div className="bg-rose-50/45 rounded-3xl p-6 sm:p-8 border border-rose-100/60 relative overflow-hidden shadow-inner">
                <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-bl-full animate-pulse" />
                <div className="flex items-center space-x-2 text-xs font-extrabold text-pink-600 uppercase tracking-widest mb-3">
                  <Sparkles className="w-4 h-4 text-pink-500" />
                  <span>{currentQuestion.rule}</span>
                </div>
                
                {/* Spanish Sentence */}
                <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-800 leading-normal tracking-wide">
                  {currentQuestion.sentence}
                </h3>

                {/* Optional translation helper */}
                <div className="mt-4">
                  <button
                    id={`toggle-translation-${currentQuestion.id}`}
                    onClick={() => setShowTranslation(!showTranslation)}
                    className="inline-flex items-center space-x-1 text-xs text-purple-500 hover:text-purple-700 font-bold transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{showTranslation ? 'Թաքցնել թարգմանությունը' : 'Ցույց տալ թարգմանությունը'}</span>
                  </button>
                  <AnimatePresence>
                    {showTranslation && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-slate-600 font-medium italic mt-2.5 bg-white border border-purple-100/40 p-3 rounded-xl shadow-sm leading-relaxed"
                      >
                        {currentQuestion.translation}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3.5">
                {(['A', 'B', 'C'] as const).map((key) => {
                  const optionText = currentQuestion.options[key];
                  const isSelected = selectedOption === key;
                  const isCorrect = currentQuestion.correctAnswer === key;
                  const isWrong = isSelected && !isCorrect;

                  let optionStyle = "border-purple-100/60 bg-white/95 text-slate-800 hover:border-purple-400 hover:bg-purple-50/10 cursor-pointer shadow-sm";
                  if (selectedOption !== null) {
                    if (isCorrect) {
                      optionStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-950 font-bold shadow-md shadow-emerald-500/5";
                    } else if (isWrong) {
                      optionStyle = "bg-rose-500/10 border-rose-500 text-rose-950 font-bold shadow-md shadow-rose-500/5";
                    } else {
                      optionStyle = "opacity-50 border-purple-50/30 text-slate-400 bg-white/40";
                    }
                  }

                  return (
                    <button
                      key={key}
                      id={`option-${key}-${currentQuestion.id}`}
                      disabled={selectedOption !== null}
                      onClick={() => handleOptionSelect(key)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between text-base font-extrabold ${optionStyle} hover:-translate-y-0.5`}
                    >
                      <span className="flex items-center space-x-3.5">
                        <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm transition-all duration-300 ${
                          isSelected ? 'bg-gradient-to-tr from-pink-500 to-rose-500 text-white shadow-md' : 'bg-purple-50 text-purple-600 border border-purple-100/40'
                        }`}>
                          {key}
                        </span>
                        <span>{optionText}</span>
                      </span>

                      {/* Right feedback icon */}
                      {selectedOption !== null && (
                        <span>
                          {isCorrect && <CheckCircle className="w-5.5 h-5.5 text-emerald-600" />}
                          {isWrong && <XCircle className="w-5.5 h-5.5 text-rose-600" />}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-5 rounded-2xl bg-indigo-50/40 border border-indigo-100/60 space-y-2 mt-4"
                  >
                    <div className="flex items-center space-x-2 text-xs font-black text-indigo-600">
                      <HelpCircle className="w-4 h-4 text-indigo-500" />
                      <span>ԻՆՉՈ՞Ւ ԱՅՍ ՏԱՐԲԵՐԱԿԸ:</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed font-sans font-medium">
                      {currentQuestion.explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Button */}
              {selectedOption !== null && (
                <motion.button
                  id="quiz-next-button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleNext}
                  className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white rounded-2xl font-black flex items-center justify-center space-x-2 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 shadow-md active:scale-[0.98] cursor-pointer mt-6"
                >
                  <span>
                    {currentIndex < activeQuestionList.length - 1 ? 'Հաջորդ հարցը' : 'Ավարտել հարցաշարը'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* Quiz Finished Screen */
        <div className="p-8 text-center space-y-8">
          <div className="inline-flex p-5 rounded-full bg-purple-50/50 border border-purple-100/45 mb-2 relative shadow-inner">
            <span className="text-6xl">{feedback.emoji}</span>
            <div className="absolute -top-1 -right-1 bg-gradient-to-tr from-amber-400 to-orange-500 text-white p-2 rounded-full shadow-md animate-bounce">
              <Star className="w-4 h-4 fill-current" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-black font-display text-slate-800 tracking-tight">{feedback.title}</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto font-medium">{feedback.desc}</p>
          </div>

          {/* Score Circle - Vivid colorful presentation */}
          <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="88"
                cy="88"
                r="74"
                className="stroke-purple-100/50"
                strokeWidth="14"
                fill="transparent"
              />
              <motion.circle
                cx="88"
                cy="88"
                r="74"
                className="stroke-purple-600"
                strokeWidth="14"
                fill="transparent"
                strokeDasharray={465}
                initial={{ strokeDashoffset: 465 }}
                animate={{ strokeDashoffset: 465 - (465 * (score / activeQuestionList.length)) }}
                transition={{ duration: 1, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-slate-800 font-display">
                {score} <span className="text-lg text-slate-400">/ {activeQuestionList.length}</span>
              </span>
              <span className="text-[10px] text-purple-600 mt-1 font-bold uppercase tracking-wider font-mono bg-purple-50 border border-purple-100/30 px-2 py-0.5 rounded-full">
                {Math.round((score / activeQuestionList.length) * 100)}% ճիշտ է
              </span>
            </div>
          </div>

          {/* Mistake Review and Action Buttons */}
          <div className="pt-4 max-w-md mx-auto space-y-4">
            {score < activeQuestionList.length && (
              <button
                id="btn-retry-mistakes"
                onClick={handleRetryMistakes}
                className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold rounded-2xl shadow-lg shadow-pink-500/20 hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <RefreshCw className="w-4.5 h-4.5" />
                <span>Կրկնել սխալները ({activeQuestionList.length - score})</span>
              </button>
            )}

            <button
              id="btn-quiz-reset"
              onClick={handleReset}
              className="w-full py-4 px-6 bg-slate-200/50 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer border border-slate-300/30"
            >
              <RefreshCw className="w-4.5 h-4.5 text-slate-500" />
              <span>Անցնել ամբողջ հարցաշարը նորից</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
