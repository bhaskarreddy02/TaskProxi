import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import UserAvatar from '../components/common/UserAvatar';
import { timeAgo } from '../lib/utils';
import {
  Send,
  Paperclip,
  Search,
  ArrowLeft,
  Briefcase,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function MessagesPage() {
  const { conversations, currentUser, sendMessage } = useMarketplace();
  const [selectedConvId, setSelectedConvId] = useState(conversations[0]?.id || null);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileChatView, setMobileChatView] = useState(false);

  const selectedConv = conversations.find(c => c.id === selectedConvId) || conversations[0];

  const handleSend = (e) => {
    e.preventDefault();
    if (inputText.trim() && selectedConv) {
      sendMessage(selectedConv.id, inputText);
      setInputText('');
    }
  };

  const filteredConversations = conversations.filter(c => {
    const q = searchQuery.toLowerCase();
    return c.otherUser?.name?.toLowerCase().includes(q) || c.gigTitle?.toLowerCase().includes(q);
  });

  return (
    <div className="w-full bg-slate-50/50 py-6 min-h-[calc(100vh-4rem)]">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto h-[80vh] flex flex-col">
        
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Gig-Linked Messaging
            </h1>
            <p className="text-xs text-slate-500">
              One-to-one contextual communication linked directly to gig agreements.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4" />
            <span>Messages Logged for Dispute Evidence</span>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden flex">
          
          {/* Conversation List */}
          <div className={`w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col ${mobileChatView ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-3.5 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {filteredConversations.map(conv => {
                const isSelected = conv.id === selectedConv?.id;
                return (
                  <div
                    key={conv.id}
                    onClick={() => {
                      setSelectedConvId(conv.id);
                      setMobileChatView(true);
                    }}
                    className={`p-4 cursor-pointer transition-colors flex items-start gap-3 ${
                      isSelected
                        ? "bg-brand-50/70 border-l-4 border-l-brand-600"
                        : "hover:bg-slate-50/80"
                    }`}
                  >
                    <UserAvatar user={conv.otherUser} size="md" />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {conv.otherUser?.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 flex-shrink-0">
                          {timeAgo(conv.lastUpdated)}
                        </span>
                      </div>

                      <span className="inline-block text-[10px] font-semibold text-brand-700 bg-brand-50/80 px-1.5 py-0.5 rounded truncate max-w-[200px] mt-0.5">
                        {conv.gigTitle}
                      </span>

                      <p className="text-xs text-slate-500 truncate mt-1">
                        {conv.lastMessage}
                      </p>
                    </div>

                    {conv.unreadCount > 0 && (
                      <span className="w-2 h-2 rounded-full bg-brand-600 flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Chat Window */}
          <div className={`flex-1 flex flex-col ${!mobileChatView ? 'hidden md:flex' : 'flex'}`}>
            {selectedConv ? (
              <>
                <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/40">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setMobileChatView(false)}
                      className="md:hidden p-1 rounded-lg text-slate-500 hover:bg-slate-100 mr-1"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>

                    <UserAvatar user={selectedConv.otherUser} size="md" />

                    <div>
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                        {selectedConv.otherUser?.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                        <span>{selectedConv.otherUser?.role}</span>
                        <span>&bull;</span>
                        <Link
                          to={`/gigs/${selectedConv.gigId}`}
                          className="text-brand-600 hover:underline flex items-center gap-0.5 font-medium truncate max-w-xs"
                        >
                          {selectedConv.gigTitle}
                          <ExternalLink className="w-2.5 h-2.5" />
                        </Link>
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/gigs/${selectedConv.gigId}`}
                    className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-brand-600" />
                    <span>View Agreement</span>
                  </Link>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/20">
                  <div className="text-center my-2">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-200">
                      Chat securely on TaskProxi
                    </span>
                  </div>

                  {selectedConv.messages?.map((msg) => {
                    const isMe = msg.senderId === currentUser.id;
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                            isMe
                              ? 'bg-brand-600 text-white rounded-br-none shadow-xs'
                              : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 px-1">
                          {timeAgo(msg.timestamp)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3.5 border-t border-slate-200 bg-white">
                  <form onSubmit={handleSend} className="flex items-center gap-2">
                    <button
                      type="button"
                      title="Attach sample or invoice"
                      className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type a message or discuss scheduling..."
                      className="flex-1 px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-brand-500"
                    />
                    <button
                      type="submit"
                      disabled={!inputText.trim()}
                      className="p-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-xs text-slate-400">
                Select a conversation to start chatting.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
