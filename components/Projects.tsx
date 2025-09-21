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
    <section id="projects" className="section-padding bg-gray-950">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Aggressive Header */}
          <div className="text-center mb-16">
            <motion.h2 
              className="text-5xl md:text-7xl font-black text-white mb-6 leading-none"
              initial={{ scale: 0.5, rotate: -5 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "backOut" }}
              viewport={{ once: true }}
            >
              STUFF I{' '}
              <span className="text-gradient bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 bg-clip-text text-transparent">
                ACTUALLY
              </span>{' '}
              BUILT
            </motion.h2>
            <motion.div 
              className="w-32 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-bold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              These aren't portfolio pieces - they're businesses. Each one solves a real problem, 
              serves real users, and makes real money. Want the same for your idea? 
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
                className="group grid lg:grid-cols-2 gap-12 items-center p-8 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-blue-500/50 transition-all duration-500 hover:bg-gray-800/80"
              >
                {/* Project Image */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="relative">
                    {/* Glowing effect */}
                    <motion.div
                      className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    <div className="relative overflow-hidden rounded-xl bg-gray-800 border border-gray-700 group-hover:border-blue-500/50 transition-all duration-500">
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
                            className="p-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
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
                      className="text-3xl md:text-4xl font-black text-white group-hover:text-blue-400 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
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
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                      >
                        <ExternalLink size={18} className="mr-2" />
                         SEE IT LIVE
                      </motion.a>
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center px-8 py-4 border-2 border-gray-600 text-gray-300 rounded-xl font-bold hover:border-blue-500 hover:text-white hover:bg-blue-500/10 transition-all duration-300"
                      >
                        <Github size={18} className="mr-2" />
                        CODE
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