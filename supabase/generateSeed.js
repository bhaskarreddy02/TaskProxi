import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mockUsers } from '../src/data/mockUsers.js';
import { mockCategories } from '../src/data/mockCategories.js';
import { initialMockGigs } from '../src/data/mockGigs.js';
import { mockDisputes, mockRiskFlags, mockAuditLogs } from '../src/data/mockAdminData.js';
import { initialMockConversations } from '../src/data/mockMessages.js';
import { initialMockNotifications } from '../src/data/mockNotifications.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function sqlEscape(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return val;
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  if (Array.isArray(val)) {
    // Escape each item in text array: '{"item1", "item2"}'
    const escapedItems = val.map(v => `"${String(v).replace(/"/g, '\\"')}"`).join(',');
    return `'${escapedItems ? `{${escapedItems}}` : '{}'}'`;
  }
  if (typeof val === 'object') {
    return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
  }
  return `'${String(val).replace(/'/g, "''")}'`;
}

let sql = `-- ==============================================================================
-- TASKPROXI SEED DATA SCRIPT
-- Generated from current frontend mock datasets
-- ==============================================================================

-- 1. SEED USERS
`;

for (const u of mockUsers) {
  sql += `INSERT INTO public.users (id, name, email, role, avatar, headline, bio, location, verification_status, overall_rating, review_count, completion_rate, response_rate, response_time, posted_gigs_count, completed_worker_gigs_count, skills, member_since)
VALUES (${sqlEscape(u.id)}, ${sqlEscape(u.name)}, ${sqlEscape(u.email)}, ${sqlEscape(u.role)}, ${sqlEscape(u.avatar)}, ${sqlEscape(u.headline)}, ${sqlEscape(u.bio)}, ${sqlEscape(u.location)}, ${sqlEscape(u.verified ? 'VERIFIED' : 'UNVERIFIED')}, ${sqlEscape(u.overallRating)}, ${sqlEscape(u.reviewCount)}, ${sqlEscape(u.completionRate)}, ${sqlEscape(u.responseRate)}, ${sqlEscape(u.responseTime)}, ${sqlEscape(u.postedGigsCount)}, ${sqlEscape(u.completedWorkerGigsCount)}, ${sqlEscape(u.skills)}, ${sqlEscape(u.memberSince)})
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email;\n\n`;

  if (u.categoryRatings && u.categoryRatings.length > 0) {
    for (const cr of u.categoryRatings) {
      sql += `INSERT INTO public.category_ratings (user_id, category_id, category_name, rating, completed_count)
VALUES (${sqlEscape(u.id)}, ${sqlEscape(cr.categoryId)}, ${sqlEscape(cr.categoryName)}, ${sqlEscape(cr.rating)}, ${sqlEscape(cr.count)})
ON CONFLICT (user_id, category_id) DO UPDATE SET rating = EXCLUDED.rating, completed_count = EXCLUDED.completed_count;\n`;
    }
  }
}

sql += `\n-- 2. SEED CATEGORIES\n`;
for (const cat of mockCategories) {
  sql += `INSERT INTO public.categories (id, name, slug, icon, description)
VALUES (${sqlEscape(cat.id)}, ${sqlEscape(cat.name)}, ${sqlEscape(cat.slug)}, ${sqlEscape(cat.icon)}, ${sqlEscape(cat.description)})
ON CONFLICT (id) DO NOTHING;\n`;
}

sql += `\n-- 3. SEED GIGS & BIDS\n`;
for (const g of initialMockGigs) {
  sql += `INSERT INTO public.gigs (id, owner_id, title, category, category_id, subcategory, subcategory_id, service, service_id, type, location, travel_radius, budget, currency, minimum_bid_floor, deadline, required_workers, required_skills, description, status, escrow_status, bids_count, created_at)
VALUES (${sqlEscape(g.id)}, ${sqlEscape(g.ownerId || g.owner?.id)}, ${sqlEscape(g.title)}, ${sqlEscape(g.category)}, ${sqlEscape(g.categoryId)}, ${sqlEscape(g.subcategory)}, ${sqlEscape(g.subcategoryId)}, ${sqlEscape(g.service)}, ${sqlEscape(g.serviceId)}, ${sqlEscape(g.type)}, ${sqlEscape(g.location)}, ${sqlEscape(g.travelRadius)}, ${sqlEscape(g.budget)}, ${sqlEscape(g.currency)}, ${sqlEscape(g.minimumBidFloor)}, ${sqlEscape(g.deadline)}, ${sqlEscape(g.requiredWorkers || 1)}, ${sqlEscape(g.requiredSkills || [])}, ${sqlEscape(g.description)}, ${sqlEscape(g.status)}, ${sqlEscape(g.escrowStatus)}, ${sqlEscape(g.bidsCount || (g.bids ? g.bids.length : 0))}, ${sqlEscape(g.createdAt)})
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, status = EXCLUDED.status;\n`;

  if (g.bids && g.bids.length > 0) {
    for (const b of g.bids) {
      sql += `INSERT INTO public.bids (id, gig_id, bidder_id, bidder_name, bidder_avatar, bidder_rating, category_rating, amount, proposal, estimated_days, status, submitted_at)
VALUES (${sqlEscape(b.id)}, ${sqlEscape(g.id)}, ${sqlEscape(b.bidderId)}, ${sqlEscape(b.bidderName)}, ${sqlEscape(b.bidderAvatar)}, ${sqlEscape(b.bidderRating)}, ${sqlEscape(b.categoryRating)}, ${sqlEscape(b.amount)}, ${sqlEscape(b.proposal)}, ${sqlEscape(b.estimatedDays)}, ${sqlEscape(b.status)}, ${sqlEscape(b.submittedAt)})
ON CONFLICT (id) DO NOTHING;\n`;
    }
  }
}

