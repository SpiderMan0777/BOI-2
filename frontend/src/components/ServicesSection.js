import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  CreditCard, 
  Printer, 
  Zap, 
  FileText, 
  Building, 
  ArrowRight,
  Clock,
  CheckCircle
} from 'lucide-react';
import axios from 'axios';

const ServicesSection = () => {
  const { t } = useTranslation();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/services`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      // Fallback to static data if API fails
      setServices([
        {
          id: '1',
          name_en: 'PAN Card Services',
          name_hi: 'पैन कार्ड सेवाएं',
          name_mr: 'पॅन कार्ड सेवा',
          description_en: 'Apply for new PAN card or update existing details',
          description_hi: 'नया पैन कार्ड बनाने या मौजूदा विवरण अपडेट करें',
          description_mr: 'नवीन पॅन कार्ड बनवा किंवा विद्यमान तपशील अपडेट करा',
          icon: 'credit-card'
        },
        {
          id: '2',
          name_en: 'Xerox & Printing',
          name_hi: 'जेरॉक्स और प्रिंटिंग',
          name_mr: 'झेरॉक्स व प्रिंटिंग',
          description_en: 'Document xerox, printing, and scanning services',
          description_hi: 'दस्तावेज़ जेरॉक्स, प्रिंटिंग और स्कैनिंग सेवाएं',
          description_mr: 'दस्तऐवज झेरॉक्स, प्रिंटिंग आणि स्कॅनिंग सेवा',
          icon: 'printer'
        },
        {
          id: '3',
          name_en: 'Electricity Bill Payment',
          name_hi: 'बिजली बिल भुगतान',
          name_mr: 'लाईट बिल भरणे',
          description_en: 'Pay electricity bills online quickly and securely',
          description_hi: 'बिजली बिल ऑनलाइन तुरंत और सुरक्षित रूप से भरें',
          description_mr: 'वीज बिल ऑनलाइन झटपट आणि सुरक्षितपणे भरा',
          icon: 'zap'
        },
        {
          id: '4',
          name_en: 'E-Services Forms',
          name_hi: 'ई-सेवा फॉर्म',
          name_mr: 'ई-सेवा फॉर्म',
          description_en: 'Fill various government e-service forms online',
          description_hi: 'विभिन्न सरकारी ई-सेवा फॉर्म ऑनलाइन भरें',
          description_mr: 'विविध सरकारी ई-सेवा फॉर्म ऑनलाइन भरा',
          icon: 'file-text'
        },
        {
          id: '5',
          name_en: 'Banking Services',
          name_hi: 'बैंकिंग सेवाएं',
          name_mr: 'बँकिंग सेवा',
          description_en: 'Complete banking solutions for all your needs',
          description_hi: 'आपकी सभी आवश्यकताओं के लिए संपूर्ण बैंकिंग समाधान',
          description_mr: 'तुमच्या सर्व गरजांसाठी संपूर्ण बँकिंग समाधान',
          icon: 'building'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName) => {
    const iconMap = {
      'credit-card': CreditCard,
      'printer': Printer,
      'zap': Zap,
      'file-text': FileText,
      'building': Building
    };
    return iconMap[iconName] || Building;
  };

  const getCurrentText = (service, field) => {
    const { i18n } = useTranslation();
    const lang = i18n.language;
    
    if (lang === 'hi') return service[`${field}_hi`] || service[`${field}_en`];
    if (lang === 'mr') return service[`${field}_mr`] || service[`${field}_en`];
    return service[`${field}_en`];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('servicesTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('servicesSubtitle')}
          </p>
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-4 bg-white rounded-full px-6 py-3 shadow-md">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">{t('morningHours')}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-700">{t('eveningHours')}</span>
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, index) => {
            const IconComponent = getIcon(service.icon);
            
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {getCurrentText(service, 'name')}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {getCurrentText(service, 'description')}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Quick Processing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Secure Service</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">Expert Support</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg">
                    <span>Get Service</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Need Help with Any Service?</h3>
            <p className="text-blue-100 mb-6">Our expert team is here to assist you with all your banking and digital service needs.</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Contact Us Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;