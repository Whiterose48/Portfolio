// ===== SITE DATA =====

export const siteConfig = {
  name: 'Phachara Pornanothai',
  title: 'AI Engineer',
  email: 'phachara.porn@gmail.com',
  location: 'Bangkok, Thailand',
  github: 'https://github.com/Whiterose48',
  linkedin: '#',
  instagram: 'https://www.instagram.com/iam.pxk/',
  facebook: 'https://www.facebook.com/phachara.pornanothai.31',
  profileImg: '/img/phruk.png',
  heroImg: '/img/28308.jpg',
};

export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Architecture', path: '/architecture' },
  { label: 'Experience', path: '/experience' },
  { label: 'Contact', path: '/contact' },
];

export const labMetrics = [
  { number: '12+', label: 'ML Experiments' },
  { number: '4', label: 'Production Models' },
  { number: '3', label: 'Data Pipelines' },
  { number: '1', label: 'AI Platform' },
];

export const typingTitles = [
  'AI Engineer',
  'Data Scientist',
  'ML Developer',
  'Data Engineer',
];

export const coreExpertise = [
  {
    icon: 'fas fa-robot',
    title: 'AI Engineering',
    desc: 'Designing optimized machine learning models, fine-tuning architectures, and deploying inference systems with production reliability.',
    color: '#4facfe',
    tools: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'FastAPI', 'Docker'],
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Data Science',
    desc: 'Exploratory analysis, feature engineering, predictive modeling, and quantitative evaluation.',
    color: '#a855f7',
    tools: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter'],
  },
  {
    icon: 'fas fa-database',
    title: 'Data Engineering',
    desc: 'Designing robust ETL pipelines, data modeling strategies, and scalable backend infrastructures.',
    color: '#00f2fe',
    tools: ['Apache Airflow', 'PostgreSQL', 'AWS', 'Docker', 'SQL'],
  },
];

export const projects = [
  {
    id: 'chest-xray',
    tag: 'Computer Vision',
    title: 'AI Chest X-ray Detection System',
    problem: 'Hospitals require cost-efficient AI-assisted screening systems to reduce diagnostic bottlenecks.',
    data: '5,000+ X-ray images with class imbalance handling and augmentation pipeline.',
    approach: ['CNN with Transfer Learning', 'Quantile-based risk scoring', 'Hyperparameter optimization'],
    engineering: ['FastAPI inference backend', 'Docker containerization', 'Cloud deployment-ready architecture'],
    impact: ['40% faster preliminary triage', '87% F1-score', 'Reduced false negative rate'],
    img: '/img/competition1.png',
  },
  {
    id: 'retail-demand',
    tag: 'Predictive Analytics',
    title: 'Retail Demand Prediction System',
    problem: 'Retail demand fluctuates across time and location, affecting inventory efficiency.',
    data: 'Historical sales data across multiple retail locations.',
    approach: ['Quantile Regression Forecasting', 'Data-driven risk interval estimation', 'Feature Engineering'],
    engineering: ['Data Pipeline Automation', 'API Deployment', 'Monitoring Dashboard'],
    impact: ['Improved forecast stability', 'Reduced overstock risk', 'Optimized inventory'],
    img: '/img/op1.png',
  },
  {
    id: 'ywc-stargaze',
    tag: 'Full-Stack',
    title: 'Stargaze — Stargazing Location Finder',
    problem: 'Stargazing enthusiasts need optimal locations for astronomical observation.',
    data: 'Light pollution maps, weather data, and user reviews.',
    approach: ['Location-based Search', 'Weather API Integration', 'Interactive Maps'],
    engineering: ['React / Next.js Frontend', 'Vercel Deployment', 'REST API Architecture'],
    impact: ['Live at stargaze.in.th', 'Real-time weather data', 'Community-driven reviews'],
    img: '/img/ywc2.png',
    link: 'https://stargaze.in.th/',
  },
  {
    id: 'aws-project',
    tag: 'Cloud AI',
    title: 'AWS AI Image Generation Platform',
    problem: 'Need a scalable web platform for AI-powered image generation using cloud services.',
    data: 'User prompts and generated images.',
    approach: ['AWS Bedrock Integration', 'Serverless Architecture', 'S3 Storage'],
    engineering: ['Lambda Functions', 'API Gateway', 'CloudFront CDN'],
    impact: ['Scalable architecture', 'Low-latency inference', 'Cost-optimized deployment'],
    img: '/img/aws.png',
    link: 'https://cti-proj-dsba.vercel.app/',
  },
  {
    id: 'data-pipeline',
    tag: 'Data Engineering',
    title: 'Apache Airflow Data Pipeline',
    problem: 'Manual data processing is error-prone and unscalable for growing datasets.',
    data: 'Multi-source structured and semi-structured data.',
    approach: ['DAG Orchestration', 'Automated ETL', 'Data Quality Checks'],
    engineering: ['Apache Airflow', 'Docker Compose', 'PostgreSQL'],
    impact: ['Automated daily pipelines', '99.9% uptime', '60% faster processing'],
    img: '/img/pipeline.png',
  },
  {
    id: 'aml',
    tag: 'Machine Learning',
    title: 'Product Recommendation Engine',
    problem: 'E-commerce needs personalized recommendations to improve conversion.',
    data: 'User behavior data, purchase history, product metadata.',
    approach: ['Collaborative Filtering', 'Content-Based Filtering', 'Hybrid Model'],
    engineering: ['Model Training Pipeline', 'A/B Testing Framework', 'Real-time Serving'],
    impact: ['Increased engagement', 'Improved retention', 'Data-driven personalization'],
    img: '/img/aml.png',
  },
];

