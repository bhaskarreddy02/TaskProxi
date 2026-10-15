-- ==============================================================================
-- TASKPROXI DATABASE SCHEMA (PostgreSQL / Supabase)
-- Aligned with UML Domain Model (classdiag.mdj) and Marketplace Specifications
-- ==============================================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    role VARCHAR(50) DEFAULT 'poster_primary', -- 'poster_primary', 'worker_primary', 'admin'
    avatar TEXT,
    headline VARCHAR(255),
    bio TEXT,
    location VARCHAR(150),
    verification_status VARCHAR(50) DEFAULT 'VERIFIED',
    overall_rating NUMERIC(3, 2) DEFAULT 5.00,
    review_count INT DEFAULT 0,
    completion_rate INT DEFAULT 100,
    response_rate INT DEFAULT 98,
    response_time VARCHAR(50) DEFAULT '< 1 hour',
    posted_gigs_count INT DEFAULT 0,
    completed_worker_gigs_count INT DEFAULT 0,
    skills TEXT[] DEFAULT '{}',
    member_since TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. CATEGORY RATINGS (SRS FR4: Category-Specific Worker Ratings)
CREATE TABLE IF NOT EXISTS public.category_ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(100) NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    category_id VARCHAR(100) NOT NULL,
    category_name VARCHAR(150) NOT NULL,
    rating NUMERIC(3, 2) DEFAULT 5.00,
    completed_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_category UNIQUE (user_id, category_id)
);

