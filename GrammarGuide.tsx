import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Info } from 'lucide-react';

const serConjugation = [
  { pronoun: 'Yo', form: 'soy', translation: 'ես եմ' },
  { pronoun: 'Tú', form: 'eres', translation: 'դու ես' },
  { pronoun: 'Él / Ella / Usted', form: 'es', translation: 'նա / Դուք (հարգական) է' },
  { pronoun: 'Nosotros / -as', form: 'somos', translation: 'մենք ենք' },
  { pronoun: 'Vosotros / -as', form: 'sois', translation: 'դուք եք (Իսպանիայում)' },
  { pronoun: 'Ellos / Ellas / Ustedes', form: 'son', translation: 'նրանք / Դուք (հոգնակի) եք' },
];

const estarConjugation = [
  { pronoun: 'Yo', form: 'estoy', translation: 'ես գտնվում եմ' },
  { pronoun: 'Tú', form: 'estás', translation: 'դու գտնվում ես' },
  { pronoun: 'Él / Ella / Usted', form: 'está', translation: 'նա / Դուք (հարգական) գտնվում է' },
  { pronoun: 'Nosotros / -as', form: 'estamos', translation: 'մենք գտնվում ենք' },
  { pronoun: 'Vosotros / -as', form: 'estáis', translation: 'դուք գտնվում եք (Իսպանիայում)' },
  { pronoun: 'Ellos / Ellas / Ustedes', form: 'están', translation: 'նրանք / Դուք (հոգնակի) գտնվում են' },
];

const doctorRules = [
  { letter: 'D', title: 'Description (Նկարագրություն)', desc: 'Ֆիզիկական հատկություններ, անուն, սեռ, մշտական բնավորության գծեր:', example: 'Yo soy Lilit. La mesa es de madera.' },
  { letter: 'O', title: 'Occupation (Զբաղմունք / Մասնագիտություն)', desc: 'Մասնագիտություն, հոբբի, ուսանողի կարգավիճակ:', example: 'Mi padre es médico. Nosotros somos estudiantes.' },
  { letter: 'C', title: 'Characteristics (Բնավորություն)', desc: 'Անհատական հատկանիշներ, բնավորություն, ինտելեկտ:', example: 'Tú eres muy simpático. Ella es inteligente.' },
  { letter: 'T', title: 'Time (Ժամանակ / Ամսաթիվ)', desc: 'Ժամեր, շաբաթվա օրեր, ամսաթվեր, եղանակներ, տարի:', example: 'Hoy es lunes. Son las tres de la tarde.' },
  { letter: 'O', title: 'Origin (Ծագում)', desc: 'Ծագման երկիր, ազգություն, նյութ:', example: 'Yo soy de Armenia. Ellos son de España.' },
  { letter: 'R', title: 'Relation (Հարաբերություններ)', desc: 'Կրոն, ընտանիք, ընկերություն, սեր:', example: 'Nosotros somos amigos. Ella es mi hermana.' },
];

const placeRules = [
  { letter: 'P', title: 'Position (Դիրք)', desc: 'Կեցվածք, մարմնի ֆիզիկական դիրք:', example: 'El perro está sentado. Él está de pie.' },
  { letter: 'L', title: 'Location (Գտնվելու վայր)', desc: 'Որտեղ է գտնվում առարկան, մարդը կամ քաղաքը (նույնիսկ ժամանակավոր):', example: 'Mi hermana está en casa. Madrid está en España.' },
  { letter: 'A', title: 'Action (Գործողություն)', desc: 'Շարունակվող գործողություն տվյալ պահին (ներկա շարունակական):', example: 'Estoy estudiando español. Están comiendo pizza.' },
  { letter: 'C', title: 'Condition (Վիճակ / Առողջություն)', desc: 'Ֆիզիկական կամ հոգեկան վիճակ, առողջություն:', example: 'La puerta está abierta. El niño está enfermo.' },
  { letter: 'E', title: 'Emotion (Էմոցիա)', desc: 'Ժամանակավոր տրամադրություն, զգացմունքներ:', example: 'Yo estoy feliz hoy. ¿Por qué estás enojado?' },
];

