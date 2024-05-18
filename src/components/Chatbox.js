// pages/index.js
'use client';

import { useState } from 'react';
import axios from 'axios';

const Chatbox = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input) return;

        const userMessage = { role: 'user', content: input };
        setMessages([...messages, userMessage]);

        const response = await axios.post('/api/chat', { message: input });
        console.log(response)

        const botMessage = response.data.choices[0].message;

        setMessages([...messages, userMessage, botMessage]);
        setInput('');
    };

    return (
        <div style={styles.container}>
            <div style={styles.chatBox}>
                {messages.map((msg, idx) => (
                    <div key={idx} style={styles.message(msg.role)}>
                        {msg.role + ': ' + msg.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Send</button>
            </form>
        </div>
    );
}

export default Chatbox

const styles = {
    container: {
        height: '100%',
        width:'100%',
        margin: '0 auto',
        padding: '0px',
        fontFamily: 'Arial, sans-serif',
        color:'white',
    },
    chatBox: {
        backgroundColor:'var(--chat-background)',
        width:'100%',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '10px',
        height: '90%',
        marginBottom: '10px'
    },
    message: (role) => ({
        padding: '8px',
        margin: '4px 0',
        borderRadius: '4px',
        backgroundColor: role === 'user' ? 'var(--question-color)' : 'var(--response-color',
        alignSelf: role === 'user' ? 'flex-end' : 'flex-start',
        width:'100%',
        wordWrap: 'break-word'
    }),
    form: {
        display: 'flex',
    },
    input: {
        flexGrow: 1,
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginRight: '10px',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#0070f3',
        color: 'white',
        cursor: 'pointer',
    }
};