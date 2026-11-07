import { Service, GalleryItem, BridalPackage, BridalAddon, TeamMember, Review } from '../types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'glow-facial',
    name: 'Glow Radiance Facial',
    category: 'facial',
    duration: '60 Mins',
    price: 1999,
    priceDisplay: 'From ₹1,999',
    popular: true,
    description: 'Deep pore cleansing, ultrasonic hydration, and botanical vitamin infusions for an illuminated complexion.',
    inclusions: [
      'Double enzymatic exfoliation',
      'Ultrasonic dermal pore extraction',
      'Hydrating botanical gold hydrojelly mask',
      'Cold globes cryo face & neck lymphatic drainage',
      'Custom peptide & SPF barrier lock'
    ],
    benefits: [
      'Restores natural cellular glow',
      'Diminishes fine dryness lines',
      'Refines pores without redness'
    ],
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hair-couture',
    name: 'Hair Couture & Spa',
    category: 'hair',
    duration: '45–90 Mins',
    price: 1499,
    priceDisplay: 'From ₹1,499',
    popular: true,
    description: 'Precision haircuts, bespoke balayage, keratin smoothing, and deep detoxifying hair spa therapies.',
    inclusions: [
      'Scalp micro-camera diagnostics',
      'Olaplex / Kérastase deep bond repair',
      'Aromatherapeutic hot steam scalp ritual',
      'Custom precision dry or wet styling',
      'Dyson supersonic signature blowout'
    ],
    benefits: [
      'Repairs chemical & heat damage',
      'Ultra glossy, frizz-free texture',
      'Tailored to facial bone structure'
    ],
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'nail-extensions',
    name: 'Nail Extensions & Art',
    category: 'nails',
    duration: '45–75 Mins',
    price: 1199,
    priceDisplay: 'From ₹1,199',
    popular: false,
    description: 'Russian manicures, gel extensions, custom chrome finishes, and soothing paraffin spa pedicures.',
    inclusions: [
      'Russian dry cuticle perfecting prep',
      'Odorless builder gel or soft gel tips',
      'Hand-painted luxury nail art / chrome glaze',
      'Organic almond oil cuticle treatment',
      'Warm rose paraffin hand dip'
    ],
    benefits: [
      'Durable chip-free finish up to 4 weeks',
      'Protects natural nail beds',
      'Bespoke shapes (Almond, Coffin, Stiletto, Oval)'
    ],
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'party-glam',
    name: 'Party & Glam Makeup',
    category: 'makeup',
    duration: '60 Mins',
    price: 3499,
    priceDisplay: 'From ₹3,499',
    popular: true,
    description: 'Long-wear HD and airbrush makeup tailored to your skin tone and event lighting for picture-perfect results.',
    inclusions: [
      'Skin prep with luxury hydrating serums',
      'Custom shade matching HD foundation',
      'Dimensional contouring & champagne highlight',
      'Silk false mink eyelashes application',
      '24-Hour transfer-proof finishing veil'
    ],
    benefits: [
      'Flash-photography safe with zero flashback',
      'Feels weightless and breathable',
      'Sweat and humidity resistant'
    ],
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gold-theme-ritual',
    name: '24K Imperial Gold Themed Ritual',
    category: 'themed',
    duration: '75 Mins',
    price: 2799,
    priceDisplay: 'From ₹2,799',
    popular: true,
    description: 'Our signature multi-sensory themed experience featuring 24K gold leaves, warm saffron essential oils, and rose quartz facial sculpting.',
    inclusions: [
      'Welcome sensory aromatherapy foot bath with dried rose petals',
      '24K pure bio-gold leaf face & décolleté lymphatic mask',
      'Rose quartz crystal wand sculpting & cryo-globe soothing',
      'Warm saffron & Moroccan argan oil head, neck & shoulder massage',
      'Golden champagne peptide brightening seal & artisan herbal infusion'
    ],
    benefits: [
      'Instant celebrity luminescent radiance',
      'Deep cellular relaxation and tension release',
      'Noticeably firmer, lifted facial contour'
    ],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'body-spa',
    name: 'Aromatherapy Body Ritual',
    category: 'spa',
    duration: '60–90 Mins',
    price: 2499,
    priceDisplay: 'From ₹2,499',
    popular: true,
    description: 'Full-body holistic massage infused with pure essential oils to melt away tension and restore equilibrium.',
    inclusions: [
      'Foot soak ritual in warm Himalayan salt bath',
      'Selection of custom essential oil blends',
      'Full-body Swedish & deep tissue techniques',
      'Heated basalt volcanic stone therapy',
      'Organic herbal calming tea service'
    ],
    benefits: [
      'Relieves muscle tension and stress',
      'Stimulates healthy lymphatic flow',
      'Enhances sleep quality and cellular rest'
    ],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'japanese-head-spa',
    name: 'Japanese Scalp & Head Spa',
    category: 'hair',
    duration: '60 Mins',
    price: 2899,
    priceDisplay: 'From ₹2,899',
    popular: true,
    description: 'Sensory water halo treatment, scalp scrub, acupressure therapy, and clarifying herbal rinse.',
    inclusions: [
      'Scalp analysis under 200x microscope',
      'Volcanic clarifying scalp scrub',
      'Continuous warm herbal waterfall arch (halo shower)',
      'Shiatsu temple, neck, and shoulder pressure release',
      'Leave-in peptide ampoule & blowout'
    ],
    benefits: [
      'Deeply cleanses congested hair follicles',
      'Relieves cranial headaches and eye fatigue',
      'Promotes thicker, healthier hair growth'
    ],
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hydra-glass-skin',
    name: 'Hydra-Infusion Glass Skin Ritual',
    category: 'facial',
    duration: '75 Mins',
    price: 3299,
    priceDisplay: 'From ₹3,299',
    popular: false,
    description: 'Multi-step clinical suction, chemical peel, and oxygen dome hyperbaric vitamin infusion.',
    inclusions: [
      'Vortex vortex-fusion salicylic acid cleanse',
      'Low irritation lactic & glycolic brightening peel',
      '98% Pure medical oxygen dome saturation',
      'LED red & blue phototherapy treatment',
      'Intense ceramide barrier cocoon'
    ],
    benefits: [
      'Korean glass-skin translucency immediately',
      'Plumps skin without needles or downtime',
      'Reduces hyperpigmentation and sun spots'
    ],
    image: '/src/assets/images/hydra_glass_facial_1793899863729.jpg'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Signature Coiffure & Balayage',
    tag: 'Haute Coiffure',
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    fullImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=80',
    description: 'Warm honey caramel balayage tailored with face-framing curtain layers and Dyson shine polish.'
  },
  {
    id: 'g-2',
    title: 'Flawless Glam & Airbrush',
    tag: 'Glamour Artistry',
    category: 'makeup',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
    fullImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80',
    description: 'Satin velvet skin finish with soft smoked hazelnut eyes, sculpted cheekbones, and petal nude lips.'
  },
  {
    id: 'g-3',
    title: 'Chrome & Glazed Nail Art',
    tag: 'Nail Couture',
    category: 'nails',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80',
    fullImage: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1400&q=80',
    description: 'Pearl chrome French tip extensions on sculpted almond builder gel with delicate crystal accents.'
  },
  {
    id: 'g-4',
    title: 'Sanctuary Holistic Spa Suite',
    tag: 'Serenity & Wellness',
    category: 'spa',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
    fullImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=80',
    description: 'Our private aromatherapy treatment room designed with ambient warmth, live cedar, and calming sounds.'
  },
  {
    id: 'g-5',
    title: 'The Imperial Bridal Artistry',
    tag: 'Imperial Bridal',
    category: 'makeup',
    image: '/src/assets/images/bridal_imperial_art_1793899837776.jpg',
    fullImage: '/src/assets/images/bridal_imperial_art_1793899837776.jpg',
    description: 'Traditional antique polki jewelry setting, royal kundan choker, floral bun, and flawless HD airbrush bridal finish.'
  },
  {
    id: 'g-6',
    title: 'Hydra-Infusion Glass Skin Sanctuary',
    tag: 'Clinical Aesthetic',
    category: 'spa',
    image: '/src/assets/images/hydra_glass_facial_1793899863729.jpg',
    fullImage: '/src/assets/images/hydra_glass_facial_1793899863729.jpg',
    description: 'Vortex suction peeling, hyperbaric pure medical oxygen saturation, and Korean dewy glass skin illumination.'
  }
];

