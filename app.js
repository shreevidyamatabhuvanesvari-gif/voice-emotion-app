const btn = document.getElementById("speakBtn");
const status = document.getElementById("status");
const textBox = document.getElementById("text");

// Speech Recognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "hi-IN";
recognition.interimResults = false;

// Button click
btn.onclick = () => {
  status.textContent = "सुन रही हूँ...";
  recognition.start();
};

// When speech captured
recognition.onresult = (event) => {
  const spokenText = event.results[0][0].transcript;
  textBox.textContent = "आपने कहा: " + spokenText;

  speak("मैं सुन रही हूँ। आपने कहा: " + spokenText);
  status.textContent = "";
};

// Error handling
recognition.onerror = () => {
  status.textContent = "आवाज़ नहीं सुन पाई। फिर प्रयास करें।";
};

// Text-to-Speech
function speak(message) {
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "hi-IN";
  speechSynthesis.speak(utterance);
}
