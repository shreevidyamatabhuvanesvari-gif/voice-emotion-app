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

// ===== FINAL CONVERSATIONAL CORE (LOCKED SPEC) =====
function generateResponse(text) {
  const t = text.toLowerCase();

  const isQuestion =
    t.includes("क्या") || t.includes("क्यों") || t.includes("कैसे");

  const fatigue = t.includes("थक");
  const sadness = t.includes("दुख") || t.includes("उदास") || t.includes("भारी");
  const loneliness = t.includes("अकेल");
  const confusion = t.includes("समझ नहीं") || t.includes("पता नहीं");
  const happiness = t.includes("खुश") || t.includes("अच्छा");
  const anger = t.includes("गुस्सा") || t.includes("नाराज़");

  // --- भाव + मित्रवत प्रतिक्रिया ---
  if (fatigue) {
    return "लगता है आज आप बहुत कुछ झेल रहे हैं। थोड़ा रुककर साँस लेना भी अपने लिए जगह बनाना है। आप चाहें तो बताइए, क्या सबसे ज़्यादा थका रहा है?";
  }

  if (sadness) {
    return "दुख के समय सलाह से ज़्यादा साथ ज़रूरी होता है। मैं यहीं हूँ। अगर कहना चाहें तो धीरे-धीरे कह सकते हैं।";
  }

  if (loneliness) {
    return "अकेलापन चुपचाप भीतर बैठ जाता है। अभी इस पल में, आप अकेले नहीं हैं। क्या यह भावना हाल-फिलहाल ज़्यादा बढ़ी है?";
  }

  if (confusion && isQuestion) {
    return "जब मन उलझा हो, तब तुरंत स्पष्टता नहीं मिलती। हम इसे साथ-साथ सुलझा सकते हैं। आप किस हिस्से को लेकर सबसे ज़्यादा अटके हैं?";
  }

  if (anger) {
    return "गुस्सा अक्सर किसी गहरी थकान या चोट की आवाज़ होता है। अभी उसे बाहर आने देना भी ठीक है।";
  }

  if (happiness) {
    return "यह सुनकर अच्छा लगा। ऐसे पल मन को हल्का कर देते हैं। आज की खुशी में सबसे अच्छा क्या लगा?";
  }

  // --- प्रश्न है लेकिन भावना स्पष्ट नहीं ---
  if (isQuestion) {
    return "यह अच्छा प्रश्न है। आप चाहें तो इसे थोड़ा और खोलकर कह सकते हैं, ताकि मैं ठीक से समझ सकूँ।";
  }

  // --- डिफ़ॉल्ट: खुला, मित्रवत, सुनने वाला ---
  return "आप जो महसूस कर रहे हैं, उसे अपने शब्दों में कह सकते हैं। मैं ध्यान से सुन रही हूँ।";
}

// ===== TEXT TO SPEECH =====
function speak(message) {
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "hi-IN";
  utterance.rate = 0.9;
  utterance.pitch = 1.0;
  speechSynthesis.speak(utterance);
}
