import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, icon, appData }) => {
  const siteName = "SRK Soft";
  const defaultTitle = `${siteName} - Official Software & App Store`;
  const defaultDesc = "Download official, secure, and high-performance software applications directly from SRK Soft.";

  // AEO & GEO Structured Schema (JSON-LD) for AI Search Engines (Gemini, ChatGPT, Perplexity)
  const schemaData = appData ? {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": appData.title || title,
    "description": appData.description || description || defaultDesc,
    "operatingSystem": appData.platform || "Windows",
    "applicationCategory": appData.category || "Application",
    "softwareVersion": appData.version || "1.0.0",
    "fileSize": appData.size || "Unknown",
    "image": appData.icon || icon,
    "aggregateRating": appData.rating ? {
      "@type": "AggregateRating",
      "ratingValue": appData.rating,
      "ratingCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    } : undefined,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "author": {
      "@type": "Organization",
      "name": "SRK Soft",
      "url": "https://apps.srksoft.online"
    }
  } : null;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title ? `${title} | ${siteName}` : defaultTitle}</title>
      <meta name="description" content={description || defaultDesc} />

      {/* Open Graph / Social Media & AI Previews */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title ? `${title} | ${siteName}` : defaultTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      {icon && <meta property="og:image" content={icon} />}

      {/* Structured Schema Data Injection */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;