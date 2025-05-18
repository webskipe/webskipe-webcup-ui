import React, { useState, useEffect } from 'react';
import {
  ThumbsUp,
  Heart,
//   ClappingHands,
  Laugh,
  Frown,
} from 'lucide-react';

export type ReactionType = 'like' | 'heart'  | 'laugh' | 'sad';

interface ReactionCount {
  reaction_type: ReactionType;
  count: number;
}

interface Props {
  reactions: ReactionCount[];
  onReact?: (type: ReactionType) => void;
  userReaction?: ReactionType; // réaction actuelle de l’utilisateur
}

const defaultReactions: Record<ReactionType, number> = {
  like: 0,
  heart: 0,
//   clap: 0,
  laugh: 0,
  sad: 0,
};

const ReactionButtons: React.FC<Props> = ({ reactions, onReact, userReaction }) => {
  const [counts, setCounts] = useState<Record<ReactionType, number>>({ ...defaultReactions });
  const [currentReaction, setCurrentReaction] = useState<ReactionType | undefined>(userReaction);

  // Mise à jour initiale à partir des props
  useEffect(() => {
    const updatedCounts = { ...defaultReactions };
    reactions && reactions.forEach(({ reaction_type, count }) => {
      updatedCounts[reaction_type] = count;
    });
    setCounts(updatedCounts);
  }, [reactions]);

  const handleReact = (type: ReactionType) => {
    setCounts(prev => {
      const updated = { ...prev };

      // Si l'utilisateur change de réaction
      if (currentReaction && currentReaction !== type) {
        updated[currentReaction] -= 1;
      }

      if (currentReaction === type) {
        // Si on reclique sur la même réaction (on l'annule)
        updated[type] -= 1;
        setCurrentReaction(undefined);
      } else {
        updated[type] += 1;
        setCurrentReaction(type);
      }

      return updated;
    });

    // Callback pour propager vers l’extérieur (API, etc.)
    onReact?.(type);
  };

  const reactionIcons: Record<ReactionType, JSX.Element> = {
    like: <ThumbsUp size={20} />,
    heart: <Heart size={20} />,
    // clap: <ClappingHands size={20} />,
    laugh: <Laugh size={20} />,
    sad: <Frown size={20} />,
  };

  return (
    <div className="flex space-x-4 justify-center">
      {(Object.keys(defaultReactions) as ReactionType[]).map((type) => {
        const isActive = currentReaction === type;
        return (
          <button
            key={type}
            onClick={() => handleReact(type)}
            className={`flex items-center space-x-1 rounded-full px-4 py-2 transition-colors ${
              isActive
                ? 'bg-accent-100 text-accent-500 dark:bg-accent-900/30'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <span className={isActive ? 'text-accent-500' : ''}>
              {reactionIcons[type]}
            </span>
            <span>{counts[type]}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ReactionButtons;