export default function GrammarGuide() {
  const [activeTab, setActiveTab] = useState<'conjugation' | 'ser' | 'estar'>('conjugation');

  return (
    <div id="grammar-guide" className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl shadow-purple-500/5 border border-purple-100/60 overflow-hidden">
      {/* Header Banner with vibrant pink-purple-indigo gradient */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 p-8 text-white relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl" />
        <div className="flex items-center space-x-3 mb-2">
          <BookOpen className="w-8 h-8 text-pink-200" id="icon-grammar" />
          <span className="bg-white/20 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-white/20">
            Տեսություն և Կանոններ
          </span>
        </div>
        <h2 className="text-3xl font-black font-display tracking-tight">SER vs ESTAR մանրամասն</h2>
        <p className="text-pink-50 text-sm mt-2 max-w-xl">
          Սովորեք իսպաներենի երկու հիմնական բայերի տարբերությունը հիշվող մնեմոնիկ կանոնների օգնությամբ:
        </p>

        {/* Tab Switcher - Vibrant styling */}
        <div className="flex bg-black/20 p-1.5 rounded-2xl mt-6 max-w-lg border border-white/10 shadow-inner">
          <button
            id="tab-conjugation"
            onClick={() => setActiveTab('conjugation')}
            className={`flex-1 py-2.5 text-center text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === 'conjugation' ? 'bg-white text-purple-950 shadow-md' : 'text-pink-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            Խոնարհում
          </button>
          <button
            id="tab-ser"
            onClick={() => setActiveTab('ser')}
            className={`flex-1 py-2.5 text-center text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === 'ser' ? 'bg-gradient-to-r from-amber-400 to-rose-500 text-white shadow-md shadow-rose-500/20' : 'text-pink-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            SER բայը (DOCTOR)
          </button>
          <button
            id="tab-estar"
            onClick={() => setActiveTab('estar')}
            className={`flex-1 py-2.5 text-center text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === 'estar' ? 'bg-gradient-to-r from-teal-400 to-indigo-500 text-white shadow-md shadow-indigo-500/20' : 'text-pink-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            ESTAR բայը (PLACE)
          </button>
        </div>
      </div>

      <div className="p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'conjugation' && (
            <motion.div
              key="conjugation"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* SER Conjugation Table */}
              <div className="bg-rose-50/40 rounded-3xl p-6 border border-rose-100/60 shadow-md shadow-rose-500/3">
                <div className="flex items-center space-x-2.5 mb-4">
                  <div className="w-3.5 h-8 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full shadow-sm" />
                  <h3 className="text-xl font-extrabold text-pink-700 font-display">SER (Լինել, հանդիսանալ ինչ-որ մեկը)</h3>
                </div>
                <p className="text-xs text-rose-700/80 mb-4 italic font-medium">
                  Արտահայտում է առարկայի կամ անձի մշտական հատկությունները, էությունը:
                </p>
                <div className="space-y-2.5">
                  {serConjugation.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-rose-100/55 hover:border-pink-300 hover:shadow-md hover:shadow-pink-500/5 transition-all duration-300"
                    >
                      <span className="font-mono text-sm font-bold text-slate-500">{item.pronoun}</span>
                      <div className="text-right">
                        <span className="font-black text-pink-600 text-lg font-display">{item.form}</span>
                        <span className="block text-[11px] text-slate-400 font-medium">{item.translation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ESTAR Conjugation Table */}
              <div className="bg-indigo-50/40 rounded-3xl p-6 border border-indigo-100/60 shadow-md shadow-indigo-500/3">
                <div className="flex items-center space-x-2.5 mb-4">
                  <div className="w-3.5 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full shadow-sm" />
                  <h3 className="text-xl font-extrabold text-indigo-700 font-display">ESTAR (Լինել, գտնվել ինչ-որ տեղ)</h3>
                </div>
                <p className="text-xs text-indigo-700/80 mb-4 italic font-medium">
                  Արտահայտում է ժամանակավոր վիճակներ, գտնվելու վայրը կամ զգացմունքները:
                </p>
                <div className="space-y-2.5">
                  {estarConjugation.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-indigo-100/55 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-300"
                    >
                      <span className="font-mono text-sm font-bold text-slate-500">{item.pronoun}</span>
                      <div className="text-right">
                        <span className="font-black text-indigo-600 text-lg font-display">{item.form}</span>
                        <span className="block text-[11px] text-slate-400 font-medium">{item.translation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'ser' && (
            <motion.div
              key="ser"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-3.5 mb-6 bg-gradient-to-r from-amber-50 to-pink-50/30 p-4 rounded-2xl border border-pink-100/80 shadow-sm">
                <Info className="w-6 h-6 text-pink-600 shrink-0" />
                <p className="text-sm text-slate-700 leading-relaxed">
                  D-O-C-T-O-R մնեմոնիկ կանոնը կօգնի ձեզ հեշտությամբ հիշել, թե երբ օգտագործել <strong className="text-pink-600">SER</strong>-ը:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {doctorRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white border border-purple-100/50 shadow-md shadow-purple-500/2 hover:shadow-xl hover:shadow-pink-500/8 hover:-translate-y-1 hover:border-pink-300 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-2 right-3 font-display text-5xl font-black text-pink-50 select-none">
                      {rule.letter}
                    </div>
                    <div className="flex items-center space-x-3 mb-2.5 relative z-10">
                      <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white font-black font-display text-sm shadow-md shadow-pink-500/20">
                        {rule.letter}
                      </span>
                      <h4 className="font-extrabold text-slate-800 text-sm leading-tight">{rule.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600 mb-3 relative z-10 leading-relaxed font-medium">
                      {rule.desc}
                    </p>
                    <div className="bg-rose-50/40 p-3 rounded-xl border border-rose-100/50 font-mono text-[11px] text-pink-700 relative z-10">
                      <span className="font-extrabold block text-[9px] text-slate-400 uppercase tracking-widest mb-0.5">Օրինակ՝</span>
                      {rule.example}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'estar' && (
            <motion.div
              key="estar"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-3.5 mb-6 bg-gradient-to-r from-teal-50 to-indigo-50/30 p-4 rounded-2xl border border-teal-100/80 shadow-sm">
                <Info className="w-6 h-6 text-teal-600 shrink-0" />
                <p className="text-sm text-slate-700 leading-relaxed">
                  P-L-A-C-E մնեմոնիկ կանոնը կօգնի ձեզ հիշել <strong className="text-teal-600">ESTAR</strong>-ի օգտագործման բոլոր հիմնական դեպքերը:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {placeRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white border border-purple-100/50 shadow-md shadow-purple-500/2 hover:shadow-xl hover:shadow-cyan-500/8 hover:-translate-y-1 hover:border-cyan-300 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-2 right-3 font-display text-5xl font-black text-cyan-50 select-none">
                      {rule.letter}
                    </div>
                    <div className="flex items-center space-x-3 mb-2.5 relative z-10">
                      <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-500 text-white font-black font-display text-sm shadow-md shadow-teal-500/20">
                        {rule.letter}
                      </span>
                      <h4 className="font-extrabold text-slate-800 text-sm leading-tight">{rule.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600 mb-3 relative z-10 leading-relaxed font-medium">
                      {rule.desc}
                    </p>
                    <div className="bg-cyan-50/40 p-3 rounded-xl border border-cyan-100/50 font-mono text-[11px] text-teal-700 relative z-10">
                      <span className="font-extrabold block text-[9px] text-slate-400 uppercase tracking-widest mb-0.5">Օրինակ՝</span>
                      {rule.example}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
