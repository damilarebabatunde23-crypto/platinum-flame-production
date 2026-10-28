export const stagesData = [
  {
    id: "stage-01",
    name: "STAGE 01: THE FORGE",
    type: "Virtual Production & LED Volume",
    dimensions: "28,000 SQ FT",
    height: "50.0 FT CLEARANCE",
    power: "12,000 AMPS SILENT",
    acousticRating: "NC-15 CERTIFIED",
    description: "Our flagship virtual production volume featuring an expansive curved 270° ROE Visual Ruby 2.3mm LED wall, automated motorized ceiling panels, and real-time Unreal Engine 5.5 parallax tracking.",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1200&auto=format&fit=crop",
    hotspots: [
      { id: "led-wall", x: 42, y: 38, title: "ROE Visual Ruby 2.3mm LED Wall", desc: "180ft perimeter curved volume with HDR ultra-low latency processing" },
      { id: "ceiling", x: 50, y: 18, title: "Motorized Lighting Panels", desc: "Dynamic DMX ambient sky panels matching live virtual environments" },
      { id: "mocap", x: 65, y: 52, title: "Vicon Vantage MoCap System", desc: "48 optical camera tracking array for sub-millimeter camera registration" },
      { id: "crane", x: 30, y: 68, title: "Supertechno 50 Telescopic Crane", desc: "Full motion-controlled high-speed robotic camera path repeatability" }
    ],
    features: [
      "180-ft Curved LED Volume (ROE Visual 2.3mm)",
      "48-Camera Vicon Optical Camera Tracking",
      "NC-15 Ultra-Silent Acoustic Envelope",
      "Direct Drive-In Elephant Door (24' x 20')",
      "Dedicated High-Speed Fiber Pipe (100 Gbps to Post)"
    ]
  },
  {
    id: "stage-02",
    name: "STAGE 02: THE TITAN TANK",
    type: "Hydrodynamic Water Stage & VFX",
    dimensions: "34,000 SQ FT",
    height: "55.0 FT CLEARANCE",
    power: "10,000 AMPS",
    acousticRating: "NC-18 ACOUSTIC",
    description: "A monumental water-equipped soundstage with an in-ground heated 1.2-million-gallon filtration tank, underwater camera tracking windows, and hydraulic wave generation.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
    hotspots: [
      { id: "tank", x: 50, y: 60, title: "1.2M Gallon Subterranean Tank", desc: "Crystal clear heated filtered water with motorized false bottom" },
      { id: "wave-maker", x: 75, y: 45, title: "Pneumatic Surge Generators", desc: "Simulates open ocean swells up to 8 feet with laminar flow pumps" },
      { id: "gantry", x: 35, y: 25, title: "Heavy Rigging Overhead Gantry", desc: "Supports 40-ton gimbaled maritime ship sets and green screen spans" }
    ],
    features: [
      "Heated 1.2M Gallon Dive & Action Tank",
      "Dual Optical Underwater Camera Viewing Ports",
      "Heavy Load Gantry (40-Ton Capacity)",
      "Dedicated Dive Master & Lifeguard Safety Suites",
      "Surrounding 360° Wet Green Screen Wall"
    ]
  },
  {
    id: "stage-03",
    name: "STAGE 03: THE MEGA LOT",
    type: "Massive Clear-Span Practical Stage",
    dimensions: "45,000 SQ FT",
    height: "62.0 FT CLEARANCE",
    power: "16,000 AMPS",
    acousticRating: "NC-15 CERTIFIED",
    description: "One of the largest column-free soundstages in North America. Designed for colossal practical set construction, full-scale aircraft fuselages, and multi-story architectural environments.",
    image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?q=80&w=1200&auto=format&fit=crop",
    hotspots: [
      { id: "clear-span", x: 50, y: 35, title: "Column-Free Clear Span", desc: "Zero obstruction interior engineered for complex sweeping crane trajectories" },
      { id: "rigging", x: 25, y: 20, title: "Full Walkway Catwalk Grid", desc: "Heavy structural steel grid with 300 lbs/sq ft point load capacity" }
    ],
    features: [
      "45,000 sq ft Continuous Polished Concrete Floor",
      "62 ft Clear Hook Height to Catwalks",
      "Dual Drive-Through Soundproof Elephant Doors",
      "Adjacent 20,000 sq ft Mill & Scenic Shop",
      "Integrated Production Office Annex"
    ]
  },
  {
    id: "stage-04",
    name: "STAGE 04: THE ARCTIC OUTPOST",
    type: "Climate & Environmental Chamber",
    dimensions: "22,000 SQ FT",
    height: "42.0 FT CLEARANCE",
    power: "8,000 AMPS",
    acousticRating: "NC-15 CERTIFIED",
    description: "Specialized cold-room stage capable of maintaining sub-zero temperatures for authentic actor breath condensation, real ice formation, and indoor blizzard simulation.",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1200&auto=format&fit=crop",
    hotspots: [
      { id: "cryo", x: 45, y: 40, title: "Industrial Cryogenic Chillers", desc: "Can drop stage temperature to 15°F (-9°C) in under 4 hours" },
      { id: "snow", x: 70, y: 30, title: "Overhead Snow Turbines", desc: "Generates real biocompatible snow crystals at production scale" }
    ],
    features: [
      "Temperature Control (-10°C to +35°C)",
      "High-Volume Air Filtration & Fog Evacuation",
      "Slip-Resistant Sealed Stage Floor",
      "Actor Heated Warming Green Rooms Adjacent"
    ]
  }
];

