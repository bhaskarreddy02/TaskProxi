// ==============================================================================
// TaskProxi Database Services Layer
// Direct mapping to UML Services: AuthService, GigService, BiddingService, etc.
// ==============================================================================

import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

// Helper to check DB connection status
export const dbStatus = {
  isLive: isSupabaseConfigured(),
  provider: 'Supabase PostgreSQL'
};

// ------------------------------------------------------------------------------
// 1. AUTH & USER SERVICE (UML: AuthService, DatabaseRepository)
// ------------------------------------------------------------------------------
export const authService = {
  async signUp({ email, password, name, role = 'poster_primary' }) {
    if (!isSupabaseConfigured()) {
      return { user: { id: `usr_${Date.now()}`, email, name, role }, error: null };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role }
      }
    });

    if (error) return { user: null, error };

    // Create user record in public.users
    if (data.user) {
      await supabase.from('users').upsert({
        id: data.user.id,
        email: data.user.email,
        name: name || email.split('@')[0],
        role: role,
        verification_status: 'PENDING'
      });
    }

    return { user: data.user, error: null };
  },

  async signIn({ email, password }) {
    if (!isSupabaseConfigured()) {
      return { user: { email }, error: null };
    }
    return await supabase.auth.signInWithPassword({ email, password });
  },

  async signOut() {
    if (!isSupabaseConfigured()) return { error: null };
    return await supabase.auth.signOut();
  },

  async getAllUsers() {
    if (!isSupabaseConfigured()) return null;
    const { data, error } = await supabase
      .from('users')
      .select('*, category_ratings(*)');
    if (error) throw error;
    return data;
  },

  async getUserProfile(userId) {
    if (!isSupabaseConfigured()) return null;
    const { data, error } = await supabase
      .from('users')
      .select('*, category_ratings(*)')
      .eq('id', userId)
      .single();
    if (error) throw error;
    return data;
  }
};

