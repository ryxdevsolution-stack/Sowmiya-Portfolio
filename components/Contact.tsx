'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const contactInfo = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      label: 'Email',
      value: 'sowmiyaravi.design@gmail.com',
      href: 'mailto:sowmiyaravi.design@gmail.com',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      label: 'Phone',
      value: '+91 90035 23067',
      href: 'tel:+919003523067',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      label: 'Location',
      value: 'Tirupur, Tamil Nadu, India',
      href: '#',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-10 xs:py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-dark-900 dark:via-dark-950 dark:to-dark-900"
    >
      <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 xs:mb-3 sm:mb-4 font-display px-2">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 px-2">
            Let's collaborate and create something amazing together!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 mb-8 xs:mb-10 sm:mb-12 md:mb-16">
          {contactInfo.map((info, index) => (
            <motion.a
              key={info.label}
              href={info.href}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-white dark:bg-dark-800 p-4 xs:p-6 sm:p-8 rounded-xl xs:rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700 card-hover text-center group"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-r ${info.color} text-white rounded-full mb-3 xs:mb-4 group-hover:scale-110 transition-transform`}
              >
                {info.icon}
              </div>
              <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 xs:mb-2">
                {info.label}
              </h3>
              <p className="text-xs xs:text-sm sm:text-base text-gray-600 dark:text-gray-400 break-words">
                {info.value}
              </p>
            </motion.a>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center bg-gradient-to-r from-primary-600 to-accent-600 p-6 xs:p-8 sm:p-10 md:p-12 rounded-2xl xs:rounded-3xl shadow-2xl"
        >
          <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 xs:mb-4 px-2">
            Ready to start a project?
          </h3>
          <p className="text-sm xs:text-base sm:text-lg text-white/90 mb-6 xs:mb-8 max-w-2xl mx-auto px-2">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center px-2">
            <motion.a
              href="mailto:sowmiyaravi.design@gmail.com"
              className="px-6 xs:px-8 py-3 xs:py-4 bg-white text-primary-600 rounded-full font-bold text-sm xs:text-base sm:text-lg hover:shadow-2xl transition-all inline-flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-4 h-4 xs:w-5 xs:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Send Email
            </motion.a>
            <motion.a
              href="tel:+919003523067"
              className="px-6 xs:px-8 py-3 xs:py-4 bg-dark-900 dark:bg-white text-white dark:text-dark-900 rounded-full font-bold text-sm xs:text-base sm:text-lg hover:shadow-2xl transition-all inline-flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-4 h-4 xs:w-5 xs:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call Now
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
