
import React, { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Particle settings
    const particlesArray: Particle[] = [];
    const numberOfParticles = Math.min(width * height * 0.00005, 100); // Limit particles based on screen size
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        
        // Purple and teal color palette
        const colors = ["#9b87f5", "#7e69ab", "#6e59a5", "#0ea5e9", "#38bdf8"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > width || this.x < 0) {
          this.speedX = -this.speedX;
        }

        if (this.y > height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }

    function connectParticles() {
      if (!ctx) return;
      
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) { // Connection distance
            ctx.beginPath();
            ctx.strokeStyle = particlesArray[i].color;
            ctx.globalAlpha = 0.2 * (1 - distance / 100); // Fade with distance
            ctx.lineWidth = 0.8;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      if (!ctx) return;
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);
      
      particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connectParticles();
    }

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section id="home" className="h-screen relative flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="particles-bg"
        aria-hidden="true"
      />
      
      <div className="z-10 text-center max-w-3xl mx-auto px-4 animate-fade-in flex flex-col items-center">
        <div className="mb-8">
          <Avatar className="w-40 h-40 border-4 border-accent/30 shadow-xl shadow-accent/20 animate-scale-in">
            <AvatarImage src="src/static/imgg.jpg" alt="Paritosh Sharma" />
            <AvatarFallback className="text-4xl bg-accent/10 text-accent">JD</AvatarFallback>
          </Avatar>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="block">Hi, I'm </span>
          <span className="gradient-text">Paritosh Sharma</span>
        </h1>
        
        <h2 className="text-xl md:text-2xl mb-8 text-foreground/80">
          Senior Data Scientist & AI Engineer building intelligent, scalable, and impactful AI systems
        </h2>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="#contact" className="btn-outline">Get In Touch</a>
        </div>
      </div>
      
      <a 
        href="#about" 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float"
        aria-label="Scroll down"
      >
        <ArrowDown className="text-foreground/60 h-8 w-8" />
      </a>
    </section>
  );
}
