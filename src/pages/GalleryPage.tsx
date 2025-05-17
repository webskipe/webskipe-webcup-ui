import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Clock, Search } from 'lucide-react';
import { fetchUserPages } from '../services/pageService';
import { UserPage } from '../types/userPage';

// Demo data (would be fetched from API in a real app)
const demoPages = [
  {
    id: 'farewell-dream-corp',
    title: 'Farewell, Dream Corp!',
    excerpt: 'After 5 amazing years, it\'s time for me to say goodbye...',
    author: 'jane_smith',
    createdAt: '2023-04-10T10:30:00Z',
    views: 243,
    reactions: 42,
    previewImage: 'https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg',
    tone: 'grateful',
    template: 'celebration',
  },
  {
    id: 'goodbye-new-york',
    title: 'Goodbye, New York',
    excerpt: 'The city that never sleeps gave me the best 3 years of my life...',
    author: 'mike_walker',
    createdAt: '2023-04-05T14:23:00Z',
    views: 189,
    reactions: 35,
    previewImage: 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg',
    tone: 'nostalgic',
    template: 'minimal',
  },
  {
    id: 'farewell-college-days',
    title: 'So Long, College Days',
    excerpt: 'Four unforgettable years coming to an end...',
    author: 'samantha',
    createdAt: '2023-04-02T09:17:00Z',
    views: 312,
    reactions: 56,
    previewImage: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
    tone: 'celebratory',
    template: 'nostalgic',
  },
  {
    id: 'adios-startup-life',
    title: 'Adios, Startup Life!',
    excerpt: 'What a wild ride it has been...',
    author: 'alex_dev',
    createdAt: '2023-03-28T16:45:00Z',
    views: 178,
    reactions: 29,
    previewImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    tone: 'humorous',
    template: 'dramatic',
  },
  {
    id: 'au-revoir-paris',
    title: 'Au Revoir, Paris',
    excerpt: 'My year abroad has come to an end...',
    author: 'emily',
    createdAt: '2023-03-25T11:39:00Z',
    views: 207,
    reactions: 38,
    previewImage: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg',
    tone: 'emotional',
    template: 'nostalgic',
  },
  {
    id: 'leaving-tech-giants',
    title: 'Leaving Tech Giants Inc.',
    excerpt: 'After a decade, it\'s time for a new challenge...',
    author: 'david_tech',
    createdAt: '2023-03-20T13:15:00Z',
    views: 421,
    reactions: 64,
    previewImage: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg',
    tone: 'professional',
    template: 'minimal',
  },
];



// Filter options
const toneFilters = [
  { value: '', label: 'All Tones' },
  { value: 'grateful', label: 'Grateful' },
  { value: 'nostalgic', label: 'Nostalgic' },
  { value: 'celebratory', label: 'Celebratory' },
  { value: 'humorous', label: 'Humorous' },
  { value: 'emotional', label: 'Emotional' },
  { value: 'professional', label: 'Professional' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'popular', label: 'Most Popular' },
];

const GalleryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTone, setSelectedTone] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  // const [pages, setPages] = useState<UserPage[] | null>(null);
  // const [loading, setLoading] = useState(true);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // useEffect(() => {
  //   const loadPages = async () => {
  //     try {
  //       const data = await fetchUserPages();
  //       setPages(data);
  //     } catch (error) {
  //       console.error('Failed to fetch pages:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadPages();
  // }, []);



  // Filter pages based on search query and tone
  const filteredPages = demoPages.filter((page) => {
    const matchesSearch = 
      searchQuery === '' || 
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTone = selectedTone === '' || page.tone === selectedTone;
    
    return matchesSearch && matchesTone;
  });

  // Sort pages based on sort option
  const sortedPages = [...filteredPages].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'popular':
        return b.views - a.views;
      default:
        return 0;
    }
  });

  // if (loading) return <p>Loading pages...</p>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-4">Farewell Gallery</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Explore how others have said their goodbyes and get inspired for your own farewell page.
        </p>
      </div>

      {/* Search and filters */}
      <div className="mb-8 flex flex-col space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        <div className="relative flex-grow">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search farewell pages..."
            className="input w-full pl-10"
          />
        </div>
        
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <select
            value={selectedTone}
            onChange={(e) => setSelectedTone(e.target.value)}
            className="select"
          >
            {toneFilters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Gallery grid */}
      {sortedPages.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedPages.map((page, index) => (
            <motion.div
              key={page.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                to={`/view/${page.id}`}
                className="group block overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={page.previewImage}
                    alt={page.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  <div className="absolute bottom-0 w-full p-4">
                    <h3 className="mb-1 text-lg font-semibold text-white">
                      {page.title}
                    </h3>
                    <p className="text-sm text-white/80">by {page.author}</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-400">
                    {page.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Eye size={16} className="mr-1" />
                        {page.views}
                      </span>
                      <span className="capitalize">{page.tone}</span>
                    </div>
                    
                    <span className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {formatDate(page.createdAt)}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="mt-12 text-center">
          <h3 className="text-xl font-medium">No results found</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;