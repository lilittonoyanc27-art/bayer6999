export interface Question {
  id: number;
  sentence: string;
  options: {
    A: string;
    B: string;
    C: string;
  };
  correctAnswer: 'A' | 'B' | 'C';
  explanation: string;
  rule: string;
}

export interface SorterItem {
  id: string;
  text: string;
  translation: string;
  category: 'SER' | 'ESTAR';
  reason: string;
  acronymLabel: string; // e.g. "Occupation" or "Location"
}

export interface ChameleonScenario {
  id: number;
  title: string;
  description: string;
  context: string;
  optionSer: string;
  meaningSer: string;
  optionEstar: string;
  meaningEstar: string;
  correctOption: 'SER' | 'ESTAR';
  explanation: string;
}

export interface ScrambledSentence {
  id: number;
  correctWords: string[];
  scrambledWords: string[];
  translation: string;
  verbType: 'SER' | 'ESTAR';
  explanation: string;
}

export interface TimeAttackQuestion {
  id: number;
  sentence: string;
  correctVerb: 'SER' | 'ESTAR';
  translation: string;
  explanation: string;
}

export interface MapStation {
  id: number;
  name: string;
  translation: string;
  sentence: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  coordinates: { x: number; y: number }; // Percentage positions for visual map
}
