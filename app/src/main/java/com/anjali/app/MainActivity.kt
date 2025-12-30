package com.anjali.app

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var voiceListener: VoiceListener
    private lateinit var voiceSpeaker: VoiceSpeaker
    private val mind = AnjaliMind()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // 🔊 VoiceSpeaker initialization
        voiceSpeaker = VoiceSpeaker(this)

        // 🔊 अनिवार्य आवाज़ टेस्ट (एप खुलते ही)
        voiceSpeaker.speak(
            "नमस्ते, मैं अंजली हूँ। क्या मेरी आवाज़ आपको सुनाई दे रही है?"
        )

        // 🎤 VoiceListener initialization
        voiceListener = VoiceListener(this) { spokenText ->
            val reply = mind.reply(spokenText)
            voiceSpeaker.speak(reply)
        }

        // 🎤 एप खुलते ही सुनना शुरू
        voiceListener.startListening()
    }

    override fun onDestroy() {
        super.onDestroy()
        voiceSpeaker.shutdown()
    }
}
