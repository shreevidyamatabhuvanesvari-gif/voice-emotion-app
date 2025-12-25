// ===== DATA (LOCKED) =====
const EMOTION_RULES = {
  priority: ["thakaan", "dukh", "krodh", "bhram", "khushi"],
  keywords: {
    thakaan: ["थक", "थका", "थक गया", "थकावट"],
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

  const a = "मैं सुन रही हूँ।";
  let e = "";

  switch (loveTone) {
    case "देखभाल":
      e = "थकान महसूस होना स्वाभाविक है।";
      break;
    case "करुणा":
      e = "दुख के क्षण भारी लग सकते हैं।";
      break;
    case "धैर्य":
      e = "ऐसे समय में धैर्य सहारा देता है।";
      break;
    case "शांति":
      e = "शांति से बात करना बेहतर होता है।";
      break;
    case "साझापन":
      e = "अच्छा लगना साझा करने योग्य है।";
      break;
    default:
      e = "आप की बात महत्वपूर्ण है।";
  }

  const c = "मैं आपके साथ हूँ, शांति से।";
  return `${a}\n${e}\n${c}`;
}

// ===== TEXT TO SPEECH (CERTAIN) =====
function speakText(text) {
  if (!window.speechSynthesis) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "hi-IN";

  const voices = speechSynthesis.getVoices();
  const femaleHindi = voices.find(v =>
    v.lang === "hi-IN" && v.name.toLowerCase().includes("female")
  );

  if (femaleHindi) utter.voice = femaleHindi;

  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

// ===== UI =====
document.getElementById("send").onclick = () => {
  const text = document.getElementById("inp").value.trim();
  if (!text) return;

  const response = buildResponse(text);
  document.getElementById("out").textContent = response;
  speakText(response);
};

// ===== VOICE INPUT =====
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = "hi-IN";
  recognition.interimResults = false;

  document.getElementById("speak").onclick = () => {
    recognition.start();
  };

  recognition.onresult = e => {
    document.getElementById("inp").value =
      e.results[0][0].transcript;
  };
}
