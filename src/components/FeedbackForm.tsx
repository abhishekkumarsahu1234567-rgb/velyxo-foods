import React, { useState } from "react";
import { 
  Star, 
  Smile, 
  Check, 
  Sparkles, 
  Calendar, 
  User, 
  Tag, 
  Loader2, 
  ArrowLeft,
  ChevronDown
} from "lucide-react";

interface FeedbackFormProps {
  setActivePage: (page: string) => void;
  onReviewSubmitted: () => void; // Trigger reports reload
}

export default function FeedbackForm({ setActivePage, onReviewSubmitted }: FeedbackFormProps) {
  // Form states
  const [eventName, setEventName] = useState("");
  const [clientName, setClientName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [npsScore, setNpsScore] = useState<number | null>(null);
  
  const [foodQuality, setFoodQuality] = useState(0);
  const [foodHover, setFoodHover] = useState(0);

  const [serviceQuality, setServiceQuality] = useState(0);
  const [serviceHover, setServiceHover] = useState(0);

  const [staffBehaviour, setStaffBehaviour] = useState(0);
  const [staffHover, setStaffHover] = useState(0);

  const [hygieneCleanliness, setHygieneCleanliness] = useState(0);
  const [hygieneHover, setHygieneHover] = useState(0);

  const [presentationSetup, setPresentationSetup] = useState(0);
  const [presentationHover, setPresentationHover] = useState(0);

  const [comment, setComment] = useState("");
  const [satisfactionEmoji, setSatisfactionEmoji] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const eventTypeOptions = [
    "Wedding Reception",
    "Corporate Meeting",
    "Conference",
    "Birthday Party",
    "Private Event",
    "Product Launch",
    "Annual Gathering"
  ];

  const emojis = [
    { label: "😡 Very Dissatisfied", value: "Very Dissatisfied", scale: "😡" },
    { label: "😕 Dissatisfied", value: "Dissatisfied", scale: "😕" },
    { label: "😐 Neutral", value: "Neutral", scale: "😐" },
    { label: "😊 Satisfied", value: "Satisfied", scale: "😊" },
    { label: "🤩 Extremely Satisfied", value: "Extremely Satisfied", scale: "🤩" }
  ];

  // Form Validation
  const isFormValid = () => {
    return (
      eventName.trim() !== "" &&
      clientName.trim() !== "" &&
      eventDate.trim() !== "" &&
      eventType !== "" &&
      npsScore !== null &&
      foodQuality > 0 &&
      serviceQuality > 0 &&
      staffBehaviour > 0 &&
      hygieneCleanliness > 0 &&
      presentationSetup > 0 &&
      satisfactionEmoji !== ""
    );
  };

  const handleReset = () => {
    setEventName("");
    setClientName("");
    setEventDate("");
    setEventType("");
    setNpsScore(null);
    setFoodQuality(0);
    setServiceQuality(0);
    setStaffBehaviour(0);
    setHygieneCleanliness(0);
    setPresentationSetup(0);
    setComment("");
    setSatisfactionEmoji("");
    setErrorMessage("");
    setIsSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      setErrorMessage("Please complete all fields and ratings before submitting.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventName,
          clientName,
          eventDate,
          eventType,
          npsScore,
          foodQuality,
          serviceQuality,
          staffBehaviour,
          hygieneCleanliness,
          presentationSetup,
          comment,
          satisfactionEmoji,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback to the database.");
      }

      // Success
      setIsSubmitting(false);
      setIsSuccess(true);
      onReviewSubmitted(); // Reload reports in background
    } catch (err) {
      console.error(err);
      setErrorMessage(err instanceof Error ? err.message : "Submission error occurred.");
      setIsSubmitting(false);
    }
  };

  const renderStars = (
    currentRating: number,
    hoverRating: number,
    setRating: (rating: number) => void,
    setHover: (rating: number) => void
  ) => {
    return (
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive = star <= (hoverRating || currentRating);
          return (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="p-1 transition-transform duration-200 hover:scale-120 focus:outline-none"
            >
              <Star
                className={`h-7 w-7 transition-all duration-300 ${
                  isActive
                    ? "fill-[#D4AF37] text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                    : "text-slate-600"
                }`}
              />
            </button>
          );
        })}
      </div>
    );
  };

  if (isSuccess) {
    // SUCCESS PAGE
    return (
      <div className="bg-[#050B24] min-h-[80vh] py-16 px-4 flex items-center justify-center">
        <div className="max-w-xl w-full glass-card p-8 sm:p-12 rounded-3xl text-center shadow-2xl relative overflow-hidden">
          
          {/* Subtle Golden Glow Circle */}
          <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full bg-[#D4AF37]/5 blur-2xl" />
          <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-[#7C3AED]/10 blur-2xl" />

          {/* Animated success icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] mb-8 animate-pulse shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <Check className="h-10 w-10 stroke-[2.5]" />
          </div>

          <h2 className="text-[#D4AF37] font-serif text-xs font-bold tracking-widest uppercase mb-2">
            THANK YOU
          </h2>
          <h1 className="text-white font-serif text-2xl sm:text-3xl font-extrabold tracking-wide mb-6">
            VELYXO FOODS LLP
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light mb-10 max-w-md mx-auto">
            "Your feedback has been recorded and will help us elevate every future experience. We truly value your time and trust."
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-mono text-xs font-bold tracking-widest uppercase shadow-lg shadow-[#7C3AED]/20 hover:shadow-[#7C3AED]/35 transition-all active:scale-98"
            >
              Submit Another Review
            </button>
            <button
              onClick={() => setActivePage("home")}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#D4AF37] bg-[#D4AF37]/5 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#050B24] font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 active:scale-98"
            >
              🏠 Back To Home
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050B24] py-16 px-4 sm:px-6 lg:px-8 text-left relative">
      <div className="absolute top-0 right-1/4 h-72 w-72 rounded-full bg-[#7C3AED]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-[#D4AF37]/3 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-3xl">
        
        {/* Title Block */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-3 py-1 rounded-full">
            Luxury Catering Quality Control
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
            Catering Experience Feedback
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto font-light">
            We hope you enjoyed our catering services. Please help us maintain our exceptional quality standards.
          </p>
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="space-y-8 relative">
          
          {/* SECTION 1: EVENT DETAILS */}
          <div className="rounded-2xl glass-card p-6 sm:p-8 space-y-6 shadow-xl relative z-40">
            <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7C3AED]/20 text-[#7C3AED] text-xs font-bold">1</span>
              <h3 className="font-serif text-lg font-bold text-white tracking-wide">Event Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Event Name */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                  Event Name / Occasion
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="e.g. Google Annual Gala Dinner"
                    className="w-full rounded-xl glass-input py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-600 focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                  />
                </div>
              </div>

              {/* Client Name */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                  Client / Company Name
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full rounded-xl glass-input py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-600 focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                  />
                </div>
              </div>

              {/* Event Date */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                  Event Date
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <Calendar className="h-4 w-4" />
                  </span>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full rounded-xl glass-input py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-600 focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED] cursor-pointer"
                  />
                </div>
              </div>

              {/* Event Type Custom Dropdown (No Clipping, z-index 9999) */}
              <div className="flex flex-col space-y-2 relative">
                <label className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                  Event Type
                </label>
                <div className="relative z-50">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between rounded-xl glass-input py-3.5 px-4 text-sm text-white focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED] text-left"
                  >
                    <span className={eventType ? "text-white" : "text-slate-600"}>
                      {eventType || "Select Event Type"}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Dropdown Options Popup */}
                  {isDropdownOpen && (
                    <div className="absolute left-0 mt-1.5 w-full bg-[#09102c] border border-white/15 rounded-xl shadow-2xl z-9999 overflow-hidden divide-y divide-white/5 animate-fadeIn">
                      {eventTypeOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setEventType(option);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full py-3 px-4 text-left text-xs sm:text-sm text-slate-300 hover:bg-[#7C3AED]/20 hover:text-[#D4AF37] transition-all font-mono"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* SECTION 2: NPS SCORE */}
          <div className="rounded-2xl glass-card p-6 sm:p-8 space-y-6 shadow-xl relative z-30">
            <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7C3AED]/20 text-[#7C3AED] text-xs font-bold">2</span>
              <h3 className="font-serif text-lg font-bold text-white tracking-wide">Net Promoter Score</h3>
            </div>

            <p className="text-slate-300 text-sm font-light">
              "How likely are you to recommend <strong className="text-[#D4AF37]">VELYXO FOODS LLP</strong> to a friend, colleague, or event planner?"
            </p>

            {/* Score Buttons Grid */}
            <div className="grid grid-cols-11 gap-1 md:gap-2 pt-2">
              {Array.from({ length: 11 }).map((_, score) => {
                const isSelected = npsScore === score;
                return (
                  <button
                    key={score}
                    type="button"
                    onClick={() => setNpsScore(score)}
                    className={`h-10 sm:h-12 flex items-center justify-center rounded-lg border text-xs sm:text-sm font-bold transition-all duration-300 relative group overflow-hidden ${
                      isSelected
                        ? "bg-[#7C3AED] border-[#7C3AED] text-white shadow-[0_0_15px_rgba(124,58,237,0.7)] scale-[1.08] z-10"
                        : "bg-[#050B24] border-white/10 text-slate-300 hover:border-[#7C3AED]/50 hover:text-white"
                    }`}
                  >
                    <span>{score}</span>
                    <span className="absolute bottom-0 left-0 h-1 w-full bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </button>
                );
              })}
            </div>

            {/* Labels */}
            <div className="flex justify-between items-center text-[10px] font-mono tracking-wider text-slate-500 pt-1">
              <span>0 = Not likely at all</span>
              <span>10 = Extremely likely</span>
            </div>
          </div>

          {/* SECTION 3: CATEGORY RATINGS */}
          <div className="rounded-2xl glass-card p-6 sm:p-8 space-y-6 shadow-xl relative z-20">
            <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7C3AED]/20 text-[#7C3AED] text-xs font-bold">3</span>
              <h3 className="font-serif text-lg font-bold text-white tracking-wide">Category Performance Ratings</h3>
            </div>

            <p className="text-slate-300 text-sm font-light">
              Please score your satisfaction across our primary service domains:
            </p>

            <div className="space-y-6 pt-2">
              
              {/* Food Quality */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5 text-left">
                  <h4 className="font-serif text-sm font-bold text-white">⭐ Food Quality & Taste</h4>
                  <p className="text-slate-500 text-[11px] font-mono uppercase tracking-widest">Aroma, spice blend, and temperature standards</p>
                </div>
                {renderStars(foodQuality, foodHover, setFoodQuality, setFoodHover)}
              </div>

              {/* Service Quality */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-white/5">
                <div className="space-y-0.5 text-left">
                  <h4 className="font-serif text-sm font-bold text-white">⭐ Service Quality & Timeliness</h4>
                  <p className="text-slate-500 text-[11px] font-mono uppercase tracking-widest">Delivery punctuality and smooth hospitality flow</p>
                </div>
                {renderStars(serviceQuality, serviceHover, setServiceQuality, setServiceHover)}
              </div>

              {/* Staff Behaviour */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-white/5">
                <div className="space-y-0.5 text-left">
                  <h4 className="font-serif text-sm font-bold text-white">⭐ Staff Behaviour & Manners</h4>
                  <p className="text-slate-500 text-[11px] font-mono uppercase tracking-widest">Elite waiter etiquette, response, and assistance</p>
                </div>
                {renderStars(staffBehaviour, staffHover, setStaffBehaviour, setStaffHover)}
              </div>

              {/* Hygiene */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-white/5">
                <div className="space-y-0.5 text-left">
                  <h4 className="font-serif text-sm font-bold text-white">⭐ Hygiene & Cleanliness</h4>
                  <p className="text-slate-500 text-[11px] font-mono uppercase tracking-widest">Chef sanitization, safe prep, and layout neatness</p>
                </div>
                {renderStars(hygieneCleanliness, hygieneHover, setHygieneCleanliness, setHygieneHover)}
              </div>

              {/* Presentation */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-white/5">
                <div className="space-y-0.5 text-left">
                  <h4 className="font-serif text-sm font-bold text-white">⭐ Presentation & Setup Aesthetics</h4>
                  <p className="text-slate-500 text-[11px] font-mono uppercase tracking-widest">Plating artistry, luxury gold themes, and buffet décor</p>
                </div>
                {renderStars(presentationSetup, presentationHover, setPresentationSetup, setPresentationHover)}
              </div>

            </div>
          </div>

          {/* SECTION 4: CLIENT TESTIMONIAL */}
          <div className="rounded-2xl glass-card p-6 sm:p-8 space-y-6 shadow-xl relative z-10">
            <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7C3AED]/20 text-[#7C3AED] text-xs font-bold">4</span>
              <h3 className="font-serif text-lg font-bold text-white tracking-wide">Detailed Opinion</h3>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                Your Detailed Experience Review
              </label>
              <textarea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your detailed opinion about our menu, service flow, setup coordination, food quality and overall experience."
                className="w-full rounded-xl glass-input p-4 text-sm text-white placeholder-slate-600 focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
              />
            </div>
          </div>

          {/* SECTION 5: SATISFACTION EMOJIS */}
          <div className="rounded-2xl glass-card p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7C3AED]/20 text-[#7C3AED] text-xs font-bold">5</span>
              <h3 className="font-serif text-lg font-bold text-white tracking-wide">Overall Satisfaction</h3>
            </div>

            <p className="text-slate-300 text-sm font-light text-center">
              Please pick your absolute feeling regarding the entire food and catering coordination:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
              {emojis.map((emoji) => {
                const isSelected = satisfactionEmoji === emoji.label;
                return (
                  <button
                    key={emoji.value}
                    type="button"
                    onClick={() => setSatisfactionEmoji(emoji.label)}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center space-y-2 transition-all duration-300 ${
                      isSelected
                        ? "bg-[#7C3AED]/25 border-[#7C3AED] shadow-[0_0_15px_rgba(124,58,237,0.3)] text-white scale-[1.05]"
                        : "bg-[#050B24] border-white/10 text-slate-400 hover:border-[#7C3AED]/30 hover:text-white"
                    }`}
                  >
                    <span className="text-3xl filter drop-shadow-md transform hover:scale-115 transition-transform duration-200">
                      {emoji.scale}
                    </span>
                    <span className="text-[10px] font-mono text-center tracking-tight leading-snug">
                      {emoji.label.split(" ")[1] || emoji.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ERROR STATUS BLOCK */}
          {errorMessage && (
            <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs sm:text-sm font-mono text-center">
              ⚠️ {errorMessage}
            </div>
          )}

          {/* SECTION 6: SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl font-bold tracking-widest uppercase text-xs text-white shadow-xl flex items-center justify-center space-x-2 transition-all ${
              isSubmitting
                ? "bg-purple-900/60 cursor-not-allowed"
                : "bg-gradient-to-r from-[#7C3AED] to-purple-800 hover:from-[#6D28D9] hover:to-purple-900 shadow-purple-900/20 hover:shadow-purple-900/35 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Recording in Secure Server...</span>
              </>
            ) : (
              <span>Submit Experience Review</span>
            )}
          </button>

        </form>

      </div>
    </div>
  );
}
