"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

// Import your new Matrix component
import MatrixRain from "@/components/MatrixRain";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // --- Initialize Smooth Scrolling (Lenis) ---
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // --- Interactive Mouse Glow ---
    const handlePointerMove = (e: PointerEvent) => {
      gsap.to(blobRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: "power3.out",
      });
    };
    window.addEventListener("pointermove", handlePointerMove);

    // --- Hero Animation ---
    gsap.from(".hero-animate", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
      delay: 0.2,
    });

    // --- Floating Dock Entrance Animation ---
    gsap.from(".floating-dock", {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      delay: 1,
    });

    // --- Parallax & Reveal for Project Cards ---
    const projectCards = gsap.utils.toArray(".project-card");
    projectCards.forEach((card: any) => {
      gsap.from(card.querySelector(".project-info"), {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(card.querySelector(".project-graphic"), {
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: -50,
        ease: "none",
      });
    });

    // --- Skills Section Fade-in ---
    gsap.from(".skill-pill", {
      scrollTrigger: {
        trigger: ".skills-section",
        start: "top 80%",
      },
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "power1.out",
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      lenis.destroy();
    };
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-transparent min-h-screen text-gray-200 font-sans selection:bg-green-500 selection:text-black overflow-x-hidden relative">
      
      {/* 1. Matrix Rain Background */}
      <MatrixRain />

      {/* 2. Texture Overlay */}
      <div className="noise-overlay"></div>
      
      {/* 3. The Reactive Mouse Blob */}
      <div 
        ref={blobRef} 
        className="fixed top-0 left-0 w-[40rem] h-[40rem] bg-green-500/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0 mix-blend-screen"
      ></div>

      {/* 4. NEW: FLOATING CONTACT DOCK */}
      <div className="floating-dock fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-6 px-8 py-4 bg-black/60 backdrop-blur-md border border-gray-800 rounded-full shadow-[0_0_30px_-5px_rgba(0,255,65,0.1)]">
          {/* GitHub */}
          <a href="https://github.com/Azeem0296" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:-translate-y-1 transition-all duration-300" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
          </a>
          
          <div className="w-[1px] h-6 bg-gray-800"></div>
          
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/mohd-azeem-/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0a66c2] hover:-translate-y-1 transition-all duration-300" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          
          <div className="w-[1px] h-6 bg-gray-800"></div>
          
          {/* Email */}
          <a href="mailto:saifiazeem934@gmail.com" className="text-gray-400 hover:text-green-400 hover:-translate-y-1 transition-all duration-300" aria-label="Email">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </div>
      </div>

      {/* 5. MAIN CONTENT WRAPPER */}
      <div className="relative z-10 pb-32">
        
        {/* --- HERO SECTION --- */}
        <section className="h-screen flex flex-col justify-center px-6 md:px-24 lg:px-32 max-w-7xl mx-auto relative z-10">
          <div className="hero-animate inline-flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-mono text-xs text-green-500 tracking-widest uppercase">System Online</span>
          </div>
          
          <h1 className="hero-animate text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-600 mb-6">
            Mohd Azeem.
          </h1>
          
          <h2 className="hero-animate text-2xl md:text-3xl lg:text-4xl text-gray-400 font-light max-w-3xl mb-8 leading-snug">
            Backend Architect building <span className="text-white font-medium">distributed systems</span> and <span className="text-white font-medium">ML pipelines</span>.
          </h2>
          
          <div className="hero-animate flex flex-wrap gap-4 mt-6">
            <a href="#projects" className="bg-white text-black hover:scale-105 transition-transform duration-300 px-8 py-4 rounded-full font-mono text-sm font-bold shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]">
              Explore Architecture ↓
            </a>
            
            <a 
              href="/resume.pdf" 
              download="Mohd_Azeem_Resume.pdf" 
              className="border border-green-500/50 text-green-400 hover:bg-green-500/10 hover:border-green-400 transition-all duration-300 px-8 py-4 rounded-full font-mono text-sm font-bold flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              [GET] /sys/resume.pdf
            </a>
          </div>
        </section>

        {/* --- PROJECTS SECTION --- */}
        <section id="projects" className="py-32 px-6 md:px-24 lg:px-32 max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col gap-40">
            
            {/* Project 1 */}
            <div className="project-card flex flex-col lg:flex-row gap-16 items-center">
              <div className="project-info lg:w-1/2 order-2 lg:order-1">
                <span className="font-mono text-xs text-green-400 border border-green-500/30 bg-green-500/10 px-3 py-1 rounded-full tracking-wider uppercase mb-6 inline-block">
                  01 // M.Sc. Dissertation
                </span>
                <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
                  Hybrid ML Travel Engine
                </h3>
                <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                  Engineered a recommendation layer utilizing ALS Matrix Factorization and TF-IDF models. Mitigated sparse-matrix constraints to isolate personalization patterns, yielding a 32.6% RMSE improvement over standard KNN baselines.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {["Python", "Scikit-learn", "ALS Filtering", "pandas"].map((tech) => (
                    <span key={tech} className="bg-black/60 backdrop-blur-sm text-gray-300 font-mono text-xs px-4 py-2 rounded-lg border border-gray-800/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="project-graphic lg:w-1/2 w-full aspect-[4/3] bg-gradient-to-br from-black/80 to-black border border-gray-800 backdrop-blur-md rounded-3xl p-8 flex flex-col justify-between font-mono relative overflow-hidden order-1 lg:order-2 shadow-2xl">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-500/10 rounded-full blur-[80px]"></div>
                <div className="text-xs text-gray-500 flex justify-between border-b border-gray-800 pb-3">
                  <span>MODULE: RECSYS</span>
                  <span className="text-green-400">● ACTIVE</span>
                </div>
                <div className="space-y-4 my-auto flex-1 flex flex-col justify-center text-sm">
                  <div className="text-gray-400 flex justify-between items-center bg-black/60 p-3 rounded-lg border border-gray-800/50">
                    <span>Data Matrix Parsed</span>
                    <span className="text-gray-500">500x300</span>
                  </div>
                  <div className="text-gray-400 flex justify-between items-center bg-black/60 p-3 rounded-lg border border-gray-800/50">
                    <span>Latent Dimensions</span>
                    <span className="text-yellow-500">32 Factors</span>
                  </div>
                  <div className="text-green-400 flex justify-between items-center bg-green-500/10 p-3 rounded-lg border border-green-500/20 font-bold">
                    <span>RMSE Target Optimized</span>
                    <span>0.8191</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-card flex flex-col lg:flex-row-reverse gap-16 items-center">
              <div className="project-info lg:w-1/2">
                <span className="font-mono text-xs text-blue-400 border border-blue-500/30 bg-blue-500/10 px-3 py-1 rounded-full tracking-wider uppercase mb-6 inline-block">
                  02 // Live Production
                </span>
                <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
                  Concurrent Validation Engine
                </h3>
                <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                  Architected a token-based entry management infrastructure handling concurrent request loads for 500+ users. Orchestrated validation using Edge micro-routing to guarantee zero validation latency during spike loads.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {["Next.js", "PostgreSQL", "Supabase", "Edge Functions"].map((tech) => (
                    <span key={tech} className="bg-black/60 backdrop-blur-sm text-gray-300 font-mono text-xs px-4 py-2 rounded-lg border border-gray-800/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="project-graphic lg:w-1/2 w-full aspect-[4/3] bg-gradient-to-br from-black/80 to-black backdrop-blur-md border border-gray-800 rounded-3xl p-8 flex flex-col justify-between font-mono relative overflow-hidden shadow-2xl">
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
                <div className="text-xs text-gray-500 flex justify-between border-b border-gray-800 pb-3">
                  <span>SOCKET: VERIFICATION</span>
                  <span className="text-blue-400">HTTP/2 200</span>
                </div>
                <div className="space-y-4 my-auto flex-1 flex flex-col justify-center text-sm">
                  <div className="text-gray-400 flex justify-between items-center bg-black/60 p-3 rounded-lg border border-gray-800/50">
                    <span>Request Decryption</span>
                    <span className="text-green-400">VERIFIED</span>
                  </div>
                  <div className="text-gray-400 flex justify-between items-center bg-black/60 p-3 rounded-lg border border-gray-800/50">
                    <span>Edge Function Trigger</span>
                    <span className="text-blue-400">0.02ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- INTEGRATED EXPERIENCES SECTION --- */}
        <section className="py-24 bg-black/40 backdrop-blur-sm border-t border-b border-gray-950 relative z-10">
          <div className="px-6 md:px-24 lg:px-32 max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <h2 className="text-xs font-mono text-green-400 uppercase tracking-widest">03 // Core Engagements</h2>
              <div className="h-[1px] bg-gray-900 flex-1"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="border border-gray-900 p-8 rounded-2xl bg-black/60 backdrop-blur-md">
                <span className="text-sm font-mono text-gray-500">Dec 2025 - May 2026</span>
                <h4 className="text-xl font-bold text-white mt-1 mb-2">Software Engineer</h4>
                <p className="text-green-400 font-mono text-xs mb-4">Lunar Guide, Inc.</p>
                <ul className="text-gray-400 space-y-2 text-sm leading-relaxed">
                  <li>• Maintained multi-provider microservice workflows handling flights, hotels, and rail layers.</li>
                  <li>• Managed automated webhooks for transactions, accelerating production layer API bounds by 30%.</li>
                </ul>
              </div>

              <div className="border border-gray-900 p-8 rounded-2xl bg-black/60 backdrop-blur-md">
                <span className="text-sm font-mono text-gray-500">May 2025 - Jun 2025</span>
                <h4 className="text-xl font-bold text-white mt-1 mb-2">Full Stack Developer Intern</h4>
                <p className="text-green-400 font-mono text-xs mb-4">Corestone Innovations</p>
                <ul className="text-gray-400 space-y-2 text-sm leading-relaxed">
                  <li>• Maintained validation updates across Admin, Delivery, and User environments via Agile frames.</li>
                  <li>• Deployed cross-functional feature builds, resolving critical integration boundaries.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --- CORE SKILLS --- */}
        <section className="skills-section py-32 px-6 md:px-24 lg:px-32 max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-xs font-mono text-green-400 uppercase tracking-widest">04 // Technology Registry</h2>
            <div className="h-[1px] bg-gray-900 flex-1"></div>
          </div>

          <div className="flex flex-wrap gap-3 max-w-4xl">
            {["Python", "FastAPI", "TypeScript", "Next.js", "React.js", "Docker", "Git", "CI/CD Pipelines", "PostgreSQL", "Supabase Engine", "ALS Matrix Factorization", "TensorFlow", "PyTorch", "Microservices", "Linux Systems", "Asynchronous Processing"].map((skill, index) => (
              <span 
                key={index} 
                className="skill-pill border border-gray-900 bg-black/60 backdrop-blur-md hover:border-green-500/50 hover:text-green-400 px-4 py-2 rounded-xl text-sm font-mono text-gray-300 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* --- TERMINAL FOOTER --- */}
        <footer className="py-20 border-t border-gray-900 relative z-10 flex flex-col items-center justify-center gap-12">
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="mailto:saifiazeem934@gmail.com" 
              className="px-6 py-3 border border-gray-800 hover:border-gray-600 transition-colors font-mono text-xs text-gray-300 flex items-center gap-2"
            >
              <span>↗</span> SAIFIAZEEM934@GMAIL.COM
            </a>
            <a 
              href="https://github.com/Azeem0296" 
              target="_blank"
              className="px-6 py-3 border border-gray-800 hover:border-gray-600 transition-colors font-mono text-xs text-gray-300"
            >
              VIEW SOURCE
            </a>
            <a 
              href="/resume.pdf" 
              download="Mohd_Azeem_Resume.pdf"
              className="px-6 py-3 border border-gray-800 hover:border-gray-600 transition-colors font-mono text-xs text-gray-300"
            >
              DOWNLOAD DATA
            </a>
          </div>

          {/* System Status & Copyright */}
          <div className="w-full max-w-4xl px-6 flex justify-between font-mono text-[10px] text-gray-700 uppercase tracking-widest">
            <span>SYSTEM_HALT // EOF</span>
            <span>© {new Date().getFullYear()} MOHD. AZEEM // ALL RIGHTS RESERVED</span>
          </div>
        </footer> 
      
      </div>
    </main>
  );
}