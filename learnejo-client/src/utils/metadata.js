import SEO_CONFIG from './seo.config';

/**
 * Helper to update document metadata dynamically
 * @param {Object} props
 */
export function updateMetadata({
  title,
  description,
  canonicalUrl,
  image,
  noIndex = false,
  ogType = 'website'
} = {}) {
  // 1. Update Title
  const siteTitle = title
    ? SEO_CONFIG.titleTemplate.replace('%s', title)
    : SEO_CONFIG.defaultTitle;
  document.title = siteTitle;

  // 2. Update Description
  const siteDescription = description || SEO_CONFIG.defaultDescription;
  updateMetaTag('name', 'description', siteDescription);
  updateMetaTag('property', 'og:description', siteDescription);
  updateMetaTag('name', 'twitter:description', siteDescription);

  // 3. Update OG & Twitter Titles
  updateMetaTag('property', 'og:title', siteTitle);
  updateMetaTag('name', 'twitter:title', siteTitle);

  // 4. Update Canonical
  const url = canonicalUrl
    ? `${SEO_CONFIG.siteUrl}${canonicalUrl}`
    : SEO_CONFIG.siteUrl;
  updateLinkTag('canonical', url);
  updateMetaTag('property', 'og:url', url);

  // 5. Update Image
  const siteImage = image || `${SEO_CONFIG.siteUrl}/og-image.png`;
  updateMetaTag('property', 'og:image', siteImage);
  updateMetaTag('name', 'twitter:image', siteImage);

  // 6. Update Robots
  updateMetaTag('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

  // 7. Update OG Type
  updateMetaTag('property', 'og:type', ogType);
}

/**
 * Utility to update or create meta tags
 */
function updateMetaTag(attrName, attrValue, content) {
  if (!content) return;
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Utility to update or create link tags
 */
function updateLinkTag(rel, href) {
  if (!href) return;
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

/**
 * For cases where we want to generate structured data
 */
export function getStructuredData(type, data) {
  const base = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };
  return JSON.stringify(base);
}
