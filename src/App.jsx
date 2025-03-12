"use client"

import { useState, useRef, useEffect } from "react"
import { Scale, Menu, Send, X, Home } from "lucide-react"
import gsap from "gsap"
import "./App.css"
import HeroAnimation from "./components/HeroAnimation"
import ChatMessage from "./components/ChatMessage"
import Sidebar from "./components/Sidebar"
import ThemeToggle from "./components/ThemeToggle"
import AboutPage from "./components/AboutPage"
import FeaturesPage from "./components/FeaturesPage"

function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Hello! I'm your AI legal assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (currentPage === "chat") {
      scrollToBottom()
    }
  }, [messages, currentPage])

  // GSAP animations for chat messages
  useEffect(() => {
    if (messages.length > 0 && currentPage === "chat") {
      gsap.fromTo(
        ".chat-message:last-child",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      )
    }
  }, [messages, currentPage])

  // Handle sidebar toggle animation
  useEffect(() => {
    if (currentPage === "chat") {
      gsap.to(".sidebar", {
        x: isSidebarOpen ? "0%" : "-100%",
        duration: 0.3,
        ease: "power2.inOut",
      })

      gsap.to(".chat-container", {
        paddingLeft: isSidebarOpen ? "300px" : "0",
        duration: 0.3,
        ease: "power2.inOut",
      })
    }
  }, [isSidebarOpen, currentPage])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsProcessing(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(input),
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsProcessing(false)
    }, 1500)
  }

  // Simple mock AI response function
  const getAIResponse = (userInput) => {
    const input = userInput.toLowerCase()

    if (input.includes("contract") || input.includes("agreement")) {
      return "Contracts typically require offer, acceptance, consideration, and legal purpose to be valid. I'd need more specific details about your contract situation to provide tailored guidance."
    } else if (input.includes("lawsuit") || input.includes("sue")) {
      return "Lawsuits involve complex procedures and timelines. The statute of limitations varies by case type and jurisdiction. Consider consulting with a licensed attorney for your specific situation."
    } else if (input.includes("divorce") || input.includes("custody")) {
      return "Family law matters like divorce and custody are governed by state laws. These proceedings typically involve property division, support determinations, and parenting arrangements."
    } else {
      return "Thank you for your question. To provide accurate legal information, I'd need more specific details about your situation. Please note that I can provide general legal information, but this doesn't constitute legal advice."
    }
  }

  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  // Render the home page
  const renderHomePage = () => {
    return (
      <div className="home-container">
        <header className="header">
          <div className="logo">
            <Scale className="logo-icon" />
            <span>LegalAI</span>
          </div>
          <nav className="main-nav">
            <ul>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    navigateTo("features")
                  }}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    navigateTo("about")
                  }}
                >
                  About
                </a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
            </ul>
          </nav>
          <div className="header-actions">
            <ThemeToggle />
            <button onClick={() => navigateTo("login")} className="btn btn-outline">
              Login
            </button>
            <button onClick={() => navigateTo("chat")} className="btn btn-primary">
              Get Started
            </button>
          </div>
        </header>

        <main>
          <section className="hero-section">
            <div className="hero-content">
              <h1>Your AI-Powered Legal Assistant</h1>
              <h2>Get Instant Legal Guidance</h2>
              <p>
                Access professional legal advice instantly through our advanced AI system. Save time and money on
                routine legal questions.
              </p>
              <button onClick={() => navigateTo("chat")} className="btn btn-cta">
                Chat Now
              </button>
            </div>
            <div className="hero-animation">
              <HeroAnimation />
            </div>
          </section>
        </main>
      </div>
    )
  }

  // Render the login page
  const renderLoginPage = () => {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <button className="back-button" onClick={() => navigateTo("home")}>
              <Home size={20} />
              <span>Back to Home</span>
            </button>
            <div className="logo">
              <Scale className="logo-icon" />
              <span>LegalAI</span>
            </div>
          </div>

          <h2>Welcome Back</h2>
          <p className="login-subtitle">Sign in to your account</p>

          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="your@email.com" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="••••••••" />
              <div className="forgot-password">
                <a href="#">Forgot password?</a>
              </div>
            </div>

            <button type="button" className="btn btn-primary login-btn" onClick={() => navigateTo("chat")}>
              Sign In
            </button>
          </form>

          <div className="login-footer">
            <p>
              Don't have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Render the chat page
  const renderChatPage = () => {
    return (
      <div className="chat-page">
        <Sidebar isOpen={isSidebarOpen} />

        <div className="chat-container" ref={chatContainerRef}>
          <header className="chat-header">
            <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <X /> : <Menu />}
            </button>

            <div className="logo">
              <Scale className="logo-icon" />
              <span>LegalAI</span>
            </div>

            <div className="header-actions">
              <button className="back-home-btn" onClick={() => navigateTo("home")}>
                <Home size={18} />
                <span>Home</span>
              </button>
              <ThemeToggle />
            </div>
          </header>

          <div className="messages-container">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                role={message.role}
                timestamp={message.timestamp}
              />
            ))}

            {isProcessing && (
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-form" onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your legal question here..."
                disabled={isProcessing}
              />
              <button type="submit" className="send-button" disabled={!input.trim() || isProcessing}>
                <Send />
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      {currentPage === "home" && renderHomePage()}
      {currentPage === "login" && renderLoginPage()}
      {currentPage === "chat" && renderChatPage()}
      {currentPage === "about" && <AboutPage navigateTo={navigateTo} />}
      {currentPage === "features" && <FeaturesPage navigateTo={navigateTo} />}
    </div>
  )
}

export default App

