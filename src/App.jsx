import React, { useEffect, useState, useRef, useCallback } from 'react';

// ─── DATA ──────────────────────────────────────────────────────────────────────

const CONTACT = {
  name: 'Patrick Jason H. Turtor',
  title: 'Web Developer & Programmer',
  subtitle: 'Open to Virtual Assistant Roles',
  location: 'Dipolog City, Zamboanga del Norte, Philippines',
  phone: '+63 954 072 2828',
  email: 'patrickturtor@gmail.com',
  linkedin: 'https://www.linkedin.com/in/patrick-jason-turtor-035b74373/',
  github: 'https://github.com/ZegionV2',
};

const OBJECTIVE = `Passionate web developer and programmer with a background in IT, IoT, and mobile app development. 
I build clean, functional, and user-friendly applications — from Flutter mobile apps to React web interfaces. 
I thrive working independently in remote environments and am also open to Virtual Assistant roles where I can 
apply my technical and organizational skills to support teams effectively.`;

const SKILLS_RATED = [
  { name: 'HTML / CSS / JavaScript', score: 8 },
  { name: 'React & Tailwind CSS', score: 7 },
  { name: 'Flutter (Dart)', score: 7 },
  { name: 'Python', score: 6 },
  { name: 'C++ (IoT / Embedded)', score: 6 },
  { name: 'Graphic Design & Video Editing', score: 7 },
  { name: 'Google Workspace Admin', score: 8 },
  { name: 'Network Administration', score: 7 },
  { name: 'Hardware Troubleshooting', score: 8 },
  { name: 'Microsoft Office', score: 7 },
];

const SKILLS_TOOLS = [
  'VS Code', 'Arduino IDE', 'Git & GitHub', 'Flutter',
  'Ruijie Cloud', 'Google Workspace', 'Adobe Photoshop',
  'Microsoft Office', 'React', 'Tailwind CSS', 'AI Prompting', "Canva", "Davinci Resolve"
];

