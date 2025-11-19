'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { label: 'Months Experience', value: '14+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Design Tools', value: '6+' },
    { label: 'Happy Clients', value: '30+' },
  ];

  const interests = [
    { icon: '🎵', name: 'Music' },
    { icon: '✈️', name: 'Travelling' },
    { icon: '🎬', name: 'Movies' },
    { icon: '🎨', name: 'Art & Design' },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-10 xs:py-12 sm:py-16 md:py-20 lg:py-32 bg-white dark:bg-dark-950"
    >
      <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 xs:mb-3 sm:mb-4 font-display px-2">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 px-2">
            Get to know me better
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 md:gap-12 items-center mb-10 xs:mb-12 sm:mb-16 md:mb-20">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mb-3 xs:mb-4 sm:mb-6 text-gray-900 dark:text-white">
              Passionate Designer & Developer
            </h3>
            <div className="space-y-3 xs:space-y-4 text-gray-600 dark:text-gray-400 text-xs xs:text-sm sm:text-base">
              <p className="leading-relaxed">
                I'm Sowmiya Ravichandran, a detail-oriented and enthusiastic
                Software Designer with a focus on creating innovative and
                user-friendly interfaces. With experience in both design and
                development, I bring a unique perspective to every project.
              </p>
              <p className="leading-relaxed">
                My journey started at{' '}
                <span className="text-primary-600 dark:text-primary-400 font-semibold">
                  Bharathiyar NIFT Tea College of Fashion University
                </span>
                , where I developed a strong foundation in design principles and
                creative thinking.
              </p>
              <p className="leading-relaxed">
                I'm passionate about collaborating with creative developers and
                teams to ensure the delivery of high-quality software. I bring
                design expertise and innovative thinking to every project, with
                a keen eye for detail and a drive to enhance user experience.
              </p>
            </div>

            {/* Languages */}
            <div className="mt-4 xs:mt-6 sm:mt-8">
              <h4 className="text-base xs:text-lg sm:text-xl font-semibold mb-3 xs:mb-4 text-gray-900 dark:text-white">
                Languages
              </h4>
              <div className="flex flex-wrap gap-2 xs:gap-3 sm:gap-4">
                <span className="px-3 xs:px-4 py-1.5 xs:py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-xs xs:text-sm font-medium">
                  Tamil (Native)
                </span>
                <span className="px-3 xs:px-4 py-1.5 xs:py-2 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 rounded-full text-xs xs:text-sm font-medium">
                  English (Fluent)
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Stats & Interests */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4 xs:space-y-6 sm:space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 xs:gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-dark-800 dark:to-dark-900 p-3 xs:p-4 sm:p-6 rounded-xl xs:rounded-2xl border border-gray-200 dark:border-dark-700 card-hover text-center"
                >
                  <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1 xs:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Interests */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-dark-800 dark:to-dark-900 p-4 xs:p-6 sm:p-8 rounded-xl xs:rounded-2xl border border-gray-200 dark:border-dark-700">
              <h4 className="text-base xs:text-lg sm:text-xl font-semibold mb-3 xs:mb-4 sm:mb-6 text-gray-900 dark:text-white">
                Interests & Hobbies
              </h4>
              <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 p-2 xs:p-2.5 sm:p-3 bg-white dark:bg-dark-900 rounded-lg xs:rounded-xl"
                  >
                    <span className="text-lg xs:text-xl sm:text-2xl md:text-3xl">{interest.icon}</span>
                    <span className="text-xs xs:text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                      {interest.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
