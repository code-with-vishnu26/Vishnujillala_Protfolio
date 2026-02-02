import { useEffect, useRef } from "react";

interface Fish {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  tailPhase: number;
  direction: number;
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

    let time = 0;

    // Fish colors that complement blue-pink waves
    const fishColors = [
      'rgba(255, 215, 0, 0.8)',    // Gold
      'rgba(255, 165, 0, 0.8)',    // Orange
      'rgba(0, 255, 255, 0.7)',    // Cyan
      'rgba(64, 224, 208, 0.8)',   // Turquoise
      'rgba(255, 182, 193, 0.8)',  // Light pink
      'rgba(173, 216, 230, 0.8)', // Light blue
    ];

    // Initialize fish
    const fishCount = 12;
    const fishes: Fish[] = [];
    
    for (let i = 0; i < fishCount; i++) {
      fishes.push({
        x: Math.random() * canvas.width,
        y: canvas.height * 0.55 + Math.random() * canvas.height * 0.35,
        size: 8 + Math.random() * 12,
        speed: 0.3 + Math.random() * 0.5,
        color: fishColors[Math.floor(Math.random() * fishColors.length)],
        tailPhase: Math.random() * Math.PI * 2,
        direction: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const drawFish = (fish: Fish, time: number) => {
      const { x, y, size, color, tailPhase, direction } = fish;
      const tailWag = Math.sin(time * 0.08 + tailPhase) * 0.3;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(direction, 1);
      
      // Fish body (ellipse)
      ctx.beginPath();
      ctx.ellipse(0, 0, size, size * 0.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      // Fish tail
      ctx.beginPath();
      ctx.moveTo(-size * 0.8, 0);
      ctx.lineTo(-size * 1.5, -size * 0.5 + tailWag * size);
      ctx.lineTo(-size * 1.5, size * 0.5 + tailWag * size);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      
      // Fish eye
      ctx.beginPath();
      ctx.arc(size * 0.4, -size * 0.1, size * 0.12, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fill();
      
      // Fish fin (top)
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.4);
      ctx.lineTo(-size * 0.3, -size * 0.8);
      ctx.lineTo(-size * 0.5, -size * 0.3);
      ctx.closePath();
      ctx.fillStyle = color.replace('0.8', '0.6').replace('0.7', '0.5');
      ctx.fill();
      
      ctx.restore();
    };

    const animate = () => {
      // Set canvas background to pure black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw multiple layered waves with blue and pink
      const waveCount = 5;
      
      for (let w = 0; w < waveCount; w++) {
        const baseY = canvas.height * 0.65 + (w * 35);
        const amplitude = 12 + (w * 6);
        const frequency = 0.002 - (w * 0.0002);
        const speed = 0.004 + (w * 0.001);
        const alpha = 0.18 - (w * 0.025);
        
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        for (let x = 0; x <= canvas.width; x += 2) {
          const y = baseY + 
            Math.sin(x * frequency + time * speed) * amplitude +
            Math.sin(x * frequency * 2 + time * speed * 1.3) * (amplitude * 0.4) +
            Math.sin(x * frequency * 0.5 + time * speed * 0.5) * (amplitude * 0.25);
          
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        
        // Create gradient with blue to pink transition
        const gradient = ctx.createLinearGradient(0, baseY - amplitude, canvas.width, canvas.height);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${alpha})`);
        gradient.addColorStop(0.3, `rgba(99, 102, 241, ${alpha * 0.9})`);
        gradient.addColorStop(0.5, `rgba(168, 85, 247, ${alpha * 0.7})`);
        gradient.addColorStop(0.7, `rgba(236, 72, 153, ${alpha * 0.6})`);
        gradient.addColorStop(1, `rgba(190, 24, 93, ${alpha * 0.3})`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Update and draw fish
      fishes.forEach((fish) => {
        // Move fish
        fish.x += fish.speed * fish.direction;
        
        // Add slight vertical wave motion
        fish.y += Math.sin(time * 0.02 + fish.tailPhase) * 0.3;
        
        // Wrap around screen
        if (fish.direction === 1 && fish.x > canvas.width + fish.size * 2) {
          fish.x = -fish.size * 2;
          fish.y = canvas.height * 0.55 + Math.random() * canvas.height * 0.35;
        } else if (fish.direction === -1 && fish.x < -fish.size * 2) {
          fish.x = canvas.width + fish.size * 2;
          fish.y = canvas.height * 0.55 + Math.random() * canvas.height * 0.35;
        }
        
        drawFish(fish, time);
      });

      // Add subtle glow effect with blue-pink gradient
      const glowGradient = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.6, 0,
        canvas.width * 0.5, canvas.height * 0.6, canvas.width * 0.7
      );
      glowGradient.addColorStop(0, 'rgba(59, 130, 246, 0.06)');
      glowGradient.addColorStop(0.4, 'rgba(168, 85, 247, 0.04)');
      glowGradient.addColorStop(0.7, 'rgba(236, 72, 153, 0.02)');
      glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 1;
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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 bg-black" />;
};

export default ParticleBackground;
