export type ReactionType = 'like' | 'heart' | 'clap' | 'laugh' | 'sad';

export interface ReactionCount {
  reaction_type: ReactionType;
  count: number;
}

// export const REACTION_CHOICES: Reaction[] = [
//   { key: 'like', label: 'Like' },
//   { key: 'heart', label: 'Heart' },
//   { key: 'clap', label: 'Clap' },
//   { key: 'laugh', label: 'Laugh' },
//   { key: 'sad', label: 'Sad' },
// ];