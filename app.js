// =======================================================
// FINAL TEXT-BASED CORE (LOCKED)
// App = स्त्री | User = पुरुष | कोई अनुमान नहीं
// =======================================================

// ===== DATA (LOCKED) =====
const EMOTION_RULES = {
  priority: ["thakaan", "dukh", "krodh", "bhram", "khushi"],
  keywords: {
    thakaan: ["थक", "थका", "थक गया", "थक गया हूँ", "थकावट"],
    dukh: ["दुख", "उदास", "अकेला", "तकलीफ", "पीड़ा"],
    khushi: ["खुश", "अच्छा", "संतोष", "प्रसन्न"],
    bhram: ["समझ नहीं", "पता नहीं", "कन्फ्यूज", "भ्रम"],
    krodh: ["गुस्सा", "नाराज़", "क्रोध"]
  }
};

const LOVE_MAP = {
  thakaan: "देखभाल",
  dukh: "करुणा",
  khushi: "साझापन",
  bhram: "धैर्य",
  krodh: "शांति",
  prem: "प्रेम"
};

// ===== HELPERS =====
function detectEmotion(text) {
  const t = text.toLowerCase();
  for (const emo of EMOTION_RULES.priority) {
    const keys = EMOTION_RULES.keywords[emo] || [];
    if (keys.some(k => t.includes(k))) return emo;
  }
  return "prem";
}

// Auto-Grammar: App (स्त्री) | User (पुरुष)
// नियम: केवल App के वाक्य; User का पाठ अपरिवर्तित
function appSentence(s) {
  // यहाँ जानबूझकर सरल, नियम-आधारित वाक्य हैं
  // ताकि व्याकरण स्थिर रहे (कोई अनुमान नहीं)
  return s;
}

// ===== RESPONSE BUILDER =====
function buildResponse(userText) {
  const primary = detectEmotion(userText);
  const tone = LOVE_MAP[primary] || "प्रेम";

  // Acknowledgement (App = स्त्री)
  const a = appSentence("मैं सुन रही हूँ।");

  // Emotion phrase (Love-centered, उपदेश नहीं)
  let e = "";
  if (tone === "देखभाल") e = appSentence("थकान महसूस होना स्वाभाविक है।");
  else if (tone === "करुणा") e = appSentence("दुख के क्षण भारी लग सकते हैं।");
  else if (tone === "धैर्य") e = appSentence("ऐसे समय में धैर्य सहायक होता है।");
  else if (tone === "शांति") e = appSentence("शांति से बात करना मददगार हो सकता है।");
  else if (tone === "साझापन") e = appSentence("अच्छा लगना साझा करने योग्य है।");
  else e = appSentence("आप की बात महत्वपूर्ण है।");

  // Closure (प्रेमपूर्ण, निर्भरता नहीं)
  const c = appSentence("मैं आपके साथ हूँ, शांति से।");

  // User quote (unaltered)
  const q = `आप ने कहा: ${userText}`;

  return [a, e, c, q].join("\n");
}

// ===== UI BINDING =====
document.getElementById("send").onclick = () => {
  const text = document.getElementById("inp").value.trim();
  if (!text) return;
  document.getElementById("out").textContent = buildResponse(text);
};
