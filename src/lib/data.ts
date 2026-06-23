export const META = {
  name: 'Parshvi Jain',
  title: 'Parshvi Jain | Applied AI Engineer',
  description:
    'Applied AI engineer. IEEE-published renewable energy forecasting (2.2% MAPE). XAI Forensics live demo. Backend and ML engineer.',
  url: 'https://parshvijain.vercel.app',
  email: 'parshvijain1508@gmail.com',
  linkedin: 'https://linkedin.com/in/jainparshvi',
  github: 'https://github.com/parshvi1508',
  calUrl: process.env.NEXT_PUBLIC_CAL_URL ?? 'https://cal.com/parshvi-jain',
  xaiApiUrl: process.env.NEXT_PUBLIC_XAI_API_URL ?? '',
}

export const EXPERIENCE = [
  {
    company: 'Trurism',
    role: 'Backend Developer Intern',
    period: 'Oct 2025 - Jan 2026',
    location: 'Remote, India',
    current: false,
    bullets: [
      'Sole backend engineer on a live travel platform: built a 20-module system with 50+ APIs powering payments, bookings, and AI-driven recommendations for real B2B clients.',
      'Architected FastAPI backend with PostgreSQL, Alembic, and Redis; designed JWT/RBAC auth, rate limiting, and multi-tenant white-label architecture for isolated B2B2C operations across travel verticals.',
      'Built the ML orchestration layer connecting model inference to booking and recommendation flows; integrated XML.Agency API for live flight and hotel data and Razorpay HMAC-SHA256 webhooks for payments.',
    ],
    stack: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Azure'],
  },
  {
    company: 'MedEvidences AI',
    role: 'Backend Developer Intern',
    period: 'Apr 2025 - Aug 2025',
    location: 'Remote, USA',
    current: false,
    bullets: [
      'Rebuilt a US healthcare-AI platform backend: migrated Flask monolith to async FastAPI, rewrote 30+ REST APIs with OAuth2 (Google, Microsoft) sign-in and medical-provider (NPI) verification, cutting response times by 25%.',
      'Led zero-downtime database migration from Azure to AWS RDS using async SQLAlchemy; built dual-layer session and chat memory architecture so the AI holds context across a full conversation.',
    ],
    stack: ['FastAPI', 'AWS RDS', 'OAuth2', 'Docker', 'PostgreSQL'],
  },
  {
    company: 'NextHive',
    role: 'Freelance Frontend Developer',
    period: 'Mar 2025 - Apr 2025',
    location: 'Remote, India',
    current: false,
    bullets: [
      'Built and designed the frontend of InstaCaption using React, TailwindCSS, and Framer Motion; improved features, page speed, SEO, and accessibility.',
    ],
    stack: ['React', 'TailwindCSS', 'Framer Motion'],
  },
] as const

export const EDUCATION = [
  {
    institution: 'ABES Engineering College, Ghaziabad',
    degree: 'B.Tech in Computer Science',
    period: '2023 - Expected 2027',
    detail: 'CGPA 8.48 / 10',
    location: 'Ghaziabad, India',
    prestige: false,
    coursework: ['Data Structures & Algorithms', 'OOP & Design Patterns', 'Database Systems', 'Computer Networks', 'Operating Systems', 'Software Engineering'],
    highlights: ['IEEE 2025 published researcher', 'ACM-W Vice Chair & ML research wing founder'],
  },
  {
    institution: 'Indian Institute of Technology, Madras (Online)',
    degree: 'BS in Data Science and Applications',
    period: '2024 - Expected 2028',
    detail: '',
    location: 'Chennai, India',
    prestige: true,
    coursework: ['Statistics for Data Science', 'Machine Learning Foundations', 'Deep Learning', 'Business Data Management', 'Python for Data Science', 'Computational Thinking'],
    highlights: ['IIT Madras credential alongside B.Tech CS', 'Industry-aligned data science curriculum'],
  },
] as const

