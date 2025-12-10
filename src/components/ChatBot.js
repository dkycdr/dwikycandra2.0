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
      "Hello! Hope you're having a great day. How can I assist you with Dwiky's portfolio today?",
      "Hi there! I'm ready to answer your questions about Dwiky's coding journey. 🚀",
      "Greetings! 👋 Need to know about Dwiky's latest projects? Just ask!",
      "Yo! I'm the digital Dwiky-bot. Ask me anything!",
      "Hi friend! 👋 Curious about how this site was built or who built it? I can tell you!",
      "Welcome aboard! 🛳️ I'm your guide to the Dwiky-verse.",
      "Hello world! 🌍 (That's a classic greeting, right?) How can I help?",
      "Hey! Dwiky is currently coding away, but I can answer your questions in the meantime. 🤖"
    ],
    projects: [
      "Dwiky has worked on some amazing projects! 🚀\n\n1. **AI-Powered Landing Page** - Modern landing with AI chat assistant\n2. **Career Pods Explorer** - Career guidance platform for President University\n3. **President FoodConnect** - Food ordering & delivery platform\n4. **Z Studio** - Creative services marketplace\n\nWant to know more about any specific project?",
      "His portfolio includes 4 major projects spanning from AI integration to full-stack platforms. He's worked as a Developer, Project Manager, and Team Lead!",
      "Career Pods and Z Studio are his standout projects—both involve complex features like real-time communication (Socket.io), database design, and team coordination. Impressive work! 🎯",
      "Check out the **AI-Powered Landing Page** for a demo of his frontend skills, or **FoodConnect** to see his full-stack capabilities in action. 🍔",
      "From marketplace platforms like **Z Studio** to educational tools like **Career Pods**, Dwiky builds solutions that solve real problems.",
      "He loves building things! Ask about his experience with **Next.js** or **Socket.io** in these projects.",
      "If you're into complex backend logic, look at **Career Pods** (it has a matching algorithm). If you like smooth UIs, check out the **Landing Page**! ✨",
      "Each project taught him something new. FoodConnect taught him logistics logic, Career Pods taught him algorithm design, and Z Studio taught him marketplace dynamics.",
      "He doesn't just write code; he builds products. 🛠️ His projects demonstrate a focus on user value and stability.",
      "Ask me specifically about 'FoodConnect' or 'Career Pods' for deep dives!",
      "This website specifically? It's his portfolio! Built with React and love. ❤️"
    ],
    skills: [
      "Dwiky's main skills include:\n• **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Framer Motion\n• **Backend**: Node.js, PostgreSQL, Socket.io\n• **Tools**: Git, REST APIs, Real-time Features\n• **Currently exploring**: Generative AI\n\nUI/UX design and clean code are his specialties! 🎨",
      "Frontend expert with React & Next.js, backend experience with Node.js & PostgreSQL, and strong UI/UX design sense. Also exploring AI integration!",
      "He can build responsive web apps, design beautiful interfaces, manage databases, implement real-time features, and coordinate cross-functional teams. Full-stack capabilities! 🔧",
      "JavaScript/TypeScript, React/Next.js, Node.js, PostgreSQL, Socket.io, TailwindCSS, Framer Motion. Plus strong project management and UI/UX design skills.",
      "Beyond coding, Dwiky is skilled in **Project Management**, **Agile/Scrum**, and **UI/UX Design**. A well-rounded developer! 👨‍💻",
      "He's proficient in modern web nuances: Server-Side Rendering (SSR), Static Site Generation (SSG), and real-time event handling.",
      "He speaks fluent Keyboards. ⌨️ Just kidding. He's great at JS, TS, SQL, and English!",
      "From pixel-perfect CSS to optimized SQL queries, he's got the full stack covered.",
      "He's also comfortable with deployment (Vercel), version control (Git), and API testing (Postman).",
      "Wait, did I mention he's learning usage of LLMs? Because he totally is. 🤖"
    ],
    about: [
      "Dwiky is a student at President University 🎓 passionate about clean, intuitive interfaces and exploring AI in web development. He codes with both heart and mind! 💡",
      "Student developer at President University with hands-on full-stack experience. His philosophy: code is poetry, every pixel matters, user experience is everything.",
      "He's building his career at the intersection of technology and creativity. Started as a frontend specialist, evolved into a full-stack developer and project manager. Currently exploring Generative AI! 🚀",
      "A tech enthusiast who loves turning ideas into reality through code. He's constantly learning and pushing his boundaries.",
      "Driven by curiosity and a passion for excellence, Dwiky balances his university studies with professional-grade development work.",
      "He believes in 'Learning by Doing'. Most of his skills were honed through building real projects.",
      "He's not just a student; he's a practitioner. 📚+💻 = 🚀",
      "Fun fact: He probably has 10 tabs of documentation open right now. 📑"
    ],
    experience: [
      "Dwiky's experience includes:\n\n📌 **AI-Powered Landing Page** - Solo developer\n📌 **Career Pods** - Project Manager, led cross-functional team\n📌 **FoodConnect** - PM & full-stack developer\n📌 **Z Studio** - Fullstack developer\n\nRoles: Developer, PM, Team Lead! 🎯",
      "Led teams, managed projects, built backend systems, designed UIs, integrated APIs. He's handled everything from requirements gathering to deployment and maintenance.",
      "Experience in agile workflows, sprint planning, code reviews, debugging, performance optimization. He's managed 3-5 person teams and delivered products successfully! 💪",
      "He knows what it takes to ship software: from the initial design phase to final deployment and iteration.",
      "Versatile roles: He's been the guy coding the features, the one designing the database, and the leader facilitating the stand-up meetings.",
      "He understands that coding is a team sport. 🤝 His experience leading Career Pods proved his ability to coordinate designers and devs.",
      "He's not afraid to get his hands dirty with messy legacy code (though he prefers fresh starts!)."
    ],
    contact: [
      "You can reach Dwiky through:\n🔗 GitHub: github.com/dkycdr\n🔗 LinkedIn: linkedin.com/in/dwikycandra\n🔗 Instagram: instagram.com/dwikycandra\n\nUse the Contact form on the website! 📧",
      "Best way to contact: Use the Contact form on this website, or reach out on GitHub, LinkedIn, or Instagram.",
      "He's active on GitHub (code), LinkedIn (professional), and Instagram (personal). Contact form is fastest for inquiries! 🔗",
      "Want to collaborate? Drop a message via the contact form or connect on LinkedIn!",
      "Slide into his DMs on LinkedIn for professional inquiries, or check out his code on GitHub.",
      "Don't be shy! He loves connecting with other devs and potential clients. 👋",
      "Network with him! He's always open to a virtual coffee chat. ☕"
    ],
    education: [
      "Dwiky is a student at **President University** 🎓 Balancing academic coursework with real-world commercial projects!",
      "He's studying at President University while actively building production apps. Best of both worlds—theory & practice! 📚💻",
      "Major: Computer Science / Engineering at President University. He applies what he learns immediately to his projects.",
      "Continuous learner: University student by day, Full-stack developer by night (and day)! 🎓",
      "He takes 'homework' literally—building apps at home that solve real problems.",
      "University taught him the fundamentals; curiosity taught him the rest. 🏫"
    ],
    tech: [
      "Tech stack:\n• **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Framer Motion\n• **Backend**: Node.js, Express, PostgreSQL\n• **Real-time**: Socket.io\n• **AI/ML**: OpenAI API, exploring AI integration\n• **Design**: UI/UX, Figma familiarity\n\nAlways learning! 🚀",
      "Modern JavaScript/TypeScript, React ecosystem, backend with Node.js & databases, real-time features with Socket.io. Also integrating AI into web apps! 🤖",
      "He picks the right tool for the job. Often that's Next.js for the web, Node for the API, and Postgres for the data.",
      "Loves working with **Tailwind CSS** for styling and **Framer Motion** for bringing interfaces to life.",
      "He's a big fan of the React ecosystem. Hooks, Context, you name it.",
      "Vite is his go-to bundler these days. Gotta love that speed! ⚡",
      "He avoids jQuery like the plague. It's 2024, after all. 😉"
    ],
    design: [
      "Dwiky is passionate about UI/UX design! He believes every pixel matters and focuses on creating beautiful, intuitive interfaces. His designs are modern, clean, and user-centric. 🎨",
      "He uses Framer Motion for smooth animations, Tailwind CSS for styling, and follows best practices for responsive design and accessibility.",
      "Design isn't just about how it looks, but how it works. Dwiky prioritizes user flow and experience.",
      "He has a keen eye for aesthetics—minimalist, cleaner, and modern designs are his jam.",
      "White space is his best friend. Clutter is the enemy. ⚔️"
    ],
    ai: [
      "Currently exploring Generative AI and its practical applications in web products! He's integrating AI into projects like the AI-Powered Landing Page and learning how to use it as a creative tool. 🤖✨",
      "He's interested in how AI can enhance user experience—from chatbots to smart features. Building AI-powered projects is one of his current focuses!",
      "AI is the future, and Dwiky is diving in headfirst. He's experimenting with LLMs and API integrations.",
      "Ask him about how he built this chatbot! It uses AI to answer your questions (when the API key is set).",
      "It's not about replacing developers; it's about making them super-powered. 🦾"
    ],
    leadership: [
      "Dwiky has led teams on Career Pods and FoodConnect, managing requirements, timelines, and deliverables. Strong in communication and cross-functional coordination! 👥",
      "Experience in agile workflows, sprint planning, mentoring junior developers, and ensuring quality delivery. Leadership style: collaborative and supportive.",
      "He's not just a coder; he's a leader who can guide a project from concept to completion.",
      "Good leadership is about enabling others to do their best work. That's his philosophy."
    ],
    freelance: [
      "For freelance inquiries or custom projects, use the Contact form on the website and Dwiky will get back to you! He's interested in meaningful projects that align with his interests. 💼",
      "You can reach out through the contact form or social profiles for project discussions and collaborations!",
      "Open to opportunities! If you have an interesting project, don't hesitate to reach out.",
      "Have a cool app idea? Let's discuss how we can build it together! 🔨"
    ],
    creative: [
      "Z Studio is Dwiky's creative services platform! It offers video editing, web design, logo creation, and branding services. He combines technical skills with creative thinking. 🎬🎨",
      "His creative portfolio spans across video production, graphic design, web design, and digital branding. He thinks like both a developer and a designer!",
      "Creativity meets Technology. That's the motto behind his work at Z Studio.",
      "He believes specific tools enhance creativity, not hinder it."
    ],
    hobbies: [
      "When he's not coding, Dwiky enjoys gaming, exploring new tech, and staying updated with the latest trends in the digital world. 🎮",
      "He loves a good problem to solve, whether it's in code or a strategy game! Also enjoys coffee and good music. ☕",
      "Coding is a hobby too! But outside of that, he appreciates good design and digital art.",
      "He might be grinding rank in Valorant or Mobile Legends on the weekends. ⚔️"
    ],
    location: [
      "Dwiky is based in **Cikarang, Indonesia** 🇮🇩 but works with the global web! 🌍",
      "Located in Indonesia! Available for remote work and collaborations worldwide.",
      "He's operating from Indonesia, reaching the world through code.",
      "Cikarang: The industrial city where tech dreams are built. 🏭"
    ],
    availability: [
      "As a student and developer, his schedule varies, but he's always open to discussing interesting opportunities! 📅",
      "He's currently balancing university and projects. Best to check with him directly via the contact form!",
      "Open to freelance/part-time opportunities depending on the project scope.",
      "He sleeps... occasionally. 😴 But he's mostly around if you need him!"
    ],
    pricing: [
      "Project costs vary depending on complexity, features, and timeline. It's best to discuss your specific needs with Dwiky directly for a quote! 💲",
      "He offers competitive rates for his services. Reach out via the contact form to get a custom quote.",
      "Quality work deserves fair compensation. Send him your requirements to get an estimate!",
      "It provides value, not just code. The price reflects the solution to your problem."
    ],
    whyhire: [
      "Why hire Dwiky? Because he brings a full-stack perspective, a designer's eye, and a project manager's discipline to every task. He cares about the end product! ⭐",
      "You get a developer who understands the 'why' behind the code. He builds solutions, not just features.",
      "Reliable, skilled, and passionate. He delivers high-quality web applications that stand out.",
      "He treats your project like his own. Quality guaranteed. ✅"
    ],
    thankyou: [
      "You're very welcome! If you have more questions, just ask. 😊",
      "Happy to help! Let me know if there's anything else you need.",
      "My pleasure! Thanks for stopping by.",
      "No problem at all! Have a great day! 👋",
      "Anytime! Keep being awesome. ✨"
    ],
    philosophy: [
      "Dwiky believes that 'Code is Poetry'. Every line should be clean, and every pixel should be perfect. 🖋️",
      "Simplicity is the ultimate sophistication. He strives for clean, maintainable, and efficient code.",
      "User First. Technology Second. That's his approach to product development.",
      "Always leave the code better than you found it. 🧹"
    ],
    tools_specific: [
      "He loves **VS Code** with a good theme! 🎨 for editing.",
      "**Figma** is his go-to for designing interfaces before coding.",
      "**Postman** for API testing, **Git** for version control. Standard industry tools!",
      "He uses **Vercel** for deploying frontend apps because it's just so fast. ⚡",
      "Markdown for documentation? Always."
    ],
    joke: [
      "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
      "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?' 😂",
      "There are 10 types of people in the world: those who understand binary, and those who don't.",
      "My code works, I have no idea why... just kidding! (Usually) 😉",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem."
    ],
    coffee: [
      "Coffee converts code into... wait, no. Coffee converts developer energy into code! ☕",
      "Dwiky runs on caffeine and curiosity. ☕",
      "Yes, coffee is an essential part of the tech stack!",
      "Espresso, Latte, or instant coffee at 3 AM? Yes. All of them."
    ],
    future: [
      "He aims to become a world-class tech leader who bridges the gap between engineering and design. 🌟",
      "Dwiky is constantly evolving. Next stop: Advanced AI integration and larger scale distributed systems!",
      "To keep building cool stuff that helps people. That's the forever goal.",
      "World domination? No. Web domination with great UI? Yes! 🌍"
    ],
    music: [
      "Dwiky vibes to Lofi beats while coding. 🎧 It helps the focus!",
      "Sometimes it's Jazz for design, Rock for debugging, and Lofi for features.",
      "Life needs a soundtrack. Coding definitely needs one."
    ],
    gaming: [
      "Valorant and Mobile Legends are his go-to games for resetting the brain. 🎮",
      "Strategy games keep the mind sharp! Chess, anyone? ♟️",
      "GGWP! (Good Game, Well Played) is his attitude in games and in code."
    ],
    food: [
      "Nasi Goreng is a classic favorite! 🍛",
      "Code requires fuel. Good food is the best fuel.",
      "Spicy food? Bring it on! 🔥"
    ],
    secret: [
      "🕵️ You found a secret! Dwiky actually checks his code 3 times before committing. Usually.",
      "Shhh... The secret ingredient is love. And Stack Overflow. 🤫",
      "You unlocked the secret achievement: 'Curious Cat'. 🐱"
    ],
    motivation: [
      "\"The only way to do great work is to love what you do.\" - Steve Jobs",
      "\"It's not a bug, it's a feature.\" (Just kidding, fix the bugs!)",
      "Keep pushing, keep learning. Every error message is just a lesson in disguise. 💪",
      "Believe you can and you're halfway there."
    ],
    what_is_react: [
      "React is a JavaScript library for building user interfaces. Dwiky uses it because it's component-based, efficient, and just pleasurable to write! ⚛️",
      "It allows for reusable components and manages the state of the app beautifully.",
      "It's the V in MVC (Model View Controller), basically."
    ],
    clean_code: [
      "Clean code reads like prose. Dwiky tries to write code that others (and future-him) can understand easily. 📖",
      "Meaningful variable names, small functions, and DRY (Don't Repeat Yourself) principles.",
      "If you have to explain it with a comment, maybe the code isn't clean enough. (But comments are still good!)"
    ],
    default: [
      "That's a great question! 🤔 You can ask me about Dwiky's projects, skills, experience, education, tech stack, AI interests, or how to reach him.",
      "I'm here to help! Tell me what you'd like to know about Dwiky—his work, projects, background, or how to collaborate. 😊",
      "That's interesting! Feel free to ask about his projects, skills, experience, or anything web development related. 💡",
      "Good question! Ask me about Career Pods, Z Studio, FoodConnect, his tech stack, leadership experience, or how to get in touch. 🚀",
      "I'm listening! You can ask about his hobbies, where he's located, or why you should work with him.",
      "Not sure what to ask? Try asking about his latest project or his favorite tech stack!",
      "I have answers about his Code, his Coffee habits (maybe), and his Career! What's on your mind?",
      "You can ask me almost anything about Dwiky. If I don't know, I'll tell you to ask him directly!",
      "Ask me about 'Z Studio' or 'Career Pods' to see his specific project work.",
      "Tell me a joke? Ask about music? I can do those too!"
    ]
  };

  const getResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Greeting
    if (message.match(/\b(hi|hello|hey|halo|pagi|sore|malam|assalamualaikum|wassup|yo|greetings|howdy|holla|test)\b/)) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
    }

    // Projects
    if (message.match(/\b(project|career pods?|foodconnect|z studio|landing|built|develop|portfolio|app|website|creation|work)\b/)) {
      return botResponses.projects[Math.floor(Math.random() * botResponses.projects.length)];
    }

    // Skills & Tech & Languages
    if (message.match(/\b(skill|expertise|tech|react|javascript|typescript|node|express|sql|postgres|css|html|framework|library|stack|language|next\.?js|socket\.?io|frontend|backend)\b/)) {
      return botResponses.skills[Math.floor(Math.random() * botResponses.skills.length)];
    }

    // Contact & Social & Collaboration
    if (message.match(/\b(contact|reach|email|linkedin|github|instagram|phone|connect|social|hire|freelance|collaborate|project discussion|dm|chat)\b/)) {
      return botResponses.contact[Math.floor(Math.random() * botResponses.contact.length)];
    }

    // About & Background
    if (message.match(/\b(about|who|tell me|background|biography|introduce|yourself|story|journey|passion|profile|person)\b/)) {
      return botResponses.about[Math.floor(Math.random() * botResponses.about.length)];
    }

    // Experience & Role
    if (message.match(/\b(experience|work|role|manager|developer|developer experience|led|managed|team|lead|job|career)\b/)) {
      return botResponses.experience[Math.floor(Math.random() * botResponses.experience.length)];
    }

    // Education
    if (message.match(/\b(education|study|university|college|degree|school|student|learn|campus|major|course)\b/)) {
      return botResponses.education[Math.floor(Math.random() * botResponses.education.length)];
    }

    // Tech Stack Detail
    if (message.match(/\b(stack|technology|tools|framework|build|using|use|what do you use|how it works)\b/)) {
      return botResponses.tech[Math.floor(Math.random() * botResponses.tech.length)];
    }

    // Design & UI/UX
    if (message.match(/\b(design|ui|ux|interface|animation|framer|tailwind|beautiful|visual|aesthetic|looks)\b/)) {
      return botResponses.design[Math.floor(Math.random() * botResponses.design.length)];
    }

    // AI & Generative AI
    if (message.match(/\b(ai|artificial intelligence|chatbot|gpt|generative|ml|machine learning|neural|learning|llm|robot)\b/)) {
      return botResponses.ai[Math.floor(Math.random() * botResponses.ai.length)];
    }

    // Leadership & Management
    if (message.match(/\b(leadership|lead|manage|team|agile|sprint|mentor|coordinate|scrum|kanban)\b/)) {
      return botResponses.leadership[Math.floor(Math.random() * botResponses.leadership.length)];
    }

    // Freelance & Work Inquiry
    if (message.match(/\b(freelance|hire|available|work for me|custom|build me|can you|contract|part time|full time)\b/)) {
      return botResponses.freelance[Math.floor(Math.random() * botResponses.freelance.length)];
    }

    // Creative Services
    if (message.match(/\b(creative|design|video|editing|branding|logo|graphic|portfolio|z studio|art)\b/)) {
      return botResponses.creative[Math.floor(Math.random() * botResponses.creative.length)];
    }

    // Hobbies
    if (message.match(/\b(hobby|hobbies|interest|like|gaming|music|fun|free time|play)\b/)) {
      return botResponses.hobbies[Math.floor(Math.random() * botResponses.hobbies.length)];
    }

    // Location
    if (message.match(/\b(location|where|live|base|country|city|area|indonesia|cikarang)\b/)) {
      return botResponses.location[Math.floor(Math.random() * botResponses.location.length)];
    }

    // Availability
    if (message.match(/\b(available|busy|free|schedule|time|now|open)\b/)) {
      return botResponses.availability[Math.floor(Math.random() * botResponses.availability.length)];
    }

    // Pricing
    if (message.match(/\b(price|cost|rate|fee|charge|quote|budget|expensive|cheap|money)\b/)) {
      return botResponses.pricing[Math.floor(Math.random() * botResponses.pricing.length)];
    }

    // Why Hire
    if (message.match(/\b(why|reason|good|better|best|value|advantage|strength|benefit)\b/)) {
      return botResponses.whyhire[Math.floor(Math.random() * botResponses.whyhire.length)];
    }

    // Thank You
    if (message.match(/\b(thank|thanks|thx|tq|makasih|arigato|cheers|cool|awesome|great|nice)\b/)) {
      return botResponses.thankyou[Math.floor(Math.random() * botResponses.thankyou.length)];
    }

    // Philosophy
    if (message.match(/\b(philosophy|motto|believe|code is poetry|mindset|principle)\b/)) {
      return botResponses.philosophy[Math.floor(Math.random() * botResponses.philosophy.length)];
    }

    // Specific Tools
    if (message.match(/\b(vscode|git|github|figma|postman|docker|vercel|netlify|deployment)\b/)) {
      return botResponses.tools_specific[Math.floor(Math.random() * botResponses.tools_specific.length)];
    }

    // Joke
    if (message.match(/\b(joke|funny|laugh|humor|comedy)\b/)) {
      return botResponses.joke[Math.floor(Math.random() * botResponses.joke.length)];
    }

    // Coffee
    if (message.match(/\b(coffee|drink|tea|caffeine|beverage)\b/)) {
      return botResponses.coffee[Math.floor(Math.random() * botResponses.coffee.length)];
    }

    // Future
    if (message.match(/\b(future|goal|dream|next|plan|vision)\b/)) {
      return botResponses.future[Math.floor(Math.random() * botResponses.future.length)];
    }

    // Music
    if (message.match(/\b(music|song|listen|band|genre|lofi|jazz|rock)\b/)) {
      return botResponses.music[Math.floor(Math.random() * botResponses.music.length)];
    }

    // Gaming
    if (message.match(/\b(game|gaming|play|steam|valorant|mobile legends|chess)\b/)) {
      return botResponses.gaming[Math.floor(Math.random() * botResponses.gaming.length)];
    }

    // Food
    if (message.match(/\b(food|eat|hungry|lunch|dinner|breakfast|snack)\b/)) {
      return botResponses.food[Math.floor(Math.random() * botResponses.food.length)];
    }

    // Secret
    if (message.match(/\b(secret|password|sudo|admin|hidden|egg)\b/)) {
      return botResponses.secret[Math.floor(Math.random() * botResponses.secret.length)];
    }

    // Motivation
    if (message.match(/\b(motivat|inspire|quote|sad|stuck|hard|tired)\b/)) {
      return botResponses.motivation[Math.floor(Math.random() * botResponses.motivation.length)];
    }

    // What is React
    if (message.match(/\b(what is react|why react)\b/)) {
      return botResponses.what_is_react[Math.floor(Math.random() * botResponses.what_is_react.length)];
    }

    // Clean Code
    if (message.match(/\b(clean code|best practice|refactor)\b/)) {
      return botResponses.clean_code[Math.floor(Math.random() * botResponses.clean_code.length)];
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
- Current Status: Student at President University, Cikarang
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
