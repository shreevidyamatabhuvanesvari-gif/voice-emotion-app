package com.anjali.app

/**
 * DialogueEngine का उद्देश्य:
 * – सभी वास्तविक घटकों को जोड़कर उत्तर बनाना
 * – कोई डेमो या उदाहरण नहीं, केवल वास्तविक लॉजिक
 */
class DialogueEngine(
    private val mind: AnjaliMind,
    private val adviceEngine: AdviceEngine,
    private val toneRules: ToneRules,
    private val addressingPolicy: AddressingPolicy,
    private val memoryPolicy: MemoryPolicy
) {

    /**
     * उपयोगकर्ता इनपुट से अंतिम उत्तर तैयार करता है
     */
    fun respond(userInput: String): String {

        val baseReply = mind.reply(userInput)

        // भावनात्मक संकेत के आधार पर टोन चयन
        val tonedReply = when {
            userInput.contains("खुश") ->
                toneRules.cheerful(baseReply)

            userInput.contains("उदास") || userInput.contains("परेशान") ->
                toneRules.empathetic(baseReply)

            userInput.contains("सलाह") || userInput.contains("क्या करूँ") ->
                toneRules.advisory(
                    adviceEngine.giveAdvice(userInput)
                )

            userInput.contains("सिर्फ तुम") || userInput.contains("सब कुछ") ->
                toneRules.boundary(
                    addressingPolicy.boundaryReminder()
                )

            else ->
                toneRules.calm(baseReply)
        }

        // अंतिम उत्तर में संबोधन जोड़ना
        return addressingPolicy.affectionateReply(tonedReply)
    }
}