export interface Project {
  slug: string
  name: string
  tagline: string
  description: string
  stack: string[]
  github: string
  caseStudy?: string
  demo?: string
  vercelDemo?: string
  paper?: string
  badge?: string
  hasLiveDemo?: boolean
  metric?: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'xai-forensics',
    name: 'XAI Forensics',
    tagline:
      'Shows why a transformer made a decision, not just what it decided. Three-layer forensic inspection with a live demo.',
    description:
      'A 3-panel forensic system using LIME token attribution (300 perturbation samples), greedy counterfactual removal, and dual-model divergence scoring across DistilBERT-SST2 and Twitter-RoBERTa. Models chosen for domain mismatch so disagreement reflects genuine linguistic ambiguity. Attention weights rejected as explanations per Jain and Wallace 2019. Dockerized FastAPI backend with 4 endpoints and per-request latency tracking; Next.js dashboard on Vercel.',
    stack: ['LIME', 'DistilBERT', 'PyTorch', 'FastAPI', 'HuggingFace', 'Next.js', 'Docker'],
    github: 'https://github.com/parshvi1508/xai-forensics',
    caseStudy: '/work/xai-forensics',
    vercelDemo: 'https://xai-forensics.vercel.app',
    metric: '500ms per-request LIME attribution',
  },
  {
    slug: 'renewable-forecasting',
    name: 'Pan-India Renewable Energy Forecasting',
    tagline:
      'India&apos;s grid needs to know tomorrow&apos;s sun and wind together, not separately. This model does both - 2.2% error, IEEE 2025.',
    metric: '2.2% MAPE | IEEE 2025',
    description:
      '4-layer LSTM (13K params) with 60-day sliding windows, dropout-based uncertainty quantification (95% prediction intervals). Jointly forecasts energy consumption and renewable generation across 40+ states. Outperforms ARIMA (4.8%), linear regression (6.1%), and exponential smoothing (5.3%). RMSE 0.15 GWh (p < 0.01). Automated ingestion of 96,360+ hourly records from AWS S3. Sub-1s CPU inference. UN SDG 7 and 13 aligned.',
    stack: ['TensorFlow', 'LSTM', 'scikit-learn', 'AWS S3', 'Python'],
    github: 'https://github.com/parshvi1508/renewable-forecasting',
    caseStudy: '/work/renewable-forecasting',
    badge: 'IEEE 2025',
  },
  {
    slug: 'lumen-crm',
    name: 'Lumen: Verifiable AI CRM',
    tagline:
      'Every AI recommendation ships with the numbers it cites. Verifiable AI for D2C brands, with reasoning shown before you act.',
    description:
      'AI-native CRM for D2C brands built as two decoupled FastAPI services that communicate over HTTP only. crm_api handles ingest, segments, campaigns, AI endpoints, and receipt callbacks. channel_service stubs messaging delivery and calls back into the CRM. Every AI output ships with the grounded data behind it, and a plain-English-to-customer-segment builder shows its reasoning so non-technical users can verify the model. 17 test suites, schema-validated LLM outputs, and retry-on-failure with provider fallback.',
    stack: ['FastAPI', 'Next.js', 'PostgreSQL', 'Docker', 'LLM'],
    github: 'https://github.com/parshvi1508/LUMEN_Backend',
    demo: 'https://lumencrm-frontend.vercel.app/dashboard',
    caseStudy: '/work/lumen-crm',
    metric: '17 test suites | schema-validated LLM outputs',
  },
  {
    slug: 'data-analyst-agent',
    name: 'Data Analyst Agent API',
    tagline:
      'Drop any file, get a structured analysis back. Gemini 2.5 primary with OpenRouter fallback - it keeps running even when the model goes down.',
    description:
      'Automated analysis API with a 3-stage Extract-Analyze-Format pipeline supporting 7 file formats. Semaphore-based concurrency (max 3 parallel requests), sandboxed Docker execution with UUID isolation per request. 4-attempt exponential backoff: Gemini 2.5-Flash primary with OpenRouter fallback so the system keeps serving even when the primary model endpoint goes down.',
    stack: ['FastAPI', 'Gemini 2.5', 'Docker', 'OpenRouter', 'Python'],
    github: 'https://github.com/parshvi1508/data-analyst-agent',
    metric: '7 formats | 3 parallel max | auto fallback',
  },
  {
    slug: 'elearning-ism',
    name: 'E-Learning Intelligent System',
    tagline:
      'Three models watching one student: one flags if they&apos;re stuck, one predicts if they&apos;ll drop out, one recommends what to study next.',
    description:
      'Complete Intelligent System Model (ISM) for e-learning platforms. Anomaly detection uses Isolation Forest combined with Dempster-Shafer Theory for evidence combination. Dropout prediction runs on Random Forest. Hybrid recommendation engine combines content-based, collaborative, and rule-based approaches to surface personalized study paths.',
    stack: ['Python', 'Isolation Forest', 'Random Forest', 'scikit-learn', 'Dempster-Shafer'],
    github: 'https://github.com/parshvi1508/Anomalies_ML',
    demo: 'https://anomalies-ml-bgdn.vercel.app/',
    metric: 'Isolation Forest + Dempster-Shafer fusion',
  },
  {
    slug: 'studyroom-syncora',
    name: 'Syncora: Collaborative Study Rooms',
    tagline:
      'Shared study rooms where everyone sees the same state. Built so the session never splits - the server owns the truth, not the browser.',
    description:
      'Collaborative study platform with realtime chat and server-authoritative session tracking. Presence awareness shows who is online and active. The server owns session truth so no client can create split-brain room state. Built for groups that need a shared, persistent study space without a cluttered tool.',
    stack: ['Next.js', 'WebSockets', 'PostgreSQL', 'TypeScript'],
    github: 'https://github.com/parshvi1508/studyroom',
    metric: 'Server-authoritative | no client desync',
    demo: 'https://studyroom-syncora.vercel.app/',
  },
]

