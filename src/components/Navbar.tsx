import React from "react";
import { ChefHat, Lock } from "lucide-react";

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Navbar({ activePage, setActivePage }: NavbarProps) {
  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "kitchen", label: "Kitchen" },
    { id: "feedback", label: "Feedback" },
    { id: "contact", label: "Contact Us" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-nav transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Side: Brand Logo */}
        <div 
          onClick={() => setActivePage("home")} 
          className="flex cursor-pointer items-center space-x-3 group"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#AA7C11] text-[#050B24] shadow-lg shadow-[#D4AF37]/20 transition-transform group-hover:scale-105">
            <ChefHat className="h-6 w-6 stroke-[2]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-widest text-[#D4AF37] sm:text-xl">
              VELYXO
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
              Luxury Foods LLP
            </span>
          </div>
        </div>

        {/* Center: Navigation Menu */}
        <nav className="hidden lg:flex items-center space-x-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`relative py-2 text-sm font-medium tracking-wider transition-all duration-300 uppercase ${
                activePage === item.id
                  ? "text-[#D4AF37]"
                  : "text-slate-300 hover:text-[#D4AF37]"
              }`}
            >
              {item.label}
              {activePage === item.id && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11]" />
              )}
            </button>
          ))}

          {/* Special Admin Link with Lock Icon */}
          <button
            onClick={() => setActivePage("admin")}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
              activePage === "admin"
                ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]"
                : "border-slate-700 hover:border-[#D4AF37]/50 text-slate-400 hover:text-[#D4AF37]"
            }`}
            title="Admin Analytics Reports"
          >
            <Lock className="h-3.5 w-3.5" />
            <span>Reports</span>
          </button>
        </nav>

        {/* Right Side: CTA Button */}
        <div className="flex items-center space-x-4">
          {/* Mobile Admin Link */}
          <button
            onClick={() => setActivePage("admin")}
            className="lg:hidden p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-[#D4AF37]"
          >
            <Lock className="h-4.5 w-4.5" />
          </button>

          <button
            onClick={() => setActivePage("contact")}
            className="relative overflow-hidden rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] px-5 py-2.5 text-xs font-bold tracking-widest uppercase text-[#050B24] shadow-md shadow-[#D4AF37]/10 transition-all duration-300 hover:scale-[1.03] hover:shadow-[#D4AF37]/25 active:scale-[0.98]"
          >
            Book Catering
          </button>
        </div>

      </div>

      {/* Mobile Nav Sub-bar */}
      <div className="lg:hidden border-t border-white/5 bg-[#050B24]/90 overflow-x-auto">
        <div className="flex space-x-6 px-4 py-3 whitespace-nowrap scrollbar-none">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`text-xs font-medium tracking-wider uppercase transition-colors ${
                activePage === item.id ? "text-[#D4AF37] font-semibold" : "text-slate-400"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
