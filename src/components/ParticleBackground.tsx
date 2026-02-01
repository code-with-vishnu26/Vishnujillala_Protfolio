import { useEffect, useRef } from "react";

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

    const animate = () => {
      // Set canvas background to pure black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw multiple layered pink waves
      const waveCount = 5;
      
      for (let w = 0; w < waveCount; w++) {
        const baseY = canvas.height * 0.6 + (w * 40);
        const amplitude = 15 + (w * 8);
        const frequency = 0.003 - (w * 0.0003);
        const speed = 0.015 + (w * 0.005);
        const alpha = 0.15 - (w * 0.02);
        
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        for (let x = 0; x <= canvas.width; x += 2) {
          const y = baseY + 
            Math.sin(x * frequency + time * speed) * amplitude +
            Math.sin(x * frequency * 2 + time * speed * 1.5) * (amplitude * 0.5) +
            Math.sin(x * frequency * 0.5 + time * speed * 0.7) * (amplitude * 0.3);
          
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        
        // Create gradient for each wave
        const gradient = ctx.createLinearGradient(0, baseY - amplitude, 0, canvas.height);
        gradient.addColorStop(0, `rgba(236, 72, 153, ${alpha})`); // pink-500
        gradient.addColorStop(0.3, `rgba(219, 39, 119, ${alpha * 0.8})`); // pink-600
        gradient.addColorStop(0.6, `rgba(190, 24, 93, ${alpha * 0.5})`); // pink-700
        gradient.addColorStop(1, `rgba(131, 24, 67, ${alpha * 0.2})`); // pink-900
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Add subtle glow effect at the top of waves
      const glowGradient = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.55, 0,
        canvas.width * 0.5, canvas.height * 0.55, canvas.width * 0.6
      );
      glowGradient.addColorStop(0, 'rgba(236, 72, 153, 0.08)');
      glowGradient.addColorStop(0.5, 'rgba(219, 39, 119, 0.03)');
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