export const ACHIEVEMENTS = [
  {
    label: 'IEEE Conference 2025',
    detail: 'Published and presented pan-India renewable energy forecasting research (2.2% MAPE).',
    type: 'publication',
  },
  {
    label: 'NIT Agartala 2026',
    detail: 'First-author presentation: "AI Interpretation by Women Across Generations".',
    type: 'conference',
  },
  {
    label: 'Top 20 Worldwide',
    detail: 'Switch Case Competition 2024, ACM-W Global.',
    type: 'competition',
  },
  {
    label: 'ACM-W Global Newsletter',
    detail: 'First student chapter ever featured in the global newsletter.',
    type: 'recognition',
  },
  {
    label: 'CodeChef Starters - Top 100 globally',
    detail: 'Consistent top-100 finishes across three consecutive CodeChef Starters rounds (2024): Rank 73, 144, 115. Competing against 10,000+ participants per round.',
    type: 'competition',
  },
  {
    label: 'Acadence SDP: Prototype Forge',
    detail: 'Stage 1 of Acadence Research Track (Jan 2026). Built and deployed core modules into an end-to-end runnable multimodal pipeline from scratch in one month.',
    type: 'recognition',
  },
  {
    label: 'Acadence SDP: Advanced Bimodal Scaling',
    detail: 'Stage 2 (May 2026). Extended the Stage 1 codebase to bimodal fusion (Text+Audio and Text+Video), ran ablation studies to tune modality weights, and benchmarked gains against Stage 1 baselines.',
    type: 'recognition',
  },
] as const

export const POSITIONS = [
  {
    role: 'Vice Chair (prev. Event Coordinator)',
    org: 'ABES ACM-W',
    period: 'January 2024 - April 2026',
    bullets: [
      'Started as Event Coordinator (Jan 2024): ran Hour of Code sessions for 250+ school girls on cyberfeminism, digital confidence, and computing as a tool for change.',
      'Promoted to Vice Chair (Apr 2025): founded the chapter research wing and led its ML team; drove recognition as Most Active Chapter in ACM India Region 2.',
      'First student chapter ever featured in the ACM-W Global Newsletter.',
      'Panel member at ACM India Region 2 Summit 2025, representing the only women-focused student chapter delegation.',
      'Co-led Smart ABES Hackathon 2.0; organized Blind Coding: Crown Edition with 100+ participants on Codeforces.',
      'Mentored 550+ school girls across Hour of Code and cyberfeminism workshops.',
    ],
  },
  {
    role: 'Core Member',
    org: 'Enigma Programming Club, ABESEC',
    period: '2023 - 2024',
    bullets: [
      'Built competitive programming skills through the club: algorithms, data structures, and contest strategy.',
      'Co-organized Battle of Brains 2024, the club\'s flagship legacy event, handling logistics and problem-setting coordination.',
    ],
  },
  {
    role: 'Core Member',
    org: 'Datalex, IIT Madras BS',
    period: '2024 - Present',
    bullets: [
      'Core member of Datalex, the Data and Law club at Pichavaram (IIT Madras BS student body).',
      'Responsible for external communication and end-to-end event organization for club activities at the intersection of data science and legal frameworks.',
    ],
  },
] as const

