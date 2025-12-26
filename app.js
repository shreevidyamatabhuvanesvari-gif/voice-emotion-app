// ===== ELEMENTS =====
const btn = document.getElementById("speakBtn");
const status = document.getElementById("status");
const textBox = document.getElementById("text");

// ===== SPEECH RECOGNITION =====
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "hi-IN";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// ===== BUTTON ACTION =====
btn.onclick = () => {
  status.textContent = "अंजली सुन रही है…";
  recognition.start();
};

// ===== ON USER SPEAK =====
recognition.onresult = (event) => {
  const userText = event.results[0][0].transcript;
  textBox.textContent = "आप: " + userText;

  const reply = generateResponse(userText);
  speak(reply);

  status.textContent = "";
};

// ===== ERROR =====
recognition.onerror = () => {
  status.textContent = "आवाज़ स्पष्ट नहीं थी। फिर से बोलिए।";
};

// ===== RESPONSE CORE (NO REPEAT) =====
function generateResponse(text) {
  const t = text.toLowerCase();

  if (t.includes("कौन") || t.includes("तुम कौन")) {
    return "मैं अंजली हूँ। आपसे शांति से बात करने के लिए यहाँ हूँ।";
  }

  if (t.includes("थक")) {
    return "थकान महसूस होना स्वाभाविक है। थोड़ा रुकना भी ज़रूरी होता है।";
  }

  if (t.includes("दुख") || t.includes("उदास")) {
    return "दुख के समय किसी का सुनना ज़्यादा मायने रखता है। मैं सुन रही हूँ।";
  }

  if (t.includes("अकेल")) {
    return "अकेलापन महसूस होना कठिन होता है। अभी आप अकेले नहीं हैं।";
  }

  if (t.includes("खुश") || t.includes("अच्छा")) {
    return "यह सुनकर अच्छा लगा। ऐसे पल सहेज कर रखने चाहिए।";
  }

  if (t.includes("क्या कर")) {
    return "मैं आपकी बात सुन रही हूँ और समझने की कोशिश कर रही हूँ।";
  }

  // DEFAULT — NON ECHO
  return "आप जो कहना चाहते हैं, उसे थोड़ा और विस्तार से कह सकते हैं।";
}

// ===== TEXT TO SPEECH =====
function speak(message) {
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "hi-IN";
  utterance.rate = 0.9;
  utterance.pitch = 1.0;
  speechSynthesis.speak(utterance);
}
