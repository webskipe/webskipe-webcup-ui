// ...existing code...
export interface UserPage {
    id: string;
    title: string;
    excerpt: string;
    createdAt: string;
    views: number;
    reactions: number;
    previewImage: string;
    status: 'draft' | 'published';
    privacy: 'public' | 'unlisted' | 'private';
    tone: string;
    slug: string;
  }
