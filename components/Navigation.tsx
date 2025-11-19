'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [floatingDots, setFloatingDots] = useState<any[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initialize floating dots on client side only
    setFloatingDots([
      { x: 10, y: 15, size: 4, delay: 0, duration: 3 },
      { x: 30, y: 20, size: 3, delay: 0.5, duration: 4 },
      { x: 50, y: 10, size: 5, delay: 1, duration: 3.5 },
      { x: 70, y: 18, size: 3, delay: 1.5, duration: 4.5 },
      { x: 90, y: 12, size: 4, delay: 0.8, duration: 3.8 },
    ]);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-lg shadow-lg shadow-primary-500/5'
          : 'bg-transparent'
      }`}
    >
      {/* Figma-style animated gradient line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Floating decorative dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingDots.map((dot, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-primary-400/20"
            style={{
              width: dot.size,
              height: dot.size,
              left: `${dot.x}%`,
              top: `${dot.y}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Figma-style frame */}
          <motion.a
            href="#home"
            className="relative text-2xl font-bold font-display gradient-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated frame around logo */}
            <motion.div
              className="absolute -inset-2 border-2 border-primary-400/0 rounded-lg"
              whileHover={{
                borderColor: 'rgba(139, 92, 246, 0.3)',
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">SR</span>
            {/* Corner handles */}
            <motion.div
              className="absolute -top-1 -left-1 w-2 h-2 bg-primary-500 rounded-full opacity-0"
              whileHover={{ opacity: 1, scale: 1.5 }}
            />
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-accent-500 rounded-full opacity-0"
              whileHover={{ opacity: 1, scale: 1.5 }}
            />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-gray-700 dark:text-gray-300 font-medium group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActiveLink(link.name.toLowerCase())}
              >
                {/* Figma-style hover background pill */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-100/50 to-accent-100/50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />

                {/* Text */}
                <motion.span
                  className="relative z-10 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                </motion.span>

                {/* Animated underline indicator */}
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: '70%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              </motion.a>
            ))}

            {/* CTA Button with enhanced effects */}
            <motion.a
              href="#contact"
              className="relative ml-4 px-6 py-2.5 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-medium overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ boxShadow: '0 0 0px rgba(139, 92, 246, 0)' }}
                whileHover={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' }}
              />

              <span className="relative z-10">Let's Talk</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-gray-800 dark:bg-white rounded-full transition-all"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-gray-800 dark:bg-white rounded-full transition-all"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-gray-800 dark:bg-white rounded-full transition-all"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-800"
          >
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={toggleMenu}
                  className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium py-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={toggleMenu}
                className="block w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-medium text-center hover:shadow-lg hover:shadow-primary-500/50 transition-all"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                Let's Talk
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
