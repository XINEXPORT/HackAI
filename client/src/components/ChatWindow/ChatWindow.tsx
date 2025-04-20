import { useState } from 'react';
import { Container, Input, Message} from './styled';

type AIResponse = {
  text: string;
  media?: string[];
};

const ChatWindow = () => {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchOpenAI = async (prompt: string) => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    if (!apiKey) {
      setAiResponse({
        text: 'API key is missing. Please check your environment config.',
      });
      return;
    }

    setLoading(true);

    try {
      // 🧠 GPT-4: Get a description
      const chatRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        }),
      });

      const chatData = await chatRes.json();
      console.log('📦 Full GPT-4 response:', chatData);

      const text = chatData.choices?.[0]?.message?.content || 'No text found';
      console.log('🧠 GPT Text:', text);

      // 🎨 DALL·E: Generate an image
      const dalleRes = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt,
          n: 1,
          size: '512x512',
        }),
      });

      const dalleData = await dalleRes.json();
      console.log('📦 Full DALL·E response:', dalleData);

      const imageUrl = dalleData.data?.[0]?.url;
      console.log('🖼️ DALL·E Image URL:', imageUrl);

      setAiResponse({
        text,
        media: imageUrl ? [imageUrl] : [],
      });
    } catch (err) {
      console.error('❌ OpenAI API error:', err);
      setAiResponse({
        text: 'Failed to fetch from OpenAI.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    fetchOpenAI(userInput);
    setUserInput('');
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
      <Input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask something..."
      />
      </form>

      {loading ? (
  <Message>Thinking...</Message>
) : aiResponse ? (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginTop: '1rem', flexWrap: 'wrap' }}>
    {/* Image left */}
    {aiResponse.media?.length ? (
      <img
        src={aiResponse.media[0]}
        alt="AI generated"
        style={{
          width: '350px',
          height: '350px',
          objectFit: 'cover',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)'
        }}
      />
    ) : null}

    {/* Text right */}
    <Message style={{ maxWidth: '600px', textAlign: 'left' }}>
      {aiResponse.text}
    </Message>
  </div>
) : (
  <Message>Try asking something!</Message>
)}
    </Container>
  );
};

export default ChatWindow;
