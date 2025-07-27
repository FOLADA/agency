
import { useEffect, useState, useCallback } from 'react';

interface CustomCursorProps {
  mousePosition: { x: number; y: number };
}

const CustomCursor = ({ mousePosition }: CustomCursorProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    // Add event listeners for hover states with throttling
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], .cursor-pointer');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [handleMouseEnter, handleMouseLeave]);

  useEffect(() => {
    // Optimized trail effect with fewer trails
    const newTrail = {
      x: mousePosition.x,
      y: mousePosition.y,
      id: Date.now()
    };

    setTrails(prev => [newTrail, ...prev.slice(0, 4)]); // Reduced from 8 to 4
  }, [mousePosition.x, mousePosition.y]);

  return (
    <>
      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-all duration-150 ease-out ${
          isHovering ? 'scale-125' : 'scale-100'
        }`}
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
          transform: 'translate3d(0, 0, 0)'
        }}
      >
        <div className={`w-3 h-3 rounded-full transition-all duration-150 ${
          isHovering 
            ? 'bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg shadow-amber-400/50' 
            : 'bg-gradient-to-r from-blue-400 to-purple-500 shadow-md shadow-blue-400/30'
        }`} />
      </div>

      {/* Simplified cursor trails */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: trail.x - 1,
            top: trail.y - 1,
            opacity: Math.max(0.1, 0.6 - (index * 0.2)),
            transform: `scale(${Math.max(0.3, 1 - (index * 0.2))})`
          }}
        >
          <div className={`w-2 h-2 rounded-full transition-opacity duration-300 ${
            isHovering ? 'bg-amber-400/40' : 'bg-blue-400/40'
          }`} />
        </div>
      ))}

      {/* Outer ring */}
      <div
        className="fixed pointer-events-none z-[9997] transition-all duration-200 ease-out"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
      >
        <div className={`w-8 h-8 rounded-full border transition-all duration-200 ${
          isHovering 
            ? 'border-amber-400/60 scale-150' 
            : 'border-blue-400/30 scale-100'
        }`} />
      </div>
    </>
  );
};

export default CustomCursor;
