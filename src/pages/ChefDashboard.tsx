import { useState } from "react";
import { CheckCircle, XCircle, Clock, Calendar, Users, Phone, MapPin, Search } from "lucide-react";
import { useBookings, Booking } from "../context/BookingsContext";
import { CHEFS } from "../data/mockData";

export default function ChefDashboard() {
  const { getChefBookings, updateStatus, updatePrice } = useBookings();
  const [activeTab, setActiveTab] = useState<'pending' | 'countered' | 'confirmed' | 'declined'>('pending');

  // We automatically assume the logged-in chef is "chef-1" for this demo
  const MY_CHEF_ID = "chef-1";
  const myBookings = getChefBookings(MY_CHEF_ID);
  const me = CHEFS.find(c => c.id === MY_CHEF_ID);

  const filteredBookings = myBookings.filter(b => b.status === activeTab);

  const getStatusBadge = (status: Booking['status']) => {
    switch(status) {
      case 'pending': return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1"><Clock className="w-3 h-3"/> Pending</span>;
      case 'countered': return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1"><Search className="w-3 h-3"/> Countered</span>;
      case 'confirmed': return <span className="bg-brand-green/20 text-brand-green px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Confirmed</span>;
      case 'declined': return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1"><XCircle className="w-3 h-3"/> Declined</span>;
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-24">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Orders Dashboard</h1>
        <p className="text-gray-500 font-medium">Welcome back, {me?.name}. Manage your incoming event requests.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {(['pending', 'countered', 'confirmed', 'declined'] as const).map(tab => {
          const count = myBookings.filter(b => b.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 rounded-full text-sm font-bold capitalize whitespace-nowrap transition-all shadow-sm ${
                activeTab === tab
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {tab} <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === tab ? 'bg-white/20' : 'bg-gray-100'}`}>{count}</span>
            </button>
          )
        })}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-[32px] border border-gray-100 shadow-sm">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-black text-gray-900 mb-1">No {activeTab} bookings</h3>
            <p className="text-gray-500 font-medium text-sm">You're all caught up for now.</p>
          </div>
        ) : (
          filteredBookings.map(booking => (
            <div key={booking.id} className="bg-white p-6 md:p-8 rounded-[32px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-gray-100 pb-5 mb-5">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-black text-gray-900">{booking.clientName}</h3>
                    {getStatusBadge(booking.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm font-semibold text-gray-500">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4"/> {booking.date}</span>
                    <span className="flex items-center gap-1.5"><Phone className="w-4 h-4"/> {booking.phone}</span>
                  </div>
                </div>
                
                <div className="text-left md:text-right bg-brand-primary/10 rounded-2xl px-5 py-3 border border-brand-primary/20 shrink-0">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Proposed Offer</p>
                  <p className="text-brand-green font-black text-2xl">{booking.proposedPrice} MAD</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-gray-50 px-4 py-3 rounded-2xl flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <span className="block text-xs font-bold text-gray-500 uppercase">Guests</span>
                    <span className="font-bold text-gray-900">{booking.guests} People</span>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 rounded-2xl flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <span className="block text-xs font-bold text-gray-500 uppercase">Event Type</span>
                    <span className="font-bold text-gray-900">{booking.eventType}</span>
                  </div>
                </div>
              </div>

              {booking.status === 'pending' && (
                <div className="flex flex-col gap-3 pt-2">
                  <button 
                    onClick={() => updateStatus(booking.id, 'confirmed')}
                    className="w-full bg-brand-primary text-gray-900 font-bold py-3.5 rounded-2xl shadow-[0_4px_14px_rgba(255,204,0,0.4)] hover:scale-[1.01] transition-transform"
                  >
                    Accept Offer ({booking.proposedPrice} MAD)
                  </button>
                  <div className="flex gap-2">
                     <button 
                        onClick={() => updatePrice(booking.id, booking.proposedPrice + 100)}
                        className="flex-1 bg-white border border-gray-200 text-gray-900 font-bold py-3 rounded-2xl shadow-sm hover:bg-gray-50 transition-colors text-sm"
                     >
                        Counter +100
                     </button>
                     <button 
                        onClick={() => updatePrice(booking.id, booking.proposedPrice + 200)}
                        className="flex-1 bg-white border border-gray-200 text-gray-900 font-bold py-3 rounded-2xl shadow-sm hover:bg-gray-50 transition-colors text-sm"
                     >
                        Counter +200
                     </button>
                     <button 
                        onClick={() => updateStatus(booking.id, 'declined')}
                        className="w-[30%] bg-red-50 text-red-600 font-bold py-3 rounded-2xl hover:bg-red-100 transition-colors text-sm"
                     >
                        Decline
                     </button>
                  </div>
                </div>
              )}
              
              {booking.status === 'countered' && (
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 text-center">
                    <p className="text-sm font-bold text-blue-900">You countered with {booking.proposedPrice} MAD.</p>
                    <p className="text-xs font-medium text-blue-700 mt-1">Waiting for the client to accept via WhatsApp or app.</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
