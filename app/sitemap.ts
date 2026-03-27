import { SITE_URL, TREATMENT_PAGES } from '@/lib/clinic-data';

export default function sitemap() {
  const staticRoutes = ['', '/thank-you'];

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1 : 0.2
    })),
    ...TREATMENT_PAGES.map((page) => ({
      url: `${SITE_URL}/services/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    }))
  ];
}
