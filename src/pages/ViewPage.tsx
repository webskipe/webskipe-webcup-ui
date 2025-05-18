import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import { Heart, Share2, MessageSquare, Copy, Check, ThumbsUp, Laugh, Frown } from 'lucide-react';
import Button from '../components/ui/Button';
import axiosInstance from '../services/axiosInstance';
import { createComment, filterCommentsByPage, getMyReactions, incrementPageViews, postReactions } from '../services/pageService';
import DramaticBackground from '../components/backgrounds/dramatic-background';
import ProfessionalBackground from '../components/backgrounds/professional-background';
import HumorousBackground from '../components/backgrounds/humorous-background';
import CelebratoryBackground from '../components/backgrounds/celebratory-background';
import EmotionalBackground from '../components/backgrounds/emotional-background';
import PoeticBackground from '../components/backgrounds/poetic-background';
import ReflectiveBackground from '../components/backgrounds/reflective-background';
import GratefulBackground from '../components/backgrounds/grateful-background';
import ReactionButtons, {ReactionType} from '../components/reactionButton';

const ViewPage = () => {
  const { id } = useParams<{ id: string }>(); // id est le slug de la page
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);
  const [reaction, setReaction] = useState<ReactionType | undefined>(undefined);
  const [comment, setComment] = useState<any>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [reactionData, setReactionData] = useState<any>(null);


  const renderBackground = () => {
    switch (page?.tone) {
      case "dramatic":
        return <DramaticBackground />;
      case "professional":
        return <ProfessionalBackground />;
      case "humorous":
        return <HumorousBackground />;
      case "grateful":
        return <GratefulBackground />;
      case "celebratory":
        return <CelebratoryBackground />;
      case "emotional":
        return <EmotionalBackground />;
      case "poetic":
        return <PoeticBackground />;
      case "reflective":
        return <ReflectiveBackground />;
      default:
        return <DramaticBackground />;
    }
  }

  const [comments, setComments] = useState<any[]>([]);
  // Fetch page data from API

  const fetchReactions = async () => {
    await axiosInstance.get(`/pages/${page?.id}/reactions-summary`).then(
      (res) => {
        console.log('Reactions:', res.data);
        setReactionData(res.data);
      }
    );
    // console.log('Reactions:', res.data);
    
  };

  const handleReaction = async (type: string) => {
    await postReactions(page.id, type).then((res) => {
      console.log('Reaction postée:', res);
    });
  };

  
  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/pages/');
        const results = res.data.results || [];
        const data = results.find((p: any) => String(p.slug) === String(id));
        if (!data) {
          setPage(null);
        } else {
          setPage({
            id: data.id,
            slug: data.slug,
            title: data.title,
            message: data.message || '',
            tone: data.tone,
            template: data.template,
            primaryColor: data.primary_color || '#6D28D9',
            backgroundColor: data.background_color || '#f8f9fa',
            previewImage: data.previewImage,
            author: {
              id: data.user.id,
              username: data.user.username,
              avatar: data.user.avatar
                ? data.user.avatar
                : `https://webskipe.madagascar.webcup.hodi.host/pages/${data.user.username}`,
            },
            createdAt: data.created_at,
            reactions: {
              hearts: data.reactions_count ?? 0,
              likes: 0,
              claps: 0,
            },
            comments: [], // À remplir si tu as les commentaires
          });
        }
      } catch (e) {
        setPage(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [id]);

  const loadComments = async () => {
    filterCommentsByPage(page.id).then((res) => {
      console.log('Comments filtrés:', res);
      setComments(res);
    });
  }

useEffect(() => {
  if (!page?.id) return;

  getMyReactions(page.id).then((res) => {
    console.log('My reactions:', res);
    setReaction(res?.reactions[0]);
  });
}, [page?.id]);

useEffect(() => {
  if (!page?.id) return;
  console.log('page.id:', page.id, 'typeof:', typeof page.id);
  loadComments(); 
    // setComment(res.results[0]);
}, [page?.id]);
  // Update window dimensions when resized
  useEffect(() => {
    incrementPageViews(id!).then((res) => {
      console.log('Page vues incrémentées:', res);
    });
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Stop confetti after 5 seconds
  useEffect(() => {
    fetchReactions();
  }, []);

  // Reset "copied" status after 2 seconds
  useEffect(() => {
    if (linkCopied) {
      const timer = setTimeout(() => {
        setLinkCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [linkCopied]);

  // Handle reaction

  // Handle comment submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      // const newComment = {
      //   id: Date.now(),
      //   author: 'You',
      //   avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      //   content: comment,
      //   createdAt: new Date().toISOString(),
      // };
      const formData = new FormData();
      formData.append('page', page.id);
      formData.append('content', comment);
      createComment(formData).then((res) => {
        console.log('Comment créé:', res);
        setComment(null);
      });
      setComment('');
      loadComments();
    }
  };

  // Handle copy link
  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Page Not Found</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            The farewell page you're looking for doesn't exist or has expired.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {renderBackground()}
      {showConfetti && (
        <ReactConfetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          colors={['#6D28D9', '#EC4899', '#0D9488', '#F97316', '#10B981']}
        />
      )}

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <img
              src={page.author.avatar}
              alt={page.author.username}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{page.author.username}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formatDate(page.createdAt)}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleCopyLink}
            icon={linkCopied ? <Check size={16} /> : <Copy size={16} />}
          >
            {linkCopied ? 'Copied!' : 'Copy Link'}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800"
          style={{
            borderTop: `4px solid ${page.primaryColor}`,
          }}
        >
          {page.previewImage && (
            <div className="mb-6 flex justify-center">
              <img
                src={page.previewImage}
                alt={page.title}
                className="max-h-80 rounded-lg object-contain shadow"
              />
            </div>
          )}
          <h1
            className="mb-6 text-center text-4xl font-bold"
            style={{
              // Optionnel : couleur différente en dark mode
              color: document.documentElement.classList.contains('dark')
                ? '#fff'
                : page.primaryColor,
            }}
          >
            {page.title}
          </h1>

          <div className="mb-8 whitespace-pre-line text-lg leading-relaxed">
            {page.message}
          </div>

          {/* Reactions */}
          <div className="mb-8 flex justify-between">
          <ReactionButtons
            reactions={reactionData}
            onReact={(type) => handleReaction(type)}
            userReaction={reaction}
          />
            {/* <button
              onClick={() => handleReaction('heart')}
              className={`flex items-center space-x-1 rounded-full px-4 py-2 transition-colors ${reaction === 'heart'
                ? 'bg-accent-100 text-accent-500 dark:bg-accent-900/30'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              <Heart className={reaction === 'heart' ? 'fill-accent-500 text-accent-500' : ''} size={20} />
              <span>{page.reactions.hearts}</span>
            </button> */}

            <button
              onClick={() => handleReaction('share')}
              className={`flex items-center space-x-1 rounded-full px-4 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <Share2 size={20} />
              <span>Share</span>
            </button>
          </div>
        </motion.div>

        {/* Comments section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
        >

          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Leave a message..."
              className="textarea mb-2 w-full"
              rows={3}
            ></textarea>
            <Button
              type="submit"
              variant="primary"
            // disabled={!comment.trim()}
            >
              Post Message
            </Button>
          </form>
          <h2 className="mb-4 flex items-center text-xl font-semibold">
            <MessageSquare className="mr-2" size={20} />
            Messages ({comments ? comments.length : 0})
          </h2>

          <form onSubmit={handleCommentSubmit} className="mb-6">
            {/* ... */}
          </form>

          <div className="space-y-4">
            {comments && comments.map((comment: any) => (
              <div
                key={comment.id}
                className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <div className="mb-2 flex items-center space-x-2">
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.username}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="font-medium">{comment.author}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(comment.createdAt || comment.created_at || '')}
                  </span>
                </div>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ViewPage;
