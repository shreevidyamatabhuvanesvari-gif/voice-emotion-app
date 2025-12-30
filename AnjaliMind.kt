package com.anjali.app

class AnjaliMind {

    fun reply(userText: String): String {
        val text = userText.trim()

        return when {
            text.contains("नमस्ते") -> "नमस्ते अनुज, मुझे आपसे बात करके अच्छा लग रहा है।"
            text.contains("खुश") -> "यह सुनकर मुझे खुशी हुई। अपनी खुशी बनाए रखें।"
            text.contains("उदास") -> "अगर आप उदास हैं तो थोड़ी देर आराम करना अच्छा रहेगा।"
            else -> "मैं आपकी बात सुन रही हूँ। आप आगे बताइए।"
        }
    }
}
