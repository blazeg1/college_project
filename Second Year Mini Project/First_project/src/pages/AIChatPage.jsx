import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaHeart, FaPaperPlane, FaRobot, FaPalette, FaBed, FaBook, FaUserFriends } from 'react-icons/fa';
// Import the Google Generative AI SDK
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- Memoized Child Components (No changes needed here) ---

const ChatHeader = React.memo(() => (
  <header className="flex-shrink-0 flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/40">
        <FaRobot className="text-2xl text-indigo-600 dark:text-indigo-300" />
      </div>
      <div>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">AI Mental Health Support</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Available 24/7 • Confidential & Secure</p>
      </div>
    </div>
    <button className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-800 transition hover:bg-green-100 dark:border-green-800 dark:bg-green-900/30 dark:text-green-200 dark:hover:bg-green-900/50">
      <FaHeart /> Safe Space
    </button>
  </header>
));

const ChatBubble = React.memo(({ message, time, sender }) => {
  const isUser = sender === 'user';
  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && (
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white">
          <FaRobot />
        </div>
      )}
      <div className={`w-full max-w-lg whitespace-pre-wrap rounded-xl p-4 ${isUser ? 'rounded-br-none bg-indigo-600 text-white' : 'rounded-tl-none bg-slate-100 dark:bg-slate-800'}`}>
        <p className="leading-relaxed text-slate-800 dark:text-slate-200" dangerouslySetInnerHTML={{ __html: message.replace(/\n/g, '<br />') }}></p>
        {time && <p className="mt-2 text-right text-xs text-slate-400">{time}</p>}
      </div>
    </div>
  );
});

const TopicSuggestion = React.memo(({ icon, text, color, onSelect }) => {
  const colorClasses = {
    purple: 'border-purple-300 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    blue: 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    green: 'border-green-300 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-300',
    orange: 'border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  };
  return (
    <button onClick={() => onSelect(text)} className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm font-medium transition hover:scale-[1.03] hover:shadow-md ${colorClasses[color]}`}>
      {icon} {text}
    </button>
  );
});

const MessageInput = React.memo(({ input, setInput, onSend, isLoading }) => (
  <div className="w-full max-w-4xl mx-auto">
    <div className="relative rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && !isLoading && onSend()}
        placeholder="Share what's on your mind... I'm here to listen."
        className="w-full rounded-lg border-transparent bg-transparent py-3 pl-4 pr-14 text-sm text-slate-800 placeholder-slate-400 focus:border-transparent focus:ring-0 dark:text-white"
        disabled={isLoading}
      />
      <button
        onClick={onSend}
        disabled={isLoading}
        aria-label="Send message"
        className="absolute inset-y-0 right-3 my-auto flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600"
      >
        <FaPaperPlane className="h-4 w-4" />
      </button>
    </div>
    <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
      Your conversation is private and confidential. If you're in crisis, please call 988.
    </p>
  </div>
));


// Initialize the Gemini API client
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  console.error("VITE_GEMINI_API_KEY is not set in environment variables");
}
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


// --- Main AI Chat Page Component ---
const AIChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  
  // Use a ref to store the chat session history
  const chatSessionRef = useRef(null);

  // Static data defined within the component scope
  const topicSuggestions = [
    { icon: <FaPalette />, text: "I've been feeling anxious lately and need some support", color: 'purple' },
    { icon: <FaBed />, text: "I'm having trouble sleeping and it's affecting my mood", color: 'blue' },
    { icon: <FaBook />, text: "I'm dealing with academic stress and feeling overwhelmed", color: 'green' },
    { icon: <FaUserFriends />, text: "I'm having relationship issues and need advice", color: 'orange' },
  ];

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize chat session and set initial greeting
  useEffect(() => {
    const systemPrompt = "You are a friendly, empathetic, and supportive AI mental health assistant. Your purpose is to listen to users, provide a safe space for them to express their feelings, and offer general, non-prescriptive advice based on cognitive-behavioral therapy (CBT) principles. Do not provide medical diagnoses or prescriptions. Always maintain a calm, understanding, and non-judgmental tone. Keep your responses concise and easy to understand.";

    // Start a new chat session with system prompt in history
    chatSessionRef.current = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I am here to help.' }],
        },
      ],
    });

    setMessages([
      { sender: 'bot', text: "Hello! I'm your mental health support assistant. I'm here to listen, provide support, and help you navigate any challenges you're facing. Everything you share with me is confidential.\n\nHow are you feeling today? What's on your mind?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);
  }, []);

  // --- MODIFIED: `handleSend` now calls Gemini API directly ---
  const handleSend = useCallback(async (messageText = input) => {
    if (!messageText.trim() || isLoading) return;

    const newUserMessage = { sender: 'user', text: messageText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send the message to the Gemini model
      const chat = chatSessionRef.current;
      const result = await chat.sendMessage(messageText);
      const response = await result.response;
      const botText = response.text();

      setMessages(prev => [...prev, { sender: 'bot', text: botText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } catch (error) {
      console.error("Gemini API call failed:", error);
      setMessages(prev => [...prev, { sender: 'bot', text: "I'm sorry, but I'm having trouble connecting right now. Please try again in a moment.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);
  
  const showTopicSuggestions = messages.length <= 1;

  return (
    <div className="flex h-screen flex-col bg-slate-50 font-sans dark:bg-slate-950">
      <ChatHeader />
      <div className="flex-grow overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto max-w-4xl space-y-8">
          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg.text} time={msg.time} sender={msg.sender} />
          ))}
          {showTopicSuggestions && (
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-base font-semibold text-slate-800 dark:text-white">Common topics I can help with:</h3>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {topicSuggestions.map((topic) => (
                  <TopicSuggestion key={topic.text} {...topic} onSelect={handleSend} />
                ))}
              </div>
            </div>
          )}
          {isLoading && <ChatBubble message="..." sender="bot" />}
          <div ref={chatEndRef} />
        </div>
      </div>
      <div className="flex-shrink-0 px-4 pb-4 pt-2">
        <MessageInput input={input} setInput={setInput} onSend={() => handleSend()} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default AIChatPage;