// server/voice.ts
// Voice synthesis configuration for Grace
// Uses ElevenLabs API for text-to-speech

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

// Jessica - North American female voice (warm, natural, NOT British, NOT male)
// CRITICAL: Must be Canadian/North American English female voice
const VOICE_ID = "cgSgspJ2msm6clMCkdW9"; // Jessica

const VOICE_SETTINGS = {
  stability: 0.25,           // Lower = more expressive/natural
  similarity_boost: 0.75,    // Balance between accuracy and naturalness
  style: 0.85,               // Higher = more conversational/warm
  use_speaker_boost: true,   // Enhance voice clarity
};

export async function synthesizeSpeech(text: string): Promise<ArrayBuffer> {
  if (!ELEVENLABS_API_KEY) {
    throw new Error("ELEVENLABS_API_KEY is not configured");
  }

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_turbo_v2_5",
        voice_settings: VOICE_SETTINGS,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("ElevenLabs API error:", error);
    throw new Error(`Voice synthesis failed: ${response.status}`);
  }

  return response.arrayBuffer();
}
