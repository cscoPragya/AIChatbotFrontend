import React, { useState, useMemo } from "react";
import BlogCard from "./BlogCard";
import { Home } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Independent Contractor Agreement Template - A Complete Guide",
    description: "Learn everything you need to know about independent contractor agreements, including key clauses, legal requirements, and how to customize templates for your business. This comprehensive guide covers best practices, common pitfalls, and tips for ensuring compliance in 2025.",
    readTime: "7 min read",
    category: "Business",
    icon: "📄",
    date: "June 10, 2024"
  },
  {
    id: 2,
    title: "Patent License Agreement Template: Secure Innovation and Profit with Confidence",
    description: "Explore the essentials of patent license agreements, from protecting your intellectual property to maximizing revenue. This article provides a step-by-step approach to drafting, negotiating, and executing patent licenses in today's fast-paced legal environment.",
    readTime: "8 min read",
    category: "Business",
    icon: "💡",
    date: "June 8, 2024"
  },
  {
    id: 3,
    title: "Intellectual Property Assignment Agreement Template - A Complete Guide",
    description: "A deep dive into IP assignment agreements: what they are, why they matter, and how to ensure your rights are protected. Includes sample clauses, negotiation tips, and a downloadable template for 2025.",
    readTime: "6 min read",
    category: "Business",
    icon: "🧠",
    date: "June 6, 2024"
  },
  {
    id: 4,
    title: "Partner Agreement Template Download Free or Customize",
    description: "Discover the importance of partnership agreements for startups and established businesses. This guide explains key terms, dispute resolution strategies, and how to tailor agreements to your unique needs.",
    readTime: "7 min read",
    category: "Business",
    icon: "🤝",
    date: "June 4, 2024"
  },
  {
    id: 5,
    title: "The Ultimate Guide to Consulting Agreements Template",
    description: "Consulting agreements are vital for protecting both consultants and clients. Learn about essential clauses, confidentiality, payment terms, and how to avoid common legal mistakes in 2025.",
    readTime: "7 min read",
    category: "Business",
    icon: "📑",
    date: "June 2, 2024"
  },
  {
    id: 6,
    title: "Reseller Agreement in 2025: A Comprehensive Guide",
    description: "Stay ahead in 2025 with this in-depth guide to reseller agreements. Understand distribution rights, exclusivity, pricing, and dispute resolution to build strong business relationships.",
    readTime: "8 min read",
    category: "Business",
    icon: "🔄",
    date: "May 30, 2024"
  },
  {
    id: 7,
    title: "Distribution Agreement Template: Why You Need One in 2025",
    description: "Distribution agreements are the backbone of many supply chains. This article explains their structure, key clauses, and how to customize templates for your industry.",
    readTime: "6 min read",
    category: "Business",
    icon: "🚚",
    date: "May 28, 2024"
  },
  {
    id: 8,
    title: "Supply Agreement Template (2025) Free to Download & Customize",
    description: "Get a head start on your supply chain contracts with this free, customizable supply agreement template. Learn about delivery terms, risk allocation, and compliance in 2025.",
    readTime: "7 min read",
    category: "Business",
    icon: "📦",
    date: "May 26, 2024"
  },
  {
    id: 9,
    title: "Master Service Agreement (MSA) Template",
    description: "Master Service Agreements simplify ongoing business relationships. This guide covers the benefits, must-have clauses, and how to adapt MSAs for different industries.",
    readTime: "8 min read",
    category: "Business",
    icon: "📝",
    date: "May 24, 2024"
  },
  {
    id: 10,
    title: "Free Founders' Agreement Template (Customizable and Ready to Download)",
    description: "Founders' agreements are crucial for startups. Learn how to define roles, equity splits, and exit strategies with this free, customizable template and expert guidance.",
    readTime: "7 min read",
    category: "Business",
    icon: "🚀",
    date: "May 22, 2024"
  },
  {
    id: 11,
    title: "AI Integration in India's Judiciary: 2025 and Beyond",
    description: "A deep dive into how artificial intelligence is being integrated into India's judicial system, from eCourts to AI-powered legal research, and what the future holds for justice delivery.",
    readTime: "8 min read",
    category: "Legal Tech",
    icon: "⚖️",
    date: "June 12, 2024"
  },
  {
    id: 12,
    title: "Top 5 AI Tools Empowering Indian Lawyers Today",
    description: "Explore the most popular AI tools revolutionizing legal practice in India, including document automation, case law search, and client management solutions.",
    readTime: "6 min read",
    category: "Legal Tech",
    icon: "🤖",
    date: "June 11, 2024"
  },
  {
    id: 13,
    title: "Use of ChatGPT and GPT APIs in Indian Legal Research",
    description: "Discover how Indian law firms and researchers are leveraging ChatGPT and GPT APIs for faster, smarter legal research and drafting.",
    readTime: "7 min read",
    category: "Legal Tech",
    icon: "💬",
    date: "June 10, 2024"
  },
  {
    id: 14,
    title: "AI-Based Legal Drafting: The Future of Indian Law Firms",
    description: "How AI-driven drafting tools are transforming the way Indian law firms create contracts, petitions, and legal opinions, improving accuracy and efficiency.",
    readTime: "7 min read",
    category: "Legal Tech",
    icon: "📝",
    date: "June 9, 2024"
  },
  {
    id: 15,
    title: "Exploring LawPal: India's First Open Source Legal Chatbot",
    description: "An inside look at LawPal, the open source chatbot designed for Indian legal queries, and how it's making legal help more accessible.",
    readTime: "5 min read",
    category: "Legal Tech",
    icon: "🤝",
    date: "June 8, 2024"
  },
  {
    id: 16,
    title: "Using OCR and AI to Scan and Analyze Indian Court Judgments",
    description: "Learn how OCR and AI technologies are being used to digitize, scan, and analyze vast volumes of Indian court judgments for better legal research.",
    readTime: "6 min read",
    category: "Data & Automation",
    icon: "📊",
    date: "June 7, 2024"
  },
  {
    id: 17,
    title: "AI-Based Case Prediction Models for Indian Civil & Criminal Cases",
    description: "A look at how AI is being used to predict outcomes of Indian court cases, and what this means for lawyers, clients, and the justice system.",
    readTime: "7 min read",
    category: "Data & Automation",
    icon: "🔮",
    date: "June 6, 2024"
  },
  {
    id: 18,
    title: "The Ethical Dilemma of AI in Indian Justice System",
    description: "Examining the ethical challenges of deploying AI in Indian courts, including bias, transparency, and the balance between automation and human judgment.",
    readTime: "6 min read",
    category: "Ethics & Regulation",
    icon: "🔐",
    date: "June 5, 2024"
  },
  {
    id: 19,
    title: "Build a Legal Chatbot in React + GPT API for Indian Laws",
    description: "A step-by-step developer guide to building your own legal chatbot for Indian law using React and GPT APIs, with code samples and deployment tips.",
    readTime: "8 min read",
    category: "Tutorial",
    icon: "🛠️",
    date: "June 4, 2024"
  },
  {
    id: 20,
    title: "Making AI Law Assistants Multilingual for Rural India",
    description: "How AI-powered legal assistants are being adapted to support multiple Indian languages, improving access to justice in rural and regional areas.",
    readTime: "7 min read",
    category: "Access & Inclusion",
    icon: "🌐",
    date: "June 3, 2024"
  }
];

