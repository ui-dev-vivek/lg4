/**
 * SEO Configuration for Learnejo
 * Centralized SEO settings for the Learnejo platform
 */

export const SEO_CONFIG = {
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://learnejo.com',
  siteName: 'Learnejo',
  defaultTitle: 'Learnejo - Premium Udemy Courses for FREE',
  titleTemplate: '%s | Learnejo',
  defaultDescription: 'Discover and enroll in premium Udemy courses for free with 100% off coupons. Master programming, design, and business skills with Learnejo.',

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://learnejo.com',
    siteName: 'Learnejo',
    title: 'Learnejo - Free Premium Education',
    description: 'Get access to premium Udemy courses for absolutely free. Join 50,000+ students and start learning today.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Learnejo - Premium Courses for Free',
      }
    ],
  },

  twitter: {
    handle: '@learnejo',
    site: '@learnejo',
    cardType: 'summary_large_image',
  },

  themeColor: '#1800ad',
};



export default SEO_CONFIG;