// images: array of up to 3 paths — files must be placed inside your /public/ folder
// Example: images: ['/proj1-a.jpg', '/proj1-b.jpg', '/proj1-c.jpg']
// The filename must exactly match what you saved in /public/ (case-sensitive)
const PROJECTS = [
  {
    title: 'Personal Portfolio Website',
    subtitle: 'Web Project',
    type: 'web',
    description: 'This portfolio — built from scratch using React and Tailwind CSS with scroll animations, skill bars, a project modal gallery, and a dark editorial design.',
    longDescription: 'A fully responsive personal portfolio website designed and developed from scratch. Features include scroll-reveal animations, animated skill bars with pip indicators, a clickable project modal with image gallery, a sticky navbar, back-to-top button, and a clean dark editorial aesthetic using custom Google Fonts.',
    stack: ['React', 'Tailwind CSS', 'JavaScript'],
    github: 'https://github.com/ZegionV2/patrick-portfolio',
    live: null,
    images: ['/web1.png', '/web2.png', '/web3.png'], // ▼ add more: ['/proj-1-a.jpg', '/proj-1-b.jpg', '/proj-1-c.jpg']
    bullets: [
      'Designed and built a fully responsive personal portfolio from scratch.',
      'Implemented scroll-reveal animations and animated skill bars.',
      'Structured with reusable React components for easy content updates.',
      'Modal project gallery with up to 3 screenshots per project.',
    ],
  },
  {
    title: 'MindMelt Shorts',
    subtitle: 'YouTube Channel',
    type: 'youtube',
    description: 'An AI-powered YouTube Shorts channel delivering quick, mind-blowing facts and anime theories — scripted, voiced, and produced using AI tools.',
    longDescription: 'MindMelt Shorts is a YouTube channel focused on delivering "quick hits of knowledge that actually blow your mind." Every video is scripted using AI prompting, AI-voiced using text-to-speech tools, and edited for short-form content. The channel showcases skills in AI content creation, prompt engineering, video editing, and audience engagement strategy.',
    stack: ['AI Prompting', 'Text-to-Speech AI', 'Video Editing', 'Content Strategy', 'YouTube Shorts'],
    github: null,
    live: null,
    youtubeUrl: 'https://www.youtube.com/@OfficialMindMeltShorts',
    youtubeChannel: '@OfficialMindMeltShorts',
    images: ['/mind1.png', null, null], // ▼ add screenshots of your best videos e.g. '/mindmelt-1.jpg'
    bullets: [
      'Scripted and produced AI-voiced short-form videos on facts and anime theories.',
      'Demonstrated advanced AI prompting skills for content generation.',
      'Managed video editing, thumbnail design, and channel strategy.',
      'Content styled for YouTube Shorts algorithm and audience retention.',
    ],
  },
  {
    title: 'KINA — Schedule App',
    subtitle: 'Flutter Mobile App',
    type: 'mobile',
    description: 'A pastel-themed schedule app for college students with weekly scheduling, live class status, conflict detection, notifications, and schedule sharing.',
    longDescription: 'KINA is a Flutter-based mobile application designed for college students to manage their class schedules. Features a pastel UI with Nunito font, weekly day-by-day schedule, color coding per subject, smart conflict detection, live NOW/SOON class badges, 15-minute notification reminders, multiple semester support, and schedule sharing via unique code.',
    stack: ['Flutter', 'Dart', 'shared_preferences', 'flutter_local_notifications'],
    github: 'https://github.com/ZegionV2/kina-schedule-app',
    live: null,
    images: ['/kina1.jpg', '/kina2.jpg', '/kina3.jpg'],
    bullets: [
      'Weekly schedule organized by day with color coding per subject.',
      'Live class status — NOW and SOON badges with 15-minute reminders.',
      'Share and import schedules between classmates via a unique code.',
      'Multiple semester support with persistent local storage.',
    ],
  },
  {
    title: 'IoT App-Controlled Pet Feeder',
    subtitle: 'Capstone Project',
    type: 'iot',
    description: 'An ESP32-CAM–based smart pet feeder with mobile app control, live camera streaming, and servo motor–based scheduled feeding.',
    longDescription: 'A capstone project combining embedded systems and mobile development. The ESP32-CAM microcontroller drives a servo motor for food dispensing. The Flutter mobile app provides remote control, live camera streaming, and scheduled feeding configuration. Device logic runs on C++; app logic in Dart.',
    stack: ['C++ (ESP32)', 'Dart (Flutter)', 'IoT', 'Servo Motor', 'ESP32-CAM'],
    github: null,
    live: null,
    gdrive: null, // ▼ e.g. 'https://drive.google.com/drive/folders/YOUR_FOLDER_ID'
    images: ['/cap2.png', ['/cap1.png'], null],
    bullets: [
      'ESP32-CAM microcontroller with servo motor for food dispensing.',
      'Flutter mobile app for remote control and monitoring.',
      'Live camera streaming and scheduled feeding via the app.',
      'Device logic in C++, mobile logic in Dart.',
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // ▼▼▼  TO ADD A NEW PROJECT — copy the block below and paste it
  //       above this comment, then fill in your own details.
  //
  // STEPS:
  //   1. Copy everything from the opening { to the closing },
  //   2. Paste it right above this comment line
  //   3. Change each field to match your new project
  //   4. For images: save your screenshots to /public/ first,
  //      then write the filename like '/my-screenshot.jpg'
  //      Leave unused image slots as: null
  //
  // ── TEMPLATE ────────────────────────────────────────────────────────
  // {
  //   title: 'Your Project Title',
  //   subtitle: 'e.g. Web App / Mobile App / Tool',
  //
  //   // type controls the badge color on the card:
  //   //   'web'     → cyan
  //   //   'mobile'  → purple
  //   //   'youtube' → red  (also needs youtubeUrl and youtubeChannel below)
  //   //   'iot'     → orange
  //   //   'design'  → pink
  //   //   'other'   → slate
  //   type: 'web',
  //
  //   // Short description shown on the card (1–2 sentences)
  //   description: 'Short description shown on the project card.',
  //
  //   // Full description shown inside the modal when the card is clicked
  //   longDescription: 'Longer description with more technical detail, shown in the popup.',
  //
  //   // Tech stack tags shown on the card and in the modal
  //   stack: ['React', 'Node.js', 'MongoDB'],
  //
  //   github: null,        // e.g. 'https://github.com/ZegionV2/my-project'  or null
  //   live: null,          // e.g. 'https://my-project.vercel.app'            or null
  //
  //   // YouTube only — remove these two lines if type is not 'youtube'
  //   // youtubeUrl: 'https://www.youtube.com/@YourChannel',
  //   // youtubeChannel: '@YourChannel',
  //
  //   // Up to 3 screenshots — save files to /public/ and list paths here
  //   // Unused slots stay as null
  //   images: [null, null, null],
  //   // e.g. images: ['/my-proj-a.jpg', '/my-proj-b.jpg', null],
  //
  //   // Bullet points shown inside the modal
  //   bullets: [
  //     'First thing you built or achieved.',
  //     'Second highlight.',
  //     'Third highlight.',
  //   ],
  // },
  // ═══════════════════════════════════════════════════════════════════
];

const EXPERIENCE = [
  {
    role: 'IT Networking Specialist / IT Support',
    company: 'OBI Services OPC',
    period: 'August 2024 – January 2025',
    type: 'Full-time',
    bullets: [
      'Configured, monitored, and maintained network infrastructure using Ruijie Cloud.',
      'Managed ISP failover and load balancing across four (4) ISPs.',
      'Provided daily IT and technical support to agents.',
      'Administered Google Workspace accounts: creation, deletion, suspension, and password resets.',
      'Managed access control systems and workstation seat plans.',
    ],
  },
  {
    role: 'IT Intern (On-the-Job Training)',
    company: 'Virtual Buddy 24/7',
    period: 'January 2025 – April 2025',
    type: '600 Hours OJT',
    bullets: [
      'Assisted with hardware servicing, troubleshooting, and preventive maintenance.',
      'Supported network setup, inspections, and routine connectivity check-ups.',
      'Provided technical assistance to staff and ensured proper workstation operation.',
    ],
  },
  {
    role: 'Level Designer & Builder',
    company: 'Megamod',
    period: 'December 2023 – February 2024',
    type: 'Additional',
    bullets: [
      'Designed and built interactive game levels.',
      'Created and optimized custom in-game assets for other designers.',
      'Collaborated with a distributed creative team under deadlines.',
    ],
  },
];

const EDUCATION = {
  degree: 'Bachelor of Science in Information Technology (BSIT)',
  school: "Saint Vincent's College Incorporated",
  year: 'Graduated April 2026',
  // ▼ Save your school logo to /public/ and write the filename below
  // Example: if you saved it as "svc-logo.png" → schoolLogo: '/svc-logo.png'
  schoolLogo: '/svc-logo.jpg',
  // ▼ Add your graduation photos here — save each to /public/ first
  // Example: ['/grad-1.jpg', '/grad-2.jpg', '/grad-3.jpg']
  graduationPhotos: ['/grad4.jpg', '/grad1.jpg', '/grad2.jpg', '/grad3.jpg'],
};

// ▼ For each cert, set image: '/cert-1.jpg' etc. once you add them to /public/
const CERTIFICATIONS = [
  {
    title: 'CERTIFICATE OF COMPLETION | Canva Essentials',
    issuer: 'Canva',
    date: 'May 15, 2026',
    icon: '🎨',
    image: '/cert5.png', // e.g. '/cert-csc.jpg'
  },
  {
    title: 'Civil Service Examination (Professional)',
    issuer: 'Civil Service Commission',
    date: 'March 3, 2024',
    icon: '🏛️',
    image: '/cert3.jpg', // e.g. '/cert-csc.jpg'
  },
  {
    title: 'Certificate of Participation — World of Works Labor Education for Graduating Students',
    issuer: 'Department of Labor and Employment',
    date: 'September 28, 2024',
    icon: '🎓',
    image: '/cert1.jpg',
  },
  {
    title: 'Certificate of Employment',
    issuer: 'OBI Services OPC',
    date: 'January 15, 2026',
    icon: '💼',
    image: '/cert2.jpg',
  },
  {
    title: 'Certificate of Completion — On-the-Job Training',
    issuer: 'Virtual Buddy 24/7',
    date: 'April 11, 2025',
    icon: '📋',
    image: '/cert4.jpg',
  },
];

const STRENGTHS = [
  'Strong problem-solving and logical reasoning',
  'Reliable, organized, and detail-oriented',
  'Fast learner, adapts quickly to new environments',
  'Works independently or as part of a team',
];

// ─── TYPE BADGE COLORS ─────────────────────────────────────────────────────────

const TYPE_CONFIG = {
  web:     { label: 'Web',     color: '#22d3ee' },
  youtube: { label: 'YouTube', color: '#ff4444' },
  mobile:  { label: 'Mobile',  color: '#a78bfa' },
  iot:     { label: 'IoT',     color: '#34d399' },
  design:  { label: 'Design',  color: '#f472b6' },
  other:   { label: 'Other',   color: '#94a3b8' },
};

// SVG icons for each project type shown on the card face
const TYPE_ICONS = {
  web: (color) => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
    </svg>
  ),
  youtube: (color) => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill={color}>
      <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
    </svg>
  ),
  mobile: (color) => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
      <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
    </svg>
  ),
  iot: (color) => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      <path d="M5 13a7 7 0 0110 0M3 10a10 10 0 0115 0"/>
    </svg>
  ),
  design: (color) => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
      <circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/>
      <circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/>
      <path d="M12 20a8 8 0 100-16"/>
    </svg>
  ),
  other: (color) => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
    </svg>
  ),
};

// ─── HOOKS ─────────────────────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── FLOATING PARTICLES ────────────────────────────────────────────────────────

