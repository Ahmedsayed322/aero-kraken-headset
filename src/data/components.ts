export interface HeadsetComponent {
  id: string;
  number: string;
  name: string;
  nameAr: string;
  sectionId: string;
  category: string;
  categoryAr: string;
  position: [number, number, number];
}

export const HEADSET_COMPONENTS: HeadsetComponent[] = [
  {
    id: "drivers",
    number: "01",
    name: "50mm Neodymium Drivers",
    nameAr: "مشغلات نيوديميوم 50 مم",
    sectionId: "section-drivers",
    category: "Acoustic Transducers",
    categoryAr: "محولات الطاقة الصوتية",
    position: [8.2, -3.2, -1.2],
  },
  {
    id: "cushions",
    number: "02",
    name: "Cooling-Gel Memory Foam",
    nameAr: "وسائد الجل المبردة",
    sectionId: "section-cushions",
    category: "Thermal Ergonomics",
    categoryAr: "هندسة الراحة الحرارية",
    position: [4.6, -1.8, -0.5],
  },
  {
    id: "headband",
    number: "03",
    name: "Bauxite Aluminum Headband",
    nameAr: "طوق ألمنيوم البوكسيت",
    sectionId: "section-headband",
    category: "Aerospace Chassis",
    categoryAr: "هندسة الهيكل الخارجي",
    position: [0.0, 9.6, -1.5],
  },
  {
    id: "mic",
    number: "04",
    name: "Retractable Cardioid Mic",
    nameAr: "ميكروفون قلبي قابل للسحب",
    sectionId: "section-mic",
    category: "Broadcast Voice",
    categoryAr: "صوت البث المباشر",
    position: [5.1, -4.6, 10.2],
  },
  {
    id: "controls",
    number: "05",
    name: "Tactile Hardware Controls",
    nameAr: "مفاتيح تحكم لمسية",
    sectionId: "section-controls",
    category: "Hardware Interface",
    categoryAr: "واجهة التحكم المباشرة",
    position: [-7.8, -4.8, -2.8],
  },
];

export interface ColorEdition {
  id: string;
  name: string;
  nameAr: string;
  dotHex: string;
  emissiveHex: string;
  tagline: string;
  taglineAr: string;
}

export const COLOR_EDITIONS: ColorEdition[] = [
  {
    id: "apex-red",
    name: "Apex Crimson",
    nameAr: "القرمزي التنافسي",
    dotHex: "#E52432",
    emissiveHex: "#E52432",
    tagline: "Championship Crimson Red Chroma emblem and studio glow.",
    taglineAr: "شعار كروما بلون قرمزي أحمر ناري وإضاءة استوديو تنافسية.",
  },
  {
    id: "stealth-smoke",
    name: "Stealth Smoke",
    nameAr: "الدخاني الهادئ",
    dotHex: "#444444",
    emissiveHex: "#FFFFFF",
    tagline: "Pure monochrome white Chroma emblem with stealth styling.",
    taglineAr: "شعار كروما بلون أبيض ناصع مع مظهر متخفٍ فائق الأناقة.",
  },
  {
    id: "razer-green",
    name: "Chroma Green",
    nameAr: "أخضر كروما الأيقوني",
    dotHex: "#00FF41",
    emissiveHex: "#00FF41",
    tagline: "Iconic electric Razer green emblem with high-contrast LED illumination.",
    taglineAr: "إضاءة ليد كروما خضراء كهربائية أيقونية بتباين شديد الوضوح.",
  },
  {
    id: "glacier-cyan",
    name: "Glacier Cyan",
    nameAr: "الجليدي السماوي",
    dotHex: "#00D2FF",
    emissiveHex: "#00D2FF",
    tagline: "Cryogenic tournament ice cyan emblem with brilliant LED sheen.",
    taglineAr: "شعار كروما أزرق جليدي لامع مستوحى من بطولات المحترفين.",
  },
];
