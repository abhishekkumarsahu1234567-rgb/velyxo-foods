import React from "react";
import { Sparkles, Award, Target, Eye, ShieldCheck, Heart, User, CheckCircle } from "lucide-react";

export default function AboutUs() {
  const milestones = [
    {
      year: "2021",
      title: "The Genesis",
      desc: "VELYXO FOODS LLP was founded with a singular, clear vision: to elevate ordinary corporate lunches and wedding banquets into Michelin-inspired culinary memories."
    },
    {
      year: "2023",
      title: "The VIP Conquest",
      desc: "Provisioned our centralized custom state-of-the-art smart kitchen facility. Vetted and recruited master chefs from premium 5-star international hotel chains."
    },
    {
      year: "2024",
      title: "Going Green & Certified",
      desc: "Achieved strict ISO & clean green kitchen credentials. Successfully managed our first 500+ plate premium corporate tech summits with zero service delays."
    },
    {
      year: "2026",
      title: "Luxury Dominance",
      desc: "Now recognized as a premier luxury food partner for top MNCs, royal destination weddings, and VIP private events in the country."
    }
  ];

  const values = [
    {
      icon: <Award className="h-6 w-6 text-[#D4AF37]" />,
      title: "Gastronomic Perfection",
      desc: "We treat food as high art. Every plate is calibrated for visual symmetry, flavor depth, and exquisite presentation standards."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-[#D4AF37]" />,
      title: "Unyielding Integrity",
      desc: "From transparent pricing models to strict hygiene regulations, we maintain absolute transparency and moral compliance."
    },
    {
      icon: <Heart className="h-6 w-6 text-[#D4AF37]" />,
      title: "Empathetic Hospitality",
      desc: "Our banquet and service staff are rigorously trained to practice humble, intuitive, and silent service flow."
    }
  ];

  return (
    <div className="bg-[#050B24] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-24">
        
        {/* Header Title */}
        <div className="text-center space-y-4">
          <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">The Velyxo Narrative</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">Our Heritage & Mission</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] mx-auto" />
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-light">
            We exist at the intersection of gourmet culinary arts and flawless event hospitality.
          </p>
        </div>

        {/* Story Section + Founder Message Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono tracking-wider text-[#D4AF37] uppercase">
              <Sparkles className="h-4.5 w-4.5 text-[#D4AF37]" />
              <span>A Culinary Symphony</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              Crafting Exceptional Gastronomy Since Day One
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              VELYXO FOODS LLP began as a boutique culinary agency in response to a visible void in high-end event catering: the absence of customized culinary storytelling. Traditional catering prioritized volume; we prioritized depth, hygiene, and bespoke luxury.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              By pairing state-of-the-art clean cloud kitchen structures with highly trained hospitality experts, we deliver sensory dining experiences where every color, texture, and aroma tells a beautiful story.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl glass-card p-6 sm:p-8 text-left shadow-2xl">
              <div className="absolute top-4 right-6 text-8xl font-serif text-[#D4AF37]/5 select-none">“</div>
              <div className="space-y-6 relative z-10">
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/20">
                  Founder's Message
                </span>
                <p className="text-slate-200 text-sm sm:text-base italic leading-relaxed font-light">
                  "Luxury is not merely about using expensive ingredients; it is about the emotional resonance of care, perfect timing, and impeccable safety. At Velyxo, we treat your corporate boards and marital milestones as our own family legacy. Every event is planned with surgical precision and executed with absolute grace."
                </p>
                <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#7C3AED] flex items-center justify-center text-white">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#D4AF37]">Abhishek K. Sahu</h4>
                    <span className="text-xs text-slate-400 font-mono">Managing Partner & Founder</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="rounded-2xl glass-card glass-card-hover p-8 text-left space-y-4 relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 h-24 w-24 bg-[#D4AF37]/5 rounded-full blur-xl" />
            <div className="h-12 w-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">Our Mission</h3>
            <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed">
              To seamlessly orchestrate luxury dining experiences by prioritizing FSSAI-certified kitchen hygiene, procuring elite organic ingredients, and standardizing five-star hospitality standards at scale for corporate councils, wedding planners, and private hosts.
            </p>
          </div>

          <div className="rounded-2xl glass-card glass-card-hover p-8 text-left space-y-4 relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 h-24 w-24 bg-[#7C3AED]/5 rounded-full blur-xl" />
            <div className="h-12 w-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">Our Vision</h3>
            <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed">
              To be recognized as the premier luxury catering and executive hospitality conglomerate in India, standardizing smart, eco-friendly culinary models that bring impeccable taste, visual grandeur, and seamless organization together.
            </p>
          </div>

        </div>

        {/* Timeline Layout */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">The Journey</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">Our Luxury Timeline</h3>
            <div className="h-1 w-12 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] mx-auto" />
          </div>

          <div className="relative border-l border-white/10 max-w-3xl mx-auto pl-6 sm:pl-8 space-y-12 text-left py-4">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[#D4AF37] bg-[#050B24] transition-all group-hover:bg-[#D4AF37] group-hover:scale-110">
                  <div className="h-2 w-2 rounded-full bg-[#D4AF37] group-hover:bg-[#050B24]" />
                </div>
                
                {/* Timeline content */}
                <div className="space-y-2">
                  <span className="font-serif text-xl font-bold text-[#D4AF37] tracking-wider block">
                    {milestone.year}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                    {milestone.title}
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed max-w-2xl">
                    {milestone.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">Our Standards</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">Core Values</h3>
            <div className="h-1 w-12 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, idx) => (
              <div 
                key={idx}
                className="rounded-xl glass-card glass-card-hover p-6 flex flex-col items-center text-center space-y-4"
              >
                <div className="h-12 w-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                  {v.icon}
                </div>
                <h4 className="font-serif text-lg font-bold text-white">{v.title}</h4>
                <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