export const BRIDAL_PACKAGES: BridalPackage[] = [
  {
    id: 'pre-bridal',
    name: 'Pre-Bridal Radiance Ritual',
    price: 8999,
    duration: '2 Sessions (7-10 Days Prior)',
    description: 'Curated skin and hair revitalization package to prime you for your celebrations.',
    highlights: [
      'Full body organic cocoa butter polishing & wrap',
      'Glow Radiance 24k Gold Facial',
      'Deep restorative keratin hair spa & split-end trim',
      'Luxury spa manicure & paraffin pedicure',
      'Full body precision threading & waxing'
    ],
    recommendedFor: 'Brides-to-be 1-2 weeks before wedding ceremonies',
    image: '/src/assets/images/hydra_skin_glow_1793899876817.jpg'
  },
  {
    id: 'engagement-glam',
    name: 'Engagement & Sangeet Glam Look',
    price: 9500,
    duration: '2.5 Hours',
    description: 'Contemporary party elegance with lightweight high-definition coverage for dance nights.',
    highlights: [
      'HD camera-ready makeup with luxury lashes',
      'Designer hairstyle (textured braid, Hollywood waves, or chic bun)',
      'Dupatta or gown styling & accessory pinning',
      'Change of lip touchup vial included'
    ],
    recommendedFor: 'Engagement, Cocktails, Sangeet & Reception parties',
    image: '/src/assets/images/bridal_couture_details_1793899850599.jpg'
  },
  {
    id: 'royal-airbrush',
    name: 'The Imperial Atelier Couture',
    price: 18000,
    duration: '3.5 Hours',
    description: 'Our flagship wedding day package with celebrity-tier airbrush formulation, uncut polki jewelry setting, and couture styling.',
    highlights: [
      'Waterproof silicone-based HD airbrush foundation',
      'Celebrity bridal eye makeup with mink 3D lashes',
      'Architectural traditional or modern bridal hair styling',
      'Fresh floral hair integration (Mogra / Baby’s Breath / Roses)',
      'Double dupatta draping & jewelry placement support',
      'Luxury complimentary touch-up bridal survival kit'
    ],
    recommendedFor: 'Main Wedding Day / Pheras ceremony',
    image: '/src/assets/images/bridal_imperial_art_1793899837776.jpg'
  },
  {
    id: 'imperial-suite',
    name: 'The Imperial All-Inclusive Bridal Suite',
    price: 28500,
    duration: 'Complete Wedding Experience',
    description: 'The ultimate royal experience including pre-bridal wellness, wedding makeup, and mother/sister styling.',
    highlights: [
      'Everything in Pre-Bridal Radiance Ritual',
      'Royal HD Airbrush Bridal Makeup on Wedding Day',
      'Complimentary Pre-Wedding Trial session',
      'Special complimentary party makeup for Mother or Maid of Honor',
      'Dedicated senior artist assigned exclusively to you'
    ],
    recommendedFor: 'Complete luxury bridal journey from prep to wedding night',
    image: '/src/assets/images/bridal_imperial_art_1793899837776.jpg'
  }
];

