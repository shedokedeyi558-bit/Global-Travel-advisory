import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, GripHorizontal } from 'lucide-react';
import TravelChat from './TravelChat';

export default function AITravelAssistant({ destination, riskScore }) {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [heroBounds, setHeroBounds] = useState(null);
  const dragRef = useRef(null);

  // Get hero section bounds on mount and on window resize
  useEffect(() => {
    const updateHeroBounds = () => {
      const heroSection = document.querySelector('section');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        setHeroBounds({
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right,
          height: rect.height,
          width: rect.width
        });
      }
    };

    // Initial update
    updateHeroBounds();

    // Update on window resize
    window.addEventListener('resize', updateHeroBounds);
    
    // Also update after a short delay to ensure DOM is fully rendered
    const timer = setTimeout(updateHeroBounds, 500);

    return () => {
      window.removeEventListener('resize', updateHeroBounds);
      clearTimeout(timer);
    };
  }, []);

  const handleMouseDown = (e) => {
    // Only drag if clicking on the window container, not on child elements like buttons or inputs
    if (e.target.closest('.chat-content')) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - buttonPosition.x,
      y: e.clientY - buttonPosition.y
    });
  };

  const handleTouchStart = (e) => {
    // Only drag if touching the window container, not on child elements
    if (e.target.closest('.chat-content')) return;
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({
      x: touch.clientX - buttonPosition.x,
      y: touch.clientY - buttonPosition.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    // Normal sensitivity (1.0x)
    let newX = (e.clientX - dragStart.x);
    let newY = (e.clientY - dragStart.y);
    
    // Use actual hero bounds if available
    if (heroBounds) {
      const windowHeight = 600;
      const windowWidth = 384;
      const padding = 24;
      
      // Calculate max displacement based on hero section bounds
      const maxYDisplacement = -(heroBounds.bottom - windowHeight - padding);
      const maxXDisplacement = -(window.innerWidth - windowWidth - padding);
      
      // Constrain to hero section
      newY = Math.max(maxYDisplacement, Math.min(0, newY));
      newX = Math.max(maxXDisplacement, Math.min(0, newX));
    }
    
    setButtonPosition({
      x: newX,
      y: newY
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    // Normal sensitivity (1.0x)
    let newX = (touch.clientX - dragStart.x);
    let newY = (touch.clientY - dragStart.y);
    
    // Use actual hero bounds if available
    if (heroBounds) {
      const windowHeight = 600;
      const windowWidth = 384;
      const padding = 24;
      
      // Calculate max displacement based on hero section bounds
      const maxYDisplacement = -(heroBounds.bottom - windowHeight - padding);
      const maxXDisplacement = -(window.innerWidth - windowWidth - padding);
      
      // Constrain to hero section
      newY = Math.max(maxYDisplacement, Math.min(0, newY));
      newX = Math.max(maxXDisplacement, Math.min(0, newX));
    }
    
    setButtonPosition({
      x: newX,
      y: newY
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <>
      {/* Floating Chat Button - Fixed bottom right, draggable */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            ref={dragRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={!isDragging ? { scale: 1.1 } : {}}
            whileTap={!isDragging ? { scale: 0.9 } : {}}
            onClick={() => !isDragging && setIsOpen(true)}
            style={{
              position: 'fixed',
              right: `${24 - buttonPosition.x}px`,
              bottom: `${50 - buttonPosition.y}px`,
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
            className="z-50 bg-primary text-black p-2 md:p-4 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
          >
            <MessageCircle size={20} className="md:w-6 md:h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <div
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              position: 'fixed',
              right: `${24 - buttonPosition.x}px`,
              bottom: `${24 - buttonPosition.y}px`,
              zIndex: 50,
              width: 'clamp(252px, 81vw, 345.6px)',
              height: 'clamp(345.6px, 81vh, 540px)',
              pointerEvents: 'auto',
              overflow: 'hidden',
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="w-full h-full shadow-2xl shadow-black/50 rounded-xl overflow-hidden flex flex-col"
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-2 right-2 z-10 w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
              >
                <X size={20} />
              </motion.button>
              
              {/* Chat Interface */}
              <div className="flex-1 overflow-hidden chat-content">
                <TravelChat destination={destination} className="h-full" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}