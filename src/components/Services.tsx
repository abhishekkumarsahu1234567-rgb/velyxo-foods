import React from "react";
import { Check, Sparkles, Trophy, Calendar, ChefHat, Heart, ShieldAlert } from "lucide-react";

interface ServicesProps {
  setActivePage: (page: string) => void;
}

export default function Services({ setActivePage }: ServicesProps) {
  const servicesList = [
    {
      id: "corp",
      title: "Corporate Catering",
      description: "Enhance your brand's prestige with executive lunch boxes, high-tea boards, networking galas, and global board meetings served with high-end finesse.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600",
      features: [
        "Pre-plated smart executive lunchboxes",
        "High-tea and artisanal coffee bars",
        "SLA compliance with strict timing",
        "Billing & corporate accounts dashboard"
      ]
    },
    {
      id: "wed",
      title: "Wedding Catering",
      description: "Celebrate your lifetime bond with destination wedding buffets, grand gold-plated wedding banquets, traditional dynamic recipes, and royal presentation setups.",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600",
      features: [
        "Bespoke luxury live stations",
        "Fine-dining royal silver service flow",
        "Bespoke welcome drinks & molecular mixology",
        "Dedicated bride & groom butler service"
      ]
    },
    {
      id: "event",
      title: "Event Catering",
      description: "From product launches to housewarmings, we curate customized banquets, interactive sushi counters, and artisanal grill options fitting your precise event theme.",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=600",
      features: [
        "Theme-based presentation concepts",
        "Flexible guest sizing (50 - 2000+)",
        "Gourmet interactive buffet bars",
        "Post-event professional clean-up"
      ]
    },
    {
      id: "cloud",
      title: "Cloud Kitchen Services",
      description: "Our ultra-clean cloud kitchens deliver direct bulk corporate meals, event delivery packages, and smart corporate subscriptions with extreme hygiene protocols.",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600",
      features: [
        "Fully insulated premium heating containers",
        "Real-time food preparation hygiene streams",
        "Contactless, safe bulk logistics dispatch",
        "Custom nutritional calorie mapping"
      ]
    },
    {
      id: "menu",
      title: "Customized Menu Planning",
      description: "Partner with our master chefs to create specialized keto, vegan, gluten-free, organic, and world fusion menu sequences tailored specifically for your client taste profile.",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600",
      features: [
        "Exclusive taste testing sessions",
        "Multi-cuisine expert chefs",
        "Detailed allergy and dietary safety matrices",
        "Bespoke menu card calligraphy designs"
      ]
    },
    {
      id: "vip",
      title: "VIP Catering Solutions",
      description: "Designed for highly demanding protocols: executive board members, celebrity artists, politicians, and private yachts, managed with supreme confidentiality.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600",
      features: [
        "Vetted & high-security background-cleared staff",
        "Premium crystal plating & silverware displays",
        "Executive private chef hire option",
        "Absolute NDAs and high security compliance"
      ]
    }
  ];

  return (
    <div className="bg-[#050B24] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-20">
        
        {/* Header Title */}
        <div className="text-center space-y-4">
          <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">Elite Offerings</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">Our Luxury Hospitality Services</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] mx-auto" />
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-light">
            We provide a diverse portfolio of culinary setups managed under elite five-star protocols.
          </p>
        </div>

        {/* Services Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <div 
              key={service.id}
              className="group relative rounded-2xl glass-card glass-card-hover overflow-hidden flex flex-col justify-between"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/0 to-[#D4AF37]/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Service Image */}
                <div className="h-56 w-full overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09102c] to-transparent pointer-events-none" />
                  
                  {/* Decorative corner curve for premium touch */}
                  <div className="absolute bottom-0 right-0 h-10 w-10 bg-[#09102c] rounded-tl-xl border-t border-l border-white/5 pointer-events-none flex items-center justify-center">
                    <span className="text-[10px] font-mono text-[#D4AF37]">0{index + 1}</span>
                  </div>
                </div>

                {/* Service Details */}
                <div className="p-6 text-left space-y-4">
                  <h3 className="font-serif text-xl font-bold tracking-wide text-white group-hover:text-[#D4AF37] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light min-h-[72px]">
                    {service.description}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#D4AF37]">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer CTA Button */}
              <div className="p-6 pt-0 text-left">
                <button 
                  onClick={() => setActivePage("contact")}
                  className="w-full rounded-xl border border-slate-700 bg-white/5 py-3 text-xs font-mono font-bold tracking-widest uppercase text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#050B24] hover:border-[#D4AF37] transition-all duration-300 active:scale-98"
                >
                  Book {service.title.split(" ")[0]}
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Corporate Subscription Banner */}
        <div className="relative rounded-2xl glass-card p-8 sm:p-12 text-left overflow-hidden shadow-2xl">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#D4AF37]/5 blur-2xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-[#7C3AED]/5 blur-2xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/20">
                Corporate Exclusive
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                Looking for Daily Corporate Meal Deliveries?
              </h3>
              <p className="text-slate-400 text-sm max-w-2xl font-light leading-relaxed">
                VELYXO FOODS LLP provides high-end corporate cafeteria solutions, executive pantry subscriptions, and premium packaged daily meals. Completely synchronized with calorie targets and customized dietary preferences under strict compliance logs.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <button 
                onClick={() => setActivePage("contact")}
                className="w-full lg:w-auto inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] px-8 py-4 text-xs font-bold tracking-widest uppercase text-[#050B24] shadow-lg shadow-[#D4AF37]/10 hover:scale-[1.02] transition-transform active:scale-98"
              >
                Inquire For Corporate SLA
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
