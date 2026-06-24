import React, { useState } from "react";
import { Sparkles, Image, Check, Star, Filter } from "lucide-react";

export default function Portfolio() {
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Corporate Events", "Weddings", "Product Launches"];

  const galleryItems = [
    {
      id: "gal-1",
      title: "Google AI Summit Banquet",
      category: "Corporate Events",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800",
      description: "Served 450 executives with organic local greens, custom sushi counters, and customized plant-based courses.",
      client: "Google India",
      date: "May 2026",
      success: "100% guest satisfaction score on F&B logistics."
    },
    {
      id: "gal-2",
      title: "The Royal Udaipur Reception",
      category: "Weddings",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800",
      description: "A grand destination wedding featuring luxury gold theme setups, live truffle pasta, and molecular cocktail bars.",
      client: "Singhania & Roy",
      date: "Feb 2026",
      success: "Voted as best catering showcase in Udaipur Luxury Banquets."
    },
    {
      id: "gal-3",
      title: "Mercedes AMG Launch",
      category: "Product Launches",
      image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=800",
      description: "Edible carbon food art paired with custom champagne molecular recipes matching the high-tech AMG launch theme.",
      client: "Mercedes-Benz India",
      date: "April 2026",
      success: "Unique dessert sphere highlight posted by 80+ elite creators."
    },
    {
      id: "gal-4",
      title: "Annual Leadership Gala Dinner",
      category: "Corporate Events",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
      description: "An intimate 5-course plated dinner for board delegates, with curated wine and traditional high-end pairings.",
      client: "Apex Venture Capital",
      date: "March 2026",
      success: "Re-booked VELYXO FOODS for their complete Q3 leadership boards."
    },
    {
      id: "gal-5",
      title: "The Pastel Meadows Wedding",
      category: "Weddings",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800",
      description: "Bespoke high-tea gardens setup with premium floral accents, organic cold-pressed mocktails, and traditional delicacies.",
      client: "Goel & Sharma",
      date: "Jan 2026",
      success: "Beautiful visual coverage featured in WeddingSutra Luxury Caterers."
    },
    {
      id: "gal-6",
      title: "OnePlus Premium Store Launch",
      category: "Product Launches",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800",
      description: "A highly interactive, color-coded food art experience designed in red and black colors mapping OnePlus signature brand aesthetics.",
      client: "OnePlus India",
      date: "June 2026",
      success: "Over 800+ VIP visitors served with seamless, continuous hand-passed gourmet appetizers."
    }
  ];

  const filteredItems = filter === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="bg-[#050B24] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-16">
        
        {/* Header Title */}
        <div className="text-center space-y-4">
          <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">The Velyxo Showcase</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">Our Event Portfolio</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] mx-auto" />
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-light">
            An elegant overview of our premier catering operations, elite corporate partnerships, and grand receptions.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 max-w-xl mx-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-5 py-2.5 text-xs font-mono tracking-wider uppercase border transition-all duration-300 ${
                filter === cat
                  ? "bg-[#D4AF37] text-[#050B24] border-[#D4AF37] font-bold shadow-lg shadow-[#D4AF37]/20"
                  : "bg-white/5 border-slate-700 hover:border-[#D4AF37]/50 text-slate-300 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="group relative rounded-2xl glass-card glass-card-hover overflow-hidden flex flex-col h-full"
            >
              {/* Image Frame */}
              <div className="h-72 w-full overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09102c]/90 via-[#09102c]/20 to-transparent pointer-events-none" />
                
                {/* Category Floater */}
                <div className="absolute top-4 left-4 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-mono tracking-wider uppercase text-[#D4AF37] border border-[#D4AF37]/20">
                  {item.category}
                </div>
              </div>

              {/* Text / Details */}
              <div className="p-6 flex-grow flex flex-col justify-between text-left space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-mono tracking-wider text-[#D4AF37]">
                    <span>Client: {item.client}</span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Success Highlight */}
                <div className="pt-4 border-t border-white/5 space-y-1 bg-[#D4AF37]/2 p-3 rounded-xl border border-[#D4AF37]/10 text-left">
                  <div className="flex items-center space-x-1 text-[10px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase">
                    <Star className="h-3 w-3 fill-[#D4AF37]" />
                    <span>Client Success Metric</span>
                  </div>
                  <p className="text-slate-300 text-[11px] font-light">
                    {item.success}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
