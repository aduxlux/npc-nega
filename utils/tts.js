import fetch from 'node-fetch';

export async function textToSpeech(text) {
  const res = await fetch('https://api-inference.huggingface.co/models/coqui/tts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.HF_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  });
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer).toString('base64');
}
