// Mock Users with Dual-Role Data, Category-Specific Ratings, and Verified History per SRS FR1-FR7
// Localized with Indian names, addresses, and INR currency

export const mockUsers = [
  {
    id: "usr_sarah",
    name: "Pooja Reddy",
    email: "pooja.reddy@example.com",
    role: "poster_primary",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    headline: "Tech Entrepreneur & Independent Homeowner",
    bio: "Startup founder and homeowner in Bengaluru. I frequently post both local home renovation projects and remote digital engineering gigs, while occasionally consulting on fintech UI architecture.",
    location: "Indiranagar, Bengaluru, Karnataka",
    verified: true,
    memberSince: "2024-03-12",
    overallRating: 4.96,
    reviewCount: 38,
    completionRate: 100,
    responseRate: 98,
    responseTime: "< 1 hour",
    postedGigsCount: 19,
    completedWorkerGigsCount: 14,
    skills: ["Product Strategy", "UX Design", "Home Renovation", "Event Planning"],
    categoryRatings: [
      { categoryId: "cat_digital_tech", categoryName: "Digital & Tech", rating: 5.0, count: 8 },
      { categoryId: "cat_professional", categoryName: "Professional Consulting", rating: 4.92, count: 6 }
    ],
    verifiedWorkHistory: [
      {
        gigId: "gig_hist_01",
        title: "B2B SaaS Dashboard Wireframing",
        role: "Contractor",
        clientName: "ScaleMetric Technologies Pvt Ltd",
        completedDate: "2026-08-14",
        amount: 25000,
        rating: 5,
        reviewText: "Pooja did exceptional architectural wireframing on time and within budget."
      },
      {
        gigId: "gig_hist_02",
        title: "Product Launch Event Coordination",
        role: "Coordinator",
        clientName: "Zenith Capital India",
        completedDate: "2026-07-02",
        amount: 35000,
        rating: 5,
        reviewText: "Flawless communication and calm problem solver during our live keynote."
      }
    ]
  },
  {
    id: "usr_david",
    name: "Rajesh Kumar",
    email: "rajesh.plumbing@example.com",
    role: "worker_primary",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    headline: "Licensed Master Plumber & General Handyman",
    bio: "12+ years of residential and commercial plumbing experience across Bengaluru. Fully equipped for emergency pipe leaks, CPVC fittings, and bathroom fixture diagnostics.",
    location: "Whitefield, Bengaluru (15 km radius)",
    verified: true,
    memberSince: "2023-11-05",
    overallRating: 4.97,
    reviewCount: 124,
    completionRate: 99,
    responseRate: 100,
    responseTime: "15 mins",
    postedGigsCount: 4,
    completedWorkerGigsCount: 88,
    skills: ["Pipe Leak Repair", "PEX/CPVC Installation", "Drain Cleaning", "Water Heaters", "Fixture Replacement"],
    categoryRatings: [
      { categoryId: "cat_home_services", categoryName: "Plumbing & Repairs", rating: 4.98, count: 72 },
      { categoryId: "cat_home_services", categoryName: "Furniture Assembly", rating: 4.91, count: 16 }
    ],
    verifiedWorkHistory: [
      {
        gigId: "gig_hist_03",
        title: "Kitchen Sink S-Trap Replacement",
        role: "Plumber",
        clientName: "Ramesh Rao",
        completedDate: "2026-09-02",
        amount: 1800,
        rating: 5,
        reviewText: "Arrived in 30 minutes, cleanly swapped out the rusted trap, and gave advice on maintenance. Highly recommended!"
      },
      {
        gigId: "gig_hist_04",
        title: "Bathroom Vanity & Drain Hookup",
        role: "Contractor",
        clientName: "Meera Nair",
        completedDate: "2026-08-20",
        amount: 3500,
        rating: 5,
        reviewText: "Super fast, meticulous with clean-up, and very courteous."
      }
    ]
  },
  {
    id: "usr_elena",
    name: "Ananya Iyer",
    email: "ananya.codes@example.com",
    role: "worker_primary",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    headline: "Senior Frontend Engineer & React Specialist",
    bio: "Ex-fintech UI engineer passionate about snappy user interfaces, performance optimization, and accessibility. Available for React, Next.js, TypeScript, and Tailwind sprints across India and globally.",
    location: "Remote (Pan-India)",
    verified: true,
    memberSince: "2024-01-18",
    overallRating: 5.0,
    reviewCount: 42,
    completionRate: 100,
    responseRate: 95,
    responseTime: "45 mins",
    postedGigsCount: 2,
    completedWorkerGigsCount: 39,
    skills: ["React", "JavaScript", "Tailwind CSS", "Vite", "Node.js", "REST APIs"],
    categoryRatings: [
      { categoryId: "cat_digital_tech", categoryName: "Web Development", rating: 5.0, count: 32 },
      { categoryId: "cat_digital_tech", categoryName: "UI/UX & Graphic Design", rating: 4.95, count: 7 }
    ],
    verifiedWorkHistory: [
      {
        gigId: "gig_hist_05",
        title: "E-Commerce Checkout Performance Tuning",
        role: "Frontend Engineer",
        clientName: "Indic Retail Brands Ltd",
        completedDate: "2026-09-10",
        amount: 45000,
        rating: 5,
        reviewText: "Cut our Core Web Vitals LCP by 60%. Ananya is in the top 1% of frontend developers we've hired."
      }
    ]
  },
  {
    id: "usr_marcus",
    name: "Vikramaditya Singh",
    email: "vikram.events@example.com",
    role: "worker_primary",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    headline: "Event Hospitality & Craft Beverage Specialist",
    bio: "Certified hospitality specialist with 7 years managing premium weddings, corporate galas, and private dining events in Bengaluru and Hyderabad. Complete setup, custom curation, and hospitality care.",
    location: "Koramangala, Bengaluru & Hyderabad",
    verified: true,
    memberSince: "2024-05-19",
    overallRating: 4.95,
    reviewCount: 31,
    completionRate: 97,
    responseRate: 92,
    responseTime: "2 hours",
    postedGigsCount: 1,
    completedWorkerGigsCount: 29,
    skills: ["Craft Beverages", "Event Hospitality", "Menu Planning", "Guest Service", "Banquet Coordination"],
    categoryRatings: [
      { categoryId: "cat_events_staffing", categoryName: "Food & Beverage Staff", rating: 4.97, count: 28 }
    ],
    verifiedWorkHistory: [
      {
        gigId: "gig_hist_06",
        title: "50-Person Milestone Anniversary Reception",
        role: "Event Manager",
        clientName: "Amitabh Deshmukh",
        completedDate: "2026-08-28",
        amount: 18000,
        rating: 5,
        reviewText: "The custom mocktails and banquet hospitality Vikram created was the highlight of the evening!"
      }
    ]
  },
  {
    id: "usr_admin",
    name: "Arjun Verma (Admin)",
    email: "admin@taskproxi.in",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    headline: "TaskProxi Platform Trust & Safety Lead",
    bio: "Marketplace administrator overseeing platform dispute arbitration, anti-fraud evaluation, and taxonomy curation.",
    location: "Bengaluru Platform HQ, Karnataka",
    verified: true,
    memberSince: "2023-01-01",
    overallRating: 5.0,
    reviewCount: 0,
    completionRate: 100,
    responseRate: 100,
    responseTime: "Immediate",
    postedGigsCount: 0,
    completedWorkerGigsCount: 0,
    skills: ["Trust & Safety", "Mediation", "Marketplace Policy"],
    categoryRatings: []
  },
  {
    id: "usr_priya",
    name: "Priya Sharma",
    email: "priya.cpa@example.com",
    role: "worker_primary",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    headline: "Certified Financial Consultant & GST/Bookkeeping Specialist",
    bio: "Helping Indian businesses and independent startups streamline invoicing, Tally/QuickBooks cleanup, GST filing, and financial reconciliations.",
    location: "Hitec City, Hyderabad, Telangana",
    verified: true,
    memberSince: "2024-02-10",
    overallRating: 4.92,
    reviewCount: 22,
    completionRate: 98,
    responseRate: 96,
    responseTime: "30 mins",
    postedGigsCount: 3,
    completedWorkerGigsCount: 19,
    skills: ["GST Compliance", "Tally Prime", "QuickBooks Online", "Bank Reconciliation", "P&L Statements"],
    categoryRatings: [
      { categoryId: "cat_professional", categoryName: "Accounting & Finance", rating: 4.92, count: 19 }
    ]
  },
  {
    id: "usr_carlos",
    name: "Rohan Patel",
    email: "rohan.moves@example.com",
    role: "worker_primary",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    headline: "Reliable Furniture Assembly & Apartment Shifting Specialist",
    bio: "Experienced heavy lifter with transport vehicles and professional power tools. Specializing in IKEA wardrobes, bed frames, office setups, and local shifting.",
    location: "Bandra & Andheri, Mumbai, Maharashtra",
    verified: true,
    memberSince: "2024-04-01",
    overallRating: 4.88,
    reviewCount: 45,
    completionRate: 95,
    responseRate: 90,
    responseTime: "1 hour",
    postedGigsCount: 2,
    completedWorkerGigsCount: 41,
    skills: ["IKEA Furniture Assembly", "Apartment Shifting", "Wall Anchoring", "Dollies & Straps"],
    categoryRatings: [
      { categoryId: "cat_home_services", categoryName: "Furniture & Assembly", rating: 4.92, count: 26 },
      { categoryId: "cat_moving_delivery", categoryName: "Moving Assistance", rating: 4.84, count: 15 }
    ]
  },
  {
    id: "usr_emily",
    name: "Kavya Nambiar",
    email: "kavya.content@example.com",
    role: "worker_primary",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    headline: "Technical Content Strategist & SEO Specialist",
    bio: "Published writer helping high-growth Indian startups, SaaS products, and digital brands rank on Google with high-converting, human-crafted copy.",
    location: "Kochi, Kerala / Remote (Pan-India)",
    verified: true,
    memberSince: "2024-06-15",
    overallRating: 4.91,
    reviewCount: 18,
    completionRate: 100,
    responseRate: 94,
    responseTime: "3 hours",
    postedGigsCount: 0,
    completedWorkerGigsCount: 18,
    skills: ["SEO Strategy", "Technical Writing", "Landing Page Copy", "Case Studies"],
    categoryRatings: [
      { categoryId: "cat_professional", categoryName: "Content & Copywriting", rating: 4.91, count: 18 }
    ]
  }
];
