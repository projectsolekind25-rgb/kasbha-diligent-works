# KASBHA Diligent Works

Build a fast, premium, mobile-first website for KASBHA (PTY) LTD, a Durban-based building, civil engineering, events, cleaning and supply company. Follow every instruction below. Do not add pages, sections or features I haven't listed. If anything is unclear or would hurt speed or UX, tell me before building.



## 1. BRAND

- Name: KASBHA (Pty) Ltd. Tagline: "We do our work with utmost diligence."

- Logo: navy swallow bird beside a red building-and-road emblem, "KASBHA" in bold red, "PTY LTD" beneath. I will upload it. Use a text wordmark until then.

- Colours from the logo: deep navy, strong red, white. Dark theme: near-black navy backgrounds, white text, red used sparingly for buttons and accents. High contrast.

- Copy is short, sharp, confident. No filler. No "Welcome to our website".



## 2. DESIGN SYSTEM (strict)

Typography (highest priority):

- Never use Inter, Roboto, Poppins, Open Sans, Montserrat, Space Grotesk or system-default fonts.

- Headlines: Bricolage Grotesque, weight 700-800. Body: Instrument Sans. Install via @fontsource-variable packages so fonts are self-hosted, preloaded, font-display: swap, zero layout shift. Two families max.

- Headlines very large on mobile, tight tracking (-0.02em to -0.04em), tight line height. Body small and airy. Typography must feel Apple-grade: precise, tight, confident.



Feel: Apple, not Android.

- Must feel like an iPhone or MacBook: instant, smooth, precise.

- No Material Design: no ripples, no heavy drop shadows, no floating action buttons, no Roboto look.

- Continuous rounded corners, backdrop blur, hairline borders, iOS-style sheets for menus.

- Animate only transform and opacity. Spring easing cubic-bezier(0.32, 0.72, 0, 1). Press state scale 0.97. Respect prefers-reduced-motion. 60fps or cut the animation.



Performance:

- Code-split routes, lazy-load images, WebP/AVIF with set width and height, no layout shift.

- No heavy libraries. No embedded maps, no video backgrounds.

- Target Lighthouse 95+ on mobile.



Craft reference: apple.com, linear.app, stripe.com, vercel.com, arc.net, nothing.tech.



## 3. TECH

- React + TypeScript + Tailwind. Small reusable components.

- One config file (src/config/site.ts) holds ALL contact details, credentials, services, projects and plant data. Never hardcode these in components.

- No backend, no auth, no database.

- Currency is ZAR (R). Timezone Africa/Johannesburg.



## 4. CONVERSION