export const CERTIFICATIONS = [
  'Introduction to Machine Learning',
  'AI for Impact',
  'GenAI Application Trends and Best Practices',
  'ACM India Region 2 Summit',
  'Switch Case Competition',
] as const

export const NOW_CONTENT = {
  research: {
    label: 'Research',
    content:
      'Multimodal sentiment analysis: novel fusion architecture combining visual and textual modalities to improve prediction on ambiguous inputs where unimodal models consistently disagree. Under research collaboration. Public writeup planned once results clear peer review.',
  },
  shipping: {
    label: 'Shipping',
    content:
      'Building a personal XAI project: a tool that explains its own reasoning as it goes, not after the fact. Separately, the Trurism , cutting irrelevant recommendations before they reach the engine.',
  },
  reading: {
    label: 'Reading',
    content:
      '"REALM: Retrieval-Augmented Language Model Pre-Training" (Guu et al., 2020). Thinking through how retrieval-augmented inference applies to domain-specific explainability and whether retrieved examples can ground counterfactual generation in XAI systems.',
  },
}

export const CASE_STUDIES = {
  'xai-forensics': {
    tagline: 'LIME + counterfactuals + dual-model divergence: a forensic toolkit for transformer decisions.',
    problem:
      'Most deployed sentiment classifiers are black boxes. When a model flags text as negative in a high-stakes context (content moderation, finance, healthcare) there is no artifact explaining why. Attention maps are the default fallback, but attention is not a faithful explanation of model behavior (Jain and Wallace, 2019). The field needed a per-request forensic tool that goes beyond attention.',
    approach:
      'Three-layer explanation stack: (1) LIME perturbation with 300 samples to surface token-level attributions per request without model internals, (2) greedy counterfactual removal to identify which tokens flip the prediction when dropped, (3) dual-model comparison between DistilBERT-SST2 and Twitter-RoBERTa to expose linguistic ambiguity. Models were chosen for domain mismatch by design: when they disagree, it reflects genuine linguistic ambiguity, not noise. FastAPI serves all three as a single JSON response. Frontend renders token attributions with intensity-coded highlighting, counterfactual side-by-side view, and divergence confidence bars.',
    decisions: [
      {
        title: 'LIME over SHAP for per-request forensics',
        content:
          'SHAP requires model internals or a large background dataset to compute Shapley values. For a forensic tool running on arbitrary inputs at request time, LIME fits a local linear model around each input using perturbations, works as a black box, returns in under 500ms on CPU. SHAP would require TreeExplainer (model-specific) or KernelSHAP (slow). Fidelity tradeoff is acceptable: the goal is interpretable attribution per request, not exact gradient attribution.',
      },
      {
        title: 'DistilBERT-SST2 and Twitter-RoBERTa: domain mismatch by design',
        content:
          'SST2 is trained on movie reviews; Twitter-RoBERTa on social media. For most professional writing, they agree. When they diverge significantly, the input sits in a linguistic register neither training distribution covers well: sarcasm, domain jargon, culturally specific idioms. That divergence is a signal, not a failure. Surfacing it gives users a calibrated uncertainty signal without a separate calibration layer.',
      },
      {
        title: 'Attention weights rejected',
        content:
          'Jain and Wallace (2019) showed attention weights and model outputs are often decoupled: you can scramble attention and get the same prediction. Wiegreffe and Pinter (2019) partially contested this but acknowledged dependency on architecture and task. Given the ambiguity, LIME perturbation is the safer claim: it measures what actually changes the output, not what the model looks at internally.',
      },
    ],
    results: [
      'Per-request LIME attribution under 500ms on CPU (FastAPI and HuggingFace pipeline)',
      'Counterfactual flip detection across all tokens in a single pass',
      'Cross-model divergence score as calibrated uncertainty signal',
      'Decoupled architecture: Dockerized FastAPI backend (4 endpoints) and Next.js dashboard on Vercel',
      'Live demo handling real user inputs with skeleton loading and per-request latency display',
    ],
    wouldDoDifferently: [
      'Add integrated gradients as a third explanation method so users can compare LIME vs gradient-based attribution side-by-side. More useful for model debugging, not just decision inspection.',
      'Cache LIME results for identical inputs: every request currently reruns perturbation. A Redis TTL cache would cut latency ~80% for the demo prefill.',
      'Write a proper evaluation harness comparing LIME faithfulness (sufficiency and comprehensiveness) across 100 examples rather than qualitative spot checks.',
    ],
    stack: ['Python', 'FastAPI', 'PyTorch', 'HuggingFace', 'LIME', 'DistilBERT', 'RoBERTa', 'Next.js', 'Docker'],
    github: 'https://github.com/parshvi1508/xai-forensics',
    demo: '/work/xai-forensics',
  },
  'renewable-forecasting': {
    tagline: '2.2% MAPE on 96,360 hourly records across 40+ Indian states. Outperforms ARIMA (4.8%). IEEE 2025.',
    problem:
      "India's renewable energy grid spans radically different climatic zones: Rajasthan desert solar, Kerala monsoon, Himalayan wind corridors. Existing forecasting models addressed only consumption or generation, not both jointly. National-level aggregation masked state-level heterogeneity where grid operators actually make decisions.",
    approach:
      '4-layer LSTM (13K parameters) with 60-day sliding windows and dropout-based uncertainty quantification (95% prediction intervals). Jointly forecasts energy consumption and renewable generation: prior work addresses only one or the other. Automated ingestion of 96,360+ hourly records from AWS S3 via boto3. Sub-1s CPU inference. Evaluated on MAPE (the operationally correct metric for grid planning) rather than MAE/RMSE, which reward smoothing over peaks.',
    decisions: [
      {
        title: 'MAPE as primary metric',
        content:
          'Grid operators care about percentage error: a 100MW miss on a 1GW forecast differs from the same miss on a 150MW forecast. MAPE captures this; MAE does not. The 2.2% MAPE is on a held-out test set, stratified by state to prevent data leakage across climate zones.',
      },
      {
        title: 'Joint consumption and generation forecasting',
        content:
          'Prior work addresses only consumption or generation separately. Joint forecasting captures the coupling between demand and renewable availability, which is critical for dispatch decisions where net load (consumption minus generation) is what matters. This is the methodological gap the paper addresses.',
      },
      {
        title: 'LSTM over modern time-series architectures',
        content:
          'PatchTST, iTransformer, and Mamba-based models achieve stronger benchmark numbers, but they are not the right fit here. The target deployment is India\'s state and central grid operators -government infrastructure running on constrained hardware with strict change-management processes. A 4-layer LSTM with 13K parameters runs sub-1s inference on CPU, requires no GPU, and integrates with existing TensorFlow toolchains already present in power-sector deployments. A heavy transformer architecture would improve MAPE marginally but create an adoption blocker: no procurement team approves a model that needs new hardware. The goal was a model grid operators would actually use, not the highest number on a leaderboard.',
      },
      {
        title: 'Hourly granularity over daily averages',
        content:
          'Daily averages are sufficient for annual planning, not intraday dispatch. Hourly records required handling missing data from sensor outages: forward-fill bounded at 3 hours, then flagged as unreliable and excluded from evaluation.',
      },
    ],
    results: [
      '2.2% MAPE on held-out test (96,360 hourly records): outperforms ARIMA (4.8%), linear regression (6.1%), exponential smoothing (5.3%)',
      'RMSE = 0.15 GWh (p < 0.01)',
      '40+ Indian states covered, climate-zone stratified evaluation',
      'Sub-1s CPU inference',
      'Published at IEEE Conference 2025',
    ],
    wouldDoDifferently: [
      'Add NWP (Numerical Weather Prediction) data as a leading indicator. Current model is reactive: integrating weather forecasts would make it predictive.',
      'Publish the cleaned 96K-record dataset. The cleaning pipeline required significant work; releasing it would benefit other researchers.',
      'Evaluate on probabilistic metrics (CRPS, pinball loss) in addition to point-forecast MAPE, to give grid operators confidence intervals, not just point estimates.',
    ],
    stack: ['Python', 'TensorFlow', 'LSTM', 'scikit-learn', 'AWS S3', 'boto3'],
    github: 'https://github.com/parshvi1508/renewable-forecasting',
    paper: 'https://ieeexplore.ieee.org',
  },
  trurism: {
    tagline: '20-module FastAPI backend. Multi-tenant white-label. JWT/RBAC. 50+ REST endpoints. Live in production.',
    problem:
      'Travel platforms built for single-tenant use cannot serve white-label resellers without duplicating infrastructure. No tenant isolation at the data layer, no per-tenant rate limiting, and no webhook infrastructure for payment providers: multi-tenant expansion required a full rebuild.',
    approach:
      '20-module FastAPI backend with PostgreSQL, Alembic, Redis. Tenant isolation at PostgreSQL row level using discriminator columns and middleware that injects tenant context from JWT. Razorpay HMAC-SHA256 webhook validation with idempotency keys. RBAC enforced at route level via dependency injection. ML orchestration layer routes user preference signals through a ranker before the recommendation engine. Shipped via Azure CI/CD with Docker and Gunicorn.',
    decisions: [
      {
        title: 'Row-level tenant isolation over schema-per-tenant',
        content:
          'Schema-per-tenant is operationally expensive: migrations must run per tenant, connection pooling is harder. Row-level isolation with a tenant_id discriminator is simpler to migrate, supports shared indexes, scales to hundreds of tenants without schema proliferation.',
      },
      {
        title: 'HMAC webhook validation before database write',
        content:
          'Razorpay sends a signature with every webhook. Validating before any database operation prevents replay attacks and ensures idempotency keys are only committed for legitimate events.',
      },
      {
        title: 'Dependency injection for RBAC over middleware',
        content:
          "Global RBAC middleware applies the same check to every route, requiring exceptions for public endpoints. DI-based RBAC (FastAPI's Depends()) applies checks only where declared, makes permissions explicit in the route signature, and is easier to test in isolation.",
      },
    ],
    results: [
      '50+ REST endpoints in production',
      '20-module FastAPI architecture',
      'Multi-tenant white-label with row-level PostgreSQL isolation',
      'Razorpay HMAC-SHA256 webhook integration with idempotency',
      'ML ranker for travel personalization live in production',
      'Azure CI/CD via Docker and Gunicorn',
    ],
    wouldDoDifferently: [
      'Add OpenTelemetry tracing from day one. Debugging production issues across 20 modules with only logs is slow: distributed traces would save hours.',
      'Use asyncpg throughout rather than mixing sync and async database calls. Some synchronous DB calls inside async routes block the event loop under load.',
      'Write contract tests for the webhook integration. Current tests mock Razorpay responses: any schema change on their side fails silently in production.',
    ],
    stack: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Azure', 'JWT', 'Razorpay', 'Alembic'],
    github: 'https://github.com/parshvi1508',
  },
} as const

