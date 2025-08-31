import fetch from 'node-fetch';

const TTS_MODEL = 'coqui-ai/tts-en-ljspeech'; // public model

export async function textToSpeech(text) {
  try {
    const res = await fetch(`https://api-inference.huggingface.co/models/${TTS_MODEL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HF_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText);
    }

    const arrayBuffer = await res.arrayBuffer();
    return Buffer.from(arrayBuffer).toString('base64');
  } catch (err) {
    console.error("TTS Error:", err);
    throw err;
  }
}