sql += `\n-- 4. SEED ADMIN & DISPUTES & RISK FLAGS\n`;
for (const d of mockDisputes) {
  sql += `INSERT INTO public.disputes (id, gig_id, gig_title, raised_by, raised_by_name, respondent_id, respondent_name, amount, reason, status, resolution, evidence, evidence_count, opened_at)
VALUES (${sqlEscape(d.id)}, ${sqlEscape(d.gigId)}, ${sqlEscape(d.gigTitle)}, ${sqlEscape(d.raisedBy)}, ${sqlEscape(d.raisedByName)}, ${sqlEscape(d.respondentId)}, ${sqlEscape(d.respondentName)}, ${sqlEscape(d.amount)}, ${sqlEscape(d.reason)}, ${sqlEscape(d.status)}, ${sqlEscape(d.resolution)}, ${sqlEscape(d.evidence)}, ${sqlEscape(d.evidenceCount)}, ${sqlEscape(d.openedAt)})
ON CONFLICT (id) DO NOTHING;\n`;
}

for (const rf of mockRiskFlags) {
  sql += `INSERT INTO public.risk_flags (id, target_type, target_id, target_title, risk_level, flag_reason, status)
VALUES (${sqlEscape(rf.id)}, ${sqlEscape(rf.targetType)}, ${sqlEscape(rf.targetId)}, ${sqlEscape(rf.targetTitle)}, ${sqlEscape(rf.riskLevel)}, ${sqlEscape(rf.flagReason)}, ${sqlEscape(rf.status)})
ON CONFLICT (id) DO NOTHING;\n`;
}

for (const al of mockAuditLogs) {
  sql += `INSERT INTO public.audit_logs (id, actor_id, actor_name, action, target, details, created_at)
VALUES (${sqlEscape(al.id)}, ${sqlEscape(al.id)}, ${sqlEscape(al.actor)}, ${sqlEscape(al.action)}, ${sqlEscape(al.target)}, ${sqlEscape(al.details)}, ${sqlEscape(al.timestamp)})
ON CONFLICT (id) DO NOTHING;\n`;
}

sql += `\n-- 5. SEED CONVERSATIONS & MESSAGES\n`;
for (const c of initialMockConversations) {
  sql += `INSERT INTO public.conversations (id, gig_id, participant_one, participant_two, last_message, last_updated)
VALUES (${sqlEscape(c.id)}, ${sqlEscape(c.gigId)}, ${sqlEscape(c.participantOne?.id || c.participantOne)}, ${sqlEscape(c.participantTwo?.id || c.participantTwo)}, ${sqlEscape(c.lastMessage)}, ${sqlEscape(c.lastUpdated)})
ON CONFLICT (id) DO NOTHING;\n`;

  if (c.messages && c.messages.length > 0) {
    for (const m of c.messages) {
      sql += `INSERT INTO public.messages (id, conversation_id, sender_id, sender_name, text, timestamp, is_read)
VALUES (${sqlEscape(m.id)}, ${sqlEscape(c.id)}, ${sqlEscape(m.senderId)}, ${sqlEscape(m.senderName)}, ${sqlEscape(m.text)}, ${sqlEscape(m.timestamp)}, ${sqlEscape(m.read || false)})
ON CONFLICT (id) DO NOTHING;\n`;
    }
  }
}

sql += `\n-- 6. SEED NOTIFICATIONS\n`;
for (const n of initialMockNotifications) {
  sql += `INSERT INTO public.notifications (id, user_id, type, title, description, link, is_read, icon, created_at)
VALUES (${sqlEscape(n.id)}, ${sqlEscape(n.userId)}, ${sqlEscape(n.type)}, ${sqlEscape(n.title)}, ${sqlEscape(n.description)}, ${sqlEscape(n.link)}, ${sqlEscape(n.read || false)}, ${sqlEscape(n.icon)}, ${sqlEscape(n.timestamp)})
ON CONFLICT (id) DO NOTHING;\n`;
}

fs.writeFileSync(path.join(__dirname, 'seed.sql'), sql, 'utf8');
console.log('Successfully generated supabase/seed.sql');
