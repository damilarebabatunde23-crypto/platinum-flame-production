export const investorMetrics = {
  enterpriseValue: "$14.2B",
  equityValue: "$12.8B",
  annualRevenue: "$1.84B",
  revenueGrowth: "28% YoY Slate Growth",
  dilutedEps: "$1.42",
  epsBeat: "$0.80 Consensus Beat",
  freeCashFlow: "$640M",
  cashConversion: "100% Operating Cash Conversion",
  undrawnRevolver: "$500M",
  cashReserves: "$250M",
  creditRating: "AAA (TMT Bond Score)",
  ticker: "NYSE: PLFM",
  stockPrice: "$142.50",
  dailyChange: "+$3.80 (+2.74%)",
  range52Wk: "$94.20 – $148.80",
  sharesOutstanding: "89,500,000 Common Shares",
  dividendYield: "1.85% ($2.64 / Share Annualized)"
};

export const earningsSegmentBreakdown = [
  { segment: "Theatrical Slate Gross (Global Box Office)", fy24: "$840M", fy25: "$1,120M", fy26Target: "$1,450M", yoy: "+29.4%" },
  { segment: "Physical Soundstages & Virtual Lots", fy24: "$180M", fy25: "$240M", fy26Target: "$310M", yoy: "+29.2%" },
  { segment: "Optical Labs, VFX & Post-Mastering", fy24: "$120M", fy25: "$165M", fy26Target: "$210M", yoy: "+27.3%" },
  { segment: "Library Syndication & Ancillary Windows", fy24: "$220M", fy25: "$315M", fy26Target: "$420M", yoy: "+33.3%" },
  { segment: "Total Consolidated Revenue", fy24: "$1,360M", fy25: "$1,840M", fy26Target: "$2,390M", yoy: "+29.9%", highlight: true },
  { segment: "Adjusted EBITDA (38.2% Margin)", fy24: "$510M", fy25: "$703M", fy26Target: "$915M", yoy: "+30.2%", highlight: true },
  { segment: "Consolidated Free Cash Flow", fy24: "$420M", fy25: "$640M", fy26Target: "$810M", yoy: "+26.6%", highlight: true }
];

export const slateRoiGuidance = [
  {
    id: "aura-borealis-roi",
    title: "Aura Borealis",
    director: "Marcus Vance",
    dop: "Greig Fraser, ASC, BSC",
    budget: "$140M",
    projectedBoxOffice: "$650M – $780M",
    targetRoi: "2.8x Net ROI",
    status: "Principal Photography Active",
    releaseTarget: "Q4 2027 Theatrical",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "the-obsidian-crown-roi",
    title: "The Obsidian Crown",
    director: "David Alexander",
    dop: "Clement Dupont, AFC",
    budget: "$45M",
    projectedBoxOffice: "$350M – $420M",
    targetRoi: "3.4x Net ROI",
    status: "In Theaters Nov 2026",
    releaseTarget: "Palme d'Or Contender",
    image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "chronos-zero-roi",
    title: "Chronos: Zero",
    director: "Helena Vance",
    dop: "Klaus Lindqvist, FSF",
    budget: "$85M",
    projectedBoxOffice: "$500M – $580M",
    targetRoi: "3.1x Net ROI",
    status: "70mm IMAX Worldwide",
    releaseTarget: "Venice Golden Lion Winner",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop"
  }
];

export const regulatoryFilings = [
  {
    type: "SEC Form 10-K",
    title: "Annual Report for Fiscal Year Ended Dec 31, 2025",
    desc: "Complete audited financial statements, risk factors, executive compensation, and soundstage asset ledger under PwC audit certification.",
    date: "MARCH 15, 2026",
    fileSize: "28.4 MB PDF"
  },
  {
    type: "SEC Form 10-Q",
    title: "Quarterly Report for the Period Ended Sept 30, 2026",
    desc: "Unaudited quarterly financial results, EBITDA margins, and segment breakdown covering box office and soundstage occupancy.",
    date: "OCTOBER 22, 2026",
    fileSize: "14.2 MB PDF"
  },
  {
    type: "SEC Form 8-K",
    title: "Current Event Disclosure: $250M Multi-Slate Co-Production Accord",
    desc: "Ratification of institutional co-financing facility with European sovereign partners and completion guarantor underwriting.",
    date: "SEPTEMBER 04, 2026",
    fileSize: "4.8 MB PDF"
  },
  {
    type: "SEC Form DEF 14A",
    title: "2026 Notice of Annual Shareholder Meeting & Proxy Statement",
    desc: "Official proxy voting statement regarding Class III director elections, executive compensation ('Say-on-Pay'), and PwC auditor ratification.",
    date: "APRIL 02, 2026",
    fileSize: "19.5 MB PDF"
  }
];

