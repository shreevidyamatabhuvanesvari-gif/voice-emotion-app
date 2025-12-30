package com.anjali.app

import android.content.Context
import android.content.SharedPreferences

class MemoryStore(context: Context) {

    private val prefs: SharedPreferences =
        context.getSharedPreferences("anjali_memory", Context.MODE_PRIVATE)

    fun save(key: String, value: String) {
        prefs.edit()
            .putString(key, value)
            .apply()
    }

    fun get(key: String): String? {
        return prefs.getString(key, null)
    }

    fun remove(key: String) {
        prefs.edit()
            .remove(key)
            .apply()
    }

    fun clearAll() {
        prefs.edit()
            .clear()
            .apply()
    }
}
