// Single source of truth for all business data. Components must read from here.

export type ProjectCategory = "GB" | "CE" | "SQ" | "SUPPLY";

export interface Project {
  client: string;
  work: string;
  value: number; // ZAR
  year: number;
  category: ProjectCategory;
}

export const site = {
  name: "KASBHA (Pty) Ltd",
  shortName: "KASBHA",
  tagline: "We do our work with utmost diligence.",
  url: "https://www.kasbha.co.za",
  websiteLabel: "www.kasbha.co.za",
  currency: "ZAR",
  timezone: "Africa/Johannesburg",
  ogImage: "", // Absolute https URL of the share image, once supplied.

  contact: {
    whatsappNumber: "27638886489",
    cellDisplay: "063 888 6489",
    phoneDisplay: "031 201 0081",
    phoneTel: "+27312010081",
    cellTel: "+27638886489",
    email: "kasbhapty@gmail.com",
    offices: [
      {
        label: "Head office",
        street: "184 Clark Road, Bulwer, Berea",
        city: "Durban",
        postalCode: "4083",
        region: "KwaZulu-Natal",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=184+Clark+Road+Bulwer+Berea+Durban+4083",
      },
      {
        label: "Gauteng office",
        street: "Howick Close",
        city: "Midrand",
        postalCode: "1685",
        region: "Gauteng",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=Howick+Close+Midrand+1685",
      },
    ],
  },

  credentials: {
    registration: "CK 2020/087311/07",
    cidbCrs: "10251487",
    cidbGrading: "PE 3CE, 5GB, 2SQ",
    cidbGradingShort: "5GB · 3CE · 2SQ",
    cidbExpiry: "2026-11-26", // Stored only. Never display.
    cidbVerifyUrl: "https://portal.cidb.org.za",
    csd: "MAAA0975506",
    nhbrc: "4000010114",
    bbbee: "100% Black-owned, 100% female-owned, 100% youth-owned",
    founded: 2018,
    registered: 2020,
  },

  nav: [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/projects", label: "Projects" },
    { to: "/plant-hire", label: "Plant Hire" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ] as const,

  // Pre-filled WhatsApp messages per page / action.
  whatsapp: {
    "/": "Hi KASBHA, I'd like a quote for a project.",
    "/services": "Hi KASBHA, I'd like to discuss your services and get a quote.",
    "/projects": "Hi KASBHA, I've seen your projects and would like to discuss a job.",
    "/plant-hire": "Hi KASBHA, I'd like to hire the Hino 700 tipper truck. Material, site and date:",
    "/about": "Hi KASBHA, I'd like to find out more about working with you.",
    "/contact": "Hi KASBHA, I'd like to get in touch.",
    references: "Hi KASBHA, could you please send client references for your past projects?",
    compliance: "Hi KASBHA, please send your compliance pack (CIDB, CSD, NHBRC, B-BBEE, registration).",
    hino: "Hi KASBHA, I'd like to hire the Hino 700 tipper truck. Material, site and date:",
  } as Record<string, string>,

  services: [
    {
      id: "building-civil",
      title: "Building and Civil Construction",
      short: "Construction, roads, renovations, painting, carpentry, paving and supply.",
      full: "Building and Civil Construction, Renovations, Painting, Carpentry, Paving and Supply",
      items: [
        "Civil, building and electrical construction",
        "Tar road construction, regravelling, paving, gabion installation",
        "Urban renewal projects",
        "Plumbing, water reticulation and drainage",
        "Grass cutting, tree felling, site clearing and rubble collection",
        "Solid waste collection on construction sites and properties",
        "Interior design, painting, interior and exterior lighting",
        "Carpentry",
        "Project management and supervision across sectors",
      ],
    },
    {
      id: "events",
      title: "Events Management and Catering",
      short: "Planned, co-ordinated and reported. Every menu type.",
      full: "Events Management and Catering",
      items: [
        "We plan with clients and advise on a suitable venue",
        "We facilitate every step and co-ordinate the dynamics of the event",
        "Catering for all menu types",
        "Post-event management report (financial and operational) for the client",
      ],
    },
    {
      id: "cleaning",
      title: "Cleaning, Security and Maintenance",
      short: "Deep cleaning, floor care, upholstery and security.",
      full: "Cleaning, Security and General Maintenance",
      items: [
        "Office walls, curtains and window cleaning",
        "Wooden and ceramic floor power stripping and polishing",
        "Passage and corridor power vacuuming for mat tiles",
        "Dust and solid waste (papers and bottles) removal",
        "Carpet and upholstery heavy-duty cleaning and drying",
        "Furniture rehabilitation and polishing",
        "Security services",
      ],
    },
    {
      id: "supplies",
      title: "School and Office Supplies",
      short: "LTSM, stationery, consumables and IT.",
      full: "School and Office Supplies (LTSM and general goods)",
      items: [
        "Stationery, textbooks, science kits, library textbooks, technology texts",
        "Ink and copiers, paper reams",
        "IT and computers",
      ],
    },
  ],

  projectCategories: [
    { id: "ALL", label: "All" },
    { id: "GB", label: "General Building (GB)" },
    { id: "CE", label: "Civil Engineering (CE)" },
    { id: "SQ", label: "Specialist Works (SQ)" },
    { id: "SUPPLY", label: "Supply and Delivery" },
  ] as const,

  projects: [
    { category: "GB", client: "Sawela Primary School", work: "Roof replacement and ceiling installation", value: 1071554.0, year: 2023 },
    { category: "GB", client: "Saphumelela Primary School", work: "Installation of flooring to 16 classrooms", value: 479000.0, year: 2024 },
    { category: "GB", client: "Msilinga Primary School", work: "Roof replacement and ceiling installation", value: 482534.0, year: 2024 },
    { category: "GB", client: "Mangosuthu University of Technology", work: "Construction of Radio Room", value: 976867.51, year: 2025 },
    { category: "GB", client: "Clarence Primary School", work: "Toilet repair, replacement and plumbing works", value: 70000.0, year: 2026 },
    { category: "GB", client: "Durban University of Technology", work: "Berea residence renovations", value: 6856974.77, year: 2026 },
    { category: "CE", client: "Deezlo Trading CC", work: "Road rehabilitation works", value: 2373100.0, year: 2021 },
    { category: "CE", client: "DUT Steve Biko Campus", work: "Supply and installation of concrete paving", value: 131400.0, year: 2021 },
    { category: "CE", client: "Comtech High School", work: "Drilling and installation of borehole", value: 600000.0, year: 2022 },
    { category: "CE", client: "Simandlovu Trading", work: "Road upgrade project", value: 2263250.0, year: 2023 },
    { category: "CE", client: "Deezlo Trading CC", work: "Construction and installation of septic flush toilet system", value: 1110154.0, year: 2024 },
    { category: "SQ", client: "Magama Primary School", work: "Provision of fencing services", value: 426235.77, year: 2026 },
    { category: "SQ", client: "Mdima Civils", work: "Supply and installation of permanent road markings and reflective road studs", value: 2422110.0, year: 2023 },
    { category: "SUPPLY", client: "eThekwini Municipality", work: "Supply and delivery of mobile toilets", value: 29900.0, year: 2021 },
    { category: "SUPPLY", client: "CBDM Consulting", work: "Supply and delivery of copiers and printer consumables", value: 152000.0, year: 2021 },
    { category: "SUPPLY", client: "Ohlange High School", work: "Supply and delivery of copier and RISO consumables", value: 73500.0, year: 2022 },
    { category: "SUPPLY", client: "Amagcino Primary School", work: "Supply and delivery of office furniture and stationery", value: 216000.0, year: 2023 },
    { category: "SUPPLY", client: "Indumeni Trading", work: "Supply and delivery of copiers and printer consumables", value: 13300.0, year: 2024 },
    { category: "SUPPLY", client: "Amagcino Primary School", work: "Supply and delivery of school stationery", value: 216000.0, year: 2025 },
  ] as Project[],

  featuredProjects: [
    { client: "Durban University of Technology", work: "Berea residence renovations", label: "DUT Berea residence renovations" },
    { client: "Mdima Civils", work: "Supply and installation of permanent road markings and reflective road studs", label: "Mdima Civils road markings and reflective road studs" },
    { client: "Deezlo Trading CC", work: "Road rehabilitation works", label: "Deezlo Trading road rehabilitation" },
  ],

  plant: {
    name: "Hino 700 tipper truck",
    signage: "Sand, Stone & Plant Hire",
    description:
      "KASBHA (Pty) Ltd owns and operates a Hino 700 tipper truck for hire to construction, civil engineering, municipal and private sector projects.",
    materials: [
      "River sand", "Building sand", "Plaster sand", "Stone", "Crusher dust", "Gravel",
      "G5 material", "G6 material", "G7 material", "Topsoil", "Filling material", "Rubble",
      "Demolition waste", "Asphalt", "Bricks", "Cement", "Building materials",
      "Landscaping materials", "General bulk construction materials",
    ],
  },

  audiences: [
    "Corporate organisations",
    "Private clients",
    "Crèches",
    "Universities",
    "FET Colleges and Schools",
    "Provincial and Local Government Departments",
    "SMMEs",
  ],

  about: {
    story:
      "Founded in 2018 as an informal business doing small projects in and around Durban. Formally registered in 2020. Today a reputable small enterprise specialising in civil construction (tar roads, regravelling, paving, gabions), general construction, renovations, cleaning, school LTSM and general goods supply, and project management and supervision. 100% Black-owned, 100% youth-owned, 100% female-owned.",
    vision:
      "To be a leading and trusted service provider of civil engineering, construction and project management services, recognised for delivering quality, innovation and sustainable solutions while creating lasting value for our clients, communities and stakeholders.",
    mission:
      "A holistic approach to project management through: building (plumbing and road maintenance), civil and electrical construction; events management and catering; general cleaning and maintenance; building construction and interior design; painting and carpentry; supply.",
    objectives: [
      "Serve clients across South Africa.",
      "Deliver quality, cost-effective, reliable construction.",
      "Complete projects safely, on time and within budget.",
      "Build lasting relationships through professionalism and excellent service.",
      "Promote sustainable growth through innovation and continuous improvement.",
      "Create opportunities for skills development, employment and community empowerment.",
    ],
    why: [
      "100% Black ownership.",
      "Own equipment, established reliable suppliers and an experienced team.",
      "Personal care and client feedback follow-up.",
      "Led by a young female entrepreneur focused on quality, sustainable, client-focused delivery.",
      "Experienced management team.",
    ],
    team: {
      director: { role: "Director", name: "Miss Ayanda Mhlongo" },
      md: { role: "Managing Director", name: "Nkosinathi Mhlongo" },
      units: [
        { name: "Property Management and Renovations", lead: "N Mhlongo" },
        { name: "Construction and Plumbing", lead: "Andile Nyembe" },
        { name: "Interior Design and General Cleaning", lead: "W Mhlongo" },
      ],
    },
  },
} as const;

export const contactServiceOptions = [...site.services.map((s) => s.title), "Plant hire (Hino 700)", "Other"];
