'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Initialize particles on client side only
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 5,
        x: `${Math.random() * 100}%`,
      }))
    );
  }, []);

  // Animation variants for links
  const linkVariants = {
    initial: { x: 0 },
    hover: {
      x: 5,
      transition: { type: 'spring' as const, stiffness: 300 },
    },
  };

  return (
    <footer className="relative bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 text-white overflow-hidden">
      {/* Animated Wave at Top */}
      <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,50 Q300,0 600,50 T1200,50 L1200,0 L0,0 Z"
            fill="url(#wave-gradient)"
            initial={{ d: "M0,50 Q300,0 600,50 T1200,50 L1200,0 L0,0 Z" }}
            animate={{
              d: [
                "M0,50 Q300,0 600,50 T1200,50 L1200,0 L0,0 Z",
                "M0,50 Q300,80 600,50 T1200,50 L1200,0 L0,0 Z",
                "M0,50 Q300,0 600,50 T1200,50 L1200,0 L0,0 Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#d946ef" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary-400/20"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.x,
            }}
            initial={{ y: '100%', opacity: 0 }}
            animate={{
              y: '-100%',
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-l from-accent-500/10 to-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 py-10 xs:py-12 sm:py-16 pt-16 xs:pt-20 sm:pt-24 md:pt-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 xs:gap-8 sm:gap-10 md:gap-12 mb-8 xs:mb-10 sm:mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h3
              className="text-2xl xs:text-3xl font-bold mb-3 xs:mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent animate-gradient">
                SR
              </span>
            </motion.h3>
            <p className="text-xs xs:text-sm sm:text-base text-gray-400 leading-relaxed">
              Creating beautiful and functional designs that make a difference.
              Passionate about UI/UX and bringing ideas to life.
            </p>
            {/* Decorative Line */}
            <motion.div
              className="mt-4 xs:mt-6 h-0.5 xs:h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: '60%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-base xs:text-lg sm:text-xl font-semibold mb-4 xs:mb-5 sm:mb-6 text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 xs:space-y-3">
              {['Home', 'About', 'Skills', 'Experience', 'Contact'].map(
                (link, index) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  >
                    <motion.a
                      href={`#${link.toLowerCase()}`}
                      className="text-xs xs:text-sm sm:text-base text-gray-400 hover:text-primary-400 transition-colors inline-flex items-center group"
                      variants={linkVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      <motion.span
                        className="mr-1.5 xs:mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        →
                      </motion.span>
                      {link}
                    </motion.a>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-base xs:text-lg sm:text-xl font-semibold mb-4 xs:mb-5 sm:mb-6 text-white">
              Get in Touch
            </h4>
            <ul className="space-y-3 xs:space-y-4 text-gray-400">
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <a
                  href="mailto:sowmiyaravi.design@gmail.com"
                  className="text-xs xs:text-sm sm:text-base hover:text-primary-400 transition-colors inline-flex items-center gap-1.5 xs:gap-2"
                >
                  <span className="text-base xs:text-lg">✉️</span>
                  <span className="break-all">sowmiyaravi.design@gmail.com</span>
                </a>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <a
                  href="tel:+919003523067"
                  className="text-xs xs:text-sm sm:text-base hover:text-primary-400 transition-colors inline-flex items-center gap-1.5 xs:gap-2"
                >
                  <span className="text-base xs:text-lg">📞</span>
                  +91 90035 23067
                </a>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-xs xs:text-sm sm:text-base inline-flex items-center gap-1.5 xs:gap-2"
              >
                <span className="text-base xs:text-lg">📍</span>
                Tirupur, Tamil Nadu, India
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar with animated gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative pt-6 xs:pt-8"
        >
          {/* Animated gradient line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          <div className="flex flex-col md:flex-row justify-between items-center gap-3 xs:gap-4 mt-6 xs:mt-8">
            <motion.p
              className="text-gray-400 text-xs xs:text-sm text-center md:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              © {currentYear} Sowmiya Ravichandran. All rights reserved.
            </motion.p>
            <motion.p
              className="text-gray-500 text-xs xs:text-sm flex flex-wrap items-center justify-center gap-1.5 xs:gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              Designed & Crafted with{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-red-500"
              >
                ❤️
              </motion.span>{' '}
              <span className="text-gray-400">|</span>{' '}
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent font-semibold">
                Sowmiya Ravichandran
              </span>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
