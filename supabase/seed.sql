-- ==============================================================================
-- TASKPROXI SEED DATA SCRIPT
-- Localized with Indian names, addresses, and INR currency
-- ==============================================================================

-- 1. SEED USERS
INSERT INTO public.users (id, name, email, role, avatar, headline, bio, location, verification_status, overall_rating, review_count, completion_rate, response_rate, response_time, posted_gigs_count, completed_worker_gigs_count, skills, member_since)
VALUES ('usr_pooja', 'Pooja Reddy', 'pooja.reddy@example.com', 'poster_primary', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', 'Tech Entrepreneur & Independent Homeowner', 'Startup founder and homeowner in Bengaluru. I frequently post both local home renovation projects and remote digital engineering gigs, while occasionally consulting on fintech UI architecture.', 'Indiranagar, Bengaluru, Karnataka', 'VERIFIED', 4.96, 38, 100, 98, '< 1 hour', 19, 14, '{"Product Strategy","UX Design","Home Renovation","Event Planning"}', '2024-03-12')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email;

INSERT INTO public.category_ratings (user_id, category_id, category_name, rating, completed_count)
VALUES ('usr_pooja', 'cat_digital_tech', 'Digital & Tech', 5, 8)
ON CONFLICT (user_id, category_id) DO UPDATE SET rating = EXCLUDED.rating, completed_count = EXCLUDED.completed_count;
INSERT INTO public.category_ratings (user_id, category_id, category_name, rating, completed_count)
VALUES ('usr_pooja', 'cat_professional', 'Professional Consulting', 4.92, 6)
ON CONFLICT (user_id, category_id) DO UPDATE SET rating = EXCLUDED.rating, completed_count = EXCLUDED.completed_count;
INSERT INTO public.users (id, name, email, role, avatar, headline, bio, location, verification_status, overall_rating, review_count, completion_rate, response_rate, response_time, posted_gigs_count, completed_worker_gigs_count, skills, member_since)
VALUES ('usr_rajesh', 'Rajesh Kumar', 'rajesh.plumbing@example.com', 'worker_primary', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', 'Licensed Master Plumber & General Handyman', '12+ years of residential and commercial plumbing experience across Bengaluru. Fully equipped for emergency pipe leaks, CPVC fittings, and bathroom fixture diagnostics.', 'Whitefield, Bengaluru (15 km radius)', 'VERIFIED', 4.97, 124, 99, 100, '15 mins', 4, 88, '{"Pipe Leak Repair","PEX/CPVC Installation","Drain Cleaning","Water Heaters","Fixture Replacement"}', '2023-11-05')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email;

INSERT INTO public.category_ratings (user_id, category_id, category_name, rating, completed_count)
VALUES ('usr_rajesh', 'cat_home_services', 'Plumbing & Repairs', 4.98, 72)
ON CONFLICT (user_id, category_id) DO UPDATE SET rating = EXCLUDED.rating, completed_count = EXCLUDED.completed_count;
INSERT INTO public.category_ratings (user_id, category_id, category_name, rating, completed_count)
VALUES ('usr_rajesh', 'cat_home_services', 'Furniture Assembly', 4.91, 16)
ON CONFLICT (user_id, category_id) DO UPDATE SET rating = EXCLUDED.rating, completed_count = EXCLUDED.completed_count;
INSERT INTO public.users (id, name, email, role, avatar, headline, bio, location, verification_status, overall_rating, review_count, completion_rate, response_rate, response_time, posted_gigs_count, completed_worker_gigs_count, skills, member_since)
VALUES ('usr_ananya', 'Ananya Iyer', 'ananya.codes@example.com', 'worker_primary', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', 'Senior Frontend Engineer & React Specialist', 'Ex-fintech UI engineer passionate about snappy user interfaces, performance optimization, and accessibility. Available for React, Next.js, TypeScript, and Tailwind sprints across India and globally.', 'Remote (Pan-India)', 'VERIFIED', 5, 42, 100, 95, '45 mins', 2, 39, '{"React","JavaScript","Tailwind CSS","Vite","Node.js","REST APIs"}', '2024-01-18')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email;

INSERT INTO public.category_ratings (user_id, category_id, category_name, rating, completed_count)
VALUES ('usr_ananya', 'cat_digital_tech', 'Web Development', 5, 32)
ON CONFLICT (user_id, category_id) DO UPDATE SET rating = EXCLUDED.rating, completed_count = EXCLUDED.completed_count;
INSERT INTO public.category_ratings (user_id, category_id, category_name, rating, completed_count)
VALUES ('usr_ananya', 'cat_digital_tech', 'UI/UX & Graphic Design', 4.95, 7)
ON CONFLICT (user_id, category_id) DO UPDATE SET rating = EXCLUDED.rating, completed_count = EXCLUDED.completed_count;
INSERT INTO public.users (id, name, email, role, avatar, headline, bio, location, verification_status, overall_rating, review_count, completion_rate, response_rate, response_time, posted_gigs_count, completed_worker_gigs_count, skills, member_since)
VALUES ('usr_vikram', 'Vikramaditya Singh', 'vikram.events@example.com', 'worker_primary', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', 'Event Hospitality & Craft Beverage Specialist', 'Certified hospitality specialist with 7 years managing premium weddings, corporate galas, and private dining events in Bengaluru and Hyderabad. Complete setup, custom curation, and hospitality care.', 'Koramangala, Bengaluru & Hyderabad', 'VERIFIED', 4.95, 31, 97, 92, '2 hours', 1, 29, '{"Craft Beverages","Event Hospitality","Menu Planning","Guest Service","Banquet Coordination"}', '2024-05-19')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email;

INSERT INTO public.category_ratings (user_id, category_id, category_name, rating, completed_count)
VALUES ('usr_vikram', 'cat_events_staffing', 'Food & Beverage Staff', 4.97, 28)
ON CONFLICT (user_id, category_id) DO UPDATE SET rating = EXCLUDED.rating, completed_count = EXCLUDED.completed_count;
INSERT INTO public.users (id, name, email, role, avatar, headline, bio, location, verification_status, overall_rating, review_count, completion_rate, response_rate, response_time, posted_gigs_count, completed_worker_gigs_count, skills, member_since)
VALUES ('usr_admin', 'Arjun Verma (Admin)', 'admin@taskproxi.in', 'admin', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', 'TaskProxi Platform Trust & Safety Lead', 'Marketplace administrator overseeing platform dispute arbitration, anti-fraud evaluation, and taxonomy curation.', 'Bengaluru Platform HQ, Karnataka', 'VERIFIED', 5, 0, 100, 100, 'Immediate', 0, 0, '{"Trust & Safety","Mediation","Marketplace Policy"}', '2023-01-01')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email;

INSERT INTO public.users (id, name, email, role, avatar, headline, bio, location, verification_status, overall_rating, review_count, completion_rate, response_rate, response_time, posted_gigs_count, completed_worker_gigs_count, skills, member_since)
VALUES ('usr_priya', 'Priya Sharma', 'priya.cpa@example.com', 'worker_primary', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', 'Certified Financial Consultant & GST/Bookkeeping Specialist', 'Helping Indian businesses and independent startups streamline invoicing, Tally/QuickBooks cleanup, GST filing, and financial reconciliations.', 'Hitec City, Hyderabad, Telangana', 'VERIFIED', 4.92, 22, 98, 96, '30 mins', 3, 19, '{"GST Compliance","Tally Prime","QuickBooks Online","Bank Reconciliation","P&L Statements"}', '2024-02-10')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email;

INSERT INTO public.category_ratings (user_id, category_id, category_name, rating, completed_count)
VALUES ('usr_priya', 'cat_professional', 'Accounting & Finance', 4.92, 19)
ON CONFLICT (user_id, category_id) DO UPDATE SET rating = EXCLUDED.rating, completed_count = EXCLUDED.completed_count;
INSERT INTO public.users (id, name, email, role, avatar, headline, bio, location, verification_status, overall_rating, review_count, completion_rate, response_rate, response_time, posted_gigs_count, completed_worker_gigs_count, skills, member_since)
VALUES ('usr_rohan', 'Rohan Patel', 'rohan.moves@example.com', 'worker_primary', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', 'Reliable Furniture Assembly & Apartment Shifting Specialist', 'Experienced heavy lifter with transport vehicles and professional power tools. Specializing in IKEA wardrobes, bed frames, office setups, and local shifting.', 'Bandra & Andheri, Mumbai, Maharashtra', 'VERIFIED', 4.88, 45, 95, 90, '1 hour', 2, 41, '{"IKEA Furniture Assembly","Apartment Shifting","Wall Anchoring","Dollies & Straps"}', '2024-04-01')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email;

INSERT INTO public.category_ratings (user_id, category_id, category_name, rating, completed_count)
VALUES ('usr_rohan', 'cat_home_services', 'Furniture & Assembly', 4.92, 26)
ON CONFLICT (user_id, category_id) DO UPDATE SET rating = EXCLUDED.rating, completed_count = EXCLUDED.completed_count;
INSERT INTO public.category_ratings (user_id, category_id, category_name, rating, completed_count)
VALUES ('usr_rohan', 'cat_moving_delivery', 'Moving Assistance', 4.84, 15)
ON CONFLICT (user_id, category_id) DO UPDATE SET rating = EXCLUDED.rating, completed_count = EXCLUDED.completed_count;
INSERT INTO public.users (id, name, email, role, avatar, headline, bio, location, verification_status, overall_rating, review_count, completion_rate, response_rate, response_time, posted_gigs_count, completed_worker_gigs_count, skills, member_since)
VALUES ('usr_kavya', 'Kavya Nambiar', 'kavya.content@example.com', 'worker_primary', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', 'Technical Content Strategist & SEO Specialist', 'Published writer helping high-growth Indian startups, SaaS products, and digital brands rank on Google with high-converting, human-crafted copy.', 'Kochi, Kerala / Remote (Pan-India)', 'VERIFIED', 4.91, 18, 100, 94, '3 hours', 0, 18, '{"SEO Strategy","Technical Writing","Landing Page Copy","Case Studies"}', '2024-06-15')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email;

INSERT INTO public.category_ratings (user_id, category_id, category_name, rating, completed_count)
VALUES ('usr_kavya', 'cat_professional', 'Content & Copywriting', 4.91, 18)
ON CONFLICT (user_id, category_id) DO UPDATE SET rating = EXCLUDED.rating, completed_count = EXCLUDED.completed_count;

-- 2. SEED CATEGORIES
INSERT INTO public.categories (id, name, slug, icon, description)
VALUES ('cat_home_services', 'Home & Local Services', NULL, 'Wrench', 'Physical repairs, assembly, cleaning, and maintenance')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.categories (id, name, slug, icon, description)
VALUES ('cat_digital_tech', 'Digital & Tech', NULL, 'Code', 'Software engineering, web development, data, and design')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.categories (id, name, slug, icon, description)
VALUES ('cat_events_staffing', 'Events & Hospitality', NULL, 'Sparkles', 'Bartenders, servers, event photographers, and on-site support')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.categories (id, name, slug, icon, description)
VALUES ('cat_professional', 'Professional & Business', NULL, 'Briefcase', 'Finance, bookkeeping, legal drafting, and business strategy')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.categories (id, name, slug, icon, description)
VALUES ('cat_moving_delivery', 'Moving & Delivery', NULL, 'Truck', 'Heavy lifting, local deliveries, and apartment relocation')
ON CONFLICT (id) DO NOTHING;

-- 3. SEED GIGS & BIDS
INSERT INTO public.gigs (id, owner_id, title, category, category_id, subcategory, subcategory_id, service, service_id, type, location, travel_radius, budget, currency, minimum_bid_floor, deadline, required_workers, required_skills, description, status, escrow_status, bids_count, created_at)
VALUES ('gig_101', 'usr_pooja', 'Emergency Pipe Leak Repair under Kitchen Sink', 'Home & Local Services', 'cat_home_services', 'Plumbing & Repairs', 'sub_plumbing', 'Pipe Leak & Fitting Repair', 'srv_pipe_repair', 'physical', 'Koramangala, Bengaluru, Karnataka', '5 km', 2500, 'INR', 2000, '2026-09-22', 1, '{"Pipe Repair","Plumbing","Emergency Fix","CPVC/Brass"}', 'Cold water supply line below the kitchen sink has developed a persistent drip at the compression valve connector. Need an experienced plumber to inspect, replace the worn gasket or fitting, and test under pressure.', 'OPEN', 'HELD', 4, '2026-09-17T09:30:00Z')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, status = EXCLUDED.status;
INSERT INTO public.bids (id, gig_id, bidder_id, bidder_name, bidder_avatar, bidder_rating, category_rating, amount, proposal, estimated_days, status, submitted_at)
VALUES ('bid_01', 'gig_101', 'usr_rajesh', 'Rajesh Kumar', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', 4.97, 4.98, 2200, 'I have 12+ years of plumbing experience and carry standard brass compression fittings and CPVC tools in my toolkit. Can arrive tomorrow at 9 AM and complete this in under an hour.', 1, 'PENDING', '2026-09-17T10:15:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.bids (id, gig_id, bidder_id, bidder_name, bidder_avatar, bidder_rating, category_rating, amount, proposal, estimated_days, status, submitted_at)
VALUES ('bid_02', 'gig_101', 'usr_rohan', 'Rohan Patel', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', 4.88, 4.7, 2000, 'Available tomorrow afternoon in Koramangala. I can bring standard replacement valves and Teflon tape to seal the connection safely.', 1, 'PENDING', '2026-09-17T11:00:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.gigs (id, owner_id, title, category, category_id, subcategory, subcategory_id, service, service_id, type, location, travel_radius, budget, currency, minimum_bid_floor, deadline, required_workers, required_skills, description, status, escrow_status, bids_count, created_at)
VALUES ('gig_102', 'usr_priya', 'Assemble IKEA Pax Wardrobe & 3 Malm Dressers', 'Home & Local Services', 'cat_home_services', 'Furniture & Assembly', 'sub_assembly', 'IKEA Furniture Assembly', 'srv_ikea_assembly', 'physical', 'HSR Layout, Bengaluru, Karnataka', '10 km', 3500, 'INR', 2800, '2026-09-24', 1, '{"IKEA Assembly","Power Drill","Wall Anchoring","Carpentry"}', 'Just moved into a new flat in HSR Layout and received flat-pack delivery for one large 3-door Pax wardrobe and three Malm chest-of-drawers. Boxes are organized in the master bedroom. Please bring your own drill, metric hex bits, and wall anchors.', 'BIDDING', 'HELD', 3, '2026-09-16T14:20:00Z')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, status = EXCLUDED.status;
INSERT INTO public.bids (id, gig_id, bidder_id, bidder_name, bidder_avatar, bidder_rating, category_rating, amount, proposal, estimated_days, status, submitted_at)
VALUES ('bid_03', 'gig_102', 'usr_rohan', 'Rohan Patel', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', 4.88, 4.92, 3200, 'I have assembled over 40 Pax systems and have specialized Bosch impact drivers and wall anchors. I can anchor all units safely to code.', 1, 'PENDING', '2026-09-16T16:30:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.gigs (id, owner_id, title, category, category_id, subcategory, subcategory_id, service, service_id, type, location, travel_radius, budget, currency, minimum_bid_floor, deadline, required_workers, required_skills, description, status, escrow_status, bids_count, created_at)
VALUES ('gig_103', 'usr_pooja', 'React + Tailwind Analytics Dashboard Redesign', 'Digital & Tech', 'cat_digital_tech', 'Web Development', 'sub_web_dev', 'React / Next.js Development', 'srv_react_frontend', 'remote', 'Remote', NULL, 45000, 'INR', 36000, '2026-10-05', 1, '{"React","Tailwind CSS","Chart.js","REST APIs","Clean UI"}', 'We have an existing B2B SaaS platform. We need a frontend engineer to rebuild our core analytics and billing overview pages into high-performance, responsive React components with responsive charts and clean filter dropdowns.', 'OPEN', 'HELD', 5, '2026-09-17T08:00:00Z')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, status = EXCLUDED.status;
INSERT INTO public.bids (id, gig_id, bidder_id, bidder_name, bidder_avatar, bidder_rating, category_rating, amount, proposal, estimated_days, status, submitted_at)
VALUES ('bid_04', 'gig_103', 'usr_ananya', 'Ananya Iyer', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', 5, 5, 42000, 'Senior UI engineer with 6 years of React experience. I''ve designed and delivered 8+ analytics suites with Tailwind and Tremor/Recharts. I write fully modular components with zero bloat.', 10, 'PENDING', '2026-09-17T09:10:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.gigs (id, owner_id, title, category, category_id, subcategory, subcategory_id, service, service_id, type, location, travel_radius, budget, currency, minimum_bid_floor, deadline, required_workers, required_skills, description, status, escrow_status, bids_count, created_at)
VALUES ('gig_104', 'usr_pooja', 'Craft Mixologist for 60-Person Autumn Reception', 'Events & Hospitality', 'cat_events_staffing', 'Food & Beverage Staff', 'sub_bartending', 'Private Party Bartending', 'srv_mixologist', 'physical', 'Whitefield, Bengaluru, Karnataka', '25 km', 8500, 'INR', 6800, '2026-10-12', 1, '{"Craft Bartending","Mixology","Mocktails/Cocktails","Guest Service"}', 'Seeking a personable, professional mixologist for a 5-hour evening reception in Whitefield. Client provides all spirits, mixers, and glassware. Worker will manage bar prep, serve 3 signature drinks, and handle breakdown cleanly.', 'ASSIGNED', 'HELD', 2, '2026-09-15T11:00:00Z')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, status = EXCLUDED.status;
INSERT INTO public.gigs (id, owner_id, title, category, category_id, subcategory, subcategory_id, service, service_id, type, location, travel_radius, budget, currency, minimum_bid_floor, deadline, required_workers, required_skills, description, status, escrow_status, bids_count, created_at)
VALUES ('gig_105', 'usr_rajesh', 'QuickBooks 2025 Ledger Cleanup & GST Reconciliation', 'Professional & Business', 'cat_professional', 'Accounting & Finance', 'sub_accounting', 'QuickBooks & Reconciliation', 'srv_bookkeeping', 'remote', 'Remote', NULL, 15000, 'INR', 12000, '2026-09-30', 1, '{"QuickBooks Online","Bank Reconciliation","Chart of Accounts","GST Prep"}', 'Need a certified accountant/bookkeeper to reconcile 9 months of bank and card feeds, categorize uncategorized contractor expenses, and generate clean Q1-Q3 Profit & Loss and GST compliance statements.', 'IN_PROGRESS', 'HELD', 3, '2026-09-14T10:00:00Z')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, status = EXCLUDED.status;
INSERT INTO public.gigs (id, owner_id, title, category, category_id, subcategory, subcategory_id, service, service_id, type, location, travel_radius, budget, currency, minimum_bid_floor, deadline, required_workers, required_skills, description, status, escrow_status, bids_count, created_at)
VALUES ('gig_106', 'usr_ananya', 'Apartment Move: 1-Bedroom Loading & Unloading', 'Moving & Delivery', 'cat_moving_delivery', 'Moving Assistance', 'sub_moving_help', 'Apartment Loading & Unloading', 'srv_apartment_move', 'physical', 'Indiranagar to Koramangala, Bengaluru', '10 km', 5000, 'INR', 4000, '2026-09-28', 2, '{"Heavy Lifting","Furniture Wrapping","Moving Straps","Stairs Experience"}', 'Moving from a 2nd-floor 1-bedroom flat in Indiranagar to a flat in Koramangala (5 km away). Large items include queen mattress/cot, couch, dining table, and roughly 15 pre-packed boxes. Moving vehicle provided by client.', 'OPEN', 'HELD', 2, '2026-09-17T06:45:00Z')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, status = EXCLUDED.status;
INSERT INTO public.gigs (id, owner_id, title, category, category_id, subcategory, subcategory_id, service, service_id, type, location, travel_radius, budget, currency, minimum_bid_floor, deadline, required_workers, required_skills, description, status, escrow_status, bids_count, created_at)
VALUES ('gig_107', 'usr_pooja', 'Figma UI/UX Mockups for Mobile B2C Marketplace', 'Digital & Tech', 'cat_digital_tech', 'UI/UX & Graphic Design', 'sub_design', 'Figma UI/UX Prototypes', 'srv_figma_ui', 'remote', 'Remote', NULL, 28000, 'INR', 22400, '2026-10-10', 1, '{"Figma","Design Systems","iOS/Android UX","Prototyping","Wireframes"}', 'Need an experienced mobile product designer to create 14 high-fidelity screen mockups and interactive prototype in Figma for an on-demand delivery app. Must include light mode and clean auto-layout design system tokens.', 'OPEN', 'HELD', 6, '2026-09-16T18:00:00Z')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, status = EXCLUDED.status;
INSERT INTO public.gigs (id, owner_id, title, category, category_id, subcategory, subcategory_id, service, service_id, type, location, travel_radius, budget, currency, minimum_bid_floor, deadline, required_workers, required_skills, description, status, escrow_status, bids_count, created_at)
VALUES ('gig_108', 'usr_vikram', 'Full House Deep Clean & Balcony Washing', 'Home & Local Services', 'cat_home_services', 'Cleaning & Housekeeping', 'sub_cleaning', 'Deep Home Cleaning', 'srv_deep_clean', 'physical', 'Bandra West, Mumbai, Maharashtra', '15 km', 4500, 'INR', 3600, '2026-09-25', 1, '{"Deep Cleaning","Eco-friendly Supplies","Sanitization","Balcony Cleaning"}', '3-bedroom, 2-bathroom flat needs thorough post-renovation cleaning. Dusting all baseboards, scrubbing kitchen tiles and chimney, plus balcony & window washing. Cleaning supplies must be pet-friendly.', 'OPEN', 'HELD', 4, '2026-09-17T12:00:00Z')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, status = EXCLUDED.status;
INSERT INTO public.gigs (id, owner_id, title, category, category_id, subcategory, subcategory_id, service, service_id, type, location, travel_radius, budget, currency, minimum_bid_floor, deadline, required_workers, required_skills, description, status, escrow_status, bids_count, created_at)
VALUES ('gig_109', 'usr_pooja', '5 In-Depth Technical SEO Blog Articles (2,000 words each)', 'Professional & Business', 'cat_professional', 'Content & Copywriting', 'sub_writing', 'Technical SEO Blog Writing', 'srv_seo_articles', 'remote', 'Remote', NULL, 18000, 'INR', 14400, '2026-10-15', 1, '{"SEO Copywriting","Cloud Computing","Keyword Research","Tech Journalism"}', 'Series of authoritative articles focusing on serverless infrastructure, observability best practices, and CI/CD pipelines. Must be well-researched with real architecture code examples and keyword optimization.', 'ASSIGNED', 'HELD', 4, '2026-09-12T08:00:00Z')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, status = EXCLUDED.status;
INSERT INTO public.gigs (id, owner_id, title, category, category_id, subcategory, subcategory_id, service, service_id, type, location, travel_radius, budget, currency, minimum_bid_floor, deadline, required_workers, required_skills, description, status, escrow_status, bids_count, created_at)
VALUES ('gig_110', 'usr_priya', 'Smart Home Geyser & Light Switches Replacement', 'Home & Local Services', 'cat_home_services', 'Electrical & Lighting', 'sub_electrical', 'Smart Switch & Outlet Setup', 'srv_outlet_install', 'physical', 'Powai, Mumbai, Maharashtra', '8 km', 3200, 'INR', 2560, '2026-09-27', 1, '{"Electrical Safety","Smart Home","Switch Replacement","Wiring Diagnostics"}', 'Looking to install 1 smart geyser automation timer and 4 smart Wi-Fi dimmer touch switches. Need verified electrician or experienced technician who follows MCB/fuse safety protocol.', 'OPEN', 'HELD', 2, '2026-09-17T11:15:00Z')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, status = EXCLUDED.status;
INSERT INTO public.gigs (id, owner_id, title, category, category_id, subcategory, subcategory_id, service, service_id, type, location, travel_radius, budget, currency, minimum_bid_floor, deadline, required_workers, required_skills, description, status, escrow_status, bids_count, created_at)
VALUES ('gig_111', 'usr_pooja', 'Python Web Scraper for Real Estate Listings', 'Digital & Tech', 'cat_digital_tech', 'Data & Automation', 'sub_data_ai', 'Web Scraping & Extraction', 'srv_data_scraping', 'remote', 'Remote', NULL, 12000, 'INR', 9600, '2026-09-29', 1, '{"Python","Playwright","BeautifulSoup","Pandas","PostgreSQL"}', 'Need an automated scraper script in Python using Playwright/Requests to extract public property listing metadata daily, deduplicate records, and store into a clean PostgreSQL schema.', 'SUBMITTED', 'HELD', 3, '2026-09-10T14:00:00Z')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, status = EXCLUDED.status;
INSERT INTO public.gigs (id, owner_id, title, category, category_id, subcategory, subcategory_id, service, service_id, type, location, travel_radius, budget, currency, minimum_bid_floor, deadline, required_workers, required_skills, description, status, escrow_status, bids_count, created_at)
VALUES ('gig_112', 'usr_pooja', 'Corporate Tech Meetup Keynote Photography & Editing', 'Events & Hospitality', 'cat_events_staffing', 'Event Media & Logistics', 'sub_event_media', 'Event Photography & Editing', 'srv_event_photo', 'hybrid', 'MG Road, Bengaluru + Remote Post-Processing', '15 km', 14000, 'INR', 11200, '2026-10-02', 1, '{"Event Photography","Low Light","Lightroom","Fast Turnaround"}', 'Photograph a 3-hour evening AI meetup on MG Road, Bengaluru (speaker stage, audience reactions, networking mixer). Deliver 75 high-res edited photos within 48 hours for press distribution.', 'OPEN', 'HELD', 3, '2026-09-17T07:10:00Z')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, status = EXCLUDED.status;
INSERT INTO public.gigs (id, owner_id, title, category, category_id, subcategory, subcategory_id, service, service_id, type, location, travel_radius, budget, currency, minimum_bid_floor, deadline, required_workers, required_skills, description, status, escrow_status, bids_count, created_at)
VALUES ('gig_113', 'usr_rohan', 'Mounted 75-inch OLED TV with Wire In-Wall Concealment', 'Home & Local Services', 'cat_home_services', 'Electrical & Lighting', 'sub_electrical', 'TV Mounting & Wire Concealment', 'srv_tv_mounting', 'physical', 'Hitec City, Hyderabad, Telangana', '10 km', 3000, 'INR', 2400, '2026-09-23', 1, '{"TV Mounting","Wall Studs","Cable Concealment","Heavy Display"}', 'Mount new 75-inch Sony Bravia OLED onto wall bracket over living room credenza. Mount kit already on hand. Requires running HDMI/Power cables cleanly through in-wall conduit kit.', 'OPEN', 'HELD', 2, '2026-09-17T09:00:00Z')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, status = EXCLUDED.status;
INSERT INTO public.gigs (id, owner_id, title, category, category_id, subcategory, subcategory_id, service, service_id, type, location, travel_radius, budget, currency, minimum_bid_floor, deadline, required_workers, required_skills, description, status, escrow_status, bids_count, created_at)
VALUES ('gig_114', 'usr_rajesh', 'Disputed: Commercial Espresso Bar Machine Repair', 'Home & Local Services', 'cat_home_services', 'Plumbing & Repairs', 'sub_plumbing', 'Pipe Leak & Fitting Repair', 'srv_pipe_repair', 'physical', 'Church Street, Bengaluru, Karnataka', '5 km', 6000, 'INR', 4800, '2026-09-14', 1, '{"Espresso Tech","Boiler Repair","Commercial Plumbing"}', 'Dispute raised regarding replacement of boiler safety release valve. Client claims fitting continues to hiss; worker provided invoice and certification photos. Awaiting admin arbitrator review.', 'DISPUTED', 'HELD', 1, '2026-09-08T10:00:00Z')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, status = EXCLUDED.status;
INSERT INTO public.gigs (id, owner_id, title, category, category_id, subcategory, subcategory_id, service, service_id, type, location, travel_radius, budget, currency, minimum_bid_floor, deadline, required_workers, required_skills, description, status, escrow_status, bids_count, created_at)
VALUES ('gig_115', 'usr_pooja', 'Completed: Wall-Mounted Bookshelf Installation', 'Home & Local Services', 'cat_home_services', 'Furniture & Assembly', 'sub_assembly', 'Desk & Bookcase Assembly', 'srv_desk_mounting', 'physical', 'Jayanagar, Bengaluru, Karnataka', '5 km', 2200, 'INR', 1760, '2026-09-12', 1, '{"Shelving","Stud Finder","Leveling","Carpentry"}', 'Installed two 6-foot solid Sheesham wood floating bookshelves with heavy-duty hidden steel brackets into masonry wall.', 'COMPLETED', 'RELEASED', 3, '2026-09-09T08:30:00Z')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, status = EXCLUDED.status;

-- 4. SEED ADMIN & DISPUTES & RISK FLAGS
INSERT INTO public.disputes (id, gig_id, gig_title, raised_by, raised_by_name, respondent_id, respondent_name, amount, reason, status, resolution, evidence, evidence_count, opened_at)
VALUES ('DSP-409', 'gig_114', 'Commercial Espresso Bar Machine Repair', 'usr_rajesh', 'Rajesh Kumar', 'usr_rohan', 'Rohan Patel', 15000, 'Incomplete boiler valve seal leading to intermittent pressure loss.', 'UNDER_REVIEW', NULL, '[{"name":"pressure_gauge_video.mp4","type":"video","size":"12.4 MB"},{"name":"invoice_gaskets.pdf","type":"pdf","size":"410 KB"},{"name":"chat_agreement_transcript.txt","type":"text","size":"45 KB"}]'::jsonb, 3, '2026-09-14T09:12:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.disputes (id, gig_id, gig_title, raised_by, raised_by_name, respondent_id, respondent_name, amount, reason, status, resolution, evidence, evidence_count, opened_at)
VALUES ('DSP-408', 'gig_hist_09', 'Custom Shopify Theme Extension', 'usr_client_99', 'Indic Retail Brands Ltd', 'usr_ananya', 'Ananya Iyer', 28000, 'Deliverable scope disagreement after feature sign-off.', 'RESOLVED_WORKER', 'Resolved in favor of Worker: Commit log verified deliverable matched initial specification.', '[{"name":"git_commit_log.png","type":"image","size":"850 KB"}]'::jsonb, 2, '2026-09-02T11:00:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.risk_flags (id, target_type, target_id, target_title, risk_level, flag_reason, status)
VALUES ('RSK-812', 'GIG', 'gig_991', 'Post 500 Fake App Reviews for ₹1,500', 'HIGH', 'Terms of Service Violation: Collusive / Fake Reviews Scheme', 'PENDING_REVIEW')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.risk_flags (id, target_type, target_id, target_title, risk_level, flag_reason, status)
VALUES ('RSK-811', 'USER', 'usr_sketchy_4', 'User @quickcash_india', 'HIGH', 'Potential Collusive Bidding: Identical IP & fast reciprocal reviews detected.', 'PENDING_REVIEW')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.risk_flags (id, target_type, target_id, target_title, risk_level, flag_reason, status)
VALUES ('RSK-810', 'GIG', 'gig_988', 'Offer to bypass TaskProxi escrow via Direct UPI / Cash', 'HIGH', 'Off-platform payment attempt / potential shadow transaction', 'RESOLVED')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, actor_id, actor_name, action, target, details, created_at)
VALUES ('AUD-991', 'AUD-991', 'Arjun Verma (Admin)', 'FROZE_ESCROW', 'Gig #gig_114 (Commercial Espresso Bar Repair)', 'Automated payment freeze applied due to active dispute DSP-409.', '2026-09-14T09:15:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, actor_id, actor_name, action, target, details, created_at)
VALUES ('AUD-990', 'AUD-990', 'Arjun Verma (Admin)', 'SUSPENDED_ACCOUNT', 'User #usr_sketchy_2', 'Suspended for repeated sub-floor bidding bot activity.', '2026-09-13T14:40:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, actor_id, actor_name, action, target, details, created_at)
VALUES ('AUD-989', 'AUD-989', 'System Engine', 'ENFORCED_BID_FLOOR', 'Gig #gig_101', 'Rejected bid of ₹1,500 (below minimum 80% threshold of ₹2,000).', '2026-09-17T10:10:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, actor_id, actor_name, action, target, details, created_at)
VALUES ('AUD-988', 'AUD-988', 'Arjun Verma (Admin)', 'TAXONOMY_ADDED', 'Category: Events & Hospitality', 'Added new subcategory ''Event Media & Logistics'' -> ''AV Setup''.', '2026-09-11T16:20:00Z')
ON CONFLICT (id) DO NOTHING;

-- 5. SEED CONVERSATIONS & MESSAGES
INSERT INTO public.conversations (id, gig_id, participant_one, participant_two, last_message, last_updated)
VALUES ('conv_101', 'gig_101', 'usr_pooja', 'usr_rajesh', 'I will arrive tomorrow morning right at 9:00 AM with the compression valves and Teflon tape.', '2026-09-17T10:45:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.messages (id, conversation_id, sender_id, sender_name, text, timestamp, is_read)
VALUES ('msg_1', 'conv_101', 'usr_pooja', 'Pooja Reddy', 'Hi Rajesh, thanks for the bid! Is the leak at the valve or the CPVC join easy to replace without shutting off the main water valve for more than an hour?', '2026-09-17T10:20:00Z', FALSE)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.messages (id, conversation_id, sender_id, sender_name, text, timestamp, is_read)
VALUES ('msg_2', 'conv_101', 'usr_rajesh', 'Rajesh Kumar', 'Namaste Pooja ji! Absolutely. I''ll isolate just the under-sink shutoff valve. It will take around 25 minutes total.', '2026-09-17T10:32:00Z', FALSE)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.messages (id, conversation_id, sender_id, sender_name, text, timestamp, is_read)
VALUES ('msg_3', 'conv_101', 'usr_rajesh', 'Rajesh Kumar', 'I will arrive tomorrow morning right at 9:00 AM with the compression valves and Teflon tape.', '2026-09-17T10:45:00Z', FALSE)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.conversations (id, gig_id, participant_one, participant_two, last_message, last_updated)
VALUES ('conv_103', 'gig_103', 'usr_pooja', 'usr_ananya', 'Reviewed your Figma design tokens. The color scheme looks super crisp!', '2026-09-17T09:40:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.messages (id, conversation_id, sender_id, sender_name, text, timestamp, is_read)
VALUES ('msg_4', 'conv_103', 'usr_ananya', 'Ananya Iyer', 'Hi Pooja! I saw your post for the Analytics Dashboard. I have built similar systems using Tailwind and Recharts. Do you have a Figma file already prepared?', '2026-09-17T09:20:00Z', FALSE)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.messages (id, conversation_id, sender_id, sender_name, text, timestamp, is_read)
VALUES ('msg_5', 'conv_103', 'usr_pooja', 'Pooja Reddy', 'Hi Ananya! Yes, our product designer finished the auto-layout frames yesterday. I can grant you edit access once we finalize the bid.', '2026-09-17T09:35:00Z', FALSE)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.messages (id, conversation_id, sender_id, sender_name, text, timestamp, is_read)
VALUES ('msg_6', 'conv_103', 'usr_ananya', 'Ananya Iyer', 'Reviewed your Figma design tokens. The color scheme looks super crisp!', '2026-09-17T09:40:00Z', FALSE)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.conversations (id, gig_id, participant_one, participant_two, last_message, last_updated)
VALUES ('conv_104', 'gig_104', 'usr_pooja', 'usr_vikram', 'I have prepared the draft beverage menu and ingredient shopping list.', '2026-09-16T15:20:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.messages (id, conversation_id, sender_id, sender_name, text, timestamp, is_read)
VALUES ('msg_7', 'conv_104', 'usr_pooja', 'Pooja Reddy', 'Vikram, so glad to have you assigned for the reception in Koramangala. Could you send the ingredients list for the signature mocktails?', '2026-09-16T14:10:00Z', FALSE)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.messages (id, conversation_id, sender_id, sender_name, text, timestamp, is_read)
VALUES ('msg_8', 'conv_104', 'usr_vikram', 'Vikramaditya Singh', 'I have prepared the draft beverage menu and ingredient shopping list.', '2026-09-16T15:20:00Z', FALSE)
ON CONFLICT (id) DO NOTHING;

-- 6. SEED NOTIFICATIONS
INSERT INTO public.notifications (id, user_id, type, title, description, link, is_read, icon, created_at)
VALUES ('notif_01', 'usr_pooja', 'BID_RECEIVED', 'New Bid on Emergency Pipe Leak Repair', 'Rajesh Kumar submitted a bid of ₹2,200 with 1 day completion estimate.', '/gigs/gig_101', FALSE, 'BadgeDollarSign', '2026-09-17T10:15:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notifications (id, user_id, type, title, description, link, is_read, icon, created_at)
VALUES ('notif_02', 'usr_pooja', 'WORK_SUBMITTED', 'Work Submitted for Review', 'Ananya Iyer submitted work for ''React + Tailwind Analytics Dashboard Redesign''.', '/dashboard', FALSE, 'CheckCircle2', '2026-09-17T09:45:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notifications (id, user_id, type, title, description, link, is_read, icon, created_at)
VALUES ('notif_03', 'usr_pooja', 'ESCROW_FUNDED', 'Simulated Escrow Secured', 'Funds of ₹18,000 are safely held in escrow for ''Craft Mixologist for 60-Person Autumn Wedding Reception''.', '/gigs/gig_104', TRUE, 'ShieldCheck', '2026-09-16T11:05:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notifications (id, user_id, type, title, description, link, is_read, icon, created_at)
VALUES ('notif_04', 'usr_pooja', 'MESSAGE_RECEIVED', 'New Message from Rajesh Kumar', '''I will arrive tomorrow morning right at 9:00 AM with the compression valves and Teflon tape.''', '/messages', FALSE, 'MessageSquare', '2026-09-17T10:45:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notifications (id, user_id, type, title, description, link, is_read, icon, created_at)
VALUES ('notif_05', 'usr_rajesh', 'BID_ACCEPTED', 'Bid Accepted!', 'Your bid of ₹2,200 was accepted for Emergency Pipe Leak Repair. Escrow is held.', '/dashboard', FALSE, 'Trophy', '2026-09-17T11:30:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notifications (id, user_id, type, title, description, link, is_read, icon, created_at)
VALUES ('notif_06', 'usr_rohan', 'PAYMENT_RELEASED', 'Payment Released: ₹3,200', 'Pooja Reddy approved your work on Wall-Mounted Bookshelf Installation.', '/dashboard', TRUE, 'IndianRupee', '2026-09-12T16:00:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notifications (id, user_id, type, title, description, link, is_read, icon, created_at)
VALUES ('notif_07', 'usr_rajesh', 'DISPUTE_UPDATE', 'Dispute Under Admin Review', 'Dispute #DSP-409 regarding Commercial Espresso Bar Repair is being investigated by Admin Arjun Verma.', '/dashboard', TRUE, 'AlertTriangle', '2026-09-15T08:00:00Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notifications (id, user_id, type, title, description, link, is_read, icon, created_at)
VALUES ('notif_08', 'usr_pooja', 'REVIEW_REQUEST', 'Please review Rohan Patel', 'Share your experience working on Wall-Mounted Bookshelf Installation.', '/profile/usr_rohan', TRUE, 'Star', '2026-09-12T16:30:00Z')
ON CONFLICT (id) DO NOTHING;
