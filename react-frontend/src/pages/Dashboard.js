import React, { useEffect,useState } from 'react';
import '../css/Dashboard.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
    // Check for the JWT token in localStorage or sessionStorage
    const token = localStorage.getItem('jwtToken'); // or sessionStorage.getItem('jwtToken')

        /*if (token=='null') {
          navigate('/');
        }*/
      }, [navigate]);


    const sendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: "user" }]);
            setInput("");
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    { text: "This is a response from ChatGPT.", sender: "bot" },
                ]);
            }, 1000);
        }
    };

    // Handle pressing Enter to send a message
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div className="chat-container">
            {/* Chat Window */}
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-message ${
                            msg.sender === "user" ? "user-message" : "bot-message"
                        }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Dashboard;
