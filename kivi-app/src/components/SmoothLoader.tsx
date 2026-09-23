import { motion } from 'framer-motion';

export default function SmoothLoader({ text, color = 'orange', size = 'sm' }: { text?: string, color?: 'orange' | 'red' | 'amber', size?: 'sm' | 'md' }) {
  const dotVariants = {
    initial: { y: 0, opacity: 0.3 },
    animate: { y: [-3, 3, -3], opacity: [0.3, 1, 0.3] },
  };

  const transitionConfig = {
    duration: 1.2,
    ease: "easeInOut",
    repeat: Infinity,
  };

  const colors = {
    orange: 'bg-orange-400',
    red: 'bg-red-400',
    amber: 'bg-amber-400',
  };
  
  const textColors = {
    orange: 'text-orange-400',
    red: 'text-red-400',
    amber: 'text-amber-400',
  };

  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';

  return (
    <div className={`flex items-center gap-2 ${textColors[color]}`}>
      {text && <span className="font-medium text-xs tracking-wide">{text}</span>}
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`rounded-full ${dotSize} ${colors[color]}`}
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={{
              ...transitionConfig,
              delay: i * 0.15,
            }}
            style={{ willChange: 'transform, opacity' }}
          />
        ))}
      </div>
    </div>
  );
}
