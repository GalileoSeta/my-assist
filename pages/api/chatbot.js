import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: req.body.message,
        max_tokens: 60,
        n: 1,
        stop: '\n',
        temperature: 0.8,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const [{ text }] = response.data.choices;
    const sentimentResponse = await axios.post(
      'https://api.deepai.org/api/sentiment-analysis',
      { text },
      {
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': process.env.DEEPAI_API_KEY,
        },
      }
    );

    res.status(200).json({ sentiment: sentimentResponse.data.output, text });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'Error occurred while processing your request.' });
  }
}
