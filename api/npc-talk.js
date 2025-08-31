import { generateNPCText } from '../../utils/ai.js';
import { textToSpeech } from '../../utils/tts.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { npcId, playerMessage } = req.body;
    console.log("Request:", npcId, playerMessage);

    const npcText = await generateNPCText(npcId, playerMessage);
    console.log("NPC Text:", npcText);

    const voiceBase64 = await textToSpeech(npcText);
    res.status(200).json({ text: npcText, voice: voiceBase64 });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).send('Server Error');
  }
}
