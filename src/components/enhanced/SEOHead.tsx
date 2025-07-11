
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}

export const SEOHead = ({
  title = "Ethan Kusasirakwe - Full-Stack Developer & Creative Technologist",
  description = "Experienced full-stack developer specializing in React, TypeScript, Node.js, and modern web technologies. Building scalable applications and exceptional user experiences.",
  keywords = [
    "full-stack developer",
    "React developer", 
    "TypeScript",
    "Node.js",
    "web development",
    "UI/UX design",
    "JavaScript",
    "software engineer",
    "Kampala Uganda developer",
    "frontend developer",
    "backend developer"
  ],
  image = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop&crop=face",
  url = "https://ethankusasirakwe.dev",
  type = "website"
}: SEOHeadProps) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="Ethan Kusasirakwe" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Ethan Kusasirakwe Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:site" content="@ethankusasirakwe" />
      <meta property="twitter:creator" content="@ethankusasirakwe" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Ethan Kusasirakwe",
          "jobTitle": "Full-Stack Developer & Creative Technologist",
          "description": description,
          "url": url,
          "image": image,
          "sameAs": [
            "https://github.com/Ethan7628",
            "https://www.linkedin.com/in/kusasirakwe-ethan-21585a34b/",
            "https://twitter.com/ethankusasirakwe"
          ],
          "knowsAbout": [
            "JavaScript",
            "TypeScript", 
            "React",
            "Node.js",
            "Python",
            "UI/UX Design",
            "Firebase",
            "Supabase",
            "Full-Stack Development"
          ],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kampala",
            "addressCountry": "Uganda"
          },
          "alumniOf": "Makerere University",
          "email": "kusasirakweethan31@gmail.com",
          "telephone": "+256742128488"
        })}
      </script>
    </Helmet>
  );
};
