function speak(text) {
    // 1. टेक्स्ट को हमेशा स्ट्रिंग में बदलना
    let toSpeak = "";

    if (typeof text === "string") {
        toSpeak = text.trim();
    } else if (text !== undefined && text !== null) {
        toSpeak = String(text);
    }

    // 2. अगर सोच/लॉजिक से खाली उत्तर आया
    if (toSpeak === "") {
        toSpeak = "मैं सुन रही हूँ।";
    }

    // 3. Speech synthesis object
    const utterance = new SpeechSynthesisUtterance(toSpeak);

    // 4. हिंदी आवाज़ उपलब्ध हो तो चुनें, नहीं तो default
    const voices = window.speechSynthesis.getVoices();
    for (let i = 0; i < voices.length; i++) {
        if (voices[i].lang && voices[i].lang.startsWith("hi")) {
            utterance.voice = voices[i];
            break;
        }
    }

    // 5. पहले से चल रही आवाज़ बंद करें
    window.speechSynthesis.cancel();

    // 6. बोलना हमेशा trigger हो
    window.speechSynthesis.speak(utterance);
}    input.value = "";
  };
};
