import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { logger } from "@/utils/logger";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    logger.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Helmet>
        <title>Page Not Found — Ethan Kusasirakwe</title>
        <meta name="description" content="The page you are looking for does not exist. Return to Ethan Kusasirakwe's portfolio home." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://ethans-future-folio.lovable.app/" />
        <meta property="og:title" content="Page Not Found — Ethan Kusasirakwe" />
        <meta property="og:description" content="The page you are looking for does not exist." />
        <meta property="og:url" content="https://ethans-future-folio.lovable.app/" />
      </Helmet>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
