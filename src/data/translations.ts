export type Language = "ar" | "en";

export interface Translations {
  brand: {
    name: string;
    tagline: string;
    audioPlaying: string;
    audioPaused: string;
    acquire: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    titleLine2: string;
    description: string;
    exploreBtn: string;
  };
  dock: {
    turntable: string;
    mesh: string;
    dragHint: string;
    switchColorTitle: string;
  };
  sections: {
    drivers: {
      badge: string;
      titleLine1: string;
      titleHighlight: string;
      description: string;
      specs: { label: string; value: string }[];
      nextBtn: string;
    };
    cushions: {
      badge: string;
      titleLine1: string;
      titleHighlight: string;
      description: string;
      specs: { label: string; value: string }[];
      nextBtn: string;
    };
    headband: {
      badge: string;
      titleLine1: string;
      titleHighlight: string;
      description: string;
      specs: { label: string; value: string }[];
      nextBtn: string;
    };
    mic: {
      badge: string;
      titleLine1: string;
      titleHighlight: string;
      description: string;
      specs: { label: string; value: string }[];
      nextBtn: string;
    };
    controls: {
      badge: string;
      titleLine1: string;
      titleHighlight: string;
      description: string;
      specs: { label: string; value: string }[];
      nextBtn: string;
    };
    finale: {
      badge: string;
      titleLine1: string;
      titleHighlight: string;
      description: string;
      ctaBtn: string;
      topBtn: string;
    };
  };
  pins: {
    activeView: string;
    clickToView: string;
  };
  modal: {
    officialRig: string;
    configureTitle: string;
    subtitle: string;
    colorLabel: string;
    engravingLabel: string;
    engravingPlaceholder: string;
    engravingHint: string;
    totalLabel: string;
    inStock: string;
    confirmBtn: string;
    confirmedBadge: string;
    confirmedTitle: string;
    confirmedDesc: (color: string, engraving: string) => string;
    returnBtn: string;
  };
  quickNav: {
    drivers: string;
    cushions: string;
    headband: string;
    mic: string;
    controls: string;
  };
}