- Primary action on every page: WhatsApp click-to-chat to +27 63 888 6489 (https://wa.me/27638886489) with a pre-filled message specific to that page.

- Sticky WhatsApp pill on mobile (clean iOS-style pill, not a Material FAB).

- Secondary: tap-to-call 031 201 0081, email kasbhapty@gmail.com.

- Contact form (name, service, message) has no backend. On submit it builds a pre-filled WhatsApp message and opens it.



## 5. PAGES

Nav: Home, Services, Projects, Plant Hire, About, Contact. Same footer everywhere (see Footer).



### HOME

- Hero: headline "Built with utmost diligence." Subline: "Building, civil works, events, cleaning and supply. Delivered from Durban." Buttons: "Get a quote" (WhatsApp), "See our projects".

- Credential strip: "CIDB graded: 5GB · 3CE · 2SQ" | "100% Black-owned · 100% female-owned · 100% youth-owned" | "Founded 2018. Registered 2020."

- Four service cards (see Services).

- Featured projects (3): DUT Berea residence renovations (R6,856,974.77, 2026); Mdima Civils road markings and reflective road studs (R2,422,110.00, 2023); Deezlo Trading road rehabilitation (R2,373,100.00, 2021).

- Plant hire teaser: Hino 700 tipper truck.

- "Who we serve" row: Corporate organisations, Private clients, Crèches, Universities, FET Colleges and Schools, Provincial and Local Government Departments, SMMEs.

- Closing CTA: WhatsApp.



### SERVICES (four divisions, full lists)

1. Building and Civil Construction, Renovations, Painting, Carpentry, Paving and Supply

- Civil, building and electrical construction

- Tar road construction, regravelling, paving, gabion installation

- Urban renewal projects

- Plumbing, water reticulation and drainage

- Grass cutting, tree felling, site clearing and rubble collection

- Solid waste collection on construction sites and properties

- Interior design, painting, interior and exterior lighting

- Carpentry

- Project management and supervision across sectors

2. Events Management and Catering

- We plan with clients and advise on a suitable venue

- We facilitate every step and co-ordinate the dynamics of the event

- Catering for all menu types

- Post-event management report (financial and operational) for the client

3. Cleaning, Security and General Maintenance

- Office walls, curtains and window cleaning

- Wooden and ceramic floor power stripping and polishing

- Passage and corridor power vacuuming for mat tiles

- Dust and solid waste (papers and bottles) removal

- Carpet and upholstery heavy-duty cleaning and drying

- Furniture rehabilitation and polishing

- Security services

4. School and Office Supplies (LTSM and general goods)

- Stationery, textbooks, science kits, library textbooks, technology texts

- Ink and copiers, paper reams

- IT and computers



### PROJECTS

Filter tabs: All | General Building (GB) | Civil Engineering (CE) | Specialist Works (SQ) | Supply and Delivery. Card shows client, work, value, year. Newest first. Show a project count computed from the data. Do NOT show contact persons or phone numbers. Add a line "Client references available on request" with a WhatsApp button.



General Building (GB)

- Sawela Primary School | Roof replacement and ceiling installation | R1,071,554.00 | 2023

- Saphumelela Primary School | Installation of flooring to 16 classrooms | R479,000.00 | 2024

- Msilinga Primary School | Roof replacement and ceiling installation | R482,534.00 | 2024

- Mangosuthu University of Technology | Construction of Radio Room | R976,867.51 | 2025

- Clarence Primary School | Toilet repair, replacement and plumbing works | R70,000.00 | 2026

- Durban University of Technology | Berea residence renovations | R6,856,974.77 | 2026



Civil Engineering (CE)

- Deezlo Trading CC | Road rehabilitation works | R2,373,100.00 | 2021

- DUT Steve Biko Campus | Supply and installation of concrete paving | R131,400.00 | 2021

- Comtech High School | Drilling and installation of borehole | R600,000.00 | 2022

- Simandlovu Trading | Road upgrade project | R2,263,250.00 | 2023

- Deezlo Trading CC | Construction and installation of septic flush toilet system | R1,110,154.00 | 2024



Specialist Works (SQ)

- Magama Primary School | Provision of fencing services | R426,235.77 | 2026

- Mdima Civils | Supply and installation of permanent road markings and reflective road studs | R2,422,110.00 | 2023



Supply and Delivery

- eThekwini Municipality | Supply and delivery of mobile toilets | R29,900.00 | 2021

- CBDM Consulting | Supply and delivery of copiers and printer consumables | R152,000.00 | 2021

- Ohlange High School | Supply and delivery of copier and RISO consumables | R73,500.00 | 2022

- Amagcino Primary School | Supply and delivery of office furniture and stationery | R216,000.00 | 2023

- Indumeni Trading | Supply and delivery of copiers and printer consumables | R13,300.00 | 2024

- Amagcino Primary School | Supply and delivery of school stationery | R216,000.00 | 2025



### PLANT HIRE

- Headline: "Hino 700 tipper truck. Available for hire."

- Copy: KASBHA (Pty) Ltd owns and operates a Hino 700 tipper truck for hire to construction, civil engineering, municipal and private sector projects. Truck signage reads "Sand, Stone & Plant Hire".

- Materials transported (as tappable chips): river sand, building sand, plaster sand, stone, crusher dust, gravel, G5 material, G6 material, G7 material, topsoil, filling material, rubble, demolition waste, asphalt, bricks, cement, building materials, landscaping materials, general bulk construction materials.

- Two truck photo slots. CTA: WhatsApp "Hire the Hino 700" with pre-filled message.



### ABOUT

- Story: Founded in 2018 as an informal business doing small projects in and around Durban. Formally registered in 2020. Has grown into a reputable small enterprise specialising in civil construction (tar roads, regravelling, paving, gabions), general construction, renovations, cleaning, school LTSM and general goods supply, and project management and supervision. 100% Black-owned, 100% youth-owned, 100% female-owned.

- Vision: To be a leading and trusted service provider of civil engineering, construction and project management services, recognised for delivering quality, innovation and sustainable solutions while creating lasting value for our clients, communities and stakeholders.

- Mission: A holistic approach to project management through: building (plumbing and road maintenance), civil and electrical construction; events management and catering; general cleaning and maintenance; building construction and interior design; painting and carpentry; supply.

- Objectives (six clean cards): serve clients across South Africa; deliver quality, cost-effective, reliable construction; complete projects safely, on time and within budget; build lasting relationships through professionalism and excellent service; promote sustainable growth through innovation and continuous improvement; create opportunities for skills development, employment and community empowerment.

- Why KASBHA: 100% Black ownership; own equipment, established reliable suppliers and an experienced team; personal care and client feedback follow-up; led by a young female entrepreneur focused on quality, sustainable, client-focused delivery; experienced management team.

- Team: Director: Miss Ayanda Mhlongo. Managing Director: Nkosinathi Mhlongo. Teams: Property Management and Renovations (N Mhlongo); Construction and Plumbing (Andile Nyembe); Interior Design and General Cleaning (W Mhlongo). Show as a clean org chart.

- Credentials block (see below).



### CONTACT

- Head office: 184 Clark Road, Bulwer, Berea, Durban, 4083

- Gauteng office: Howick Close, Midrand, 1685

- Cell/WhatsApp: 063 888 6489. Telephone: 031 201 0081. Email: kasbhapty@gmail.com. Website: www.kasbha.co.za

- Google Maps links for both addresses (links only, no embeds).

- The contact form from section 4. Do not invent opening hours.



## 6. CREDENTIALS (show on About and in the footer)

- Registration: CK 2020/087311/07

- CIDB CRS number: 10251487. Grading: PE 3CE, 5GB, 2SQ. Link text "Verify on the CIDB register" pointing to https://portal.cidb.org.za

- CSD number: MAAA0975506

- NHBRC: 4000010114

- B-BBEE: 100% Black-owned, 100% female-owned, 100% youth-owned

- Store the CIDB expiry date (2026-11-26) in the config file only. Do NOT display it.

- Add a "Request our compliance pack" button (WhatsApp, pre-filled).



## 7. DO NOT INCLUDE

Bank details, VAT number, income tax number, COIDA number, UIF number, client contact names or phone numbers, and any SWOT content. Do not mention weaknesses, lack of funding or threats anywhere.



## 8. IMAGES

Use dark placeholder blocks with fixed aspect ratios until I upload photos. Never use stock or AI images. Slots: logo, hero (site work), project gallery (6), Hino truck (2), branded company bakkies (2), school building.



## 9. SEO

Unique title and meta description per page. LocalBusiness JSON-LD (Durban and Midrand). Open Graph image slot. Sitemap and robots.txt. Keywords used naturally: civil construction Durban, building contractor Durban, tipper truck hire Durban, school renovations KwaZulu-Natal.



## 10. FOOTER

Logo, tagline, nav links, contact details, credentials line (Reg, CIDB CRS and grading, CSD, NHBRC), WhatsApp button, © KASBHA (Pty) Ltd.

"I attached the logo"

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7b04ead2-aa9c-450d-bf87-450f484b7792).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
