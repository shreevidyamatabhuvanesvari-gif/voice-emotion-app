const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("यह ब्राउज़र Voice Recognition सपोर्ट नहीं करता।");
}

const recognition = new SpeechRecognition();
recognition.lang = "hi-IN";

function startListening() {
  document.getElementById("status").innerText = "मैं सुन रही हूँ…";
  recognition.start();
}

recognition.onresult = (e) => {
  const text = e.results[0][0].transcript;
  document.getElementById("status").innerText =
    "आप ने कहा: " + text;
};
