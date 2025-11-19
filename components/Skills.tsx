'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skillCategories = [
    {
      title: 'Design Tools',
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'Adobe Photoshop', level: 90 },
        { name: 'CorelDRAW', level: 85 },
        { name: 'emCAD', level: 80 },
        { name: 'UI/UX Design', level: 88 },
        { name: 'Figma', level: 82 },
      ],
    },
    {
      title: 'Development',
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'HTML/CSS', level: 85 },
        { name: 'JavaScript', level: 75 },
        { name: 'React', level: 70 },
        { name: 'Python', level: 65 },
        { name: 'SQL', level: 60 },
      ],
    },
    {
      title: 'Soft Skills',
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Analytical Thinking', level: 92 },
        { name: 'Team Collaboration', level: 95 },
        { name: 'Problem Solving', level: 88 },
        { name: 'Communication', level: 90 },
        { name: 'Creativity', level: 95 },
      ],
    },
  ];

  return (
    <section
      id="skills"
      ref={ref}
      className="py-10 xs:py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-dark-900 dark:to-dark-950"
    >
      <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 xs:mb-3 sm:mb-4 font-display px-2">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 px-2">
            Tools and technologies I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="bg-white dark:bg-dark-800 p-4 xs:p-6 sm:p-8 rounded-xl xs:rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700 card-hover"
            >
              <div className="mb-4 xs:mb-6">
                <div
                  className={`inline-block px-3 xs:px-4 py-1.5 xs:py-2 bg-gradient-to-r ${category.color} text-white rounded-full text-xs xs:text-sm font-semibold mb-3 xs:mb-4`}
                >
                  {category.title}
                </div>
              </div>

              <div className="space-y-4 xs:space-y-5 sm:space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5 xs:mb-2">
                      <span className="text-xs xs:text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-xs xs:text-sm text-gray-500 dark:text-gray-500 font-semibold">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 xs:h-2 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3,
                          ease: 'easeOut',
                        }}
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Tools & Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 xs:mt-10 sm:mt-12 md:mt-16"
        >
          <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-center mb-4 xs:mb-6 sm:mb-8 text-gray-900 dark:text-white px-2">
            Tools & Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4">
            {[
              'Photoshop',
              'CorelDRAW',
              'emCAD',
              'Figma',
              'UI/UX',
              'HTML',
              'CSS',
              'JavaScript',
              'React',
              'Next.js',
              'Python',
              'SQL',
              'Git',
              'Tailwind CSS',
            ].map((tool, index) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 rounded-full font-medium shadow-md border border-gray-200 dark:border-dark-700 hover:shadow-xl hover:border-primary-500 dark:hover:border-primary-500 transition-all cursor-default text-xs xs:text-sm sm:text-base"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
