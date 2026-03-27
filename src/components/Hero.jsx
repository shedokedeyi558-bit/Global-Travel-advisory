import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import aviationImage from '../pictures/Aviation.jpg';

export default function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
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
        backgroundColor: '#0f0f0f',
        zIndex: 1
      }}
    >
      {/* Background Image */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: imageLoaded ? `url(${aviationImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -2,
          opacity: imageLoaded ? 0.3 : 0,
          transition: 'opacity 1s ease-in-out'
        }}
      />
      
      {/* Overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.8) 0%, rgba(15, 15, 15, 0.9) 100%)',
          zIndex: -1
        }}
      />

      {/* Content */}
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
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            maxWidth: '56rem',
            fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            marginBottom: '24px',
            lineHeight: 1.2
          }}
        >
          Travel Smarter.
          <br />
          <span style={{ color: '#0b50da' }}>
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
            color: '#b0b0b0',
            marginBottom: '32px'
          }}
        >
          Real-time safety alerts, health advisories, and local intelligence for every corner of the globe. Your peace of mind is our priority.
        </motion.p>

        {/* Search Bar */}
        <SearchBar />
      </div>
    </section>
  );
}
