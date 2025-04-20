import { useEffect, useState } from 'react';
import { Container, Input, Message } from './styled';

const ChatWindow = () => {
  const [message, setMessage] = useState('');
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchOpenAI = async (prompt: string) => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      setMessage('API key is missing. Please check your environment config.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7
        })
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || 'No response';
      setMessage(reply);
    } catch (err) {
      console.error('OpenAI API call failed:', err);
      setMessage('Failed to fetch response from OpenAI.');
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
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask something..."
        />
      </form>
      <Message>{loading ? 'Thinking...' : message || 'Try asking something!'}</Message>
    </Container>
  );
};

export default ChatWindow;
