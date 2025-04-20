import { useEffect, useState } from 'react';

const ChatWindow = () => {
  const [message, setMessage] = useState('');
  const [textColor, setTextColor] = useState('black');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTextColor = (e: MediaQueryList | MediaQueryListEvent) => {
      setTextColor(e.matches ? 'white' : 'black');
    };

    updateTextColor(mediaQuery);

    if ('addEventListener' in mediaQuery) {
      mediaQuery.addEventListener('change', updateTextColor);
    } else {
      mediaQuery.addListener(updateTextColor);
    }

    return () => {
      if ('removeEventListener' in mediaQuery) {
        mediaQuery.removeEventListener('change', updateTextColor);
      } else {
        mediaQuery.removeListener(updateTextColor);
      }
    };
  }, []);

  useEffect(() => {
    async function fetchOpenAI() {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

      if (!apiKey) {
        console.warn('VITE_OPENAI_API_KEY is not defined.');
        setMessage('API key is missing. Please check your environment config.');
        return;
      }

      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4',
            messages: [{ role: 'user', content: 'Say hello to the HackAI user!' }],
            temperature: 0.7
          })
        });

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || 'No response';
        setMessage(reply);
      } catch (err) {
        console.error('OpenAI API call failed:', err);
        setMessage('Failed to fetch response from OpenAI.');
      }
    }

    fetchOpenAI();
  }, []);

  return (
    <div
      style={{
        color: textColor,
        fontSize: '1.5rem',
        textAlign: 'center',
        padding: '1rem',
      }}
    >
      {message || 'Loading...'}
    </div>
  );
};

export default ChatWindow;
