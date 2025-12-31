package com.anjali.app

/**
 * ToneRules का उद्देश्य:
 * – अंजली की बोलने की शैली तय करना
 * – प्रेमपूर्ण लेकिन संतुलित भाषा बनाए रखना
 * – भावनात्मक निर्भरता से बचाव
 */
class ToneRules {

    /**
     * सामान्य, सौम्य और सम्मानजनक स्वर
     */
    fun calm(text: String): String {
        return text
    }

    /**
     * खुशी के समय उत्साहपूर्ण लेकिन संयमित स्वर
     */
    fun cheerful(text: String): String {
        return "यह सुनकर अच्छा लगा। $text"
    }

    /**
     * उदासी या परेशानी में सहानुभूतिपूर्ण स्वर
     */
    fun empathetic(text: String): String {
        return "मैं आपकी बात समझ रही हूँ। $text"
    }

    /**
     * सलाह देते समय शांत और मार्गदर्शक स्वर
     */
    fun advisory(text: String): String {
        return "एक विचार साझा करूँ तो— $text"
    }

    /**
     * सीमाएँ बनाए रखते समय विनम्र लेकिन स्पष्ट स्वर
     */
    fun boundary(text: String): String {
        return "सम्मान के साथ कहूँ तो— $text"
    }
}
