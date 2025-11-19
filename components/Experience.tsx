'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const experiences = [
    {
      title: 'Digital Embroidery Designer',
      company: 'Juleee Embrotech Pvt Ltd (SS Creation)',
      duration: '8 months',
      type: 'Full-time',
      description: [
        'Created embroidery designs using emCAD software',
        'Collaborated with production teams to ensure design feasibility',
        'Applied creativity to custom digital designs for client projects',
        'Maintained design quality standards and met project deadlines',
      ],
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Graphic Designer',
      company: 'AV Digital Press',
      duration: '6 months',
      type: 'Full-time',
      description: [
        'Designed layouts, invitations, and print-ready materials',
        'Utilized Photoshop & CorelDRAW for professional artwork',
        'Contributed to team projects and commercial artwork',
        'Managed multiple design projects simultaneously',
      ],
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  const education = [
    {
      degree: 'Bharathiyar NIFT Tea College of Fashion University',
      field: 'Fashion Design',
      duration: '2020 - 2023',
      description:
        'Comprehensive education in design principles, creative thinking, and technical skills',
    },
    {
      degree: 'XII Standard',
      field: 'KGS Matric Higher Secondary School Jaivabai Municipal Girls',
      duration: '2017 - 2018',
      description: 'Higher Secondary Education',
    },
    {
      degree: 'X Standard',
      field: 'Higher Secondary School',
      duration: '2015 - 2016',
      description: 'Secondary Education',
    },
  ];

  return (
    <section
      id="experience"
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
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 px-2">
            My professional journey and educational background
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 md:gap-12">
          {/* Professional Experience */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mb-4 xs:mb-6 sm:mb-8 text-gray-900 dark:text-white"
            >
              Professional Experience
            </motion.h3>

            <div className="space-y-4 xs:space-y-6 sm:space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                  className="relative pl-4 xs:pl-6 sm:pl-8 border-l-2 border-gray-300 dark:border-dark-700"
                >
                  <div className="absolute -left-1.5 xs:-left-2 top-0 w-3 h-3 xs:w-4 xs:h-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />

                  <div className="bg-gradient-to-br from-gray-50 to-purple-50 dark:from-dark-800 dark:to-dark-900 p-3 xs:p-4 sm:p-6 rounded-lg xs:rounded-xl border border-gray-200 dark:border-dark-700 card-hover">
                    <div className="flex flex-col xs:flex-row xs:items-start xs:justify-between mb-3 xs:mb-4 gap-2">
                      <div>
                        <h4 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {exp.title}
                        </h4>
                        <p className="text-xs xs:text-sm sm:text-base text-primary-600 dark:text-primary-400 font-semibold">
                          {exp.company}
                        </p>
                      </div>
                      <span
                        className={`px-2 xs:px-3 py-1 bg-gradient-to-r ${exp.color} text-white text-xs xs:text-sm font-medium rounded-full self-start`}
                      >
                        {exp.duration}
                      </span>
                    </div>

                    <ul className="space-y-1.5 xs:space-y-2 text-xs xs:text-sm sm:text-base text-gray-600 dark:text-gray-400">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-1.5 xs:mr-2 text-primary-500">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mb-4 xs:mb-6 sm:mb-8 text-gray-900 dark:text-white"
            >
              Education
            </motion.h3>

            <div className="space-y-4 xs:space-y-6 sm:space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                  className="relative pl-4 xs:pl-6 sm:pl-8 border-l-2 border-gray-300 dark:border-dark-700"
                >
                  <div className="absolute -left-1.5 xs:-left-2 top-0 w-3 h-3 xs:w-4 xs:h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-dark-800 dark:to-dark-900 p-3 xs:p-4 sm:p-6 rounded-lg xs:rounded-xl border border-gray-200 dark:border-dark-700 card-hover">
                    <div className="mb-3 xs:mb-4">
                      <h4 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {edu.degree}
                      </h4>
                      <p className="text-xs xs:text-sm sm:text-base text-blue-600 dark:text-blue-400 font-semibold mb-2">
                        {edu.field}
                      </p>
                      <span className="inline-block px-2 xs:px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs xs:text-sm font-medium rounded-full">
                        {edu.duration}
                      </span>
                    </div>

                    <p className="text-xs xs:text-sm sm:text-base text-gray-600 dark:text-gray-400">
                      {edu.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
