"use client"

import { useState, useRef, useEffect } from "react"
import { Scale, Menu, Send, X, Home, FileText, Mic, Plus } from "lucide-react"
import gsap from "gsap"
import "./App.css"
import HeroAnimation from "./components/HeroAnimation"
import ChatMessage from "./components/ChatMessage"
import Sidebar from "./components/Sidebar"
import ThemeToggle from "./components/ThemeToggle"
import AboutPage from "./components/AboutPage"
import FeaturesPage from "./components/FeaturesPage"

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("contracts")
  const [selectedTemplate, setSelectedTemplate] = useState(null)
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

  useEffect(() => {
    const mobileMenuButton = document.querySelector(".mobile-menu-button")
    const mobileMenu = document.querySelector(".mobile-menu")

    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener("click", () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
      })
    }

    return () => {
      if (mobileMenuButton) {
        mobileMenuButton.removeEventListener("click", () => {
          setIsMobileMenuOpen(!isMobileMenuOpen)
        })
      }
    }
  }, [isMobileMenuOpen])

  // Add this useEffect to handle mobile menu animation:
  useEffect(() => {
    const mobileMenu = document.querySelector(".mobile-menu")
    if (mobileMenu) {
      gsap.to(mobileMenu, {
        height: isMobileMenuOpen ? "auto" : "0",
        opacity: isMobileMenuOpen ? 1 : 0,
        duration: 0.3,
        ease: "power2.inOut",
      })
    }
  }, [isMobileMenuOpen])

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

  const handleDocumentUpload = () => {
    document.getElementById("document-upload").click()
  }

  const handleFileSelected = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Create a new message to show the uploaded document
    const newMessage = {
      id: Date.now().toString(),
      content: `Uploaded document: ${file.name}`,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])

    // Simulate processing
    setIsProcessing(true)

    // Simulate AI response after processing the document
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: `I've analyzed the document "${file.name}". This appears to be a ${getDocumentType(file.name)}. Would you like me to summarize its key points or do you have specific questions about it?`,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsProcessing(false)
    }, 2000)

    // Reset the file input
    e.target.value = null
  }

  const getDocumentType = (filename) => {
    const extension = filename.split(".").pop().toLowerCase()

    if (["doc", "docx"].includes(extension)) {
      return "Microsoft Word document"
    } else if (extension === "pdf") {
      return "PDF document"
    } else if (["jpg", "jpeg", "png"].includes(extension)) {
      return "image file"
    } else {
      return "text document"
    }
  }

  const toggleSpeechRecognition = () => {
    if (!isListening) {
      startSpeechRecognition()
    } else {
      stopSpeechRecognition()
    }
  }

  const startSpeechRecognition = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.onstart = () => {
        setIsListening(true)
        setInput("Listening...")
      }

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("")

        setInput(transcript)
      }

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error)
        setIsListening(false)
        setInput("")
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()

      // Store the recognition instance to stop it later
      window.recognitionInstance = recognition
    } else {
      alert("Speech recognition is not supported in your browser. Please try Chrome or Edge.")
    }
  }

  const stopSpeechRecognition = () => {
    if (window.recognitionInstance) {
      window.recognitionInstance.stop()
    }
    setIsListening(false)
  }

  const getTemplatesByCategory = (category) => {
    const templates = {
      contracts: [
        { id: 1, name: "Employment Contract", type: "contract" },
        { id: 2, name: "Service Agreement", type: "contract" },
        { id: 3, name: "Non-Disclosure Agreement (NDA)", type: "contract" },
        { id: 4, name: "Lease Agreement", type: "contract" },
      ],
      legal: [
        { id: 5, name: "Power of Attorney", type: "legal" },
        { id: 6, name: "Last Will and Testament", type: "legal" },
        { id: 7, name: "Affidavit", type: "legal" },
        { id: 8, name: "Cease and Desist Letter", type: "legal" },
      ],
      business: [
        { id: 9, name: "LLC Operating Agreement", type: "business" },
        { id: 10, name: "Partnership Agreement", type: "business" },
        { id: 11, name: "Business Plan Template", type: "business" },
        { id: 12, name: "Invoice Template", type: "business" },
      ],
    }

    return templates[category] || []
  }

  const selectTemplate = (template) => {
    setSelectedTemplate(template)
    setShowTemplateModal(false)

    // Create a new message to show the template request
    const newMessage = {
      id: Date.now().toString(),
      content: `I need a template for: ${template.name}`,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])

    // Simulate processing
    setIsProcessing(true)

    // Simulate AI response with the template
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: `Here's a template for "${template.name}". You can download it or I can help you customize it for your specific needs. Would you like me to explain any sections of this document?`,
        role: "assistant",
        isTemplate: true,
        templateName: template.name,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsProcessing(false)
    }, 1500)
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
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    navigateTo("home")
                  }}
                >
                  Pricing
                </a>
              </li>
            </ul>
          </nav>
          <div className="mobile-menu-button">
            <Menu size={24} />
          </div>
          <div className="header-actions">
            <ThemeToggle />
            <button onClick={() => navigateTo("login")} className="btn btn-outline">
              Login
            </button>
            <button onClick={() => navigateTo("chat")} className="btn btn-primary">
              Get Started
            </button>
          </div>
          <div className="mobile-menu">
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
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    navigateTo("home")
                  }}
                >
                  Pricing
                </a>
              </li>
              <li className="mobile-menu-divider"></li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    navigateTo("login")
                  }}
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    navigateTo("chat")
                  }}
                >
                  Get Started
                </a>
              </li>
            </ul>
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
            <div className="chat-actions">
              <button
                type="button"
                className="action-button upload-button"
                onClick={handleDocumentUpload}
                title="Upload Document"
              >
                <FileText size={18} />
              </button>
              <button
                type="button"
                className={`action-button speak-button ${isListening ? "listening" : ""}`}
                onClick={toggleSpeechRecognition}
                title="Speak"
              >
                <Mic size={18} />
                {isListening && <span className="pulse-ring"></span>}
              </button>
              <button
                type="button"
                className="action-button template-button"
                onClick={() => setShowTemplateModal(true)}
                title="Get Document Template"
              >
                <FileText size={18} />
                <Plus size={12} className="plus-icon" />
              </button>
            </div>
            <div className="input-container">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your legal question here..."
                disabled={isProcessing || isListening}
              />
              <button type="submit" className="send-button" disabled={!input.trim() || isProcessing}>
                <Send />
              </button>
            </div>
          </form>
        </div>
        <input
          type="file"
          id="document-upload"
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
          style={{ display: "none" }}
          onChange={handleFileSelected}
        />
        {showTemplateModal && (
          <div className="template-modal-overlay" onClick={() => setShowTemplateModal(false)}>
            <div className="template-modal" onClick={(e) => e.stopPropagation()}>
              <div className="template-modal-header">
                <h3>Select Document Template</h3>
                <button className="close-button" onClick={() => setShowTemplateModal(false)}>
                  <X size={18} />
                </button>
              </div>
              <div className="template-modal-content">
                <div className="template-categories">
                  <button
                    className={selectedCategory === "contracts" ? "active" : ""}
                    onClick={() => setSelectedCategory("contracts")}
                  >
                    Contracts
                  </button>
                  <button
                    className={selectedCategory === "legal" ? "active" : ""}
                    onClick={() => setSelectedCategory("legal")}
                  >
                    Legal Forms
                  </button>
                  <button
                    className={selectedCategory === "business" ? "active" : ""}
                    onClick={() => setSelectedCategory("business")}
                  >
                    Business
                  </button>
                </div>
                <div className="template-list">
                  {getTemplatesByCategory(selectedCategory).map((template, index) => (
                    <div key={index} className="template-item" onClick={() => selectTemplate(template)}>
                      <FileText size={18} />
                      <span>{template.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
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

