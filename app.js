// ===============================
// FRIEND CORE — STABLE VERSION
// ===============================

// ---- MEMORY ----
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
  return mem.length ? mem[mem.length - 1] : null;
}

// ---- EMOTION DETECTION ----
function detectEmotion(text) {
  const t = text.toLowerCase();

  if (t.includes("थक")) return "thakaan";
  if (t.includes("दुख") || t.includes("उदास") || t.includes("अकेला")) return "dukh";
  if (t.includes("समझ") || t.includes("पता नहीं")) return "bhram";
  if (t.includes("गुस्सा") || t.includes("नाराज़")) return "krodh";
  if (t.includes("खुश") || t.includes("अच्छा")) return "khushi";

  return "normal";
}

// ---- FRIEND RESPONSE ----
function friendReply(userText) {
  const emotion = detectEmotion(userText);
  const prev = lastMemory();

  let a = "मैं सुन रही हूँ।";
  let b = "";
  let c = "";

  switch (emotion) {
    case "dukh":
      b = "लगता है मन भारी है।";
      c = "क्या आज कुछ ऐसा हुआ जो आपको दुख दे गया?";
      break;

    case "thakaan":
      b = "थकान महसूस हो रही है।";
      c = "आज दिन ज़्यादा लंबा रहा क्या?";
      break;

    case "bhram":
      b = "आप उलझन में लग रहे हैं।";
      c = "किस बात ने आपको सोच में डाल दिया?";
      break;

    case "krodh":
      b = "गुस्सा भीतर दबा हुआ सा है।";
      c = "अगर चाहें तो थोड़ा बता सकते हैं।";
      break;

    case "khushi":
      b = "आपकी बातों में खुशी है।";
      c = "कुछ अच्छा हुआ क्या?";
      break;

    default:
      b = "मैं आपकी बात समझने की कोशिश कर रही हूँ।";
      c = "आप आगे क्या कहना चाहेंगे?";
  }

  if (prev && prev.emotion === emotion && emotion !== "normal") {
    b = "लगता है यह भावना पहले भी बनी हुई थी।";
  }

  const reply = a + " " + b + " " + c;

  saveMemory({
    user: userText,
    emotion,
    reply,
    time: Date.now()
  });

  return reply;
}

// ---- UI BINDING (FIXED) ----
window.onload = function () {
  const sendBtn = document.getElementById("send");
  const input = document.getElementById("inp");
  const output = document.getElementById("out");

  sendBtn.onclick = function () {
    const text = input.value.trim();
    if (!text) return;

    const response = friendReply(text);
    output.textContent = response;
    input.value = "";
  };
};
