import { Question, SorterItem, ChameleonScenario, ScrambledSentence, TimeAttackQuestion, MapStation } from './types';

export const quizQuestions: Question[] = [
  {
    id: 1,
    sentence: "Yo ___ estudiante.",
    options: { A: "soy", B: "estoy", C: "es" },
    correctAnswer: "A",
    rule: "Profession (Մասնագիտություն)",
    explanation: "SER բայը օգտագործվում է մասնագիտությունը կամ զբաղմունքը նշելու համար: Estudiante — ուսանող:"
  },
  {
    id: 2,
    sentence: "Mi hermana ___ en casa.",
    options: { A: "es", B: "está", C: "soy" },
    correctAnswer: "B",
    rule: "Location (Գտնվելու վայր)",
    explanation: "ESTAR բայը օգտագործվում է մարդկանց և առարկաների գտնվելու վայրը նշելու համար: En casa — տանը:"
  },
  {
    id: 3,
    sentence: "Madrid ___ en España.",
    options: { A: "está", B: "es", C: "son" },
    correctAnswer: "A",
    rule: "Location (Գտնվելու վայր)",
    explanation: "ESTAR բայը օգտագործվում է քաղաքների և երկրների աշխարհագրական դիրքը նշելու համար:"
  },
  {
    id: 4,
    sentence: "La mesa ___ grande.",
    options: { A: "está", B: "soy", C: "es" },
    correctAnswer: "C",
    rule: "Characteristic (Բնութագիր)",
    explanation: "SER բայը նկարագրում է առարկաների մշտական կամ ներքին ֆիզիկական բնութագրերը: Grande — մեծ:"
  },
  {
    id: 5,
    sentence: "El agua ___ fría.",
    options: { A: "está", B: "es", C: "son" },
    correctAnswer: "A",
    rule: "Condition (Վիճակ)",
    explanation: "ESTAR բայը արտահայտում է ժամանակավոր վիճակ կամ ջերմաստիճան տվյալ պահին: Fría — սառը:"
  },
  {
    id: 6,
    sentence: "Nosotros ___ amigos.",
    options: { A: "estamos", B: "somos", C: "son" },
    correctAnswer: "B",
    rule: "Relationship (Հարաբերություններ)",
    explanation: "SER բայը սահմանում է մարդկանց միջև հարաբերությունները (ընկերներ, ընտանիք, գործընկերներ):"
  },
  {
    id: 7,
    sentence: "Ella ___ cansada.",
    options: { A: "es", B: "está", C: "soy" },
    correctAnswer: "B",
    rule: "Physical State (Ֆիզիկական վիճակ)",
    explanation: "ESTAR բայը փոխանցում է ժամանակավոր ֆիզիկական կամ հուզական վիճակ: Cansada — հոգնած:"
  },
  {
    id: 8,
    sentence: "Mi padre ___ médico.",
    options: { A: "está", B: "es", C: "son" },
    correctAnswer: "B",
    rule: "Profession (Մասնագիտություն)",
    explanation: "SER բայը օգտագործվում է մասնագիտությունը նշելու համար: Médico — բժիշկ:"
  },
  {
    id: 9,
    sentence: "Los libros ___ en la mochila.",
    options: { A: "están", B: "son", C: "es" },
    correctAnswer: "A",
    rule: "Location (Գտնվելու վայր)",
    explanation: "ESTAR բայը նշում է անշունչ առարկաների գտնվելու վայրը: En la mochila — ուսապարկում:"
  },
  {
    id: 10,
    sentence: "Hoy ___ lunes.",
    options: { A: "está", B: "soy", C: "es" },
    correctAnswer: "C",
    rule: "Time/Date (Ժամանակ և Ամսաթիվ)",
    explanation: "SER բայը օգտագործվում է շաբաթվա օրերը, ամսաթվերը և ժամանակը նշելու համար: Lunes — երկուշաբթի:"
  },
  {
    id: 11,
    sentence: "Mi cumpleaños ___ en mayo.",
    options: { A: "está", B: "es", C: "son" },
    correctAnswer: "B",
    rule: "Event Time (Իրադարձության ժամանակ)",
    explanation: "Պլանավորված իրադարձությունների ժամանակն ու ամսաթիվը նշելու համար օգտագործվում է SER-ը:"
  },
  {
    id: 12,
    sentence: "Tú ___ muy simpático.",
    options: { A: "eres", B: "estás", C: "soy" },
    correctAnswer: "A",
    rule: "Characteristic (Բնավորության գիծ)",
    explanation: "SER բայը օգտագործվում է անհատի մշտական բնավորության գծերն ու որակները արտահայտելու համար:"
  },
  {
    id: 13,
    sentence: "La puerta ___ abierta.",
    options: { A: "es", B: "está", C: "son" },
    correctAnswer: "B",
    rule: "Condition (Վիճակ)",
    explanation: "ESTAR բայը նկարագրում է առարկաների ընթացիկ վիճակը, որը փոփոխության արդյունք է (բաց է/փակ է):"
  },
  {
    id: 14,
    sentence: "El perro ___ debajo de la mesa.",
    options: { A: "es", B: "está", C: "soy" },
    correctAnswer: "B",
    rule: "Location (Գտնվելու վայր)",
    explanation: "ESTAR բայը ցույց է տալիս, թե որտեղ է գտնվում կենդանին կամ օբյեկտը:"
  },
  {
    id: 15,
    sentence: "Ellos ___ de Armenia.",
    options: { A: "están", B: "son", C: "es" },
    correctAnswer: "B",
    rule: "Origin (Ծագում)",
    explanation: "SER բայը 'de' նախդիրի հետ համատեղ ցույց է տալիս մարդու ծագումը:"
  },
  {
    id: 16,
    sentence: "Yo ___ feliz hoy.",
    options: { A: "estoy", B: "soy", C: "es" },
    correctAnswer: "A",
    rule: "Emotion (Էմոցիաներ այսօր)",
    explanation: "ESTAR բայը օգտագործվում է 'hoy' (այսօր) բառի հետ՝ ընդգծելու ներկա տրամադրությունը:"
  },
  {
    id: 17,
    sentence: "Esta pizza ___ muy rica.",
    options: { A: "es", B: "está", C: "soy" },
    correctAnswer: "B",
    rule: "Food Quality (Ուտելիքի համ)",
    explanation: "ESTAR բայը օգտագործվում է պատրաստված ուտեստի համային որակները նկարագրելու համար (համեղ է հենց հիմա):"
  },
  {
    id: 18,
    sentence: "Nosotros ___ en clase.",
    options: { A: "somos", B: "están", C: "estamos" },
    correctAnswer: "C",
    rule: "Location (Գտնվելու վայր)",
    explanation: "ESTAR բայը առաջին դեմքի հոգնակի թվով (estamos) ցույց է տալիս դասարանում գտնվելը:"
  },
  {
    id: 19,
    sentence: "El coche ___ rojo.",
    options: { A: "está", B: "es", C: "son" },
    correctAnswer: "B",
    rule: "Color (Գույն)",
    explanation: "SER-ը օգտագործվում է առարկաների գույնը նշելու համար՝ որպես դրանց անբաժանելի բնութագիր:"
  },
  {
    id: 20,
    sentence: "Mi madre ___ ocupada ahora.",
    options: { A: "es", B: "está", C: "soy" },
    correctAnswer: "B",
    rule: "Temporary State (Ժամանակավոր վիճակ)",
    explanation: "ESTAR բայը նկարագրում է մարդու ժամանակավոր զբաղվածությունը տվյալ պահին ('ahora'):"
  },
  {
    id: 21,
    sentence: "Ustedes ___ profesores.",
    options: { A: "son", B: "están", C: "es" },
    correctAnswer: "A",
    rule: "Profession (Մասնագիտություն)",
    explanation: "SER-ի 'son' ձևը օգտագործվում է 'Ustedes' (Դուք) դերանվան հետ՝ մասնագիտությունը հաստատելու համար:"
  },
  {
    id: 22,
    sentence: "La película ___ interesante.",
    options: { A: "está", B: "es", C: "soy" },
    correctAnswer: "B",
    rule: "Characteristic (Բնութագիր)",
    explanation: "SER բայը օգտագործվում է, քանի որ հետաքրքիր լինելը տվյալ ֆիլմի անբաժանելի հատկությունն է:"
  },
  {
    id: 23,
    sentence: "El niño ___ enfermo.",
    options: { A: "está", B: "es", C: "son" },
    correctAnswer: "A",
    rule: "Health (Առողջություն)",
    explanation: "ESTAR բայը օգտագործվում է մարդու ժամանակավոր ֆիզիկական առողջությունը նկարագրելու համար (հիվանդ է):"
  },
  {
    id: 24,
    sentence: "Las ventanas ___ cerradas.",
    options: { A: "son", B: "están", C: "es" },
    correctAnswer: "B",
    rule: "Condition (Վիճակ)",
    explanation: "ESTAR-ը օգտագործվում է օբյեկտների վիճակը նկարագրելու համար (պատուհանները փակ են):"
  },
  {
    id: 25,
    sentence: "Barcelona ___ una ciudad bonita.",
    options: { A: "es", B: "está", C: "están" },
    correctAnswer: "A",
    rule: "Characteristic (Բնութագիր)",
    explanation: "Քաղաքի գեղեցկությունն ու մշտական հատկությունները նկարագրելու համար միշտ օգտագործվում է SER-ը:"
  },
  {
    id: 26,
    sentence: "¿Dónde ___ tu mochila?",
    options: { A: "es", B: "está", C: "soy" },
    correctAnswer: "B",
    rule: "Location (Գտնվելու վայր)",
    explanation: "Իրերի գտնվելու վայրի մասին հարցական նախադասություններում օգտագործվում է ESTAR (está):"
  },
  {
    id: 27,
    sentence: "Mis amigos ___ en el parque.",
    options: { A: "son", B: "están", C: "es" },
    correctAnswer: "B",
    rule: "Location (Գտնվելու վայր)",
    explanation: "ESTAR (están) բայը ցույց է տալիս, որ մի խումբ մարդիկ գտնվում են այգում:"
  },
  {
    id: 28,
    sentence: "Yo ___ de Armenia.",
    options: { A: "estoy", B: "soy", C: "está" },
    correctAnswer: "B",
    rule: "Origin (Ծագում)",
    explanation: "SER-ը ցույց է տալիս մարդու հայրենիքը կամ քաղաքացիությունը (Արմենիայից):"
  },
  {
    id: 29,
    sentence: "La sopa ___ caliente.",
    options: { A: "está", B: "es", C: "son" },
    correctAnswer: "A",
    rule: "Condition (Վիճակ/Ջերմաստիճան)",
    explanation: "ESTAR-ն արտահայտում է ուտեստի ընթացիկ ջերմաստիճանային վիճակը: Ապուրը տաք է հիմա:"
  },
  {
    id: 30,
    sentence: "Mi hermano ___ alto.",
    options: { A: "está", B: "es", C: "estoy" },
    correctAnswer: "B",
    rule: "Physical Feature (Ֆիզիկական հատկություն)",
    explanation: "SER-ն օգտագործվում է մարդկանց ֆիզիկական հասակը նկարագրելու համար (բարձրահասակ):"
  }
];

