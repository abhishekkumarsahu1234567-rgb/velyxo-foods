import React, { useState } from "react";
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle, 
  ChefHat, 
  Users, 
  Calendar,
  Send
} from "lucide-react";

export default function Contact() {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guestsCount, setGuestsCount] = useState("");
  const [cuisinePreference, setCuisinePreference] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate standard api contact delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Clear
      setName("");
      setEmail("");
      setPhone("");
      setEventDate("");
      setGuestsCount("");
      setCuisinePreference("");
      setMessage("");
    }, 1500);
  };

  const businessHours = [
    { days: "Monday - Friday", hours: "08:00 AM - 09:00 PM" },
    { days: "Saturday", hours: "09:00 AM - 08:00 PM" },
    { days: "Sunday / Holidays", hours: "09:00 AM - 05:00 PM" }
  ];

  return (
    <div className="bg-[#050B24] text-white py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-0 right-10 h-72 w-72 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-[#7C3AED]/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl space-y-16">
        
        {/* Header Title */}
        <div className="text-center space-y-4">
          <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">Secure Reservation</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">Book Your Premium Experience</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] mx-auto" />
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-light">
            Contact VELYXO FOODS LLP to custom plan your wedding banquet or corporate board dinner.
          </p>
        </div>

        {/* Form & Info Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Booking Form */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 shadow-xl text-left relative overflow-hidden">
            
            {isSuccess && (
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-mono text-center mb-6 flex items-center justify-center space-x-2 animate-fadeIn">
                <CheckCircle className="h-4.5 w-4.5" />
                <span>Thank you! Your booking inquiry has been logged. Our executive relationship manager will call you within 2 hours.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. David Sterling"
                    className="w-full rounded-xl glass-input py-3 px-4 text-xs sm:text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. david@apexventures.com"
                    className="w-full rounded-xl glass-input py-3 px-4 text-xs sm:text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full rounded-xl glass-input py-3 px-4 text-xs sm:text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                {/* Event Date */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Requested Event Date</label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full rounded-xl glass-input py-3 px-4 text-xs sm:text-sm text-white focus:border-[#D4AF37] focus:outline-none cursor-pointer"
                  />
                </div>

                {/* Guests Count */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Estimated Guests</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(e.target.value)}
                    placeholder="e.g. 150"
                    className="w-full rounded-xl glass-input py-3 px-4 text-xs sm:text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                {/* Cuisine Preference */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Cuisine Preference</label>
                  <input
                    type="text"
                    required
                    value={cuisinePreference}
                    onChange={(e) => setCuisinePreference(e.target.value)}
                    placeholder="e.g. Fusion Indian, Mediterranean"
                    className="w-full rounded-xl glass-input py-3 px-4 text-xs sm:text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

              </div>

              {/* Message */}
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Detailed Event Notes / Requirements</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details about the venue location, timing preference, structural layouts or any dynamic dietary restrictions."
                  className="w-full rounded-xl glass-input p-4 text-xs sm:text-sm text-white placeholder-slate-600 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] py-4 text-xs font-bold tracking-widest uppercase text-[#050B24] hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <span>Securing Booking...</span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Inquire About Booking Date</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Right Column: Contact info & Map */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 text-left">
            
            {/* Contact details */}
            <div className="space-y-6 rounded-2xl glass-card p-6 sm:p-8">
              <h3 className="font-serif text-lg font-bold text-[#D4AF37] tracking-wide border-b border-white/5 pb-3">
                Corporate Headquarters
              </h3>

              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] p-2 shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Telephone</span>
                    <a href="tel:+91804567890" className="text-sm font-bold text-white hover:text-[#D4AF37] transition-colors">
                      +91 80 4567 8912
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] p-2 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Email Inquiries</span>
                    <a href="mailto:info@velyxofoods.com" className="text-sm font-bold text-white hover:text-[#D4AF37] transition-colors">
                      reservations@velyxofoods.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] p-2 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Location Address</span>
                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                      VELYXO FOODS LLP, Level 4, Signature Towers, MG Road, Bangalore, KA, 560001, India.
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-4 pt-3 border-t border-white/5">
                  <div className="rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] p-2 shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="w-full">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">Operating Hours</span>
                    <div className="space-y-1.5">
                      {businessHours.map((bh, idx) => (
                        <div key={idx} className="flex justify-between text-xs font-light text-slate-300">
                          <span>{bh.days}</span>
                          <span className="font-mono text-[#D4AF37]">{bh.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Embedded Google Map Style Frame */}
            <div className="rounded-2xl border border-white/5 overflow-hidden h-64 bg-slate-900 shadow-xl relative group">
              {/* Map embed using OpenStreetMap Leaflet standard iframe */}
              <iframe
                title="Velyxo Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9261075677864!2d77.5921863!3d12.9763784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1672f12f0e3f%3A0xe542bb1a0d7d94e6!2sMG%20Road%20Metro%20Station!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 grayscale invert opacity-75 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-500"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 rounded-lg bg-black/80 backdrop-blur-sm p-2 text-[10px] font-mono text-slate-400 border border-white/10">
                📌 MG Road Signature Towers, Bangalore
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
