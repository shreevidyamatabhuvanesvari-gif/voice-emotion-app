// ===============================
// FRIEND CORE — FINAL
// PURPOSE: Two-friend style conversation with emotion + memory
// ===============================

// --------- MEMORY (LOCAL) ---------
const MEMORY_KEY = "FRIEND_APP_MEMORY";

function loadMemory() {
  try {
    return JSON.parse(localStorage.getItem(MEMORY_KEY)) || [];
  } catch {
    return [];
  }
}

function saveMemory(entry) {
  const mem = loadMemory();
  mem.push(entry);
  localStorage.setItem(MEMORY_KEY, JSON.stringify(mem));
}

function lastMemory() {
  const mem = loadMemory();
  return mem.length > 0 ? mem[mem.length - 1] : null;
}

// --------- EMOTION CORE ---------
const EMOTION_RULES = {
  priority: ["thakaan", "dukh", "bhram", "krodh", "khushi"],
  keywords: {
    thakaan: ["थक", "थक गया", "थकावट"],
    dukh: ["दुख", "उदास", "अकेला", "भारी मन", "तकलीफ"],
    bhram: ["समझ नहीं", "पता नहीं", "कन्फ्यूज", "भ्रम"],
    krodh: ["गुस्सा", "नाराज़", "क्रोध"],
    khushi: ["खुश", "अच्छा", "प्रसन्न"]
  }
};

function detectEmotion(text) {
  const t = text.toLowerCase();
  for (const emo of EMOTION_RULES.priority) {
    const keys = EMOTION_RULES.keywords[emo];
    if (keys.some(k => t.includes(k))) {
      return emo;
    }
  }
  return "normal";
}

// --------- FRIEND BRAIN ---------
function friendReply(userText) {
  const emotion = detectEmotion(userText);
  const previous = lastMemory();

  let line1 = "मैं सुन रही हूँ।";
  let line2 = "";
  let line3 = "";

  // ---- Emotion-based response ----
  switch (emotion) {
    case "dukh":
      line2 = "लगता है मन आज थोड़ा भारी है।";
      line3 = "क्या आज कुछ ऐसा हुआ जिसने आपको उदास कर दिया?";
      break;

    case "thakaan":
      line2 = "थकान आपकी बातों में महसूस हो रही है।";
      line3 = "आज दिन बहुत लंबा रहा क्या?";
      break;

    case "bhram":
      line2 = "आप किसी उलझन में लग रहे हैं।";
      line3 = "कौन-सी बात आपको साफ़ नहीं लग रही?";
      break;

    case "krodh":
      line2 = "गुस्सा भीतर दबा हुआ सा लग रहा है।";
      line3 = "अगर चाहें तो थोड़ी बात करके मन हल्का कर सकते हैं।";
      break;

    case "khushi":
      line2 = "आपकी बातों में खुशी झलक रही है।";
      line3 = "क्या कोई अच्छी खबर है जिसे साझा करना चाहेंगे?";
      break;

    default:
      line2 = "मैं आपकी बात ध्यान से समझने की कोशिश कर रही हूँ।";
      line3 = "आप आगे क्या कहना चाहेंगे?";
  }

  // ---- Memory continuity ----
  if (previous && previous.emotion === emotion && emotion !== "normal") {
    line2 = "लगता है यह भावना पहले भी आपके साथ थी।";
  }

  const reply = [line1, line2, line3].join(" ");

  // ---- Save memory ----
  saveMemory({
    user: userText,
    emotion: emotion,
    reply: reply,
    time: Date.now()
  });

  return reply;
}

// --------- UI CONTROL ---------
document.getElementById("send").onclick = () => {
  const inp = document.getElementById("inp");
  const out = document.getElementById("out");

  const text = inp.value.trim();
  if (!text) return;

  const response = friendReply(text);
  out.textContent = response;
  inp.value = "";
};
