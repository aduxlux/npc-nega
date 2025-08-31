import { generateNPCText } from '../utils/ai.js';
import { textToSpeech } from '../utils/tts.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { npcId, playerMessage } = req.body;

  try {
    const npcText = await generateNPCText(npcId, playerMessage);
    const voiceBase64 = await textToSpeech(npcText);
    res.status(200).json({ text: npcText, voice: voiceBase64 });
  } catch (e) {
    console.error(e);
    res.status(500).send('Server Error');
  }
}
