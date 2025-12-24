"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Send, MessageCircle, Minimize2 } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const FAQ_RESPONSES: Record<string, string> = {
  "hello|hi|hey|greetings": "Hello! Welcome to Bafuputsi Trading. I'm here to help you with any questions about our labour law and HR consulting services. How can I assist you today?",

  "services|what do you do|help with": "We provide comprehensive labour law and HR consulting services including:\n\n• Labour Law & Labour Relations\n• HR Services & Compliance Support\n• Dispute Resolutions\n• Training & Development\n• Choosing the right Labour Law Consultant\n\nWhich service would you like to know more about?",

  "hours|open|time|when": "Our office hours are:\n\nMon - Wed: 8:00am - 06:00pm\nThu - Sat: 10:00am - 10:00pm\nSunday: Closed\n\nClients are allowed to call us after hours for emergencies.",

  "contact|phone|email|reach": "You can reach us at:\n\n📧 Email: admin@bafuputsi.co.za\n📞 Phone: +27 62 323 2533\n📍 Location: Centurion, South Africa\n\nWould you like to schedule a free consultation?",

  "price|cost|fee|charge": "We offer fair and transparent pricing. In many cases, if we identify gaps in your policies or procedures while providing our services, there might not be additional cost to address those identified gaps.\n\nWe also provide FREE initial consultations. Would you like to book one?",

  "consultation|free|book|appointment": "Great! We offer FREE consultations. You can:\n\n1. Fill out the contact form on our website\n2. Call us at +27 62 323 2533\n3. Email us at admin@bafuputsi.co.za\n4. WhatsApp us directly\n\nWhat works best for you?",

  "dispute|resolution|conflict": "We specialize in dispute resolutions. When we initiate cases, we:\n\n• Conduct investigations ourselves\n• Formulate charges\n• Compile the file of evidence\n• Decide on appropriate witnesses\n• Provide quality representation\n\nWould you like to discuss your specific situation?",

  "training|learn|course": "We provide specialized training in labour law and HR compliance. Our training covers:\n\n• SETA accredited programs\n• Labour law fundamentals\n• HR compliance\n• Dispute resolution techniques\n\nWhat type of training are you interested in?",

  "location|where|address": "We are located in Centurion, South Africa. This is in Gauteng province, making us easily accessible to clients throughout the region.\n\nWould you like directions or prefer to schedule a virtual consultation?",

  "thank|thanks": "You're welcome! Is there anything else I can help you with today? Feel free to ask about our services, pricing, or to schedule a consultation.",

  "bye|goodbye|exit": "Thank you for chatting with Bafuputsi Trading! If you need further assistance, don't hesitate to contact us at +27 62 323 2533 or admin@bafuputsi.co.za. Have a great day!"
};

const DEFAULT_RESPONSE = "Thank you for your question. For detailed information about this specific matter, I recommend:\n\n1. Calling us at +27 62 323 2533\n2. Emailing admin@bafuputsi.co.za\n3. Booking a FREE consultation\n\nOur expert consultants will be happy to provide personalized assistance. Is there anything else I can help you with?";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm the Bafuputsi Virtual Assistant. I can help you with information about our labour law and HR consulting services. How can I assist you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const normalizedMessage = userMessage.toLowerCase().trim();

    for (const [keywords, response] of Object.entries(FAQ_RESPONSES)) {
      const keywordList = keywords.split("|");
      if (keywordList.some(keyword => normalizedMessage.includes(keyword))) {
        return response;
      }
    }

    return DEFAULT_RESPONSE;
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");

    // Show typing indicator
    const typingMessage: Message = {
      id: messages.length + 2,
      text: "...",
      sender: "bot",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      // Try to get GPT response first
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          conversationHistory: messages,
        }),
      });

      let botReply = '';
      if (response.ok) {
        const data = await response.json();
        botReply = data.reply;
      } else {
        // Fallback to keyword-based responses
        botReply = getBotResponse(currentInput);
      }

      // Remove typing indicator and add actual response
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => msg.text !== "...");
        return [...withoutTyping, {
          id: Date.now(),
          text: botReply,
          sender: "bot",
          timestamp: new Date()
        }];
      });

      // Track chatbot interaction
      if (typeof window !== 'undefined' && window.trackEvent) {
        window.trackEvent('chatbot_message', { message: currentInput.substring(0, 50) });
      }

    } catch (error) {
      console.error('Chatbot error:', error);
      // Fallback to keyword-based response
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => msg.text !== "...");
        return [...withoutTyping, {
          id: Date.now(),
          text: getBotResponse(currentInput),
          sender: "bot",
          timestamp: new Date()
        }];
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const quickReplies = [
    "What services do you offer?",
    "Office hours",
    "Book consultation",
    "Contact information"
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <div className="fixed bottom-8 right-8 z-50">
          {/* Pulsing ring effect */}
          <div className="absolute inset-0 rounded-full bg-[#c5ab95] opacity-75 animate-ping" />

          <button
            onClick={() => setIsOpen(true)}
            className="relative bg-[#c5ab95] hover:bg-[#8a624a] text-white rounded-full p-5 shadow-2xl transition-all flex items-center gap-2 group hover:scale-110"
            style={{ boxShadow: '0 10px 40px rgba(197, 171, 149, 0.5)' }}
          >
            <MessageCircle size={32} strokeWidth={2.5} />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-semibold">
              Chat with AI
            </span>

            {/* New badge indicator */}
            <span className="absolute -top-1 -right-1 flex h-6 w-6">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-6 w-6 bg-green-500 items-center justify-center text-xs font-bold">
                AI
              </span>
            </span>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className={`fixed bottom-8 right-8 w-96 shadow-2xl z-50 flex flex-col transition-all ${isMinimized ? 'h-16' : 'h-[600px]'}`}>
          {/* Header */}
          <div className="bg-[#393942] text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#c5ab95] rounded-full flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-bold">Bafuputsi Assistant</h3>
                <p className="text-xs text-gray-300">Always here to help</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-white/10 p-1 rounded transition"
              >
                <Minimize2 size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-1 rounded transition"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-[#c5ab95] text-white"
                          : "bg-white text-gray-800 shadow"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length <= 2 && (
                <div className="p-3 border-t bg-white">
                  <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputValue(reply);
                          setTimeout(() => handleSend(), 100);
                        }}
                        className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t bg-white rounded-b-lg">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSend}
                    className="bg-[#c5ab95] hover:bg-[#a6876a]"
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      )}
    </>
  );
}
