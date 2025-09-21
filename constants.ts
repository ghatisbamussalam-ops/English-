import { Type } from "@google/genai";

export const ANALYSIS_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    classification: { type: Type.STRING, description: "Classification of the phrase from the allowed enum." },
    input: { type: Type.STRING, description: "The phrase as it was received." },
    lemma: { type: Type.STRING },
    pos: { type: Type.STRING, description: "Part of speech." },
    register: { type: Type.STRING, description: "عامي/محايد/رسمي" },
    cefr_estimate: { type: Type.STRING, description: "A2/B1/B2/C1 (تقديري)" },
    frequency: { type: Type.STRING, description: "High/Medium/Low (تقديري)" },
    core_meaning_ar: { type: Type.STRING, description: "شرح وظيفي بالعربية يوضح متى ولماذا تُستخدم." },
    uk_vs_us: {
      type: Type.OBJECT,
      properties: {
        commonality: { type: Type.STRING, description: "تحديد ما إذا كان المصطلح أكثر شيوعًا في الإنجليزية البريطانية أو الأمريكية." },
        uk_equivalents: { type: Type.ARRAY, items: { type: Type.STRING } },
        us_equivalents: { type: Type.ARRAY, items: { type: Type.STRING } },
        notes: { type: Type.STRING, description: "فروق دقيقة في المعنى/السياق/الشيوع." },
      },
      required: ["commonality", "uk_equivalents", "us_equivalents", "notes"],
    },
    pronunciation: {
      type: Type.OBJECT,
      properties: {
        ipa: { type: Type.STRING },
        stress: { type: Type.STRING, description: "موضع الضغط" },
        intonation_tip: { type: Type.STRING, description: "نصيحة نغمة قصيرة (ارتفاع/انخفاض/ربط)." },
      },
      required: ["ipa", "stress", "intonation_tip"],
    },
    collocations: { type: Type.ARRAY, items: { type: Type.STRING } },
    patterns: { type: Type.ARRAY, items: { type: Type.STRING } },
    common_pitfalls: { type: Type.ARRAY, items: { type: Type.STRING } },
    examples: {
      type: Type.OBJECT,
      properties: {
        casual: { type: Type.STRING, description: "جملة محادثية طبيعية من إنشاءك." },
        semi_formal: { type: Type.STRING, description: "جملة عملية (إيميل/اجتماع)." },
        ielts: { type: Type.STRING, description: "جملة تناسب Writing/Speaking مع مفردات أعلى قليلًا." },
      },
      required: ["casual", "semi_formal", "ielts"],
    },
    ielts_relevance: {
      type: Type.OBJECT,
      properties: {
        is_relevant: { type: Type.BOOLEAN },
        why: { type: Type.STRING, description: "سبب مختصر." },
      },
      required: ["is_relevant", "why"],
    },
    drills: {
      type: Type.OBJECT,
      properties: {
        cloze: { type: Type.STRING, description: "جملة بإخفاء العبارة ______" },
        paraphrase: { type: Type.STRING, description: "مهمة إعادة صياغة للفكرة نفسها بكلمات أخرى." },
        production: { type: Type.STRING, description: "اكتب جملة شخصية عن يومك تستخدم فيها العبارة." },
      },
      required: ["cloze", "paraphrase", "production"],
    },
    listening_links: {
        type: Type.OBJECT,
        properties: {
            youglish_us: { type: Type.STRING, description: "Suggested search query for YouGlish US" },
            youglish_uk: { type: Type.STRING, description: "Suggested search query for YouGlish UK" },
        },
        required: ["youglish_us", "youglish_uk"],
    },
    related_terms: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING }, 
        description: "قائمة بمصطلحات ذات صلة بالمصطلح المدخل." 
    },
    safety: { type: Type.STRING, description: "A safety reminder about not using copyrighted material." }
  },
  required: [
    "classification", "input", "lemma", "pos", "register", "cefr_estimate", "frequency",
    "core_meaning_ar", "uk_vs_us", "pronunciation", "collocations", "patterns",
    "common_pitfalls", "examples", "ielts_relevance", "drills", "listening_links", 
    "related_terms", "safety"
  ]
};

export const CLASSIFICATION_LABELS: Record<string, string> = {
    word: "كلمة",
    phrasal_verb: "فعل مركّب",
    idiom: "تعبير اصطلاحي",
    collocation: "تلازم لفظي",
    sentence: "جملة",
    pattern: "قالب استعمالي",
    interjection: "تعجّب / تعليق",
    slang: "عامي / سوقي",
    proverb: "مثل",
    grammar_construction: "تركيب نحوي",
    unknown: "غير مصنف"
};