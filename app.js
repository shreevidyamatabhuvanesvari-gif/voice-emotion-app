// ===== Voice Recognition =====
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "hi-IN";
recognition.interimResults = false;

// ===== Text-to-Speech =====
const synth = window.speechSynthesis;

// 🔒 ROLE LOCK
const APP_ROLE = "female";   // एप स्वयं
const USER_ROLE = "male";    // उपयोगकर्ता

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "hi-IN";

  const voices = synth.getVoices();
  const femaleVoice = voices.find(v =>
    v.lang === "hi-IN" && v.name.toLowerCase().includes("female")
  );

  if (femaleVoice) {
    utterance.voice = femaleVoice;
  }

  synth.speak(utterance);
}

function startListening() {
  document.getElementById("status").innerText = "मैं सुन रही हूँ…";
  recognition.start();
}

recognition.onresult = function (event) {
  const userSpeech = event.results[0][0].transcript;

  // 🔒 GRAMMAR RULE (FIXED)
  const response =
    "आप कह रहे हैं: " + userSpeech + "। मैं सुन रही हूँ।";

  document.getElementById("status").innerText = response;
  speak(response);
};

recognition.onerror = function () {
  speak("मैं सुन रही हूँ, आप फिर से बोलिए।");
};

// Initial greeting
window.onload = () => {
  speak("मैं सुन रही हूँ। आप बोल सकते हैं।");
};
