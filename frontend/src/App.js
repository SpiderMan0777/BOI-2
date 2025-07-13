import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import './i18n';

// Components
import StickyHeader from './components/StickyHeader';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import InteractiveSlider from './components/InteractiveSlider';
import DailyContent from './components/DailyContent';
import AIAssistant from './components/AIAssistant';
import AntiCopy from './components/AntiCopy';

// Icons
import { 
  Shield, 
  Clock, 
  Award, 
  Users, 
  CreditCard, 
  Smartphone,
  Globe,
  Heart,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  // Slider data
  const sliderData = [
    {
      title: 'Secure Banking Solutions',
      description: 'Your trusted partner for all banking needs with advanced security measures.',
      icon: <Shield className="w-8 h-8 text-white" />,
      actionText: 'Learn More',
      action: () => console.log('Learn more clicked')
    },
    {
      title: '24/7 Customer Support',
      description: 'Round-the-clock assistance for all your banking queries and concerns.',
      icon: <Clock className="w-8 h-8 text-white" />,
      actionText: 'Contact Us',
      action: () => console.log('Contact clicked')
    },
    {
      title: 'Award-Winning Services',
      description: 'Recognized for excellence in customer service and innovative banking solutions.',
      icon: <Award className="w-8 h-8 text-white" />,
      actionText: 'View Awards',
      action: () => console.log('Awards clicked')
    },
    {
      title: 'Serving 5000+ Customers',
      description: 'Join thousands of satisfied customers who trust us with their banking needs.',
      icon: <Users className="w-8 h-8 text-white" />,
      actionText: 'Join Us',
      action: () => console.log('Join clicked')
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-600 font-bold text-xl">BOI</span>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Bank of India BC Point...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <AntiCopy />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        
        <StickyHeader />
        
        <Routes>
          <Route path="/" element={<HomePage sliderData={sliderData} />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
        
        <AIAssistant />
      </div>
    </BrowserRouter>
  );
};

const HomePage = ({ sliderData }) => {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      
      {/* Interactive Slider Section */}
      <section className="py-20 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600">Discover what makes us the preferred choice for banking services</p>
          </div>
          <InteractiveSlider slides={sliderData} />
        </div>
      </section>

      {/* Daily Content Section */}
      <section className="py-20 bg-gray-50" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Daily Inspiration</h2>
              <p className="text-xl text-gray-600">Get motivated with our daily quotes, tips, and banking facts</p>
            </div>
            <DailyContent />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">वैशिष्ट्ये (Features)</h2>
            <p className="text-xl text-gray-600">Advanced features for modern banking needs</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <CreditCard className="w-8 h-8 text-blue-600" />,
                title: 'Digital Payments',
                description: 'Quick and secure digital payment solutions'
              },
              {
                icon: <Smartphone className="w-8 h-8 text-green-600" />,
                title: 'Mobile Banking',
                description: 'Complete banking on your mobile device'
              },
              {
                icon: <Globe className="w-8 h-8 text-purple-600" />,
                title: 'Multi-Language Support',
                description: 'Available in English, Hindi, and Marathi'
              },
              {
                icon: <Shield className="w-8 h-8 text-red-600" />,
                title: 'Enhanced Security',
                description: 'Advanced security measures for your protection'
              },
              {
                icon: <Clock className="w-8 h-8 text-orange-600" />,
                title: 'Real-time Updates',
                description: 'Live updates on all your transactions'
              },
              {
                icon: <Heart className="w-8 h-8 text-pink-600" />,
                title: 'Customer Care',
                description: 'Dedicated support for all your needs'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Bank of India BC Point</h2>
              <p className="text-lg text-gray-600 mb-6">
                Bank of India Business Correspondent Point provides essential banking services to rural and semi-urban areas. 
                We bridge the gap between formal banking and underserved communities, making financial services accessible to all.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Trusted by thousands of customers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Licensed and regulated services</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Expert support team</span>
                </div>
              </div>
            </div>
            <div data-aos="fade-left">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
                <p className="text-blue-100 mb-6">
                  To provide accessible, reliable, and secure banking services to every corner of India, 
                  empowering communities through financial inclusion and digital innovation.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold">5000+</div>
                    <div className="text-blue-200">Happy Customers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">50+</div>
                    <div className="text-blue-200">Services</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">24/7</div>
                    <div className="text-blue-200">Support</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">3</div>
                    <div className="text-blue-200">Languages</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-xl text-gray-600">Get in touch with us for any queries or assistance</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div data-aos="fade-right">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">123 Banking Street, Mumbai, Maharashtra 400001</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">info@bcpoint.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Banking Hours</h4>
                    <p className="text-gray-600">Morning: 10 AM - 1 PM</p>
                    <p className="text-gray-600">Evening: 6 PM - 9 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div data-aos="fade-left">
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">BOI</span>
                </div>
                <span className="text-xl font-bold">BC Point</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted financial partner for all banking needs.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-white">Home</a></li>
                <li><a href="#services" className="hover:text-white">Services</a></li>
                <li><a href="#about" className="hover:text-white">About</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">PAN Card</a></li>
                <li><a href="#" className="hover:text-white">Bill Payment</a></li>
                <li><a href="#" className="hover:text-white">Banking</a></li>
                <li><a href="#" className="hover:text-white">E-Services</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>+91 98765 43210</p>
                <p>info@bcpoint.com</p>
                <p>Mumbai, Maharashtra</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Bank of India BC Point. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Services Management</h2>
            <p className="text-gray-600">Manage all banking services and their details.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Daily Content</h2>
            <p className="text-gray-600">Update daily quotes, tips, and facts.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <p className="text-gray-600">Manage admin users and permissions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;