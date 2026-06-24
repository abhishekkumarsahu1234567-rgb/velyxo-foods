import React, { useState, useEffect } from "react";
import { 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Award, 
  Users, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { motion } from "motion/react";

interface HomeProps {
  setActivePage: (page: string) => void;
}

// Custom Counter component to animate numbers
function Counter({ value, suffix = "", duration = 1500 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 25);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <span className="font-serif text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] md:text-5xl">
      {count}
      {suffix}
    </span>
  );
}

export default function Home({ setActivePage }: HomeProps) {
  // Testimonial slider state
  const [currTestimonial, setCurrTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Renuka Nair",
      role: "Director of Events, Mercedes-Benz India",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150",
      rating: 5,
      text: "Velyxo Foods did an absolutely phenomenal job for our new AMG launch. Their staff was impeccably dressed, extremely mannered, and the presentation of the artisanal cheese platters and molecular mocktails was pure theater. It felt like dining in a 3-Michelin-starred restaurant.",
      event: "AMG Launch Event"
    },
    {
      name: "Saurabh Agarwal",
      role: "Founder, Capital One Partners",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
      rating: 5,
      text: "The absolute gold standard of corporate catering. We hosted a private board gathering of 30 executive delegates. From custom-crafted menus accommodating vegan diets to the high-security hygiene protocols, Velyxo handled it with supreme precision. Every course was paired with exceptional explanations by their executive chef.",
      event: "VIP Board Dinner"
    },
    {
      name: "Dr. Ananya Goel",
      role: "Bride",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150",
      rating: 5,
      text: "We hired VELYXO for our wedding reception, and it was the best decision we made. The luxury gold accent displays, the live truffle pasta bar, and the hand-crafted desserts were absolute standouts. All our guests are still calling us to ask about the caterers!",
      event: "Royal Wedding Reception"
    }
  ];

  const nextTestimonial = () => {
    setCurrTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const featuredDishes = [
    {
      title: "Gold-Plated Black Truffle Gnocchi",
      desc: "Hand-rolled potato gnocchi tossed in brown butter, white winter truffle carpaccio, topped with 24-karat edible gold dust.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500",
      price: "Signature Course",
      tag: "Michelin Standard"
    },
    {
      title: "Saffron Infused Lobster tail",
      desc: "Poached butter lobster served over a bed of slow-cooked Kashmiri saffron risotto, laced with a delicate citrus champagne foam.",
      image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=500",
      price: "VIP Delight",
      tag: "Best Seller"
    },
    {
      title: "Imperial Chocolate & Pistachio sphere",
      desc: "Dark Belgian chocolate sphere filled with Sicilian pistachio mousse, melting under hot salted-caramel gold drizzle.",
      image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=500",
      price: "Grand Finale",
      tag: "Artisanal Dessert"
    }
  ];

  const trustedClients = [
    { name: "Google", logo: "Google" },
    { name: "Mercedes-Benz", logo: "Mercedes-Benz" },
    { name: "Goldman Sachs", logo: "Goldman Sachs" },
    { name: "Salesforce", logo: "Salesforce" },
    { name: "TATA", logo: "TATA Group" },
    { name: "Reliance Industries", logo: "Reliance" }
  ];

  return (
    <div className="relative bg-[#050B24] text-white overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center pt-8 pb-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        {/* Golden Particles Background Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.07),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(124,58,237,0.05),transparent_50%)] pointer-events-none" />
        
        {/* Background decorative elements for Frosted Glass Theme */}
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#D4AF37] opacity-10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] bg-[#7C3AED] opacity-10 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Decorative Grid Patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="mx-auto w-full max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Typography & CTAs */}
            <div className="lg:col-span-7 flex flex-col space-y-8 text-left">
              
              {/* Small Premium Badge */}
              <div className="inline-flex self-start items-center space-x-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-3 py-1 text-xs font-mono tracking-widest uppercase text-[#D4AF37] shadow-inner shadow-[#D4AF37]/10 animate-pulse">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Premium Corporate & Event Catering</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-[650px]">
                Where Every <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] drop-shadow-sm font-semibold">
                  Flavour Tells
                </span> <br className="hidden sm:inline" />
                A Luxury Story
              </h1>

              {/* Subheading */}
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-[600px] font-light">
                <strong className="text-white font-semibold">VELYXO FOODS LLP</strong> crafts peerless culinary masterpieces for corporate gatherings, grand wedding receptions, high-profile product launches, and exclusive private celebrations.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5">
                <button
                  onClick={() => setActivePage("services")}
                  className="group relative flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] px-8 py-4 text-xs font-bold tracking-widest uppercase text-[#050B24] transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-[#D4AF37]/20"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => setActivePage("contact")}
                  className="rounded-full border border-slate-700 bg-white/5 px-8 py-4 text-xs font-bold tracking-widest uppercase text-white transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5"
                >
                  Book Catering
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-white/5 flex flex-wrap gap-x-6 gap-y-3 text-slate-400 text-xs font-mono">
                <div className="flex items-center space-x-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                  <span>FSSAI Certified</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                  <span>500+ Events Served</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                  <span>Corporate Experts</span>
                </div>
              </div>

            </div>

            {/* Right Column: Premium Food Image Card with Floatings */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              
              {/* Main Elegant Backdrop Glow */}
              <div className="absolute h-72 w-72 rounded-full bg-gradient-to-tr from-[#7C3AED]/20 to-[#D4AF37]/20 blur-3xl -z-10" />

              <div className="relative w-full max-w-[420px] rounded-2xl overflow-hidden border border-white/10 p-2.5 bg-white/5 backdrop-blur-md shadow-2xl shadow-[#D4AF37]/5 transition-transform hover:scale-[1.01]">
                <img 
                  src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800" 
                  alt="Luxury Catering Plating" 
                  className="w-full h-[450px] object-cover rounded-xl transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Glassmorphic Rating Badge */}
                <div className="absolute top-10 right-[-10px] backdrop-blur-md bg-white/10 border border-white/20 p-4 rounded-xl shadow-xl transform rotate-3 flex flex-col items-start">
                  <span className="text-[#D4AF37] text-xl font-bold flex items-center gap-1">4.9 <Star className="h-4 w-4 fill-[#D4AF37]" /></span>
                  <span className="text-[10px] uppercase tracking-tighter text-white/60">Average Rating</span>
                </div>

                {/* Floating Happy Clients Badge (Bottom Left) */}
                <div className="absolute bottom-12 left-[-20px] backdrop-blur-md bg-white/10 border border-white/20 p-5 rounded-xl shadow-xl flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <img className="h-8 w-8 rounded-full border-2 border-white/20 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100" alt="Client 1" referrerPolicy="no-referrer" />
                    <img className="h-8 w-8 rounded-full border-2 border-white/20 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100" alt="Client 2" referrerPolicy="no-referrer" />
                    <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-gray-500/80 backdrop-blur-sm flex items-center justify-center text-[10px] font-bold text-white">+</div>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-white font-bold text-xs">250+</span>
                    <span className="text-[9px] uppercase tracking-tight text-white/60">Corporate Clients</span>
                  </div>
                </div>

                {/* Subtle soft golden gradient overlay inside image bottom */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
              </div>

              {/* Geometric Decorative Gold Accents */}
              <div className="absolute -top-4 -right-4 h-12 w-12 border-t-2 border-r-2 border-[#D4AF37]/40 pointer-events-none rounded-tr" />
              <div className="absolute -bottom-4 -left-4 h-12 w-12 border-b-2 border-l-2 border-[#D4AF37]/40 pointer-events-none rounded-bl" />
            </div>

          </div>
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none opacity-60">
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">Scroll</span>
          <div className="h-8 w-5 rounded-full border border-slate-600 flex justify-center p-1.5">
            <div className="h-1.5 w-1 rounded-full bg-[#D4AF37] animate-bounce" />
          </div>
        </div>
      </section>

      {/* 2. STATISTICS SECTION */}
      <section className="relative bg-white/5 backdrop-blur-md border-y border-white/10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
            
            <div className="flex flex-col items-center justify-center py-4">
              <div className="mb-3 rounded-full bg-[#D4AF37]/10 p-3.5 text-[#D4AF37]">
                <Award className="h-7 w-7" />
              </div>
              <Counter value={500} suffix="+" />
              <span className="mt-2 font-serif text-sm uppercase tracking-widest text-slate-400">Grand Events Served</span>
            </div>

            <div className="flex flex-col items-center justify-center py-4 md:px-4">
              <div className="mb-3 rounded-full bg-[#D4AF37]/10 p-3.5 text-[#D4AF37]">
                <Users className="h-7 w-7" />
              </div>
              <Counter value={250} suffix="+" />
              <span className="mt-2 font-serif text-sm uppercase tracking-widest text-slate-400">Corporate Elite Clients</span>
            </div>

            <div className="flex flex-col items-center justify-center py-4">
              <div className="mb-3 rounded-full bg-[#D4AF37]/10 p-3.5 text-[#D4AF37]">
                <Clock className="h-7 w-7" />
              </div>
              <Counter value={5} suffix="+" />
              <span className="mt-2 font-serif text-sm uppercase tracking-widest text-slate-400">Years of Luxury Expertise</span>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FEATURED DISHES */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">Gastronomic Artistry</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">Featured Culinary Creations</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] mx-auto" />
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-light">
              A sensory preview of our exquisite dining menu, meticulously crafted using organic ingredients of the highest grade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDishes.map((dish, idx) => (
              <div 
                key={idx}
                className="group relative rounded-2xl glass-card glass-card-hover overflow-hidden flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={dish.image} 
                    alt={dish.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-mono tracking-wider uppercase text-[#D4AF37] border border-[#D4AF37]/20">
                    {dish.tag}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09102c] via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow justify-between text-left">
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl font-bold text-white tracking-wide group-hover:text-[#D4AF37] transition-colors">
                      {dish.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                      {dish.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">
                      {dish.price}
                    </span>
                    <button 
                      onClick={() => setActivePage("contact")} 
                      className="text-xs font-bold text-slate-300 group-hover:text-[#D4AF37] transition-colors inline-flex items-center space-x-1"
                    >
                      <span>Customise</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="bg-[#030718] py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-7xl relative z-10">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">The Velyxo Guarantee</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">Why Select VELYXO FOODS?</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] mx-auto" />
            <p className="text-slate-400 text-sm max-w-xl mx-auto font-light">
              We translate our deep passion for premium hospitality into peerless executive dining and bridal experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Professional Team */}
            <div className="rounded-xl glass-card glass-card-hover p-6 flex flex-col text-left space-y-4 group">
              <div className="h-12 w-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#050B24] transition-all">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Five-Star Culinary Artists</h3>
              <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                Our kitchen is orchestrated by master chefs vetted in renowned 5-star establishments and luxury fine dining.
              </p>
            </div>

            {/* Premium Ingredients */}
            <div className="rounded-xl glass-card glass-card-hover p-6 flex flex-col text-left space-y-4 group">
              <div className="h-12 w-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#050B24] transition-all">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Supreme Ingredients</h3>
              <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                From hand-sourced white truffles to organic fresh greens, we only source premium non-processed ingredients.
              </p>
            </div>

            {/* Hygiene Standards */}
            <div className="rounded-xl glass-card glass-card-hover p-6 flex flex-col text-left space-y-4 group">
              <div className="h-12 w-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#050B24] transition-all">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Rigorous Hygiene Protocols</h3>
              <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                Fully certified FSSAI kitchen. Daily thermal checks, air filtration systems, and zero-compromise sanitize cycles.
              </p>
            </div>

            {/* On-Time Service */}
            <div className="rounded-xl glass-card glass-card-hover p-6 flex flex-col text-left space-y-4 group">
              <div className="h-12 w-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#050B24] transition-all">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">On-Time Execution</h3>
              <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                Precision logistics. Our banquet staff, mobile kitchen trucks, and culinary teams synchronize seamlessly with your event timeline.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CLIENT TESTIMONIALS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 h-96 w-96 rounded-full bg-[#7C3AED]/5 blur-3xl -z-10" />

        <div className="mx-auto max-w-5xl text-center relative z-10">
          
          <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">Elite Endorsements</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-12">Client Testimonials</h2>
          
          {/* Slider Frame */}
          <div className="relative rounded-2xl glass-card p-8 sm:p-12 shadow-2xl">
            
            {/* Quotes Mark */}
            <div className="absolute top-4 left-6 text-7xl font-serif text-[#D4AF37]/10 select-none">“</div>

            {/* Testimonial Active Slide */}
            <div className="space-y-6">
              <div className="flex justify-center space-x-1">
                {Array.from({ length: testimonials[currTestimonial].rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>

              <blockquote className="text-lg sm:text-xl font-serif italic text-slate-100 leading-relaxed max-w-3xl mx-auto">
                "{testimonials[currTestimonial].text}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-center space-x-4 pt-4">
                <img 
                  src={testimonials[currTestimonial].image} 
                  alt={testimonials[currTestimonial].name}
                  className="h-12 w-12 rounded-full object-cover border-2 border-[#D4AF37]/50"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left">
                  <div className="font-serif text-sm font-bold text-white">{testimonials[currTestimonial].name}</div>
                  <div className="text-xs text-slate-400 font-mono">{testimonials[currTestimonial].role}</div>
                </div>
              </div>

              {/* Event category tag */}
              <div className="inline-flex rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-3 py-1 text-[10px] font-mono tracking-widest uppercase text-[#D4AF37]">
                {testimonials[currTestimonial].event}
              </div>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6">
              <button 
                onClick={prevTestimonial}
                className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full bg-[#050B24] border border-white/10 text-slate-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all shadow-md active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6">
              <button 
                onClick={nextTestimonial}
                className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full bg-[#050B24] border border-white/10 text-slate-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all shadow-md active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrTestimonial(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currTestimonial === idx ? "w-8 bg-[#D4AF37]" : "w-2 bg-slate-600"
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 6. TRUSTED CLIENTS */}
      <section className="bg-[#030718] py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-2 mb-10">
            <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">Elite Partnerships</span>
            <h3 className="text-sm font-serif font-semibold text-slate-400 uppercase tracking-widest">Trusted By Elite Conglomerates</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-center">
            {trustedClients.map((client, i) => (
              <div 
                key={i}
                className="flex justify-center items-center py-4 px-3 rounded-lg glass-card glass-card-hover text-sm font-mono tracking-widest text-slate-300 uppercase select-none cursor-default"
              >
                {client.logo}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
