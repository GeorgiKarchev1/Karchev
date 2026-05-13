# Developer Portfolio

A modern, minimalist personal portfolio website built with Next.js 14 and Tailwind CSS. Features smooth animations, responsive design, and elegant user experience.

## ✨ Features

- **Modern Design**: Clean, minimalist aesthetic with plenty of white space
- **Smooth Animations**: Powered by Framer Motion with elegant transitions and parallax effects
- **Responsive**: Optimized for all screen sizes and devices
- **Performance**: Built with Next.js 14 for optimal performance
- **Interactive**: Animated background particles and floating elements
- **Contact Form**: Functional contact form with validation
- **SEO Optimized**: Meta tags and semantic HTML structure

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form
- **Icons**: Lucide React
- **Typography**: Inter font family
- **Language**: TypeScript

## 📁 Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── About.tsx
│   ├── AnimatedBackground.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   └── Projects.tsx
├── public/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd developer-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Personal Information
Update the following files with your personal information:

- `app/layout.tsx` - Meta tags and site title
- `components/Hero.tsx` - Name, title, and social links
- `components/About.tsx` - Bio, skills, and values
- `components/Projects.tsx` - Your projects and descriptions
- `components/Contact.tsx` - Contact information
- `components/Footer.tsx` - Footer content and links

### Styling
- Colors: Modify the color palette in `tailwind.config.ts`
- Fonts: Update font imports in `app/globals.css`
- Animations: Customize animation variants in component files

### Content
- **Projects**: Replace placeholder images with your project screenshots
- **Skills**: Update the skills array in the About component
- **Social Links**: Update URLs in Header, Hero, and Footer components

## 🌟 Key Components

### Header
- Fixed navigation with smooth scrolling
- Mobile-responsive menu
- Scroll-based styling changes

### Hero
- Animated text and elements
- Social media links
- Call-to-action buttons

### About
- Personal introduction
- Skills showcase
- Core values section

### Projects
- Project showcase with images
- Technology tags
- Live demo and GitHub links

### Contact
- Contact form with validation
- Contact information
- Form submission handling

### AnimatedBackground
- Canvas-based particle system
- Floating geometric shapes
- Subtle gradient overlays

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder

### Traditional Hosting
1. Build the project: `npm run build && npm run export`
2. Upload the `out` folder to your hosting provider

## 🔧 Environment Variables

Create a `.env.local` file for any environment-specific configurations:

```env
NEXT_PUBLIC_SITE_URL=https://yoursite.com
ADMIN_PASSWORD=change-this
ADMIN_SECRET=change-this-too
# Optional for Vercel production admin persistence
# BLOB_READ_WRITE_TOKEN=vercel_blob_rw_token
# ADMIN_POSTS_BLOB_ACCESS=public
```

## 🔐 Admin Panel

- Login URL: `/admin`
- Protected dashboard: `/admin/dashboard`
- The admin session uses an `httpOnly` cookie
- Local development stores admin-created posts in `data/posts.json`
- Vercel deployments switch automatically to Vercel Blob storage when `BLOB_READ_WRITE_TOKEN` is present
- `ADMIN_POSTS_BLOB_ACCESS` can be `public` or `private` depending on your Blob store type

## ▲ Vercel Notes

- The admin panel is designed to avoid filesystem writes in production
- To make post creation/editing persist on Vercel, create a Blob store an d expose `BLOB_READ_WRITE_TOKEN` to the project environment
- `ADMIN_PASSWORD` and `ADMIN_SECRET` must be set in the Vercel project settings before enabling admin access

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent UX
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

If you have any questions or need help customizing the portfolio, feel free to reach out:

- Email: alex@example.com
- LinkedIn: [Your LinkedIn Profile]
- GitHub: [Your GitHub Profile]

---

Built with ❤️ using Next.js and Tailwind CSS