-- 3. CATEGORIES & TAXONOMY
CREATE TABLE IF NOT EXISTS public.categories (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    parent_id VARCHAR(100) REFERENCES public.categories(id) ON DELETE SET NULL,
    icon VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. GIGS (Lifecycle, Escrow, and Fair-Wage 80% Bid Floor)
CREATE TABLE IF NOT EXISTS public.gigs (
    id VARCHAR(100) PRIMARY KEY,
    owner_id VARCHAR(100) NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(150),
    category_id VARCHAR(100) REFERENCES public.categories(id) ON DELETE SET NULL,
    subcategory VARCHAR(150),
    subcategory_id VARCHAR(100),
    service VARCHAR(150),
    service_id VARCHAR(100),
    type VARCHAR(50) DEFAULT 'physical', -- 'physical', 'remote'
    location VARCHAR(200),
    travel_radius VARCHAR(100),
    budget NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(20) DEFAULT 'INR',
    minimum_bid_floor NUMERIC(12, 2) NOT NULL, -- 80% fair-wage floor
    deadline DATE,
    required_workers INT DEFAULT 1,
    required_skills TEXT[] DEFAULT '{}',
    description TEXT,
    status VARCHAR(50) DEFAULT 'OPEN', -- 'OPEN', 'BIDDING', 'ASSIGNED', 'IN_PROGRESS', 'SUBMITTED', 'COMPLETED', 'DISPUTED', 'CANCELLED'
    escrow_status VARCHAR(50) DEFAULT 'HELD', -- 'HELD', 'RELEASED', 'REFUNDED'
    assigned_worker_id VARCHAR(100) REFERENCES public.users(id) ON DELETE SET NULL,
    bids_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. BIDS
CREATE TABLE IF NOT EXISTS public.bids (
    id VARCHAR(100) PRIMARY KEY,
    gig_id VARCHAR(100) NOT NULL REFERENCES public.gigs(id) ON DELETE CASCADE,
    bidder_id VARCHAR(100) NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    bidder_name VARCHAR(150),
    bidder_avatar TEXT,
    bidder_rating NUMERIC(3, 2),
    category_rating NUMERIC(3, 2),
    amount NUMERIC(12, 2) NOT NULL,
    proposal TEXT NOT NULL,
    estimated_days INT DEFAULT 1,
    status VARCHAR(50) DEFAULT 'PENDING', -- 'PENDING', 'ACCEPTED', 'DECLINED', 'WITHDRAWN'
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. COUNTER OFFERS (Negotiation Engine)
CREATE TABLE IF NOT EXISTS public.counter_offers (
    id VARCHAR(100) PRIMARY KEY,
    bid_id VARCHAR(100) NOT NULL REFERENCES public.bids(id) ON DELETE CASCADE,
    sender_id VARCHAR(100) NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    amount NUMERIC(12, 2) NOT NULL,
    note TEXT,
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. ASSIGNMENTS (Execution Contract)
CREATE TABLE IF NOT EXISTS public.assignments (
    id VARCHAR(100) PRIMARY KEY,
    gig_id VARCHAR(100) UNIQUE NOT NULL REFERENCES public.gigs(id) ON DELETE CASCADE,
    worker_id VARCHAR(100) NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    accepted_bid_id VARCHAR(100) REFERENCES public.bids(id) ON DELETE SET NULL,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completion_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'IN_PROGRESS' -- 'IN_PROGRESS', 'SUBMITTED', 'COMPLETED'
);

-- 8. PAYMENTS & ESCROW LEDGER
CREATE TABLE IF NOT EXISTS public.payments (
    id VARCHAR(100) PRIMARY KEY,
    gig_id VARCHAR(100) NOT NULL REFERENCES public.gigs(id) ON DELETE CASCADE,
    payer_id VARCHAR(100) NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    payee_id VARCHAR(100) REFERENCES public.users(id) ON DELETE SET NULL,
    amount NUMERIC(12, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'HELD', -- 'HELD', 'RELEASED', 'REFUNDED'
    transaction_ref VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. REVIEWS
CREATE TABLE IF NOT EXISTS public.reviews (
    id VARCHAR(100) PRIMARY KEY,
    gig_id VARCHAR(100) NOT NULL REFERENCES public.gigs(id) ON DELETE CASCADE,
    reviewer_id VARCHAR(100) NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    reviewee_id VARCHAR(100) NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL, -- 'POSTER_TO_WORKER', 'WORKER_TO_POSTER'
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. DISPUTES
CREATE TABLE IF NOT EXISTS public.disputes (
    id VARCHAR(100) PRIMARY KEY,
    gig_id VARCHAR(100) NOT NULL REFERENCES public.gigs(id) ON DELETE CASCADE,
    gig_title VARCHAR(255),
    raised_by VARCHAR(100) NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    raised_by_name VARCHAR(150),
    respondent_id VARCHAR(100) NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    respondent_name VARCHAR(150),
    amount NUMERIC(12, 2) NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'UNDER_REVIEW', -- 'UNDER_REVIEW', 'RESOLVED_WORKER', 'RESOLVED_POSTER', 'PARTIAL_SPLIT'
    resolution TEXT,
    evidence JSONB DEFAULT '[]',
    evidence_count INT DEFAULT 0,
    opened_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- 11. RISK FLAGS (Fraud & Safety Monitoring)
CREATE TABLE IF NOT EXISTS public.risk_flags (
    id VARCHAR(100) PRIMARY KEY,
    target_type VARCHAR(50) NOT NULL, -- 'GIG', 'USER', 'MESSAGE'
    target_id VARCHAR(100) NOT NULL,
    target_title VARCHAR(255),
    risk_level VARCHAR(20) DEFAULT 'MEDIUM', -- 'LOW', 'MEDIUM', 'HIGH'
    flag_reason TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'OPEN', -- 'OPEN', 'RESOLVED', 'DISMISSED'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id VARCHAR(100) PRIMARY KEY,
    actor_id VARCHAR(100),
    actor_name VARCHAR(150),
    action VARCHAR(150) NOT NULL,
    target VARCHAR(255) NOT NULL,
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. CONVERSATIONS & CHAT
CREATE TABLE IF NOT EXISTS public.conversations (
    id VARCHAR(100) PRIMARY KEY,
    gig_id VARCHAR(100) REFERENCES public.gigs(id) ON DELETE SET NULL,
    participant_one VARCHAR(100) NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    participant_two VARCHAR(100) NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    last_message TEXT,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.messages (
    id VARCHAR(100) PRIMARY KEY,
    conversation_id VARCHAR(100) NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id VARCHAR(100) NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    sender_name VARCHAR(150),
    text TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);

-- 14. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id VARCHAR(100) PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    link VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE,
    icon VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 15. BOOKMARKS / SAVED GIGS
CREATE TABLE IF NOT EXISTS public.saved_gigs (
    user_id VARCHAR(100) NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    gig_id VARCHAR(100) NOT NULL REFERENCES public.gigs(id) ON DELETE CASCADE,
    saved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, gig_id)
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Configured for development flexibility, ready for production policies
-- ==============================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gigs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.counter_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_gigs ENABLE ROW LEVEL SECURITY;

-- Allow public read & write during development (can be restricted per user in production)
DO $$
DECLARE
    tbl text;
BEGIN
    FOR tbl IN 
        SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS "Public Dev Access" ON public.%I', tbl);
        EXECUTE format('CREATE POLICY "Public Dev Access" ON public.%I FOR ALL USING (true) WITH CHECK (true)', tbl);
    END LOOP;
END $$;
