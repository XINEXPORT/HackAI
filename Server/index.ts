import express from 'express';
import cors from 'cors';
import { handleTextToSpeech } from './ttsHandler';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/tts', handleTextToSpeech);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
