/*
 * ─────────────────────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT: edit this file only.
 *  Everything on the site is rendered from this object.
 *  Sources: Samar-Alawlaqi-AI-Specialist.pdf + LinkedIn
 * ─────────────────────────────────────────────────────────────────────────────
 */
window.PORTFOLIO = {
  draft: false,

  person: {
    first: 'Samar',
    last: 'Alawlaqi',
    title: 'AI Specialist · AI Engineer',
    status: 'Jeddah, Saudi Arabia',
    email: 'samar.mohammed6209@gmail.com',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/samar-alawlaqi' },
    ],
  },

  hero: {
    intro: 'I build AI products and intelligent workflows that reduce manual effort and accelerate decision-making.',
    highlight: 'AI products and intelligent workflows',
  },

  about: {
    lead: 'AI Specialist with a degree in Artificial Intelligence from the University of Jeddah, building practical tools that teams rely on every day, from LLM apps, RAG systems and AI agents to machine learning, computer vision and data analytics.',
    body: [
      'At BTC Networks I design and deploy end-to-end AI solutions used across departments, from an AI-powered applicant tracking system and two websites with AI chatbots to company-wide dashboards and HR automations.',
    ],
  },

  capabilities: [
    { title: 'Machine Learning & Deep Learning',
      text: 'Training and applying models for classification, detection and prediction.',
      tools: ['TensorFlow', 'PyTorch', 'Scikit-learn'] },
    { title: 'Computer Vision',
      text: 'Detection models for medical imaging, from dataset annotation to diagnosis.',
      tools: ['YOLOv8', 'CNNs', 'Roboflow'] },
    { title: 'LLMs, RAG & AI Agents',
      text: 'Language-model applications: chatbots, document parsing, matching and recommendations.',
      tools: ['Prompt engineering', 'RAG', 'Vector databases', 'LangChain', 'NLP'] },
    { title: 'AI Workflow Automation',
      text: 'Automated workflows that remove repetitive, manual follow-up from teams.',
      tools: ['n8n', 'Power Automate', 'Copilot Studio', 'AI agents'] },
    { title: 'AI-Powered Applications',
      text: 'End-to-end AI products built for real users across a company.',
      tools: ['Next.js', 'React', 'Payload CMS', 'Chatbots'] },
    { title: 'Data Analytics & BI',
      text: 'Cleaning and merging data, then turning it into dashboards that drive decisions.',
      tools: ['Power BI', 'Looker Studio', 'Excel', 'SQL', 'Python', 'Pandas'] },
  ],

  // Each role can list highlights (bullets), tools (chips) and projects (expandable cards).
  // Sources: CV + LinkedIn.
  experience: [
    {
      period: 'Jan 2026 - Present',
      role: 'AI Specialist',
      org: 'BTC Networks',
      place: 'Jeddah · On-site',
      text: 'Build and deploy end-to-end AI solutions for the company that simplify daily operations and reduce manual workload across departments.',
      projects: [
        {
          title: 'AI-Powered Applicant Tracking System',
          tags: ['LLMs', 'HR Assistant'],
          summary: 'An AI-powered ATS that turns incoming CVs into ranked, searchable candidate profiles so HR can focus on the most relevant applicants. It evaluates skills and experience in context, not just exact keywords, and highlights each candidate’s strengths and gaps. A bilingual AI assistant helps search and compare candidates, cutting manual review while hiring decisions stay with HR.',
          points: [
            'AI job drafting: helps HR create job descriptions and requirements.',
            'CV screening and ranking: analyses applications and ranks candidates by their fit for the role.',
            'Candidate filtering and search: helps recruiters narrow down applicants and find profiles in a central CV bank.',
            'Bilingual AI assistant: supports candidate search, profile summaries, comparisons and score explanations in Arabic and English.',
            'Hiring pipeline management: brings applications, candidate reviews and recruitment stages into one workspace.',
          ],
          stack: ['LLM', 'Prompt Engineering', 'Next.js', 'React', 'PostgreSQL', 'pdf2json', 'Nextcloud', 'Docker'],
        },
        {
          title: 'TeccManage Website & AI Chatbot',
          url: 'https://teccmanage.com/en',
          ai: 'Tuned through system prompt and AI system engineering for relevant, consistent answers.',
          tags: ['Web', 'CMS', 'Chatbot'],
          summary: 'The TeccManage website and CMS, with an AI chatbot that answers visitor inquiries from the site’s services and content.',
          points: [
            'Built the website and its content management system.',
            'Built an AI-powered chatbot that understands visitor inquiries.',
            'The chatbot answers based on the company’s services and website content.',
            'Refined the system prompt to guide chatbot behavior, interpret visitor intent and improve response clarity and consistency.',
            'Applied AI system engineering to improve how the chatbot uses website content and handles visitor inquiries.',
            'Improved chatbot performance and answer relevance through prompt and response refinement.',
          ],
          stack: ['LLM', 'Prompt Engineering', 'AI System Engineering', 'Next.js', 'React', 'TypeScript', 'Payload CMS', 'PostgreSQL', 'Playwright'],
        },
        {
          title: 'BTC Website & Bilingual AI Chatbot',
          url: 'https://btc.com.sa',
          ai: 'Refined its system prompt for clearer answers and lower token usage.',
          tags: [],
          summary: 'BTC’s website and bilingual AI chatbot, helping visitors explore services, branches and careers in Arabic and English.',
          points: [
            'Developed and enhanced BTC’s website functionality and user experience.',
            'Developed a bilingual AI chatbot to help visitors explore services, branches and career opportunities.',
            'Refined the system prompt to improve how the chatbot interprets visitor questions and follows response instructions.',
            'Improved the relevance, clarity and consistency of chatbot responses in Arabic and English.',
            'Reduced token usage by streamlining prompt instructions and making responses more concise.',
            'Enhanced AI guidance for service inquiries, branch information, career opportunities and frequently asked questions.',
          ],
          stack: ['LLM', 'Prompt Engineering', 'Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Docker'],
        },
        {
          title: 'Employee Work Anniversary Automation',
          tags: ['Automation', 'HR'],
          summary: 'A Python service that sends personalised work-anniversary emails from HR data on a schedule, with a dashboard for HR to track every delivery.',
          points: [
            'Integrated read-only Oracle HR data to identify eligible employees based on hire dates, selected milestones and company eligibility rules.',
            'Automated scheduled work-anniversary emails to employees through Microsoft 365, removing manual follow-up.',
            'Built a SQLite audit trail and duplicate-send protection to prevent repeat greetings across concurrent runs and service restarts.',
            'Created a monitoring dashboard with delivery history, employee search and email previews.',
            'Enabled HR to edit milestone-specific email templates and choose which anniversary years receive greetings without redeployment.',
          ],
          stack: ['Python', 'FastAPI', 'Oracle Database', 'APScheduler', 'SQLite', 'Jinja2', 'Docker'],
        },
      ],
    },
    {
      period: 'Jun 2025 - Dec 2025',
      role: 'Cybersecurity Presales',
      org: 'BTC Networks',
      place: 'Jeddah · On-site',
      text: 'Turned client requirements into cybersecurity proposals, and used data and automation to support presales and business operations.',
      highlights: [
        'Analysed client requirements and prepared technical and financial proposals for cybersecurity solutions: SOC, SIEM, SOAR, endpoint security and firewalls.',
        'Collaborated with vendors and internal teams to make sure solutions matched customer needs.',
        'Built interactive Power BI dashboards connected to SharePoint and Excel for real-time reporting on the sales pipeline and proposals.',
        'Automated recurring reporting and streamlined workflows with Microsoft 365 tools, enabling data-driven decisions.',
      ],
      tools: ['Power BI', 'Excel', 'SharePoint', 'Power Automate'],
    },
    {
      period: 'Mar 2025 - Apr 2025',
      role: 'Data Analyst (Internship)',
      org: 'Baytonia',
      place: 'Jeddah · On-site',
      text: 'Analysed digital marketing performance across the company’s advertising platforms and turned it into recommendations.',
      highlights: [
        'Collected and merged large-scale datasets from Facebook, Google, Snapchat and TikTok ads.',
        'Cleaned and preprocessed the data with Python, and unified siloed datasets into one scalable data model for cross-platform analysis.',
        'Analysed creative performance (CTR, engagement, conversion rate) and campaign performance by platform, time range and audience segment.',
        'Built interactive dashboards for marketing and executive stakeholders, with automated real-time reporting that removed manual updates.',
        'Delivered data-driven recommendations that improved campaign efficiency and reduced costs.',
      ],
      tools: ['Python', 'Pandas', 'NumPy', 'Power BI', 'Looker Studio'],
    },
    {
      period: 'Aug 2020 - Feb 2025',
      role: 'Bachelor of Artificial Intelligence',
      org: 'University of Jeddah',
      text: 'Graduated with an Excellent grade.',
      projects: [
        {
          title: 'Smile Scan: Graduation Project',
          ai: 'YOLOv8 and CNN models detect findings, and an LLM turns them into treatment recommendations.',
          tags: ['Computer Vision', 'Deep Learning', 'LLMs'],
          summary: 'An AI solution that analyses panoramic dental X-rays to support diagnosis and personalised treatment plans.',
          points: [
            'Deep-learning detection with YOLOv8 and CNNs.',
            'Dataset annotation with Roboflow.',
            'LLM prompt engineering to generate treatment recommendations.',
          ],
          stack: ['YOLOv8', 'CNNs', 'Roboflow', 'LLMs'],
        },
      ],
    },
  ],

  projects: [
    {
      title: 'News Automation: AI Daily Brief',
      ai: 'An LLM picks the top stories and summarises them in Arabic.',
      tags: ['LLMs', 'Automation', 'AI News'],
      summary: 'An automated email digest that turns news from eight AI sources into a concise Arabic briefing, with a weekly roundup of AI projects and products.',
      points: [
        'Collects recent articles from eight RSS feeds and filters duplicate and previously sent stories.',
        'Selects up to ten top stories, extracts full article text and generates Arabic summaries with links to the original sources.',
        'Adds a weekly roundup of AI repositories on GitHub, trending Hugging Face models, datasets and Spaces, and AI products from Product Hunt.',
        'Delivers a formatted HTML email through Gmail on a GitHub Actions schedule, with retry attempts and send tracking to prevent repeat digests.',
        'Supports local previews without sending email, plus fallback content when article extraction or AI summarisation fails.',
      ],
      stack: ['Python', 'OpenAI API', 'RSS', 'Trafilatura', 'GitHub Actions', 'Gmail SMTP'],
    },
  ],

  certificates: [
    ['Certified Artificial Intelligence Engineer (CAIE)', 'United States Artificial Intelligence Institute'],
    ['Power BI Data Analyst Associate (PL-300)', 'Microsoft'],
    ['Data Analyst in Power BI', 'DataCamp'],
    ['Data Science & Machine Learning', 'Microsoft Student Club, EELU'],
    ['Data Visualization and Reporting with Power BI', 'Google Developer Student Clubs'],
  ],
};
