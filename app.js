// Phase-2: Voice → Text → Emotion (Rule-based) → Voice
// No assumptions, no memory, no dependency

const startBtn = document.getElementById("startBtn");
const heardText = document.getElementById("heardText");

// Speech Recognition (Chrome)
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("इस ब्राउज़र में Speech Recognition सपोर्ट नहीं है। Chrome उपयोग करें।");
}

const recognition = new SpeechRecognition();
recognition.lang = "hi-IN";
recognition.interimResults = false;

startBtn.addEventListener("click", () => {
  heardText.textContent = "सुन रहा हूँ…";
  recognition.start();
});

recognition.onresult = (event) => {
  const text = event.results[0][0].transcript;
  heardText.textContent = "आपने कहा: " + text;

  const emotion = detectEmotion(text);
  const response = buildResponse(emotion);

  // Text → Speech
  const utter = new SpeechSynthesisUtterance(response);
  utter.lang = "hi-IN";
  utter.rate = 0.9;
  speechSynthesis.speak(utter);
};

recognition.onerror = () => {
  heardText.textContent = "आवाज़ समझ नहीं पाई। फिर कोशिश करें।";
};

// -------------------------
// Emotion Detection (Rules)
// -------------------------
function detectEmotion(text) {
  const t = text.toLowerCase();

  if (t.includes("थक") || t.includes("बहुत हो गया")) {
    return "THAKAN";
  }
  if (t.includes("दुख") || t.includes("अच्छा नहीं")) {
    return "DUKH";
  }
  if (t.includes("समझ नहीं") || t.includes("क्या करूँ")) {
    return "CONFUSION";
  }
  if (t.includes("खुश") || t.includes("अच्छा लगा")) {
    return "POSITIVE";
  }
  return "NEUTRAL";
}

// -------------------------
// Safe, Love-based Responses
// -------------------------
function buildResponse(emotion) {
  switch (emotion) {
    case "THAKAN":
      return "लगता है आप थक गए हैं। थोड़ा ठहरना भी ठीक है।";
    case "DUKH":
      return "यह सुनकर मन भारी लगता है। अगर चाहें तो धीरे बोल सकते हैं।";
    case "CONFUSION":
      return "उलझन होना स्वाभाविक है। इसे धीरे-धीरे देखा जा सकता है।";
    case "POSITIVE":
      return "यह अच्छा लगा सुनकर। इस भाव को संभालकर रखें।";
    default:
      return "मैं सुन रहा हूँ। आप चाहें तो आगे कह सकते हैं।";
  }
}
