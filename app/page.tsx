'use client';

import { useState, useEffect } from 'react';
import CursorSpotlight from '@/components/CursorSpotlight';
import SparkleParticles from '@/components/SparkleParticles';
import CanvasCursor from '@/components/CanvasCursor';

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [currentStatus, setCurrentStatus] = useState('Building software & AI apps');
  const [expandedAbout, setExpandedAbout] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<string[]>(['trustistics', 'ecoproof', 'mental-health']);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const statusMessages = [
      'Building software & AI apps',
      'Solving DSA problems',
      'Designing database systems',
      'Developing with Java & Python'
    ];

    const statusInterval = setInterval(() => {
      setCurrentStatus(statusMessages[Math.floor(Math.random() * statusMessages.length)]);
    }, 4000);

    return () => clearInterval(statusInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'achievements', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }

      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
        if (isVisible) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileNavOpen(false);
  };

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!e || !e.target) return;
    
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value || ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Achievements', 'Contact'];
  const heroName = 'A V Cusnat Sova';

  return (
    <div className="min-h-screen text-text-primary relative">
      <div className="sparkle-bg" />
      <SparkleParticles />
      <CanvasCursor />
      <CursorSpotlight />

      {/* Premium Navigation - glass + violet accents */}
      <nav className="fixed top-0 w-full bg-[var(--background-elevated)]/80 backdrop-blur-xl border-b border-[var(--card-border)] z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <div className="w-9 h-9 bg-gradient-to-br from-[var(--violet-500)] to-[var(--violet-700)] rounded-xl flex items-center justify-center shadow-lg shadow-[var(--glow-violet)]/30">
                <span className="text-white font-bold text-sm">CS</span>
              </div>
              <span className="font-semibold text-gradient text-lg">A V Cusnat Sova</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? 'text-[var(--violet-300)] bg-[var(--hover-bg)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--violet-300)] hover:bg-[var(--hover-bg)]'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <div className="h-0.5 bg-gradient-to-r from-[var(--violet-500)] to-[var(--fuchsia-500)] mt-1.5 rounded-full mx-auto w-4/5" />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Nav Toggle */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--violet-300)] hover:bg-[var(--hover-bg)]"
              aria-label="Toggle Navigation"
            >
              {mobileNavOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileNavOpen && (
          <div className="md:hidden border-t border-[var(--card-border)] bg-[var(--background-card)]/95 backdrop-blur-xl">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeSection === item.toLowerCase()
                      ? 'text-[var(--violet-300)] bg-[var(--hover-bg)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--violet-300)] hover:bg-[var(--hover-bg)]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Live Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[var(--background-elevated)] border border-[var(--card-border)] text-xs text-[var(--violet-300)] mb-6 animate-on-scroll">
            <span className="status-dot" />
            <span>Currently: {currentStatus}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight overflow-hidden">
            <span className="inline-flex flex-wrap justify-center text-[var(--violet-200)] drop-shadow-lg">
              {heroName.split('').map((char, i) => (
                <span
                  key={i}
                  className={`letter-reveal ${char === ' ' ? 'space' : ''}`}
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>

          <p className="text-lg sm:text-xl font-medium text-[var(--violet-300)] mt-4 animate-on-scroll">
            Computer Science Engineering Student | Software Engineer | Java &amp; AI Developer
          </p>

          <p className="text-base text-[var(--text-secondary)] max-w-2xl mx-auto mt-3 animate-on-scroll">
            Building software and AI-powered applications with Java, Python, SQL, and modern web technologies.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8 animate-on-scroll">
            <button onClick={() => scrollToSection('projects')} className="btn-primary inline-flex items-center gap-2">
              View Projects
              <span className="text-white/80">→</span>
            </button>
            <a href="/Cusnatsova-Resume.pdf" download className="btn-secondary inline-flex items-center gap-2">
              Download Resume
              <span>↓</span>
            </a>
            <button onClick={() => scrollToSection('contact')} className="btn-secondary">
              Contact
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="max-w-4xl mx-auto mt-16 w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Projects', value: '5+', color: 'from-[var(--violet-500)] to-[var(--violet-600)]' },
              { label: 'Certifications', value: '20+', color: 'from-[var(--violet-600)] to-[var(--fuchsia-500)]' },
              { label: 'LeetCode', value: '300+', color: 'from-[var(--fuchsia-500)] to-[var(--violet-500)]' },
              { label: 'CGPA', value: '9.07/10', color: 'from-[var(--violet-400)] to-[var(--violet-600)]' }
            ].map((stat, index) => (
              <div key={index} className="stat-card card-base p-5 text-center animate-on-scroll">
                <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</div>
                <div className="text-sm text-[var(--text-muted)] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-heading mb-10 animate-on-scroll">About Me</h2>

          <div className="card-base card-hover p-8 mb-8 animate-on-scroll">
            <div className="prose prose-invert max-w-none">
              <p className="text-[var(--text-primary)] mb-6 text-[1.05rem] leading-relaxed">
                Final-year Computer Science Engineering student with a 9.07/10 CGPA and 300+ LeetCode problems solved, with hands-on experience developing software and AI-powered applications using Java, Python, SQL, and databases. Strong foundation in data structures and algorithms, OOP, databases, and software development, with experience building, testing, and debugging applications through internships and academic projects.
              </p>

              {/* Problem-Solving Approach Accordion */}
              <div className="mb-6 p-4 rounded-xl bg-[var(--background-elevated)] border border-[var(--card-border)]">
                <button
                  className="text-sm font-semibold text-[var(--violet-300)] hover:text-[var(--violet-200)] transition-colors flex items-center gap-2 w-full text-left"
                  onClick={() => setExpandedAbout(!expandedAbout)}
                >
                  <span className="text-xs">{expandedAbout ? '▼' : '▶'}</span>
                  <span>My Problem-Solving Approach</span>
                </button>
                <div className={`mt-3 text-sm text-[var(--text-secondary)] pl-4 border-l-2 border-[var(--violet-500)] ${expandedAbout ? '' : 'hidden'}`}>
                  I approach problems by breaking them into smaller components, understanding the core requirements, selecting appropriate data structures and algorithms, and iteratively testing and debugging the solution.
                </div>
              </div>

              {/* Education Grid */}
              <h3 className="text-lg font-semibold mb-4 text-[var(--violet-300)]">Education</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-[var(--background-elevated)] border border-[var(--card-border)] rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2.5 py-1 rounded-md bg-[var(--violet-950)] text-[var(--violet-300)] border border-[var(--violet-800)] font-medium">2023 – 2027</span>
                    <span className="text-sm font-bold text-[var(--violet-300)]">CGPA: 9.07/10</span>
                  </div>
                  <h4 className="font-semibold text-[var(--text-primary)]">Panimalar Engineering College</h4>
                  <p className="text-xs text-[var(--text-muted)]">Chennai, Tamil Nadu • Anna University</p>
                  <p className="text-sm text-[var(--text-secondary)] mt-2 font-medium">B.E. Computer Science &amp; Engineering</p>
                </div>

                <div className="p-5 bg-[var(--background-elevated)] border border-[var(--card-border)] rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2.5 py-1 rounded-md bg-[var(--violet-950)] text-[var(--violet-300)] border border-[var(--violet-800)] font-medium">Schooling</span>
                    <span className="text-sm font-bold text-[var(--violet-300)]">Class X: 100% | Class XII: 88%</span>
                  </div>
                  <h4 className="font-semibold text-[var(--text-primary)]">Bell Matric Higher Secondary School</h4>
                  <p className="text-xs text-[var(--text-muted)]">Tirunelveli, Tamil Nadu</p>
                  <p className="text-sm text-[var(--text-secondary)] mt-2 font-medium">Higher Secondary Education (2020–2023)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-heading mb-10 animate-on-scroll">Technical Skills</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card-base card-hover p-6 animate-on-scroll">
              <h3 className="text-lg font-semibold mb-4 text-[var(--violet-300)] flex items-center gap-2">
                <span>💻</span> Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Java', 'Python', 'SQL'].map((skill) => (
                  <span key={skill} className="skill-tag px-3.5 py-1.5 bg-[var(--background-elevated)] border border-[var(--card-border)] rounded-lg text-sm font-medium text-[var(--text-secondary)]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-base card-hover p-6 animate-on-scroll">
              <h3 className="text-lg font-semibold mb-4 text-[var(--fuchsia-400)] flex items-center gap-2">
                <span>🌐</span> Web &amp; Frameworks
              </h3>
              <div className="flex flex-wrap gap-2">
                {['HTML5', 'CSS3', 'JavaScript', 'React'].map((skill) => (
                  <span key={skill} className="skill-tag px-3.5 py-1.5 bg-[var(--background-elevated)] border border-[var(--card-border)] rounded-lg text-sm font-medium text-[var(--text-secondary)]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-base card-hover p-6 animate-on-scroll">
              <h3 className="text-lg font-semibold mb-4 text-[var(--indigo-400)] flex items-center gap-2">
                <span>🛠️</span> Databases &amp; Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {['MySQL', 'MongoDB', 'Git', 'Android Studio', 'VS Code', 'Jupyter Notebook'].map((skill) => (
                  <span key={skill} className="skill-tag px-3.5 py-1.5 bg-[var(--background-elevated)] border border-[var(--card-border)] rounded-lg text-sm font-medium text-[var(--text-secondary)]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-base card-hover p-6 animate-on-scroll md:col-span-2 lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4 text-[var(--violet-300)] flex items-center gap-2">
                <span>📚</span> Core Subject Proficiencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'SDLC'].map((skill) => (
                  <span key={skill} className="skill-tag px-3.5 py-1.5 bg-[var(--background-elevated)] border border-[var(--card-border)] rounded-lg text-sm font-medium text-[var(--text-secondary)]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-base card-hover p-6 animate-on-scroll">
              <h3 className="text-lg font-semibold mb-4 text-[var(--fuchsia-400)] flex items-center gap-2">
                <span>🌟</span> Soft Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Problem Solving', 'Analytical Thinking', 'Leadership', 'Team Collaboration', 'Communication'].map((skill) => (
                  <span key={skill} className="skill-tag px-3.5 py-1.5 bg-[var(--background-elevated)] border border-[var(--card-border)] rounded-lg text-sm font-medium text-[var(--text-secondary)]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-heading mb-10 animate-on-scroll">Featured Projects</h2>

          <div className="space-y-6">
            {/* Project 1: Trustistics */}
            <div className="card-base card-hover p-6 animate-on-scroll">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-gradient-to-br from-[var(--violet-500)] to-[var(--indigo-500)] rounded-xl flex items-center justify-center flex-shrink-0 text-2xl shadow-lg shadow-[var(--glow-violet)]/20">
                  ⛓️
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--text-primary)]">Trustistics</h3>
                      <p className="text-xs text-[var(--violet-300)] font-medium">Blockchain-Powered Cold-Chain Provenance System</p>
                    </div>
                    <button
                      onClick={() => toggleProject('trustistics')}
                      className="text-sm text-[var(--violet-400)] hover:text-[var(--violet-300)] transition-colors px-2.5 py-1 rounded-lg hover:bg-[var(--hover-bg)] flex items-center gap-1"
                      aria-label="Toggle Project Details"
                    >
                      <span>{expandedProjects.includes('trustistics') ? '▼ Collapse' : '▶ Expand'}</span>
                    </button>
                  </div>

                  <div className="mt-3 mb-4">
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      Blockchain-powered cold-chain provenance system that uses IoT sensor data and Ethereum smart contracts to provide tamper-resistant tracking of temperature-sensitive products throughout the supply chain.
                    </p>
                  </div>

                  <div className={`${expandedProjects.includes('trustistics') ? '' : 'hidden'} transition-all`}>
                    <div className="mb-4 p-4 rounded-xl bg-[var(--background-elevated)] border border-[var(--card-border)] space-y-2">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[var(--violet-400)]">Key Features &amp; Provenance Tracking</div>
                      <ul className="text-[var(--text-secondary)] text-sm list-disc pl-4 space-y-1">
                        <li>IoT-based temperature monitoring with SHA-256 anchoring of sensor readings and document handoffs.</li>
                        <li>Dynamic temperature breach &amp; risk scoring with QR-based verification of product history to eliminate manual data-entry loopholes.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {['Java', 'Spring Boot', 'REST APIs', 'Ethereum', 'Web3j', 'PostgreSQL', 'IoT', 'Blockchain'].map((tech) => (
                      <span key={tech} className="px-2.5 py-1 bg-[var(--background-elevated)] border border-[var(--card-border)] rounded-lg text-xs font-mono text-[var(--text-secondary)] font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2: EcoProof */}
            <div className="card-base card-hover p-6 animate-on-scroll">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-gradient-to-br from-[var(--violet-500)] to-[var(--violet-700)] rounded-xl flex items-center justify-center flex-shrink-0 text-2xl shadow-lg shadow-[var(--glow-violet)]/20">
                  🌱
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--text-primary)]">EcoProof</h3>
                      <p className="text-xs text-[var(--violet-300)] font-medium">AI-Powered Industrial Pollution Monitoring Platform</p>
                    </div>
                    <button
                      onClick={() => toggleProject('ecoproof')}
                      className="text-sm text-[var(--violet-400)] hover:text-[var(--violet-300)] transition-colors px-2.5 py-1 rounded-lg hover:bg-[var(--hover-bg)] flex items-center gap-1"
                      aria-label="Toggle Project Details"
                    >
                      <span>{expandedProjects.includes('ecoproof') ? '▼ Collapse' : '▶ Expand'}</span>
                    </button>
                  </div>

                  <div className="mt-3 mb-4">
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      Built an AI-powered platform processing 1,200+ simulated emission data points, with an ML model detecting abnormal pollution patterns at 92% accuracy.
                    </p>
                  </div>

                  <div className={`${expandedProjects.includes('ecoproof') ? '' : 'hidden'} transition-all`}>
                    <div className="mb-4 p-4 rounded-xl bg-[var(--background-elevated)] border border-[var(--card-border)] space-y-2">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[var(--violet-400)]">Smart Contract & Compliance Integration</div>
                      <p className="text-[var(--text-secondary)] text-sm">
                        Integrated Ethereum/Solidity smart contracts through a RESTful API layer for tamper-proof compliance records, reducing audit verification time by 60%.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {['Python', 'FastAPI', 'Machine Learning', 'Web3', 'JavaScript'].map((tech) => (
                      <span key={tech} className="px-2.5 py-1 bg-[var(--background-elevated)] border border-[var(--card-border)] rounded-lg text-xs font-mono text-[var(--text-secondary)] font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2: Teen Mental Health Dashboard */}
            <div className="card-base card-hover p-6 animate-on-scroll">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-gradient-to-br from-[var(--violet-600)] to-[var(--fuchsia-500)] rounded-xl flex items-center justify-center flex-shrink-0 text-2xl shadow-lg shadow-[var(--glow-fuchsia)]/20">
                  🧠
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--text-primary)]">Teen Mental Health Dashboard</h3>
                      <p className="text-xs text-[var(--fuchsia-400)] font-medium">Data-Driven Teen Mental Health Risk Analytics</p>
                    </div>
                    <button
                      onClick={() => toggleProject('mental-health')}
                      className="text-sm text-[var(--violet-400)] hover:text-[var(--violet-300)] transition-colors px-2.5 py-1 rounded-lg hover:bg-[var(--hover-bg)] flex items-center gap-1"
                      aria-label="Toggle Project Details"
                    >
                      <span>{expandedProjects.includes('mental-health') ? '▼ Collapse' : '▶ Expand'}</span>
                    </button>
                  </div>

                  <div className="mt-3 mb-4">
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      Developed a data-driven dashboard to analyze teen mental health risks using messaging patterns, social media activity, and BERT-based sentiment analysis.
                    </p>
                  </div>

                  <div className={`${expandedProjects.includes('mental-health') ? '' : 'hidden'} transition-all`}>
                    <div className="mb-4 p-4 rounded-xl bg-[var(--background-elevated)] border border-[var(--card-border)] space-y-2">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[var(--fuchsia-400)]">Monitoring &amp; Interactive Visualization</div>
                      <p className="text-[var(--text-secondary)] text-sm">
                        Implemented risk trend monitoring, behavioral insights, and interactive visualizations to track depression, anxiety, and self-harm indicators.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {['Python', 'BERT', 'Transformers', 'Plotly', 'Dash', 'Pandas', 'NumPy'].map((tech) => (
                      <span key={tech} className="px-2.5 py-1 bg-[var(--background-elevated)] border border-[var(--card-border)] rounded-lg text-xs font-mono text-[var(--text-secondary)] font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Certifications */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-heading mb-10 animate-on-scroll">Experience &amp; Certifications</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Experience Card */}
            <div className="card-base card-hover p-6 animate-on-scroll">
              <h3 className="text-lg font-semibold mb-6 text-[var(--violet-300)] flex items-center gap-2">
                <span>💼</span> Work Experience
              </h3>
              <div className="space-y-6">
                <div className="border-l-2 border-[var(--violet-500)] pl-5 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <div className="font-semibold text-[var(--text-primary)] text-base">Java Junior Developer</div>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[var(--violet-950)] text-[var(--violet-300)] border border-[var(--violet-800)] font-medium">2 Dec 2025 – 31 Dec 2025</span>
                  </div>
                  <div className="text-xs text-[var(--violet-400)] font-medium">Test Yantra Software Solutions</div>
                  <ul className="text-xs text-[var(--text-secondary)] space-y-1.5 pt-1 list-disc pl-4">
                    <li>Completed comprehensive training in Core Java, covering syntax, data types, control flow, arrays, strings, exception handling, and collections.</li>
                    <li>Gained practical understanding of Object-Oriented Programming concepts including inheritance, polymorphism, abstraction, and encapsulation.</li>
                  </ul>
                </div>

                <div className="border-l-2 border-[var(--violet-500)] pl-5 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <div className="font-semibold text-[var(--text-primary)] text-base">Python Developer Intern</div>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[var(--violet-950)] text-[var(--violet-300)] border border-[var(--violet-800)] font-medium">Mar 2025 – Apr 2025</span>
                  </div>
                  <div className="text-xs text-[var(--violet-400)] font-medium">Micro Tech Global Solutions</div>
                  <ul className="text-xs text-[var(--text-secondary)] space-y-1.5 pt-1 list-disc pl-4">
                    <li>Developed and maintained Python modules to support application functionality and data processing.</li>
                    <li>Debugged existing code, performed unit testing, and improved code reliability while following Git-based version control and Agile development practices.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Certifications Card */}
            <div className="card-base card-hover p-6 animate-on-scroll">
              <h3 className="text-lg font-semibold mb-6 text-[var(--violet-300)] flex items-center gap-2">
                <span>📜</span> Certifications
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3.5 p-4 bg-[var(--background-elevated)] border border-[var(--card-border)] rounded-xl hover:border-[var(--card-border-hover)] transition-colors">
                  <span className="text-2xl">☕</span>
                  <div>
                    <div className="font-medium text-sm text-[var(--text-primary)]">Java - Beginner to Master</div>
                    <div className="text-xs text-[var(--text-muted)]">Udemy • 2026</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-4 bg-[var(--background-elevated)] border border-[var(--card-border)] rounded-xl hover:border-[var(--card-border-hover)] transition-colors">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <div className="font-medium text-sm text-[var(--text-primary)]">UiPath Automation Developer Associate Training</div>
                    <div className="text-xs text-[var(--text-muted)]">UiPath • 2026</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-4 bg-[var(--background-elevated)] border border-[var(--card-border)] rounded-xl hover:border-[var(--card-border-hover)] transition-colors">
                  <span className="text-2xl">🐍</span>
                  <div>
                    <div className="font-medium text-sm text-[var(--text-primary)]">Data Structures &amp; Algorithms in Python</div>
                    <div className="text-xs text-[var(--text-muted)]">Udemy • 2025</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-4 bg-[var(--background-elevated)] border border-[var(--card-border)] rounded-xl hover:border-[var(--card-border-hover)] transition-colors">
                  <span className="text-2xl">☁️</span>
                  <div>
                    <div className="font-medium text-sm text-[var(--text-primary)]">AWS Cloud Support Associate</div>
                    <div className="text-xs text-[var(--text-muted)]">AWS • 2025</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Activities Section */}
      <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-heading mb-10 animate-on-scroll">Achievements &amp; Activities</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-base card-hover p-6 animate-on-scroll">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-lg shadow-amber-500/20">
                  🏆
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[var(--violet-950)] text-[var(--violet-300)] border border-[var(--violet-800)] font-medium">1st Place Winner</span>
                    <span className="text-xs text-[var(--text-muted)]">2026</span>
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] text-base">Leo Summit Hack26</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                    Led a 3-member team to victory at Leo Summit Hack26, ranking 1st among 75 competing teams.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-base card-hover p-6 animate-on-scroll">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--violet-500)] to-[var(--fuchsia-500)] rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-lg shadow-[var(--glow-violet)]/20">
                  🏅
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[var(--violet-950)] text-[var(--violet-300)] border border-[var(--violet-800)] font-medium">3rd Department Rank</span>
                    <span className="text-xs text-[var(--text-muted)]">4th Semester</span>
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] text-base">Academic Excellence &amp; Merit Award</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                    Secured 3rd Rank in the CSE Department (4th Semester) with a 9.05 GPA, earning a ₹10,000 Merit Award.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social / Professional Links Section */}
      <section id="links" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-heading mb-10 animate-on-scroll">Connect With Me</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="https://github.com/avcusnatsova" target="_blank" rel="noopener noreferrer" className="card-base card-hover p-6 block animate-on-scroll group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[var(--violet-600)] to-[var(--violet-800)] rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[var(--glow-violet)]/20 transition-shadow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-[var(--text-primary)]">GitHub</div>
                  <div className="text-sm text-[var(--text-muted)]">@avcusnatsova</div>
                </div>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/cusnat-sova-victorjayaraj-17144a2a0" target="_blank" rel="noopener noreferrer" className="card-base card-hover p-6 block animate-on-scroll group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[var(--violet-500)] to-[var(--indigo-400)] rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[var(--glow-violet)]/20 transition-shadow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-[var(--text-primary)]">LinkedIn</div>
                  <div className="text-sm text-[var(--text-muted)]">Cusnat Sova</div>
                </div>
              </div>
            </a>

            <a href="https://leetcode.com/u/avcusnatsova/" target="_blank" rel="noopener noreferrer" className="card-base card-hover p-6 block animate-on-scroll group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[var(--fuchsia-500)] to-[var(--violet-600)] rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[var(--glow-fuchsia)]/20 transition-shadow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-[var(--text-primary)]">LeetCode</div>
                  <div className="text-sm text-[var(--text-muted)]">300+ Problems</div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-heading mb-10 animate-on-scroll">Get In Touch</h2>

          <div className="card-base card-hover p-8 animate-on-scroll">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-5 text-[var(--violet-300)]">Send Message</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    disabled={isSubmitting}
                    required
                    className="w-full p-4 bg-[var(--background-elevated)] border border-[var(--card-border)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--violet-500)] focus:ring-2 focus:ring-[var(--violet-500)]/30 transition-all disabled:opacity-50 text-sm"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    disabled={isSubmitting}
                    required
                    className="w-full p-4 bg-[var(--background-elevated)] border border-[var(--card-border)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--violet-500)] focus:ring-2 focus:ring-[var(--violet-500)]/30 transition-all disabled:opacity-50 text-sm"
                  />
                  <textarea
                    name="message"
                    value={formData.message || ''}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    rows={4}
                    disabled={isSubmitting}
                    required
                    className="w-full p-4 bg-[var(--background-elevated)] border border-[var(--card-border)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--violet-500)] focus:ring-2 focus:ring-[var(--violet-500)]/30 resize-none transition-all disabled:opacity-50 text-sm"
                  />
                  
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-950/40 border border-green-700/50 rounded-xl text-green-300 text-sm">
                      <div className="flex items-center gap-2">
                        <span>✓</span>
                        <span>Message sent successfully! I will get back to you soon.</span>
                      </div>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-950/40 border border-red-700/50 rounded-xl text-red-300 text-sm">
                      <div className="flex items-center gap-2">
                        <span>✕</span>
                        <span>Failed to send message. Please try again or email directly.</span>
                      </div>
                    </div>
                  )}
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>📧</span>
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-5 text-[var(--violet-300)]">Contact Info</h3>
                <div className="space-y-3">
                  <a href="mailto:avcusnatsovavictorjayaraj@gmail.com" className="flex items-center gap-3.5 p-4 bg-[var(--background-elevated)] border border-[var(--card-border)] rounded-xl hover:border-[var(--card-border-hover)] transition-colors block group">
                    <span className="text-xl">📧</span>
                    <div>
                      <div className="text-xs font-medium text-[var(--text-muted)]">Email</div>
                      <div className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--violet-300)] transition-colors">avcusnatsovavictorjayaraj@gmail.com</div>
                    </div>
                  </a>

                  <a href="tel:+919344631519" className="flex items-center gap-3.5 p-4 bg-[var(--background-elevated)] border border-[var(--card-border)] rounded-xl hover:border-[var(--card-border-hover)] transition-colors block group">
                    <span className="text-xl">📞</span>
                    <div>
                      <div className="text-xs font-medium text-[var(--text-muted)]">Phone</div>
                      <div className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--violet-300)] transition-colors">+91 9344631519</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3.5 p-4 bg-[var(--background-elevated)] border border-[var(--card-border)] rounded-xl hover:border-[var(--card-border-hover)] transition-colors">
                    <span className="text-xl">📍</span>
                    <div>
                      <div className="text-xs font-medium text-[var(--text-muted)]">Location</div>
                      <div className="text-sm font-medium text-[var(--text-primary)]">Chennai, Tamil Nadu</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 p-4 bg-[var(--background-elevated)] border border-[var(--card-border)] rounded-xl hover:border-[var(--card-border-hover)] transition-colors">
                    <span className="text-xl">🎯</span>
                    <div>
                      <div className="text-xs font-medium text-[var(--text-muted)]">Open for</div>
                      <div className="text-sm font-medium text-[var(--text-primary)]">Internships, Full-time roles</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--card-border)] py-8 px-4 sm:px-6 lg:px-8 bg-[var(--background-elevated)]/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            © 2026 A V Cusnat Sova. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-xs text-[var(--text-muted)]">
            <span>Built with Next.js &amp; React</span>
            <span>•</span>
            <button onClick={() => scrollToSection('hero')} className="hover:text-[var(--violet-300)] transition-colors">Back to top ↑</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