export const sorterItems: SorterItem[] = [
  { id: "s1", text: "médico", translation: "բժիշկ", category: "SER", reason: "Մասնագիտություն (Occupation)", acronymLabel: "Occupation" },
  { id: "s2", text: "en casa", translation: "տանը", category: "ESTAR", reason: "Գտնվելու վայր (Location)", acronymLabel: "Location" },
  { id: "s3", text: "alto", translation: "բարձրահասակ", category: "SER", reason: "Ֆիզիկական բնութագիր (Description)", acronymLabel: "Description" },
  { id: "s4", text: "cansado", translation: "հոգնած", category: "ESTAR", reason: "Ֆիզիկական վիճակ (Condition)", acronymLabel: "Condition" },
  { id: "s5", text: "de Armenia", translation: "Արմենիայից", category: "SER", reason: "Ծագում (Origin)", acronymLabel: "Origin" },
  { id: "s6", text: "lunes", translation: "երկուշաբթի", category: "SER", reason: "Շաբաթվա օր / Ժամանակ (Time)", acronymLabel: "Time" },
  { id: "s7", text: "en el parque", translation: "այգում", category: "ESTAR", reason: "Գտնվելու վայր (Location)", acronymLabel: "Location" },
  { id: "s8", text: "enojado", translation: "բարկացած", category: "ESTAR", reason: "Ժամանակավոր էմոցիա (Emotion)", acronymLabel: "Emotion" },
  { id: "s9", text: "inteligente", translation: "խելացի", category: "SER", reason: "Բնավորության գիծ (Characteristic)", acronymLabel: "Characteristic" },
  { id: "s10", text: "enfermo", translation: "հիվանդ", category: "ESTAR", reason: "Առողջություն / Վիճակ (Condition)", acronymLabel: "Condition" },
  { id: "s11", text: "hermanos", translation: "եղբայրներ (հարաբերություններ)", category: "SER", reason: "Հարաբերություններ (Relation)", acronymLabel: "Relation" },
  { id: "s12", text: "debajo de la mesa", translation: "սեղանի տակ", category: "ESTAR", reason: "Դիրք (Position)", acronymLabel: "Position" }
];

