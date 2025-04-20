import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const handleTextToSpeech = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text } = req.body;

    if (!text) {
      res.status(400).json({ error: 'No text provided' });
      return;
    }

    const elevenLabsApiKey = process.env.ELEVEN_LABS_API_KEY;
    if (!elevenLabsApiKey) {
      res.status(500).json({ error: 'ElevenLabs API key not set' });
      return;
    }

    const voiceId = 'onwK4e9ZLuTAKqWW03F9';

    const ttsResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': elevenLabsApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        voice_settings: {
          stability: 0.3,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!ttsResponse.ok) {
      const error = await ttsResponse.json();
      res.status(500).json({ error: error?.detail || 'TTS request failed' });
      return;
    }

    const audioBuffer = await ttsResponse.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.status(200).send(Buffer.from(audioBuffer));
  } catch (err) {
    console.error('TTS Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
