export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroSlide extends ImageAsset {
  captionTopic: string;
}

export interface Branch {
  id: 'branch-1' | 'branch-2';
  badge: string;
  label: string;
  name: string;
  address: string;
  phones: string[];
  hours: string;
  mapUrl: string;
}

export interface DoctorType {
  fullName: string;
  qualifications: string;
  title: string;
  titleSecondary: string;
  academic: string;
  experience: string;
  bio: string;
  bioParagraphs: string[];
  pills: string[];
  expertiseTags: string[];
}

export type TreatmentIntentKey =
  | 'general-consultation'
  | 'dental-implants'
  | 'root-canal-treatment'
  | 'smile-design'
  | 'orthodontics-braces'
  | 'pediatric-dentistry'
  | 'maxillofacial-surgery'
  | 'dental-tourism'
  | 'wisdom-tooth-removal'
  | 'zirconia-crowns';

export interface Service {
  icon: string;
  title: string;
  description: string;
  enquiryLabel: string;
  intentKey: TreatmentIntentKey;
  detailHref?: string;
  isSecondary?: boolean;
}

export interface Testimonial {
  name: string;
  quote: string;
  stars: number;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface GalleryCell extends ImageAsset {
  id: string;
  className: string;
}

export interface TrustHighlight {
  icon: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TreatmentIntent {
  key: TreatmentIntentKey;
  label: string;
}

export interface IntentShortcut {
  label: string;
  href: string;
}

export interface IntentChip {
  key: TreatmentIntentKey;
  label: string;
}

export interface DecisionCard {
  title: string;
  description: string;
  href: string;
  kind: 'whatsapp' | 'form' | 'branch';
}

export interface BranchDecisionNote {
  branchId: Branch['id'];
  title: string;
  description: string;
}

export interface TreatmentPage {
  slug:
    | 'dental-implants'
    | 'root-canal-treatment'
    | 'smile-design'
    | 'wisdom-tooth-removal'
    | 'braces-orthodontics'
    | 'pediatric-dentistry'
    | 'zirconia-crowns'
    | 'oral-maxillofacial-surgery';
  intentKey: TreatmentIntentKey;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  serviceSummary: string;
  suitableFor: string[];
  commonConcerns: string[];
  faqs: FaqItem[];
  relatedSlugs: TreatmentPage['slug'][];
}

export const SITE_NAME = 'Fresh Dent Family Care';
export const SITE_URL = 'https://freshdentfamilycare.in';
export const CLINIC_NAME = 'FRESH DENT FAMILY CARE';
export const TAGLINE = 'for Beautiful Natural Smiles…';
export const SUB_TAGLINE =
  'Providing Exceptional Dental services for families in Kakinada with Advanced Digital Treatments.';

export const IMAGE_ASSETS = {
  logo: {
    src: '/images%20new/fresh-dent-logo.jpg',
    alt: 'Fresh Dent Family Care logo with a teal tooth mark and profile silhouette.',
    width: 300,
    height: 169,
    priority: true
  },
  doctorWithHappyPatient: {
    src: '/images%20new/doctor-with-happy-patient.jpg',
    alt: 'Dr. K. Manoj Kumar smiling beside a happy elderly patient in the dental chair.',
    width: 300,
    height: 169,
    priority: true
  },
  dentalProcedureCloseup: {
    src: '/images%20new/dental-procedure-closeup.jpg',
    alt: 'Close-up of a precise dental procedure with clinical tools and lighting.',
    width: 300,
    height: 169
  },
  presentation: {
    src: '/images%20new/3d-scan-conference-presentation.jpg',
    alt: 'Dr. K. Manoj Kumar presenting a digital 3D tooth scan at a professional seminar.',
    width: 819,
    height: 461
  },
  intraoralScanner: {
    src: '/images%20new/intraoral-scanner-team.jpg',
    alt: 'Fresh Dent clinical team performing an intraoral digital scan on a seated patient.',
    width: 819,
    height: 461
  },
  flapSurgery: {
    src: '/images%20new/flap-surgery-procedure.jpg',
    alt: 'Maxillofacial surgery procedure in progress under focused surgical lighting.',
    width: 819,
    height: 461
  },
  doctorDesk: {
    src: '/images%20new/doctor-at-clinic-desk.jpg',
    alt: 'Dr. K. Manoj Kumar seated at the clinic desk in Fresh Dent Family Care.',
    width: 819,
    height: 461
  },
  smileDesign: {
    src: '/images%20new/smile-design-aligners.jpg',
    alt: 'Close-up of a bright smile with clear aligners used for smile design.',
    width: 499,
    height: 281
  },
  doctorPortrait: {
    src: '/images%20new/dr-manoj-kumar-portrait.jpg',
    alt: 'Portrait of Dr. K. Manoj Kumar in Fresh Dent Family Care waiting area.',
    width: 819,
    height: 461
  }
} satisfies Record<string, ImageAsset>;

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/#home' },
  { label: 'Services', href: '/#services' },
  { label: 'About Us', href: '/#about' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Locations', href: '/#locations' },
  { label: 'Dental Tourism', href: '/#dental-tourism' },
  { label: 'Contact', href: '/#contact' }
];

export const HERO_COPY = {
  overline: "KAKINADA'S PREMIER DENTAL CLINIC · EST. 2015",
  titleLines: ['For Beautiful,', 'Natural Smiles.'],
  subtitle:
    'Providing exceptional dental services for families in Kakinada with advanced digital treatments — from routine check-ups to complex maxillofacial surgeries.',
  bullets: [
    'Comprehensive dental services for all ages.',
    'State-of-the-art technology for effective treatments.',
    'Two convenient branches for your accessibility.'
  ],
  primaryCta: {
    label: 'Book on WhatsApp',
    href: '/#contact'
  },
  secondaryCta: {
    label: 'Request a Callback',
    href: '/#contact'
  }
} as const;

export const ABOUT_COPY = {
  label: 'WELCOME TO FRESH DENT',
  heading: 'Welcome to Fresh Dent',
  paragraphs: [
    'At Fresh Dent Family Care Dental Clinic, we are committed to delivering Advanced, ethical and patient-centric dental care in a warm and comfortable environment.',
    'Our clinic serves as a one-stop destination for comprehensive dental and oral healthcare for families in and around Kakinada. We blend evidence-based practices with modern technology to ensure the highest standards of treatment outcomes — from routine dental checkups to complex oral and maxillofacial surgeries.'
  ],
  features: [
    'Comprehensive dental services for all ages.',
    'State-of-the-art technology for effective treatments.',
    'Two convenient branches for your accessibility.'
  ],
  cta: {
    label: 'Book for Appointment →',
    href: '/#contact'
  },
  badge: {
    name: 'Dr. K. Manoj Kumar',
    credentials: 'MDS · FAM · MCHT · MBA',
    role: 'Maxillofacial Surgeon & Implantologist'
  }
} as const;

export const DIGITAL_COPY = {
  label: 'ADVANCED DIGITAL DENTAL CARE',
  heading: 'Providing Exceptional Dental services for families in Kakinada with Advanced Digital Treatments.',
  paragraphs: [
    'FRESH DENT specialists offering advanced treatments is a state-of-the-art facility dedicated to providing comprehensive oral care.',
    'Our Branches typically feature a team of experts in various dental fields, including orthodontics, periodontics, endodontics, and oral surgery, ensuring that patients receive the most specialized care for their individual needs.',
    'From routine check-ups and cleanings to complex procedures like implants, root canals, and cosmetic enhancements, these clinics utilize the latest technology and techniques to deliver precise and effective treatments.'
  ],
  highlights: [
    'CBCT 3D Imaging & Digital Treatment Planning',
    'Intraoral 3D Scanning for Precision Restorations',
    'CAD/CAM Same-Day Crowns & Zirconia Prosthetics',
    'Advanced Digital Smile Design Software'
  ]
} as const;

export const SERVICES_SECTION = {
  label: 'WHAT WE OFFER',
  heading: 'Comprehensive Dental Services Under One Roof.',
  description:
    'Our branches feature teams of experts in orthodontics, periodontics, endodontics, and oral surgery — ensuring the most specialised care for your individual needs.'
} as const;

export const GALLERY_COPY = {
  label: 'INSIDE FRESH DENT',
  heading: 'A Clinic Built Around You.',
  description:
    'Modern, welcoming spaces designed for patient comfort. State-of-the-art technology for exceptional outcomes.'
} as const;

export const TESTIMONIALS_SECTION = {
  label: 'PATIENT STORIES',
  heading: 'Real Results. Real Smiles.',
  previousLabel: 'Previous testimonials',
  nextLabel: 'Next testimonials'
} as const;

export const DOCTOR_SECTION_COPY = {
  label: 'MEET YOUR DOCTOR',
  cta: {
    label: 'Book a Specialist Consultation',
    href: '/#contact'
  }
} as const;

export const TOURISM_COPY = {
  label: 'DENTAL TOURISM INDIA',
  heading: 'World-Class Dentistry at a Fraction of the Cost.',
  paragraphs: [
    'India has become one of the most preferred destinations for dental tourism, offering high-quality dental treatments at significantly lower costs compared to countries like the USA, UK, Canada, and Australia.',
    'At Fresh Dent Family Care, international patients receive world-class care at a fraction of global prices.'
  ],
  checklist: [
    'International patient coordination',
    'Full treatment planning before arrival',
    'Transparent pricing — no hidden fees',
    'Detailed post-treatment care plan',
    'English-speaking clinical team'
  ],
  cta: {
    label: 'Enquire About Dental Tourism →',
    href: '/#contact'
  }
} as const;

export const LOCATIONS_COPY = {
  label: 'OUR BRANCHES',
  heading: 'Two Convenient Locations in Kakinada.',
  description:
    'Choose the branch that is easiest for your family, then call, WhatsApp, or get directions in one tap.',
  ctaLabel: 'Get Directions →'
} as const;

export const CTA_COPY = {
  label: 'BEGIN YOUR JOURNEY',
  heading:
    'Book your dental appointment online with Fresh Dent Family Care, Kakinada – convenient, quick, and just a click away!',
  description:
    'Comprehensive dental services for all ages. State-of-the-art technology for effective treatments. Two convenient branches for your accessibility.',
  primary: {
    label: 'Book on WhatsApp',
    href: '/#contact'
  },
  secondary: {
    label: 'Request a Callback',
    href: '/#contact'
  },
  tertiary: {
    label: 'Call Branch 1: 6300 643 128',
    href: 'tel:+916300643128'
  }
} as const;

export const CONTACT_COPY = {
  label: 'GET IN TOUCH',
  heading: 'Request an Appointment',
  description:
    'Share your treatment interest, preferred branch, and callback time. We will receive your request and make it easier for your family to continue on WhatsApp if needed.',
  form: {
    fields: {
      nameLabel: 'Full Name',
      phoneLabel: 'Phone Number',
      branchLabel: 'Preferred Branch',
      treatmentLabel: 'Treatment Interest',
      callbackLabel: 'Preferred Callback Time',
      messageLabel: 'Message',
      consentLabel:
        'I agree to share my details with Fresh Dent Family Care for appointment coordination.',
      submitLabel: 'Submit Appointment Request'
    }
  },
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.2!2d82.2475!3d16.9891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3827b5!2sKakinada!5e0!3m2!1sen!2sin!4v1'
} as const;

export const FOOTER_COPY = {
  quickLinksHeading: 'Quick Links',
  treatmentsHeading: 'Treatment Pages',
  contactHeading: 'Contact',
  copyright: '© 2026 Fresh Dent Family Care. All rights reserved.',
  locationLine: 'Advanced Dental Care · Kakinada, Andhra Pradesh, India',
  hours: 'Mon–Sat: 9 AM – 8:30 PM'
} as const;

export const CONTACT_DETAILS = {
  email: 'freshdentfamilycare@gmail.com',
  whatsapp: '+91 6300643128',
  whatsappDigits: '916300643128',
  primaryPhone: '6300 643 128',
  primaryPhoneDigits: '916300643128',
  allPhones: '6300 643 128 · 9398141913 · 7416333158',
  hours: 'Monday – Saturday: 9:00 AM – 8:30 PM'
} as const;

export const FLOATING_BUTTONS_COPY = {
  whatsappLabel: 'Open WhatsApp chat with Fresh Dent Family Care',
  callLabel: 'Call Fresh Dent Family Care',
  directionsLabel: 'Get directions to Fresh Dent Family Care',
  backToTopLabel: 'Back to top'
} as const;
export const BRANCHES: Branch[] = [
  {
    id: 'branch-1',
    badge: '01',
    label: 'BRANCH 1 — PRIMARY LOCATION',
    name: 'Ramanayya Peta',
    address:
      '1st Floor, GP Complex, MPDO Office Road, Ramanayya Peta Market, Kakinada – 533005',
    phones: ['6300 643 128'],
    hours: 'Monday – Saturday: 9:00 AM – 8:30 PM',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Fresh+Dent+Family+Care+GP+Complex+MPDO+Office+Road+Ramanayya+Peta+Kakinada'
  },
  {
    id: 'branch-2',
    badge: '02',
    label: 'BRANCH 2',
    name: 'Perrajupeta',
    address:
      'Near Kiran Eye Hospital, Beside Sai Baba Temple, Perrajupeta, Kakinada – 533003',
    phones: ['9398141913', '7416333158'],
    hours: 'Monday – Saturday: 9:00 AM – 8:30 PM',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Fresh+Dent+Family+Care+Perrajupeta+Kakinada'
  }
];

export const DOCTOR: DoctorType = {
  fullName: 'Dr. K. Manoj Kumar',
  qualifications: 'MDS, FAM, MCHT, MBA',
  title: 'Maxillofacial Surgeon & Aesthetic Physician',
  titleSecondary: 'Masters in Hair Transplantation',
  academic:
    'Associate Professor, Dept. of Oral & Maxillofacial Surgery, GSL Dental College and Hospital',
  experience: '9+ years clinical + academic',
  bio:
    'I am a board-certified Oral and Maxillofacial Surgeon with 9+ years of hands-on clinical and academic experience known for precise diagnostic approach, gentle patient handling, and surgical excellence in facial trauma, dental implants, oral pathologies and reconstructive procedures. Alongside my clinical practice, I also serve as an Associate Professor in the Department of Oral and Maxillofacial Surgery at GSL Dental College and Hospital, where I mentor future dental professionals and contribute to academic research.',
  bioParagraphs: [
    'I am a board-certified Oral and Maxillofacial Surgeon with 9+ years of hands-on clinical and academic experience known for precise diagnostic approach, gentle patient handling, and surgical excellence in facial trauma, dental implants, oral pathologies and reconstructive procedures.',
    'Alongside my clinical practice, I also serve as an Associate Professor in the Department of Oral and Maxillofacial Surgery at GSL Dental College and Hospital, where I mentor future dental professionals and contribute to academic research.'
  ],
  pills: ['MDS', 'FAM', 'MCHT', 'MBA', 'Associate Professor'],
  expertiseTags: [
    'Facial Trauma',
    'Dental Implants',
    'Orthognathic Surgery',
    'Oral Pathology',
    'Hair Transplantation',
    'Aesthetic Medicine',
    'Implantology',
    'Oral & Maxillofacial Surgery'
  ]
};

export const TREATMENT_INTENTS: TreatmentIntent[] = [
  { key: 'general-consultation', label: 'General Consultation' },
  { key: 'dental-implants', label: 'Dental Implants' },
  { key: 'root-canal-treatment', label: 'Root Canal Treatment' },
  { key: 'smile-design', label: 'Smile Design' },
  { key: 'orthodontics-braces', label: 'Orthodontics / Braces' },
  { key: 'pediatric-dentistry', label: 'Pediatric Dentistry' },
  { key: 'maxillofacial-surgery', label: 'Maxillofacial Surgery' },
  { key: 'dental-tourism', label: 'Dental Tourism' },
  { key: 'wisdom-tooth-removal', label: 'Wisdom Tooth Removal' },
  { key: 'zirconia-crowns', label: 'Zirconia Crowns' }
];

export const HERO_INTENT_SHORTCUTS: IntentShortcut[] = [
  { label: 'Dental Implants', href: '/services/dental-implants' },
  { label: 'Root Canal', href: '/services/root-canal-treatment' },
  { label: 'Smile Design', href: '/services/smile-design' },
  { label: 'Compare Branches', href: '/#locations' }
];

export const FORM_PRIORITY_INTENTS: IntentChip[] = [
  { key: 'general-consultation', label: 'General Checkup' },
  { key: 'dental-implants', label: 'Dental Implants' },
  { key: 'root-canal-treatment', label: 'Root Canal' },
  { key: 'smile-design', label: 'Smile Design' },
  { key: 'orthodontics-braces', label: 'Braces' },
  { key: 'maxillofacial-surgery', label: 'Surgery' }
];

export const SERVICE_DISCOVERY_SHORTCUTS: IntentShortcut[] = [
  { label: 'Dental Implants', href: '/services/dental-implants' },
  { label: 'Root Canal Treatment', href: '/services/root-canal-treatment' },
  { label: 'Smile Design', href: '/services/smile-design' },
  { label: 'Braces / Orthodontics', href: '/services/braces-orthodontics' },
  { label: 'Wisdom Tooth Removal', href: '/services/wisdom-tooth-removal' },
  { label: 'Maxillofacial Surgery', href: '/services/oral-maxillofacial-surgery' }
];

export const CONTACT_DECISION_CARDS: DecisionCard[] = [
  {
    title: 'Need the fastest reply?',
    description: 'Start on WhatsApp if you already know your concern and want immediate booking support.',
    href: '/#contact',
    kind: 'whatsapp'
  },
  {
    title: 'Prefer a callback instead?',
    description: 'Use the form if you want the clinic to call you back with branch and treatment context.',
    href: '/#contact',
    kind: 'form'
  },
  {
    title: 'Still choosing a branch?',
    description: 'Compare Ramanayya Peta and Perrajupeta before you submit so your enquiry reaches the right location path.',
    href: '/#locations',
    kind: 'branch'
  }
];

export const BRANCH_DECISION_NOTES: BranchDecisionNote[] = [
  {
    branchId: 'branch-1',
    title: 'Best if Ramanayya Peta is easier for your visit.',
    description: 'Choose this branch when the GP Complex and MPDO Office Road side is more convenient for your family.'
  },
  {
    branchId: 'branch-2',
    title: 'Best if Perrajupeta is easier for your visit.',
    description: 'Choose this branch when the Kiran Eye Hospital and Sai Baba Temple side is more convenient for your family.'
  }
];

export const CALLBACK_TIME_OPTIONS = [
  'Morning (9 AM – 12 PM)',
  'Afternoon (12 PM – 4 PM)',
  'Evening (4 PM – 8:30 PM)'
] as const;

export const SERVICES: Service[] = [
  {
    icon: 'Smile',
    title: 'Advanced Dentistry',
    description:
      'Comprehensive care addressing all dental needs with precision, from fillings and crowns to full-mouth rehabilitation.',
    enquiryLabel: 'Enquire →',
    intentKey: 'general-consultation'
  },
  {
    icon: 'Scissors',
    title: 'Maxillo Facial Surgery',
    description:
      'Expert management of facial trauma, jaw deformities, oral pathologies, and complex reconstructive procedures.',
    enquiryLabel: 'Enquire →',
    intentKey: 'maxillofacial-surgery',
    detailHref: '/services/oral-maxillofacial-surgery'
  },
  {
    icon: 'Anchor',
    title: 'Dental Implants',
    description:
      'Permanent, natural-looking tooth replacements. Single implants to full arch restorations using titanium and zirconia.',
    enquiryLabel: 'Enquire →',
    intentKey: 'dental-implants',
    detailHref: '/services/dental-implants'
  },
  {
    icon: 'Sparkles',
    title: 'Advanced Digital Smile Designing',
    description:
      'See your new smile before treatment begins. Digital design with laminates, veneers, and composite bonding.',
    enquiryLabel: 'Enquire →',
    intentKey: 'smile-design',
    detailHref: '/services/smile-design'
  },
  {
    icon: 'AlignCenter',
    title: 'Advanced Clip Treatments',
    description:
      'Metal braces, ceramic brackets, and modern orthodontic systems for children, teens, and adults.',
    enquiryLabel: 'Enquire →',
    intentKey: 'orthodontics-braces',
    detailHref: '/services/braces-orthodontics'
  },
  {
    icon: 'Zap',
    title: 'Laser Gum Surgery',
    description:
      'Minimally invasive laser treatment for gum disease, frenectomy, and soft tissue corrections.',
    enquiryLabel: 'Enquire →',
    intentKey: 'general-consultation'
  },
  {
    icon: 'RotateCcw',
    title: 'Single Sitting Rotary Root Canal Treatment',
    description:
      'Rotary root canal therapy completed in a single appointment. Painless, precise, and proven.',
    enquiryLabel: 'Enquire →',
    intentKey: 'root-canal-treatment',
    detailHref: '/services/root-canal-treatment'
  },
  {
    icon: 'MinusCircle',
    title: 'Wisdom Tooth Removal',
    description:
      'Safe and comfortable surgical extraction of impacted or problematic third molars with minimal recovery time.',
    enquiryLabel: 'Enquire →',
    intentKey: 'wisdom-tooth-removal',
    detailHref: '/services/wisdom-tooth-removal'
  },
  {
    icon: 'Crown',
    title: 'Advanced Zirconia Crowns',
    description:
      'Premium all-ceramic zirconia crowns for strength, aesthetics, and long-term biocompatibility.',
    enquiryLabel: 'Enquire →',
    intentKey: 'zirconia-crowns',
    detailHref: '/services/zirconia-crowns'
  },
  {
    icon: 'Users',
    title: 'Family Dental Services',
    description:
      'Comprehensive oral care for every member of your family, from toddlers to seniors.',
    enquiryLabel: 'Enquire →',
    intentKey: 'general-consultation'
  },
  {
    icon: 'Baby',
    title: 'Pediatric Dentistry',
    description:
      'Gentle, child-friendly dental care building positive habits and healthy smiles from the very first tooth.',
    enquiryLabel: 'Enquire →',
    intentKey: 'pediatric-dentistry',
    detailHref: '/services/pediatric-dentistry'
  },
  {
    icon: 'Feather',
    title: 'Hair Transplantation',
    description:
      'Advanced hair restoration procedures performed by Dr. Kumar — a certified specialist in hair transplantation.',
    enquiryLabel: 'Enquire →',
    intentKey: 'general-consultation',
    isSecondary: true
  },
  {
    icon: 'Heart',
    title: 'Aesthetic Medicine',
    description:
      'Non-surgical cosmetic treatments enhancing facial harmony and confidence alongside your dental care.',
    enquiryLabel: 'Enquire →',
    intentKey: 'general-consultation',
    isSecondary: true
  }
];

export const TRUST_HIGHLIGHTS: TrustHighlight[] = [
  {
    icon: 'ShieldCheck',
    title: 'Doctor-led specialist care',
    description: 'Led by Dr. K. Manoj Kumar with specialist oral and maxillofacial expertise.'
  },
  {
    icon: 'MapPinned',
    title: 'Two accessible Kakinada branches',
    description: 'Convenient branch options in Ramanayya Peta and Perrajupeta.'
  },
  {
    icon: 'ScanLine',
    title: 'Advanced digital treatment planning',
    description: 'Digital diagnostics and modern workflows for precise treatment planning.'
  },
  {
    icon: 'MessageSquareShare',
    title: 'WhatsApp-first booking support',
    description: 'Quick appointment coordination through WhatsApp, call, and guided branch contact.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    stars: 5,
    name: 'Saraswathi',
    quote:
      'Fresh Dent Family Care provided exceptional service! The advanced digital treatments made my dental experience comfortable and efficient. Highly recommend their Kakinada branches for all dental needs.'
  },
  {
    stars: 5,
    name: 'Ravi Kumar — Dental Implant Patient',
    quote:
      "My implant procedure was handled with extraordinary precision and care. The team explained every step clearly and the results look completely natural. I didn't feel like a patient — I felt like a priority."
  },
  {
    stars: 5,
    name: 'Priya Lakshmi — Smile Design Patient',
    quote:
      'The digital smile design experience was unlike anything I expected. I could see exactly what my new smile would look like before treatment even began. Absolutely life-changing confidence.'
  },
  {
    stars: 5,
    name: 'Suresh Babu — Root Canal Patient',
    quote:
      'Root canal in a single sitting with zero pain. The rotary technology here is on another level. I walked in nervous and walked out smiling. Cannot thank Dr. Manoj Kumar enough.'
  },
  {
    stars: 5,
    name: 'Meena R. — Maxillofacial Surgery Patient',
    quote:
      'After my jaw surgery with Dr. Kumar, my quality of life improved dramatically. The follow-up care was meticulous and I always felt like a priority, not just another patient.'
  }
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    ...IMAGE_ASSETS.doctorWithHappyPatient,
    captionTopic: 'Compassionate Family Care'
  },
  {
    ...IMAGE_ASSETS.intraoralScanner,
    captionTopic: 'Advanced Digital Dentistry'
  },
  {
    ...IMAGE_ASSETS.flapSurgery,
    captionTopic: 'Expert Surgical Precision'
  },
  {
    ...IMAGE_ASSETS.presentation,
    captionTopic: 'Academically Led. Clinically Proven.'
  },
  {
    ...IMAGE_ASSETS.smileDesign,
    captionTopic: 'Beautiful Natural Smiles'
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Facebook', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Youtube', href: '#' }
];

export const GALLERY_CELLS: GalleryCell[] = [
  {
    id: 'cell-a',
    className: 'md:col-span-7 md:row-span-2',
    ...IMAGE_ASSETS.intraoralScanner
  },
  {
    id: 'cell-b',
    className: 'md:col-span-5 md:row-span-1',
    ...IMAGE_ASSETS.presentation
  },
  {
    id: 'cell-c',
    className: 'md:col-span-5 md:row-span-1',
    ...IMAGE_ASSETS.flapSurgery
  },
  {
    id: 'cell-d',
    className: 'md:col-span-4 md:row-span-1',
    ...IMAGE_ASSETS.smileDesign
  },
  {
    id: 'cell-e',
    className: 'md:col-span-4 md:row-span-1',
    ...IMAGE_ASSETS.dentalProcedureCloseup
  },
  {
    id: 'cell-f',
    className: 'md:col-span-4 md:row-span-1',
    ...IMAGE_ASSETS.doctorWithHappyPatient
  }
];

export const HOMEPAGE_FAQS: FaqItem[] = [
  {
    question: 'Can I book an appointment on WhatsApp?',
    answer:
      'Yes. WhatsApp is the fastest booking path on the site, and treatment or branch context can be added to the message before you send it.'
  },
  {
    question: 'Do you see children and adults at Fresh Dent Family Care?',
    answer:
      'Yes. Fresh Dent Family Care offers dental services for families, including pediatric and adult dental care.'
  },
  {
    question: 'Which branch should I choose in Kakinada?',
    answer:
      'Choose the branch that is most convenient for you. The site highlights both Ramanayya Peta and Perrajupeta so you can call, get directions, or request help choosing the right branch.'
  },
  {
    question: 'Do you offer advanced digital dental treatments?',
    answer:
      'Yes. Fresh Dent Family Care positions its care around advanced digital treatments, including digital diagnostics and modern treatment planning workflows.'
  },
  {
    question: 'Can I enquire about implants, root canal treatment, smile design, or surgery online?',
    answer:
      'Yes. You can open a treatment-specific WhatsApp enquiry, request a callback, or visit the dedicated treatment page to understand the next step.'
  }
];
export const TREATMENT_PAGES: TreatmentPage[] = [
  {
    slug: 'dental-implants',
    intentKey: 'dental-implants',
    eyebrow: 'Dental Implants in Kakinada',
    title: 'Dental Implants',
    metaTitle: 'Dental Implants in Kakinada | Fresh Dent Family Care',
    metaDescription:
      'Explore dental implant treatment at Fresh Dent Family Care in Kakinada. WhatsApp-first consultation flow, doctor-led implant planning, and two convenient branches.',
    summary:
      'Permanent, natural-looking tooth replacements planned around your smile, bite, and long-term function.',
    serviceSummary:
      'Fresh Dent Family Care provides implant consultations for single-tooth replacement, multiple missing teeth, and full-arch rehabilitation planning using modern digital workflows.',
    suitableFor: [
      'People missing one or more teeth',
      'Patients looking for a fixed tooth-replacement option',
      'Patients who want an implant consultation before restorative treatment'
    ],
    commonConcerns: [
      'Whether implants are suitable after evaluation',
      'How treatment planning and visits may be structured',
      'How the final result can blend with surrounding teeth'
    ],
    faqs: [
      {
        question: 'Who is a suitable candidate for dental implants?',
        answer:
          'Suitability depends on your oral condition, overall health, and clinical evaluation. Fresh Dent Family Care can assess your case and explain the treatment plan before you proceed.'
      },
      {
        question: 'How many visits are needed for implant treatment?',
        answer:
          'The number of visits depends on the clinical situation and whether preparatory treatment is needed. The team can explain the likely stages after evaluation.'
      },
      {
        question: 'Can I ask about implant costs before starting treatment?',
        answer:
          'Yes. The clinic can discuss treatment planning, available options, and the likely fee structure after your consultation and assessment.'
      }
    ],
    relatedSlugs: ['zirconia-crowns', 'root-canal-treatment', 'smile-design']
  },
  {
    slug: 'root-canal-treatment',
    intentKey: 'root-canal-treatment',
    eyebrow: 'Root Canal Treatment in Kakinada',
    title: 'Root Canal Treatment',
    metaTitle: 'Root Canal Treatment in Kakinada | Fresh Dent Family Care',
    metaDescription:
      'Learn about root canal treatment at Fresh Dent Family Care in Kakinada, including WhatsApp-first enquiries, callback requests, and specialist-led care.',
    summary:
      'Single sitting rotary root canal treatment designed to protect the tooth while reducing treatment friction for patients.',
    serviceSummary:
      'Fresh Dent Family Care offers rotary root canal treatment with modern workflows for patients who need timely, precise endodontic care.',
    suitableFor: [
      'Patients with tooth pain, infection, or prolonged sensitivity',
      'Patients advised to save a natural tooth instead of extracting it',
      'Patients looking for a clear treatment plan before restorative follow-up'
    ],
    commonConcerns: [
      'Whether the tooth can be saved',
      'How many appointments may be required',
      'What restoration may be needed after treatment'
    ],
    faqs: [
      {
        question: 'Is every root canal completed in one sitting?',
        answer:
          'Treatment timing depends on the tooth and its condition. Fresh Dent Family Care offers single sitting rotary root canal treatment where clinically appropriate.'
      },
      {
        question: 'Will I know the next step after the procedure?',
        answer:
          'Yes. The team can guide you on restoration planning, follow-up, and what to expect after your appointment.'
      },
      {
        question: 'Can I enquire on WhatsApp before visiting?',
        answer:
          'Yes. You can start with a WhatsApp enquiry and include root canal treatment as your treatment interest.'
      }
    ],
    relatedSlugs: ['zirconia-crowns', 'wisdom-tooth-removal', 'dental-implants']
  },
  {
    slug: 'smile-design',
    intentKey: 'smile-design',
    eyebrow: 'Smile Design in Kakinada',
    title: 'Smile Design',
    metaTitle: 'Smile Design in Kakinada | Fresh Dent Family Care',
    metaDescription:
      'Discover smile design and cosmetic dentistry consultations at Fresh Dent Family Care in Kakinada, with digital planning and WhatsApp-first enquiries.',
    summary:
      'Advanced digital smile design that helps you understand the planned outcome before treatment begins.',
    serviceSummary:
      'Fresh Dent Family Care offers smile design consultations using digital planning, laminates, veneers, bonding, and cosmetic treatment pathways based on your goals.',
    suitableFor: [
      'Patients concerned about shape, alignment, or smile balance',
      'Patients exploring cosmetic treatment planning',
      'Patients who want to understand options before deciding on treatment'
    ],
    commonConcerns: [
      'Which cosmetic options may suit the smile',
      'How digital planning can support decision-making',
      'Whether cosmetic and restorative steps need to be combined'
    ],
    faqs: [
      {
        question: 'What does digital smile design help with?',
        answer:
          'It helps patients and the clinic discuss treatment direction, smile goals, and the overall design approach before treatment moves ahead.'
      },
      {
        question: 'Is smile design only for cosmetic cases?',
        answer:
          'Smile planning may also overlap with restorative treatment when aesthetics and function need to work together.'
      },
      {
        question: 'Can I enquire about smile design before choosing treatment?',
        answer:
          'Yes. The treatment page and WhatsApp enquiry flow are built to help you start the conversation before a clinic visit.'
      }
    ],
    relatedSlugs: ['zirconia-crowns', 'dental-implants', 'braces-orthodontics']
  },
  {
    slug: 'wisdom-tooth-removal',
    intentKey: 'wisdom-tooth-removal',
    eyebrow: 'Wisdom Tooth Removal in Kakinada',
    title: 'Wisdom Tooth Removal',
    metaTitle: 'Wisdom Tooth Removal in Kakinada | Fresh Dent Family Care',
    metaDescription:
      'Explore wisdom tooth removal consultations at Fresh Dent Family Care in Kakinada, with specialist surgical guidance and fast WhatsApp booking options.',
    summary:
      'Surgical evaluation and removal planning for impacted or problematic wisdom teeth.',
    serviceSummary:
      'Fresh Dent Family Care offers wisdom tooth removal consultations for painful, impacted, or difficult third molars, with a clear explanation of the surgical next step.',
    suitableFor: [
      'Patients with pain, swelling, or pressure around wisdom teeth',
      'Patients advised to remove an impacted third molar',
      'Patients seeking surgical guidance before proceeding'
    ],
    commonConcerns: [
      'Whether the tooth is impacted or problematic',
      'When removal is recommended after evaluation',
      'What the immediate next step may be after consultation'
    ],
    faqs: [
      {
        question: 'Do all wisdom teeth need to be removed?',
        answer:
          'No. Removal depends on symptoms, position, and clinical evaluation. The clinic can advise whether treatment is necessary in your case.'
      },
      {
        question: 'Can I ask about surgery before booking?',
        answer:
          'Yes. You can use the WhatsApp-first flow or request a callback to start the conversation before your visit.'
      },
      {
        question: 'Is a surgical consultation available for difficult cases?',
        answer:
          'Yes. Fresh Dent Family Care includes maxillofacial and surgical expertise for cases that need specialist-led assessment.'
      }
    ],
    relatedSlugs: ['oral-maxillofacial-surgery', 'root-canal-treatment', 'dental-implants']
  },
  {
    slug: 'braces-orthodontics',
    intentKey: 'orthodontics-braces',
    eyebrow: 'Braces and Orthodontics in Kakinada',
    title: 'Braces and Orthodontic Treatment',
    metaTitle: 'Braces and Orthodontics in Kakinada | Fresh Dent Family Care',
    metaDescription:
      'Learn about braces and orthodontic treatment at Fresh Dent Family Care in Kakinada, with treatment-specific WhatsApp enquiries and callback requests.',
    summary:
      'Orthodontic treatment planning for children, teens, and adults using modern braces and alignment systems.',
    serviceSummary:
      'Fresh Dent Family Care offers orthodontic consultations for bite correction, crowded teeth, spacing, and alignment-focused treatment planning.',
    suitableFor: [
      'Children, teens, or adults with crowding or spacing concerns',
      'Patients exploring braces or alignment options',
      'Patients who want a treatment discussion before starting orthodontics'
    ],
    commonConcerns: [
      'Which treatment options are appropriate after evaluation',
      'How treatment planning is explained before starting',
      'Whether orthodontics should be combined with other dental care'
    ],
    faqs: [
      {
        question: 'Do you offer orthodontic consultations for adults as well as children?',
        answer:
          'Yes. The clinic offers orthodontic planning for children, teens, and adults depending on the case.'
      },
      {
        question: 'Can I enquire before deciding on braces?',
        answer:
          'Yes. You can start with WhatsApp or request a callback to discuss alignment concerns before visiting.'
      },
      {
        question: 'Will I know the next step after the first orthodontic visit?',
        answer:
          'Yes. The clinic can explain treatment direction, likely planning needs, and what comes next after evaluation.'
      }
    ],
    relatedSlugs: ['smile-design', 'pediatric-dentistry', 'zirconia-crowns']
  },
  {
    slug: 'pediatric-dentistry',
    intentKey: 'pediatric-dentistry',
    eyebrow: 'Pediatric Dentist in Kakinada',
    title: 'Pediatric Dentistry',
    metaTitle: 'Pediatric Dentist in Kakinada | Fresh Dent Family Care',
    metaDescription:
      'Explore pediatric dental consultations at Fresh Dent Family Care in Kakinada, with family-friendly booking paths and easy branch access.',
    summary:
      'Gentle dental care for children, designed to build comfort, healthy routines, and positive early experiences.',
    serviceSummary:
      'Fresh Dent Family Care supports children and families with child-friendly dental care, preventive visits, and practical guidance for healthier long-term habits.',
    suitableFor: [
      'Parents booking a child’s first dental visit',
      'Children needing preventive or routine dental care',
      'Families who want age-appropriate dental guidance'
    ],
    commonConcerns: [
      'Making the first visit more comfortable for children',
      'Understanding what treatment or prevention may be needed',
      'Choosing a convenient branch for family appointments'
    ],
    faqs: [
      {
        question: 'Can I book my child’s dental visit on WhatsApp?',
        answer:
          'Yes. The WhatsApp-first flow can include pediatric dentistry as the treatment interest so your request is more specific from the start.'
      },
      {
        question: 'Do you see families at both branches?',
        answer:
          'Fresh Dent Family Care serves families in Kakinada through both branches, making it easier to choose a convenient location.'
      },
      {
        question: 'Can I request a callback instead of chatting?',
        answer:
          'Yes. The appointment form supports a callback preference and branch selection for easier coordination.'
      }
    ],
    relatedSlugs: ['braces-orthodontics', 'smile-design', 'root-canal-treatment']
  },
  {
    slug: 'zirconia-crowns',
    intentKey: 'zirconia-crowns',
    eyebrow: 'Zirconia Crowns in Kakinada',
    title: 'Zirconia Crowns',
    metaTitle: 'Zirconia Crowns in Kakinada | Fresh Dent Family Care',
    metaDescription:
      'Review zirconia crown consultations at Fresh Dent Family Care in Kakinada, including restorative planning and treatment-specific WhatsApp enquiries.',
    summary:
      'Premium zirconia crown planning for strength, aesthetics, and long-term restorative support.',
    serviceSummary:
      'Fresh Dent Family Care offers zirconia crown consultations for patients who need strong and aesthetic tooth restoration after evaluation and treatment planning.',
    suitableFor: [
      'Patients who need a crown after restorative treatment',
      'Patients looking for a durable aesthetic crown option',
      'Patients who want to understand restorative choices before treatment'
    ],
    commonConcerns: [
      'Whether zirconia is appropriate for the tooth involved',
      'How crown planning fits with existing dental treatment',
      'What the restorative sequence may look like after evaluation'
    ],
    faqs: [
      {
        question: 'When is a zirconia crown recommended?',
        answer:
          'Recommendation depends on the tooth, the treatment plan, and the restorative need after clinical evaluation.'
      },
      {
        question: 'Can zirconia crowns be discussed after root canal treatment?',
        answer:
          'Yes. Restorative planning can be discussed after endodontic treatment when a crown is being considered.'
      },
      {
        question: 'Can I ask about crown options before treatment starts?',
        answer:
          'Yes. You can enquire on WhatsApp or request a callback to discuss restorative options before your visit.'
      }
    ],
    relatedSlugs: ['root-canal-treatment', 'dental-implants', 'smile-design']
  },
  {
    slug: 'oral-maxillofacial-surgery',
    intentKey: 'maxillofacial-surgery',
    eyebrow: 'Oral and Maxillofacial Surgery in Kakinada',
    title: 'Oral & Maxillofacial Surgery',
    metaTitle: 'Maxillofacial Surgeon in Kakinada | Fresh Dent Family Care',
    metaDescription:
      'Connect with Dr. K. Manoj Kumar for oral and maxillofacial surgery consultations in Kakinada, with specialist-led assessment and WhatsApp-first booking.',
    summary:
      'Specialist-led surgical consultation for facial trauma, jaw concerns, oral pathology, and related treatment planning.',
    serviceSummary:
      'Fresh Dent Family Care supports oral and maxillofacial surgery consultations under the leadership of Dr. K. Manoj Kumar for cases that need specialist-led evaluation.',
    suitableFor: [
      'Patients referred for oral surgery or jaw-related concerns',
      'Patients with facial trauma or complex oral pathology questions',
      'Patients who need a specialist opinion before treatment planning'
    ],
    commonConcerns: [
      'Whether the case needs surgical management',
      'How diagnosis and treatment planning are explained',
      'Which branch and next step are most suitable for the case'
    ],
    faqs: [
      {
        question: 'What types of concerns can be discussed in a maxillofacial surgery consultation?',
        answer:
          'Patients can enquire about facial trauma, jaw-related concerns, oral pathologies, surgical extractions, and other cases that may need specialist-led evaluation.'
      },
      {
        question: 'Is Dr. K. Manoj Kumar involved in specialist surgical care?',
        answer:
          'Yes. Dr. K. Manoj Kumar is the specialist-led authority presented on the website for oral and maxillofacial surgery care.'
      },
      {
        question: 'Can I start with WhatsApp before booking an in-clinic evaluation?',
        answer:
          'Yes. The WhatsApp-first booking system lets you share your concern and get oriented to the right next step.'
      }
    ],
    relatedSlugs: ['wisdom-tooth-removal', 'dental-implants', 'root-canal-treatment']
  }
];

export const SERVICE_PAGE_LINKS = TREATMENT_PAGES.map((page) => ({
  label: page.title,
  href: `/services/${page.slug}`
}));

export const FOOTER_QUICK_LINKS: NavItem[] = [
  { label: 'Home', href: '/#home' },
  { label: 'Services', href: '/#services' },
  { label: 'About Us', href: '/#about' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Dental Tourism', href: '/#dental-tourism' },
  { label: 'Contact', href: '/#contact' }
];
