import { SITE_URL } from '@/lib/clinic-data';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    host: SITE_URL,
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
