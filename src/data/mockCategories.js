// 3-Level Category Taxonomy per SRS FR8: Category -> Subcategory -> Service

export const mockCategories = [
  {
    id: "cat_home_services",
    name: "Home & Local Services",
    icon: "Wrench",
    description: "Physical repairs, assembly, cleaning, and maintenance",
    subcategories: [
      {
        id: "sub_assembly",
        name: "Furniture & Assembly",
        services: [
          { id: "srv_ikea_assembly", name: "IKEA Furniture Assembly" },
          { id: "srv_desk_mounting", name: "Desk & Bookcase Assembly" },
          { id: "srv_patio_assembly", name: "Outdoor & Patio Setup" }
        ]
      },
      {
        id: "sub_plumbing",
        name: "Plumbing & Repairs",
        services: [
          { id: "srv_pipe_repair", name: "Pipe Leak & Fitting Repair" },
          { id: "srv_fixture_install", name: "Faucet & Sink Installation" },
          { id: "srv_drain_cleaning", name: "Drain Unclogging" }
        ]
      },
      {
        id: "sub_electrical",
        name: "Electrical & Lighting",
        services: [
          { id: "srv_lighting_install", name: "Ceiling Fan & Light Fixture" },
          { id: "srv_outlet_install", name: "Smart Switch & Outlet Setup" },
          { id: "srv_tv_mounting", name: "TV Mounting & Wire Concealment" }
        ]
      },
      {
        id: "sub_cleaning",
        name: "Cleaning & Housekeeping",
        services: [
          { id: "srv_deep_clean", name: "Deep Home Cleaning" },
          { id: "srv_move_clean", name: "Move-in / Move-out Cleaning" },
          { id: "srv_carpet_clean", name: "Upholstery & Carpet Clean" }
        ]
      }
    ]
  },
  {
    id: "cat_digital_tech",
    name: "Digital & Tech",
    icon: "Code",
    description: "Software engineering, web development, data, and design",
    subcategories: [
      {
        id: "sub_web_dev",
        name: "Web Development",
        services: [
          { id: "srv_react_frontend", name: "React / Next.js Development" },
          { id: "srv_fullstack", name: "Full-Stack Web Applications" },
          { id: "srv_bug_fixing", name: "Frontend Bug Fixes & Optimization" }
        ]
      },
      {
        id: "sub_design",
        name: "UI/UX & Graphic Design",
        services: [
          { id: "srv_figma_ui", name: "Figma UI/UX Prototypes" },
          { id: "srv_brand_identity", name: "Logo & Brand Identity" },
          { id: "srv_illustrations", name: "Custom Vector Graphics" }
        ]
      },
      {
        id: "sub_data_ai",
        name: "Data & Automation",
        services: [
          { id: "srv_data_scraping", name: "Web Scraping & Extraction" },
          { id: "srv_analytics_dash", name: "Data Dashboard / PowerBI" },
          { id: "srv_python_script", name: "Python Automation Scripts" }
        ]
      }
    ]
  },
  {
    id: "cat_events_staffing",
    name: "Events & Hospitality",
    icon: "Sparkles",
    description: "Bartenders, servers, event photographers, and on-site support",
    subcategories: [
      {
        id: "sub_bartending",
        name: "Food & Beverage Staff",
        services: [
          { id: "srv_mixologist", name: "Private Party Bartending" },
          { id: "srv_catering_server", name: "Banquet & Buffet Staffing" },
          { id: "srv_barista", name: "Pop-Up Coffee & Barista" }
        ]
      },
      {
        id: "sub_event_media",
        name: "Event Media & Logistics",
        services: [
          { id: "srv_event_photo", name: "Event Photography & Editing" },
          { id: "srv_av_setup", name: "AV Equipment & Stage Setup" },
          { id: "srv_event_host", name: "Check-in & Guest Coordination" }
        ]
      }
    ]
  },
  {
    id: "cat_professional",
    name: "Professional & Business",
    icon: "Briefcase",
    description: "Finance, bookkeeping, legal drafting, and business strategy",
    subcategories: [
      {
        id: "sub_accounting",
        name: "Accounting & Finance",
        services: [
          { id: "srv_bookkeeping", name: "QuickBooks & Reconciliation" },
          { id: "srv_tax_prep", name: "Small Business Tax Preparation" },
          { id: "srv_financial_model", name: "Financial Forecasting" }
        ]
      },
      {
        id: "sub_writing",
        name: "Content & Copywriting",
        services: [
          { id: "srv_seo_articles", name: "Technical SEO Blog Writing" },
          { id: "srv_pitch_deck", name: "Investor Pitch Deck Copy" },
          { id: "srv_grant_writing", name: "Business Grant Proposal" }
        ]
      }
    ]
  },
  {
    id: "cat_moving_delivery",
    name: "Moving & Delivery",
    icon: "Truck",
    description: "Heavy lifting, local deliveries, and apartment relocation",
    subcategories: [
      {
        id: "sub_moving_help",
        name: "Moving Assistance",
        services: [
          { id: "srv_apartment_move", name: "Apartment Loading & Unloading" },
          { id: "srv_heavy_lifting", name: "In-Home Appliance Relocation" },
          { id: "srv_packing_prep", name: "Boxing & Packing Supplies" }
        ]
      },
      {
        id: "sub_courier",
        name: "Courier & Delivery",
        services: [
          { id: "srv_same_day_delivery", name: "Same-Day Document Delivery" },
          { id: "srv_store_pickup", name: "Bulky Store Item Pick-up" }
        ]
      }
    ]
  }
];

export const popularQuickFilters = [
  { label: "All Categories", value: "all" },
  { label: "Furniture Assembly", value: "sub_assembly" },
  { label: "Plumbing", value: "sub_plumbing" },
  { label: "Web Development", value: "sub_web_dev" },
  { label: "UI/UX Design", value: "sub_design" },
  { label: "Home Cleaning", value: "sub_cleaning" },
  { label: "Events & Staffing", value: "cat_events_staffing" },
  { label: "Accounting", value: "sub_accounting" }
];