export const chameleonScenarios: ChameleonScenario[] = [
  {
    id: 1,
    title: "Մարդ թե՞ գիրք: (Aburrido)",
    description: "Ձեզ անհրաժեշտ է ասել, որ ձեր դասընկերը ձանձրալի մարդ է (բնավորությամբ), այլ ոչ թե պարզապես ձանձրացել է:",
    context: "Նա երբեք հետաքրքիր ոչինչ չի պատմում և միշտ տանն է նստում:",
    optionSer: "Él es aburrido",
    meaningSer: "Նա ինքնին ձանձրալի է / անհետաքրքիր է (SER)",
    optionEstar: "Él está aburrido",
    meaningEstar: "Նրա ձանձրացել է տվյալ պահին (ESTAR)",
    correctOption: "SER",
    explanation: "SER + aburrido նշանակում է 'ձանձրալի/անհետաքրքիր' (բնավորության գիծ): ESTAR + aburrido նշանակում է 'ձանձրացող/ձանձրույթ զգացող' (ժամանակավոր վիճակ):"
  },
  {
    id: 2,
    title: "Մարտական պատրաստվածություն: (Listo)",
    description: "Դուք հավաքել եք ձեր ուսապարկը, հագնվել և ցանկանում եք ասել՝ «Ես պատրաստ եմ»:",
    context: "Արի արագ գնանք, տաքսին արդեն սպասում է մուտքի մոտ:",
    optionSer: "Soy listo",
    meaningSer: "Ես խելացի եմ / հնարամիտ (SER)",
    optionEstar: "Estoy listo",
    meaningEstar: "Ես պատրաստ եմ դուրս գալուն (ESTAR)",
    correctOption: "ESTAR",
    explanation: "SER + listo նշանակում է 'խելացի, հնարամիտ': ESTAR + listo նշանակում է 'պատրաստ ինչ-որ բանի':"
  },
  {
    id: 3,
    title: "Կանաչ խնձոր (Verde)",
    description: "Դուք խնձոր քաղեցիք ճյուղից, կծեցիք այն, և պարզվեց, որ այն թթու է ու տհաս:",
    context: "Այն դեռ բոլորովին հասած չէ, հնարավոր չէ ուտել:",
    optionSer: "La manzana es verde",
    meaningSer: "Խնձորը կանաչ գույնի է (SER)",
    optionEstar: "La manzana está verde",
    meaningEstar: "Խնձորը հում է / տհաս (ESTAR)",
    correctOption: "ESTAR",
    explanation: "SER + verde-ն մատնանշում է օբյեկտի կանաչ գույնը: ESTAR + verde նշանակում է, որ պտուղը տհաս է (կանաչ՝ հասունության իմաստով):"
  },
  {
    id: 4,
    title: "Համեղ պիցցա թե՞ հարստություն (Rico)",
    description: "Դուք փորձել եք թարմ թխված պիցցայի մի կտոր և հիանում եք դրա համով:",
    context: "Այն պարզապես հալվում է բերանում, պանիրը հիանալի է:",
    optionSer: "La pizza es rica",
    meaningSer: "Պիցցան՝ որպես ուտեստ, թանկարժեք/սննդարար է (SER)",
    optionEstar: "La pizza está rica",
    meaningEstar: "Պիցցան հիմա շատ համեղ է (ESTAR)",
    correctOption: "ESTAR",
    explanation: "SER + rico նշանակում է 'հարուստ' (մարդկանց մասին) կամ սննդարար: ESTAR + rico նշանակում է 'շատ համեղ' (ուտելու պահին ուտելիքի մասին):"
  },
  {
    id: 5,
    title: "Բարի՞, թե՞ առողջ: (Bueno)",
    description: "Դուք ցանկանում եք ասել, որ ձեր պապիկը իր բնույթով շատ բարի ու լավ մարդ է:",
    context: "Նա միշտ օգնում է հարևաններին և սիրում է կենդանիներին:",
    optionSer: "Mi abuelo es bueno",
    meaningSer: "Իմ պապիկը բարի/լավ մարդ է (SER)",
    optionEstar: "Mi abuelo está bueno",
    meaningEstar: "Իմ պապիկը իրեն առողջ է զգում / գրավիչ է (ESTAR)",
    correctOption: "SER",
    explanation: "SER + bueno նշանակում է լինել լավ, բարի, որակյալ: ESTAR + bueno նշանակում է զգալ իրեն առողջ կամ (խոսակցականում) լինել գրավիչ:"
  }
];

