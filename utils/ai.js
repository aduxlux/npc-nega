import fetch from 'node-fetch';

// Using a public model that works reliably
const MODEL = 'bigcode/starcoder';

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

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    return data[0].generated_text.split('NPC:')[1]?.trim() || "NPC didn't respond.";
  } catch (err) {
    console.error("AI Error:", err);
    throw err;
  }
}
