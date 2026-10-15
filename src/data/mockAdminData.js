// Admin and Trust & Safety Data per SRS FR36-FR40

export const mockAdminStats = {
  activeUsers: 3482,
  totalGigsLive: 124,
  simulatedEscrowHeld: 48950,
  disputesOpenCount: 3,
  riskFlagsQueue: 5,
  completedGigsMonthly: 412,
  totalPlatformVolume: 182400
};

export const mockDisputes = [
  {
    id: "DSP-409",
    gigId: "gig_114",
    gigTitle: "Commercial Espresso Bar Machine Repair",
    raisedBy: "usr_david",
    raisedByName: "David Miller",
    respondentId: "usr_carlos",
    respondentName: "Carlos Rivera",
    amount: 500,
    status: "UNDER_REVIEW", // UNDER_REVIEW, RESOLVED_WORKER, RESOLVED_POSTER, PARTIAL_SPLIT
    reason: "Incomplete boiler valve seal leading to intermittent pressure loss.",
    evidenceCount: 3,
    evidence: [
      { name: "pressure_gauge_video.mp4", type: "video", size: "12.4 MB" },
      { name: "invoice_gaskets.pdf", type: "pdf", size: "410 KB" },
      { name: "chat_agreement_transcript.txt", type: "text", size: "45 KB" }
    ],
    openedAt: "2026-09-14T09:12:00Z"
  },
  {
    id: "DSP-408",
    gigId: "gig_hist_09",
    gigTitle: "Custom Shopify Theme Extension",
    raisedBy: "usr_client_99",
    raisedByName: "Nordic Goods Co.",
    respondentId: "usr_elena",
    respondentName: "Elena Rostova",
    amount: 950,
    status: "RESOLVED_WORKER",
    reason: "Deliverable scope disagreement after feature sign-off.",
    evidenceCount: 2,
    evidence: [
      { name: "git_commit_log.png", type: "image", size: "850 KB" }
    ],
    openedAt: "2026-09-02T11:00:00Z",
    resolution: "Resolved in favor of Worker: Commit log verified deliverable matched initial specification."
  }
];

export const mockRiskFlags = [
  {
    id: "RSK-812",
    targetType: "GIG",
    targetId: "gig_991",
    targetTitle: "Post 500 Fake App Reviews for $50",
    riskLevel: "HIGH", // HIGH, MEDIUM, LOW
    flagReason: "Terms of Service Violation: Collusive / Fake Reviews Scheme",
    flaggedAt: "2026-09-17T04:20:00Z",
    status: "PENDING_REVIEW"
  },
  {
    id: "RSK-811",
    targetType: "USER",
    targetId: "usr_sketchy_4",
    targetTitle: "User @quickcash_pro",
    riskLevel: "HIGH",
    flagReason: "Potential Collusive Bidding: Identical IP & fast reciprocal reviews detected.",
    flaggedAt: "2026-09-16T22:15:00Z",
    status: "PENDING_REVIEW"
  },
  {
    id: "RSK-810",
    targetType: "GIG",
    targetId: "gig_988",
    targetTitle: "Urgent Wire Transfer Assistance",
    riskLevel: "HIGH",
    flagReason: "Off-platform payment attempt / potential shadow injection",
    flaggedAt: "2026-09-16T18:00:00Z",
    status: "RESOLVED"
  }
];

export const mockAuditLogs = [
  {
    id: "AUD-991",
    actor: "Alex Vance (Admin)",
    action: "FROZE_ESCROW",
    target: "Gig #gig_114 (Commercial Espresso Bar Repair)",
    details: "Automated payment freeze applied due to active dispute DSP-409.",
    timestamp: "2026-09-14T09:15:00Z"
  },
  {
    id: "AUD-990",
    actor: "Alex Vance (Admin)",
    action: "SUSPENDED_ACCOUNT",
    target: "User #usr_sketchy_2",
    details: "Suspended for repeated sub-floor bidding bot activity.",
    timestamp: "2026-09-13T14:40:00Z"
  },
  {
    id: "AUD-989",
    actor: "System Engine",
    action: "ENFORCED_BID_FLOOR",
    target: "Gig #gig_101",
    details: "Rejected bid of $120 (below minimum 80% threshold $176).",
    timestamp: "2026-09-17T10:10:00Z"
  },
  {
    id: "AUD-988",
    actor: "Alex Vance (Admin)",
    action: "TAXONOMY_ADDED",
    target: "Category: Events & Hospitality",
    details: "Added new subcategory 'Event Media & Logistics' -> 'AV Setup'.",
    timestamp: "2026-09-11T16:20:00Z"
  }
];
