import { generateNPCText } from '../utils/ai.js';
import { textToSpeech } from '../utils/tts.js';

export default async function handler(req, res) {
  console.log("Request method:", req.method);
  console.log("Body:", req.body);

  // Allow GET for browser test
  if (req.method === 'GET') {
    return res.status(200).json({ message: "Send a POST request with npcId and playerMessage." });
  }

  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { npcId, playerMessage } = req.body;
    if (!npcId || !playerMessage) {
      return res.status(400).send('Missing npcId or playerMessage');
    }

    // Generate NPC text
    const npcText = await generateNPCText(npcId, playerMessage);
    console.log("NPC Text:", npcText);

    // Convert to speech
    const voiceBase64 = await textToSpeech(npcText);

    // Return JSON
    res.status(200).json({ text: npcText, voice: voiceBase64 });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: err.message });
  }
}
