// Gig-linked conversations per SRS FR28
// Localized with Indian names and context

export const initialMockConversations = [
  {
    id: "conv_101",
    gigId: "gig_101",
    gigTitle: "Emergency Pipe Leak Repair under Kitchen Sink",
    participantA: "usr_pooja",
    participantB: "usr_rajesh",
    otherUser: {
      id: "usr_rajesh",
      name: "Rajesh Kumar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      role: "Plumber / Contractor",
      verified: true,
      rating: 4.97
    },
    lastMessage: "I will arrive tomorrow morning right at 9:00 AM with the compression valves and Teflon tape.",
    lastUpdated: "2026-09-17T10:45:00Z",
    unreadCount: 1,
    messages: [
      {
        id: "msg_1",
        senderId: "usr_pooja",
        senderName: "Pooja Reddy",
        text: "Hi Rajesh, thanks for the bid! Is the leak at the valve or the CPVC join easy to replace without shutting off the main water valve for more than an hour?",
        timestamp: "2026-09-17T10:20:00Z"
      },
      {
        id: "msg_2",
        senderId: "usr_rajesh",
        senderName: "Rajesh Kumar",
        text: "Namaste Pooja ji! Absolutely. I'll isolate just the under-sink shutoff valve. It will take around 25 minutes total.",
        timestamp: "2026-09-17T10:32:00Z"
      },
      {
        id: "msg_3",
        senderId: "usr_rajesh",
        senderName: "Rajesh Kumar",
        text: "I will arrive tomorrow morning right at 9:00 AM with the compression valves and Teflon tape.",
        timestamp: "2026-09-17T10:45:00Z"
      }
    ]
  },
  {
    id: "conv_103",
    gigId: "gig_103",
    gigTitle: "React + Tailwind Analytics Dashboard Redesign",
    participantA: "usr_pooja",
    participantB: "usr_ananya",
    otherUser: {
      id: "usr_ananya",
      name: "Ananya Iyer",
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
        senderId: "usr_ananya",
        senderName: "Ananya Iyer",
        text: "Hi Pooja! I saw your post for the Analytics Dashboard. I have built similar systems using Tailwind and Recharts. Do you have a Figma file already prepared?",
        timestamp: "2026-09-17T09:20:00Z"
      },
      {
        id: "msg_5",
        senderId: "usr_pooja",
        senderName: "Pooja Reddy",
        text: "Hi Ananya! Yes, our product designer finished the auto-layout frames yesterday. I can grant you edit access once we finalize the bid.",
        timestamp: "2026-09-17T09:35:00Z"
      },
      {
        id: "msg_6",
        senderId: "usr_ananya",
        senderName: "Ananya Iyer",
        text: "Reviewed your Figma design tokens. The color scheme looks super crisp!",
        timestamp: "2026-09-17T09:40:00Z"
      }
    ]
  },
  {
    id: "conv_104",
    gigId: "gig_104",
    gigTitle: "Craft Mixologist for 60-Person Autumn Wedding Reception",
    participantA: "usr_pooja",
    participantB: "usr_vikram",
    otherUser: {
      id: "usr_vikram",
      name: "Vikramaditya Singh",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      role: "Craft Hospitality Specialist",
      verified: true,
      rating: 4.95
    },
    lastMessage: "I have prepared the draft beverage menu and ingredient shopping list.",
    lastUpdated: "2026-09-16T15:20:00Z",
    unreadCount: 0,
    messages: [
      {
        id: "msg_7",
        senderId: "usr_pooja",
        senderName: "Pooja Reddy",
        text: "Vikram, so glad to have you assigned for the reception in Koramangala. Could you send the ingredients list for the signature mocktails?",
        timestamp: "2026-09-16T14:10:00Z"
      },
      {
        id: "msg_8",
        senderId: "usr_vikram",
        senderName: "Vikramaditya Singh",
        text: "I have prepared the draft beverage menu and ingredient shopping list.",
        timestamp: "2026-09-16T15:20:00Z"
      }
    ]
  }
];
