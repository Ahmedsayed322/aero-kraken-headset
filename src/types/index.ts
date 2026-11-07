export interface Hotspot {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  // Coordinates relative to centered model
  position: [number, number, number];
  cameraTarget: [number, number, number];
  cameraPosition: [number, number, number];
  specs: { label: string; value: string }[];
}

export interface Colorway {
  id: string;
  name: string;
  hex: string;
  accentHex: string;
  description: string;
}

export type ViewMode = "cinematic" | "orbit" | "wireframe" | "exploded";