export const mlPipeline = [
  'Data Ingestion',
  'Preprocessing',
  'Feature Engineering',
  'Model Training',
  'Validation',
  'Deployment',
  'Monitoring',
];

export const dataArchitecture = [
  'External Sources',
  'ETL Layer',
  'Data Warehouse',
  'Feature Store',
  'Model Serving API',
];

export const mlOps = [
  { icon: 'fas fa-code-branch', label: 'Version Control' },
  { icon: 'fas fa-cogs', label: 'Automated Training' },
  { icon: 'fas fa-box', label: 'Model Registry' },
  { icon: 'fas fa-chart-area', label: 'Performance Monitoring' },
];

export const experiences = [
  {
    period: '2025',
    role: 'AI Engineer — Hackathon',
    company: 'GenAI Hackathon × Mitr Phol',
    desc: 'Designed scalable demand forecasting system with statistical confidence intervals using GenAI technologies.',
    skills: ['Python', 'ML', 'FastAPI', 'Docker'],
    img: '/img/Mitr.png',
  },
  {
    period: '2025',
    role: 'Camper — Web Development',
    company: 'Young Webmaster Camp 20',
    desc: 'Built full-stack web application with modern frameworks. Learned production best practices from industry experts.',
    skills: ['React', 'Node.js', 'Tailwind', 'Git'],
    img: '/img/ywc.png',
  },
  {
    period: '2025',
    role: 'Startup Founder',
    company: 'Stargaze.in.th',
    desc: 'Founded and built a stargazing location finder platform from zero to production deployment.',
    skills: ['Next.js', 'Vercel', 'API', 'UI/UX'],
    img: '/img/startup.png',
  },
  {
    period: '2024',
    role: 'ML Teaching Assistant',
    company: 'IT CAMP 20 — Data Science Track',
    desc: 'Taught Data Science tools, Python for data analysis, and ML fundamentals to 50+ students.',
    skills: ['Python', 'Pandas', 'Scikit-learn', 'Teaching'],
    img: '/img/itcamp-1.png',
  },
  {
    period: '2024',
    role: 'Hackathon — Special Award',
    company: 'E-SAN Thailand Coding & AI Academy',
    desc: 'Built AI Chest X-ray Detection system. Won Special Award for innovative approach to medical AI.',
    skills: ['CNN', 'Transfer Learning', 'FastAPI', 'Docker'],
    img: '/img/competition1.png',
  },
  {
    period: '2023 — 2025',
    role: 'Workshop Lead',
    company: 'IT Open House',
    desc: 'Staff (2023) → Head Workshop (2025). Teaching Data Science workshops to high school students.',
    skills: ['Data Science', 'Leadership', 'Event Planning'],
    img: '/img/workshop2.png',
  },
];

export const certificates = [
  { img: '/img/42python.png', title: 'Python Programming', issuer: '42 Bangkok' },
  { img: '/img/42web.png', title: 'Web Development', issuer: '42 Bangkok' },
  { img: '/img/cert.png', title: 'ESAN AI Hackathon', issuer: 'KhonKaen' },
];

export const contacts = [
  { icon: 'fab fa-github', label: 'GitHub', href: 'https://github.com/Whiterose48' },
  { icon: 'fab fa-instagram', label: 'Instagram', href: 'https://www.instagram.com/iam.pxk/' },
  { icon: 'fab fa-facebook', label: 'Facebook', href: 'https://www.facebook.com/phachara.pornanothai.31' },
  { icon: 'fab fa-linkedin', label: 'LinkedIn', href: '#' },
];
