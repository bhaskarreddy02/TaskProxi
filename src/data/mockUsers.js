// Mock Users with Dual-Role Data, Category-Specific Ratings, and Verified History per SRS FR1-FR7

export const mockUsers = [
  {
    id: "usr_sarah",
    name: "Sarah Connor",
    email: "sarah.connor@example.com",
    role: "poster_primary",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    headline: "Small Business Owner & Design Enthusiast",
    bio: "Tech entrepreneur and homeowner in Seattle. I frequently post both local home renovation projects and remote digital engineering gigs, while occasionally consulting on startup UI architecture.",
    location: "Seattle, WA",
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
        clientName: "CloudScale Inc.",
        completedDate: "2026-08-14",
        amount: 850,
        rating: 5,
        reviewText: "Sarah did exceptional architectural wireframing on time and within budget."
      },
      {
        gigId: "gig_hist_02",
        title: "Product Launch Event Coordination",
        role: "Coordinator",
        clientName: "Apex Ventures",
        completedDate: "2026-07-02",
        amount: 1200,
        rating: 5,
        reviewText: "Flawless communication and calm problem solver during our live keynote."
      }
    ]
  },
  {
    id: "usr_david",
    name: "David Miller",
    email: "david.plumbing@example.com",
    role: "worker_primary",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    headline: "Licensed Master Plumber & General Handyman",
    bio: "12+ years of residential and commercial plumbing experience. Fully equipped for emergency pipe leaks, fixture installations, and whole-house diagnostics.",
    location: "Seattle, WA (15 mile radius)",
    verified: true,
    memberSince: "2023-11-05",
    overallRating: 4.97,
    reviewCount: 124,
    completionRate: 99,
    responseRate: 100,
    responseTime: "15 mins",
    postedGigsCount: 4,
    completedWorkerGigsCount: 88,
    skills: ["Pipe Leak Repair", "PEX Installation", "Drain Cleaning", "Water Heaters", "Fixture Replacement"],
    categoryRatings: [
      { categoryId: "cat_home_services", categoryName: "Plumbing & Repairs", rating: 4.98, count: 72 },
      { categoryId: "cat_home_services", categoryName: "Furniture Assembly", rating: 4.91, count: 16 }
    ],
    verifiedWorkHistory: [
      {
        gigId: "gig_hist_03",
        title: "Kitchen Sink S-Trap Replacement",
        role: "Plumber",
        clientName: "Robert Taylor",
        completedDate: "2026-09-02",
        amount: 180,
        rating: 5,
        reviewText: "Arrived in 30 minutes, cleanly swapped out the rusted trap, and gave advice on maintenance. Recommended!"
      },
      {
        gigId: "gig_hist_04",
        title: "Bathroom Vanity & Drain Hookup",
        role: "Contractor",
        clientName: "Megan Lee",
        completedDate: "2026-08-20",
        amount: 340,
        rating: 5,
        reviewText: "Super fast, meticulous with clean-up, and very friendly."
      }
    ]
  },
  {
    id: "usr_elena",
    name: "Elena Rostova",
    email: "elena.codes@example.com",
    role: "worker_primary",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    headline: "Senior Frontend Engineer & React Specialist",
    bio: "Ex-fintech UI engineer passionate about snappy user interfaces, performance optimization, and accessibility. Available for remote React, TypeScript, and Tailwind sprints.",
    location: "Remote (Global)",
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
        clientName: "Nordic Goods Co.",
        completedDate: "2026-09-10",
        amount: 1400,
        rating: 5,
        reviewText: "Cut our Core Web Vitals LCP by 60%. Elena is in the top 1% of frontend developers we've hired."
      }
    ]
  },
  {
    id: "usr_marcus",
    name: "Marcus Vance",
    email: "marcus.mixology@example.com",
    role: "worker_primary",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    headline: "Craft Cocktail Bartender & Event Hospitality",
    bio: "TIPS-certified craft bartender with 7 years behind high-volume speakeasies and bespoke wedding receptions. I bring bar tools, custom menu curation, and top-tier guest care.",
    location: "Bellevue & Seattle, WA",
    verified: true,
    memberSince: "2024-05-19",
    overallRating: 4.95,
    reviewCount: 31,
    completionRate: 97,
    responseRate: 92,
    responseTime: "2 hours",
    postedGigsCount: 1,
    completedWorkerGigsCount: 29,
    skills: ["Craft Mixology", "Menu Planning", "Speed Pouring", "Bar Setup & Breakdown", "Guest Hospitality"],
    categoryRatings: [
      { categoryId: "cat_events_staffing", categoryName: "Food & Beverage Staff", rating: 4.97, count: 28 }
    ],
    verifiedWorkHistory: [
      {
        gigId: "gig_hist_06",
        title: "50-Person 40th Birthday Cocktail Bar",
        role: "Lead Bartender",
        clientName: "David Sterling",
        completedDate: "2026-08-28",
        amount: 450,
        rating: 5,
        reviewText: "The custom smoked bourbon cocktail Marcus created was the talk of the night!"
      }
    ]
  },
  {
    id: "usr_admin",
    name: "Alex Vance (Admin)",
    email: "admin@taskproxi.internal",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    headline: "TaskProxi Platform Trust & Safety Lead",
    bio: "Marketplace administrator overseeing platform dispute arbitration, anti-fraud evaluation, and taxonomy curation.",
    location: "Platform Headquarters",
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
    headline: "Certified Bookkeeper & Small Business Financial Strategist",
    bio: "Helping independent contractors and agencies streamline invoicing, QuickBooks ledger cleanup, and sales tax compliance.",
    location: "Remote (US & Canada)",
    verified: true,
    memberSince: "2024-02-10",
    overallRating: 4.92,
    reviewCount: 22,
    completionRate: 98,
    responseRate: 96,
    responseTime: "30 mins",
    postedGigsCount: 3,
    completedWorkerGigsCount: 19,
    skills: ["QuickBooks Online", "Bank Reconciliation", "P&L Statements", "Payroll Setup"],
    categoryRatings: [
      { categoryId: "cat_professional", categoryName: "Accounting & Finance", rating: 4.92, count: 19 }
    ]
  },
  {
    id: "usr_carlos",
    name: "Carlos Rivera",
    email: "carlos.moves@example.com",
    role: "worker_primary",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    headline: "Reliable Furniture Assembly & Apartment Mover",
    bio: "Experienced heavy lifter with a clean pickup truck and high-torque power tools. Specializing in IKEA closets, bed frames, and gym equipment.",
    location: "Seattle & Renton, WA",
    verified: true,
    memberSince: "2024-04-01",
    overallRating: 4.88,
    reviewCount: 45,
    completionRate: 95,
    responseRate: 90,
    responseTime: "1 hour",
    postedGigsCount: 2,
    completedWorkerGigsCount: 41,
    skills: ["IKEA Furniture Assembly", "Apartment Moving", "Wall Anchoring", "Dollies & Straps"],
    categoryRatings: [
      { categoryId: "cat_home_services", categoryName: "Furniture & Assembly", rating: 4.92, count: 26 },
      { categoryId: "cat_moving_delivery", categoryName: "Moving Assistance", rating: 4.84, count: 15 }
    ]
  },
  {
    id: "usr_emily",
    name: "Emily Thorne",
    email: "emily.content@example.com",
    role: "worker_primary",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    headline: "Technical Copywriter & SEO Specialist",
    bio: "Published writer helping tech firms, SaaS products, and local service providers rank on Google with high-converting copy.",
    location: "Remote",
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
