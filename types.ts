import { Type } from "@google/genai";

export enum AnalysisClassification {
  WORD = "word",
  PHRASAL_VERB = "phrasal_verb",
  IDIOM = "idiom",
  COLLOCATION = "collocation",
  SENTENCE = "sentence",
  PATTERN = "pattern",
  INTERJECTION = "interjection",
  SLANG = "slang",
  PROVERB = "proverb",
  GRAMMAR_CONSTRUCTION = "grammar_construction",
  UNKNOWN = "unknown",
}

export interface Analysis {
  classification: AnalysisClassification;
  input: string;
  lemma: string;
  pos: string;
  register: string;
  cefr_estimate: string;
  frequency: string;
  core_meaning_ar: string;
  uk_vs_us: {
    commonality: string;
    uk_equivalents: string[];
    us_equivalents: string[];
    notes: string;
  };
  pronunciation: {
    ipa: string;
    stress: string;
    intonation_tip: string;
  };
  collocations: string[];
  patterns: string[];
  common_pitfalls: string[];
  examples: {
    casual: string;
    semi_formal: string;
    ielts: string;
  };
  ielts_relevance: {
    is_relevant: boolean;
    why: string;
  };
  drills: {
    cloze: string;
    paraphrase: string;
    production: string;
  };
  listening_links: {
    youglish_us: string;
    youglish_uk: string;
  };
  related_terms: string[];
  safety: string;
}