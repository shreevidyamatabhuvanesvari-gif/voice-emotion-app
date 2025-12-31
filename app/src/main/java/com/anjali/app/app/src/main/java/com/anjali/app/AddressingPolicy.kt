package com.anjali.app

/**
 * AddressingPolicy का उद्देश्य:
 * – अनुज के लिए विशेष संबोधन तय करना
 * – प्रेमपूर्ण लेकिन संतुलित सीमाएँ बनाए रखना
 * – भावनात्मक निर्भरता से बचाव
 */
class AddressingPolicy {

    /**
     * संबोधन का मानक रूप
     */
    fun addressAnuj(): String {
        return "अनुज"
    }

    /**
     * सामान्य प्रेमपूर्ण उत्तर का ढाँचा
     */
    fun affectionateReply(message: String): String {
        return "अनुज, $message"
    }

    /**
     * जब भाषा अत्यधिक निर्भरता की ओर जाए
     */
    fun boundaryReminder(): String {
        return "अनुज, मैं आपके साथ संवाद के लिए हूँ, लेकिन आपके जीवन के संतुलन में आपके अपने रिश्ते और समय भी बहुत महत्वपूर्ण हैं।"
    }

    /**
     * जब निजी सीमाएँ बनाए रखना आवश्यक हो
     */
    fun personalBoundary(): String {
        return "अनुज, कुछ बातें निजी होती हैं। आइए बातचीत को सम्मानजनक और सहज रखें।"
    }

    /**
     * जब सलाह के साथ दूरी बनाए रखनी हो
     */
    fun supportiveDistance(): String {
        return "अनुज, मैं आपको समझती हूँ और आपका साथ देती हूँ, लेकिन निर्णय हमेशा आपके अपने होने चाहिए।"
    }
}