export const translations: Record<Language, Translations> = {
  ar: {
    brand: {
      name: "إيرو كراكن",
      tagline: "إضاءة كروما RGB",
      audioPlaying: "صوت الاستوديو يعمل",
      audioPaused: "تشغيل صوت الاستوديو",
      acquire: "اقتنِ السماعة",
    },
    hero: {
      badge: "صوتيات احترافية للبطولات · الجيل الثالث",
      titleLine1: "اسمع",
      titleHighlight: "ما وراء",
      titleLine2: "الحدود.",
      description:
        "صُممت للدقة الفائقة وابتُكرت للانغماس المطلق. انقر على أي نقطة تفاعلية على السماعة ثلاثية الأبعاد لاستكشاف المكونات بسلاسة.",
      exploreBtn: "استكشف المزايا",
    },
    dock: {
      turntable: "360°",
      mesh: "الهيكل",
      dragHint: "اسحب في أي مكان للتدوير",
      switchColorTitle: "تغيير إضاءة الشعار إلى",
    },
    sections: {
      drivers: {
        badge: "01. محولات الطاقة الصوتية",
        titleLine1: "مشغلات نيوديميوم",
        titleHighlight: "بحجم 50 مم.",
        description:
          "غرف صوتية داخلية مخصصة ومعايرة بدقة لتوفير تحديد موقعي فائق وديناميكية ترددية استثنائية. مغناطيسات النيوديميوم تمنع التشويش أثناء أصعب لحظات المنافسة.",
        specs: [
          { label: "نطاق التردد", value: "12 هرتز – 28,000 هرتز" },
          { label: "نسبة التشويش (THD)", value: "< 0.1% @ 1 كيلوهرتز" },
          { label: "مستوى الحساسية", value: "109 ديسيبل SPL / ميلي واط" },
          { label: "المقاومة الكهربائية", value: "32 أوم @ 1 كيلوهرتز" },
        ],
        nextBtn: "التالي: وسائد الجل المبردة",
      },
      cushions: {
        badge: "02. هندسة الراحة الحرارية",
        titleLine1: "وسائد جل مبردة",
        titleHighlight: "ورغوة الذاكرة.",
        description:
          "طبقة جل مبردة متطورة مدمجة تحت جلد بروتيني ناعم يسمح بمرور الهواء. تشتت حرارة الجسم وتخفف ضغط إطارات النظارات أثناء جلسات اللعب الطويلة الماراثونية.",
        specs: [
          { label: "الفارق الحراري", value: "-4.2° مئوية تبريد مستمر" },
          { label: "ممر النظارات", value: "قنوات تخفيف مدمجة" },
          { label: "القطر الداخلي", value: "54 مم × 65 مم بيضاوي" },
          { label: "العزل السلبي", value: "-24 ديسيبل عزل ضوضاء" },
        ],
        nextBtn: "التالي: طوق الألمنيوم بوكسيت",
      },
      headband: {
        badge: "03. هندسة الهيكل الخارجي",
        titleLine1: "سبيكة ألمنيوم",
        titleHighlight: "البوكسيت الخفيف.",
        description:
          "مصنوعة من سبيكة ألمنيوم البوكسيت خفيفة الوزن وشديدة المتانة المخصصة للطيران، مع وسادة تاجية سميكة توزع الوزن الإجمالي (250 غرام) بالتساوي على الرأس لمنع الإجهاد.",
        specs: [
          { label: "الوزن الإجمالي", value: "250 غرام فائق الخفة" },
          { label: "اختبار الالتواء", value: "180° مرونة انعكاس كاملة" },
          { label: "وسادة الرأس", value: "22 مم رغوة ميموري فوم" },
          { label: "خامة الإطار", value: "ألمنيوم بوكسيت مؤكسد" },
        ],
        nextBtn: "التالي: الميكروفون القلبي",
      },
      mic: {
        badge: "04. صوت البث المباشر",
        titleLine1: "ميكروفون قلبي",
        titleHighlight: "قابل للسحب بالكامل.",
        description:
          "نمط التقاط قلبي أحادي الاتجاه يعزل نبرة صوتك بدقة ونقاء استوديو، مع حجب نقرات لوحة المفاتيح والماوس وأصوات المراوح الخلفية. ينسحب بسلاسة داخل قطعة الأذن عند عدم الاستخدام.",
        specs: [
          { label: "نمط الالتقاط", value: "قلبي أحادي الاتجاه" },
          { label: "نطاق الصوت", value: "100 هرتز – 10,000 هرتز" },
          { label: "عزل الضوضاء", value: "> 22 ديسيبل عزل خلفي" },
          { label: "آلية السحب", value: "سحب سلس مخفي بالكامل" },
        ],
        nextBtn: "التالي: مفاتيح التحكم اللمسية",
      },
      controls: {
        badge: "05. واجهة التحكم المباشرة",
        titleLine1: "مفاتيح تحكم",
        titleHighlight: "لمسية فورية.",
        description:
          "قرص تحكم تناظري مخرّش لضبط مستوى الصوت لحظيًا دون تأخير، مع مفتاح ميكانيكي صلب لكتم الميكروفون فوريًا وكابل كيفلار مجدول مقوى مع موصل مطلي بالذهب.",
        specs: [
          { label: "ضبط الصوت", value: "عجلة تناظرية مخرّشة" },
          { label: "مفتاح الكتم", value: "مفتاح ميكانيكي فوري" },
          { label: "منفذ التوصيل", value: "3.5 مم مطلي بالذهب" },
          { label: "حماية الكابل", value: "1.3 م كيفلار مجدول مقوى" },
        ],
        nextBtn: "التالي: المواصفات الكاملة والطلب",
      },
      finale: {
        badge: "06. المواصفات الفنية للبطولات",
        titleLine1: "لعبتك.",
        titleHighlight: "عالمك الخاص.",
        description:
          "استمتع بميزة الصوت المحيطي الموضعي الاحترافي اليوم في جميع منافساتك، مع ضمان دولي معتمد لمدة عامين.",
        ctaBtn: "اقتنِ السماعة الآن",
        topBtn: "العودة للأعلى ↑",
      },
    },
    pins: {
      activeView: "العرض الحالي",
      clickToView: "انقر للعرض",
    },
    modal: {
      officialRig: "عتاد البطولات الرسمي",
      configureTitle: "تخصيص نسختك",
      subtitle: "إيرو كراكن — إصدار المحترفين 50 مم",
      colorLabel: "إصدار إضاءة كروما RGB",
      engravingLabel: "نقش الاسم بالليزر (مجانًا)",
      engravingPlaceholder: "اكتب اسمك أو لقبك هنا",
      engravingHint: "نقش دقيق فائق الجودة بالليزر على طوق الألمنيوم.",
      totalLabel: "إجمالي الاستثمار",
      inStock: "متوفر بالمخزون • شحن مجاني سريع",
      confirmBtn: "تأكيد حجز السماعة",
      confirmedBadge: "تم تأكيد طلبك بنجاح",
      confirmedTitle: "جاهز للمنافسة",
      confirmedDesc: (color: string, engraving: string) =>
        `تم تأكيد حجز سماعة إيرو كراكن بإضاءة ${color} مع نقش الليزر الخاص "${engraving}".`,
      returnBtn: "العودة للتجربة",
    },
    quickNav: {
      drivers: "01. مشغلات الصوت",
      cushions: "02. وسائد التبريد",
      headband: "03. طوق الألمنيوم",
      mic: "04. الميكروفون",
      controls: "05. مفاتيح التحكم",
    },
  },
  en: {
    brand: {
      name: "Aero Kraken",
      tagline: "Chroma RGB",
      audioPlaying: "Studio Audio Playing",
      audioPaused: "Play Studio Audio",
      acquire: "Acquire",
    },
    hero: {
      badge: "Competitive Acoustics · Generation 3",
      titleLine1: "Hear",
      titleHighlight: "Beyond",
      titleLine2: "Limits.",
      description:
        "Engineered for precision. Designed for immersion. Click any 3D pointer pin on the headset to smoothly explore each component.",
      exploreBtn: "Explore Features",
    },
    dock: {
      turntable: "360°",
      mesh: "Mesh",
      dragHint: "Drag anywhere to spin",
      switchColorTitle: "Switch Chroma Logo to",
    },
    sections: {
      drivers: {
        badge: "01. Acoustic Transducers",
        titleLine1: "50mm Neodymium",
        titleHighlight: "Drivers.",
        description:
          "Custom-calibrated acoustic chambers deliver pinpoint spatial accuracy and deep sub-bass resonance. High-flux neodymium magnets eliminate distortion during intense gameplay.",
        specs: [
          { label: "Frequency Range", value: "12 Hz – 28,000 Hz" },
          { label: "Distortion (THD)", value: "< 0.1% @ 1 kHz" },
          { label: "Sensitivity", value: "109 dB SPL / mW" },
          { label: "Impedance", value: "32 Ω @ 1 kHz" },
        ],
        nextBtn: "Next: Cooling Gel Cushions",
      },
      cushions: {
        badge: "02. Thermal Ergonomics",
        titleLine1: "Cooling Gel",
        titleHighlight: "& Memory Foam.",
        description:
          "Infused with an engineered thermal transfer cooling-gel layer beneath breathable protein leather. Dissipates body warmth and relieves eyewear pressure during marathon tournament sessions.",
        specs: [
          { label: "Thermal Delta", value: "-4.2°C Cooler" },
          { label: "Eyewear Channel", value: "Integrated Grooves" },
          { label: "Inner Diameter", value: "54 mm x 65 mm" },
          { label: "Passive Isolation", value: "-24 dB Rejection" },
        ],
        nextBtn: "Next: Bauxite Headband",
      },
      headband: {
        badge: "03. Chassis Architecture",
        titleLine1: "Bauxite",
        titleHighlight: "Aluminum.",
        description:
          "Crafted from high-tensile bauxite aluminum alloy. Lightweight aerospace durability with an ultra-thick memory foam crown that distributes headset weight evenly across the skull.",
        specs: [
          { label: "Total Weight", value: "250 Grams" },
          { label: "Torsional Rating", value: "180° Inversion" },
          { label: "Crown Padding", value: "22 mm Memory Foam" },
          { label: "Frame Material", value: "Anodized Alloy" },
        ],
        nextBtn: "Next: Cardioid Microphone",
      },
      mic: {
        badge: "04. Broadcast Voice",
        titleLine1: "Retractable",
        titleHighlight: "Cardioid Mic.",
        description:
          "Engineered cardioid pickup pattern captures your voice with studio clarity while rejecting background keyboard clicks, desk thumps, and ambient fan noise. Fully retractable into the earcup.",
        specs: [
          { label: "Pickup Pattern", value: "Cardioid Unidirectional" },
          { label: "Voice Bandwidth", value: "100 Hz – 10,000 Hz" },
          { label: "Noise Rejection", value: "> 22 dB Off-Axis" },
          { label: "Boom Mechanism", value: "Stealth Retractable" },
        ],
        nextBtn: "Next: Tactile Controls",
      },
      controls: {
        badge: "05. Hardware Interface",
        titleLine1: "Tactile",
        titleHighlight: "Hardware Controls.",
        description:
          "Machined analog knurled potentiometer for zero-latency volume adjustment and a physical microphone mute slider. Instant command at your fingertips without ever alt-tabbing from your game.",
        specs: [
          { label: "Volume Adjust", value: "Analog Knurled Wheel" },
          { label: "Mute Switch", value: "Instant Hardware Toggle" },
          { label: "Interface", value: "3.5 mm Gold-Plated" },
          { label: "Cable Shielding", value: "1.3 m Braided Kevlar" },
        ],
        nextBtn: "Next: Tour Specification & Finale",
      },
      finale: {
        badge: "06. Tour Specification",
        titleLine1: "Your Game.",
        titleHighlight: "Your World.",
        description:
          "Experience tournament-grade spatial audio advantage today. Backed by a 2-year international warranty.",
        ctaBtn: "Acquire The Headset",
        topBtn: "Back to Top ↑",
      },
    },
    pins: {
      activeView: "Active View",
      clickToView: "Click to View",
    },
    modal: {
      officialRig: "Official Tournament Rig",
      configureTitle: "Configure Your Rig",
      subtitle: "Aero Kraken 50mm Pro Edition",
      colorLabel: "Chroma RGB Lighting Edition",
      engravingLabel: "Laser Engraved Call-Sign (Free)",
      engravingPlaceholder: "ENTER CALL-SIGN",
      engravingHint: "Precision laser-etched onto the bauxite aluminum headband.",
      totalLabel: "Total Investment",
      inStock: "In Stock • Ships Free",
      confirmBtn: "Confirm Reservation",
      confirmedBadge: "Order Confirmed",
      confirmedTitle: "Ready For Battle",
      confirmedDesc: (color: string, engraving: string) =>
        `Your Aero Kraken tournament edition with ${color} Chroma lighting and custom engraving "${engraving}" is reserved.`,
      returnBtn: "Return to Experience",
    },
    quickNav: {
      drivers: "01. Drivers",
      cushions: "02. Cooling Gel",
      headband: "03. Bauxite Frame",
      mic: "04. Cardioid Mic",
      controls: "05. Tactile Controls",
    },
  },
};