function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const dots = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      o: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,211,238,${d.o})`;
        ctx.fill();
      });
      // Draw connecting lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34,211,238,${0.06 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.6 }} />;
}

// ─── SKILL BAR ─────────────────────────────────────────────────────────────────

function SkillBar({ name, score, delay = 0 }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setAnimated(true), delay); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="font-body text-slate-300 text-sm">{name}</span>
        <span className="font-mono text-xs tabular-nums" style={{ color: '#22d3ee' }}>{score}/10</span>
      </div>
      <div className="w-full h-2 rounded-full relative overflow-hidden" style={{ background: '#1e2a3a' }}>
        <div className="h-full rounded-full relative overflow-hidden" style={{
          width: animated ? `${score * 10}%` : '0%',
          background: 'linear-gradient(90deg, #22d3ee, #06b6d4)',
          transition: 'width 1.1s cubic-bezier(0.22,1,0.36,1)',
        }}>
          {/* shimmer */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
            animation: animated ? 'shimmer 1.8s ease infinite' : 'none',
            backgroundSize: '200% 100%',
          }} />
        </div>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex-1 h-0.5 rounded-full" style={{
            background: i < score ? '#22d3ee' : '#1e2a3a',
            opacity: animated ? 1 : 0,
            transition: `opacity 0.3s ease ${delay / 1000 + 0.1 + i * 0.05}s`,
          }} />
        ))}
      </div>
    </div>
  );
}

// ─── IMAGE LIGHTBOX ────────────────────────────────────────────────────────────

function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}>
      <button onClick={onClose}
        className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white/10 transition-colors"
        style={{ background: 'rgba(255,255,255,0.08)' }}>✕</button>
      <img src={src} alt={alt}
        className="max-w-full max-h-[88vh] rounded-xl object-contain"
        style={{ boxShadow: '0 0 60px rgba(34,211,238,0.15)' }}
        onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

// ─── PROJECT MODAL ─────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }) {
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const validImages = (project.images || []).filter(Boolean);
  const tc = TYPE_CONFIG[project.type] || TYPE_CONFIG.web;

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ background: 'rgba(10,15,30,0.92)', backdropFilter: 'blur(10px)' }}
        onClick={onClose}>
        <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden border border-cyan-400/25"
          style={{ background: '#111827', maxHeight: '90vh', overflowY: 'auto', animation: 'modalIn 0.25s ease' }}
          onClick={(e) => e.stopPropagation()}>

          <button onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            style={{ background: '#1e2a3a' }}>✕</button>

          {/* ── Image gallery ── */}
          {validImages.length > 0 ? (
            <div className="w-full" style={{ background: '#080e1c' }}>
              {/* Main image — full natural width, no cropping */}
              <div className="w-full flex items-center justify-center relative"
                style={{ background: '#080e1c' }}>
                <img
                  key={activeImg}
                  src={validImages[activeImg]}
                  alt={`${project.title} screenshot ${activeImg + 1}`}
                  className="w-full cursor-zoom-in"
                  style={{
                    display: 'block',
                    maxHeight: '70vh',
                    objectFit: 'contain',
                    background: '#080e1c',
                    animation: 'fadeIn 0.25s ease',
                  }}
                  onClick={() => setLightbox(validImages[activeImg])}
                />
                {/* Enlarge hint */}
                <div className="absolute bottom-2 right-2 font-mono text-xs px-2 py-1 rounded-full pointer-events-none"
                  style={{ background: 'rgba(0,0,0,0.7)', color: '#94a3b8' }}>
                  🔍 click to enlarge
                </div>
                {/* Prev / Next */}
                {validImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveImg((a) => (a - 1 + validImages.length) % validImages.length); }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white text-xl transition-colors"
                      style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.12)' }}>‹</button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveImg((a) => (a + 1) % validImages.length); }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white text-xl transition-colors"
                      style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.12)' }}>›</button>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              {validImages.length > 1 && (
                <div className="flex gap-2 px-4 py-3 overflow-x-auto"
                  style={{ scrollbarWidth: 'none', background: '#0a0f1e' }}>
                  {validImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className="flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200"
                      style={{
                        border: `2px solid ${i === activeImg ? tc.color : 'transparent'}`,
                        opacity: i === activeImg ? 1 : 0.45,
                        background: '#080e1c',
                      }}>
                      <img
                        src={img}
                        alt=""
                        style={{ width: '72px', height: '52px', objectFit: 'contain', display: 'block', background: '#080e1c' }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Dot indicators */}
              {validImages.length > 1 && (
                <div className="flex justify-center gap-1.5 pb-3">
                  {validImages.map((_, i) => (
                    <button key={i} onClick={() => setActiveImg(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === activeImg ? '20px' : '6px',
                        height: '6px',
                        background: i === activeImg ? tc.color : tc.color + '44',
                      }} />
                  ))}
                </div>
              )}
            </div>

          ) : project.type === 'youtube' ? (
            /* YouTube — no images */
            <div className="w-full flex flex-col items-center justify-center gap-4 py-10"
              style={{ background: '#100808' }}>
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{ background: '#ff444422', border: '2px solid #ff444444' }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="#ff4444"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/></svg>
              </div>
              <div className="text-center">
                <p className="font-mono text-sm text-slate-300 mb-1">MindMelt Shorts</p>
                <p className="font-mono text-xs text-slate-500 mb-3">{project.youtubeChannel}</p>
                <a href={project.youtubeUrl} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-xs font-semibold hover:opacity-80 transition-opacity"
                  style={{ background: '#ff4444', color: '#fff' }}>▶ Visit Channel</a>
              </div>
            </div>

          ) : (
            /* No images at all */
            <div className="w-full flex flex-col items-center justify-center gap-3 py-10"
              style={{ background: '#0a0f1e' }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-cyan-400/20"
                style={{ background: '#22d3ee0a' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                </svg>
              </div>
              <p className="font-mono text-xs text-slate-500 text-center px-6">
                No screenshots yet — add paths to<br/>
                <span style={{ color: '#22d3ee' }}>PROJECTS[].images</span> in App.jsx
              </p>
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3 gap-3">
              <h3 className="font-body font-semibold text-white text-xl">{project.title}</h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold flex-shrink-0"
                style={{ background: tc.color + '22', color: tc.color, border: `1px solid ${tc.color}44` }}>
                {tc.label}
              </span>
            </div>
            <p className="font-body text-slate-300 text-sm leading-relaxed mb-5">{project.longDescription || project.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.stack.map((s, j) => (
                <span key={j} className="font-mono text-xs px-2 py-0.5 rounded border border-cyan-400/20"
                  style={{ color: '#22d3ee', background: '#0a0f1e' }}>{s}</span>
              ))}
            </div>
            <ul className="flex flex-col gap-2 mb-5">
              {project.bullets.map((b, j) => (
                <li key={j} className="flex gap-2 font-body text-slate-400 text-sm leading-relaxed">
                  <span style={{ color: '#22d3ee' }} className="flex-shrink-0 mt-0.5">›</span>{b}
                </li>
              ))}
            </ul>
            <div className="flex gap-3 pt-4 border-t border-cyan-400/10 flex-wrap">
              {project.youtubeUrl && (
                <a href={project.youtubeUrl} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-mono text-xs font-semibold hover:opacity-80 transition-all hover:scale-105"
                  style={{ background: '#ff4444', color: '#fff' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/></svg>
                  YouTube Channel
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg border font-mono text-xs transition-all hover:scale-105 hover:bg-cyan-400/10"
                  style={{ borderColor: '#22d3ee55', color: '#22d3ee' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                  GitHub
                </a>
              )}
              {project.gdrive && (
                <a href={project.gdrive} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg border font-mono text-xs transition-all hover:scale-105"
                  style={{ borderColor: '#4ade8055', color: '#4ade80', background: '#4ade800a' }}>
                  <svg width="13" height="13" viewBox="0 0 87.3 78" fill="currentColor"><path fill="#0066da" d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3L27.5 53H0c0 1.55.4 3.1 1.2 4.5z"/><path fill="#00ac47" d="M43.65 25L29.9 1.2C28.55 2 27.4 3.1 26.6 4.5L1.2 48.5c-.8 1.4-1.2 2.95-1.2 4.5h27.5z"/><path fill="#ea4335" d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.85 12.5z"/><path fill="#00832d" d="M43.65 25L57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.1.45-4.5 1.2z"/><path fill="#2684fc" d="M59.8 53H27.5L13.75 76.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.1-.45 4.5-1.2z"/><path fill="#ffba00" d="M73.4 26.5l-12.6-21.8c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.15 28H87.3c0-1.55-.4-3.1-1.2-4.5z"/></svg>
                  Google Drive
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-mono text-xs font-semibold hover:opacity-90 transition-all hover:scale-105"
                  style={{ background: '#22d3ee', color: '#0a0f1e' }}>Live Demo ↗</a>
              )}
              {!project.github && !project.gdrive && !project.live && !project.youtubeUrl && (
                <span className="font-mono text-xs text-slate-600 italic self-center">No public link yet</span>
              )}
            </div>
          </div>
        </div>
      </div>
      {lightbox && <Lightbox src={lightbox} alt={project.title} onClose={() => setLightbox(null)} />}
    </>
  );
}

// ─── CERTIFICATE MODAL ─────────────────────────────────────────────────────────

function CertModal({ cert, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4"
      style={{ background: 'rgba(10,15,30,0.94)', backdropFilter: 'blur(10px)', animation: 'fadeIn 0.2s ease' }}
      onClick={onClose}>
      <div className="relative max-w-2xl w-full rounded-2xl overflow-hidden border border-cyan-400/25"
        style={{ background: '#111827', animation: 'modalIn 0.25s ease' }}
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          style={{ background: '#1e2a3a' }}>✕</button>
        <div className="p-6 border-b border-cyan-400/10">
          <div className="flex gap-3 items-start">
            <span className="text-3xl">{cert.icon}</span>
            <div>
              <h3 className="font-body font-semibold text-white text-lg leading-snug mb-1">{cert.title}</h3>
              <p className="font-mono text-sm" style={{ color: '#22d3ee' }}>{cert.issuer}</p>
              <p className="font-mono text-xs text-slate-500 mt-0.5">{cert.date}</p>
            </div>
          </div>
        </div>
        {cert.image ? (
          <div className="p-4">
            <img src={cert.image} alt={cert.title} className="w-full rounded-xl object-contain max-h-[60vh]"
              style={{ background: '#0d1525' }} />
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center gap-3 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-cyan-400/20" style={{ background: '#22d3ee0a' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>
              </svg>
            </div>
            <p className="font-mono text-sm text-slate-400">Certificate image not added yet</p>
            <p className="font-mono text-xs text-slate-600">Add the image to <span style={{ color: '#22d3ee' }}>/public/</span> and set<br/><span style={{ color: '#22d3ee' }}>CERTIFICATIONS[].image</span> in App.jsx</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── NAVBAR ────────────────────────────────────────────────────────────────────

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const links = ['About', 'Projects', 'Skills', 'Experience', 'Education', 'Contact'];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const handleLink = (e, href) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 transition-all duration-300"
        style={{
          background: scrolled || open ? 'rgba(10,15,30,0.96)' : 'transparent',
          backdropFilter: scrolled || open ? 'blur(14px)' : 'none',
          borderBottom: scrolled || open ? '1px solid rgba(34,211,238,0.12)' : 'none',
        }}>
        <span className="font-mono text-sm tracking-widest uppercase" style={{ color: '#22d3ee' }}>PJT</span>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`}
                className="font-body text-sm text-slate-400 hover:text-white transition-colors duration-200 tracking-wide relative group">
                {l}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: '#22d3ee' }} />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          style={{ background: open ? '#22d3ee15' : 'transparent' }}>
          <span className="block w-5 h-px transition-all duration-300 origin-center"
            style={{ background: '#22d3ee', transform: open ? 'translateY(4px) rotate(45deg)' : 'none' }} />
          <span className="block w-5 h-px transition-all duration-300"
            style={{ background: '#22d3ee', opacity: open ? 0 : 1 }} />
          <span className="block w-5 h-px transition-all duration-300 origin-center"
            style={{ background: '#22d3ee', transform: open ? 'translateY(-4px) rotate(-45deg)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className="fixed inset-0 z-40 md:hidden transition-all duration-300 pointer-events-none"
        style={{ opacity: open ? 1 : 0 }}>
        {/* Backdrop */}
        <div className="absolute inset-0 pointer-events-auto"
          style={{ background: 'rgba(10,15,30,0.6)', backdropFilter: 'blur(4px)', pointerEvents: open ? 'auto' : 'none' }}
          onClick={() => setOpen(false)} />
        {/* Slide-in panel */}
        <div className="absolute top-0 right-0 h-full w-64 flex flex-col pt-20 pb-8 px-6 border-l border-cyan-400/20 transition-transform duration-300 pointer-events-auto"
          style={{
            background: '#0a0f1e',
            transform: open ? 'translateX(0)' : 'translateX(100%)',
          }}>
          <ul className="flex flex-col gap-1">
            {links.map((l, i) => (
              <li key={l} style={{ animation: open ? `fadeUp 0.3s ease ${i * 50}ms both` : 'none' }}>
                <a
                  href={`#${l.toLowerCase()}`}
                  onClick={(e) => handleLink(e, `#${l.toLowerCase()}`)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl font-body text-base text-slate-300 hover:text-white transition-all duration-200 group"
                  style={{ ':hover': { background: '#22d3ee10' } }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#22d3ee0d'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#22d3ee55' }} />
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section id="about"
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 px-8 md:px-20 pt-24 pb-16 overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #22d3ee0f 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06b6d408 0%, transparent 70%)', animation: 'glowPulse 5s ease-in-out 2s infinite' }} />
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Photo with float + glow ring */}
      <div className="relative flex-shrink-0 float-photo" style={{ animation: 'fadeUp 0.8s ease forwards, floatY 6s ease-in-out 1s infinite' }}>
        <div className="absolute -inset-4 rounded-3xl glow-ring"
          style={{ background: 'linear-gradient(135deg, #22d3ee44, #06b6d422, transparent)', filter: 'blur(16px)' }} />
        <div className="absolute -inset-1 rounded-2xl" style={{ background: 'linear-gradient(135deg, #22d3ee22, transparent, #22d3ee11)', filter: 'blur(4px)' }} />
        <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden border-2 border-cyan-400/40"
          style={{ boxShadow: '0 0 40px #22d3ee33, 0 0 80px #22d3ee18' }}>
          <img src="/YOUR_PHOTO.jpg" alt="Patrick Jason H. Turtor" className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.innerHTML = `<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#141c2e;gap:8px;"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg><p style="color:#22d3ee;font-size:11px;font-family:monospace;text-align:center;padding:0 12px;">Place photo as<br/>public/YOUR_PHOTO.jpg</p></div>`;
            }} />
        </div>
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 border border-cyan-400/30 rounded-full px-4 py-1.5 whitespace-nowrap"
          style={{ background: '#141c2e' }}>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-xs text-slate-400">Open to Work</span>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-4 max-w-xl text-center md:text-left" style={{ animation: 'fadeUp 0.8s ease 0.2s both' }}>
        <p className="font-mono text-sm tracking-widest uppercase" style={{ color: '#22d3ee', animation: 'fadeIn 0.6s ease 0.4s both', opacity: 0 }}>Web Developer & Programmer</p>
        <h1 className="font-display text-6xl md:text-8xl text-white leading-none tracking-wide" style={{ animation: 'fadeUp 0.8s ease 0.3s both', opacity: 0 }}>
          {CONTACT.name.split(' ').slice(0, 2).join(' ')}<br />
          <span style={{ color: '#22d3ee' }}>{CONTACT.name.split(' ').slice(2).join(' ')}</span>
        </h1>
        <p className="font-body text-slate-400 text-base" style={{ animation: 'fadeIn 0.6s ease 0.6s both', opacity: 0 }}>{CONTACT.subtitle}</p>
        <div className="h-px my-1 w-24 mx-auto md:mx-0" style={{ background: 'linear-gradient(90deg, #22d3ee, transparent)' }} />
        <div className="flex flex-col gap-1.5 font-mono text-sm text-slate-400">
          <span>📍 {CONTACT.location}</span>
          <span>📞 {CONTACT.phone}</span>
          <a href={`mailto:${CONTACT.email}`} className="hover:underline" style={{ color: '#22d3ee' }}>✉️ {CONTACT.email}</a>
        </div>
        <div className="flex gap-3 mt-2 justify-center md:justify-start flex-wrap" style={{ animation: 'fadeUp 0.6s ease 0.7s both', opacity: 0 }}>
          <a href={`mailto:${CONTACT.email}`}
            className="px-6 py-2.5 rounded-lg font-body font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg"
            style={{ background: '#22d3ee', color: '#0a0f1e', boxShadow: '0 0 20px #22d3ee33' }}>Hire Me</a>
          <a href={CONTACT.github} target="_blank" rel="noreferrer"
            className="px-6 py-2.5 rounded-lg border font-body text-sm transition-all hover:bg-cyan-400/10 hover:scale-105"
            style={{ borderColor: '#22d3ee66', color: '#22d3ee' }}>GitHub ↗</a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer"
            className="px-6 py-2.5 rounded-lg border font-body text-sm transition-all hover:bg-cyan-400/10 hover:scale-105"
            style={{ borderColor: '#22d3ee66', color: '#22d3ee' }}>LinkedIn ↗</a>
        </div>
        {/* Quick stats */}
        <div className="flex gap-6 mt-4 justify-center md:justify-start" style={{ animation: 'fadeIn 0.6s ease 0.9s both', opacity: 0 }}>
          {[
            { value: '4+', label: 'Projects' },
            { value: '1+', label: 'Yr Experience' },
            { value: '4', label: 'Certifications' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center md:items-start">
              <span className="font-display text-3xl leading-none" style={{ color: '#22d3ee' }}>{stat.value}</span>
              <span className="font-mono text-xs text-slate-500 tracking-wide">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── OBJECTIVE ─────────────────────────────────────────────────────────────────

const OPEN_FOR = [
  {
    title: 'Non-Voice Virtual Assistant',
    desc: 'Administrative support, scheduling, inbox management, and task coordination — fully remote.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    color: '#22d3ee',
    tag: 'Remote · Entry Level',
  },
  {
    title: 'Encode / Data Entry',
    desc: 'Accurate and efficient data encoding, spreadsheet management, and database updating.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
      </svg>
    ),
    color: '#a78bfa',
    tag: 'Remote · Entry Level',
  },
  {
    title: 'Junior Video Editor',
    desc: 'Editing short-form content, AI-voiced videos, and simple video productions using basic editing tools.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
      </svg>
    ),
    color: '#ff4444',
    tag: 'Remote · Junior',
  },
  {
    title: 'Junior Web Developer',
    desc: 'Building clean, responsive websites and web apps using React, Tailwind CSS, and JavaScript.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    color: '#4ade80',
    tag: 'Remote · Junior',
  },
];

function ObjectiveSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 md:px-20 pb-0 pt-4">

      {/* ── Objective card ── */}
      <div className="reveal relative rounded-2xl overflow-hidden border border-cyan-400/20 p-8 md:p-10 mb-6"
        style={{ background: 'linear-gradient(135deg, #141c2e 0%, #0d1525 60%, #111827 100%)' }}>

        {/* Background accent */}
        <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, #22d3ee0c, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none"
          style={{ background: 'radial-gradient(circle at bottom left, #a78bfa08, transparent 70%)' }} />

        {/* Label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 max-w-8" style={{ background: '#22d3ee' }} />
          <p className="font-mono text-xs tracking-widest uppercase" style={{ color: '#22d3ee' }}>Objective</p>
        </div>

        {/* Quote mark */}
        <div className="font-display text-8xl leading-none mb-2 select-none"
          style={{ color: '#22d3ee18', lineHeight: 1 }}>"</div>

        {/* Text — broken into two readable paragraphs */}
        <div className="flex flex-col gap-4 relative -mt-6">
          <p className="font-body text-slate-200 leading-relaxed text-lg md:text-xl font-light max-w-3xl">
            Passionate web developer and programmer with a background in{' '}
            <span style={{ color: '#22d3ee' }}>IT, IoT, and mobile app development</span>.
            I build clean, functional, and user-friendly applications — from Flutter mobile apps to React web interfaces.
          </p>
          <p className="font-body text-slate-400 leading-relaxed text-base max-w-2xl">
            I thrive working independently in remote environments and am also open to{' '}
            <span style={{ color: '#a78bfa' }}>Virtual Assistant roles</span> where I can apply my technical
            and organizational skills to support teams effectively.
          </p>
        </div>

        {/* Trait tags */}
        <div className="flex flex-wrap gap-2 mt-8">
          {['Detail-oriented', 'Computer literate', 'Self-motivated', 'Fast learner', 'Remote-ready', 'Team player'].map((t) => (
            <span key={t} className="font-mono text-xs px-3 py-1.5 rounded-full"
              style={{ background: '#22d3ee0d', color: '#22d3ee99', border: '1px solid #22d3ee22' }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Open For section ── */}
      <div className="reveal">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: '0 0 8px #4ade80' }} />
            <p className="font-mono text-xs tracking-widest uppercase text-slate-400">Currently Open For</p>
          </div>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #22d3ee22, transparent)' }} />
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {OPEN_FOR.map((role, i) => (
            <div key={i}
              className="reveal group flex gap-4 p-5 rounded-2xl border transition-all duration-250 overflow-hidden relative"
              style={{
                background: '#141c2e',
                borderColor: 'rgba(34,211,238,0.12)',
                animationDelay: `${i * 60}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = role.color + '55';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 12px 32px ${role.color}14`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(34,211,238,0.12)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>

              {/* Corner glow */}
              <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle at top right, ${role.color}18, transparent 70%)` }} />

              {/* Icon */}
              <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center mt-0.5"
                style={{ background: role.color + '15', color: role.color, border: `1px solid ${role.color}33` }}>
                {role.icon}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-body font-semibold text-white text-sm leading-snug">{role.title}</h4>
                </div>
                <p className="font-body text-slate-400 text-xs leading-relaxed">{role.desc}</p>
                <span className="font-mono text-xs mt-1" style={{ color: role.color + 'aa' }}>{role.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

function SectionHeader({ label, title }) {
  return (
    <div className="reveal mb-12">
      <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: '#22d3ee' }}>{label}</p>
      <h2 className="font-display text-5xl md:text-6xl text-white tracking-wide">{title}</h2>
      <div className="mt-4 w-16 h-0.5" style={{ background: 'linear-gradient(90deg, #22d3ee, transparent)' }} />
    </div>
  );
}

// ─── SKILLS ────────────────────────────────────────────────────────────────────

function SkillsSection() {
  return (
    <section id="skills" className="px-8 md:px-20 py-24 max-w-5xl mx-auto">
      <SectionHeader label="03 / Capabilities" title="Skills" />
      <div className="grid md:grid-cols-2 gap-x-16 gap-y-7">
        {SKILLS_RATED.map((s, i) => (
          <div key={i} className="reveal"><SkillBar name={s.name} score={s.score} delay={i * 60} /></div>
        ))}
      </div>
      <div className="reveal mt-12">
        <p className="font-mono text-slate-400 text-xs tracking-widest uppercase mb-4">Tools & Software</p>
        <div className="flex flex-wrap gap-2">
          {SKILLS_TOOLS.map((t, i) => (
            <span key={i}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-mono tracking-wide cursor-default transition-all hover:scale-105"
              style={{ border: '1px solid #22d3ee44', color: '#22d3ee', background: '#22d3ee11' }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ──────────────────────────────────────────────────────────────────

function ProjectCard({ project, onClick }) {
  const tc = TYPE_CONFIG[project.type] || TYPE_CONFIG.other;
  const icon = TYPE_ICONS[project.type] || TYPE_ICONS.other;
  const hasImages = (project.images || []).filter(Boolean).length > 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className="reveal group w-full text-left rounded-2xl border border-cyan-400/20 flex flex-col overflow-hidden focus:outline-none"
      style={{
        background: '#141c2e',
        transition: 'transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = tc.color + '88';
        e.currentTarget.style.boxShadow = `0 24px 48px ${tc.color}18`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(34,211,238,0.2)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* ── Icon face ── */}
      <div className="w-full flex flex-col items-center justify-center gap-4 py-10 px-6 relative"
        style={{ background: `linear-gradient(135deg, ${tc.color}0d 0%, #0d1525 100%)` }}>
        {/* Glow behind icon */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: `radial-gradient(circle at 50% 50%, ${tc.color}18 0%, transparent 70%)` }} />

        {/* Icon container */}
        <div className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{
            background: tc.color + '15',
            border: `2px solid ${tc.color}44`,
            boxShadow: `0 0 24px ${tc.color}22`,
          }}>
          {icon(tc.color)}
        </div>

        {/* Type badge */}
        <span className="relative z-10 font-mono text-xs px-3 py-1 rounded-full font-semibold"
          style={{ background: tc.color + '20', color: tc.color, border: `1px solid ${tc.color}44` }}>
          {tc.label}
        </span>

        {/* Image count hint */}
        {hasImages && (
          <div className="absolute top-3 right-3 font-mono text-xs flex items-center gap-1"
            style={{ color: tc.color + 'bb' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
            </svg>
            {(project.images || []).filter(Boolean).length} photo{(project.images || []).filter(Boolean).length > 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* ── Info ── */}
      <div className="px-5 py-4 flex flex-col gap-2 flex-1">
        <h3 className="font-body font-semibold text-white text-lg leading-tight">{project.title}</h3>
        <p className="font-body text-slate-400 text-sm leading-relaxed"
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.stack.slice(0, 4).map((s, j) => (
            <span key={j} className="font-mono text-xs px-2 py-0.5 rounded"
              style={{ background: '#0a0f1e', color: '#22d3ee', border: '1px solid #22d3ee1a' }}>{s}</span>
          ))}
          {project.stack.length > 4 && (
            <span className="font-mono text-xs px-2 py-0.5 rounded text-slate-500"
              style={{ background: '#0a0f1e', border: '1px solid #ffffff08' }}>+{project.stack.length - 4}</span>
          )}
        </div>
        {/* Click hint */}
        <p className="font-mono text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ color: tc.color }}>
          {hasImages ? 'Click to view details & photos →' : 'Click to view details →'}
        </p>
      </div>
    </button>
  );
}

function ProjectsSection() {
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const INITIAL_SHOW = 4; // always show first 4 (2×2)
  const visible = showAll ? PROJECTS : PROJECTS.slice(0, INITIAL_SHOW);
  const hasMore = PROJECTS.length > INITIAL_SHOW;

  return (
    <section id="projects" className="py-24">
      <div className="px-6 md:px-20 max-w-5xl mx-auto">
        <SectionHeader label="02 / Work" title="Projects" />

        {/* Grid — 1 col mobile, 2 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {visible.map((p, i) => (
            <div key={i} className="reveal" style={{ animationDelay: `${i * 60}ms` }}>
              <ProjectCard project={p} index={i} onClick={() => setSelected(p)} />
            </div>
          ))}
        </div>

        {/* Show more / less toggle */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl border font-mono text-sm transition-all duration-200 hover:scale-105"
              style={{ borderColor: '#22d3ee44', color: '#22d3ee', background: '#22d3ee0a' }}>
              {showAll ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6"/></svg>
                  Show Less
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                  Show {PROJECTS.length - INITIAL_SHOW} More Project{PROJECTS.length - INITIAL_SHOW > 1 ? 's' : ''}
                </>
              )}
            </button>
          </div>
        )}

        <p className="text-center font-mono text-xs text-slate-600 mt-4">
          click any card to see full details & photos
        </p>
      </div>
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

// ─── EXPERIENCE ────────────────────────────────────────────────────────────────

function ExperienceSection() {
  const [open, setOpen] = useState(0); // first job open by default

  return (
    <section id="experience" className="px-6 md:px-20 py-24 max-w-5xl mx-auto">
      <SectionHeader label="04 / Work History" title="Experience" />
      <div className="flex flex-col gap-3">
        {EXPERIENCE.map((exp, i) => {
          const isOpen = open === i;
          return (
            <div key={i}
              className="reveal rounded-2xl border overflow-hidden transition-all duration-300"
              style={{
                borderColor: isOpen ? '#22d3ee44' : 'rgba(34,211,238,0.12)',
                background: '#141c2e',
                boxShadow: isOpen ? '0 8px 32px rgba(34,211,238,0.08)' : 'none',
              }}>

              {/* ── Header row — always visible, click to toggle ── */}
              <button
                type="button"
                className="w-full flex items-center gap-4 p-5 text-left"
                onClick={() => setOpen(isOpen ? null : i)}>

                {/* Timeline dot */}
                <div className="flex-shrink-0 w-3 h-3 rounded-full border-2 transition-colors duration-300"
                  style={{
                    borderColor: '#22d3ee',
                    background: isOpen ? '#22d3ee' : 'transparent',
                    boxShadow: isOpen ? '0 0 8px #22d3ee' : 'none',
                  }} />

                {/* Role + company */}
                <div className="flex-1 min-w-0">
                  <p className="font-body font-semibold text-white text-sm md:text-base leading-snug">{exp.role}</p>
                  <p className="font-mono text-xs mt-0.5" style={{ color: '#22d3ee' }}>{exp.company}</p>
                </div>

                {/* Period + type badge — hidden on very small screens, shown md+ */}
                <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="font-mono text-slate-500 text-xs">{exp.period}</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded-full"
                    style={{ background: '#22d3ee11', color: '#22d3ee', border: '1px solid #22d3ee33' }}>
                    {exp.type}
                  </span>
                </div>

                {/* Chevron */}
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="#22d3ee" strokeWidth="2" strokeLinecap="round"
                  className="flex-shrink-0 transition-transform duration-300"
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', opacity: 0.7 }}>
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>

              {/* Period on mobile — shown below header when open */}
              {isOpen && (
                <div className="sm:hidden px-5 pb-2 flex items-center gap-2">
                  <span className="font-mono text-slate-500 text-xs">{exp.period}</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded-full"
                    style={{ background: '#22d3ee11', color: '#22d3ee', border: '1px solid #22d3ee33' }}>
                    {exp.type}
                  </span>
                </div>
              )}

              {/* ── Expandable bullet list ── */}
              <div
                style={{
                  maxHeight: isOpen ? '600px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease',
                }}>
                <div className="px-5 pb-5 pt-1 border-t border-cyan-400/10">
                  <ul className="flex flex-col gap-2 mt-3">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2.5 font-body text-slate-400 text-sm leading-relaxed">
                        <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ background: '#22d3ee66' }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Desktop cert grid with show-more toggle
function CertGrid({ onOpen }) {
  const [showAll, setShowAll] = useState(false);
  const INITIAL = 4;
  const visible = showAll ? CERTIFICATIONS : CERTIFICATIONS.slice(0, INITIAL);
  const hasMore = CERTIFICATIONS.length > INITIAL;

  return (
    <div className="hidden sm:block">
      <div className="grid sm:grid-cols-2 gap-4">
        {visible.map((c, i) => (
          <div key={i}
            className="flex gap-4 p-4 rounded-xl border border-cyan-400/10 transition-all duration-200 cursor-pointer group"
            style={{ background: '#141c2e' }}
            onClick={() => onOpen(c)}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#22d3ee55'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(34,211,238,0.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(34,211,238,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            <span className="text-2xl flex-shrink-0 mt-0.5">{c.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-body text-slate-200 text-sm font-medium leading-snug mb-1">{c.title}</p>
              <p className="font-mono text-xs mb-0.5" style={{ color: '#22d3ee' }}>{c.issuer}</p>
              <p className="font-mono text-slate-500 text-xs">{c.date}</p>
            </div>
            <span className="text-slate-600 group-hover:text-cyan-400 transition-colors flex-shrink-0 self-center text-lg">↗</span>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="flex items-center gap-2 px-5 py-2 rounded-xl border font-mono text-xs transition-all duration-200 hover:scale-105"
            style={{ borderColor: '#22d3ee44', color: '#22d3ee', background: '#22d3ee0a' }}>
            {showAll ? (
              <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6"/></svg>Show Less</>
            ) : (
              <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>Show {CERTIFICATIONS.length - INITIAL} More</>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── EDUCATION ─────────────────────────────────────────────────────────────────

function GradCarousel({ photos }) {
  const [current, setCurrent] = useState(0);
  const total = photos.length;

  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % total), 3000);
    return () => clearInterval(id);
  }, [total]);

  if (total === 0) return null;

  return (
    <div className="reveal mt-8">
      <p className="font-mono text-slate-400 text-xs tracking-widest uppercase mb-4">Graduation Photos</p>
      <div className="relative overflow-hidden rounded-2xl border border-cyan-400/20" style={{ background: '#0d1525' }}>
        <div className="relative w-full" style={{ paddingBottom: '56%' }}>
          {photos.map((photo, i) => (
            <img
              key={i}
              src={photo}
              alt={`Graduation ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
              style={{ opacity: i === current ? 1 : 0 }}
            />
          ))}
          {/* Dot indicators overlay */}
          {total > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {photos.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-300"
                  style={{ width: i === current ? '20px' : '6px', height: '6px', background: i === current ? '#22d3ee' : 'rgba(255,255,255,0.4)' }} />
              ))}
            </div>
          )}
        </div>
        {total > 1 && (
          <>
            <button onClick={() => setCurrent((c) => (c - 1 + total) % total)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors"
              style={{ background: 'rgba(10,15,30,0.7)', border: '1px solid #22d3ee33' }}>‹</button>
            <button onClick={() => setCurrent((c) => (c + 1) % total)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors"
              style={{ background: 'rgba(10,15,30,0.7)', border: '1px solid #22d3ee33' }}>›</button>
          </>
        )}
      </div>
      {total > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {photos.map((photo, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className="flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200"
              style={{ width: '56px', height: '40px', border: `2px solid ${i === current ? '#22d3ee' : 'transparent'}`, opacity: i === current ? 1 : 0.5 }}>
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function EducationSection() {
  const [certModal, setCertModal] = useState(null);

  return (
    <section id="education" className="px-8 md:px-20 py-24 max-w-5xl mx-auto">
      <SectionHeader label="05 / Academic & Credentials" title="Education" />

      {/* Degree card with school logo */}
      <div className="reveal rounded-2xl border border-cyan-400/20 p-6 mb-4"
        style={{ background: '#141c2e' }}>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* School logo */}
          <div className="w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 flex items-center justify-center"
            style={{ borderColor: '#22d3ee33', background: '#0d1525' }}>
            {EDUCATION.schoolLogo ? (
              <img src={EDUCATION.schoolLogo} alt="School Logo" className="w-full h-full object-contain p-1" />
            ) : (
              <div className="flex flex-col items-center gap-1 text-center p-2">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.5">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
                {/* Instructions shown in the card when no logo is set */}
                <p className="font-mono leading-tight text-center" style={{ color: '#22d3ee', fontSize: '7px' }}>
                  Save logo to<br/>/public/<br/>set schoolLogo
                </p>
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-body font-semibold text-white text-xl mb-1">{EDUCATION.degree}</h3>
            <p className="font-mono text-sm mb-1" style={{ color: '#22d3ee' }}>{EDUCATION.school}</p>
            <p className="font-mono text-slate-500 text-xs">{EDUCATION.year}</p>
          </div>
        </div>

        {/* Graduation photo carousel — shown below degree info */}
        <GradCarousel photos={EDUCATION.graduationPhotos} />

        {/* Photo instructions when empty */}
        {EDUCATION.graduationPhotos.length === 0 && (
          <div className="mt-5 rounded-xl border border-dashed border-cyan-400/20 p-4 text-center"
            style={{ background: '#0d1525' }}>
            <p className="font-mono text-xs text-slate-500 mb-1">No graduation photos yet</p>
            <p className="font-mono text-xs" style={{ color: '#22d3ee' }}>
              Save photos to /public/ then add them to<br/>
              <span className="text-slate-400">EDUCATION.graduationPhotos</span> in App.jsx<br/>
              Example: <span className="text-slate-300">['/grad-1.jpg', '/grad-2.jpg']</span>
            </p>
          </div>
        )}
      </div>

      {/* ── Certifications ── */}
      <div className="reveal mt-10 mb-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-mono text-slate-400 text-xs tracking-widest uppercase">Certifications & Credentials</p>
            <p className="font-mono text-xs text-slate-600 mt-1 italic">Tap any card to view certificate</p>
          </div>
          <span className="font-mono text-xs text-slate-600">{CERTIFICATIONS.length} total</span>
        </div>

        {/* Mobile: horizontal snap scroll */}
        <div className="sm:hidden -mx-6 px-6">
          <div
            className="flex gap-3 overflow-x-auto pb-3"
            style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
            {CERTIFICATIONS.map((c, i) => (
              <div key={i}
                onClick={() => setCertModal(c)}
                className="flex-shrink-0 flex flex-col gap-3 p-4 rounded-2xl border border-cyan-400/10 cursor-pointer active:scale-95 transition-transform"
                style={{ width: '240px', background: '#141c2e', scrollSnapAlign: 'start' }}>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{c.icon}</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded-full" style={{ background: '#22d3ee11', color: '#22d3ee', border: '1px solid #22d3ee33' }}>
                    {i + 1}/{CERTIFICATIONS.length}
                  </span>
                </div>
                <div>
                  <p className="font-body text-slate-200 text-sm font-medium leading-snug mb-1">{c.title}</p>
                  <p className="font-mono text-xs mb-0.5" style={{ color: '#22d3ee' }}>{c.issuer}</p>
                  <p className="font-mono text-slate-500 text-xs">{c.date}</p>
                </div>
                <p className="font-mono text-xs mt-auto" style={{ color: '#22d3ee66' }}>tap to view ↗</p>
              </div>
            ))}
          </div>
          {/* Scroll hint */}
          <p className="font-mono text-xs text-slate-600 text-center mt-1">← swipe to see all →</p>
        </div>

        {/* Desktop: 2-col grid with show more */}
        <CertGrid onOpen={setCertModal} />
      </div>

      {/* Strengths */}
      <div className="mt-12">
        <p className="reveal font-mono text-slate-400 text-xs tracking-widest uppercase mb-5">Strengths</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {STRENGTHS.map((s, i) => (
            <div key={i} className="reveal flex items-center gap-3 p-4 rounded-xl border border-cyan-400/10 hover:border-cyan-400/30 transition-colors"
              style={{ background: '#141c2e' }}>
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                style={{ background: '#22d3ee11', color: '#22d3ee' }}>✓</span>
              <span className="font-body text-slate-300 text-sm">{s}</span>
            </div>
          ))}
        </div>
      </div>

      {certModal && <CertModal cert={certModal} onClose={() => setCertModal(null)} />}
    </section>
  );
}

// ─── CONTACT ───────────────────────────────────────────────────────────────────

function ContactSection() {
  const [copied, setCopied] = useState(null);

  const copy = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const contactItems = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/>
        </svg>
      ),
      label: 'Email',
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      copyValue: CONTACT.email,
      color: '#22d3ee',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.17 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
        </svg>
      ),
      label: 'Phone',
      value: CONTACT.phone,
      href: `tel:${CONTACT.phone.replace(/\s/g, '')}`,
      copyValue: CONTACT.phone,
      color: '#4ade80',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: 'Location',
      value: 'Dipolog City, Philippines',
      href: null,
      copyValue: CONTACT.location,
      color: '#f472b6',
    },
  ];

  const socialLinks = [
    {
      label: 'GitHub',
      href: CONTACT.github,
      color: '#e2e8f0',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>,
    },
    {
      label: 'LinkedIn',
      href: CONTACT.linkedin,
      color: '#0a66c2',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@OfficialMindMeltShorts',
      color: '#ff4444',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/></svg>,
    },
  ];

  return (
    <section id="contact" className="px-6 md:px-20 py-24 max-w-5xl mx-auto">
      <SectionHeader label="06 / Let's Talk" title="Contact" />

      {/* Availability banner */}
      <div className="reveal flex items-center gap-3 mb-8 p-4 rounded-xl border border-green-400/20"
        style={{ background: '#4ade800a' }}>
        <span className="w-2.5 h-2.5 rounded-full bg-green-400 flex-shrink-0" style={{ boxShadow: '0 0 8px #4ade80' }} />
        <p className="font-mono text-sm text-green-400">Available for work — open to remote roles worldwide</p>
      </div>

      {/* Tagline */}
      <p className="reveal font-body text-slate-400 leading-relaxed text-base mb-8 max-w-xl">
        I'm open to <span style={{ color: '#22d3ee' }}>web development</span>, <span style={{ color: '#22d3ee' }}>programming</span>, and <span style={{ color: '#22d3ee' }}>remote VA roles</span>. Reach out through any channel below — I typically respond within 24 hours.
      </p>

      {/* Contact cards — 3 across on desktop, stacked on mobile */}
      <div className="reveal grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {contactItems.map((item, i) => (
          <div key={i}
            className="relative flex flex-col gap-3 p-5 rounded-2xl border border-cyan-400/10 transition-all duration-200 group overflow-hidden"
            style={{ background: '#141c2e' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = item.color + '55';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 16px 32px ${item.color}14`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(34,211,238,0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
            {/* Glow corner */}
            <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-10 pointer-events-none"
              style={{ background: item.color }} />

            {/* Icon */}
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: item.color + '18', color: item.color, border: `1px solid ${item.color}33` }}>
              {item.icon}
            </div>

            {/* Label + value */}
            <div className="flex-1">
              <p className="font-mono text-xs mb-1" style={{ color: item.color + 'aa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {item.label}
              </p>
              {item.href ? (
                <a href={item.href}
                  className="font-body text-sm text-slate-200 hover:text-white transition-colors break-all leading-snug">
                  {item.value}
                </a>
              ) : (
                <p className="font-body text-sm text-slate-200 break-all leading-snug">{item.value}</p>
              )}
            </div>

            {/* Copy button */}
            <button
              onClick={() => copy(item.copyValue, item.label)}
              className="self-start flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-105"
              style={{ background: item.color + '18', color: item.color, border: `1px solid ${item.color}33` }}>
              {copied === item.label ? (
                <>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                  Copy
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="reveal h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, #22d3ee33, transparent)' }} />

      {/* Social links */}
      <div className="reveal flex flex-col gap-3">
        <p className="font-mono text-slate-500 text-xs tracking-widest uppercase">Find me on</p>
        <div className="flex gap-3 flex-wrap">
          {socialLinks.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border font-mono text-sm font-medium transition-all duration-200 hover:scale-105"
              style={{ borderColor: s.color + '44', color: s.color, background: s.color + '0d' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = s.color + '22'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = s.color + '0d'; }}>
              {s.icon}
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BACK TO TOP ───────────────────────────────────────────────────────────────

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full flex items-center justify-center border font-mono text-sm transition-all duration-300 hover:scale-110"
      style={{
        background: '#141c2e', color: '#22d3ee', borderColor: '#22d3ee44',
        opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.8)',
        boxShadow: visible ? '0 0 16px #22d3ee33' : 'none',
      }}>↑</button>
  );
}

function Footer() {
  return (
    <footer className="px-8 py-6 border-t border-cyan-400/10 flex flex-col md:flex-row items-center justify-between gap-2">
      <span className="font-mono text-slate-600 text-xs">© 2026 Patrick Jason H. Turtor</span>
      <span className="font-mono text-slate-700 text-xs">Built with React + Tailwind CSS</span>
    </footer>
  );
}

// ─── GLOBAL STYLES (injected) ─────────────────────────────────────────────────

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes modalIn {
      from { opacity: 0; transform: scale(0.94) translateY(16px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes floatY {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-10px); }
    }
    @keyframes glowPulse {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50%       { opacity: 0.6; transform: scale(1.05); }
    }
    @keyframes borderGlow {
      0%, 100% { box-shadow: 0 0 20px #22d3ee11, 0 0 40px #22d3ee08; }
      50%       { box-shadow: 0 0 30px #22d3ee33, 0 0 60px #22d3ee18; }
    }
    @keyframes slideFromRight {
      from { opacity: 0; transform: translateX(60px) scale(0.96); }
      to   { opacity: 1; transform: translateX(0) scale(1); }
    }
    @keyframes slideFromLeft {
      from { opacity: 0; transform: translateX(-60px) scale(0.96); }
      to   { opacity: 1; transform: translateX(0) scale(1); }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-32px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes countUp {
      from { opacity: 0; transform: scale(0.85); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes typewriter {
      from { width: 0; }
      to   { width: 100%; }
    }
    .reveal {
      opacity: 0;
      transform: translateY(22px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .reveal-left {
      opacity: 0;
      transform: translateX(-22px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .reveal-left.visible {
      opacity: 1;
      transform: translateX(0);
    }
    .float-photo {
      animation: floatY 6s ease-in-out infinite;
    }
    .glow-ring {
      animation: glowPulse 4s ease-in-out infinite;
    }
    .card-glow:hover {
      animation: borderGlow 2s ease-in-out infinite;
    }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: #0a0f1e; }
    ::-webkit-scrollbar-thumb { background: #22d3ee55; border-radius: 4px; }
    * { scroll-behavior: smooth; }
    ::selection { background: #22d3ee33; color: #fff; }

    /* Staggered card entrance */
    .project-card-0 { animation-delay: 0ms; }
    .project-card-1 { animation-delay: 80ms; }
    .project-card-2 { animation-delay: 160ms; }
    .project-card-3 { animation-delay: 240ms; }
  `}</style>
);

// ─── APP ───────────────────────────────────────────────────────────────────────

export default function App() {
  useReveal();
  return (
    <div className="relative min-h-screen" style={{ background: '#0a0f1e', color: '#e2e8f0', fontFamily: "'DM Sans', sans-serif" }}>
      <GlobalStyles />
      <Particles />
      <div className="relative z-10">
        <NavBar />
        <HeroSection />
        <ObjectiveSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
        <Footer />
        <BackToTop />
      </div>
    </div>
  );
}