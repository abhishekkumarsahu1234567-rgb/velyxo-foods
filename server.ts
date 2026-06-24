import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DATA_FILE_PATH = path.join(process.cwd(), "reviews-data.json");

// Pre-seeded reviews spanning various months of 2026
const DEFAULT_REVIEWS = [
  {
    id: "rev-1",
    eventName: "TechInnovate Annual Summit",
    clientName: "Eleanor Vance (VP, Google Cloud)",
    eventDate: "2026-01-15",
    eventType: "Conference",
    npsScore: 10,
    foodQuality: 5,
    serviceQuality: 5,
    staffBehaviour: 5,
    hygieneCleanliness: 5,
    presentationSetup: 5,
    comment: "VELYXO foods completely transformed our event. The caviar station and customized keto platters were the highlight of the evening. Truly a five-star hotel level performance.",
    satisfactionEmoji: "🤩 Extremely Satisfied",
    createdAt: "2026-01-15T18:30:00.000Z"
  },
  {
    id: "rev-2",
    eventName: "Aditya & Meera's Wedding Reception",
    clientName: "Aditya Roy",
    eventDate: "2026-02-14",
    eventType: "Wedding Reception",
    npsScore: 10,
    foodQuality: 5,
    serviceQuality: 5,
    staffBehaviour: 5,
    hygieneCleanliness: 5,
    presentationSetup: 5,
    comment: "Exceptional service! The gold-plated presentation, gourmet Indian fusion food, and unmatched attentiveness of the team left all 400 guests speechless. Highly recommended!",
    satisfactionEmoji: "🤩 Extremely Satisfied",
    createdAt: "2026-02-14T22:15:00.000Z"
  },
  {
    id: "rev-3",
    eventName: "Apex Ventures Q1 Board Dinner",
    clientName: "David Sterling",
    eventDate: "2026-03-10",
    eventType: "Corporate Meeting",
    npsScore: 9,
    foodQuality: 5,
    serviceQuality: 4,
    staffBehaviour: 5,
    hygieneCleanliness: 5,
    presentationSetup: 4,
    comment: "Very elegant setup and superb food preparation. The chef was friendly and explained each course in detail. One of the best high-end catering partners in the region.",
    satisfactionEmoji: "😊",
    createdAt: "2026-03-10T21:00:00.000Z"
  },
  {
    id: "rev-4",
    eventName: "Seraphina Yacht VIP Launch",
    clientName: "Sophia Loren",
    eventDate: "2026-04-05",
    eventType: "Product Launch",
    npsScore: 10,
    foodQuality: 5,
    serviceQuality: 5,
    staffBehaviour: 5,
    hygieneCleanliness: 5,
    presentationSetup: 5,
    comment: "They handled our high-security private yacht launch perfectly. The bespoke molecular gastronomy stations were incredibly impressive. Outstanding staff discipline.",
    satisfactionEmoji: "🤩 Extremely Satisfied",
    createdAt: "2026-04-05T23:00:00.000Z"
  },
  {
    id: "rev-5",
    eventName: "Greenfield Annual Board Gala",
    clientName: "Jonathan Gable",
    eventDate: "2026-05-18",
    eventType: "Annual Gathering",
    npsScore: 8,
    foodQuality: 4,
    serviceQuality: 4,
    staffBehaviour: 4,
    hygieneCleanliness: 5,
    presentationSetup: 4,
    comment: "Satisfying service overall. The hygiene standards were exemplary, which was our priority. Food was delicious and delivered right on time.",
    satisfactionEmoji: "😊",
    createdAt: "2026-05-18T19:45:00.000Z"
  },
  {
    id: "rev-6",
    eventName: "Gilded Petals Birthday Soiree",
    clientName: "Victoria Thorne",
    eventDate: "2026-06-12",
    eventType: "Birthday Party",
    npsScore: 9,
    foodQuality: 5,
    serviceQuality: 5,
    staffBehaviour: 4,
    hygieneCleanliness: 5,
    presentationSetup: 5,
    comment: "The presentation and setup was stunning - filled with gold accents that fit my theme perfectly. Food tasted sublime. Will definitely hire again.",
    satisfactionEmoji: "🤩 Extremely Satisfied",
    createdAt: "2026-06-12T20:15:00.000Z"
  },
  {
    id: "rev-7",
    eventName: "Stellar AI Headquarters Inauguration",
    clientName: "Marcus Vance",
    eventDate: "2026-06-20",
    eventType: "Product Launch",
    npsScore: 10,
    foodQuality: 5,
    serviceQuality: 5,
    staffBehaviour: 5,
    hygieneCleanliness: 5,
    presentationSetup: 5,
    comment: "Flawless planning and impeccable luxury hospitality. Our stakeholders were extremely pleased with the modern fusion menu and fine-dining service flow.",
    satisfactionEmoji: "🤩 Extremely Satisfied",
    createdAt: "2026-06-20T17:30:00.000Z"
  },
  {
    id: "rev-8",
    eventName: "Luxury Estates Private Gala",
    clientName: "Helen Hunt",
    eventDate: "2026-02-28",
    eventType: "Private Event",
    npsScore: 7,
    foodQuality: 4,
    serviceQuality: 3,
    staffBehaviour: 4,
    hygieneCleanliness: 4,
    presentationSetup: 4,
    comment: "The food was lovely, but the drinks setup had some delay during peak hours. The staff resolved it professionally later. High hygiene standards overall.",
    satisfactionEmoji: "😐",
    createdAt: "2026-02-28T22:00:00.000Z"
  },
  {
    id: "rev-9",
    eventName: "Global Fintech Summit",
    clientName: "Robert Kiyosaki",
    eventDate: "2026-03-25",
    eventType: "Conference",
    npsScore: 9,
    foodQuality: 5,
    serviceQuality: 4,
    staffBehaviour: 5,
    hygieneCleanliness: 5,
    presentationSetup: 5,
    comment: "Splendid experience. Highly professional staff, extremely tidy hygiene protocols, and the fusion sushi bar was a major conversation starter.",
    satisfactionEmoji: "😊",
    createdAt: "2026-03-25T14:30:00.000Z"
  },
  {
    id: "rev-10",
    eventName: "Elysian Private Anniversary dinner",
    clientName: "Catherine Zeta",
    eventDate: "2026-04-22",
    eventType: "Private Event",
    npsScore: 10,
    foodQuality: 5,
    serviceQuality: 5,
    staffBehaviour: 5,
    hygieneCleanliness: 5,
    presentationSetup: 5,
    comment: "Unbelievable culinary experience. Every dish told a story. It was an extremely personalized, magical dinner setup. Deeply appreciate the efforts of Velyxo.",
    satisfactionEmoji: "🤩 Extremely Satisfied",
    createdAt: "2026-04-22T20:30:00.000Z"
  },
  {
    id: "rev-11",
    eventName: "CoreTech Networking Gala",
    clientName: "Linus T.",
    eventDate: "2026-05-02",
    eventType: "Corporate Meeting",
    npsScore: 5,
    foodQuality: 3,
    serviceQuality: 2,
    staffBehaviour: 3,
    hygieneCleanliness: 4,
    presentationSetup: 3,
    comment: "Food quality was okay, but service was too slow due to understaffing at the dessert section. Expected higher efficiency for a luxury caterer.",
    satisfactionEmoji: "😕",
    createdAt: "2026-05-02T19:00:00.000Z"
  },
  {
    id: "rev-12",
    eventName: "Silver Jubilee Celebration",
    clientName: "Pratap Singh",
    eventDate: "2026-05-24",
    eventType: "Annual Gathering",
    npsScore: 10,
    foodQuality: 5,
    serviceQuality: 5,
    staffBehaviour: 5,
    hygieneCleanliness: 5,
    presentationSetup: 5,
    comment: "Perfect execution from planning to clean-up. Handled the event with incredible grace, delicious high-end traditional recipes, and superb setups.",
    satisfactionEmoji: "🤩 Extremely Satisfied",
    createdAt: "2026-05-24T21:40:00.000Z"
  }
];

