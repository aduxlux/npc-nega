import express from 'express';
import bodyParser from 'body-parser';
import { generateNPCText } from './utils/ai.js';
import { textToSpeech } from './utils/tts.js';

const app = express();
app.use(bodyParser.json());

app.post('/npc-talk', async (req, res) => {
    const { npcId, playerMessage } = req.body;

    try {
        const npcText = await generateNPCText(npcId, playerMessage);
        const voiceBase64 = await textToSpeech(npcText);
        res.json({ text: npcText, voice: voiceBase64 });
    } catch(e) {
        console.error(e);
        res.status(500).send('Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
