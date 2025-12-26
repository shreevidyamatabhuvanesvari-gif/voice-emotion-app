// ===== RESPONSE CORE (DEEP + LOVE-CENTERED) =====
function generateResponse(text) {
  const t = text.toLowerCase();

  // Identity
  if (t.includes("कौन") || t.includes("तुम कौन")) {
    return "मैं अंजली हूँ। शांति से, बिना जल्दी किए, आपकी बात सुनने के लिए।";
  }

  // Fatigue
  if (t.includes("थक")) {
    return "थकान अक्सर तब आती है जब मन बहुत कुछ संभाले रहता है। थोड़ा रुकना, अपने लिए भी ज़रूरी है।";
  }

  // Sadness
  if (t.includes("दुख") || t.includes("उदास")) {
    return "दुख के समय शब्द कम और साथ ज़्यादा मायने रखता है। आप चाहें तो मैं बस सुनती रहूँ।";
  }

  // Loneliness
  if (t.includes("अकेल")) {
    return "अकेलापन भीतर से भारी लग सकता है। अभी इस पल में, आप पूरी तरह अकेले नहीं हैं।";
  }

  // Confusion
  if (t.includes("समझ नहीं") || t.includes("पता नहीं")) {
    return "हर बात का तुरंत स्पष्ट होना ज़रूरी नहीं। कभी-कभी ठहरकर देखना ही उत्तर देता है।";
  }

  // Happiness
  if (t.includes("खुश") || t.includes("अच्छा")) {
    return "यह सुनकर मन हल्का होता है। ऐसे क्षण धीरे-धीरे भीतर टिक जाते हैं।";
  }

  // Anger
  if (t.includes("गुस्सा") || t.includes("नाराज़")) {
    return "गुस्सा अक्सर किसी गहरी थकान या चोट का संकेत होता है। इसे थोड़ा समय देना ठीक है।";
  }

  // Default — warm, non-mechanical
  return "आप जो महसूस कर रहे हैं, उसे अपने शब्दों में कह सकते हैं। मैं ध्यान से सुन रही हूँ।";
}