export const globalHubsData = [
  {
    id: "new-york",
    name: "NEW YORK (GLOBAL HEADQUARTERS)",
    city: "New York, NY",
    country: "United States",
    badge: "GLOBAL HEADQUARTERS",
    taxCredit: "Up to 30% New York State Film Production Tax Credit",
    stages: "6 Soundstages (140,000 sq ft total)",
    facilities: "Executive Production Suites, LED Volume, VIP Bungalows, Dolby Atmos Mix Stage",
    address: "1809 Forest Avenue, New York, NY 10001 USA",
    phone: "+1 907-205-2163",
    email: "mypersonalemailboxln@gmail.com",
    coordinates: "40.7128° N, 74.0060° W",
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "london",
    name: "LONDON (PINEWOOD GATE 12)",
    city: "Iver Heath, Buckinghamshire",
    country: "United Kingdom",
    badge: "EUROPEAN HUB",
    taxCredit: "Up to 34% UK Audio-Visual Expenditure Credit (AVEC)",
    stages: "4 Purpose Stages + Dedicated Water Tank Lot",
    facilities: "Historical Armory, Costume Ateliers, DCI Color Lab",
    address: "Pinewood Studios, Pinewood Rd, Iver Heath SL0 0NH",
    phone: "+1 907-205-2163",
    email: "mypersonalemailboxln@gmail.com",
    coordinates: "51.5478° N, 0.5348° W",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "tokyo",
    name: "TOKYO ATELIER (ROPPONGI)",
    city: "Minato-ku, Tokyo",
    country: "Japan",
    badge: "ASIA-PACIFIC DIVISION",
    taxCredit: "Up to 50% J-LOD Government Incentive Support",
    stages: "2 High-Tech Virtual Production Soundstages",
    facilities: "Motion Capture Laboratory, Anime/CGI Hybrid Studio",
    address: "6-10-1 Roppongi, Minato City, Tokyo 106-6108",
    phone: "+1 907-205-2163",
    email: "mypersonalemailboxln@gmail.com",
    coordinates: "35.6628° N, 139.7312° E",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "reykjavik",
    name: "REYKJAVIK & NORDIC UNIT",
    city: "Reykjavik",
    country: "Iceland",
    badge: "EXPEDITION BASECAMP",
    taxCredit: "35% Icelandic Film Rebate on Local Spend",
    stages: "Glacial & Volcanic Tactical Expedition Hangar",
    facilities: "All-Terrain Mobile Film Fleet, Arctic Basecamp Units",
    address: "Grandagarður 14, 101 Reykjavík, Iceland",
    phone: "+1 907-205-2163",
    email: "mypersonalemailboxln@gmail.com",
    coordinates: "64.1466° N, 21.9426° W",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "wellington",
    name: "WELLINGTON & OCEANIC UNIT",
    city: "Miramar, Wellington",
    country: "New Zealand",
    badge: "PACIFIC LOT",
    taxCredit: "40% New Zealand Screen Production Grant",
    stages: "Coastal Soundstage Lot & Miniature VFX Works",
    facilities: "Creature FX Shop, High-Resolution Photogrammetry",
    address: "Park Road, Miramar, Wellington 6022, New Zealand",
    phone: "+1 907-205-2163",
    email: "mypersonalemailboxln@gmail.com",
    coordinates: "41.3142° S, 174.8219° E",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=800&auto=format&fit=crop"
  }
];

export const studioAmenitiesData = [
  {
    icon: "Hammer",
    title: "Mill & Fabrication Shops",
    desc: "40,000 sq ft dedicated mill spaces adjacent to each stage. Equipped with industrial CNC routing, automated paint booths, welding stations, and 5-ton overhead hoists."
  },
  {
    icon: "Shield",
    title: "V.I.P. Dressing Suites & Bungalows",
    desc: "Private luxury dressing suites featuring private en-suite spa bathrooms, acoustic privacy walls, dedicated high-security entrances, and live 4K stage monitoring."
  },
  {
    icon: "Briefcase",
    title: "Luxury Executive Offices",
    desc: "Turnkey multi-room executive production office complexes equipped with 10 Gbps symmetric dark fiber, secure boardroom video conferencing, and executive dining."
  },
  {
    icon: "Lock",
    title: "TISAX Digital Dailies Vaults",
    desc: "High-security digital storage rooms certified for MPAA and TISAX Tier 3 requirements with biometric access, dual-custody safe locks, and automated tape backup."
  }
];