export const analystCoverage = [
  { firm: "Goldman Sachs", analyst: "Brett Feldstein, CFA", rating: "OUTPERFORM", targetPrice: "$148.00", date: "OCT 2026" },
  { firm: "Morgan Stanley", analyst: "Benjamin Swinburne", rating: "OVERWEIGHT", targetPrice: "$152.00", date: "OCT 2026" },
  { firm: "J.P. Morgan", analyst: "Philip Cusick", rating: "OVERWEIGHT", targetPrice: "$155.00", date: "SEPT 2026" },
  { firm: "BofA Securities", analyst: "Jessica Reif Ehrlich", rating: "BUY", targetPrice: "$145.00", date: "SEPT 2026" }
];

export const irRoadshows = [
  {
    title: "Morgan Stanley Global TMT Conference",
    date: "NOVEMBER 18, 2026",
    location: "Barcelona, Spain",
    speakers: "Marcus Vance (CEO) & Harrison Cole (CFO)",
    status: "Webcast Available"
  },
  {
    title: "UBS Global Media & Communications Summit",
    date: "DECEMBER 04, 2026",
    location: "New York, NY",
    speakers: "Harrison Cole (CFO) & Sarah Hemingway (EVP Distribution)",
    status: "Registration Open"
  },
  {
    title: "Q4 & FY2026 Full-Year Earnings Call & Webcast",
    date: "FEBRUARY 12, 2027",
    location: "Pinewood Proscenium & Telecast",
    speakers: "Full Executive Committee",
    status: "Live Webcast Stream"
  }
];

export const proxyVotingProposals = [
  {
    id: "prop-01",
    number: "PROPOSAL 01",
    tag: "MANAGEMENT PROPOSAL",
    title: "Election of Class III Directors (Three-Year Mandate Expiring 2029)",
    desc: "To elect three Class III directors to serve until the 2029 Annual Meeting of Shareholders and until their respective successors are duly elected and qualified.",
    boardRecommendation: "Board Recommends: FOR ALL",
    candidates: [
      { name: "Dame Helen Davenport", role: "Independent Board Chair" },
      { name: "Marcus Vance", role: "Founder & Chief Executive Officer" },
      { name: "Dr. Kenjiro Takahashi", role: "CTO & Head of Stage Pipeline" }
    ],
    options: ["FOR ALL", "WITHHOLD ALL", "SPLIT VOTE"]
  },
  {
    id: "prop-02",
    number: "PROPOSAL 02",
    tag: "ADVISORY GOVERNANCE",
    title: "Advisory Vote on Executive Compensation (\"Say-on-Pay Resolution\")",
    desc: "Non-binding approval of named executive officer compensation directly pegged to slate syndication hurdle rates, studio free cash flow conversion exceeding 100%, and multi-year Total Shareholder Return (TSR) benchmarked against S&P 500 Media & Entertainment Index.",
    boardRecommendation: "Board Recommends: FOR",
    options: ["FOR", "AGAINST", "ABSTAIN"]
  },
  {
    id: "prop-03",
    number: "PROPOSAL 03",
    tag: "AUDIT COMMITTEE",
    title: "Ratification of PricewaterhouseCoopers LLP as Independent Registered Public Accounting Firm",
    desc: "Ratification of the selection of PwC LLP as independent external auditors for the fiscal year ending December 31, 2026. Cumulative FY2025 audit & film financing certification fees totaled $3.85M with no impairment disputes reported.",
    boardRecommendation: "Board Recommends: FOR",
    options: ["FOR", "AGAINST", "ABSTAIN"]
  }
];
