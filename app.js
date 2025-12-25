// ===== Speech Recognition =====
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "hi-IN";
recognition.interimResults = false;

// ===== Text-to-Speech =====
const synth = window.speechSynthesis;

// ===== Roles (LOCKED) =====
// App speaks as female (self-reference only)
// User is addressed without gendered verbs (neutral)
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "hi-IN";
  synth.speak(utterance);
}

function startListening() {
  document.getElementById("status").innerText = "मैं सुन रही हूँ…";
  recognition.start();
}

recognition.onresult = function (event) {
  const userSpeech = event.results[0][0].transcript;

  // 🔒 GENDER-SAFE RESPONSE (NO feminine/masculine verbs for user)
  const response =
    "आप ने कहा: " + userSpeech + "। मैं सुन रही हूँ।";

  document.getElementById("status").innerText = response;
  speak(response);
};

recognition.onerror = function () {
  speak("मैं सुन रही हूँ। आप फिर से बोल सकते हैं।");
};

// Initial greeting
window.onload = () => {
  speak("मैं सुन रही हूँ। आप बोल सकते हैं।");
};
