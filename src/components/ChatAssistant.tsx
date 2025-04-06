
import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, X, Maximize, Minimize, Sparkles, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    content: "Hi there! I'm Paritosh's AI assistant. I'm trained on his projects, skills, and blog articles. How can I help you today?",
    role: "assistant",
    timestamp: new Date(),
  },
];

const SAMPLE_QUESTIONS = [
  "What are your top skills in AI development?",
  "Tell me about your experience with LLMs",
  "What was your most challenging project?",
  "How do you approach RAG implementations?",
  "What differentiates your ML solutions?",
  "Can you explain your NLP work?",
];

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const minimize = () => {
    setIsMinimized(true);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized, messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userInput = input

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: userInput,
      role: "user",
      timestamp: new Date(),
    };

    // Compute the new message history, including the latest user message
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    // Build the history payload (each message with role and content)
    const historyPayload = updatedMessages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));
    
    // setMessages((prev) => [...prev, userMessage]);
    // setInput("");
    // setIsTyping(true);

    // Simulate AI thinking and response
    // setTimeout(() => {
    //   const assistantMessage: Message = {
    //     id: (Date.now() + 1).toString(),
    //     content: generateResponse(input),
    //     role: "assistant",
    //     timestamp: new Date(),
    //   };
    setTimeout(async() => {
      try{
      const res = await fetch("http://localhost:8000/api/v1/chatbot/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input , history: historyPayload}),
      });
      const data = await res.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response, // <-- Use response from backend
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }catch (error) {
      console.error("Error fetching chatbot response:", error);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Error in Fetching Reponse !", // <-- Use response from backend
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    };
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // const generateResponse = (query: string): string => {
  //   // This would be replaced with actual LLM integration
  //   const responses = [
  //     "As an AI trained on Paritosh's work, I can tell you he has extensive experience in building LLM-based systems with a focus on retrieval-augmented generation.",
  //     "Paritosh has worked on several projects involving natural language processing and computer vision, combining multiple AI models for more accurate results.",
  //     "Based on his portfolio, Paritosh specializes in creating custom ML pipelines that optimize for both performance and maintainability.",
  //     "From what I've been trained on, Paritosh's approach to AI engineering emphasizes responsible AI practices and thorough evaluation methodologies.",
  //     "Paritosh has written extensively about the challenges and solutions in implementing production-ready machine learning systems.",
  //     "According to his experience, integrating domain knowledge with state-of-the-art AI models has been crucial for his project successes.",
  //   ];
    
  //   return responses[Math.floor(Math.random() * responses.length)];
  // };

  const handleSampleQuestion = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);
    toast.success("Chat history cleared!");
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full shadow-lg transition-all duration-300",
          isOpen && !isMinimized ? "bg-accent text-accent-foreground h-14 w-14" : "bg-accent text-accent-foreground h-14 w-14",
          "hover:scale-105 active:scale-95"
        )}
        aria-label="Open chat assistant"
      >
        {isMinimized ? (
          <Maximize className="h-6 w-6" />
        ) : isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Bot className="h-6 w-6" />
        )}
      </button>

      {/* Chat window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 flex flex-col rounded-2xl overflow-hidden shadow-xl transition-all duration-300 transform",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none",
          isMinimized ? "h-14 w-80" : "w-[90vw] max-w-md h-[70vh] max-h-[600px]",
          "bg-background border border-border"
        )}
      >
        {/* Chat header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent animate-pulse-slow" />
            <h2 className="font-medium">AI Chat Assistant</h2>
          </div>
          <div className="flex items-center gap-1">
            {!isMinimized && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={minimize}
                aria-label="Minimize chat"
              >
                <Minimize className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={toggleChat}
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex mb-4 animate-fade-in",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                  style={{
                    animationDelay: `${
                      messages.findIndex((m) => m.id === message.id) * 0.1
                    }s`,
                  }}
                >
                  <div className="flex gap-2 max-w-[80%]">
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarImage src="/placeholder.svg" alt="AI" />
                        <AvatarFallback className="bg-accent text-accent-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={cn(
                        "p-3 rounded-2xl text-sm",
                        message.role === "user"
                          ? "bg-accent text-accent-foreground ml-auto"
                          : "bg-muted text-foreground"
                      )}
                    >
                      {message.content}
                    </div>

                    {message.role === "user" && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarImage src="src/static/imgg.jpg" alt="User" />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start mb-4 animate-fade-in">
                  <div className="flex gap-2 max-w-[80%]">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-accent text-accent-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="p-3 rounded-2xl bg-muted">
                      <div className="flex gap-1">
                        <span className="animate-bounce delay-0">•</span>
                        <span className="animate-bounce delay-150">•</span>
                        <span className="animate-bounce delay-300">•</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Sample questions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_QUESTIONS.slice(0, 3).map((question) => (
                    <button
                      key={question}
                      onClick={() => handleSampleQuestion(question)}
                      className="text-xs bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-full text-foreground/80 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Clear chat button */}
            {messages.length > 1 && (
              <div className="px-4 pb-2 flex justify-center">
                <button
                  onClick={clearChat}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear conversation
                </button>
              </div>
            )}

            {/* Input area */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-border">
              <div className="flex items-end gap-2">
                <div className="relative flex-1">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything about Paritosh's work..."
                    className="w-full resize-none rounded-lg border border-input px-3 py-2 text-sm min-h-[44px] max-h-[120px] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-black"
                    rows={1}
                  />
                </div>
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isTyping}
                  className={cn(
                    "rounded-full h-10 w-10 flex-shrink-0 bg-accent text-accent-foreground hover:bg-accent/90",
                    !input.trim() && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </>
        )}

        {isMinimized && (
          <div className="h-full flex items-center justify-between px-4">
            <span className="text-sm font-medium">AI Chat Assistant</span>
            <Maximize className="h-4 w-4" />
          </div>
        )}
      </div>
    </>
  );
}
