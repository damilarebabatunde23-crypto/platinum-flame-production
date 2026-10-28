/**
 * mediaAssets.js
 * Central registry of all live-action cinematic video and high-res actor photography
 * used throughout PLATINUM FLAME PRODUCTION LLC.
 *
 * All videos are strictly high-intensity human action films (John Wick style gun-fu,
 * tactical breaches, vehicle pursuits, martial arts combat, and explosive stunts).
 */

// ─────────────────────────────────────────────────────────────
// HOMEPAGE HERO VIDEO OPTIONS (Human Action Blockbusters like John Wick)
// ─────────────────────────────────────────────────────────────
export const heroVideoOptions = [
  {
    id: "john-wick-tactical",
    name: "01. APEX PROTOCOL: URBAN BREACH",
    genre: "Tactical Action / Gun-Fu",
    tagline: "STARRING CHRISTIAN BALE • CATE BLANCHETT • CILLIAN MURPHY",
    src: "/videos/action-tactical.mp4",
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=85&w=2000&auto=format&fit=crop",
    desc: "Visceral close-quarters combat and room-clearing tactical operations filmed on ARRI ALEXA 65 in 70mm."
  },
  {
    id: "firearm-combat",
    name: "02. THE OBSIDIAN RECKONING",
    genre: "High-Octane Assassin Action",
    tagline: "STARRING KEANU REEVES • CHARLIZE THERON • OSCAR ISAAC",
    src: "/videos/action-gun.mp4",
    poster: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=85&w=2000&auto=format&fit=crop",
    desc: "Lightning-fast gun-fu choreography, tactical reloads, and relentless close-range firearm duels."
  },
  {
    id: "special-ops-pursuit",
    name: "03. ARCTIC SIEGE: ZERO HOUR",
    genre: "Special Ops Warfare",
    tagline: "STARRING LEONARDO DICAPRIO • ZENDAYA • MICHAEL B. JORDAN",
    src: "/videos/action-soldier.mp4",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=85&w=2000&auto=format&fit=crop",
    desc: "Heavy artillery engagements, tactical perimeter sweeps, and high-stakes special operations."
  },
  {
    id: "hand-to-hand-combat",
    name: "04. MARTIAL REIGN: BLOOD STEEL",
    genre: "Martial Arts Combat",
    tagline: "STARRING HIROYUKI SANADA • DONNIE YEN • KEN WATANABE",
    src: "/videos/action-combat.mp4",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=85&w=2000&auto=format&fit=crop",
    desc: "World-class stunt coordination, bone-crushing martial arts choreography, and practical combat."
  }
];

export const homeHeroVideo = heroVideoOptions[0].src;
export const homeHeroFallback = heroVideoOptions[0].poster;

// Middle Theatre Video
export const homeReelVideo = "/videos/action-tactical.mp4";
export const homeReelFallback = "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=85&w=2000&auto=format&fit=crop";

export const homeCTAVideo = "/videos/action-explosion.mp4";
export const homeCTAFallback = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=85&w=2000&auto=format&fit=crop";

// Film card preview video loops (used on hover) - 100% Real Human Action Footage
export const filmPreviewVideos = [
  "/videos/action-tactical.mp4",
  "/videos/action-gun.mp4",
  "/videos/action-soldier.mp4",
  "/videos/action-combat.mp4",
  "/videos/action-gun2.mp4",
  "/videos/action-explosion.mp4",
  "/videos/action-police.mp4",
  "/videos/action-pursuit.mp4"
];

// Page Hero Videos (All Human Action)
export const aboutHeroVideo = "/videos/action-tactical.mp4";
export const aboutHeroFallback = "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=85&w=2000&auto=format&fit=crop";

export const servicesHeroVideo = "/videos/action-soldier.mp4";
export const servicesHeroFallback = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=85&w=2000&auto=format&fit=crop";

export const locationsHeroVideo = "/videos/action-police.mp4";
export const locationsHeroFallback = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=85&w=2000&auto=format&fit=crop";

export const filmsHeroVideo = "/videos/action-gun.mp4";
export const filmsHeroFallback = "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=85&w=2000&auto=format&fit=crop";