export const scrambledSentences: ScrambledSentence[] = [
  {
    id: 1,
    correctWords: ["Yo", "soy", "de", "Armenia"],
    scrambledWords: ["de", "soy", "Armenia", "Yo"],
    translation: "Ես Արմենիայից եմ:",
    verbType: "SER",
    explanation: "SER-ը նշում է ծագումը (de + Armenia):"
  },
  {
    id: 2,
    correctWords: ["Mi", "hermana", "está", "en", "casa"],
    scrambledWords: ["casa", "está", "hermana", "en", "Mi"],
    translation: "Իմ քույրը տանն է:",
    verbType: "ESTAR",
    explanation: "ESTAR-ն օգտագործվում է մարդու գտնվելու վայրը նշելու համար:"
  },
  {
    id: 3,
    correctWords: ["Nosotros", "somos", "amigos"],
    scrambledWords: ["somos", "amigos", "Nosotros"],
    translation: "Մենք ընկերներ ենք:",
    verbType: "SER",
    explanation: "SER-ն արտահայտում է սոցիալական կապերը և հարաբերությունները (amigos):"
  },
  {
    id: 4,
    correctWords: ["Los", "libros", "están", "en", "la", "mochila"],
    scrambledWords: ["mochila", "libros", "la", "están", "en", "Los"],
    translation: "Գրքերը ուսապարկում են:",
    verbType: "ESTAR",
    explanation: "ESTAR-ը որոշում է առարկաների դիրքը տարածության մեջ:"
  },
  {
    id: 5,
    correctWords: ["Hoy", "es", "lunes"],
    scrambledWords: ["lunes", "Hoy", "es"],
    translation: "Այսօր երկուշաբթի է:",
    verbType: "SER",
    explanation: "SER-ը հայտնում է շաբաթվա օրերի, ամսաթվերի և ժամանակի մասին:"
  }
];

