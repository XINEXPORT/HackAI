export function parseOpenAIJson(content: string) {
    const jsonString = content
      .replace(/^```json\n?/, '')
      .replace(/\n?```$/, '');
  
    try {
      return JSON.parse(jsonString);
    } catch (err) {
      console.error("Failed to parse OpenAI response:", err);
      return null;
    }
  }
  