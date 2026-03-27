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

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Branch {
  id: string;
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

export interface Service {
  icon: string;
  title: string;
  description: string;
  enquiryLabel: string;
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

export const CLINIC_NAME = 'FRESH DENT FAMILY CARE';
export const TAGLINE = 'for Beautiful Natural Smiles...';
export const SUB_TAGLINE =
  'Providing Exceptional Dental services for families in Kakinada with Advanced Digital Treatments.';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About Us', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Locations', href: '#locations' },
  { label: 'Dental Tourism', href: '#dental-tourism' }
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
    label: 'Book Appointment',
    href: 'tel:+916300643128'
  },
  secondaryCta: {
    label: 'Our Services',
    href: '#services'
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
    href: 'tel:+916300643128'
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
    label: 'Book a Consultation',
    href: 'tel:+916300643128'
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
    href: '#contact'
  }
} as const;

export const LOCATIONS_COPY = {
  label: 'OUR BRANCHES',
  heading: 'Two Convenient Locations in Kakinada.',
  ctaLabel: 'Get Directions →'
} as const;

export const CTA_COPY = {
  label: 'BEGIN YOUR JOURNEY',
  heading:
    'Book your dental appointment online with Fresh Dent Family Care, Kakinada – convenient, quick, and just a click away!',
  description:
    'Comprehensive dental services for all ages. State-of-the-art technology for effective treatments. Two convenient branches for your accessibility.',
  primary: {
    label: 'Call Branch 1: 6300 643 128',
    href: 'tel:+916300643128'
  },
  secondary: {
    label: 'Call Branch 2: 9398141913',
    href: 'tel:+919398141913'
  },
  tertiary: {
    label: 'Email Us →',
    href: 'mailto:freshdentfamilycare@gmail.com'
  }
} as const;

export const CONTACT_COPY = {
  label: 'GET IN TOUCH',
  heading: 'Contact Us',
  description: 'Get in touch for appointments at Fresh Dent Family Care.',
  form: {
    action: 'mailto:freshdentfamilycare@gmail.com',
    method: 'post',
    encType: 'text/plain',
    fields: {
      nameLabel: 'Full Name',
      phoneLabel: 'Phone Number',
      emailLabel: 'Email Address',
      treatmentLabel: 'Treatment Interest',
      messageLabel: 'Message',
      submitLabel: 'Submit Appointment Request',
      options: [
        'General Enquiry',
        'Dental Implants',
        'Root Canal Treatment',
        'Smile Design',
        'Maxillofacial Surgery',
        'Orthodontics & Braces',
        'Pediatric Dentistry',
        'Hair Transplantation',
        'Dental Tourism'
      ]
    }
  },
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.2!2d82.2475!3d16.9891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3827b5!2sKakinada!5e0!3m2!1sen!2sin!4v1'
} as const;

export const FOOTER_COPY = {
  quickLinksHeading: 'Quick Links',
  treatmentsHeading: 'Treatments',
  contactHeading: 'Contact',
  copyright: '© 2025 Fresh Dent Family Care. All rights reserved.',
  locationLine: 'Advanced Dental Care · Kakinada, Andhra Pradesh, India',
  hours: 'Mon–Sat: 9 AM – 8:30 PM',
  treatments: [
    'Dental Implants',
    'Maxillo Facial Surgery',
    'Smile Design',
    'Root Canal',
    'Orthodontics',
    'Laser Surgery',
    'Hair Transplantation',
    'Zirconia Crowns'
  ]
} as const;

export const FOOTER_QUICK_LINKS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About Us', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Dental Tourism', href: '#dental-tourism' },
  { label: 'Contact', href: '#contact' }
];

export const CONTACT_DETAILS = {
  email: 'freshdentfamilycare@gmail.com',
  whatsapp: '+91 6300643128',
  primaryPhone: '6300 643 128',
  allPhones: '6300 643 128 · 9398141913 · 7416333158',
  hours: 'Monday – Saturday: 9:00 AM – 8:30 PM'
} as const;

export const FLOATING_BUTTONS_COPY = {
  whatsappLabel: 'Open WhatsApp chat with Fresh Dent Family Care',
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

export const SERVICES: Service[] = [
  {
    icon: 'Smile',
    title: 'Advanced Dentistry',
    description:
      'Comprehensive care addressing all dental needs with precision, from fillings and crowns to full-mouth rehabilitation.',
    enquiryLabel: 'Enquire →'
  },
  {
    icon: 'Scissors',
    title: 'Maxillo Facial Surgery',
    description:
      'Expert management of facial trauma, jaw deformities, oral pathologies, and complex reconstructive procedures.',
    enquiryLabel: 'Enquire →'
  },
  {
    icon: 'Anchor',
    title: 'Dental Implants',
    description:
      'Permanent, natural-looking tooth replacements. Single implants to full arch restorations using titanium and zirconia.',
    enquiryLabel: 'Enquire →'
  },
  {
    icon: 'Sparkles',
    title: 'Advanced Digital Smile Designing',
    description:
      'See your new smile before treatment begins. Digital design with laminates, veneers, and composite bonding.',
    enquiryLabel: 'Enquire →'
  },
  {
    icon: 'AlignCenter',
    title: 'Advanced Clip Treatments',
    description:
      'Metal braces, ceramic brackets, and modern orthodontic systems for children, teens, and adults.',
    enquiryLabel: 'Enquire →'
  },
  {
    icon: 'Zap',
    title: 'Laser Gum Surgery',
    description:
      'Minimally invasive laser treatment for gum disease, frenectomy, and soft tissue corrections.',
    enquiryLabel: 'Enquire →'
  },
  {
    icon: 'RotateCcw',
    title: 'Single Sitting Rotary Root Canal Treatment',
    description:
      'Rotary root canal therapy completed in a single appointment. Painless, precise, and proven.',
    enquiryLabel: 'Enquire →'
  },
  {
    icon: 'MinusCircle',
    title: 'Wisdom Tooth Removal',
    description:
      'Safe and comfortable surgical extraction of impacted or problematic third molars with minimal recovery time.',
    enquiryLabel: 'Enquire →'
  },
  {
    icon: 'Crown',
    title: 'Advanced Zirconia Crowns',
    description:
      'Premium all-ceramic zirconia crowns for strength, aesthetics, and long-term biocompatibility.',
    enquiryLabel: 'Enquire →'
  },
  {
    icon: 'Users',
    title: 'Family Dental Services',
    description:
      'Comprehensive oral care for every member of your family, from toddlers to seniors.',
    enquiryLabel: 'Enquire →'
  },
  {
    icon: 'Baby',
    title: 'Pediatric Dentistry',
    description:
      'Gentle, child-friendly dental care building positive habits and healthy smiles from the very first tooth.',
    enquiryLabel: 'Enquire →'
  },
  {
    icon: 'Feather',
    title: 'Hair Transplantation',
    description:
      'Advanced hair restoration procedures performed by Dr. Kumar — a certified specialist in hair transplantation.',
    enquiryLabel: 'Enquire →'
  },
  {
    icon: 'Heart',
    title: 'Aesthetic Medicine',
    description:
      'Non-surgical cosmetic treatments enhancing facial harmony and confidence alongside your dental care.',
    enquiryLabel: 'Enquire →'
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

export const STATS: Stat[] = [
  { value: 9, suffix: '+', label: 'Years of Excellence' },
  { value: 2, suffix: '', label: 'Branches in Kakinada' },
  { value: 5000, suffix: '+', label: 'Patients Served' },
  { value: 13, suffix: '+', label: 'Treatment Specialties' }
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
