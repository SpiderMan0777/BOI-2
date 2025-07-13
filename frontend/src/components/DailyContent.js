import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Quote, Lightbulb, Info, Calendar, RefreshCw } from 'lucide-react';
import axios from 'axios';

const DailyContent = () => {
  const { t, i18n } = useTranslation();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchDailyContent();
  }, []);

  const fetchDailyContent = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/daily-content`);
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching daily content:', error);
      // Fallback content
      setContent({
        type: 'quote',
        content_en: 'Banking is about trust, and trust is about relationships.',
        content_hi: 'बैंकिंग भरोसे के बारे में है, और भरोसा रिश्तों के बारे में है।',
        content_mr: 'बँकिंग म्हणजे विश्वास, आणि विश्वास म्हणजे नातेसंबंध।',
        author: 'Bank of India',
        date: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshContent = async () => {
    setRefreshing(true);
    await fetchDailyContent();
    setRefreshing(false);
  };

  const getCurrentContent = () => {
    if (!content) return '';
    
    const lang = i18n.language;
    if (lang === 'hi') return content.content_hi || content.content_en;
    if (lang === 'mr') return content.content_mr || content.content_en;
    return content.content_en;
  };

  const getIcon = () => {
    switch (content?.type) {
      case 'quote':
        return <Quote className="w-8 h-8 text-blue-600" />;
      case 'tip':
        return <Lightbulb className="w-8 h-8 text-yellow-500" />;
      case 'fact':
        return <Info className="w-8 h-8 text-green-500" />;
      default:
        return <Quote className="w-8 h-8 text-blue-600" />;
    }
  };

  const getTypeTitle = () => {
    if (!content) return '';
    
    switch (content.type) {
      case 'quote':
        return t('dailyQuote');
      case 'tip':
        return t('dailyTip');
      case 'fact':
        return t('dailyFact');
      default:
        return t('dailyQuote');
    }
  };

  const getBackgroundColor = () => {
    switch (content?.type) {
      case 'quote':
        return 'from-blue-500 to-blue-600';
      case 'tip':
        return 'from-yellow-500 to-orange-500';
      case 'fact':
        return 'from-green-500 to-emerald-600';
      default:
        return 'from-blue-500 to-blue-600';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className={`bg-gradient-to-br ${getBackgroundColor()} rounded-2xl p-8 text-white shadow-lg overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-3 rounded-full">
                {getIcon()}
              </div>
              <div>
                <h3 className="text-xl font-bold">{getTypeTitle()}</h3>
                <div className="flex items-center space-x-2 text-white/80">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date().toLocaleDateString(i18n.language === 'hi' ? 'hi-IN' : i18n.language === 'mr' ? 'mr-IN' : 'en-IN')}
                  </span>
                </div>
              </div>
            </div>
            
            <motion.button
              onClick={refreshContent}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={refreshing}
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>

          {/* Content */}
          <div className="mb-6">
            <blockquote className="text-lg md:text-xl leading-relaxed mb-4">
              "{getCurrentContent()}"
            </blockquote>
            
            {content?.author && (
              <div className="flex items-center space-x-2 text-white/80">
                <div className="w-8 h-0.5 bg-white/60"></div>
                <span className="text-sm font-medium">{content.author}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <motion.button
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Share
            </motion.button>
            
            <motion.button
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DailyContent;