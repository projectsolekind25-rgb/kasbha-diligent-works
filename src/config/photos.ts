// Company photos taken from the KASBHA company profile. Swap files in src/assets to change a photo site-wide.
import hero from "@/assets/hero-site-work.webp";
import hinoSide from "@/assets/hino-side.webp";
import hinoFront from "@/assets/hino-front.webp";
import bakkiesCampus from "@/assets/bakkies-campus.webp";
import bakkieStreet from "@/assets/bakkie-street.webp";
import school from "@/assets/school-building.webp";
import p1 from "@/assets/project-p1.webp";
import p2 from "@/assets/project-p2.webp";
import p3 from "@/assets/project-p3.webp";
import p4 from "@/assets/project-p4.webp";
import p5 from "@/assets/project-p5.webp";
import p6 from "@/assets/project-p6.webp";

import trenchCrew from "@/assets/trench-crew.webp";
import mercedesTipper from "@/assets/mercedes-tipper.webp";
import mutFitout from "@/assets/mut-fitout.webp";
import completedBuilding from "@/assets/completed-building.webp";
import perimeterFencing from "@/assets/perimeter-fencing.webp";
import meshDelivery from "@/assets/mesh-delivery.webp";
import bakkiesTrailers from "@/assets/bakkies-trailers.webp";
import bakkieSide from "@/assets/bakkie-side.webp";

const ph = (src: string, width: number, height: number) => ({ src, width, height });

export const photos = {
  hero: ph(hero, 1200, 750),
  hinoSide: ph(hinoSide, 960, 720),
  hinoFront: ph(hinoFront, 720, 540),
  bakkiesCampus: ph(bakkiesCampus, 640, 480),
  bakkieStreet: ph(bakkieStreet, 668, 501),
  school: ph(school, 596, 335),
  trenchCrew: ph(trenchCrew, 800, 450),
  mercedesTipper: ph(mercedesTipper, 800, 450),
  bakkiesTrailers: ph(bakkiesTrailers, 800, 450),
  bakkieSide: ph(bakkieSide, 800, 450),
  gallery: [
    { label: "University interior fit-out", ...ph(mutFitout, 800, 600) },
    { label: "Completed building works", ...ph(completedBuilding, 800, 600) },
    { label: "Perimeter fencing installation", ...ph(perimeterFencing, 800, 450) },
    { label: "Steel mesh supply and delivery", ...ph(meshDelivery, 800, 450) },
    { label: "Trench excavation for services", ...ph(p1, 480, 480) },
    { label: "Drainage works along a retaining wall", ...ph(p2, 640, 640) },
    { label: "Interior renovation in progress", ...ph(p3, 640, 640) },
    { label: "Completed school block", ...ph(p4, 375, 375) },
    { label: "Road grading and earthworks", ...ph(p5, 166, 166) },
    { label: "Hino 700 tipper on site", ...ph(p6, 640, 640) },
  ],
};
