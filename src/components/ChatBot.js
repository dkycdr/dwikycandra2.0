import React, { useState, useRef, useEffect } from 'react';
import './chatbot.css';
import { FiX, FiSend, FiMessageCircle } from 'react-icons/fi';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! 👋 I'm Dwiky's AI assistant. Ask me about his projects, skills, experience, or anything else!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Get API key from environment variables only (never hardcode!)
  // Users must add REACT_APP_GROQ_API_KEY to .env.local
  const GROQ_KEY = process.env.REACT_APP_GROQ_API_KEY;
  const GROQ_MODEL = process.env.REACT_APP_GROQ_MODEL || 'llama-3.3-70b-versatile';
  const [hasApiKey, setHasApiKey] = useState(Boolean(GROQ_KEY));

  useEffect(() => {
    // Masked log for debugging in browser console (never print full key)
    if (GROQ_KEY) {
      try {
        console.log('Groq API key present (masked):', GROQ_KEY.slice(0, 10) + '...');
      } catch (e) {
        // ignore
      }
      setHasApiKey(true);
    } else {
      console.warn('Groq API key missing at runtime. Please add REACT_APP_GROQ_API_KEY to .env.local and restart the dev server.');
      setHasApiKey(false);
    }
  }, [GROQ_KEY]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = {
    greeting: [
      "Hey there! 👋 I'm here to help. Ask me about Dwiky's projects, skills, or experience!",
      "Hi! 😊 Feel free to ask me anything about Dwiky or his work.",
      "Welcome! 🎉 I'm Dwiky's AI assistant. What would you like to know?",
      "Halo! Great to see you here. Ask me anything about Dwiky's work! 💻",
    ],
    projects: [
      "Dwiky has worked on some amazing projects! 🚀\n\n1. **AI-Powered Landing Page** - Modern landing with AI chat assistant\n2. **Career Pods Explorer** - Career guidance platform for President University\n3. **President FoodConnect** - Food ordering & delivery platform\n4. **Z Studio** - Creative services marketplace\n\nWant to know more about any specific project?",
      "His portfolio includes 4 major projects spanning from AI integration to full-stack platforms. He's worked as a Developer, Project Manager, and Team Lead!",
      "Career Pods and Z Studio are his standout projects—both involve complex features like real-time communication (Socket.io), database design, and team coordination. Impressive work! 🎯",
    ],
    skills: [
      "Dwiky's main skills include:\n• **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Framer Motion\n• **Backend**: Node.js, PostgreSQL, Socket.io\n• **Tools**: Git, REST APIs, Real-time Features\n• **Currently exploring**: Generative AI\n\nUI/UX design and clean code are his specialties! 🎨",
      "Frontend expert with React & Next.js, backend experience with Node.js & PostgreSQL, and strong UI/UX design sense. Also exploring AI integration!",
      "He can build responsive web apps, design beautiful interfaces, manage databases, implement real-time features, and coordinate cross-functional teams. Full-stack capabilities! 🔧",
      "JavaScript/TypeScript, React/Next.js, Node.js, PostgreSQL, Socket.io, TailwindCSS, Framer Motion. Plus strong project management and UI/UX design skills.",
    ],
    about: [
      "Dwiky is a student at President University 🎓 passionate about clean, intuitive interfaces and exploring AI in web development. He codes with both heart and mind! 💡",
      "Student developer at President University with hands-on full-stack experience. His philosophy: code is poetry, every pixel matters, user experience is everything.",
      "He's building his career at the intersection of technology and creativity. Started as a frontend specialist, evolved into a full-stack developer and project manager. Currently exploring Generative AI! 🚀",
    ],
    experience: [
      "Dwiky's experience includes:\n\n📌 **AI-Powered Landing Page** - Solo developer\n📌 **Career Pods** - Project Manager, led cross-functional team\n📌 **FoodConnect** - PM & full-stack developer\n📌 **Z Studio** - Fullstack developer\n\nRoles: Developer, PM, Team Lead! 🎯",
      "Led teams, managed projects, built backend systems, designed UIs, integrated APIs. He's handled everything from requirements gathering to deployment and maintenance.",
      "Experience in agile workflows, sprint planning, code reviews, debugging, performance optimization. He's managed 3-5 person teams and delivered products successfully! 💪",
    ],
    contact: [
      "You can reach Dwiky through:\n🔗 GitHub: github.com/dkycdr\n🔗 LinkedIn: linkedin.com/in/dwikycandra\n🔗 Instagram: instagram.com/dwikycandra\n\nUse the Contact form on the website! 📧",
      "Best way to contact: Use the Contact form on this website, or reach out on GitHub, LinkedIn, or Instagram.",
      "He's active on GitHub (code), LinkedIn (professional), and Instagram (personal). Contact form is fastest for inquiries! 🔗",
    ],
    education: [
      "Dwiky is a student at **President University** 🎓 Balancing academic coursework with real-world commercial projects!",
      "He's studying at President University while actively building production apps. Best of both worlds—theory & practice! 📚💻",
    ],
    tech: [
      "Tech stack:\n• **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Framer Motion\n• **Backend**: Node.js, Express, PostgreSQL\n• **Real-time**: Socket.io\n• **AI/ML**: OpenAI API, exploring AI integration\n• **Design**: UI/UX, Figma familiarity\n\nAlways learning! 🚀",
      "Modern JavaScript/TypeScript, React ecosystem, backend with Node.js & databases, real-time features with Socket.io. Also integrating AI into web apps! 🤖",
    ],
    design: [
      "Dwiky is passionate about UI/UX design! He believes every pixel matters and focuses on creating beautiful, intuitive interfaces. His designs are modern, clean, and user-centric. 🎨",
      "He uses Framer Motion for smooth animations, Tailwind CSS for styling, and follows best practices for responsive design and accessibility.",
    ],
    ai: [
      "Currently exploring Generative AI and its practical applications in web products! He's integrating AI into projects like the AI-Powered Landing Page and learning how to use it as a creative tool. 🤖✨",
      "He's interested in how AI can enhance user experience—from chatbots to smart features. Building AI-powered projects is one of his current focuses!",
    ],
    leadership: [
      "Dwiky has led teams on Career Pods and FoodConnect, managing requirements, timelines, and deliverables. Strong in communication and cross-functional coordination! 👥",
      "Experience in agile workflows, sprint planning, mentoring junior developers, and ensuring quality delivery. Leadership style: collaborative and supportive.",
    ],
    freelance: [
      "For freelance inquiries or custom projects, use the Contact form on the website and Dwiky will get back to you! He's interested in meaningful projects that align with his interests. 💼",
      "You can reach out through the contact form or social profiles for project discussions and collaborations!",
    ],
    creative: [
      "Z Studio is Dwiky's creative services platform! It offers video editing, web design, logo creation, and branding services. He combines technical skills with creative thinking. 🎬🎨",
      "His creative portfolio spans across video production, graphic design, web design, and digital branding. He thinks like both a developer and a designer!",
    ],
    default: [
      "That's a great question! 🤔 You can ask me about Dwiky's projects, skills, experience, education, tech stack, AI interests, or how to reach him.",
      "I'm here to help! Tell me what you'd like to know about Dwiky—his work, projects, background, or how to collaborate. 😊",
      "That's interesting! Feel free to ask about his projects, skills, experience, or anything web development related. 💡",
      "Good question! Ask me about Career Pods, Z Studio, FoodConnect, his tech stack, leadership experience, or how to get in touch. 🚀",
    ]
  };

  const getResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Greeting
    if (message.match(/\b(hi|hello|hey|halo|pagi|sore|malam|assalamualaikum|wassup|yo)\b/)) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
    }
    
    // Projects
    if (message.match(/\b(project|career pods?|foodconnect|z studio|landing|built|develop)\b/)) {
      return botResponses.projects[Math.floor(Math.random() * botResponses.projects.length)];
    }
    
    // Skills & Tech & Languages
    if (message.match(/\b(skill|expertise|tech|react|javascript|typescript|node|express|sql|postgres|css|html|framework|library|stack|language)\b/)) {
      return botResponses.skills[Math.floor(Math.random() * botResponses.skills.length)];
    }
    
    // Contact & Social & Collaboration
    if (message.match(/\b(contact|reach|email|linkedin|github|instagram|phone|connect|social|hire|freelance|collaborate|project discussion)\b/)) {
      return botResponses.contact[Math.floor(Math.random() * botResponses.contact.length)];
    }
    
    // About & Background
    if (message.match(/\b(about|who|tell me|background|biography|introduce|yourself|story|journey|passion)\b/)) {
      return botResponses.about[Math.floor(Math.random() * botResponses.about.length)];
    }
    
    // Experience & Role
    if (message.match(/\b(experience|work|role|manager|developer|developer experience|led|managed|team|lead)\b/)) {
      return botResponses.experience[Math.floor(Math.random() * botResponses.experience.length)];
    }
    
    // Education
    if (message.match(/\b(education|study|university|college|degree|school|student|learn)\b/)) {
      return botResponses.education[Math.floor(Math.random() * botResponses.education.length)];
    }
    
    // Tech Stack Detail
    if (message.match(/\b(stack|technology|tools|framework|build|using|use)\b/)) {
      return botResponses.tech[Math.floor(Math.random() * botResponses.tech.length)];
    }
    
    // Design & UI/UX
    if (message.match(/\b(design|ui|ux|interface|animation|framer|tailwind|beautiful|visual)\b/)) {
      return botResponses.design[Math.floor(Math.random() * botResponses.design.length)];
    }
    
    // AI & Generative AI
    if (message.match(/\b(ai|artificial intelligence|chatbot|gpt|generative|ml|machine learning|neural|learning)\b/)) {
      return botResponses.ai[Math.floor(Math.random() * botResponses.ai.length)];
    }
    
    // Leadership & Management
    if (message.match(/\b(leadership|lead|manage|team|agile|sprint|mentor|coordinate)\b/)) {
      return botResponses.leadership[Math.floor(Math.random() * botResponses.leadership.length)];
    }
    
    // Freelance & Work Inquiry
    if (message.match(/\b(freelance|hire|available|work for me|custom|build me|can you)\b/)) {
      return botResponses.freelance[Math.floor(Math.random() * botResponses.freelance.length)];
    }
    
    // Creative Services
    if (message.match(/\b(creative|design|video|editing|branding|logo|graphic|portfolio)\b/)) {
      return botResponses.creative[Math.floor(Math.random() * botResponses.creative.length)];
    }
    
    // Default fallback
    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
  };

  const callGroqAPI = async (userMessage) => {
    const apiKey = GROQ_KEY;
    const model = GROQ_MODEL;

    if (!apiKey) {
      console.error('Groq API key not configured at runtime!');
      // Fallback to local canned responses when API key missing
      return getResponse(userMessage);
    }

    try {
      console.log('Calling Groq API (masked key):', apiKey.slice(0, 10) + '...');

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: 'system',
              content: `You are a helpful, friendly, and knowledgeable AI assistant for Dwiky Candra's portfolio website. You serve as his digital companion and guide visitors through his work and expertise.

## ABOUT DWIKY CANDRA

**Personal Profile:**
- Name: Dwiky Candra (dkycdr)
- Current Status: Student at President University, Jakarta
- Role: Full-Stack Developer & Digital Creator
- Passion: Building clean, intuitive web interfaces that delight users
- Current Focus: Exploring Generative AI and its practical applications in web products
- Philosophy: Code is poetry. Every pixel matters. User experience is everything.

**Background & Journey:**
- Started web development journey during bootcamp training
- Progressed from frontend specialist to full-stack developer
- Led cross-functional teams on multiple projects
- Balanced academic responsibilities with real-world commercial projects
- Active contributor to modern web development practices

## PROJECTS (Detailed)

**1. AI-Powered Landing Page**
- Description: Modern, animated landing page featuring an integrated AI chat assistant
- Technology Stack: React, Framer Motion, TailwindCSS, OpenAI API
- Role: Solo Developer (full ownership)
- Key Features: Smooth animations, AI-powered chat, responsive design, modern aesthetics
- Impact: Showcased ability to integrate AI into user-facing products
- Purpose: Demonstrates expertise in modern React patterns and API integration

**2. Career Pods Explorer** ⭐
- Description: Comprehensive career guidance & mentorship platform for President University students
- Technology Stack: React (Frontend), Next.js, Node.js (Backend), PostgreSQL, Socket.io (Real-time)
- Role: Project Manager & Lead Developer
- Key Features: 
  - Career guidance matching
  - Mentorship program management
  - Skill-building resources
  - Real-time notifications (Socket.io)
  - Event management system
  - Resource library
- Scale: Serves President University student population
- Impact: Improved student career outcomes and mentorship accessibility
- Achievements: 
  - Coordinated cross-functional teams (frontend, backend, design)
  - Managed sprint cycles and feature prioritization
  - Implemented real-time features using Socket.io
  - Deployed on Vercel (vercel.app)

**3. President FoodConnect**
- Description: Seamless food ordering and delivery platform connecting students with local food vendors
- Technology Stack: React (Frontend), Flutter (Mobile), Node.js (Backend), PostgreSQL
- Role: Project Manager & Full-Stack Developer
- Key Features:
  - Vendor management system
  - Order tracking in real-time
  - Payment integration
  - Delivery logistics
  - User authentication
  - Rating and review system
- Scale: Campus-wide food ecosystem
- Impact: Simplified campus food ordering, supported local vendors
- Responsibilities: Requirements gathering, timeline management, risk mitigation, delivery coordination

**4. Z Studio** ⭐⭐
- Description: Full-featured creative services marketplace for professional digital solutions
- Technology Stack: React, Next.js, TypeScript, Node.js, Socket.io, PostgreSQL
- Role: Fullstack Developer
- Services Offered:
  - Video editing & production
  - Web design & UI/UX
  - Logo creation & branding
  - Digital asset creation
- Key Features:
  - Client project management dashboard
  - Portfolio showcase system
  - Real-time collaboration (Socket.io)
  - Service request workflow
  - Payment processing
  - Team coordination tools
- Architecture: Modern, scalable, real-time capable
- Impact: Professional creative services platform with seamless client experience

## TECHNICAL SKILLS (Comprehensive)

**Frontend Development:**
- React (Hooks, Context API, Performance Optimization)
- Next.js (SSR, SSG, API Routes)
- TypeScript (Type Safety, Interfaces, Advanced Patterns)
- Tailwind CSS (Responsive Design, Custom Components)
- Framer Motion (Animations, Interactions)
- UI/UX Design (User Research, Prototyping, Accessibility)
- HTML5 & CSS3 (Semantic, Modern Techniques)
- Responsive Web Design (Mobile-First, Adaptive Layouts)

**Backend Development:**
- Node.js & Express (RESTful APIs, Middleware)
- PostgreSQL (Database Design, Queries, Optimization)
- Socket.io (Real-time Communication, Events)
- Authentication & Authorization (JWT, Sessions)
- Database Modeling & Normalization
- API Design Best Practices
- Server-Side Logic & Business Rules

**Tools & Methodologies:**
- Git & GitHub (Version Control, Collaboration)
- REST API Design & Integration
- Agile/Scrum (Sprint Planning, Daily Standups)
- Code Review & Quality Assurance
- Testing (Unit Tests, Integration Tests)
- Deployment (Vercel, cloud platforms)
- Performance Optimization & Monitoring

**Soft Skills:**
- Team Leadership & Mentorship
- Project Management & Timeline Planning
- Stakeholder Communication
- Problem Solving & Debugging
- Code Documentation & Knowledge Sharing
- Cross-functional Collaboration
- Presentation & Public Speaking

## WORK EXPERIENCE & ROLES

**Full-Stack Developer**
- Z Studio Project
- Responsibilities: Designed database schemas, built RESTful APIs, created responsive UIs, implemented real-time features
- Outcomes: Production-ready creative platform serving multiple clients

**Project Manager**
- Career Pods Explorer & FoodConnect
- Responsibilities: Led teams (3-5 people), coordinated feature delivery, managed stakeholders, ensured quality
- Outcomes: Successfully delivered complex projects on time and within scope

**Frontend Developer**
- Multiple projects
- Responsibilities: Component architecture, UI implementation, performance optimization
- Outcomes: Fast, intuitive, beautiful user interfaces

## CORE VALUES & APPROACH

- **User-Centric**: Every decision starts with user experience
- **Clean Code**: Maintainable, readable, well-documented
- **Continuous Learning**: Always exploring new technologies (currently: AI/ML, advanced patterns)
- **Quality First**: Testing, optimization, and attention to detail
- **Collaborative**: Strong communication with teams and stakeholders
- **Problem Solver**: Tackles challenges methodically and creatively

## EDUCATION

- **Institution**: President University
- **Program**: Computer Science / Engineering
- **Status**: Current Student
- **Balancing**: Academic coursework with real-world commercial projects
- **Certifications**: Bootcamp training in Full-Stack Web Development

## CONTACT & SOCIAL PRESENCE

**Professional Profiles:**
- GitHub: github.com/dkycdr (Open source, code samples, project repositories)
- LinkedIn: linkedin.com/in/dwikycandra (Professional updates, recommendations, career info)
- Instagram: instagram.com/dwikycandra (Personal updates, project showcases, lifestyle)

**Contact Methods:**
- Portfolio Website Contact Form (Preferred for inquiries)
- Email: Available via contact form
- Social Media: Direct messages on LinkedIn/Instagram
- GitHub: Issues or discussions on relevant repositories

## INTERACTION GUIDELINES

You are Dwiky's digital assistant. Your role is to:

1. **Represent Authentically**: Speak about Dwiky's work, skills, and projects with genuine knowledge and enthusiasm
2. **Be Personable**: Use a friendly, approachable tone. Make visitors feel welcomed.
3. **Provide Value**: Answer questions thoroughly with relevant details and context
4. **Handle Unexpected Questions**: Use the rich context above to answer even slightly off-topic questions thoughtfully
5. **Direct When Needed**: For detailed inquiries, suggest visitors contact Dwiky directly
6. **Maintain Professionalism**: Balance friendliness with professionalism appropriate for a portfolio
7. **Show Personality**: Let Dwiky's passion for clean interfaces and AI shine through
8. **Be Concise**: Keep responses under 150 words typically, but elaborate when the question warrants it

**Example Personality Traits to Embody:**
- Enthusiastic about technology and problem-solving
- Patient and helpful with visitors
- Humble about achievements but proud of work
- Genuinely interested in helping others learn
- Excited about AI and modern web development

## COMMON QUESTIONS YOU MIGHT GET

- "What technologies do you use?" → Reference specific skills and projects
- "Can you build X for me?" → Mention relevant project experience and suggest contact
- "How did you learn to code?" → Reference bootcamp and self-learning journey
- "What's your coding style?" → Mention clean code, user-centric approach, best practices
- "Are you available for freelance?" → Direct to contact form
- "What's your biggest achievement?" → Highlight impact of projects (Career Pods, Z Studio)
- "How do you stay updated?" → Mention exploring AI, learning new patterns
- "Work-life balance?" → Mention balancing studies with projects, student at university

Keep responses natural, conversational, and helpful. You're not just an FAQ bot—you're a knowledgeable, friendly companion helping people learn about Dwiky and his work.`
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 200,
        })
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Groq API Error:', error);
        throw new Error(error.error?.message || 'API request failed');
      }

      const data = await response.json();
      console.log('Groq response received successfully');
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling Groq API:', error);
      return "Sorry, I'm having trouble connecting to the AI service. Please try again in a moment!";
    }
  };

  // Note: OpenAI fallback removed to prefer Groq. If you want OpenAI fallback,
  // re-add a callOpenAI implementation here.

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Call Groq API directly (no fallback to template)
    try {
      const botResponse = await callGroqAPI(inputValue);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble processing your message. Please try again!",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        className="chatbot-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
      >
        <FiMessageCircle />
        {!isOpen && <span className="chat-badge">1</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {!hasApiKey && (
            <div className="chatbot-warning">AI service not configured — add <code>REACT_APP_GROQ_API_KEY</code> to <code>.env.local</code> and restart dev server.</div>
          )}
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-title">
              <h3>Chat with Assistant</h3>
              <span className="status online">Online</span>
            </div>
            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <FiX />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.sender}`}
              >
                <div className="message-bubble">
                  <p>{msg.text}</p>
                </div>
                <span className="message-time">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="message bot">
                <div className="message-bubble loading">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form className="chatbot-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Ask me something..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message"
            >
              <FiSend />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
