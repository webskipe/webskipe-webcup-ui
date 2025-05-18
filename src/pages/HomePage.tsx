import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Share2, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';

const HomePage = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX - window.innerWidth / 2);
      y.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const RainDrop = ({ delay }: { delay: number }) => {
    const randomDuration = Math.random() * 3 + 2;
    const randomX = Math.random() * 100 - 50;
    const randomOpacity = Math.random() * 0.5 + 0.2;
    const randomLength = Math.random() * 30 + 20;

    return (
      <motion.div
        className="absolute bg-gray-300/30"
        style={{
          width: `${Math.random() * 2 + 1}px`,
          height: `${randomLength}px`,
          left: `${Math.random() * 100}%`,
          opacity: randomOpacity
        }}
        initial={{ y: -randomLength, opacity: 0 }}
        animate={{
          y: window.innerHeight + randomLength,
          opacity: [0, randomOpacity, 0],
          x: [`${randomX}px`, `${randomX + Math.random() * 40 - 20}px`]
        }}
        transition={{
          duration: randomDuration,
          repeat: Infinity,
          delay,
          ease: "linear"
        }}
      />
    );
  };

  const FloatingLeaf = ({ delay }: { delay: number }) => {
    const startX = Math.random() * 100;
    const rotate = Math.random() * 360;

    return (
      <motion.div
        className="absolute text-4xl"
        style={{ left: `${startX}%`, rotate }}
        initial={{ y: -100, x: startX, opacity: 0 }}
        animate={{
          y: window.innerHeight + 200,
          x: startX + Math.random() * 40 - 20,
          opacity: [0, 0.8, 0],
          rotate: rotate + 360
        }}
        transition={{
          duration: Math.random() * 10 + 15,
          repeat: Infinity,
          delay,
          ease: "linear"
        }}
      >
        🍂
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <RainDrop key={`rain-${i}`} delay={i * 0.1} />
        ))}
        {[...Array(10)].map((_, i) => (
          <FloatingLeaf key={`leaf-${i}`} delay={i * 2} />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 py-20 text-white">
        <motion.div 
          className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [-50, 50, -50],
            y: [-30, 30, -30]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/3 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [50, -50, 50],
            y: [30, -30, 30]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              rotateX,
              rotateY,
              transformPerspective: 1000
            }}
          >
            <motion.h1 
              className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
              whileHover={{ letterSpacing: "2px" }}
              transition={{ duration: 0.3 }}
            >
              Every ending deserves a beautiful goodbye
            </motion.h1>
            <motion.p 
              className="mb-8 text-lg text-white/90 sm:text-xl"
              animate={{
                textShadow: "0 0 8px rgba(255,255,255,0.3)"
              }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              Create meaningful, expressive pages to mark the end of any chapter in your life —
              whether it's a job, project, relationship, or adventure.
            </motion.p>
            <div className="flex flex-wrap gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/create" className="btn btn-accent px-6 py-3 text-base font-medium">
                  Create Your Page
                </Link>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/gallery" className="btn btn-outline border-white/30 px-6 py-3 text-base font-medium text-white hover:bg-white/10">
                  Explore Gallery
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100/50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <motion.h2 
              className="mb-4 text-3xl font-bold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Turn life's endings into art
            </motion.h2>
            <motion.p 
              className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400"
              initial={{ y: 10 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Every end is a new beginning. Create a memorable page that expresses exactly how you feel.
            </motion.p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <motion.div 
                key={i}
                className="card flex flex-col items-center text-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                animate={{ 
                  y: [0, -5, 0],
                  transition: { 
                    duration: 3, 
                    repeat: Infinity,
                    delay: i * 0.5
                  } 
                }}
              >
                <div className="mb-4 rounded-full bg-primary-100 p-4 dark:bg-primary-900">
                  {i === 0 && <BookOpen className="h-8 w-8 text-primary-600 dark:text-primary-400" />}
                  {i === 1 && <Share2 className="h-8 w-8 text-secondary-600 dark:text-secondary-400" />}
                  {i === 2 && <Heart className="h-8 w-8 text-accent-500" />}
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  {['Express Yourself', 'Share Your Story', 'Collect Reactions'][i]}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {[
                    'Choose from multiple tones, templates, and media options to create a page that reflects your unique voice.',
                    'Share your page with anyone, anywhere with a unique link, QR code, or social media integrations.',
                    'Let others leave messages, reactions, and well-wishes on your farewell page.'
                  ][i]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="bg-gray-200 py-20 dark:bg-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col items-center justify-between gap-8 rounded-xl bg-white dark:bg-gray-900 p-8 shadow-lg md:flex-row"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)"
            }}
          >
            <div>
              <h3 className="mb-2 text-2xl font-bold">Ready to create your page?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                It only takes a few minutes to create a beautiful farewell page.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/register" 
                className="flex items-center rounded-md bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-700"
              >
                Get Started 
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;