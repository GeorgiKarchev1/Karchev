// 'use client'

// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { useForm } from 'react-hook-form'
// import { Send, MapPin, Mail } from 'lucide-react'

// interface FormData {
//   name: string
//   email: string
//   subject: string
//   message: string
// }

// const Contact = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<FormData>()

//   const onSubmit = async (data: FormData) => {
//     setIsSubmitting(true)
    
//     // Simulate form submission
//     try {
//       await new Promise(resolve => setTimeout(resolve, 2000))
//       console.log('Form submitted:', data)
//       setSubmitStatus('success')
//       reset()
//     } catch (error) {
//       setSubmitStatus('error')
//     } finally {
//       setIsSubmitting(false)
//       setTimeout(() => setSubmitStatus('idle'), 5000)
//     }
//   }

//   return (
//     <section id="contact" className="section-padding bg-gray-900">
//       <div className="container-custom">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="max-w-4xl mx-auto"
//         >
//           {/* Header */}
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//               Let's Work Together
//             </h2>
//             <div className="w-16 h-0.5 bg-blue-600 mx-auto mb-8"></div>
//             <p className="text-xl text-gray-400 max-w-3xl mx-auto">
//               Have a project in mind? I'd love to hear about it. 
//               Let's create something amazing together.
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-16">
//             {/* Contact Information */}
//             <div className="space-y-8">
//               <div>
//                 <h3 className="text-2xl font-bold text-white mb-6">
//                   Get in Touch
//                 </h3>
//                 <p className="text-gray-400 mb-8 leading-relaxed">
//                   I'm always interested in new opportunities and exciting projects. 
//                   From web applications to AI-powered solutions, let's discuss 
//                   how we can work together.
//                 </p>
//               </div>

//               <div className="space-y-6">
//                 <div className="flex items-center space-x-4">
//                   <div className="flex-shrink-0 w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
//                     <MapPin size={20} className="text-blue-400" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
//                       Location
//                     </p>
//                     <p className="text-lg font-medium text-white">
//                       Plovdiv, Bulgaria
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-4">
//                   <div className="flex-shrink-0 w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
//                     <Mail size={20} className="text-blue-400" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
//                       Email
//                     </p>
//                     <a
//                       href="mailto:karchev@example.com"
//                       className="text-lg font-medium text-white hover:text-blue-400 transition-colors"
//                     >
//                       karchev@example.com
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Form */}
//             <div className="card-dark p-8">
//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
//                       Name *
//                     </label>
//                     <input
//                       {...register('name', { required: 'Name is required' })}
//                       type="text"
//                       id="name"
//                       className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                       placeholder="Your name"
//                     />
//                     {errors.name && (
//                       <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
//                       Email *
//                     </label>
//                     <input
//                       {...register('email', {
//                         required: 'Email is required',
//                         pattern: {
//                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                           message: 'Invalid email address',
//                         },
//                       })}
//                       type="email"
//                       id="email"
//                       className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                       placeholder="your@email.com"
//                     />
//                     {errors.email && (
//                       <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
//                     Subject *
//                   </label>
//                   <input
//                     {...register('subject', { required: 'Subject is required' })}
//                     type="text"
//                     id="subject"
//                     className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     placeholder="What's this about?"
//                   />
//                   {errors.subject && (
//                     <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
//                     Message *
//                   </label>
//                   <textarea
//                     {...register('message', { required: 'Message is required' })}
//                     id="message"
//                     rows={5}
//                     className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
//                     placeholder="Tell me about your project..."
//                   />
//                   {errors.message && (
//                     <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
//                   )}
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
//                 >
//                   {isSubmitting ? (
//                     <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   ) : (
//                     <>
//                       <Send size={18} className="mr-2" />
//                       Send Message
//                     </>
//                   )}
//                 </button>

//                 {submitStatus === 'success' && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="p-4 bg-green-900/50 border border-green-700 text-green-400 rounded-lg text-center"
//                   >
//                     Message sent successfully! I'll get back to you soon.
//                   </motion.div>
//                 )}

//                 {submitStatus === 'error' && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="p-4 bg-red-900/50 border border-red-700 text-red-400 rounded-lg text-center"
//                   >
//                     Something went wrong. Please try again.
//                   </motion.div>
//                 )}
//               </form>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

// export default Contact