export const BRIDAL_ADDONS: BridalAddon[] = [
  { id: 'trial', name: 'Bridal Trial Session (Makeup & Hair)', price: 3500, description: 'Dedicated consultation and trial (fully adjusted against package confirmation)' },
  { id: 'draping-extra', name: 'Additional Outfit Draping (per look)', price: 1500, description: 'Expert pleating and secure pin-setting for heavy bridal sarees and lehengas' },
  { id: 'hair-extensions', name: '100% Remy Human Hair Extensions', price: 4000, description: 'Clip-in volumizing and length extensions color-matched to your hair' },
  { id: 'groom-styling', name: 'Groom Grooming & Hair Styling Package', price: 3999, description: 'Haircut, beard sculpt, skin brightening cleanup, and subtle matte styling' },
  { id: 'family-member', name: 'Family Member Party Makeup & Hair', price: 4500, description: 'Per person rate for bridesmaids, sisters, or mother of the bride' }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'arundhati',
    name: 'Arundhati Sen',
    role: 'Creative Director & Celebrity Bridal Artist',
    experience: '14+ Years',
    specialty: 'HD Airbrush Bridal & Cultural Draping',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    rating: 4.98,
    reviewsCount: 380
  },
  {
    id: 'marcus',
    name: 'Marcus Vance',
    role: 'Master Hair Sculptor & Balayage Specialist',
    experience: '11+ Years (Trained in London)',
    specialty: 'Custom Balayage, Precision Cuts & Keratin',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    rating: 4.95,
    reviewsCount: 420
  },
  {
    id: 'meera',
    name: 'Meera Kapoor',
    role: 'Senior Esthetician & Skin Therapist',
    experience: '9+ Years',
    specialty: 'Hydra Facials, Glass Skin & Cryo Therapy',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    rating: 4.97,
    reviewsCount: 295
  },
  {
    id: 'kavya',
    name: 'Kavya Nair',
    role: 'Nail Artist & Lash Specialist',
    experience: '7+ Years',
    specialty: 'Russian Manicures, 3D Chrome & Lash Lifts',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    rating: 4.94,
    reviewsCount: 210
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    author: 'Priya Sharma',
    role: 'Bridal Client',
    service: 'Royal HD Bridal Makeup',
    rating: 5,
    comment: 'My bridal makeup by Arundhati was everything I had ever dreamed of! It looked completely natural yet regal in every photograph, and stayed intact through 14 hours of pheras and emotional moments. Truly an unmatched experience!',
    date: 'March 2026',
    avatarLetter: 'P',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Neha Verma',
    role: 'Regular Guest',
    service: 'Glow Radiance Facial',
    rating: 5,
    comment: 'The facial and scalp massage are pure bliss. The calming aroma, warm towels, and attentive staff make every visit therapeutic. I have been coming here every month for over two years now.',
    date: 'February 2026',
    avatarLetter: 'N',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Ananya Sen',
    role: 'Hair Couture Client',
    service: 'Hair Couture & Balayage',
    rating: 5,
    comment: 'Spotless hygiene, calming atmosphere, and top-tier hair styling by Marcus. My balayage turned out exactly like the reference picture without any dryness or damage. The Dyson blowout held for 3 days!',
    date: 'January 2026',
    avatarLetter: 'A',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Rhea Chakraborty',
    role: 'Event Guest',
    service: 'Party & Glam Makeup',
    rating: 5,
    comment: 'Booked them for my sister’s reception. The team arrived on time, was so gentle with our skin, and gave all of us distinct looks that complemented our outfits. The champagne highlight was stunning!',
    date: 'March 2026',
    avatarLetter: 'R',
    verified: true
  }
];

