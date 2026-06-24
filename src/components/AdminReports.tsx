import React, { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  Star, 
  Award, 
  Download, 
  Printer, 
  Search, 
  Filter, 
  ArrowUpDown, 
  RefreshCw,
  Lock,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  Sparkles
} from "lucide-react";
import { Review } from "../types";

interface AdminReportsProps {
  reviews: Review[];
  onRefresh: () => void;
  isRefreshing: boolean;
  onResetDatabase: () => void;
}

export default function AdminReports({ reviews, onRefresh, isRefreshing, onResetDatabase }: AdminReportsProps) {
  // Filters & sorting
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortField, setSortField] = useState<"clientName" | "eventDate" | "overallRating" | "npsScore">("eventDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Calculations
  const totalReviews = reviews.length;

  const getOverallRating = (rev: Review) => {
    return (
      (rev.foodQuality + 
       rev.serviceQuality + 
       rev.staffBehaviour + 
       rev.hygieneCleanliness + 
       rev.presentationSetup) / 5
    );
  };

  // 1. Average Overall Rating
  const avgOverallRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + getOverallRating(r), 0) / totalReviews).toFixed(2)
    : "0.00";

  // 2. Average NPS Score
  const avgNpsScore = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.npsScore, 0) / totalReviews).toFixed(1)
    : "0.0";

  // 3. Promoters (9-10), Passives (7-8), Detractors (0-6)
  const promoters = reviews.filter(r => r.npsScore >= 9).length;
  const passives = reviews.filter(r => r.npsScore >= 7 && r.npsScore <= 8).length;
  const detractors = reviews.filter(r => r.npsScore <= 6).length;

  // 4. Customer Satisfaction % (Promoters + Passives as percentage)
  const satisfactionPct = totalReviews > 0
    ? Math.round(((promoters + passives) / totalReviews) * 100)
    : 0;

  // 5. Positive vs Negative reviews
  // Positive: Overall Rating >= 4.0; Negative: Overall Rating < 3.0; Neutral: 3.0 to 3.9
  const positiveCount = reviews.filter(r => getOverallRating(r) >= 4).length;
  const negativeCount = reviews.filter(r => getOverallRating(r) < 3.0).length;

  // --- CHART 1: RATING DISTRIBUTION (BAR CHART) ---
  // Compile count of average rating rounded to integer 1-5
  const distributionCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
    const rounded = Math.round(getOverallRating(r)) as 1 | 2 | 3 | 4 | 5;
    if (distributionCounts[rounded] !== undefined) {
      distributionCounts[rounded]++;
    }
  });

  const ratingDistributionData = [
    { name: "5 Star", count: distributionCounts[5] },
    { name: "4 Star", count: distributionCounts[4] },
    { name: "3 Star", count: distributionCounts[3] },
    { name: "2 Star", count: distributionCounts[2] },
    { name: "1 Star", count: distributionCounts[1] },
  ];

  // --- CHART 2: CATEGORY PERFORMANCE (HORIZONTAL BAR CHART) ---
  const getCategoryAvg = (field: keyof Review) => {
    if (totalReviews === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + (r[field] as number), 0);
    return Number((sum / totalReviews).toFixed(2));
  };

  const categoryPerformanceData = [
    { name: "Food Quality", score: getCategoryAvg("foodQuality") },
    { name: "Service Quality", score: getCategoryAvg("serviceQuality") },
    { name: "Staff Behaviour", score: getCategoryAvg("staffBehaviour") },
    { name: "Hygiene & Clean", score: getCategoryAvg("hygieneCleanliness") },
    { name: "Presentation Setup", score: getCategoryAvg("presentationSetup") },
  ];

  // --- CHART 3: NPS SPLIT (PIE CHART) ---
  const npsPieData = [
    { name: "Promoters (9-10)", value: promoters, color: "#10B981" }, // Green
    { name: "Passives (7-8)", value: passives, color: "#F59E0B" }, // Amber
    { name: "Detractors (0-6)", value: detractors, color: "#EF4444" }, // Red
  ];

  // --- CHART 4: MONTHLY REVIEW TRENDS (LINE CHART) ---
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyData = monthNames.map((month, idx) => {
    // Filter reviews matching month idx (0-11)
    const monthReviews = reviews.filter(r => {
      const d = new Date(r.eventDate);
      return d.getMonth() === idx;
    });

    const count = monthReviews.length;
    const avgRating = count > 0
      ? Number((monthReviews.reduce((acc, r) => acc + getOverallRating(r), 0) / count).toFixed(2))
      : 0;

    return {
      name: month,
      "Reviews Count": count,
      "Average Rating": avgRating
    };
  });

  // --- EXPORT TRIGGERS (PDF / EXCEL CSV) ---
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCSV = () => {
    if (totalReviews === 0) return;
    
    // Construct CSV Header
    const headers = ["Client Name", "Event Name", "Event Date", "Event Type", "NPS Score", "Food Quality", "Service Quality", "Staff Behaviour", "Hygiene & Cleanliness", "Presentation & Setup", "Overall Star Rating", "Satisfaction Emoji", "Detailed Comment"];
    const rows = reviews.map(r => [
      `"${r.clientName.replace(/"/g, '""')}"`,
      `"${r.eventName.replace(/"/g, '""')}"`,
      r.eventDate,
      `"${r.eventType}"`,
      r.npsScore,
      r.foodQuality,
      r.serviceQuality,
      r.staffBehaviour,
      r.hygieneCleanliness,
      r.presentationSetup,
      getOverallRating(r).toFixed(2),
      `"${r.satisfactionEmoji}"`,
      `"${r.comment.replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Velyxo_Catering_Feedback_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter & Sort Table reviews
  const filteredReviews = reviews.filter(r => {
    const matchesSearch = 
      r.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === "All" || r.eventType === typeFilter;

    return matchesSearch && matchesType;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    let valA: any = a[sortField as keyof Review] ?? 0;
    let valB: any = b[sortField as keyof Review] ?? 0;

    if (sortField === "overallRating") {
      valA = getOverallRating(a);
      valB = getOverallRating(b);
    }

    if (typeof valA === "string") {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const toggleSort = (field: "clientName" | "eventDate" | "overallRating" | "npsScore") => {
    if (sortField === field) {
      setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="bg-[#050B24] min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8 print:bg-white print:text-black">
      <div className="mx-auto max-w-7xl space-y-12">
        
        {/* Header Title with Access Warning */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/10 pb-6 gap-4 print:hidden">
          <div className="text-left space-y-2">
            <div className="inline-flex items-center space-x-1.5 text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-3 py-1 rounded-full">
              <Lock className="h-3.5 w-3.5" />
              <span>Restricted: Executive Administration Portal</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Catering Feedback Reports
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-light">
              Real-time statistical breakdown of VELYXO FOODS client experience metrics.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-white/5 px-4 py-2.5 text-xs font-mono tracking-wider uppercase text-slate-300 hover:border-[#D4AF37] hover:text-white disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleDownloadCSV}
              className="inline-flex items-center space-x-1.5 rounded-lg bg-[#7C3AED] px-4 py-2.5 text-xs font-mono tracking-wider uppercase text-white hover:bg-[#6D28D9] shadow-lg shadow-[#7C3AED]/20"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 rounded-lg border border-[#D4AF37] bg-[#D4AF37]/5 px-4 py-2.5 text-xs font-mono tracking-wider uppercase text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#050B24] transition-all"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print PDF</span>
            </button>
          </div>
        </div>

        {/* PRINT ONLY HEADER */}
        <div className="hidden print:block text-center space-y-2 pb-6 border-b border-slate-300">
          <h1 className="font-serif text-3xl font-bold tracking-widest text-black">VELYXO FOODS LLP</h1>
          <h2 className="text-xs font-mono tracking-widest text-slate-600 uppercase">Luxury Hospitality Experience Report</h2>
          <p className="text-[10px] text-slate-500 font-mono">Report Generated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* --- SUMMARY CARDS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Total Reviews Card */}
          <div className="rounded-xl glass-card p-6 flex flex-col justify-between text-left shadow-lg">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Total Feedbacks</span>
              <h2 className="text-3xl font-serif font-extrabold text-[#D4AF37] mt-1">{totalReviews}</h2>
            </div>
            <div className="pt-3 border-t border-white/5 mt-4 text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
              <CheckCircle className="h-3.5 w-3.5" />
              <span>100% Secure Records</span>
            </div>
          </div>

          {/* Average Overall Rating Card */}
          <div className="rounded-xl glass-card p-6 flex flex-col justify-between text-left shadow-lg">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Overall Star Score</span>
              <div className="flex items-baseline space-x-1 mt-1">
                <h2 className="text-3xl font-serif font-extrabold text-white">{avgOverallRating}</h2>
                <span className="text-xs text-slate-500">/ 5.0</span>
              </div>
            </div>
            <div className="pt-3 border-t border-white/5 mt-4 text-[10px] font-mono text-[#D4AF37] flex items-center space-x-1">
              <Star className="h-3.5 w-3.5 fill-[#D4AF37]" />
              <span>Elite Five Star Protocol</span>
            </div>
          </div>

          {/* Average NPS Score Card */}
          <div className="rounded-xl glass-card p-6 flex flex-col justify-between text-left shadow-lg">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Net Promoter Index</span>
              <div className="flex items-baseline space-x-1 mt-1">
                <h2 className="text-3xl font-serif font-extrabold text-[#7C3AED]">{avgNpsScore}</h2>
                <span className="text-xs text-slate-500">/ 10.0</span>
              </div>
            </div>
            <div className="pt-3 border-t border-white/5 mt-4 text-[10px] font-mono text-purple-400">
              {promoters} Promoters, {detractors} Detractors
            </div>
          </div>

          {/* Satisfaction Meter Card */}
          <div className="rounded-xl glass-card p-6 flex flex-col justify-between text-left shadow-lg relative overflow-hidden">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Customer Satisfaction %</span>
              <h2 className="text-3xl font-serif font-extrabold text-emerald-400 mt-1">{satisfactionPct}%</h2>
            </div>
            <div className="pt-3 border-t border-white/5 mt-4 text-[10px] font-mono text-slate-400 flex items-center justify-between">
              <span>Positives: {positiveCount}</span>
              <span className="text-red-400">Negatives: {negativeCount}</span>
            </div>
          </div>

        </div>

        {/* --- GRAPHS SECTION 1 --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chart 1: Rating Distribution (Bar Chart) */}
          <div className="rounded-2xl glass-card p-6 text-left shadow-xl">
            <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-6">
              Overall Star Distribution
            </h3>
            <div className="h-[260px] w-full">
              {totalReviews > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ratingDistributionData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} allowDecimals={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#09102c", borderColor: "#D4AF37", borderRadius: "10px" }}
                      itemStyle={{ color: "#fff", fontSize: "11px" }}
                    />
                    <Bar dataKey="count" fill="url(#ratingGrad)" radius={[4, 4, 0, 0]}>
                      {ratingDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? "#D4AF37" : "#7C3AED"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-500 font-mono">
                  No Feedback Data Recorded Yet
                </div>
              )}
            </div>
          </div>

          {/* Chart 2: Category Performance (Horizontal Bar Chart) */}
          <div className="rounded-2xl glass-card p-6 text-left shadow-xl">
            <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-6">
              Category Score Breakdown
            </h3>
            <div className="h-[260px] w-full">
              {totalReviews > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={categoryPerformanceData} 
                    layout="vertical"
                    margin={{ top: 10, right: 10, left: 15, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis type="number" domain={[0, 5]} stroke="#94A3B8" fontSize={11} tickLine={false} />
                    <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={11} tickLine={false} width={100} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#09102c", borderColor: "#D4AF37", borderRadius: "10px" }}
                      itemStyle={{ color: "#fff", fontSize: "11px" }}
                    />
                    <Bar dataKey="score" fill="#D4AF37" radius={[0, 4, 4, 0]} barSize={15}>
                      {categoryPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#D4AF37" opacity={0.6 + (index * 0.1)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-500 font-mono">
                  No Feedback Data Recorded Yet
                </div>
              )}
            </div>
          </div>

        </div>

        {/* --- GRAPHS SECTION 2 --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Chart 3: NPS Slice Pie Chart */}
          <div className="rounded-2xl glass-card p-6 text-left shadow-xl lg:col-span-1">
            <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-6">
              NPS Group Segmentation
            </h3>
            <div className="h-[240px] w-full relative flex items-center justify-center">
              {totalReviews > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={npsPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {npsPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#09102c", borderColor: "#D4AF37", borderRadius: "10px" }}
                      itemStyle={{ color: "#fff", fontSize: "11px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-xs text-slate-500 font-mono">No Data</div>
              )}
              {/* Pie center stat */}
              <div className="absolute text-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Avg NPS</span>
                <p className="text-xl font-serif font-bold text-white">{avgNpsScore}</p>
              </div>
            </div>

            {/* Custom Legend */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              {npsPieData.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs text-slate-400">
                  <div className="flex items-center space-x-1.5">
                    <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-mono text-slate-200">
                    {item.value} ({totalReviews > 0 ? Math.round((item.value / totalReviews) * 100) : 0}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart 4: Monthly Trends (Line Chart) */}
          <div className="rounded-2xl glass-card p-6 text-left shadow-xl lg:col-span-2">
            <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-6">
              Monthly Evaluation Trends (2026)
            </h3>
            <div className="h-[300px] w-full">
              {totalReviews > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                    <YAxis yAxisId="left" stroke="#D4AF37" fontSize={11} tickLine={false} allowDecimals={false} />
                    <YAxis yAxisId="right" orientation="right" stroke="#7C3AED" fontSize={11} tickLine={false} domain={[0, 5]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#09102c", borderColor: "#D4AF37", borderRadius: "10px" }}
                      itemStyle={{ color: "#fff", fontSize: "11px" }}
                    />
                    <Legend verticalAlign="top" height={36} iconType="circle" fontSize={11} />
                    <Line yAxisId="left" type="monotone" dataKey="Reviews Count" stroke="#D4AF37" strokeWidth={2.5} activeDot={{ r: 6 }} />
                    <Line yAxisId="right" type="monotone" dataKey="Average Rating" stroke="#7C3AED" strokeWidth={2.5} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-500 font-mono">
                  No Feedback Data Recorded Yet
                </div>
              )}
            </div>
          </div>

        </div>

        {/* --- RECENT REVIEWS TABLE SECTION --- */}
        <div className="rounded-2xl glass-card p-6 space-y-6 shadow-xl text-left print:hidden">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="font-serif text-lg font-bold text-white">Recent Experience Reviews</h3>
            
            {/* Search + Filter controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <Search className="h-3.5 w-3.5" />
                </span>
                <input
                  type="text"
                  placeholder="Search client/event..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-lg glass-input py-1.5 pl-8 pr-3 text-xs text-white placeholder-slate-500 focus:border-[#7C3AED] focus:outline-none w-48"
                />
              </div>

              {/* Event type filter */}
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] font-mono text-slate-400">Type:</span>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="rounded-lg glass-input py-1.5 px-2 text-xs text-white focus:border-[#7C3AED] focus:outline-none cursor-pointer"
                >
                  <option value="All" className="bg-[#050B24] text-white">All Types</option>
                  <option value="Wedding Reception" className="bg-[#050B24] text-white">Weddings</option>
                  <option value="Corporate Meeting" className="bg-[#050B24] text-white">Corp Meeting</option>
                  <option value="Conference" className="bg-[#050B24] text-white">Conference</option>
                  <option value="Birthday Party" className="bg-[#050B24] text-white">Birthday</option>
                  <option value="Private Event" className="bg-[#050B24] text-white">Private Event</option>
                  <option value="Product Launch" className="bg-[#050B24] text-white">Launch</option>
                  <option value="Annual Gathering" className="bg-[#050B24] text-white">Gala Gathering</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#050B24]/40 text-slate-400 uppercase tracking-widest font-mono text-[10px] border-b border-white/5">
                  <th className="py-4 px-4 font-semibold cursor-pointer hover:text-white" onClick={() => toggleSort("clientName")}>
                    <div className="flex items-center space-x-1">
                      <span>Client Name</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="py-4 px-4 font-semibold">Event Type</th>
                  <th className="py-4 px-4 font-semibold cursor-pointer hover:text-white" onClick={() => toggleSort("overallRating")}>
                    <div className="flex items-center space-x-1">
                      <span>Rating</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="py-4 px-4 font-semibold cursor-pointer hover:text-white" onClick={() => toggleSort("npsScore")}>
                    <div className="flex items-center space-x-1">
                      <span>NPS Score</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="py-4 px-4 font-semibold cursor-pointer hover:text-white" onClick={() => toggleSort("eventDate")}>
                    <div className="flex items-center space-x-1">
                      <span>Event Date</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="py-4 px-4 font-semibold">Comment Preview</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-light">
                {sortedReviews.length > 0 ? (
                  sortedReviews.map((r) => {
                    const rating = getOverallRating(r);
                    return (
                      <tr key={r.id} className="hover:bg-white/2 transition-colors">
                        <td className="py-3 px-4 font-medium text-white">
                          <div className="font-serif font-bold text-slate-200">{r.clientName}</div>
                          <span className="text-[10px] text-slate-500 font-mono">{r.eventName}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex rounded-full bg-slate-800 px-2 py-0.5 text-[9px] font-mono tracking-wider text-slate-300">
                            {r.eventType}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono">
                          <div className="flex items-center space-x-1 text-[#D4AF37]">
                            <Star className="h-3.5 w-3.5 fill-[#D4AF37]" />
                            <span className="font-bold">{rating.toFixed(1)}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono">
                          <span className={`font-bold ${r.npsScore >= 9 ? "text-emerald-400" : r.npsScore >= 7 ? "text-amber-400" : "text-red-400"}`}>
                            {r.npsScore}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400 font-mono">{r.eventDate}</td>
                        <td className="py-3 px-4 text-slate-400 max-w-xs truncate" title={r.comment}>
                          {r.comment || <span className="italic text-slate-600">No comment left</span>}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500 font-mono">
                      No matching reviews found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Count Details */}
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
            <span>Showing {sortedReviews.length} of {totalReviews} reviews</span>
            <button
              onClick={onResetDatabase}
              className="text-[9px] hover:text-red-400 transition-colors uppercase border border-red-900/40 px-2 py-1 rounded"
              title="Restores default pre-seeded feedback data"
            >
              Reset to Defaults
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
