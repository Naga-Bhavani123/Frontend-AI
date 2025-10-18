import React, { useState, useEffect, useRef } from "react";
import { Send, Mic } from "lucide-react";
import Cookie from "js-cookie";
import SideBar from "../SideBar";
import "./index.css";
import { useParams } from "react-router-dom";

export default function ChatRightPanel() {
  const { id } = useParams();
  const token = Cookie.get("jwt-token");

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`http://localhost:5000/folder/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          const historyMessages = data.history.flatMap((h) => [
            { id: h._id, role: "user", text: h.request },
            { id: h._id + "_resp", role: "assistant", text: h.response },
          ]);
          setMessages(historyMessages);
        }
      } catch (err) {
        console.error("Error fetching folder history:", err);
      }
    };
    fetchHistory();
  }, [id, token]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/folder/${id}/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: input }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMsg = {
          id: Date.now() + "_resp",
          role: "assistant",
          text: data.answer,
        };
        setMessages((prev) => [...prev, assistantMsg]);

        const loginMessage =
          "User not login to google mail I don't have permission to send the email.";

        if (data.answer === loginMessage) {
          setTimeout(() => {
            const googleAuthUrl = `http://localhost:5000/auth/google/?token=${token}`;
            const data = window.open(googleAuthUrl);
            console.log(data)
          }, 1000);
        }
      }
    } catch (err) {
      console.error("Error sending query:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="page">
      <SideBar />

      <div className="chat-panel">
        {/* Header */}
        <div className="chat-header">
          <div className="left">
            <div className="title">Folder Assistant</div>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.length === 0 && !loading && (
            <div className="empty-container">
              <img
                src="https://res.cloudinary.com/dk9fr18eq/image/upload/v1759730014/ChatGPT_Image_Oct_6_2025_11_02_10_AM_hcszdk.png"
                alt="App Logo"
                className="empty-logo"
              />
              <h2 className="empty-title">Folder Assistant</h2>
              <p className="empty-subtext">Ask anything to get started...</p>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.role === "user" ? "user" : "assistant"}`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="message assistant">
              <span className="typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input">
          <div className="input-box">
            <textarea
              placeholder="Message Gemini..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <div className="icons">
              <button className="mic-btn">
                <Mic size={18} />
              </button>
              <button
                className="send-btn"
                onClick={handleSend}
                disabled={loading}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
