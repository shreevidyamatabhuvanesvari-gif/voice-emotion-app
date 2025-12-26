// emotionCore.js
// PURPOSE: Detect primary emotion from user text
// LOCK: No UI, No voice, No memory

const EMOTION_RULES = {
  priority: ["thakaan", "dukh", "bhram", "krodh", "khushi"],
  keywords: {
    thakaan: ["थक", "थकी", "थक गया", "थकावट"],
    dukh: ["दुख", "उदास", "अकेला", "तकलीफ", "भारी मन"],
    bhram: ["समझ नहीं", "पता नहीं", "कन्फ्यूज", "भ्रम"],
    krodh: ["गुस्सा", "नाराज़", "क्रोध"],
    khushi: ["खुश", "अच्छा", "संतोष", "प्रसन्न"]
  }
};

export function detectEmotion(text) {
  const t = text.toLowerCase();
  for (const emo of EMOTION_RULES.priority) {
    const keys = EMOTION_RULES.keywords[emo];
    if (keys.some(k => t.includes(k))) {
      return emo;
    }
  }
  return "normal";
}
