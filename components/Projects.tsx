'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'

const Projects = () => {
  const projects = [
    {
      title: 'The Agency Course',
      description: 'Turned video editing education into a profitable business. Students pay monthly for structured courses that actually teach them to make money. No fluff, just results.',
      image: '/img/theagency.png',
      github: 'https://github.com/GeorgiKarchev1/theagencycourse',
      live: 'https://theagencycourse.bg/',
    },
    {
      title: 'Editing.bg',
      description: 'Built a marketplace that connects content creators with video editors. Handles file uploads, payments, and project management. Creators get professional edits without the hassle.',
      image: '/img/editingbg.png',
      technologies: ['React', 'Node.js', 'File Upload', 'Real-time Chat'],
      github: 'https://github.com/GeorgiKarchev1/Editing.bg',
      live: 'https://editing.bg/',
    },
    {
      title: 'AlgoChat.com',
      description: 'Made learning algorithms actually fun and accessible. Daily 1-minute challenges that don\'t overwhelm users. No more boring textbooks - just bite-sized learning that sticks.',
      image: '/img/algoimg.png',
      technologies: ['AI/ML', 'WebRTC', 'Real-time APIs', 'Voice Processing'],
      github: 'https://github.com/GeorgiKarchev1/algo',
      live: 'https://www.algochad.com/',
    }
  ]

  return (
    <section id="projects" className="section-padding bg-black relative overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-primary-900/10 to-black" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-0 w-96 h-96 bg-primary-300/15 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle,rgba(144,169,85,0.4)_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Featured{' '}
              <span className="text-gradient bg-gradient-to-r from-primary-300 via-primary-200 to-primary-50 bg-clip-text text-transparent">
                Projects
              </span>
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-primary-600 to-primary-300 mx-auto mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
            <motion.p
              className="text-xl text-gray-400 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              Real applications serving real users. Each project demonstrates my commitment
              to building functional, user-friendly solutions.
            </motion.p>
          </div>

          {/* Projects Grid */}
          <div className="space-y-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group grid lg:grid-cols-2 gap-12 items-center p-8 rounded-2xl bg-gray-900/50 border border-gray-700/50 hover:border-primary-500/50 transition-all duration-500 hover:bg-gray-900/70 hover:shadow-xl hover:shadow-primary-500/10"
              >
                {/* Project Image */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="relative">
                    {/* Glowing effect */}
                    <motion.div
                      className="absolute -inset-2 bg-gradient-to-r from-primary-500/20 via-primary-300/20 to-primary-50/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    <div className="relative overflow-hidden rounded-xl bg-gray-900 border border-gray-700/50 group-hover:border-primary-500/50 transition-all duration-500">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={600}
                          height={400}
                          className="w-full h-64 object-cover"
                        />
                      </motion.div>
                      
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      
                      {/* Animated Overlay Links */}
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex space-x-4">
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg"
                          >
                            <ExternalLink size={20} />
                          </motion.a>
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-colors shadow-lg"
                          >
                            <Github size={20} />
                          </motion.a>
                        </div>
                      </motion.div>

                      {/* "LIVE" badge */}
                      {/* <div className="absolute top-4 right-4">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold"
                        >
                          🔥 LIVE
                        </motion.div>
                      </div> */}
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="space-y-6">
                    <motion.h3
                      className="text-3xl md:text-4xl font-bold text-white group-hover:text-primary-300 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      {project.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-lg text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                      initial={{ opacity: 0.8 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      {project.description}
                    </motion.p>
                    
                    {/* <div className="flex flex-wrap gap-3">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.1 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          viewport={{ once: true }}
                          className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200 rounded-full text-sm font-bold border border-gray-600 hover:border-blue-500 transition-all cursor-default"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div> */}
                    
                    <div className="flex space-x-4">
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300"
                      >
                        <ExternalLink size={18} className="mr-2" />
                        View Live
                      </motion.a>
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center px-8 py-3 border border-gray-600 text-gray-300 rounded-xl font-semibold hover:border-gray-400 hover:text-white transition-all duration-300"
                      >
                        <Github size={18} className="mr-2" />
                        View Code
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects