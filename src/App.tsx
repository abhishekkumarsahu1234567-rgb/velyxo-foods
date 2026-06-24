import React, { useState, useEffect } from "react";
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  ChefHat, 
  ArrowRight,
  ShieldAlert,
  Calendar,
  Lock
} from "lucide-react";

import { Review } from "./types";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import KitchenGallery from "./components/KitchenGallery";
import FeedbackForm from "./components/FeedbackForm";
import AdminReports from "./components/AdminReports";
import Contact from "./components/Contact";

export default function App() {
  // Navigation synchronized with URL query params ?page=...
  const [activePage, setActivePage] = useState("home");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sync state with URL parameter for smooth bookmarked reloading
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get("page");
    if (pageParam) {
      setActivePage(pageParam);
    }
  }, []);

  const handlePageChange = (newPage: string) => {
    setActivePage(newPage);
    // Update URL query parameters silently
    const newUrl = `${window.location.pathname}?page=${newPage}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
    // Scroll smoothly back to top on page switches
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fetch reviews from server
  const fetchReviews = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/reviews");
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error("Failed to load reviews from Express datastore:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Load reviews on initial load
  useEffect(() => {
    fetchReviews();
  }, []);

  // Submit trigger to reload reports data
  const handleReviewSubmitted = () => {
    fetchReviews();
  };

  // Restore pre-seeded reviews in backend
  const handleResetDatabase = async () => {
    if (window.confirm("Are you sure you want to reset the feedback database to pre-seeded defaults?")) {
      setIsRefreshing(true);
      try {
        const res = await fetch("/api/reviews/reset", { method: "POST" });
        if (res.ok) {
          const data = await res.json();
          setReviews(data.reviews);
        }
      } catch (err) {
        console.error("Failed to reset database:", err);
      } finally {
        setIsRefreshing(false);
      }
    }
  };

  // Render Page Component Dynamically
  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <Home setActivePage={handlePageChange} />;
      case "about":
        return <AboutUs />;
      case "services":
        return <Services setActivePage={handlePageChange} />;
      case "portfolio":
        return <Portfolio />;
      case "kitchen":
        return <KitchenGallery />;
      case "feedback":
        return (
          <FeedbackForm 
            setActivePage={handlePageChange} 
            onReviewSubmitted={handleReviewSubmitted} 
          />
        );
      case "admin":
        return (
          <AdminReports 
            reviews={reviews} 
            onRefresh={fetchReviews} 
            isRefreshing={isRefreshing}
            onResetDatabase={handleResetDatabase}
          />
        );
      case "contact":
        return <Contact />;
      default:
        return <Home setActivePage={handlePageChange} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#050B24] text-white selection:bg-[#D4AF37] selection:text-[#050B24]">
      
      {/* GLOBAL NAVBAR */}
      <Navbar activePage={activePage} setActivePage={handlePageChange} />

      {/* DYNAMIC CORE CONTENT VIEW */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* GLOBAL LUXURY FOOTER */}
      <footer className="border-t border-white/10 glass-card pt-16 pb-8 px-4 sm:px-6 lg:px-8 text-left relative z-20 print:hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 border-b border-white/5 pb-12">
            
            {/* Column 1: Brand Pitch */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#AA7C11] text-[#050B24] shadow-md shadow-[#D4AF37]/10">
                  <ChefHat className="h-5.5 w-5.5 stroke-[2]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-lg font-bold tracking-widest text-[#D4AF37]">
                    VELYXO
                  </span>
                  <span className="text-[8px] font-mono tracking-widest text-slate-400 uppercase">
                    Luxury Foods LLP
                  </span>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                Elevating grand corporate conferences, milestone wedding receptions, and private dinners into peerless Michelin-inspired fine-dining celebrations with five-star hospitality metrics.
              </p>
              <div className="flex space-x-3 pt-2">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-[#D4AF37] hover:bg-white/10 transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-[#D4AF37] hover:bg-white/10 transition-colors">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-[#D4AF37] hover:bg-white/10 transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-[#D4AF37] hover:bg-white/10 transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-xs font-light text-slate-400">
                <li>
                  <button onClick={() => handlePageChange("home")} className="hover:text-white transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => handlePageChange("about")} className="hover:text-white transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => handlePageChange("services")} className="hover:text-white transition-colors">
                    Our Services
                  </button>
                </li>
                <li>
                  <button onClick={() => handlePageChange("portfolio")} className="hover:text-white transition-colors">
                    Event Portfolio
                  </button>
                </li>
                <li>
                  <button onClick={() => handlePageChange("kitchen")} className="hover:text-white transition-colors">
                    Kitchen Gallery
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Client Experience */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                Quality Control
              </h4>
              <ul className="space-y-2.5 text-xs font-light text-slate-400">
                <li>
                  <button onClick={() => handlePageChange("feedback")} className="hover:text-white transition-colors">
                    Feedback Form
                  </button>
                </li>
                <li>
                  <button onClick={() => handlePageChange("admin")} className="hover:text-white transition-colors">
                    Reports & Analytics
                  </button>
                </li>
                <li>
                  <button onClick={() => handlePageChange("contact")} className="hover:text-white transition-colors">
                    Book Catering
                  </button>
                </li>
                <li>
                  <span className="text-[10px] text-emerald-400 border border-emerald-950 bg-emerald-950/20 px-2 py-0.5 rounded font-mono">
                    FSSAI Certified
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 4: Location Contacts */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                Corporate Inquiries
              </h4>
              <div className="space-y-3 text-xs font-light text-slate-400">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Level 4, Signature Towers, MG Road, Bangalore, KA, 560001, India.</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Phone className="h-4 w-4 text-[#D4AF37] shrink-0" />
                  <span>+91 80 4567 8912</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Mail className="h-4 w-4 text-[#D4AF37] shrink-0" />
                  <span>reservations@velyxofoods.com</span>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright & Sign-off */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-500">
            <span>
              &copy; {new Date().getFullYear()} VELYXO FOODS LLP. All Rights Reserved. Private Limited Liability Partnership.
            </span>
            <div className="flex space-x-4">
              <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
              <span>&bull;</span>
              <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Luxury Service</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