// ------------------------------------------------------------------------------
// 2. GIG SERVICE (UML: GigService, MarketplaceService)
// ------------------------------------------------------------------------------
export const gigService = {
  async fetchGigs() {
    if (!isSupabaseConfigured()) return null;
    const { data, error } = await supabase
      .from('gigs')
      .select(`
        *,
        owner:users!gigs_owner_id_fkey(id, name, avatar, overall_rating, review_count, verification_status),
        bids(*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Normalise fields to match React state expectations
    return data.map(g => ({
      ...g,
      ownerId: g.owner_id,
      minimumBidFloor: Number(g.minimum_bid_floor),
      budget: Number(g.budget),
      bidsCount: g.bids?.length || g.bids_count || 0,
      bids: g.bids || []
    }));
  },

  async createGig(gigPayload) {
    if (!isSupabaseConfigured()) return null;

    const row = {
      id: gigPayload.id || `gig_${Date.now()}`,
      owner_id: gigPayload.ownerId,
      title: gigPayload.title,
      category: gigPayload.category,
      category_id: gigPayload.categoryId,
      subcategory: gigPayload.subcategory,
      subcategory_id: gigPayload.subcategoryId,
      service: gigPayload.service,
      service_id: gigPayload.serviceId,
      type: gigPayload.type || 'physical',
      location: gigPayload.location,
      travel_radius: gigPayload.travelRadius,
      budget: Number(gigPayload.budget),
      currency: gigPayload.currency || 'INR',
      minimum_bid_floor: Number(gigPayload.minimumBidFloor),
      deadline: gigPayload.deadline,
      required_workers: Number(gigPayload.requiredWorkers) || 1,
      required_skills: gigPayload.requiredSkills || [],
      description: gigPayload.description,
      status: 'OPEN',
      escrow_status: 'HELD',
      bids_count: 0
    };

    const { data, error } = await supabase.from('gigs').insert([row]).select().single();
    if (error) throw error;
    return data;
  },

  async updateGigStatus(gigId, status, extra = {}) {
    if (!isSupabaseConfigured()) return null;
    const { data, error } = await supabase
      .from('gigs')
      .update({ status, ...extra, updated_at: new Date().toISOString() })
      .eq('id', gigId)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

// ------------------------------------------------------------------------------
// 3. BIDDING SERVICE (UML: BiddingService, NegotiationService)
// ------------------------------------------------------------------------------
export const biddingService = {
  async submitBid({ gigId, bidderId, bidderName, bidderAvatar, bidderRating, categoryRating, amount, proposal, estimatedDays }) {
    if (!isSupabaseConfigured()) return null;

    const newBid = {
      id: `bid_${Date.now()}`,
      gig_id: gigId,
      bidder_id: bidderId,
      bidder_name: bidderName,
      bidder_avatar: bidderAvatar,
      bidder_rating: bidderRating,
      category_rating: categoryRating,
      amount: Number(amount),
      proposal,
      estimated_days: Number(estimatedDays) || 1,
      status: 'PENDING'
    };

    const { data, error } = await supabase.from('bids').insert([newBid]).select().single();
    if (error) throw error;

    // Increment gig bids_count
    await supabase.rpc('increment_gig_bids', { gig_id: gigId }).catch(() => {});

    return data;
  },

  async acceptBid(gigId, bidId, workerId) {
    if (!isSupabaseConfigured()) return null;

    // 1. Update accepted bid
    await supabase.from('bids').update({ status: 'ACCEPTED' }).eq('id', bidId);
    // 2. Decline other bids on this gig
    await supabase.from('bids').update({ status: 'DECLINED' }).eq('gig_id', gigId).neq('id', bidId);
    // 3. Update gig status to ASSIGNED
    const { data, error } = await supabase
      .from('gigs')
      .update({ status: 'ASSIGNED', assigned_worker_id: workerId })
      .eq('id', gigId)
      .select()
      .single();

    if (error) throw error;

    // 4. Create assignment record
    await supabase.from('assignments').insert([{
      id: `asg_${Date.now()}`,
      gig_id: gigId,
      worker_id: workerId,
      accepted_bid_id: bidId,
      status: 'IN_PROGRESS'
    }]);

    return data;
  }
};

// ------------------------------------------------------------------------------
// 4. CHAT & MESSAGE SERVICE (UML: MessageService, Realtime)
// ------------------------------------------------------------------------------
export const messageService = {
  async fetchConversations(userId) {
    if (!isSupabaseConfigured()) return null;
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        messages(*)
      `)
      .or(`participant_one.eq.${userId},participant_two.eq.${userId}`)
      .order('last_updated', { ascending: false });

    if (error) throw error;
    return data;
  },

  async sendMessage(conversationId, senderId, senderName, text) {
    if (!isSupabaseConfigured()) return null;
    const newMsg = {
      id: `msg_${Date.now()}`,
      conversation_id: conversationId,
      sender_id: senderId,
      sender_name: senderName,
      text: text.trim(),
      timestamp: new Date().toISOString()
    };

    const { data, error } = await supabase.from('messages').insert([newMsg]).select().single();
    if (error) throw error;

    // Update conversation last message
    await supabase.from('conversations').update({
      last_message: text.trim(),
      last_updated: new Date().toISOString()
    }).eq('id', conversationId);

    return data;
  },

  subscribeToMessages(conversationId, onNewMessage) {
    if (!isSupabaseConfigured()) return () => {};

    const subscription = supabase
      .channel(`chat_${conversationId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      }, (payload) => {
        onNewMessage(payload.new);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }
};

// ------------------------------------------------------------------------------
// 5. ADMIN & DISPUTE SERVICE (UML: DisputeService, RiskEvaluationEngine)
// ------------------------------------------------------------------------------
export const adminService = {
  async fetchDisputes() {
    if (!isSupabaseConfigured()) return null;
    const { data, error } = await supabase
      .from('disputes')
      .select('*')
      .order('opened_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async resolveDispute(disputeId, resolutionOutcome, adminName) {
    if (!isSupabaseConfigured()) return null;
    const resolutionText = `Resolved as: ${resolutionOutcome} by Admin ${adminName}`;
    const { data, error } = await supabase
      .from('disputes')
      .update({
        status: resolutionOutcome,
        resolution: resolutionText,
        resolved_at: new Date().toISOString()
      })
      .eq('id', disputeId)
      .select()
      .single();

    if (error) throw error;

    // Log to audit log
    await supabase.from('audit_logs').insert([{
      id: `AUD-${Date.now().toString().slice(-4)}`,
      actor_id: 'usr_admin',
      actor_name: adminName,
      action: `RESOLVED_DISPUTE (${resolutionOutcome})`,
      target: `Dispute #${disputeId}`,
      details: 'Resolution action executed by platform moderator.'
    }]);

    return data;
  },

  async fetchRiskFlags() {
    if (!isSupabaseConfigured()) return null;
    const { data, error } = await supabase.from('risk_flags').select('*');
    if (error) throw error;
    return data;
  },

  async fetchAuditLogs() {
    if (!isSupabaseConfigured()) return null;
    const { data, error } = await supabase.from('audit_logs').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }
};
