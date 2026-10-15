// Gig-linked conversations per SRS FR28

export const initialMockConversations = [
  {
    id: "conv_101",
    gigId: "gig_101",
    gigTitle: "Emergency Pipe Leak Repair under Kitchen Sink",
    participantA: "usr_sarah",
    participantB: "usr_david",
    otherUser: {
      id: "usr_david",
      name: "David Miller",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      role: "Plumber / Contractor",
      verified: true,
      rating: 4.97
    },
    lastMessage: "I will arrive tomorrow morning right at 9:00 AM with the compression valves.",
    lastUpdated: "2026-09-17T10:45:00Z",
    unreadCount: 1,
    messages: [
      {
        id: "msg_1",
        senderId: "usr_sarah",
        senderName: "Sarah Connor",
        text: "Hi David, thanks for the bid! Is the leak at the valve or the PEX join easy to replace without shutting off the main house valve for more than an hour?",
        timestamp: "2026-09-17T10:20:00Z"
      },
      {
        id: "msg_2",
        senderId: "usr_david",
        senderName: "David Miller",
        text: "Hello Sarah! Absolutely. I'll isolate just the under-sink shutoff valve. It will take around 25 minutes total.",
        timestamp: "2026-09-17T10:32:00Z"
      },
      {
        id: "msg_3",
        senderId: "usr_david",
        senderName: "David Miller",
        text: "I will arrive tomorrow morning right at 9:00 AM with the compression valves.",
        timestamp: "2026-09-17T10:45:00Z"
      }
    ]
  },
  {
    id: "conv_103",
    gigId: "gig_103",
    gigTitle: "React + Tailwind Analytics Dashboard Redesign",
    participantA: "usr_sarah",
    participantB: "usr_elena",
    otherUser: {
      id: "usr_elena",
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      role: "Frontend Engineer",
      verified: true,
      rating: 5.0
    },
    lastMessage: "Reviewed your Figma design tokens. The color scheme looks super crisp!",
    lastUpdated: "2026-09-17T09:40:00Z",
    unreadCount: 0,
    messages: [
      {
        id: "msg_4",
        senderId: "usr_elena",
        senderName: "Elena Rostova",
        text: "Hi Sarah! I saw your post for the Analytics Dashboard. I have built similar systems using Tailwind and Recharts. Do you have a Figma file already prepared?",
        timestamp: "2026-09-17T09:20:00Z"
      },
      {
        id: "msg_5",
        senderId: "usr_sarah",
        senderName: "Sarah Connor",
        text: "Hi Elena! Yes, our product designer finished the auto-layout frames yesterday. I can grant you edit access once we finalize the bid.",
        timestamp: "2026-09-17T09:35:00Z"
      },
      {
        id: "msg_6",
        senderId: "usr_elena",
        senderName: "Elena Rostova",
        text: "Reviewed your Figma design tokens. The color scheme looks super crisp!",
        timestamp: "2026-09-17T09:40:00Z"
      }
    ]
  },
  {
    id: "conv_104",
    gigId: "gig_104",
    gigTitle: "Craft Mixologist for 60-Person Autumn Wedding Reception",
    participantA: "usr_sarah",
    participantB: "usr_marcus",
    otherUser: {
      id: "usr_marcus",
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      role: "Craft Bartender",
      verified: true,
      rating: 4.95
    },
    lastMessage: "I have prepared the draft cocktail shopping list for the cider bourbon smash.",
    lastUpdated: "2026-09-16T15:20:00Z",
    unreadCount: 0,
    messages: [
      {
        id: "msg_7",
        senderId: "usr_sarah",
        senderName: "Sarah Connor",
        text: "Marcus, so glad to have you assigned for the reception. Could you send the ingredients list for the signature drinks?",
        timestamp: "2026-09-16T14:10:00Z"
      },
      {
        id: "msg_8",
        senderId: "usr_marcus",
        senderName: "Marcus Vance",
        text: "I have prepared the draft cocktail shopping list for the cider bourbon smash.",
        timestamp: "2026-09-16T15:20:00Z"
      }
    ]
  }
];
