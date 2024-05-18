// pages/index.js
'use client';

import Chatbox from '@/components/Chatbox';
import './globals.css'

export default function Home() {
    return (

        <div style={{height:'100vh',width:'100vw', display:'flex',justifyContent:'center',alignItems:'center', }}>
            <div style={{ height: '95%',width:'750px' }}>
                <Chatbox />
            </div>
        </div>
    );
}