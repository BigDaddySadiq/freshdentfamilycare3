import type { Metadata } from 'next';

import {
  BRANCHES,
  CLINIC_NAME,
  CONTACT_DETAILS,
  DOCTOR,
  IMAGE_ASSETS,
  SITE_NAME,
  SITE_URL,
  TREATMENT_PAGES,
  type FaqItem,
  type TreatmentPage
} from '@/lib/clinic-data';

const defaultOgImage = `${SITE_URL}${IMAGE_ASSETS.presentation.src}`;

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
  image = defaultOgImage
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: image,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    }
  };
}

export function createClinicSchemas() {
  const branches = BRANCHES.map((branch) => ({
    '@type': 'Dentist',
    name: `${CLINIC_NAME} - ${branch.name}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: branch.address,
      addressLocality: 'Kakinada',
      addressRegion: 'Andhra Pradesh',
      postalCode: branch.id === 'branch-1' ? '533005' : '533003',
      addressCountry: 'IN'
    },
    telephone: branch.phones.map((phone) => `+91${phone.replace(/\D/g, '')}`),
    openingHours: 'Mo-Sa 09:00-20:30',
    url: SITE_URL
  }));

  return [
    {
      '@context': 'https://schema.org',
      '@type': ['Dentist', 'MedicalBusiness'],
      name: CLINIC_NAME,
      url: SITE_URL,
      image: `${SITE_URL}${IMAGE_ASSETS.logo.src}`,
      email: CONTACT_DETAILS.email,
      telephone: `+${CONTACT_DETAILS.primaryPhoneDigits}`,
      areaServed: 'Kakinada',
      address: {
        '@type': 'PostalAddress',
        streetAddress: BRANCHES[0]?.address,
        addressLocality: 'Kakinada',
        addressRegion: 'Andhra Pradesh',
        postalCode: '533005',
        addressCountry: 'IN'
      },
      availableService: TREATMENT_PAGES.map((page) => ({
        '@type': 'MedicalProcedure',
        name: page.title
      })),
      department: branches
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: DOCTOR.fullName,
      jobTitle: DOCTOR.title,
      description: DOCTOR.bio,
      worksFor: {
        '@type': 'Dentist',
        name: CLINIC_NAME
      }
    }
  ];
}

export function createFaqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function createBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`
    }))
  };
}

export function createTreatmentSchema(page: TreatmentPage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: `${page.title} - ${CLINIC_NAME}`,
    url: `${SITE_URL}/services/${page.slug}`,
    image: `${SITE_URL}${IMAGE_ASSETS.presentation.src}`,
    areaServed: {
      '@type': 'City',
      name: 'Kakinada'
    },
    procedureType: page.title,
    description: page.metaDescription,
    provider: {
      '@type': 'Dentist',
      name: CLINIC_NAME,
      url: SITE_URL
    }
  };
}