export const FAQS = [
  {
    id: 'faq-1',
    question: 'Do I need to book an appointment in advance?',
    answer: 'While we welcome walk-ins when styling stations are available, we strongly recommend booking your slot at least 24 hours in advance to avoid waiting and ensure uninterrupted attention from your preferred senior artist.',
    category: 'Booking'
  },
  {
    id: 'faq-2',
    question: 'Are bridal makeup trials available?',
    answer: 'Yes! We offer comprehensive bridal makeup and hair trials where we test skin compatibility, discuss jewelry and outfit colors, and craft your custom bridal moodboard. The trial fee is 100% adjusted against your final bridal package upon confirmation.',
    category: 'Bridal'
  },
  {
    id: 'faq-3',
    question: 'Which beauty and skincare brands do you use in treatments?',
    answer: 'We maintain a strict zero-compromise luxury policy. Our makeup kits and treatment rooms are stocked exclusively with dermatologically tested, cruelty-free formulas from MAC, Bobbi Brown, Huda Beauty, Anastasia Beverly Hills, Dyson Supersonic, Olaplex, and Kérastase Paris.',
    category: 'Products'
  },
  {
    id: 'faq-4',
    question: 'What is your rescheduling or cancellation policy?',
    answer: 'Life happens! You can reschedule or cancel any regular appointment free of charge by notifying us at least 4 hours in advance via our booking manager, WhatsApp, or phone. Bridal and group bookings require 72 hours prior notice.',
    category: 'Policies'
  },
  {
    id: 'faq-5',
    question: 'Do you offer on-location or destination bridal styling?',
    answer: 'Yes. Our senior bridal artists and stylists travel globally for destination weddings and luxury venues. Reach out via WhatsApp or submit a bridal consultation request with your venue details to receive our customized outstation travel quote.',
    category: 'Bridal'
  }
];

export const TIME_SLOTS = [
  '10:00 AM',
  '11:00 AM',
  '12:15 PM',
  '01:30 PM',
  '02:45 PM',
  '04:00 PM',
  '05:15 PM',
  '06:30 PM',
  '07:30 PM'
];