// Ensure the review JSON database file exists
function initializeDatabase() {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(DEFAULT_REVIEWS, null, 2), "utf-8");
      console.log("Database initialized with default reviews.");
    }
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
}

initializeDatabase();

// Helper to read reviews
function readReviews() {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const content = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      return JSON.parse(content);
    }
  } catch (error) {
    console.error("Error reading reviews:", error);
  }
  return DEFAULT_REVIEWS;
}

// Helper to write reviews
function writeReviews(reviews: any[]) {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(reviews, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing reviews:", error);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Route - Get all reviews
  app.get("/api/reviews", (req, res) => {
    const reviews = readReviews();
    res.json(reviews);
  });

  // API Route - Submit a review
  app.post("/api/reviews", (req, res) => {
    const newReview = req.body;
    if (!newReview.eventName || !newReview.clientName || !newReview.eventDate || !newReview.eventType) {
      return res.status(400).json({ error: "Missing required event details fields" });
    }

    const reviews = readReviews();
    const formattedReview = {
      id: `rev-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      eventName: String(newReview.eventName),
      clientName: String(newReview.clientName),
      eventDate: String(newReview.eventDate),
      eventType: String(newReview.eventType),
      npsScore: Number(newReview.npsScore) ?? 10,
      foodQuality: Number(newReview.foodQuality) ?? 5,
      serviceQuality: Number(newReview.serviceQuality) ?? 5,
      staffBehaviour: Number(newReview.staffBehaviour) ?? 5,
      hygieneCleanliness: Number(newReview.hygieneCleanliness) ?? 5,
      presentationSetup: Number(newReview.presentationSetup) ?? 5,
      comment: String(newReview.comment || ""),
      satisfactionEmoji: String(newReview.satisfactionEmoji || "🤩 Extremely Satisfied"),
      createdAt: new Date().toISOString()
    };

    reviews.unshift(formattedReview);
    writeReviews(reviews);
    res.status(201).json(formattedReview);
  });

  // API Route - Reset database to default
  app.post("/api/reviews/reset", (req, res) => {
    writeReviews(DEFAULT_REVIEWS);
    res.json({ message: "Database reset to default pre-seeded state.", reviews: DEFAULT_REVIEWS });
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "localhost", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer();
