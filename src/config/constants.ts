// API Configuration
export const API_URL = 'https://webskipe.madagascar.webcup.hodi.host/api';

// Templates
export const TEMPLATES = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple',
    previewImage: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg',
  },
  {
    id: 'celebration',
    name: 'Celebration',
    description: 'Festive and fun',
    previewImage: 'https://images.pexels.com/photos/796606/pexels-photo-796606.jpeg',
  },
  {
    id: 'dramatic',
    name: 'Dramatic',
    description: 'Bold and impactful',
    previewImage: 'https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg',
  },
  {
    id: 'nostalgic',
    name: 'Nostalgic',
    description: 'Warm memories',
    previewImage: 'https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg',
  },
  {
    id: "modern",
    name: "Modern",
    description: "Clean and minimalist design",
    previewImage: "/images/templates/modern.jpg",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional and elegant style",
    previewImage: "/images/templates/classic.jpg",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Artistic and expressive layout",
    previewImage: "/images/templates/creative.jpg",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Formal and business-like appearance",
    previewImage: "/images/templates/professional.jpg",
  },
];

// Tone Options
export const TONE_OPTIONS = [
  { value: "grateful", label: "Grateful" },
  { value: "nostalgic", label: "Nostalgic" },
  { value: "celebratory", label: "Celebratory" },
  { value: "humorous", label: "Humorous" },
  { value: "emotional", label: "Emotional" },
  { value: "professional", label: "Professional" },
  { value: "dramatic", label: "Dramatic" },
  { value: "poetic", label: "Poetic" },
  { value: "reflective", label: "Reflective" },
]
;

// Privacy Options
export const PRIVACY_OPTIONS = [
  { value: 'public', label: 'Public (visible to everyone)', icon: 'Globe' },
  { value: 'unlisted', label: 'Unlisted (only accessible via link)', icon: 'Link' },
  { value: 'private', label: 'Private (only visible to you)', icon: 'Lock' },
];