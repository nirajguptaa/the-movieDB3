import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Note: In production, API keys should be handled server-side
});

const processMessage = async (message, watchedMovies) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a knowledgeable movie assistant. The user has watched these movies: ${JSON.stringify(watchedMovies)}. 
                    Use this context to provide personalized movie discussions and recommendations.`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            max_tokens: 500,
            temperature: 0.7
        });

        return {
            response: completion.choices[0].message.content,
            status: 'success'
        };
    } catch (error) {
        console.error('OpenAI API Error:', error);
        return {
            response: "I apologize, but I'm having trouble processing your request right now.",
            status: 'error'
        };
    }
};

export { processMessage };