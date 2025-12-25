// Phase-1: Voice → Text → Voice (no emotion logic)

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

  // Text → Speech
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "hi-IN";
  utter.rate = 0.9;
  speechSynthesis.speak(utter);
};

recognition.onerror = () => {
  heardText.textContent = "आवाज़ समझ नहीं पाई। फिर कोशिश करें।";
};
