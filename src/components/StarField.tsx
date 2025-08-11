import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  clusterId?: number;
  isClusterCenter?: boolean;
}

interface StarCluster {
  id: number;
  centerX: number;
  centerY: number;
  vx: number;
  vy: number;
  radius: number;
  starCount: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  size: number;
  tailLength: number;
  life: number;
  maxLife: number;
  opacity: number;
}

interface StarFieldProps {
  intensity?: 'low' | 'medium' | 'high';
  meteors?: boolean;
}

export const StarField: React.FC<StarFieldProps> = ({ 
  intensity = 'medium', 
  meteors = true 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);
  const clustersRef = useRef<StarCluster[]>([]);
  const meteorsRef = useRef<Meteor[]>([]);
  const lastMeteorTime = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateStars();
    };

    const generateStars = () => {
      const area = canvas.width * canvas.height;
      const densityMap = { low: 12000, medium: 8000, high: 5000 };
      const starCount = Math.floor(area / densityMap[intensity]);
      
      // Generate star clusters (15-25% of total stars will be in clusters)
      const clusterCount = Math.floor(starCount * 0.05); // 5% of stars become cluster centers
      clustersRef.current = Array.from({ length: clusterCount }, (_, i) => ({
        id: i,
        centerX: Math.random() * canvas.width,
        centerY: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.03, // Even slower cluster movement
        vy: (Math.random() - 0.5) * 0.03,
        radius: 50 + Math.random() * 100, // Cluster radius 50-150px
        starCount: 8 + Math.floor(Math.random() * 15), // 8-22 stars per cluster
      }));

      const stars: Star[] = [];
      
      // Generate clustered stars
      clustersRef.current.forEach(cluster => {
        for (let i = 0; i < cluster.starCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * cluster.radius;
          const x = cluster.centerX + Math.cos(angle) * distance;
          const y = cluster.centerY + Math.sin(angle) * distance;
          
          // Ensure stars stay within canvas bounds
          if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
            stars.push({
              x,
              y,
              vx: cluster.vx + (Math.random() - 0.5) * 0.02, // Cluster velocity + small random
              vy: cluster.vy + (Math.random() - 0.5) * 0.02,
              size: Math.random() * 2 + 0.5,
              opacity: Math.random() * 0.6 + 0.4, // Clustered stars slightly brighter
              twinkleSpeed: Math.random() * 0.02 + 0.01,
              twinkleOffset: Math.random() * Math.PI * 2,
              clusterId: cluster.id,
              isClusterCenter: i === 0,
            });
          }
        }
      });

      // Generate individual wandering stars
      const individualStarCount = starCount - stars.length;
      for (let i = 0; i < individualStarCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.08, // Individual stars move more slowly
          vy: (Math.random() - 0.5) * 0.08,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
      
      starsRef.current = stars;
    };

    const createMeteor = () => {
      const meteorTypes = [
        // Top-left to bottom-right
        { startX: () => Math.random() * (canvas.width * 0.3), startY: () => -50, vx: 2 + Math.random() * 3, vy: 3 + Math.random() * 2 },
        // Top-right to bottom-left  
        { startX: () => canvas.width * 0.7 + Math.random() * (canvas.width * 0.3), startY: () => -50, vx: -(2 + Math.random() * 3), vy: 3 + Math.random() * 2 },
        // Left to right
        { startX: () => -50, startY: () => Math.random() * (canvas.height * 0.6), vx: 4 + Math.random() * 2, vy: 1 + Math.random() * 2 },
        // Right to left
        { startX: () => canvas.width + 50, startY: () => Math.random() * (canvas.height * 0.6), vx: -(4 + Math.random() * 2), vy: 1 + Math.random() * 2 },
        // Top-center diagonal
        { startX: () => canvas.width * 0.3 + Math.random() * (canvas.width * 0.4), startY: () => -50, vx: (Math.random() - 0.5) * 4, vy: 3 + Math.random() * 2 },
        // Bottom-left to top-right (rare)
        { startX: () => Math.random() * (canvas.width * 0.2), startY: () => canvas.height + 50, vx: 2 + Math.random() * 2, vy: -(2 + Math.random() * 3) },
      ];
      
      const meteorType = meteorTypes[Math.floor(Math.random() * meteorTypes.length)];
      const size = 2 + Math.random() * 3; // Random size between 2-5px
      const speed = 0.8 + Math.random() * 0.4; // Speed multiplier
      
      meteorsRef.current.push({
        x: meteorType.startX(),
        y: meteorType.startY(),
        vx: meteorType.vx * speed,
        vy: meteorType.vy * speed,
        speed: speed,
        size: size,
        tailLength: 80 + Math.random() * 60, // Random tail length 80-140px
        life: 0,
        maxLife: 120 + Math.random() * 120, // Random lifetime 120-240 frames
        opacity: 0.7 + Math.random() * 0.3, // Random opacity 0.7-1.0
      });
    };

    const animate = (currentTime: number) => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update cluster positions
      clustersRef.current.forEach(cluster => {
        cluster.centerX += cluster.vx;
        cluster.centerY += cluster.vy;
        
        // Wrap clusters around screen edges
        if (cluster.centerX < -cluster.radius) cluster.centerX = canvas.width + cluster.radius;
        if (cluster.centerX > canvas.width + cluster.radius) cluster.centerX = -cluster.radius;
        if (cluster.centerY < -cluster.radius) cluster.centerY = canvas.height + cluster.radius;
        if (cluster.centerY > canvas.height + cluster.radius) cluster.centerY = -cluster.radius;
      });

      // Draw stars
      starsRef.current.forEach((star, index) => {
        // Update star position
        star.x += star.vx;
        star.y += star.vy;
        
        // If star is part of a cluster, update its position relative to cluster center
        if (star.clusterId !== undefined) {
          const cluster = clustersRef.current[star.clusterId];
          if (cluster) {
            // Add slight orbital motion around cluster center
            const dx = star.x - cluster.centerX;
            const dy = star.y - cluster.centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0) {
              const orbitalSpeed = 0.0003; // Much slower orbital motion
              const angle = Math.atan2(dy, dx) + orbitalSpeed;
              star.x = cluster.centerX + Math.cos(angle) * distance;
              star.y = cluster.centerY + Math.sin(angle) * distance;
            }
          }
        }
        
        // Wrap individual stars around screen edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
        
        const twinkle = Math.sin(currentTime * star.twinkleSpeed + star.twinkleOffset);
        const alpha = star.opacity + twinkle * 0.3;
        
        // Cluster center stars are slightly more prominent
        const brightness = star.isClusterCenter ? 1.2 : 1;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, alpha * brightness))})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add subtle glow for cluster center stars
        if (star.isClusterCenter) {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.1})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Create meteors
      if (meteors && currentTime - lastMeteorTime.current > (2000 + Math.random() * 4000)) {
        createMeteor();
        lastMeteorTime.current = currentTime;
      }

      // Draw meteors
      meteorsRef.current.forEach((meteor, index) => {
        meteor.life++;
        meteor.x += meteor.vx;
        meteor.y += meteor.vy;

        // Draw meteor trail
        const gradient = ctx.createLinearGradient(
          meteor.x,
          meteor.y,
          meteor.x - meteor.vx * (meteor.tailLength / meteor.speed),
          meteor.y - meteor.vy * (meteor.tailLength / meteor.speed)
        );
        
        const alpha = (1 - (meteor.life / meteor.maxLife)) * meteor.opacity;
        gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${alpha * 0.6})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = meteor.size * 0.8;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(
          meteor.x - meteor.vx * (meteor.tailLength / meteor.speed),
          meteor.y - meteor.vy * (meteor.tailLength / meteor.speed)
        );
        ctx.stroke();

        // Draw meteor head
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, meteor.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add bright core
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 1.5})`;
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, meteor.size * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Remove dead meteors
        if (meteor.life >= meteor.maxLife || 
            meteor.x > canvas.width + 100 || meteor.x < -100 ||
            meteor.y > canvas.height + 100 || meteor.y < -100) {
          meteorsRef.current.splice(index, 1);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [intensity, meteors]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'radial-gradient(ellipse at center, #111111 0%, #000000 100%)' }}
    />
  );
};