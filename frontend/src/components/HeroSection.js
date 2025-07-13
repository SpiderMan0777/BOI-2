import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ChevronRight, Phone, Mail, MapPin, Clock } from 'lucide-react';

const HeroSection = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    // GSAP animations
    const tl = gsap.timeline();
    
    // Animated background
    gsap.to(bgRef.current, {
      backgroundPosition: '200% center',
      duration: 20,
      repeat: -1,
      ease: 'none'
    });

    // Hero content animation
    tl.from('.hero-title', {
      duration: 1,
      y: 100,
      opacity: 0,
      ease: 'power3.out'
    })
    .from('.hero-subtitle', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-description', {
      duration: 1,
      y: 30,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-buttons', {
      duration: 1,
      y: 20,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-info', {
      duration: 1,
      x: -50,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.5');

    // Floating animation for elements
    gsap.to('.floating-1', {
      duration: 3,
      y: -20,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

    gsap.to('.floating-2', {
      duration: 4,
      y: -15,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      delay: 1
    });

    gsap.to('.floating-3', {
      duration: 5,
      y: -25,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      delay: 2
    });

  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)
          `,
          backgroundSize: '100% 100%'
        }}
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-1 absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="floating-2 absolute top-40 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
        <div className="floating-3 absolute bottom-20 left-20 w-24 h-24 bg-indigo-400/20 rounded-full blur-xl"></div>
        <div className="floating-1 absolute bottom-40 right-10 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="text-center lg:text-left">
            <motion.h1 
              className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {t('heroTitle')}
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle text-xl md:text-2xl text-blue-200 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('heroSubtitle')}
            </motion.p>
            
            <motion.p 
              className="hero-description text-lg text-gray-200 mb-8 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('heroDescription')}
            </motion.p>

            <motion.div 
              className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button 
                onClick={scrollToServices}
                className="group bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>{t('getStarted')}</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={scrollToServices}
                className="group border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm"
              >
                <span>{t('learnMore')}</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column - Info Cards */}
          <div className="hero-info space-y-6">
            {/* Banking Hours Card */}
            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">{t('bankingHours')}</h3>
                  <p className="text-gray-200 text-sm">{t('morningHours')}</p>
                  <p className="text-gray-200 text-sm">{t('eveningHours')}</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Info Card */}
            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-300" />
                  <span className="text-white">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-300" />
                  <span className="text-white">info@bcpoint.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-300" />
                  <span className="text-white">Mumbai, Maharashtra</span>
                </div>
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">5000+</div>
                  <div className="text-sm text-gray-300">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-sm text-gray-300">Support</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
          </div>
          <span className="text-white/50 text-sm">Scroll Down</span>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;