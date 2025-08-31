import fetch from 'node-fetch';

// Public Hugging Face model
const MODEL = 'bigscience/bloomz-560m';

export async function generateNPCText(npcId, playerMessage) {
  const personalities = {
    npc1: "Brave Village Guard",
    npc2: "Mystical Merchant",
    npc3: "Wise Librarian"
  };
  const prompt = `${personalities[npcId]}\nPlayer: ${playerMessage}\nNPC:`;

  try {
    const res = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HF_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: prompt })
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HF AI Error: ${errorText}`);
    }

    const data = await res.json();
    return data[0]?.generated_text.split('NPC:')[1]?.trim() || "NPC didn't respond.";
  } catch (err) {
    console.error("AI Error:", err);
    throw err;
  }
}
