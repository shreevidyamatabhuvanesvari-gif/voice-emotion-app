// ===== Speech Recognition =====
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "hi-IN";
recognition.interimResults = false;
recognition.continuous = false;

// ===== Text-to-Speech =====
const synth = window.speechSynthesis;

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "hi-IN";
  synth.cancel(); // 🔒 जरूरी: overlapping रोकने के लिए
  synth.speak(utterance);
}

// 🔴 IMPORTANT FIX: button click = direct mic start
function startListening() {
  try {
    recognition.stop(); // अगर पहले से चल रहा हो
    document.getElementById("status").innerText = "मैं सुन रही हूँ…";
    recognition.start(); // ✅ VALID USER GESTURE CONTEXT
  } catch (e) {
    console.error(e);
  }
}

// ===== Recognition Result =====
recognition.onresult = function (event) {
  const userSpeech = event.results[0][0].transcript;

  const response =
    "आप ने कहा: " + userSpeech + "। मैं सुन रही हूँ।";

  document.getElementById("status").innerText = response;
  speak(response);
};

recognition.onerror = function () {
  speak("मैं सुन रही हूँ। आप फिर से बोल सकते हैं।");
};

// Initial greeting (TTS only — mic NOT started here)
window.onload = () => {
  speak("मैं सुन रही हूँ। बोलिए बटन दबाइए।");
};
