import { useEffect } from 'react';

const BASE_TITLE = 'Lauwverse';
const SITE_URL   = 'https://lauwverse.vercel.app';

/**
 * Set per-route <title>, <meta description>, canonical URL, and optional JSON-LD.
 * Cleans up injected tags on unmount so the homepage defaults restore.
 *
 * @param {{ title: string, description: string, path?: string, jsonLd?: object }} opts
 */
export default function usePageMeta({ title, description, path, jsonLd }) {
  useEffect(() => {
    const prev = document.title;
    document.title = `${title} | ${BASE_TITLE}`;

    // Meta description
    let meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute('content');
    if (meta) meta.setAttribute('content', description);

    // Canonical
    let canon = document.querySelector('link[rel="canonical"]');
    const prevCanon = canon?.getAttribute('href');
    if (canon && path) canon.setAttribute('href', `${SITE_URL}${path}`);

    // OG tags
    const og = (prop, val) => {
      const el = document.querySelector(`meta[property="${prop}"]`);
      if (el) { el._prev = el.getAttribute('content'); el.setAttribute('content', val); }
    };
    og('og:title', `${title} | ${BASE_TITLE}`);
    og('og:description', description);
    if (path) og('og:url', `${SITE_URL}${path}`);

    // JSON-LD
    let script = null;
    if (jsonLd) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.title = prev;
      if (meta && prevDesc) meta.setAttribute('content', prevDesc);
      if (canon && prevCanon) canon.setAttribute('href', prevCanon);
      // Restore OG
      ['og:title', 'og:description', 'og:url'].forEach(prop => {
        const el = document.querySelector(`meta[property="${prop}"]`);
        if (el?._prev) el.setAttribute('content', el._prev);
      });
      if (script) script.remove();
    };
  }, [title, description, path, jsonLd]);
}
