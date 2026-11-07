export interface SpecGroup {
  category: string;
  badge: string;
  items: {
    name: string;
    value: string;
    metricValue?: string;
    highlight?: boolean;
    description?: string;
  }[];
}

export const SPEC_GROUPS: SpecGroup[] = [
  {
    category: "Acoustic Transducers",
    badge: "AUDIO CORE",
    items: [
      {
        name: "Acoustic Drivers",
        value: "50 mm Neodymium Magnets",
        highlight: true,
        description: "Custom-calibrated drivers engineered for razor-sharp competitive positional accuracy.",
      },
      {
        name: "Frequency Response",
        value: "12 Hz – 28,000 Hz",
        highlight: true,
        description: "Extended low-end sub-bass resonance through pristine high-treble clarity.",
      },
      {
        name: "Nominal Impedance",
        value: "32 Ω @ 1 kHz",
        description: "Efficient driving impedance compatible with controllers, phones, and DACs.",
      },
      {
        name: "Sensitivity (@ 1kHz)",
        value: "109 dB SPL / mW",
        description: "High sensitivity delivering full dynamic range without external amplification.",
      },
      {
        name: "Total Harmonic Distortion",
        value: "< 0.1% @ 1 kHz",
        description: "Virtually zero signal distortion across competitive dynamic ranges.",
      },
    ],
  },
  {
    category: "Microphone Technology",
    badge: "COMMUNICATION",
    items: [
      {
        name: "Pickup Pattern",
        value: "Unidirectional Cardioid",
        highlight: true,
        description: "Focused sweet-spot voice isolation with rear and lateral noise cancellation.",
      },
      {
        name: "Microphone Frequency",
        value: "100 Hz – 10,000 Hz",
        description: "Optimized specifically for natural human vocal timbre and clarity.",
      },
      {
        name: "Signal-to-Noise Ratio",
        value: "> 60 dB",
        description: "Clean voice broadcast eliminating background hum and electrical noise.",
      },
      {
        name: "Microphone Sensitivity",
        value: "-45 dB ± 3 dB (@ 1 kHz)",
        description: "Sensitive capture of whispers and normal conversational volumes.",
      },
      {
        name: "Mechanical Deployment",
        value: "Retractable Flexible Boom",
        description: "Slides seamlessly inside the left earcup when not in use.",
      },
    ],
  },
  {
    category: "Build & Ergonomics",
    badge: "CHASSIS",
    items: [
      {
        name: "Chassis Construction",
        value: "Bauxite Aluminum Unibody",
        highlight: true,
        description: "Aerospace-grade bauxite frame providing exceptional rigidity and resilience.",
      },
      {
        name: "Headband Cushioning",
        value: "Memory Foam Pressure Channel",
        description: "Thick plush crown engineered to eliminate vertical pressure hotspots.",
      },
      {
        name: "Ear Cushion Design",
        value: "Cooling-Gel Memory Foam",
        highlight: true,
        description: "Thermal transfer gel layer keeps ears cool during prolonged matches.",
      },
      {
        name: "Approximate Weight",
        value: "250 g / 0.55 lbs",
        metricValue: "250 grams",
        description: "Ultra-lightweight ergonomic chassis designed for all-day comfort.",
      },
      {
        name: "Cable Construction",
        value: "1.3 m Braided Kevlar Core",
        description: "Tangle-free reinforced braided sheath with gold-plated 3.5mm terminal.",
      },
    ],
  },
  {
    category: "Connectivity & Platforms",
    badge: "ECOSYSTEM",
    items: [
      {
        name: "Physical Interface",
        value: "Gold-Plated 3.5 mm Combo Jack",
        description: "Universal analog connection with included 2.0m audio/mic splitter extension.",
      },
      {
        name: "Spatial Audio Support",
        value: "7.1 Surround Sound & Windows Sonic",
        highlight: true,
        description: "Pinpoint positional audio software support for immersive spatial imaging.",
      },
      {
        name: "On-Ear Controls",
        value: "Analog Volume Wheel & Mic Mute Slider",
        description: "Immediate zero-latency tactile control at your fingertips.",
      },
      {
        name: "Platform Compatibility",
        value: "PC, PS5, Xbox Series X|S, Switch, Mobile",
        highlight: true,
        description: "Plug-and-play instant compatibility across all major gaming platforms.",
      },
    ],
  },
];

export const COMPATIBLE_PLATFORMS = [
  { name: "PC / Mac", status: "Native 7.1 Surround", icon: "Monitor" },
  { name: "PlayStation 5", status: "Tempest 3D Audio Ready", icon: "Gamepad2" },
  { name: "Xbox Series X | S", status: "Windows Sonic Compatible", icon: "Gamepad" },
  { name: "Nintendo Switch", status: "Analog Handheld & Docked", icon: "Tv" },
  { name: "Steam Deck / Rog Ally", status: "Universal 3.5mm Analog", icon: "Layers" },
  { name: "Mobile / Tablets", status: "Direct 3.5mm or USB Adapter", icon: "Smartphone" },
];
