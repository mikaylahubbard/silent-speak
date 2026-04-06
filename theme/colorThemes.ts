export const PALETTES = {
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
  },
  yellow: {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12",
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
  },
  cyan: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
  },
  fuchsia: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
  },
  pink: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
  },
};

export const MODES = {
  light: {
    // TEXT
    primaryText: "#404040", // neutral-700
    secondaryText: "#FFFFFF", // white
    tertiaryText: "#737373", // neutral-500

    // BACKGROUNDS
    primaryBg: "#FFFFFF", // neutral-0 (main background)
    tertiaryBg: "#f5f5f5", // neutral-100 (screen sections)
    cardBg: "#e5e5e5", // neutral-200 (cards)
    headerBg: "#d4d4d4", // neutral-300 (headers)
    secondaryBg: "#404040", // neutral-700 (dark containers)

    // NAV
    activeBg: "#525252", // neutral-600
    activeText: "#f5f5f5", // neutral-100
    headerTint: "#525252", // neutral-600

    // DETAILS
    accents: "#d4d4d4", // neutral-300 (borders/dividers)
    imageTitle: "silent_speak_long_logo.png",
  },

  dark: {
    // TEXT
    primaryText: "#e5e5e5", // neutral-200
    secondaryText: "#171717", // neutral-900 (only for contrast cases)
    tertiaryText: "#a3a3a3", // neutral-400

    // BACKGROUNDS
    primaryBg: "#404040", // neutral-700 (lightest dark)
    tertiaryBg: "#262626", // neutral-800
    cardBg: "#1f1f1f", // neutral-900-ish (in-between)
    headerBg: "#171717", // neutral-900 (darkest)
    secondaryBg: "#525252", // neutral-600 (used sparingly)

    // NAV
    activeBg: "#525252", // neutral-600
    activeText: "#f5f5f5", // neutral-100
    headerTint: "#e5e5e5", // neutral-200

    // DETAILS
    accents: "#171717", // neutral-900
    imageTitle: "Silent_Speak_Long_Logo_Dark.png",
  },
};
