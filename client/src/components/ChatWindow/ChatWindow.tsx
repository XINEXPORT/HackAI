import { useState } from 'react';
import { Container, Input, Message, Button } from './styled';

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
        <>
          <Message>{aiResponse.text}</Message>

          {aiResponse.media?.length ? (
            aiResponse.media.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`AI generated ${index + 1}`}
                style={{
                  maxWidth: '400px',
                  marginTop: '1rem',
                  borderRadius: '8px',
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
                }}
              />
            ))
          ) : (
            <Message style={{ fontSize: '0.9rem', opacity: 0.7 }}>
              (No image was generated.)
            </Message>
          )}
        </>
      ) : (
        <Message>Try asking something!</Message>
      )}
    </Container>
  );
};

export default ChatWindow;
