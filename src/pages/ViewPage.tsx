import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import { Heart, Share2, MessageSquare, Copy, Check } from 'lucide-react';
import Button from '../components/ui/Button';
import axiosInstance from '../services/axiosInstance';
import { incrementPageViews } from '../services/pageService';

const ViewPage = () => {
  const { id } = useParams<{ id: string }>(); // id est le slug de la page
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);
  const [reaction, setReaction] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Fetch page data from API
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
            title: data.title,
            message: data.message || '',
            tone: data.tone,
            template: data.template,
            primaryColor: data.primary_color || '#6D28D9',
            backgroundColor: data.background_color || '#f8f9fa',
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
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
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
  const handleReaction = (type: string) => {
    setReaction(type);
    // In a real app, send to API
  };

  // Handle comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        author: 'You',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
        content: comment,
        createdAt: new Date().toISOString(),
      };
      setPage({
        ...page,
        comments: [...(page.comments || []), newComment],
      });
      setComment('');
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
    return new Date(dateString).toLocaleDateString('en-US', {
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
    <div
      className="relative min-h-screen"
      style={{ backgroundColor: page.backgroundColor }}
    >
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
          <h1 className="mb-6 text-center text-4xl font-bold" style={{ color: page.primaryColor }}>
            {page.title}
          </h1>

          <div className="mb-8 whitespace-pre-line text-lg leading-relaxed">
            {page.message}
          </div>

          {/* Reactions */}
          <div className="mb-8 flex justify-center space-x-4">
            <button
              onClick={() => handleReaction('heart')}
              className={`flex items-center space-x-1 rounded-full px-4 py-2 transition-colors ${
                reaction === 'heart'
                  ? 'bg-accent-100 text-accent-500 dark:bg-accent-900/30'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Heart className={reaction === 'heart' ? 'fill-accent-500 text-accent-500' : ''} size={20} />
              <span>{page.reactions.hearts}</span>
            </button>

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
          <h2 className="mb-4 flex items-center text-xl font-semibold">
            <MessageSquare className="mr-2" size={20} />
            Messages ({page.comments.length})
          </h2>

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
              disabled={!comment.trim()}
            >
              Post Message
            </Button>
          </form>

          <div className="space-y-4">
            {page.comments.map((comment: any) => (
              <div
                key={comment.id}
                className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <div className="mb-2 flex items-center space-x-2">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="font-medium">{comment.author}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(comment.createdAt)}
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
