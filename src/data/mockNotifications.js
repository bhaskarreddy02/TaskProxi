// Mock Notifications per SRS FR29
// Localized with Indian names and INR currency

export const initialMockNotifications = [
  {
    id: "notif_01",
    userId: "usr_sarah",
    type: "BID_RECEIVED",
    title: "New Bid on Emergency Pipe Leak Repair",
    description: "Rajesh Kumar submitted a bid of ₹2,200 with 1 day completion estimate.",
    link: "/gigs/gig_101",
    timestamp: "2026-09-17T10:15:00Z",
    read: false,
    icon: "BadgeDollarSign"
  },
  {
    id: "notif_02",
    userId: "usr_sarah",
    type: "WORK_SUBMITTED",
    title: "Work Submitted for Review",
    description: "Ananya Iyer submitted work for 'React + Tailwind Analytics Dashboard Redesign'.",
    link: "/dashboard",
    timestamp: "2026-09-17T09:45:00Z",
    read: false,
    icon: "CheckCircle2"
  },
  {
    id: "notif_03",
    userId: "usr_sarah",
    type: "ESCROW_FUNDED",
    title: "Simulated Escrow Secured",
    description: "Funds of ₹18,000 are safely held in escrow for 'Craft Mixologist for 60-Person Autumn Wedding Reception'.",
    link: "/gigs/gig_104",
    timestamp: "2026-09-16T11:05:00Z",
    read: true,
    icon: "ShieldCheck"
  },
  {
    id: "notif_04",
    userId: "usr_sarah",
    type: "MESSAGE_RECEIVED",
    title: "New Message from Rajesh Kumar",
    description: "'I will arrive tomorrow morning right at 9:00 AM with the compression valves and Teflon tape.'",
    link: "/messages",
    timestamp: "2026-09-17T10:45:00Z",
    read: false,
    icon: "MessageSquare"
  },
  {
    id: "notif_05",
    userId: "usr_david",
    type: "BID_ACCEPTED",
    title: "Bid Accepted!",
    description: "Your bid of ₹2,200 was accepted for Emergency Pipe Leak Repair. Escrow is held.",
    link: "/dashboard",
    timestamp: "2026-09-17T11:30:00Z",
    read: false,
    icon: "Trophy"
  },
  {
    id: "notif_06",
    userId: "usr_carlos",
    type: "PAYMENT_RELEASED",
    title: "Payment Released: ₹3,200",
    description: "Pooja Reddy approved your work on Wall-Mounted Bookshelf Installation.",
    link: "/dashboard",
    timestamp: "2026-09-12T16:00:00Z",
    read: true,
    icon: "IndianRupee"
  },
  {
    id: "notif_07",
    userId: "usr_david",
    type: "DISPUTE_UPDATE",
    title: "Dispute Under Admin Review",
    description: "Dispute #DSP-409 regarding Commercial Espresso Bar Repair is being investigated by Admin Arjun Verma.",
    link: "/dashboard",
    timestamp: "2026-09-15T08:00:00Z",
    read: true,
    icon: "AlertTriangle"
  },
  {
    id: "notif_08",
    userId: "usr_sarah",
    type: "REVIEW_REQUEST",
    title: "Please review Rohan Patel",
    description: "Share your experience working on Wall-Mounted Bookshelf Installation.",
    link: "/profile/usr_carlos",
    timestamp: "2026-09-12T16:30:00Z",
    read: true,
    icon: "Star"
  }
];