const BlogPage = ({ navigateTo }) => {
  const [email, setEmail] = useState("");
  const [newsletterMsg, setNewsletterMsg] = useState("");
  const [search, setSearch] = useState("");

  // Efficient filtering with useMemo
  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return blogPosts;
    return blogPosts.filter(post => {
      const inTitle = post.title.toLowerCase().includes(q);
      const inDesc = post.description.toLowerCase().includes(q);
      const inTags = post.tags && post.tags.some(tag => tag.toLowerCase().includes(q));
      return inTitle || inDesc || inTags;
    });
  }, [search]);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterMsg("");
    try {
      // Replace with your real endpoint
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setNewsletterMsg("Thank you for subscribing!");
        setEmail("");
      } else {
        setNewsletterMsg("Subscription failed. Try again.");
      }
    } catch {
      setNewsletterMsg("Subscription failed. Try again.");
    }
  };

  return (
    <div className="blog-page">
      <header className="header">
        <div className="logo" onClick={() => navigateTo("home")} style={{ cursor: "pointer" }}>
          <span style={{ fontWeight: 700, fontSize: 24 }}>LegalAI</span>
        </div>
        <nav className="main-nav">
          <ul>
            <li><a href="#" onClick={e => { e.preventDefault(); navigateTo("features"); }}>Features</a></li>
            <li><a href="#" onClick={e => { e.preventDefault(); navigateTo("about"); }}>About</a></li>
            <li className="active"><a href="#" onClick={e => { e.preventDefault(); navigateTo("blog"); }}>Blog</a></li>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="back-home-btn icon-only mobile-hide" onClick={() => navigateTo("home")} title="Home"><Home size={22} /></button>
        </div>
      </header>
      <main className="blog-content">
        {/* Hero Section */}
        <section className="blog-hero-section">
          <div className="blog-hero-image-container left">
            <img 
              src="/still-life-with-scales-justice.png"
              alt="Justice Scales"
              className="blog-hero-image slow-zoom"
            />
          </div>
          <div className="blog-hero-text right">
            <h1 className="blog-hero-title">Legal AI Insights</h1>
            <p className="blog-hero-desc">Explore the latest developments in AI-powered legal services and learn how to maximize the potential of our platform.</p>
          </div>
        </section>

        {/* Search Box */}
        <div style={{ maxWidth: 400, margin: "2rem auto 1rem auto" }}>
          <input
            type="text"
            placeholder="Search blog posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "0.75rem",
              border: "1px solid #e9ecef",
              fontSize: "1.1rem"
            }}
          />
        </div>

        {/* Blog Posts Grid */}
        <section className="blog-grid-section">
          <div className="blog-grid">
            {filteredPosts.length === 0 ? (
              <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#888" }}>
                No blog posts found.
              </div>
            ) : (
              filteredPosts.map(post => (
                <div
                  key={post.id}
                  className="blog-card animated-card"
                  onClick={() => navigateTo(`blog-detail-${post.id}`)}
                  tabIndex={0}
                  role="button"
                  onKeyPress={e => { if (e.key === 'Enter') navigateTo(`blog-detail-${post.id}`); }}
                >
                  <div className="blog-card-header">
                    <span className="blog-card-icon">{post.icon}</span>
                    <span className="blog-card-category">{post.category}</span>
                    <span className="blog-card-readtime">{post.readTime}</span>
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-date">{post.date}</p>
                  <p className="blog-card-desc">{post.description}</p>
                  <button className="blog-card-readmore" onClick={e => { e.stopPropagation(); navigateTo(`blog-detail-${post.id}`); }}>Read More →</button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-section">
          <h2 className="newsletter-title">Stay Updated</h2>
          <p className="newsletter-desc">Subscribe to our newsletter to receive the latest updates about AI in legal services and new features.</p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
          {newsletterMsg && <div className="newsletter-msg">{newsletterMsg}</div>}
        </section>
      </main>
    </div>
  );
};

export default BlogPage; 
