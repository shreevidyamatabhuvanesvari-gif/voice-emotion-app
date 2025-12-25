// ===== DATA (LOCKED) =====
const EMOTION_RULES = {
  priority: ["thakaan", "dukh", "krodh", "bhram", "khushi"],
  keywords: {
    thakaan: ["थक", "थका", "थक गया", "थक गया हूँ", "थकावट"],
    dukh: ["दुख", "उदास", "अकेला", "तकलीफ"],
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

function buildResponse(userText) {
  const primary = detectEmotion(userText);
  const loveTone = LOVE_MAP[primary] || "प्रेम";

  // Acknowledgement (App = स्त्री)
  const a = "मैं सुन रही हूँ।";

  // Emotion phrase (love-centered)
  let e = "";
  switch (loveTone) {
    case "देखभाल":
      e = "थकान महसूस होना स्वाभाविक है।";
      break;
    case "करुणा":
      e = "दुख के क्षण भारी लग सकते हैं।";
      break;
    case "धैर्य":
      e = "ऐसे समय में धैर्य मदद करता है।";
      break;
    case "शांति":
      e = "शांति से बात करना सहायक हो सकता है।";
      break;
    case "साझापन":
      e = "अच्छा लगना साझा करने योग्य है।";
      break;
    default:
      e = "आप की बात महत्वपूर्ण है।";
  }

  // Love-based closure (non-dependent)
  const c = "मैं आपके साथ हूँ, शांति से।";

  // User quote (unaltered)
  const q = `आप ने कहा: ${userText}`;

  return [a, e, c, q].join("\n");
}

// ===== UI =====
document.getElementById("send").onclick = () => {
  const text = document.getElementById("inp").value.trim();
  if (!text) return;
  document.getElementById("out").textContent = buildResponse(text);
};
