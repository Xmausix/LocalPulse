import { useEffect } from "react";

interface Props {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

/**
 * Updates document <head> meta tags for SEO and social sharing.
 * Since this is a SPA, we update meta tags dynamically.
 */
export default function SEOHead({ title, description, image, url, type = "article" }: Props) {
  useEffect(() => {
    const fullTitle = `${title} — PulseNews`;
    document.title = fullTitle;

    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) || 
               document.querySelector(`meta[name="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        if (property.startsWith("og:") || property.startsWith("twitter:")) {
          el.setAttribute("property", property);
        } else {
          el.setAttribute("name", property);
        }
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", fullTitle);
    setMeta("og:description", description);
    setMeta("og:type", type);
    if (image) setMeta("og:image", image);
    if (url) setMeta("og:url", `${window.location.origin}${url}`);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    if (image) setMeta("twitter:image", image);

    return () => {
      // Reset to defaults on unmount
      document.title = "PulseNews — Lokalne zdarzenia w czasie rzeczywistym";
    };
  }, [title, description, image, url, type]);

  return null;
}
