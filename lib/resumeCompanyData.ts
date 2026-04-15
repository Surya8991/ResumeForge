// Curated company-specific resume guidance for high-intent SEO pages.
// 22 companies (10 Global + 12 India) — kept fully static. No PII, no scraping.
// Used by: app/resume-for/page.tsx (hub) and app/resume-for/[company]/page.tsx (dynamic).

export type CompanyTier = 'Global' | 'India';

export interface CompanyEntry {
  slug: string;
  name: string;
  tier: CompanyTier;
  industry: string;
  hq: string;
  description: string;
  hiringFocus: string;
  keywords: string[]; // 15 ATS-relevant keywords
  resumeTips: string[]; // 4-5 actionable tips
  recommendedTemplate: string; // matches a template name in types/resume.ts
  metaTitle: string;
  metaDescription: string;
}

export const COMPANIES: CompanyEntry[] = [
  // ───────────── GLOBAL ─────────────
  {
    slug: 'google',
    name: 'Google',
    tier: 'Global',
    industry: 'Technology / Search',
    hq: 'Mountain View, California, USA',
    description:
      'Google hires for engineering, product, sales, marketing, and research roles across more than 70 offices worldwide. The bar is famously high: Google reviews more than 3 million applications a year and accepts roughly 0.2% of them.',
    hiringFocus:
      'Google looks for measurable impact, scale, and structured problem solving. Recruiters skim resumes in under 30 seconds, so every bullet should lead with a number, a metric, or a clearly named outcome. Engineering candidates need clean technical signal; non-engineering candidates need clear business outcomes tied to dollars, users, or efficiency gains.',
    keywords: [
      'Python', 'Java', 'C++', 'Go', 'data structures', 'algorithms',
      'system design', 'distributed systems', 'machine learning', 'TensorFlow',
      'GCP', 'Kubernetes', 'A/B testing', 'product strategy', 'cross-functional',
    ],
    resumeTips: [
      'Lead every bullet with a metric. Google interviewers explicitly look for impact framed as "Reduced X by Y% saving $Z."',
      'Keep it to one page if you have under 10 years experience. Two pages is acceptable for senior+ but never three.',
      'List your top 5-7 technical skills near the top. Google recruiters filter on exact keyword matches before forwarding to hiring managers.',
      'Mention scale: requests per second, users served, data volume processed. Google works at planetary scale and rewards candidates who think that way.',
      'Avoid graphics, columns, and tables. Google Workday-based ATS strips formatting and a single garbled section can sink you.',
    ],
    recommendedTemplate: 'modern',
    metaTitle: 'Google Resume Guide 2026 - Templates, Keywords & Tips | ResumeBuildz',
    metaDescription:
      'How to write a resume that gets noticed at Google. Real keywords, formatting rules, recommended template, and 5 tips from how Google actually screens resumes.',
  },
  {
    slug: 'amazon',
    name: 'Amazon',
    tier: 'Global',
    industry: 'E-commerce / Cloud',
    hq: 'Seattle, Washington, USA',
    description:
      'Amazon is one of the largest private employers in the world with over 1.5 million employees. Hiring spans AWS, retail, devices, advertising, and operations. Every interview loop is structured around the 16 Leadership Principles.',
    hiringFocus:
      'Amazon famously scores resumes against its 16 Leadership Principles (Customer Obsession, Ownership, Bias for Action, Dive Deep, etc). Bullets that map cleanly to a principle dramatically outperform generic ones. Use the STAR format (Situation, Task, Action, Result) and quantify the result.',
    keywords: [
      'AWS', 'EC2', 'S3', 'Lambda', 'DynamoDB', 'CloudFormation',
      'leadership principles', 'customer obsession', 'ownership', 'bias for action',
      'dive deep', 'STAR format', 'P&L', 'cross-functional', 'metrics-driven',
    ],
    resumeTips: [
      'Map each bullet to a Leadership Principle. Internally, Amazon recruiters tag bullets to principles before forwarding the resume to the loop.',
      'Use STAR format for every bullet: situation, task, action, result. The result must be a number.',
      'Quantify scope: team size, budget owned, customers impacted, revenue generated. Amazon hires for owners, not contributors.',
      'For AWS roles, list specific services you have shipped to production. Vague "cloud experience" is filtered out.',
      'Avoid the word "we." Amazon explicitly screens for individual ownership. Use "I led," "I owned," "I shipped."',
    ],
    recommendedTemplate: 'professional',
    metaTitle: 'Amazon Resume Guide 2026 - Leadership Principles & STAR Format | ResumeBuildz',
    metaDescription:
      'How to write an Amazon resume that maps to the 16 Leadership Principles. STAR format examples, AWS keywords, recommended template, and 5 insider tips.',
  },
  {
    slug: 'microsoft',
    name: 'Microsoft',
    tier: 'Global',
    industry: 'Technology / Cloud',
    hq: 'Redmond, Washington, USA',
    description:
      'Microsoft hires across Azure, Office, Windows, Xbox, LinkedIn, GitHub, and AI research. With 220,000+ employees globally, it is one of the most active hirers in tech. The culture leans collaborative and growth-mindset oriented.',
    hiringFocus:
      'Microsoft recruiters prioritize collaboration, learning, and customer impact. Satya Nadella has publicly emphasized "learn-it-all" over "know-it-all." Resumes that show curiosity, mentorship, and team uplift score higher than lone-wolf rockstar narratives.',
    keywords: [
      'Azure', 'C#', '.NET', 'TypeScript', 'PowerShell', 'Microsoft 365',
      'Power Platform', 'DevOps', 'GitHub Actions', 'Visual Studio',
      'agile', 'scrum', 'cross-team collaboration', 'mentorship', 'inclusive design',
    ],
    resumeTips: [
      'Highlight collaboration and mentorship. Microsoft explicitly screens for growth mindset and team enablement.',
      'For technical roles, list your Azure services and certifications front and center (AZ-104, AZ-204, AZ-305).',
      'Show learning velocity: courses, certifications, side projects, internal moves. Microsoft hires for learning agility.',
      'Use accessibility and inclusive design language if relevant. Microsoft has a strong public commitment to accessibility.',
      'Quantify scope and customers but soften the lone-hero tone. "Partnered with 4 teams to ship" beats "Single-handedly delivered."',
    ],
    recommendedTemplate: 'corporate',
    metaTitle: 'Microsoft Resume Guide 2026 - Azure, Growth Mindset & Tips | ResumeBuildz',
    metaDescription:
      'How to write a Microsoft resume that wins. Azure keywords, growth-mindset language, recommended template, and 5 tips on what Microsoft recruiters look for.',
  },
  {
    slug: 'meta',
    name: 'Meta',
    tier: 'Global',
    industry: 'Social / VR',
    hq: 'Menlo Park, California, USA',
    description:
      'Meta hires for Facebook, Instagram, WhatsApp, Reality Labs, and AI research. The company has aggressively shifted toward "year of efficiency" hiring since 2023, which means every candidate must clearly justify ROI.',
    hiringFocus:
      'Meta engineering interviews are famously brutal: 5-6 rounds covering coding, system design, and behavioral. The resume needs to land you the phone screen first. Recruiters look for product impact at scale (millions of users) and velocity (shipping speed).',
    keywords: [
      'React', 'GraphQL', 'PHP', 'Hack', 'PyTorch', 'product engineering',
      'A/B testing', 'experimentation', 'growth', 'mobile', 'iOS', 'Android',
      'data-driven', 'ship velocity', 'user impact',
    ],
    resumeTips: [
      'Lead with user impact at scale: "Shipped feature used by 12M monthly active users." Meta operates at a billion-user scale and rewards candidates who think that way.',
      'For engineering roles, mention React, GraphQL, or PyTorch if you have them. These are Meta core stacks and recruiters filter on them.',
      'Show shipping velocity. "Shipped 14 features in 6 months" outperforms vague responsibilities lists.',
      'Use experimentation language: A/B test, lift, statistical significance, holdout group. Meta runs thousands of experiments and the vocabulary signals fluency.',
      'Avoid academic-style resumes. Meta prefers tight, single-page, results-first resumes.',
    ],
    recommendedTemplate: 'modern',
    metaTitle: 'Meta (Facebook) Resume Guide 2026 - React, Growth & Tips | ResumeBuildz',
    metaDescription:
      'How to write a Meta resume that gets the phone screen. React/GraphQL keywords, scale-first bullets, recommended template, and 5 tips from real screening signal.',
  },
  {
    slug: 'apple',
    name: 'Apple',
    tier: 'Global',
    industry: 'Hardware / Software',
    hq: 'Cupertino, California, USA',
    description:
      'Apple hires for hardware, software, services, retail, and AI/ML. The company is famously secretive, which means resumes must sell skills without leaking projects. Quality, craft, and attention to detail matter more than breadth.',
    hiringFocus:
      'Apple looks for craft. Recruiters explicitly screen for "details" — typos, formatting inconsistencies, alignment issues are all fatal. The bar for polish on the resume itself is among the highest in the industry.',
    keywords: [
      'Swift', 'Objective-C', 'iOS', 'macOS', 'watchOS', 'tvOS',
      'Metal', 'Core Data', 'UIKit', 'SwiftUI', 'Xcode',
      'product design', 'craftsmanship', 'attention to detail', 'cross-functional',
    ],
    resumeTips: [
      'Polish is the test. A single typo or alignment glitch on an Apple resume signals lack of craft and is often a fast reject.',
      'For engineering roles, list Swift, SwiftUI, and the Apple platforms you have shipped to. Generic "mobile experience" is filtered out.',
      'Show attention to user experience and visual quality. Bullets like "Reduced app launch time by 40%" land well.',
      'Keep it minimalist. Apple culture rewards understatement; oversold resumes get flagged.',
      'Mention any work that touched accessibility, privacy, or sustainability — Apple publicly prioritizes all three.',
    ],
    recommendedTemplate: 'minimalist',
    metaTitle: 'Apple Resume Guide 2026 - Swift, Craft & Tips | ResumeBuildz',
    metaDescription:
      'How to write an Apple resume that signals craft. Swift/iOS keywords, polish requirements, recommended template, and 5 tips on what Apple recruiters scan for.',
  },
  {
    slug: 'deloitte',
    name: 'Deloitte',
    tier: 'Global',
    industry: 'Consulting',
    hq: 'London, UK',
    description:
      'Deloitte is the largest professional services firm in the world with over 415,000 employees across 150 countries. It hires across audit, tax, advisory, consulting, and risk advisory. Each service line has slightly different resume expectations.',
    hiringFocus:
      'Deloitte uses a structured competency framework: leadership, problem solving, client impact, and technical expertise. Resumes are scored on demonstrated outcomes for clients, not just internal projects. Big Four resumes generally favor structured one-page formats.',
    keywords: [
      'consulting', 'client engagement', 'stakeholder management', 'PowerPoint',
      'Excel modeling', 'data analytics', 'audit', 'risk advisory', 'transformation',
      'CPA', 'CA', 'MBA', 'business case', 'executive presentation', 'change management',
    ],
    resumeTips: [
      'Quantify client impact in dollars, hours saved, or risk reduced. Deloitte recruiters explicitly look for client value.',
      'Show stakeholder breadth: "Presented to C-suite of $500M client." Big Four hire for client-facing maturity.',
      'List relevant certifications (CPA, CA, CFA, PMP, ITIL) at the top. They are filterable in Workday.',
      'Use case study language: "Led 6-week diagnostic across 3 business units." Mirrors how Deloitte teams frame engagements.',
      'Keep formatting clean and structured. A two-column or graphic resume often fails Deloitte ATS parsing.',
    ],
    recommendedTemplate: 'corporate',
    metaTitle: 'Deloitte Resume Guide 2026 - Consulting Templates & Tips | ResumeBuildz',
    metaDescription:
      'How to write a Deloitte resume that beats Workday ATS. Consulting keywords, client-impact bullets, recommended template, and 5 insider tips for Big Four hiring.',
  },
  {
    slug: 'mckinsey',
    name: 'McKinsey & Company',
    tier: 'Global',
    industry: 'Management Consulting',
    hq: 'New York, USA',
    description:
      'McKinsey is the most prestigious management consulting firm in the world. It hires roughly 8,000 consultants per year out of more than 800,000 applications, an acceptance rate well under 1%. Resumes are screened by humans first, then forwarded to interviews.',
    hiringFocus:
      'McKinsey resumes are evaluated on three pillars: distinctive achievement, leadership, and analytical ability. Every bullet must demonstrate one of these. Generic responsibilities get rejected almost instantly. The famous "McKinsey resume" is one page, three sections, all results.',
    keywords: [
      'leadership', 'problem solving', 'analytical', 'quantitative', 'strategy',
      'business case', 'financial modeling', 'market sizing', 'data analysis',
      'PowerPoint', 'executive communication', 'top of class', 'distinction',
      'merit scholarship', 'GPA',
    ],
    resumeTips: [
      'One page only. McKinsey explicitly rejects multi-page resumes for non-experienced hires. Senior hires can use two.',
      'Lead bullets with action verbs and end with quantified results. "Reduced customer onboarding time 47% by redesigning the workflow."',
      'Show distinctive achievement: top 5%, valedictorian, scholarship, championship, published work. McKinsey screens for outliers.',
      'Demonstrate leadership beyond work: club president, sports captain, founded a non-profit. Pure work history is not enough.',
      'GPA matters at McKinsey for early-career hires. If you graduated with 3.7+ or first-class honours, list it.',
    ],
    recommendedTemplate: 'professional',
    metaTitle: 'McKinsey Resume Guide 2026 - One-Page Format & Tips | ResumeBuildz',
    metaDescription:
      'How to write a McKinsey resume that lands the interview. The one-page format, distinctive achievement bullets, recommended template, and 5 insider tips.',
  },
  {
    slug: 'goldman-sachs',
    name: 'Goldman Sachs',
    tier: 'Global',
    industry: 'Investment Banking',
    hq: 'New York, USA',
    description:
      'Goldman Sachs is one of the most selective investment banks in the world. Front-office roles in IBD, S&T, and AM receive over 250,000 applications per year for fewer than 3,000 spots. The screening bar is famously academic and quantitative.',
    hiringFocus:
      'Goldman screens hard on academic pedigree (school, GPA, ranking), quantitative ability, and demonstrated finance interest. Internships at competing banks, finance clubs, and CFA progress all weight heavily. The resume is a one-page, structured document.',
    keywords: [
      'financial modeling', 'DCF', 'LBO', 'M&A', 'capital markets', 'equity research',
      'Excel', 'Bloomberg', 'CFA', 'series 7', 'investment banking',
      'sales and trading', 'asset management', 'GPA', 'Dean\'s list',
    ],
    resumeTips: [
      'GPA is mandatory for early-career applicants. Goldman explicitly filters on GPA in their Workday system.',
      'List finance certifications: CFA Level I/II/III, FRM, Series 7, Series 63. They are filterable keywords.',
      'Show modeling skills explicitly: DCF, LBO, three-statement modeling, comps analysis.',
      'Mention finance club leadership, stock pitch competitions, or trading simulations. Pure GPA without context is not enough.',
      'Keep it one page, conservative formatting, no colors beyond grayscale. Goldman culture is traditional.',
    ],
    recommendedTemplate: 'classic',
    metaTitle: 'Goldman Sachs Resume Guide 2026 - IBD Templates & Tips | ResumeBuildz',
    metaDescription:
      'How to write a Goldman Sachs resume for IBD, S&T, or AM. GPA rules, finance keywords, recommended template, and 5 insider tips on what Goldman screens for.',
  },
  {
    slug: 'jp-morgan',
    name: 'JP Morgan Chase',
    tier: 'Global',
    industry: 'Banking',
    hq: 'New York, USA',
    description:
      'JP Morgan Chase is the largest bank in the United States with over 300,000 employees. It hires across investment banking, commercial banking, asset management, technology, and operations. The technology arm alone has 50,000+ engineers.',
    hiringFocus:
      'JP Morgan uses a hybrid screen: business roles get GPA + finance keyword filters, tech roles get programming language + system design filters. The bank is heavily Java-centric on the engineering side and equally heavy on Excel/Python on the analyst side.',
    keywords: [
      'Java', 'Spring Boot', 'Python', 'SQL', 'AWS', 'Kafka',
      'financial services', 'risk management', 'KYC', 'AML', 'Basel III',
      'derivatives', 'Excel', 'Bloomberg', 'CFA',
    ],
    resumeTips: [
      'For tech roles, lead with Java if you have it. JP Morgan is the largest Java shop in finance.',
      'For business roles, show finance certifications: CFA, FRM, MBA, Series 7. They are filterable in the ATS.',
      'Mention regulatory experience if you have it: KYC, AML, Basel III, Dodd-Frank, MiFID II. JPM hires heavily for compliance.',
      'Quantify client AUM or trade volume if applicable. "Supported $2B AUM portfolio" lands well.',
      'Use professional, conservative formatting. JPM prefers traditional resumes over creative layouts.',
    ],
    recommendedTemplate: 'corporate',
    metaTitle: 'JP Morgan Resume Guide 2026 - Banking & Tech Tips | ResumeBuildz',
    metaDescription:
      'How to write a JP Morgan resume for banking or tech roles. Java/finance keywords, conservative formatting, recommended template, and 5 insider tips.',
  },
  {
    slug: 'accenture',
    name: 'Accenture',
    tier: 'Global',
    industry: 'IT Consulting',
    hq: 'Dublin, Ireland',
    description:
      'Accenture is the largest IT services and consulting firm in the world with over 750,000 employees. It hires aggressively across technology, strategy, operations, and digital transformation. India alone accounts for over 300,000 Accenture employees.',
    hiringFocus:
      'Accenture screens primarily on technical certifications and platform expertise: SAP, Salesforce, ServiceNow, AWS, Azure, Workday. Resume keyword density matters a lot because the volume of applications forces aggressive ATS filtering.',
    keywords: [
      'SAP', 'Salesforce', 'ServiceNow', 'AWS', 'Azure', 'GCP',
      'Workday', 'Oracle', 'agile', 'scrum', 'transformation',
      'consulting', 'PMP', 'change management', 'business analyst',
    ],
    resumeTips: [
      'Certifications are gold at Accenture. List AWS, Azure, GCP, SAP, Salesforce, Workday, ServiceNow certs prominently.',
      'Show platform-specific project experience. "Implemented SAP S/4HANA for a Fortune 500 retailer" beats "ERP experience."',
      'Quantify deal/project size in users, dollars, or duration. Accenture engagements are large and recruiters expect scale.',
      'Use consulting vocabulary: stakeholder management, change management, business case, executive readout.',
      'Keep it ATS-clean. Accenture uses Workday and aggressively filters non-parseable formats.',
    ],
    recommendedTemplate: 'corporate',
    metaTitle: 'Accenture Resume Guide 2026 - Certifications & Tips | ResumeBuildz',
    metaDescription:
      'How to write an Accenture resume that beats Workday ATS. Certifications list, platform keywords, recommended template, and 5 tips for IT consulting hiring.',
  },

  // ───────────── INDIA ─────────────
  {
    slug: 'tcs',
    name: 'Tata Consultancy Services (TCS)',
    tier: 'India',
    industry: 'IT Services',
    hq: 'Mumbai, India',
    description:
      'TCS is the largest IT services company in India and one of the largest in the world with over 600,000 employees. It hires through campus placements, the TCS NQT (National Qualifier Test), and lateral recruitment. Freshers form the largest hiring channel.',
    hiringFocus:
      'TCS NQT scores, academic percentages (10th, 12th, graduation), and consistent academic record matter heavily for freshers. For laterals, TCS screens on technology stack, project size, and certifications. Resume keyword density and ATS friendliness are critical.',
    keywords: [
      'Java', 'Python', 'SQL', 'Spring Boot', 'Angular', 'React',
      'AWS', 'Azure', 'TCS NQT', 'agile', 'scrum',
      'banking domain', 'manual testing', 'Selenium', 'DevOps', 'CICD',
    ],
    resumeTips: [
      'Mention 10th, 12th, and graduation percentages clearly. TCS HR explicitly screens on academic consistency for freshers.',
      'List TCS NQT score if you appeared. It is a direct filter in the TCS hiring portal.',
      'For laterals, mention the domain you worked in (BFSI, retail, healthcare). TCS organizes hiring by vertical.',
      'Use clear technology stack lists. TCS recruiters batch-screen by skill and your top 5 must match the JD.',
      'Keep it 1-2 pages. Avoid graphics — TCS uses an internal ATS that often fails on creative layouts.',
    ],
    recommendedTemplate: 'classic',
    metaTitle: 'TCS Resume Guide 2026 - NQT, Freshers & Lateral Tips | ResumeBuildz',
    metaDescription:
      'How to write a TCS resume for freshers (NQT) and laterals. Academic percentage rules, tech keywords, recommended template, and 5 tips for the TCS hiring portal.',
  },
  {
    slug: 'infosys',
    name: 'Infosys',
    tier: 'India',
    industry: 'IT Services',
    hq: 'Bangalore, India',
    description:
      'Infosys is one of India\'s largest IT services companies with over 340,000 employees worldwide. It hires through the Infosys InfyTQ certification, Infosys HackWithInfy, campus placements, and lateral recruitment. The Mysore training campus trains tens of thousands of freshers each year.',
    hiringFocus:
      'Infosys hires heavily on InfyTQ certification, campus performance, and aptitude scores for freshers. For laterals, technology depth (full-stack JavaScript, Java, Salesforce, SAP) matters. Infosys is also one of the largest digital transformation hiring engines globally.',
    keywords: [
      'Java', 'Spring Boot', 'Angular', 'React', 'Node.js', 'Python',
      'InfyTQ', 'AWS', 'Azure', 'agile', 'DevOps',
      'Salesforce', 'SAP', 'data engineering', 'BFSI', 'API integration',
    ],
    resumeTips: [
      'List InfyTQ certification level if you have it. Infosys explicitly fast-tracks InfyTQ Pro certified candidates.',
      'Mention HackWithInfy participation/rank. It carries weight for early career hiring.',
      'Show full-stack experience clearly. Infosys preference is full-stack > pure backend or pure frontend.',
      'For laterals, mention Salesforce, SAP, AWS, Workday certifications. They are direct ATS filters.',
      'Use ATS-friendly format. Infosys uses Workday + an internal portal that fails on multi-column layouts.',
    ],
    recommendedTemplate: 'modern',
    metaTitle: 'Infosys Resume Guide 2026 - InfyTQ, Freshers & Tips | ResumeBuildz',
    metaDescription:
      'How to write an Infosys resume for freshers and laterals. InfyTQ rules, full-stack keywords, recommended template, and 5 tips for Infosys hiring.',
  },
  {
    slug: 'wipro',
    name: 'Wipro',
    tier: 'India',
    industry: 'IT Services',
    hq: 'Bangalore, India',
    description:
      'Wipro is one of India\'s top IT services firms with over 240,000 employees. It hires through the Wipro Elite NTH (National Talent Hunt), WILP (Wipro Infotech Learning Program), campus placements, and lateral recruitment.',
    hiringFocus:
      'Wipro NTH scores, 10/12/graduation percentages, and clear technology fit matter for freshers. For laterals, Wipro screens on platform depth (SAP, Oracle, Salesforce, ServiceNow) and domain experience.',
    keywords: [
      'Java', 'Python', 'SAP', 'Oracle', 'Salesforce', 'ServiceNow',
      'Wipro NTH', 'WILP', 'agile', 'AWS', 'Azure',
      'BFSI', 'healthcare domain', 'testing', 'automation', 'Selenium',
    ],
    resumeTips: [
      'List Wipro NTH score if applicable — it is a direct hiring filter.',
      'Show academic consistency (no gaps, no backlogs). Wipro is strict on this for freshers.',
      'For laterals, lead with domain expertise (BFSI, healthcare, retail) plus the platform you worked on.',
      'Mention any certifications: AWS, Azure, SAP, Salesforce. They are searchable keywords.',
      'Keep formatting plain text friendly — Wipro internal ATS struggles with visual layouts.',
    ],
    recommendedTemplate: 'classic',
    metaTitle: 'Wipro Resume Guide 2026 - NTH, Freshers & Tips | ResumeBuildz',
    metaDescription:
      'How to write a Wipro resume for freshers (NTH) and laterals. Academic rules, platform keywords, recommended template, and 5 tips for Wipro hiring.',
  },
  {
    slug: 'flipkart',
    name: 'Flipkart',
    tier: 'India',
    industry: 'E-commerce',
    hq: 'Bangalore, India',
    description:
      'Flipkart is India\'s largest home-grown e-commerce company, owned by Walmart since 2018. It hires across product, engineering, supply chain, marketing, and category management. The engineering bar is among the highest in Indian unicorns.',
    hiringFocus:
      'Flipkart engineering hiring is competitive — strong DSA, system design, and India-scale experience matter. For non-engineering, P&L ownership, GMV impact, and category leadership are the levers. Flipkart values builders who can operate at India consumer scale.',
    keywords: [
      'Java', 'Spring Boot', 'Microservices', 'Kafka', 'AWS', 'system design',
      'data structures', 'algorithms', 'GMV', 'P&L', 'category management',
      'supply chain', 'product management', 'A/B testing', 'mobile commerce',
    ],
    resumeTips: [
      'For engineering, show DSA strength via competitive coding profiles (LeetCode, Codeforces, Codechef). Flipkart screens explicitly for problem solving.',
      'Mention scale in numbers: monthly active users, transactions per day, GMV impact. Indian consumer scale is the differentiator.',
      'For PM/category roles, quantify GMV impact and category growth. "Grew electronics GMV 38% in 6 months" lands well.',
      'List relevant tech stack: Java + Spring + Microservices is the Flipkart spine.',
      'Use clean modern formatting. Flipkart is Bangalore startup-style and conservative templates feel out of place.',
    ],
    recommendedTemplate: 'modern',
    metaTitle: 'Flipkart Resume Guide 2026 - Engineering & PM Tips | ResumeBuildz',
    metaDescription:
      'How to write a Flipkart resume for engineering, PM, or category roles. DSA + scale keywords, GMV bullets, recommended template, and 5 insider tips.',
  },
  {
    slug: 'zomato',
    name: 'Zomato',
    tier: 'India',
    industry: 'Food Delivery',
    hq: 'Gurgaon, India',
    description:
      'Zomato is India\'s largest food delivery platform, serving over 15 million monthly active users. The company hires across engineering, product, growth, supply (delivery partners), and merchant operations.',
    hiringFocus:
      'Zomato has an aggressive, ownership-first culture. The hiring bar is high for engineering and product, with explicit emphasis on "founder mindset" and shipping speed. Generic resumes get filtered fast — every line should show ownership.',
    keywords: [
      'Go', 'Python', 'Node.js', 'React Native', 'AWS', 'system design',
      'growth marketing', 'P&L', 'A/B testing', 'GMV', 'unit economics',
      'two-sided marketplace', 'supply chain', 'food tech', 'mobile-first',
    ],
    resumeTips: [
      'Show ownership not contribution. "I led the rollout of X across 12 cities" beats "Worked on city expansion."',
      'For engineering, mention Go, Python, or React Native. These are core Zomato stacks.',
      'Quantify everything in unit economics: orders, AOV, contribution margin. Zomato is obsessed with unit economics post-IPO.',
      'For growth/marketing, show ROAS, CAC, retention numbers. Vague "marketing experience" is rejected.',
      'Use a modern minimalist template. Zomato culture is design-conscious.',
    ],
    recommendedTemplate: 'modern',
    metaTitle: 'Zomato Resume Guide 2026 - Engineering, Growth & Tips | ResumeBuildz',
    metaDescription:
      'How to write a Zomato resume that signals ownership. Tech + growth keywords, unit-economics bullets, recommended template, and 5 insider tips.',
  },
  {
    slug: 'swiggy',
    name: 'Swiggy',
    tier: 'India',
    industry: 'Food Delivery / Quick Commerce',
    hq: 'Bangalore, India',
    description:
      'Swiggy is one of India\'s largest food delivery and quick commerce companies, operating Swiggy Food, Instamart, Genie, and Dineout. It hires across engineering, product, growth, supply operations, and merchant teams.',
    hiringFocus:
      'Swiggy looks for builders who can ship fast in chaotic environments. Quick commerce (Instamart) hiring is especially aggressive on logistics, last-mile, and dark store operations expertise. Engineering bar is high on system design and India-scale problem solving.',
    keywords: [
      'Java', 'Go', 'Python', 'Kafka', 'Cassandra', 'AWS',
      'microservices', 'system design', 'last-mile delivery', 'quick commerce',
      'supply chain', 'P&L', 'growth marketing', 'A/B testing', 'unit economics',
    ],
    resumeTips: [
      'For engineering, show distributed systems and event-driven architecture experience. Swiggy is Kafka-heavy.',
      'For ops/supply, quantify deliveries per hour, dark store throughput, last-mile cost reductions.',
      'Show India-scale fluency: "Handled peak load of 800 orders/min during IPL final."',
      'Mention any quick commerce or hyperlocal experience — Instamart is Swiggy\'s fastest growth bet.',
      'Use clean, modern formatting. Swiggy is design-conscious and conservative templates feel off.',
    ],
    recommendedTemplate: 'modern',
    metaTitle: 'Swiggy Resume Guide 2026 - Engineering, Ops & Tips | ResumeBuildz',
    metaDescription:
      'How to write a Swiggy resume for engineering, growth, or supply roles. Quick commerce keywords, scale bullets, recommended template, and 5 insider tips.',
  },
  {
    slug: 'zoho',
    name: 'Zoho',
    tier: 'India',
    industry: 'SaaS',
    hq: 'Chennai, India',
    description:
      'Zoho is one of India\'s largest privately-held SaaS companies with over 100,000 customers across the world. Famously bootstrapped, profitable, and headquartered in Chennai with a strong rural India hiring program (Zoho Schools).',
    hiringFocus:
      'Zoho is unique: it hires heavily through Zoho Schools (12th pass directly), values long tenure, and does not optimize for elite degrees. Technical depth in C, C++, Java, and product engineering matters more than pedigree. Resumes need to show problem-solving substance.',
    keywords: [
      'C', 'C++', 'Java', 'JavaScript', 'Go', 'PostgreSQL',
      'MySQL', 'SaaS', 'microservices', 'API design', 'Linux',
      'Zoho One', 'Zoho CRM', 'product engineering', 'self-taught',
    ],
    resumeTips: [
      'Pedigree matters less. Zoho hires based on demonstrated skill — list projects, GitHub repos, and side work prominently.',
      'For engineering, lead with C/C++/Java if you have them. Zoho is an old-school engineering culture.',
      'Mention any Zoho product familiarity (CRM, Books, Desk). Internal candidates and product-aware candidates score higher.',
      'Show long-form projects and depth, not breadth. Zoho rewards builders who go deep.',
      'Keep the resume plain and content-focused. Visual flair is not valued.',
    ],
    recommendedTemplate: 'classic',
    metaTitle: 'Zoho Resume Guide 2026 - Engineering & Self-Taught Tips | ResumeBuildz',
    metaDescription:
      'How to write a Zoho resume that wins on substance. C/C++/Java keywords, project-first format, recommended template, and 5 tips for Zoho hiring.',
  },
  {
    slug: 'byju',
    name: "BYJU'S",
    tier: 'India',
    industry: 'EdTech',
    hq: 'Bangalore, India',
    description:
      "BYJU'S is one of India's largest education technology companies, owning brands like BYJU'S, Aakash, WhiteHat Jr, Toppr, and Great Learning. It hires across content, sales, engineering, product, and operations.",
    hiringFocus:
      "BYJU'S sales and BD roles dominate hiring volume. The screen is heavy on communication, target achievement, and resilience. For engineering and content roles, the bar is more conventional. Sales roles weight English communication and revenue numbers very heavily.",
    keywords: [
      'sales', 'inside sales', 'BD', 'target achievement', 'lead conversion',
      'CRM', 'Salesforce', 'edtech', 'curriculum design', 'content development',
      'React', 'Node.js', 'Python', 'mobile-first', 'product analytics',
    ],
    resumeTips: [
      'For sales roles, lead with revenue numbers: "Closed ₹1.2Cr revenue in 6 months at 35% conversion." Exact numbers matter more than titles.',
      'Show consistency: monthly target hit rate, average deal size, lead-to-close cycle.',
      'For content/teaching roles, mention subject expertise, curriculum design experience, and any teaching certifications.',
      "For engineering roles, BYJU'S is React + Node + Python heavy. Mention these explicitly.",
      'Use clean professional formatting. BYJU\'S HR processes high volume and ATS-friendly resumes get prioritized.',
    ],
    recommendedTemplate: 'professional',
    metaTitle: "BYJU'S Resume Guide 2026 - Sales, Tech & Tips | ResumeBuildz",
    metaDescription:
      "How to write a BYJU'S resume for sales, BD, content, or tech roles. Revenue bullets, recommended template, and 5 insider tips for BYJU'S hiring.",
  },
  {
    slug: 'phonepe',
    name: 'PhonePe',
    tier: 'India',
    industry: 'Fintech',
    hq: 'Bangalore, India',
    description:
      'PhonePe is India\'s largest UPI payments company with over 500 million users. It hires across engineering, product, growth, partnerships, and merchant operations. Now expanding into insurance, lending, and stockbroking.',
    hiringFocus:
      'PhonePe engineering bar is high on distributed systems, payments domain, and India-scale reliability. For product/business roles, fintech domain knowledge and regulatory awareness (RBI, NPCI) are differentiators. Walmart-owned but operates with startup velocity.',
    keywords: [
      'Java', 'Spring Boot', 'Microservices', 'Kafka', 'Cassandra', 'system design',
      'distributed systems', 'UPI', 'payments', 'NPCI', 'RBI',
      'fintech', 'product management', 'A/B testing', 'transaction processing',
    ],
    resumeTips: [
      'For engineering, mention payments or fintech experience explicitly. PhonePe operates at TPS scales few companies match.',
      'Show reliability work: SLOs, observability, on-call rotations. PhonePe values resilient systems thinking.',
      'For product roles, mention any RBI/NPCI/regulatory knowledge. Fintech regulations are a moat.',
      'Quantify in TPS, success rate, latency P99 — engineering metrics that map to PhonePe\'s scale.',
      'Use modern professional formatting; PhonePe culture is fast-paced but professional.',
    ],
    recommendedTemplate: 'modern',
    metaTitle: 'PhonePe Resume Guide 2026 - Fintech, Engineering & Tips | ResumeBuildz',
    metaDescription:
      'How to write a PhonePe resume for engineering, PM, or fintech roles. UPI/payments keywords, scale bullets, recommended template, and 5 insider tips.',
  },
  {
    slug: 'razorpay',
    name: 'Razorpay',
    tier: 'India',
    industry: 'Fintech',
    hq: 'Bangalore, India',
    description:
      'Razorpay is one of India\'s leading payment gateway companies serving over 8 million businesses. It has expanded into RazorpayX (neobanking), Razorpay Capital (lending), and Razorpay Payroll. The hiring bar is among the highest in Indian fintech.',
    hiringFocus:
      'Razorpay engineering hiring weighs heavy on distributed systems, system design, and DSA. The product team is small but elite — every PM hire goes through 5-6 rounds. Strong fintech domain knowledge is a major differentiator across all roles.',
    keywords: [
      'Go', 'Java', 'Python', 'Microservices', 'Kafka', 'AWS',
      'system design', 'data structures', 'algorithms', 'payments', 'API design',
      'fintech', 'product management', 'KYC', 'PCI DSS', 'reconciliation',
    ],
    resumeTips: [
      'Engineering: show Go or Java backend depth. Razorpay is a Go-first company.',
      'API design experience matters. "Designed and shipped REST APIs serving 8M merchants" is the kind of bullet that lands.',
      'Show fintech domain knowledge: KYC, PCI DSS, settlement reconciliation, dispute handling.',
      'For PM roles, ship velocity and merchant-impact metrics matter. "Cut merchant onboarding from 7 days to 4 hours."',
      'Use modern professional formatting; Razorpay is Bangalore-style and design-aware.',
    ],
    recommendedTemplate: 'modern',
    metaTitle: 'Razorpay Resume Guide 2026 - Fintech Engineering & Tips | ResumeBuildz',
    metaDescription:
      'How to write a Razorpay resume for engineering, PM, or fintech roles. Go/payments keywords, API bullets, recommended template, and 5 insider tips.',
  },
  {
    slug: 'freshworks',
    name: 'Freshworks',
    tier: 'India',
    industry: 'SaaS',
    hq: 'Chennai, India',
    description:
      'Freshworks is a global SaaS company headquartered in Chennai (NASDAQ: FRSH) serving over 60,000 customers worldwide. It hires across engineering, product, sales (especially inside sales), customer success, and marketing.',
    hiringFocus:
      'Freshworks operates internationally — English communication and global market awareness matter. Engineering bar is solid on Ruby on Rails, Java, and React. Sales hiring focuses heavily on global SaaS quotas and inside sales experience.',
    keywords: [
      'Ruby on Rails', 'Java', 'React', 'Node.js', 'PostgreSQL', 'AWS',
      'SaaS', 'inside sales', 'customer success', 'product management',
      'CRM', 'helpdesk', 'NPS', 'churn', 'ARR',
    ],
    resumeTips: [
      'For engineering, mention Ruby on Rails if you have it. Freshworks Freshdesk and Freshsales are Rails-heavy.',
      'For sales, show ARR/MRR and global quota attainment. Freshworks sells worldwide and global experience is a plus.',
      'For customer success, quantify NPS, churn reduction, and expansion revenue. CS is a serious team here.',
      'Mention SaaS metrics fluency: ARR, NRR, CAC, payback period, ARPU.',
      'Use modern professional formatting. Freshworks is a NASDAQ-listed company and the resume should feel polished.',
    ],
    recommendedTemplate: 'professional',
    metaTitle: 'Freshworks Resume Guide 2026 - SaaS, Engineering & Tips | ResumeBuildz',
    metaDescription:
      'How to write a Freshworks resume for engineering, sales, or CS roles. SaaS keywords, ARR bullets, recommended template, and 5 insider tips for Freshworks hiring.',
  },
  {
    slug: 'ola',
    name: 'Ola',
    tier: 'India',
    industry: 'Mobility / EV',
    hq: 'Bangalore, India',
    description:
      'Ola is one of India\'s largest mobility companies, operating ride-hailing, Ola Electric (electric two-wheelers), and Krutrim (AI). Hiring spans engineering, product, supply chain, manufacturing (for EV), and AI research.',
    hiringFocus:
      'Ola engineering culture is fast-paced, India-scale focused, and increasingly AI-heavy with Krutrim. Ola Electric hires heavily for hardware, manufacturing, and supply chain. Ride-hailing hires for ops, supply, and growth.',
    keywords: [
      'Java', 'Go', 'Python', 'Kafka', 'system design', 'distributed systems',
      'machine learning', 'PyTorch', 'TensorFlow', 'EV', 'manufacturing',
      'supply chain', 'product management', 'two-sided marketplace', 'mobility',
    ],
    resumeTips: [
      'For Krutrim/AI roles, lead with PyTorch, transformer experience, and any LLM fine-tuning work.',
      'For Ola Electric, mention EV powertrain, BMS, motor control, or manufacturing experience explicitly.',
      'For ride-hailing engineering, show two-sided marketplace and matching algorithm experience.',
      'Quantify scale: rides per day, drivers managed, cities served. India consumer scale is the moat.',
      'Use modern professional formatting; Ola is fast-paced startup-style.',
    ],
    recommendedTemplate: 'modern',
    metaTitle: 'Ola Resume Guide 2026 - Mobility, EV & AI Tips | ResumeBuildz',
    metaDescription:
      'How to write an Ola resume for ride-hailing, Ola Electric, or Krutrim AI roles. EV/AI/mobility keywords, recommended template, and 5 insider tips.',
  },
];

export function getCompanyBySlug(slug: string): CompanyEntry | undefined {
  return COMPANIES.find((c) => c.slug === slug);
}

export function getCompaniesByTier(tier: CompanyTier): CompanyEntry[] {
  return COMPANIES.filter((c) => c.tier === tier);
}

export function getAllCompanySlugs(): string[] {
  return COMPANIES.map((c) => c.slug);
}
