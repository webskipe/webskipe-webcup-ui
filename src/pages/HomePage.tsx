import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Share2, BookOpen } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 py-20 text-white">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-accent-500 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-secondary-500 opacity-20 blur-3xl"></div>
        
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Every ending deserves a beautiful goodbye
            </h1>
            <p className="mb-8 text-lg text-white/90 sm:text-xl">
              Create meaningful, expressive pages to mark the end of any chapter in your life —
              whether it's a job, project, relationship, or adventure.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/create" className="btn btn-accent px-6 py-3 text-base font-medium">
                Create Your Page
              </Link>
              <Link to="/gallery" className="btn btn-outline border-white/30 px-6 py-3 text-base font-medium text-white hover:bg-white/10">
                Explore Gallery
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4">Turn life's endings into art</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Every end is a new beginning. Create a memorable page that expresses exactly how you feel.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <motion.div 
              className="card flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 rounded-full bg-primary-100 p-4 dark:bg-primary-900">
                <BookOpen className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="mb-2">Express Yourself</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose from multiple tones, templates, and media options to create a page that reflects your unique voice.
              </p>
            </motion.div>

            <motion.div 
              className="card flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 rounded-full bg-secondary-100 p-4 dark:bg-secondary-900">
                <Share2 className="h-8 w-8 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="mb-2">Share Your Story</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Share your page with anyone, anywhere with a unique link, QR code, or social media integrations.
              </p>
            </motion.div>

            <motion.div 
              className="card flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 rounded-full bg-accent-100 p-4 dark:bg-accent-900">
                <Heart className="h-8 w-8 text-accent-500" />
              </div>
              <h3 className="mb-2">Collect Reactions</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Let others leave messages, reactions, and well-wishes on your farewell page.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-primary-50 py-20 dark:bg-primary-900/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-8 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800 md:flex-row">
            <div>
              <h3 className="mb-2 text-2xl font-bold">Ready to create your page?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                It only takes a few minutes to create a beautiful farewell page.
              </p>
            </div>
            <Link 
              to="/register" 
              className="flex items-center rounded-md bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-700"
            >
              Get Started 
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;