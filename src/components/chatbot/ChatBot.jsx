import React, { useState, useRef, useEffect } from 'react';
import './style.css';
import { VscChromeClose } from "react-icons/vsc";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // const processUserMessage = async (userMessage) => {
    //     const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
        
    //     // Add user message to chat
    //     setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    //     setIsLoading(true);

    //     try {
    //         const response = await fetch('https://api.example.com/chatbot', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 message: userMessage,
    //                 watchedMovies: watchedMovies,
    //             }),
    //         });

    //         const data = await response.json();
    //         setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
    //     } catch (error) {
    //         setMessages(prev => [...prev, { 
    //             text: "Sorry, I'm having trouble connecting right now.", 
    //             sender: 'bot' 
    //         }]);
    //     }

    //     setIsLoading(false);
    // };

    const processUserMessage = async (userMessage) => {
        const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
    
        setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
        setIsLoading(true);
    
        // Simulated smart response logic
        let botResponse = "";
        const lowerMsg = userMessage.toLowerCase();
    
        if (lowerMsg.includes("suggest")) {
            botResponse = "I think you'd enjoy watching 'Inception' or 'Interstellar'!";
        } else if (lowerMsg.includes("recent") || lowerMsg.includes("latest")) {
            botResponse = "The most recent popular movies are 'Dune: Part Two', 'Oppenheimer', and 'John Wick 4'.";
        } else if (lowerMsg.includes("watched")) {
            if (watchedMovies.length > 0) {
                botResponse = "You've watched: " + watchedMovies.map(m => m.title).join(", ");
            } else {
                botResponse = "You haven't watched any movies yet.";
            }
        } else {
            botResponse = "I'm still learning! Try asking about recent movies or for a movie suggestion.";
        }
    
        // Simulate response delay
        setTimeout(() => {
            setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
            setIsLoading(false);
        }, 1000);
    };




    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;
        
        processUserMessage(inputMessage);
        setInputMessage('');
    };

    return (
        <div className="chatbot-container">
            {!isOpen ? (
                <button 
                    className="chatbot-toggle"
                    onClick={() => setIsOpen(true)}
                >
                    <IoChatboxEllipsesOutline />
                </button>
            ) : (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <h3>Movie Assistant</h3>
                        <button 
                            className="close-button"
                            onClick={() => setIsOpen(false)}
                        >
                            <VscChromeClose />
                        </button>
                    </div>
                    
                    <div className="messages-container">
                        {messages.map((message, index) => (
                            <div 
                                key={index} 
                                className={`message ${message.sender}`}
                            >
                                {message.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message bot loading">
                                Thinking...
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="input-form">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Ask me about movies..."
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBot;