// Company photos taken from the KASBHA company profile. Swap pointers here to change a photo site-wide.
import hero from "@/assets/hero-site-work.webp.asset.json";
import hinoSide from "@/assets/hino-side.webp.asset.json";
import hinoFront from "@/assets/hino-front.webp.asset.json";
import bakkiesCampus from "@/assets/bakkies-campus.webp.asset.json";
import bakkieStreet from "@/assets/bakkie-street.webp.asset.json";
import school from "@/assets/school-building.webp.asset.json";
import p1 from "@/assets/project-p1.webp.asset.json";
import p2 from "@/assets/project-p2.webp.asset.json";
import p3 from "@/assets/project-p3.webp.asset.json";
import p4 from "@/assets/project-p4.webp.asset.json";
import p5 from "@/assets/project-p5.webp.asset.json";
import p6 from "@/assets/project-p6.webp.asset.json";

const ph = (a: { url: string }, width: number, height: number) => ({ src: a.url, width, height });

export const photos = {
  hero: ph(hero, 1200, 750),
  hinoSide: ph(hinoSide, 960, 720),
  hinoFront: ph(hinoFront, 720, 540),
  bakkiesCampus: ph(bakkiesCampus, 640, 480),
  bakkieStreet: ph(bakkieStreet, 668, 501),
  school: ph(school, 596, 335),
  gallery: [
    { label: "Trench excavation for services", ...ph(p1, 480, 480) },
    { label: "Drainage works along a retaining wall", ...ph(p2, 640, 640) },
    { label: "Interior renovation in progress", ...ph(p3, 640, 640) },
    { label: "Completed school block", ...ph(p4, 375, 375) },
    { label: "Road grading and earthworks", ...ph(p5, 166, 166) },
    { label: "Hino 700 tipper on site", ...ph(p6, 640, 640) },
  ],
};
