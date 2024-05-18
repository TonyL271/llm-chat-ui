// pages/api/chat.js
import axios from 'axios';
import { NextResponse } from 'next/server';



export async function POST(request) {
    // Handle POST requests
    const body = await request.json();

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            // model: 'gpt-4o',
            messages: [{ role: 'user', content: body.message }],
            temperature: 0.7
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        console.log('Response:', response.data);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error:', error);
    }

    return new NextResponse(JSON.stringify({ error: error.message }), { status: 400 });
}
