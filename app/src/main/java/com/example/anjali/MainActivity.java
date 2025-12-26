package com.example.anjali;

import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    TextToSpeech tts;
    Button speakBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        speakBtn = findViewById(R.id.speakBtn);

        tts = new TextToSpeech(this, status -> {
            if (status == TextToSpeech.SUCCESS) {
                tts.setLanguage(new Locale("hi", "IN"));
                tts.setSpeechRate(0.85f);   // शांत गति
                tts.setPitch(1.0f);        // प्राकृतिक स्वर
            }
        });

        speakBtn.setOnClickListener(v -> speak());
    }

    void speak() {
        String text =
                "मैं अंजली हूँ। "
              + "मैं तुम्हारी बात सुन रही हूँ। "
              + "आराम से बोलो।";

        tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "ANJALI_VOICE");
    }

    @Override
    protected void onDestroy() {
        if (tts != null) {
            tts.stop();
            tts.shutdown();
        }
        super.onDestroy();
    }
}
