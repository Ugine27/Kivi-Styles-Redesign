import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PawTrail() {
  const [paws, setPaws] = useState<{id: string, x: number, y: number, rotation: number, isRight: boolean}[]>([]);
  const [cats, setCats] = useState<{id: string, x: number, y: number, baseAngle: number, runX: number, runY: number}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let currentX = 50;
    let currentY = 100;
    let angle = 0; 
    let isRight = false;
    let pawId = 0;
    
    setTimeout(() => {
      if (containerRef.current) {
        currentX = 50;
        currentY = containerRef.current.clientHeight / 2;
        angle = Math.PI / 8; 
      }
    }, 100);

    const interval = setInterval(() => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      const step = 45;
      let nextX = currentX + Math.cos(angle) * step;
      let nextY = currentY + Math.sin(angle) * step;

      let hitWall = false;
      if (nextX < 40 || nextX > width - 40) {
        angle = Math.PI - angle;
        hitWall = true;
      }
      if (nextY < 40 || nextY > height - 40) {
        angle = -angle;
        hitWall = true;
      }
      
      if (hitWall) {
         nextX = currentX + Math.cos(angle) * step;
         nextY = currentY + Math.sin(angle) * step;
      }

      currentX = nextX;
      currentY = nextY;

      const offset = 16;
      const perpAngle = angle + (isRight ? Math.PI / 2 : -Math.PI / 2);
      const pawX = currentX + Math.cos(perpAngle) * offset;
      const pawY = currentY + Math.sin(perpAngle) * offset;

      const newPaw = { id: `paw-${pawId++}`, x: pawX, y: pawY, rotation: (angle * 180) / Math.PI, isRight };
      
      setPaws(prev => {
        const next = [...prev, newPaw];
        if (next.length > 8) next.shift(); 
        return next;
      });

      isRight = !isRight;
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const handleTouch = () => {
    setPaws(prev => {
      if (prev.length === 0) return prev;
      
      const latestPaw = prev[prev.length - 1];
      const catId = `cat-${Date.now()}`;
      
      // Emoji 🐈 faces left natively. 
      // To face the direction of travel (latestPaw.rotation), add 180.
      const baseAngle = latestPaw.rotation + 180; 
      
      // Opposite direction to run away
      const runAngleRad = (latestPaw.rotation + 180) * (Math.PI / 180);
      
      setCats(catsPrev => [...catsPrev, { 
        id: catId, 
        x: latestPaw.x, 
        y: latestPaw.y, 
        baseAngle,
        runX: Math.cos(runAngleRad) * 800,
        runY: Math.sin(runAngleRad) * 800
      }]);
      
      // Clear the trail so it looks like the cat left
      return [];
    });
    
    // Cleanup the cat after its 2s animation
    setTimeout(() => {
      setCats(prev => prev.slice(1)); 
    }, 2200); 
  };

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 rounded-3xl">
      <AnimatePresence>
        {paws.map(paw => (
          <motion.div
            key={paw.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.8 }}
            className="absolute text-3xl pointer-events-auto cursor-pointer select-none"
            style={{ 
              left: paw.x, 
              top: paw.y, 
              marginLeft: '-1.5rem',
              marginTop: '-1.5rem',
              transform: `rotate(${paw.rotation + 90}deg)` 
            }}
            onMouseEnter={handleTouch}
            onClick={handleTouch}
            onTouchStart={handleTouch}
          >
            🐾
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {cats.map(cat => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 0.5, x: 0, y: 0, rotate: cat.baseAngle }}
            animate={{ 
               opacity: [0, 1,   1,   1,     0], 
               scale:   [0.5, 1.2, 1.2, 1.2,   1.2],
               rotate:  [cat.baseAngle, cat.baseAngle, cat.baseAngle, cat.baseAngle - 180, cat.baseAngle - 180],
               x:       [0, 0,   0,   0,     cat.runX],
               y:       [0, 0,   0,   0,     cat.runY]
            }}
            transition={{ 
               duration: 2, 
               times: [0, 0.1, 0.4, 0.5, 1],
               ease: "easeInOut" 
            }}
            className="absolute text-6xl pointer-events-none drop-shadow-2xl z-50 select-none"
            style={{ 
              left: cat.x, 
              top: cat.y, 
              marginLeft: '-2rem', 
              marginTop: '-2rem',
              transformOrigin: 'center center'
            }}
          >
            🐈
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
