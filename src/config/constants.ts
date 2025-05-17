// API Configuration
export const API_URL = ' https://webskipe.madagascar.webcup.hodi.host/api';

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
];

// Tone Options
export const TONE_OPTIONS = [
  { value: 'celebratory', label: 'Celebratory' },
  { value: 'grateful', label: 'Grateful' },
  { value: 'reflective', label: 'Reflective' },
  { value: 'humorous', label: 'Humorous' },
  { value: 'emotional', label: 'Emotional' },
  { value: 'professional', label: 'Professional' },
  { value: 'dramatic', label: 'Dramatic' },
  { value: 'poetic', label: 'Poetic' },
];

// Privacy Options
export const PRIVACY_OPTIONS = [
  { value: 'public', label: 'Public (visible to everyone)', icon: 'Globe' },
  { value: 'unlisted', label: 'Unlisted (only accessible via link)', icon: 'Link' },
  { value: 'private', label: 'Private (only visible to you)', icon: 'Lock' },
];