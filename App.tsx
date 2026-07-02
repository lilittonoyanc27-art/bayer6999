import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import GrammarGuide from './GrammarGuide';
import MainQuiz from './MainQuiz';
import Game1Sorter from './Game1Sorter';
import Game2Chameleon from './Game2Chameleon';
import Game3Scrambler from './Game3Scrambler';
import Game4TimeAttack from './Game4TimeAttack';
import Game5MapExplorer from './Game5MapExplorer';
import { 
  BookOpen, 
  GraduationCap, 
  Gamepad2, 
  Sparkles, 
  ChevronRight, 
  Heart, 
  Compass, 
  Zap, 
  Layers, 
  MessageSquareCode, 
  Award,
  ArrowLeft
} from 'lucide-react';

type TabType = 'theory' | 'quiz' | 'games';
type GameId = 'sorter' | 'chameleon' | 'scrambler' | 'timeattack' | 'mapexplorer' | null;

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('quiz');
  const [activeGame, setActiveGame] = useState<GameId>(null);

  const gameList = [
    {
      id: 'sorter' as GameId,
      title: 'DOCTOR & PLACE Տեսակավորող',
      description: 'Տեղադրեք բառերն ու արտահայտությունները SER և ESTAR զամբյուղների մեջ: Մնեմոնիկ կանոնների արագ վարժանք:',
      icon: <Layers className="w-6 h-6 text-amber-500" />,
      difficulty: 'Հեշտ',
      color: 'hover:border-amber-400 hover:bg-amber-50/5'
    },
    {
      id: 'chameleon' as GameId,
      title: 'Իմաստների Քամելեոն',
      description: 'Սովորեք, թե ինչպես է փոխվում ածականների իմաստը (օրինակ՝ listo, verde, aburrido) բայը փոխելիս:',
      icon: <MessageSquareCode className="w-6 h-6 text-emerald-500" />,
      difficulty: 'Միջին',
      color: 'hover:border-emerald-400 hover:bg-emerald-50/5'
    },
    {
      id: 'scrambler' as GameId,
      title: 'Նախադասությունների Կառուցող',
      description: 'Հավաքեք առանձին իսպաներեն բառերը քերականորեն ճիշտ նախադասությունների մեջ՝ ճիշտ ձևերով:',
      icon: <Award className="w-6 h-6 text-teal-500" />,
      difficulty: 'Միջին',
      color: 'hover:border-teal-400 hover:bg-teal-50/5'
    },
    {
      id: 'timeattack' as GameId,
      title: 'Արագընթաց Բլից Հարցում',
      description: 'Մրցավազք ժամանակի հետ: Պատասխանեք արագ, ստացեք բոնուսներ ճիշտ պատասխանների համար և սահմանեք ռեկորդներ:',
      icon: <Zap className="w-6 h-6 text-rose-500" />,
      difficulty: 'Դժվար',
      color: 'hover:border-rose-400 hover:bg-rose-50/5'
    },
    {
      id: 'mapexplorer' as GameId,
      title: 'Քարտեզ-Ճանապարհորդություն',
      description: 'Ուղևորվեք վիրտուալ արշավախմբով Բարսելոնայից մինչև Երևան՝ լուծելով համատեքստային հանելուկներ:',
      icon: <Compass className="w-6 h-6 text-indigo-500" />,
      difficulty: 'Հետաքրքիր',
      color: 'hover:border-indigo-400 hover:bg-indigo-50/5'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#FFF0F6] via-[#F3F0FF] to-[#FFF9E6] flex flex-col justify-between font-sans selection:bg-pink-200 selection:text-pink-900" id="app-root">
      
      {/* Top navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-purple-100/50 shadow-md shadow-purple-500/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => { setActiveTab('quiz'); setActiveGame(null); }}>
            <div className="w-11 h-11 bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-500/30 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black font-display tracking-tight text-slate-800 flex items-center gap-1.5">
                <span>Ser o Estar</span>
                <span className="text-[10px] bg-pink-100 text-pink-700 px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wider">Իսպաներեն</span>
              </h1>
              <p className="text-[10px] text-slate-500 font-mono tracking-wider uppercase font-extrabold">Քերականական մարզիչ</p>
            </div>
          </div>

          {/* Main Module Switcher */}
          <nav className="flex space-x-1.5 bg-slate-200/50 border border-slate-300/30 backdrop-blur-sm p-1.5 rounded-2xl w-full sm:w-auto shadow-inner">
            <button
              id="nav-tab-theory"
              onClick={() => { setActiveTab('theory'); setActiveGame(null); }}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer ${
                activeTab === 'theory'
                  ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25 scale-[1.03]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              <BookOpen className={`w-4 h-4 ${activeTab === 'theory' ? 'text-white' : 'text-slate-500'}`} />
              <span>Տեսություն (DOCTOR/PLACE)</span>
            </button>

            <button
              id="nav-tab-quiz"
              onClick={() => { setActiveTab('quiz'); setActiveGame(null); }}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer ${
                activeTab === 'quiz' && !activeGame
                  ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25 scale-[1.03]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${activeTab === 'quiz' && !activeGame ? 'text-white animate-pulse' : 'text-amber-500 animate-pulse'}`} />
              <span>Հարցաշար (30 հարց)</span>
            </button>

            <button
              id="nav-tab-games"
              onClick={() => { setActiveTab('games'); }}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer ${
                activeTab === 'games'
                  ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25 scale-[1.03]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              <Gamepad2 className={`w-4 h-4 ${activeTab === 'games' ? 'text-white' : 'text-rose-500'}`} />
              <span>5 Խաղ</span>
            </button>
          </nav>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          
          {/* THEORY VIEW */}
          {activeTab === 'theory' && (
            <motion.div
              key="theory-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <GrammarGuide />
            </motion.div>
          )}

          {/* MAIN QUIZ VIEW */}
          {activeTab === 'quiz' && (
            <motion.div
              key="quiz-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <MainQuiz />
            </motion.div>
          )}

          {/* GAMES VIEW PANEL */}
          {activeTab === 'games' && (
            <motion.div
              key="games-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              {!activeGame ? (
                /* Games Selection Hub */
                <div className="space-y-8 max-w-4xl mx-auto">
                  <div className="text-center space-y-3">
                    <h2 className="text-4xl font-black font-display text-slate-800 tracking-tight">
                      Խաղային Լեզվաբանական Կենտրոն
                    </h2>
                    <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                      Ամրապնդեք տարբերությունը <strong className="text-pink-600 font-black">SER</strong>-ի և <strong className="text-indigo-600 font-black">ESTAR</strong>-ի միջև հետաքրքրաշարժ ինտերակտիվ ձևաչափերով:
                    </p>
                  </div>

                  {/* Catalog Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {gameList.map((game, idx) => (
                      <div
                        key={game.id}
                        id={`game-card-${game.id}`}
                        onClick={() => setActiveGame(game.id)}
                        className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-purple-100/60 shadow-lg shadow-purple-500/5 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between group"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="p-3 bg-gradient-to-br from-slate-50 to-purple-50/50 rounded-2xl group-hover:scale-110 transition-transform shadow-inner border border-slate-100">
                              {game.icon}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-100/50">
                              {game.difficulty}
                            </span>
                          </div>
                          
                          <div className="space-y-1.5">
                            <h3 className="font-extrabold text-slate-800 text-xl group-hover:text-purple-700 transition-colors">
                              {game.title}
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed font-sans">
                              {game.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1.5 text-xs font-bold text-purple-500 group-hover:text-purple-700 transition-colors pt-5 mt-auto border-t border-purple-50/50">
                          <span>Սկսել խաղը</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Active Game Workspace Wrapper */
                <div className="space-y-6">
                  {/* Back to games hub button */}
                  <div className="max-w-2xl mx-auto flex">
                    <button
                      id="btn-back-to-hub"
                      onClick={() => setActiveGame(null)}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-purple-600 hover:text-purple-800 bg-white/95 shadow-md border border-purple-100/60 px-5 py-2.5 rounded-2xl transition-all cursor-pointer hover:shadow-lg active:scale-95 hover:-translate-y-0.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Հետ դեպի խաղերի ցանկ</span>
                    </button>
                  </div>

                  {/* Dynamic Game render */}
                  <div className="animate-fade-in">
                    {activeGame === 'sorter' && <Game1Sorter />}
                    {activeGame === 'chameleon' && <Game2Chameleon />}
                    {activeGame === 'scrambler' && <Game3Scrambler />}
                    {activeGame === 'timeattack' && <Game4TimeAttack />}
                    {activeGame === 'mapexplorer' && <Game5MapExplorer />}
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer credits */}
      <footer className="bg-white border-t border-slate-100 py-6 text-center text-xs text-slate-400">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p className="flex items-center space-x-1">
            <span>SER o ESTAR Հարցաշար</span>
            <span>&bull;</span>
            <span>Պատրաստված է սիրով լեզուների հանդեպ</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current animate-pulse inline" />
          </p>
          <p className="font-mono text-[10px] tracking-wider text-slate-300 uppercase">
            իսպաներեն • հարցաշարեր • խաղեր
          </p>
        </div>
      </footer>

    </div>
  );
}
