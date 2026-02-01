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

      // Draw multiple layered waves with blue and pink
      const waveCount = 5;
      
      for (let w = 0; w < waveCount; w++) {
        const baseY = canvas.height * 0.65 + (w * 35);
        const amplitude = 12 + (w * 6);
        const frequency = 0.002 - (w * 0.0002);
        const speed = 0.004 + (w * 0.001); // Much slower speed
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
        gradient.addColorStop(0, `rgba(59, 130, 246, ${alpha})`); // blue-500
        gradient.addColorStop(0.3, `rgba(99, 102, 241, ${alpha * 0.9})`); // indigo-500
        gradient.addColorStop(0.5, `rgba(168, 85, 247, ${alpha * 0.7})`); // purple-500
        gradient.addColorStop(0.7, `rgba(236, 72, 153, ${alpha * 0.6})`); // pink-500
        gradient.addColorStop(1, `rgba(190, 24, 93, ${alpha * 0.3})`); // pink-700
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Add subtle glow effect with blue-pink gradient
      const glowGradient = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.6, 0,
        canvas.width * 0.5, canvas.height * 0.6, canvas.width * 0.7
      );
      glowGradient.addColorStop(0, 'rgba(59, 130, 246, 0.06)'); // blue glow
      glowGradient.addColorStop(0.4, 'rgba(168, 85, 247, 0.04)'); // purple
      glowGradient.addColorStop(0.7, 'rgba(236, 72, 153, 0.02)'); // pink
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
