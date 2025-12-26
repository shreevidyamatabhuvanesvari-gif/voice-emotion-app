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
  status.textContent = "अंजली सुन रही है…";
  recognition.start();
};

// When speech captured
recognition.onresult = (event) => {
  const userText = event.results[0][0].transcript;
  textBox.textContent = "आप: " + userText;

  const reply = generateReply(userText);
  speak(reply);

  status.textContent = "";
};

// Error handling
recognition.onerror = () => {
  status.textContent = "आवाज़ स्पष्ट नहीं थी, फिर से बोलिए।";
};

// ===== RESPONSE LOGIC (FIXED, NOT REPEAT) =====
function generateReply(text) {
  const t = text.toLowerCase();

  if (t.includes("थक")) {
    return "थकान महसूस होना स्वाभाविक है। थोड़ा आराम करना ठीक रहेगा।";
  }

  if (t.includes("दुख") || t.includes("उदास")) {
    return "दुख के समय चुप रहना भी एक सहारा होता है। मैं सुन रही हूँ।";
  }

  if (t.includes("अकेल")) {
    return "अकेलापन भारी लग सकता है। आप अभी अकेले नहीं हैं।";
  }

  if (t.includes("खुश")) {
    return "यह सुनकर अच्छा लगा। खुशी बाँटने से और बढ़ती है।";
  }

  // Default reply
  return "मैं आपकी बात समझने की कोशिश कर रही हूँ। आप आगे कह सकते हैं।";
}

// Text-to-Speech
function speak(message) {
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "hi-IN";
  speechSynthesis.speak(utterance);
}
