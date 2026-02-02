import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface CodeSymbol {
  x: number;
  y: number;
  symbol: string;
  opacity: number;
  speed: number;
  size: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Tech symbols for floating effect
    const symbols = ['</', '/>', '{ }', '( )', '[ ]', '&&', '||', '=>', '++', '--', '::'];
    
    // Initialize particles for network effect
    const particleCount = 60;
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 2 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.4,
      });
    }

    // Initialize floating code symbols
    const codeSymbols: CodeSymbol[] = [];
    for (let i = 0; i < 15; i++) {
      codeSymbols.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        opacity: 0.1 + Math.random() * 0.15,
        speed: 0.2 + Math.random() * 0.3,
        size: 12 + Math.random() * 8,
      });
    }

    const drawGrid = () => {
      const gridSize = 50;
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.03)';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawConnections = () => {
      const maxDistance = 150;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      // Dark gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, '#0a0a0f');
      bgGradient.addColorStop(0.5, '#0d1117');
      bgGradient.addColorStop(1, '#0a0a0f');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle grid
      drawGrid();

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();
      });

      // Draw connections between particles
      drawConnections();

      // Update and draw floating code symbols
      codeSymbols.forEach((symbol) => {
        symbol.y -= symbol.speed;
        
        // Reset position when off screen
        if (symbol.y < -30) {
          symbol.y = canvas.height + 30;
          symbol.x = Math.random() * canvas.width;
        }

        ctx.font = `${symbol.size}px 'Fira Code', monospace`;
        ctx.fillStyle = `rgba(99, 102, 241, ${symbol.opacity})`;
        ctx.fillText(symbol.symbol, symbol.x, symbol.y);
      });

      // Subtle corner glow effects
      const glowGradient1 = ctx.createRadialGradient(0, 0, 0, 0, 0, canvas.width * 0.4);
      glowGradient1.addColorStop(0, 'rgba(59, 130, 246, 0.05)');
      glowGradient1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const glowGradient2 = ctx.createRadialGradient(
        canvas.width, canvas.height, 0,
        canvas.width, canvas.height, canvas.width * 0.4
      );
      glowGradient2.addColorStop(0, 'rgba(99, 102, 241, 0.04)');
      glowGradient2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};

export default ParticleBackground;
