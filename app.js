// ===== VOICE INPUT =====
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "hi-IN";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// बोलिए बटन
document.getElementById("speak").onclick = () => {
  recognition.start();
};

// जब यूज़र बोल चुका हो
recognition.onresult = (event) => {
  const spokenText = event.results[0][0].transcript;
  document.getElementById("inp").value = spokenText;

  // उसी टेक्स्ट से जवाब बनाओ
  const response = buildResponse(spokenText);
  document.getElementById("out").textContent = response;

  // आवाज़ में बोलो
  speak(response);
};

// error handler (ज़रूरी)
recognition.onerror = (e) => {
  document.getElementById("out").textContent =
    "आवाज़ पहचानने में समस्या हुई।";
};}
