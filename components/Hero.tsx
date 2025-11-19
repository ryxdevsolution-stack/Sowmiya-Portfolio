'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [colorSwatches, setColorSwatches] = useState<any[]>([]);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Add trail particle
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
        // Keep only last 10 particles
        return newTrail.slice(-10);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Initialize color swatches on client side only
    setColorSwatches([
      { color: '#8b5cf6', x: 5, y: 30, label: 'Primary' },
      { color: '#d946ef', x: 5, y: 45, label: 'Accent' },
      { color: '#06b6d4', x: 5, y: 60, label: 'Cyan' },
    ]);
  }, []);

  const titles = [
    'UI/UX Designer',
    'Graphic Designer',
    'Frontend Developer',
    'Creative Designer',
  ];

  const [currentTitle, setCurrentTitle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Floating shapes animation - using state to avoid SSR issues
  const [floatingShapes, setFloatingShapes] = useState<any[]>([]);

  useEffect(() => {
    // Initialize floating shapes on client side only
    setFloatingShapes([
      { size: 'w-16 h-16', color: 'bg-purple-400/30', delay: 0, duration: 20, initialX: Math.random() * 100, initialY: Math.random() * 100 },
      { size: 'w-24 h-24', color: 'bg-pink-400/30', delay: 2, duration: 25, initialX: Math.random() * 100, initialY: Math.random() * 100 },
      { size: 'w-20 h-20', color: 'bg-blue-400/30', delay: 4, duration: 22, initialX: Math.random() * 100, initialY: Math.random() * 100 },
      { size: 'w-12 h-12', color: 'bg-accent-400/30', delay: 1, duration: 18, initialX: Math.random() * 100, initialY: Math.random() * 100 },
      { size: 'w-32 h-32', color: 'bg-primary-400/20', delay: 3, duration: 28, initialX: Math.random() * 100, initialY: Math.random() * 100 },
    ]);
  }, []);

  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
    },
    text: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      scale: 1.5,
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-purple-50 to-pink-50 dark:from-dark-950 dark:via-dark-900 dark:to-dark-950 cursor-none px-2 sm:px-4"
      onMouseEnter={() => setCursorVariant('default')}
    >
      {/* Custom Animated Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        <div className="w-full h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full opacity-70" />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-50 bg-white rounded-full"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 35 }}
      />

      {/* Cursor Trail */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed w-1 h-1 pointer-events-none z-40 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
          initial={{
            x: point.x,
            y: point.y,
            opacity: 0.6,
            scale: 1,
          }}
          animate={{
            opacity: 0,
            scale: 0.5,
          }}
          transition={{ duration: 0.5 }}
          style={{
            left: -2,
            top: -2,
          }}
        />
      ))}
      {/* Enhanced Grid Background with Depth */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Radial Gradient Overlays for Depth */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(217, 70, 239, 0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Figma-style UI Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Corner Frames - Figma Artboard Style */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 border-2 border-primary-400/30 rounded-lg"
          animate={{ rotate: [0, 5, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-32 w-24 h-24 border-2 border-accent-400/30 rounded-full"
          animate={{ rotate: [0, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-32 left-40 w-40 h-40 border-2 border-purple-400/30"
          animate={{ rotate: [0, 45, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        {/* Selection Handles */}
        {[
          { top: '15%', left: '10%' },
          { top: '25%', right: '15%' },
          { bottom: '20%', left: '20%' },
          { bottom: '30%', right: '25%' }
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-primary-500 rounded-full shadow-lg"
            style={pos}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              delay: i * 0.5,
              repeat: Infinity
            }}
          />
        ))}

        {/* Measurement Lines - Figma Style */}
        <motion.div
          className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-400/40 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-400/40 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute top-0 bottom-0 left-1/4 w-px bg-gradient-to-b from-transparent via-purple-400/40 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 bottom-0 right-1/4 w-px bg-gradient-to-b from-transparent via-pink-400/40 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        />

        {/* Vector Path Indicators */}
        <svg className="absolute top-1/3 right-1/3 w-40 h-40 opacity-20">
          <motion.path
            d="M 20 20 Q 60 0 100 20 T 180 20"
            stroke="url(#pathGradient)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            animate={{ strokeDashoffset: [0, 20] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <defs>
            <linearGradient id="pathGradient">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
          </defs>
        </svg>

        {/* Abstract Floating Design Elements */}
        <motion.div
          className="absolute top-20 left-12 w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-400/20 to-accent-400/20 backdrop-blur-sm border border-white/10 rotate-12"
          animate={{
            y: [0, -20, 0],
            rotate: [12, 22, 12],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <motion.div
          className="absolute top-1/3 right-16 w-32 h-32"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative w-full h-full">
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary-400/30"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border-2 border-accent-400/30"
              animate={{ scale: [1.2, 1, 1.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
            </div>
          </div>
        </motion.div>

        {/* Abstract Shape Cluster - Left */}
        <motion.div className="absolute bottom-32 left-20">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-400/20 backdrop-blur-sm"
              style={{
                left: `${i * 20}px`,
                top: `${i * 15}px`,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>

        {/* Minimalist Geometric Art - Right */}
        <motion.div className="absolute top-1/4 right-1/4">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <motion.circle
              cx="60"
              cy="60"
              r="40"
              fill="none"
              stroke="url(#circleGradient)"
              strokeWidth="2"
              strokeDasharray="10,5"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              style={{ originX: "60px", originY: "60px" }}
            />
            <motion.polygon
              points="60,20 100,100 20,100"
              fill="none"
              stroke="url(#triangleGradient)"
              strokeWidth="2"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ originX: "60px", originY: "60px" }}
            />
            <defs>
              <linearGradient id="circleGradient">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#d946ef" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="triangleGradient">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Flowing Curves - Bottom Right */}
        <motion.div className="absolute bottom-20 right-32">
          <svg width="200" height="100" viewBox="0 0 200 100">
            <motion.path
              d="M 0 50 Q 50 10, 100 50 T 200 50"
              stroke="url(#curveGradient1)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M 0 50 Q 50 10, 100 50 T 200 50",
                  "M 0 50 Q 50 90, 100 50 T 200 50",
                  "M 0 50 Q 50 10, 100 50 T 200 50",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M 0 60 Q 50 20, 100 60 T 200 60"
              stroke="url(#curveGradient2)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M 0 60 Q 50 20, 100 60 T 200 60",
                  "M 0 60 Q 50 100, 100 60 T 200 60",
                  "M 0 60 Q 50 20, 100 60 T 200 60",
                ],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <defs>
              <linearGradient id="curveGradient1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#d946ef" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="curveGradient2">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Scattered Dots Pattern */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${10 + (i * 7) % 80}%`,
                top: `${15 + (i * 11) % 70}%`,
                background: `linear-gradient(135deg, rgba(139, 92, 246, ${0.1 + (i % 3) * 0.1}), rgba(217, 70, 239, ${0.1 + (i % 3) * 0.1}))`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Figma-style Connector Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <motion.line
            x1="10%"
            y1="30%"
            x2="90%"
            y2="30%"
            stroke="url(#lineGradient1)"
            strokeWidth="1"
            strokeDasharray="4,4"
            animate={{ strokeDashoffset: [0, 8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.line
            x1="50%"
            y1="10%"
            x2="50%"
            y2="90%"
            stroke="url(#lineGradient2)"
            strokeWidth="1"
            strokeDasharray="4,4"
            animate={{ strokeDashoffset: [0, 8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
          <defs>
            <linearGradient id="lineGradient1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGradient2">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient blobs - MORE VISIBLE */}
        <motion.div
          animate={{
            x: mousePosition.x / 50,
            y: mousePosition.y / 50,
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            x: { type: 'spring', stiffness: 50 },
            y: { type: 'spring', stiffness: 50 },
            scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          }}
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary-500/40 to-purple-500/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: -mousePosition.x / 40,
            y: -mousePosition.y / 40,
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            x: { type: 'spring', stiffness: 50 },
            y: { type: 'spring', stiffness: 50 },
            scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
          }}
          className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-l from-accent-500/50 to-pink-500/50 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: mousePosition.x / 60,
            y: -mousePosition.y / 60,
            scale: [1, 1.1, 1],
            rotate: [0, 360, 0],
          }}
          transition={{
            x: { type: 'spring', stiffness: 50 },
            y: { type: 'spring', stiffness: 50 },
            scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-3xl"
        />

        {/* Additional eye-catching blobs */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-yellow-400/40 to-orange-500/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-tl from-cyan-400/40 to-blue-500/40 rounded-full blur-3xl"
        />

        {/* Floating shapes */}
        {floatingShapes.map((shape, index) => (
          <motion.div
            key={index}
            className={`absolute ${shape.size} ${shape.color} rounded-full blur-2xl`}
            style={{
              left: `${shape.initialX}%`,
              top: `${shape.initialY}%`,
            }}
            animate={{
              x: ['0%', '100%', '-50%', '0%'],
              y: ['0%', '-100%', '100%', '0%'],
              scale: [1, 1.3, 0.8, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Abstract Geometric Badges */}
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 flex gap-3 z-20"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {[
          { color: 'from-primary-500 to-accent-500', delay: 0 },
          { color: 'from-cyan-500 to-blue-500', delay: 0.1 },
          { color: 'from-purple-500 to-pink-500', delay: 0.2 },
        ].map((badge, index) => (
          <motion.div
            key={index}
            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${badge.color} opacity-20 backdrop-blur-sm`}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              delay: badge.delay,
            }}
          />
        ))}
      </motion.div>

      {/* Floating 3D-style Cards - Hidden on very small screens */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: '20%', left: '5%', rotation: -15, delay: 0 },
          { top: '60%', right: '8%', rotation: 15, delay: 0.5 },
          { top: '40%', left: '10%', rotation: 10, delay: 1 },
        ].map((card, index) => (
          <motion.div
            key={index}
            className="absolute w-48 h-32 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/[0.02] backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl"
            style={{
              top: card.top,
              left: card.left,
              right: card.right,
            }}
            initial={{ opacity: 0, scale: 0.8, rotateY: 0 }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [0.9, 1, 0.9],
              rotateY: [card.rotation, card.rotation + 10, card.rotation],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6 + index,
              repeat: Infinity,
              delay: card.delay,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-2xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="space-y-2 opacity-30">
                <div className="w-20 h-3 bg-white/30 rounded" />
                <div className="w-16 h-2 bg-white/20 rounded" />
                <div className="w-24 h-2 bg-white/20 rounded" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Greeting with enhanced badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 relative"
          >
            {/* Decorative elements around badge */}
            <motion.div
              className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-px bg-gradient-to-r from-transparent to-primary-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <motion.div
              className="absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-px bg-gradient-to-l from-transparent to-accent-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />

            <motion.span
              className="inline-block px-6 py-3 bg-gradient-to-r from-primary-100/80 to-accent-100/80 dark:from-primary-900/40 dark:to-accent-900/40 backdrop-blur-sm text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium relative shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              {/* Animated ring */}
              <motion.div
                className="absolute -inset-1 border-2 border-primary-400/30 rounded-full"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 20, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  👋
                </motion.span>
                Hello, I'm
              </span>
            </motion.span>
          </motion.div>

          {/* Name with Enhanced Typography - Fully Responsive */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 font-display relative leading-tight"
          >
            {/* Glow effect behind text */}
            <div className="absolute inset-0 blur-3xl opacity-30">
              <div className="text-5xl md:text-7xl lg:text-8xl font-bold">
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                  Sowmiya
                </div>
              </div>
            </div>

            <div className="inline-flex relative">
              {'Sowmiya'.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  className="gradient-text inline-block relative"
                  initial={{ y: 0 }}
                  animate={{ y: [0, -20, 0] }}
                  transition={{
                    duration: 2,
                    delay: index * 0.1,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.3 },
                  }}
                  style={{
                    textShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <br />
            <div className="inline-flex relative">
              {'Ravichandran'.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  className="text-gray-900 dark:text-white inline-block relative"
                  initial={{ y: 0 }}
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 2,
                    delay: index * 0.08 + 0.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  whileHover={{
                    scale: 1.2,
                    color: '#8b5cf6',
                    transition: { duration: 0.3 },
                  }}
                  style={{
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </motion.h1>

          {/* Animated Title - Fully Responsive */}
          <div className="mb-6 sm:mb-8 h-8 xs:h-10 sm:h-12 md:h-16 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentTitle}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -60, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                }}
                className="text-base xs:text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-clip-text text-transparent"
              >
                {titles[currentTitle]}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Description with decorative frame - Fully Responsive */}
          <motion.div
            className="relative max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Decorative corners - Hidden on very small screens */}
            <motion.div
              className="hidden sm:block absolute -top-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-t-2 border-primary-400/30"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            />
            <motion.div
              className="hidden sm:block absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-t-2 border-accent-400/30"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
            />
            <motion.div
              className="hidden sm:block absolute -bottom-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-b-2 border-cyan-400/30"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            />
            <motion.div
              className="hidden sm:block absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-b-2 border-purple-400/30"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 }}
            />

            <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-4 bg-gradient-to-r from-white/40 to-white/20 dark:from-white/5 dark:to-white/[0.02] backdrop-blur-sm rounded-lg border border-white/20">
              Detail-oriented and enthusiastic designer with a focus on creating
              <span className="text-primary-600 dark:text-primary-400 font-semibold"> innovative </span>
              and
              <span className="text-accent-600 dark:text-accent-400 font-semibold"> user-friendly </span>
              interfaces. Passionate about collaborating with creative developers to deliver high-quality digital experiences.
            </p>
          </motion.div>

          {/* CTA Buttons - Fully Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 w-full max-w-md sm:max-w-none mx-auto"
          >
            {/* Primary Button with advanced effects */}
            <motion.div className="relative group w-full sm:w-auto">
              {/* Selection corners on hover - Hidden on very small screens */}
              <motion.div
                className="hidden sm:block absolute -top-2 -left-2 w-3 h-3 border-l-2 border-t-2 border-primary-400 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              />
              <motion.div
                className="hidden sm:block absolute -top-2 -right-2 w-3 h-3 border-r-2 border-t-2 border-primary-400 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              />
              <motion.div
                className="hidden sm:block absolute -bottom-2 -left-2 w-3 h-3 border-l-2 border-b-2 border-accent-400 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              />
              <motion.div
                className="hidden sm:block absolute -bottom-2 -right-2 w-3 h-3 border-r-2 border-b-2 border-accent-400 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              />

              <motion.a
                href="#contact"
                className="relative block px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-medium text-sm sm:text-base md:text-lg overflow-hidden w-full text-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 blur-xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.5 }}
                  style={{
                    background: 'radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)',
                  }}
                />
                <span className="relative z-10">Get In Touch</span>
              </motion.a>
            </motion.div>

            {/* Secondary Button with Figma outline style */}
            <motion.div className="relative group w-full sm:w-auto">
              {/* Measurement lines on hover - Hidden on very small screens */}
              <motion.div
                className="hidden sm:block absolute -top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent opacity-0 group-hover:opacity-100"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
              />

              <motion.a
                href="#experience"
                className="relative block px-6 py-3 sm:px-8 sm:py-4 bg-white/10 dark:bg-dark-800/50 backdrop-blur-sm text-gray-800 dark:text-white border-2 border-gray-300 dark:border-dark-600 rounded-full font-medium text-sm sm:text-base md:text-lg overflow-hidden group w-full text-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated border gradient */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    background: 'linear-gradient(45deg, transparent, rgba(139,92,246,0.3), transparent)',
                  }}
                />
                {/* Hover background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-100/20 to-accent-100/20 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  View My Work
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block"
            >
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
