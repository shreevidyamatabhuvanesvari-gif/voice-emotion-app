package com.anjali.app

import android.content.Context
import android.speech.tts.TextToSpeech
import java.util.Locale

class VoiceSpeaker(context: Context) : TextToSpeech.OnInitListener {

    private val textToSpeech: TextToSpeech =
        TextToSpeech(context, this)

    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            textToSpeech.language = Locale("hi", "IN")
            textToSpeech.setPitch(1.1f)       // मधुर स्वर
            textToSpeech.setSpeechRate(0.9f) // शांत गति
        }
    }

    fun speak(text: String) {
        if (text.isNotBlank()) {
            textToSpeech.speak(
                text,
                TextToSpeech.QUEUE_FLUSH,
                null,
                null
            )
        }
    }

    fun shutdown() {
        textToSpeech.shutdown()
    }
}
