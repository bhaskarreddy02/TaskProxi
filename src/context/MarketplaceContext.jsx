import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialMockGigs } from '../data/mockGigs';
import { mockUsers } from '../data/mockUsers';
import { initialMockNotifications } from '../data/mockNotifications';
import { initialMockConversations } from '../data/mockMessages';
import { mockDisputes, mockRiskFlags, mockAuditLogs, mockAdminStats } from '../data/mockAdminData';
import { mockCategories } from '../data/mockCategories';
import { isSupabaseConfigured } from '../lib/supabaseClient';
import { gigService, biddingService, messageService, adminService } from '../services/dbServices';

const MarketplaceContext = createContext();

export function MarketplaceProvider({ children }) {
  const isDbLive = isSupabaseConfigured();

  // 0. Auto-flush old cached mock storage (e.g. old US/dollar cache)
  const DATA_VERSION = 'tp_v3_inr_localized';
  if (typeof window !== 'undefined') {
    try {
      if (localStorage.getItem('tp_version') !== DATA_VERSION) {
        localStorage.removeItem('tp_gigs');
        localStorage.removeItem('tp_current_user');
        localStorage.removeItem('tp_notifications');
        localStorage.removeItem('tp_conversations');
        localStorage.removeItem('tp_saved_gigs');
        localStorage.setItem('tp_version', DATA_VERSION);
      }
    } catch (e) {
      // ignore
    }
  }

  // 1. Active Persona
  const [currentUserId, setCurrentUserId] = useState(() => {
    return localStorage.getItem('tp_current_user') || 'usr_pooja';
  });

  const currentUser = mockUsers.find(u => u.id === currentUserId) || mockUsers[0];

  // 2. Gigs State
  const [gigs, setGigs] = useState(() => {
    const saved = localStorage.getItem('tp_gigs');
    return saved ? JSON.parse(saved) : initialMockGigs;
  });

  // 3. Saved / Bookmarked Gigs
  const [savedGigIds, setSavedGigIds] = useState(() => {
    const saved = localStorage.getItem('tp_saved_gigs');
    return saved ? JSON.parse(saved) : ['gig_102', 'gig_103'];
  });

  // 4. Notifications
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('tp_notifications');
    return saved ? JSON.parse(saved) : initialMockNotifications;
  });

  // 5. Conversations & Messages
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('tp_conversations');
    return saved ? JSON.parse(saved) : initialMockConversations;
  });

  // 6. Admin State
  const [disputes, setDisputes] = useState(mockDisputes);
  const [riskFlags, setRiskFlags] = useState(mockRiskFlags);
  const [auditLogs, setAuditLogs] = useState(mockAuditLogs);
  const [categories, setCategories] = useState(mockCategories);

  // Sync initial live data if Supabase is connected
  useEffect(() => {
    if (!isDbLive) return;

    let isMounted = true;
    async function loadLiveData() {
      try {
        const liveGigs = await gigService.fetchGigs();
        if (liveGigs && liveGigs.length > 0 && isMounted) {
          setGigs(liveGigs);
        }

        const liveDisputes = await adminService.fetchDisputes();
        if (liveDisputes && liveDisputes.length > 0 && isMounted) {
          setDisputes(liveDisputes);
        }

        const liveFlags = await adminService.fetchRiskFlags();
        if (liveFlags && liveFlags.length > 0 && isMounted) {
          setRiskFlags(liveFlags);
        }

        const liveLogs = await adminService.fetchAuditLogs();
        if (liveLogs && liveLogs.length > 0 && isMounted) {
          setAuditLogs(liveLogs);
        }
      } catch (err) {
        console.warn('Supabase sync notice: Falling back to local/cached state', err);
      }
    }

    loadLiveData();
    return () => { isMounted = false; };
  }, [isDbLive]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('tp_current_user', currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem('tp_gigs', JSON.stringify(gigs));
  }, [gigs]);

  useEffect(() => {
    localStorage.setItem('tp_saved_gigs', JSON.stringify(savedGigIds));
  }, [savedGigIds]);

  useEffect(() => {
    localStorage.setItem('tp_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('tp_conversations', JSON.stringify(conversations));
  }, [conversations]);

  // Actions
  const switchUser = (userId) => {
    setCurrentUserId(userId);
  };

  const toggleSaveGig = (gigId) => {
    setSavedGigIds(prev => 
      prev.includes(gigId) ? prev.filter(id => id !== gigId) : [...prev, gigId]
    );
  };

  const isGigSaved = (gigId) => savedGigIds.includes(gigId);

  // Post a Gig
  const createGig = async (newGig) => {
    const created = {
      ...newGig,
      id: `gig_${Date.now()}`,
      ownerId: currentUser.id,
      owner: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        rating: currentUser.overallRating,
        reviewsCount: currentUser.reviewCount,
        verified: currentUser.verified
      },
      status: "OPEN",
      escrowStatus: "HELD",
      createdAt: new Date().toISOString(),
      bidsCount: 0,
      bids: [],
      minimumBidFloor: Math.round(Number(newGig.budget) * 0.80)
    };

    // Optimistic UI update
    setGigs(prev => [created, ...prev]);

    // Push to Supabase if live
    if (isDbLive) {
      try {
        await gigService.createGig(created);
      } catch (err) {
        console.error("Failed to sync gig to Supabase:", err);
      }
    }

    // Add notification
    const notif = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
      type: "GIG_PUBLISHED",
      title: "Gig Successfully Published",
      description: `Your gig "${created.title}" is now open for bids.`,
      link: `/gigs/${created.id}`,
      timestamp: new Date().toISOString(),
      read: false,
      icon: "CheckCircle2"
    };
    setNotifications(prev => [notif, ...prev]);

    return created;
  };

  // Submit Bid
  const submitBid = async (gigId, bidData) => {
    const gig = gigs.find(g => g.id === gigId);
    if (!gig) throw new Error("Gig not found");

    const amount = Number(bidData.amount);
    const minFloor = gig.minimumBidFloor || Math.round(gig.budget * 0.8);

    if (amount < minFloor) {
      throw new Error(`Bid amount must be at least $${minFloor} (80% of budget) to satisfy fair-wage platform policy.`);
    }

    const newBid = {
      id: `bid_${Date.now()}`,
      bidderId: currentUser.id,
      bidderName: currentUser.name,
      bidderAvatar: currentUser.avatar,
      bidderRating: currentUser.overallRating,
      categoryRating: currentUser.categoryRatings?.[0]?.rating || 4.9,
      amount: amount,
      proposal: bidData.proposal,
      estimatedDays: Number(bidData.estimatedDays) || 2,
      status: "PENDING",
      submittedAt: new Date().toISOString()
    };

    // Optimistic UI update
    setGigs(prev => prev.map(g => {
      if (g.id === gigId) {
        return {
          ...g,
          bidsCount: (g.bidsCount || 0) + 1,
          bids: [newBid, ...(g.bids || [])]
        };
      }
      return g;
    }));

    // Push to Supabase if live
    if (isDbLive) {
      try {
        await biddingService.submitBid({
          gigId,
          bidderId: currentUser.id,
          bidderName: currentUser.name,
          bidderAvatar: currentUser.avatar,
          bidderRating: currentUser.overallRating,
          categoryRating: newBid.categoryRating,
          amount,
          proposal: bidData.proposal,
          estimatedDays: newBid.estimatedDays
        });
      } catch (err) {
        console.error("Failed to sync bid to Supabase:", err);
      }
    }

    // Notify Gig Owner
    const notif = {
      id: `notif_${Date.now()}`,
      userId: gig.ownerId,
      type: "BID_RECEIVED",
      title: `New Bid on ${gig.title}`,
      description: `${currentUser.name} submitted a bid of $${amount}.`,
      link: `/gigs/${gigId}`,
      timestamp: new Date().toISOString(),
      read: false,
      icon: "BadgeDollarSign"
    };
    setNotifications(prev => [notif, ...prev]);

    return newBid;
  };

  // Accept Bid
  const acceptBid = async (gigId, bidId) => {
    let assignedWorkerId = null;

    setGigs(prev => prev.map(g => {
      if (g.id === gigId) {
        const acceptedBid = g.bids?.find(b => b.id === bidId);
        assignedWorkerId = acceptedBid ? acceptedBid.bidderId : null;
        return {
          ...g,
          status: "ASSIGNED",
          assignedWorkerId,
          assignedWorker: acceptedBid ? {
            id: acceptedBid.bidderId,
            name: acceptedBid.bidderName,
            avatar: acceptedBid.bidderAvatar,
            rating: acceptedBid.bidderRating
          } : null,
          bids: g.bids?.map(b => b.id === bidId ? { ...b, status: "ACCEPTED" } : { ...b, status: "DECLINED" })
        };
      }
      return g;
    }));

    if (isDbLive && assignedWorkerId) {
      try {
        await biddingService.acceptBid(gigId, bidId, assignedWorkerId);
      } catch (err) {
        console.error("Failed to sync accepted bid to Supabase:", err);
      }
    }
  };

  // Submit Work
  const submitWork = (gigId) => {
    setGigs(prev => prev.map(g => {
      if (g.id === gigId) {
        return { ...g, status: "SUBMITTED" };
      }
      return g;
    }));

    if (isDbLive) {
      gigService.updateGigStatus(gigId, 'SUBMITTED').catch(console.error);
    }
  };

  // Approve Work & Release Escrow
  const approveWork = (gigId) => {
    setGigs(prev => prev.map(g => {
      if (g.id === gigId) {
        return { ...g, status: "COMPLETED", escrowStatus: "RELEASED" };
      }
      return g;
    }));

    if (isDbLive) {
      gigService.updateGigStatus(gigId, 'COMPLETED', { escrow_status: 'RELEASED' }).catch(console.error);
    }
  };

  // Messages
  const sendMessage = async (conversationId, text) => {
    if (!text.trim()) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: text.trim(),
      timestamp: new Date().toISOString()
    };

    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastMessage: text.trim(),
          lastUpdated: new Date().toISOString(),
          messages: [...(c.messages || []), newMsg]
        };
      }
      return c;
    }));

    if (isDbLive) {
      try {
        await messageService.sendMessage(conversationId, currentUser.id, currentUser.name, text);
      } catch (err) {
        console.error("Failed to sync message to Supabase:", err);
      }
    }
  };

  // Notification read
  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Admin Dispute Resolution
  const resolveDispute = async (disputeId, resolutionOutcome) => {
    setDisputes(prev => prev.map(d => {
      if (d.id === disputeId) {
        return {
          ...d,
          status: resolutionOutcome,
          resolution: `Resolved as: ${resolutionOutcome} by Admin ${currentUser.name}`
        };
      }
      return d;
    }));

    // Record in Audit Log
    const newLog = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      actor: currentUser.name,
      action: `RESOLVED_DISPUTE (${resolutionOutcome})`,
      target: `Dispute #${disputeId}`,
      details: `Resolution action executed by platform moderator.`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);

    if (isDbLive) {
      try {
        await adminService.resolveDispute(disputeId, resolutionOutcome, currentUser.name);
      } catch (err) {
        console.error("Failed to sync dispute resolution to Supabase:", err);
      }
    }
  };

  const dismissRiskFlag = (flagId) => {
    setRiskFlags(prev => prev.map(f => f.id === flagId ? { ...f, status: "RESOLVED" } : f));
  };

  return (
    <MarketplaceContext.Provider
      value={{
        currentUser,
        currentUserId,
        switchUser,
        allUsers: mockUsers,
        gigs,
        savedGigIds,
        isGigSaved,
        toggleSaveGig,
        createGig,
        submitBid,
        acceptBid,
        submitWork,
        approveWork,
        notifications,
        unreadNotificationsCount: notifications.filter(n => !n.read).length,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        conversations,
        sendMessage,
        disputes,
        resolveDispute,
        riskFlags,
        dismissRiskFlag,
        auditLogs,
        adminStats: mockAdminStats,
        categories,
        isDatabaseConnected: isDbLive
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
