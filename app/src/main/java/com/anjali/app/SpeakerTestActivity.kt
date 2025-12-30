package com.anjali.app

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

/**
 * यह Activity केवल VoiceSpeaker की टेस्टिंग के लिए है।
 * इसका उद्देश्य सिर्फ़ यह सुनिश्चित करना है
 * कि Text-to-Speech सही काम कर रहा है।
 */
class SpeakerTestActivity : AppCompatActivity() {

    private lateinit var voiceSpeaker: VoiceSpeaker

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        voiceSpeaker = VoiceSpeaker(this)

        // 🔊 अनिवार्य और स्पष्ट स्पीकर टेस्ट
        voiceSpeaker.speak(
            "नमस्ते, मैं अंजली हूँ। यह स्पीकर की परीक्षण आवाज़ है।"
        )
    }

    override fun onDestroy() {
        super.onDestroy()
        voiceSpeaker.shutdown()
    }
}