export const MASCOT_MESSAGES = [
  'Ask me anything about Parshvi',
  'IEEE 2025: published paper inside',
  '2.2% MAPE on 96K records',
  'XAI Forensics: see why AI decides',
  'Click to start a conversation',
]

export const DEMO_PREFILL = 'The movie was a complete mess but somehow I loved it.'

export const CHATBOT_SYSTEM_PROMPT = `You are the portfolio assistant for Parshvi Jain. Answer questions about Parshvi concisely and accurately based on the data below. Never make up information. Keep answers to 2-4 sentences unless the user asks for detail.

ABOUT PARSHVI:
Applied AI and ML engineer, based in Ghaziabad, India. Pursuing B.Tech CSE at ABES Engineering College (CGPA 8.48/10, 2023-2027) and BS in Data Science and Applications at IIT Madras Online (2024-2028). Open to Applied AI Engineer, Founding ML Engineer, and Forward Deployed Engineer roles globally.

Contact: parshvijain1508@gmail.com | linkedin.com/in/jainparshvi | github.com/parshvi1508
Languages: English (professional working), Hindi (native)

EXPERIENCE:
1. Trurism (Backend Developer Intern, Oct 2025 - Jan 2026, Remote India)
   Sole backend engineer on a live travel platform. Built a 20-module FastAPI system with 50+ APIs covering payments, bookings, and AI-driven recommendations. Architected JWT/RBAC auth, Redis caching, multi-tenant white-label B2B2C architecture, Razorpay webhooks, XML.Agency live flight and hotel data, and an ML orchestration layer for travel personalization. Deployed via Azure CI/CD with Docker and Gunicorn.

2. MedEvidences AI (Backend Developer Intern, Apr 2025 - Aug 2025, Remote USA)
   Migrated Flask monolith to async FastAPI for a US healthcare-AI platform. Rebuilt 30+ REST APIs with OAuth2 (Google, Microsoft) and NPI verification, cutting response times 25%. Led zero-downtime database migration from Azure to AWS RDS. Built dual-layer session and chat memory so the AI holds context across a conversation.

3. NextHive (Freelance Frontend Developer, Mar 2025 - Apr 2025, Remote India)
   Built the frontend of InstaCaption using React, TailwindCSS, and Framer Motion.

PROJECTS (6 total):
1. XAI Forensics (Python, PyTorch, FastAPI, HuggingFace, LIME, Next.js, Docker)
   3-panel forensic XAI system: LIME token attribution (300 perturbation samples), greedy counterfactual removal, dual-model divergence across DistilBERT-SST2 and Twitter-RoBERTa. Attention weights rejected as explanations per Jain and Wallace 2019. GitHub: github.com/parshvi1508/xai-forensics

2. Pan-India Renewable Energy Forecasting (Python, TensorFlow, LSTM, scikit-learn, AWS S3)
   Published at IEEE Conference 2025. 2.2% MAPE jointly forecasting energy consumption and generation across 40+ Indian states. Outperforms ARIMA (4.8%), linear regression (6.1%), exponential smoothing (5.3%). RMSE 0.15 GWh. 96,360+ hourly records. Sub-1s CPU inference. GitHub: github.com/parshvi1508/renewable-forecasting

3. Lumen: Verifiable AI CRM (FastAPI, Next.js, PostgreSQL, Docker, LLM)
   AI-native CRM for D2C brands. Two decoupled FastAPI services. Every AI output ships with the reasoning behind it. Plain-English-to-customer-segment builder with verifiable logic. Schema-validated LLM outputs, 17 test suites. Demo: lumencrm-frontend.vercel.app/dashboard

4. Data Analyst Agent API (Python, FastAPI, Gemini 2.5, Docker, OpenRouter)
   Supports 7 file formats, 3-stage Extract-Analyze-Format pipeline. Semaphore-based concurrency (max 3 parallel), sandboxed Docker execution with UUID isolation. 4-attempt exponential backoff with OpenRouter fallback. GitHub: github.com/parshvi1508

5. E-Learning Intelligent System (Python, scikit-learn, Isolation Forest, Random Forest, Dempster-Shafer)
   Anomaly detection (Isolation Forest and Dempster-Shafer Theory), dropout prediction (Random Forest), and hybrid recommendation engine (content-based + collaborative + rule-based). GitHub: github.com/parshvi1508/Anomalies_ML

6. Syncora: Collaborative Study Rooms (Next.js, WebSockets, PostgreSQL, TypeScript)
   Realtime collaborative study rooms with server-authoritative session tracking and presence awareness. Demo: studyroom-syncora.vercel.app

ACHIEVEMENTS:
- IEEE Conference 2025: Published pan-India renewable energy forecasting research (2.2% MAPE)
- NIT Agartala 2026: First-author presentation "AI Interpretation by Women Across Generations"
- Top 20 Worldwide: Switch Case Competition 2024, ACM-W Global
- ACM-W Global Newsletter: First student chapter ever featured
- CodeChef: Starters 189 Rank 73, Starters 188 Rank 144, Starters 176 Rank 115

POSITIONS OF RESPONSIBILITY:
- Vice Chair, ABES ACM-W (April 2025 - April 2026): Founded the chapter research wing, drove Most Active Chapter recognition in ACM India Region 2, panel member at ACM India Region 2 Summit 2025, organized Smart ABES Hackathon 2.0 and Blind Coding Crown Edition (100+ participants), mentored 550+ school girls.
- Event Coordinator, ABES ACM-W (January 2024 - April 2025): Hour of Code sessions for 250+ school girls on cyberfeminism and digital confidence.

CERTIFICATIONS:
Introduction to Machine Learning, AI for Impact, GenAI Application Trends and Best Practices, ACM India Region 2 Summit, Switch Case Competition

SKILLS:
Languages: Python, SQL
Frameworks: FastAPI, Flask, Next.js, Docker, Streamlit
AI/ML: PyTorch, scikit-learn, HuggingFace Transformers, TensorFlow, LIME, NLP, Explainable AI
Cloud and Databases: AWS (S3, RDS), Azure, PostgreSQL, MySQL, Redis, Firebase
Concepts: System Design, REST APIs, Async Architecture, CI/CD, Multi-tenant Architecture, XAI

If asked about something not in this data, say you do not have that information and stop. Do not provide general examples, explanations, or related information. Do not discuss any topic beyond what is documented about Parshvi above. Stay strictly scoped to this portfolio data.`