export const timeAttackQuestions: TimeAttackQuestion[] = [
  { id: 1, sentence: "Yo ___ estudiante.", correctVerb: "SER", translation: "Ես ուսանող եմ:", explanation: "Մասնագիտությունը պահանջում է SER:" },
  { id: 2, sentence: "Mi hermana ___ en casa.", correctVerb: "ESTAR", translation: "Իմ քույրը տանն է:", explanation: "Տանը գտնվելը պահանջում է ESTAR:" },
  { id: 3, sentence: "Madrid ___ en España.", correctVerb: "ESTAR", translation: "Մադրիդը գտնվում է Իսպանիայում:", explanation: "Աշխարհագրական դիրքը պահանջում է ESTAR:" },
  { id: 4, sentence: "La mesa ___ grande.", correctVerb: "SER", translation: "Սեղանը մեծ է:", explanation: "Մշտական ֆիզիկական հատկությունը պահանջում է SER:" },
  { id: 5, sentence: "El agua ___ fría.", correctVerb: "ESTAR", translation: "Ջուրը սառն է (հիմա):", explanation: "Ընթացիկ վիճակը պահանջում է ESTAR:" },
  { id: 6, sentence: "Nosotros ___ amigos.", correctVerb: "SER", translation: "Մենք ընկերներ ենք:", explanation: "Հարաբերությունները պահանջում են SER:" },
  { id: 7, sentence: "Ella ___ cansada.", correctVerb: "ESTAR", translation: "Նա հոգնած է:", explanation: "Ժամանակավոր ֆիզիկական վիճակը պահանջում է ESTAR:" },
  { id: 8, sentence: "Mi padre ___ médico.", correctVerb: "SER", translation: "Իմ հայրը բժիշկ է:", explanation: "Մասնագիտությունը պահանջում է SER:" },
  { id: 9, sentence: "Hoy ___ lunes.", correctVerb: "SER", translation: "Այսօր երկուշաբթի է:", explanation: "Շաբաթվա օրը պահանջում է SER:" },
  { id: 10, sentence: "La puerta ___ abierta.", correctVerb: "ESTAR", translation: "Դուռը բաց է:", explanation: "Դռան վիճակը պահանջում է ESTAR:" },
  { id: 11, sentence: "El perro ___ debajo de la mesa.", correctVerb: "ESTAR", translation: "Շունը սեղանի տակ է:", explanation: "Գտնվելու վայրը պահանջում է ESTAR:" },
  { id: 12, sentence: "Tú ___ muy simpático.", correctVerb: "SER", translation: "Դու շատ հաճելի ես:", explanation: "Բնավորության գիծը պահանջում է SER:" },
  { id: 13, sentence: "Ellos ___ de Armenia.", correctVerb: "SER", translation: "Նրանք Արմենիայից են:", explanation: "Ծագումը պահանջում է SER:" },
  { id: 14, sentence: "Yo ___ feliz hoy.", correctVerb: "ESTAR", translation: "Ես երջանիկ եմ այսօր:", explanation: "Ընթացիկ տրամադրությունը պահանջում է ESTAR:" },
  { id: 15, sentence: "La pizza ___ rica.", correctVerb: "ESTAR", translation: "Պիցցան համեղ է (հիմա):", explanation: "Սննդի որակը պահանջում է ESTAR:" },
  { id: 16, sentence: "El coche ___ rojo.", correctVerb: "SER", translation: "Մեքենան կարմիր է:", explanation: "Գույնը պահանջում է SER:" },
  { id: 17, sentence: "Mi madre ___ ocupada.", correctVerb: "ESTAR", translation: "Մայրս զբաղված է:", explanation: "Ժամանակավոր վիճակը պահանջում է ESTAR:" },
  { id: 18, sentence: "La película ___ interesante.", correctVerb: "SER", translation: "Ֆիլմը հետաքրքիր է:", explanation: "Ստեղծագործության որակը պահանջում է SER:" },
  { id: 19, sentence: "El niño ___ enfermo.", correctVerb: "ESTAR", translation: "Երեխան հիվանդ է:", explanation: "Առողջական վիճակը պահանջում է ESTAR:" },
  { id: 20, sentence: "Las ventanas ___ cerradas.", correctVerb: "ESTAR", translation: "Պատուհանները փակ են:", explanation: "Առարկաների վիճակը պահանջում է ESTAR:" }
];

