import React, { useState } from "react";
import { Sparkles, X, ZoomIn, ChevronLeft, ChevronRight, Eye } from "lucide-react";

export default function KitchenGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Kitchen Setup", "Food Preparation", "Chef Team", "Finished Dishes", "Event Setup"];

  const items = [
    {
      id: 1,
      category: "Kitchen Setup",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800",
      title: "CENTRAL SMART KITCHEN",
      desc: "Our fully FSSAI-certified central culinary laboratory featuring advanced air-filtration systems and induction ranges."
    },
    {
      id: 2,
      category: "Food Preparation",
      image: "https://images.unsplash.com/photo-1577308847061-1572229226b6?q=80&w=800",
      title: "PRECISION CHOPPING & SANITIZE",
      desc: "Organic fresh vegetables are triple-sanitized in custom ozone washers before cold chopping."
    },
    {
      id: 3,
      category: "Chef Team",
      image: "https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?q=80&w=800",
      title: "EXECUTIVE PLATING DISCIPLINE",
      desc: "Our senior master chefs aligning each micro-herb with culinary compasses for absolute symmetry."
    },
    {
      id: 4,
      category: "Finished Dishes",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
      title: "SIGNATURE TRUFFLE GNOCCHI",
      desc: "Warm plated signature dish laced with brown butter, gold leafing, and shaved winter truffles."
    },
    {
      id: 5,
      category: "Event Setup",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800",
      title: "GOLD THEMED BANQUET HALL",
      desc: "Premium dining halls framed with crystal candelabras and custom luxury gold-plated service lines."
    },
    {
      id: 6,
      category: "Kitchen Setup",
      image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=800",
      title: "OVEN RANGE & TEMP CONTROL",
      desc: "State of the art smart combi-ovens ensuring core meats maintain perfect moisture and strict thermal standards."
    },
    {
      id: 7,
      category: "Food Preparation",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800",
      title: "SLOW COLD SMOKING",
      desc: "Bespoke applewood-smoking stations preparing organic salmon steaks under precise moisture logs."
    },
    {
      id: 8,
      category: "Finished Dishes",
      image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=800",
      title: "BELGIAN CHOCOLATE NOVELTY",
      desc: "An organic pistachio-filled chocolate sphere melting dynamically under warm salted-caramel drizzle."
    },
    {
      id: 9,
      category: "Event Setup",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800",
      title: "OUTDOOR HIGH-TEA SELECTION",
      desc: "A picturesque garden high-tea layout adorned with delicate pastel blooms and organic macaron trays."
    }
  ];

  const filteredItems = activeCategory === "All" 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="bg-[#050B24] text-white py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="mx-auto max-w-7xl space-y-16">
        
        {/* Header Title */}
        <div className="text-center space-y-4">
          <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">The Sanctuary of Taste</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">Kitchen & Culinary Gallery</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] mx-auto" />
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-light">
            Take an intimate look inside our high-security kitchens, meticulous food preparation procedures, and stellar plating artists.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setLightboxIndex(null);
              }}
              className={`rounded-full px-4 sm:px-5 py-2.5 text-xs font-mono tracking-wider uppercase border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#D4AF37] text-[#050B24] border-[#D4AF37] font-extrabold shadow-lg shadow-[#D4AF37]/20"
                  : "bg-white/5 border-slate-700 hover:border-[#D4AF37]/50 text-slate-300 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group cursor-pointer relative rounded-2xl glass-card glass-card-hover overflow-hidden flex flex-col h-full"
            >
              {/* Image Frame with Zoom Effect */}
              <div className="h-64 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-[1px]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Category Icon Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="rounded-full bg-[#D4AF37] text-[#050B24] p-3 shadow-lg shadow-[#D4AF37]/40 transform scale-70 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="h-6 w-6" />
                  </div>
                </div>

                <div className="absolute top-4 left-4 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[9px] font-mono tracking-wider uppercase text-[#D4AF37] border border-[#D4AF37]/20">
                  {item.category}
                </div>
              </div>

              {/* Description */}
              <div className="p-5 text-left space-y-2 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-sm font-extrabold tracking-widest text-slate-300 uppercase group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-[11px] sm:text-xs font-light leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>
                <div className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase pt-3 border-t border-white/5 flex items-center space-x-1.5 mt-4">
                  <Eye className="h-3.5 w-3.5" />
                  <span>Inspect View</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-sm">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2.5 rounded-full border border-white/10 transition-colors"
            title="Close Lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Nav Prev */}
          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-3 rounded-full border border-white/10 transition-colors active:scale-95"
            title="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Active Image Frame */}
          <div className="max-w-4xl w-full flex flex-col items-center space-y-4">
            <div className="relative rounded-xl overflow-hidden border border-white/15 max-h-[70vh] w-full flex justify-center bg-black">
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[70vh] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Lightbox Information Panel */}
            <div className="text-center max-w-xl space-y-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20">
                {filteredItems[lightboxIndex].category}
              </span>
              <h4 className="font-serif text-xl font-bold tracking-wide text-white">
                {filteredItems[lightboxIndex].title}
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                {filteredItems[lightboxIndex].desc}
              </p>
            </div>
          </div>

          {/* Nav Next */}
          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-3 rounded-full border border-white/10 transition-colors active:scale-95"
            title="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Thumbnail Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            {lightboxIndex + 1} / {filteredItems.length}
          </div>
        </div>
      )}

    </div>
  );
}
