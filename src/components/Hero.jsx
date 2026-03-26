import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import { floatingAnimation } from '../utils/animations';
import aviationImage from '../pictures/Aviation.jpg';

export default function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Preload the image
    const img = new Image();
    img.onload = () => {
      console.log('Aviation.jpg loaded successfully');
      setImageLoaded(true);
    };
    img.onerror = () => {
      console.error('Failed to load Aviation.jpg');
      setImageError(true);
    };
    img.src = aviationImage;
  }, []);

  return (
    <section 
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: window.innerWidth < 768 ? '100px' : '120px',
        paddingBottom: window.innerWidth < 768 ? '40px' : '80px',
        backgroundColor: '#000000',
        zIndex: 1
      }}
    >
      {/* Background Image Layer */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: imageLoaded && !imageError ? `url(${aviationImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -2,
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 1s ease-in-out'
        }}
      >
        {/* Image Overlay */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.6) 100%)'
          }}
        />
      </div>
      
      {/* Fallback Background Gradient */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom right, #18181b, #27272a, #000000)',
          zIndex: -3
        }}
      />
      
      {/* Gradient Overlays */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(212, 175, 55, 0.1), transparent, rgba(0, 0, 0, 0.2))',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0.3), transparent, rgba(0, 0, 0, 0.3))',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />

      {/* Content Container */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '80rem',
          width: '100%',
          paddingLeft: '24px',
          paddingRight: '24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Status Badge */}
        <motion.div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingTop: '6px',
            paddingBottom: '6px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '24px',
            marginTop: '20px'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span style={{ position: 'relative', display: 'flex', height: '8px', width: '8px' }}>
            <span 
              style={{
                position: 'absolute',
                display: 'inline-flex',
                height: '100%',
                width: '100%',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                opacity: 0.75,
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            />
            <span 
              style={{
                position: 'relative',
                display: 'inline-flex',
                borderRadius: '50%',
                height: '8px',
                width: '8px',
                backgroundColor: '#10b981'
              }}
            />
          </span>
          Live updates from 200+ countries
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            maxWidth: '56rem',
            fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.9)',
            marginBottom: '24px',
            lineHeight: 1.2
          }}
        >
          Travel Smarter.
          <br />
          <span style={{ color: '#D4AF37', textShadow: '0 4px 12px rgba(0, 0, 0, 0.9)' }}>
            Travel Safer.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            maxWidth: '42rem',
            marginTop: '24px',
            fontSize: '18px',
            lineHeight: '32px',
            color: '#e2e8f0',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
            marginBottom: '32px'
          }}
        >
          Real-time safety alerts, health advisories, and local intelligence for every corner of the globe. Your peace of mind is our priority.
        </motion.p>

        {/* Search Bar */}
        <SearchBar />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