export const mapStations: MapStation[] = [
  {
    id: 1,
    name: "Բարսելոնա",
    translation: "Barcelona",
    sentence: "Barcelona ___ una ciudad muy bonita y animada.",
    options: ["es", "está", "estamos"],
    correctAnswer: "es",
    explanation: "Օգտագործվում է SER-ը (es), քանի որ քաղաքի գեղեցկությունն ու կենսուրախությունը դրա մշտական բնութագրերն են:",
    coordinates: { x: 25, y: 70 }
  },
  {
    id: 2,
    name: "Մադրիդ",
    translation: "Madrid",
    sentence: "Nosotros ___ en Madrid para visitar los museos.",
    options: ["somos", "estamos", "son"],
    correctAnswer: "estamos",
    explanation: "Օգտագործվում է ESTAR-ը (estamos), քանի որ դա մեր ժամանակավոր գտնվելն է Մադրիդում:",
    coordinates: { x: 45, y: 55 }
  },
  {
    id: 3,
    name: "Երևան",
    translation: "Yereván",
    sentence: "Mis padres ___ de Armenia, de la hermosa ciudad de Yereván.",
    options: ["están", "es", "son"],
    correctAnswer: "son",
    explanation: "Օգտագործվում է SER-ը (son de), քանի որ սա ծնողների ծագումն արտահայտելու համար է:",
    coordinates: { x: 75, y: 40 }
  },
  {
    id: 4,
    name: "Մալագայի լողափ",
    translation: "Playa de Málaga",
    sentence: "¡Qué calor! El agua del mar ___ un poco fría hoy.",
    options: ["está", "es", "están"],
    correctAnswer: "está",
    explanation: "Օգտագործվում է ESTAR-ը (está), քանի որ սա այսօրվա ջրի ջերմաստիճանի ընթացիկ վիճակն է:",
    coordinates: { x: 30, y: 85 }
  },
  {
    id: 5,
    name: "Իսպանական սրճարան",
    translation: "Café Español",
    sentence: "Esta paella que estamos comiendo ___ deliciosa.",
    options: ["es", "está", "estoy"],
    correctAnswer: "está",
    explanation: "Օգտագործվում է ESTAR-ը (está), քանի որ ուտեստը համեղ է պատրաստված և գնահատվում է ուտելու պահին:",
    coordinates: { x: 60, y: 75 }
  },
  {
    id: 6,
    name: "Լեզվի դպրոց",
    translation: "Escuela de idiomas",
    sentence: "¡Enhorabuena! Ustedes ___ estudiantes excelentes de español.",
    options: ["son", "están", "es"],
    correctAnswer: "son",
    explanation: "Օգտագործվում է SER-ը (son)՝ մարդկանց դերը կամ կարգավիճակը սահմանելու համար (ուսանողներ):",
    coordinates: { x: 85, y: 80 }
  }
];
