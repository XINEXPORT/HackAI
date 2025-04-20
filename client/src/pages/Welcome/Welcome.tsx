import { useEffect, useState } from 'react';
import { FullSizeCentered } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';

function Welcome() {
  const isPortrait = useOrientation();
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchOpenAI() {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
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
    <>
      <meta name="title" content="Welcome" />
      <FullSizeCentered flexDirection={isPortrait ? 'column' : 'row'}>
        <div style={{ color: 'white', fontSize: '1.5rem', textAlign: 'center' }}>
          {message || 'Loading...'}
        </div>
      </FullSizeCentered>
    </>
  );
}

export default Welcome;
