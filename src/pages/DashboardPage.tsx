import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit, Trash2, Plus, Eye, ExternalLink, MoreHorizontal } from 'lucide-react';
import Button from '../components/ui/Button';

// Demo data (would be fetched from API in a real app)
const demoUserPages = [
  {
    id: 'farewell-dream-corp',
    title: 'Farewell, Dream Corp!',
    excerpt: 'After 5 amazing years, it\'s time for me to say goodbye...',
    createdAt: '2023-04-10T10:30:00Z',
    views: 243,
    reactions: 42,
    previewImage: 'https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg',
    status: 'published',
    privacy: 'public',
  },
  {
    id: 'goodbye-hiking-group',
    title: 'Goodbye Hiking Buddies',
    excerpt: 'Thank you for all the wonderful trails and adventures...',
    createdAt: '2023-03-15T16:42:00Z',
    views: 56,
    reactions: 18,
    previewImage: 'https://images.pexels.com/photos/554609/pexels-photo-554609.jpeg',
    status: 'published',
    privacy: 'unlisted',
  },
  {
    id: 'leaving-apartment',
    title: 'Moving Day: Goodbye Apartment 5B',
    excerpt: 'Draft of my goodbye to this amazing apartment...',
    createdAt: '2023-04-20T09:15:00Z',
    views: 0,
    reactions: 0,
    previewImage: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
    status: 'draft',
    privacy: 'private',
  },
];

const DashboardPage = () => {
  const [userPages, setUserPages] = useState(demoUserPages);
  const [activeTab, setActiveTab] = useState('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Filter pages based on active tab
  const filteredPages = userPages.filter((page) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'published') return page.status === 'published';
    if (activeTab === 'drafts') return page.status === 'draft';
    return true;
  });

  // Handle page deletion
  const handleDeletePage = (pageId: string) => {
    setUserPages(userPages.filter((page) => page.id !== pageId));
    setShowDeleteConfirm(null);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
        <h1>My Pages</h1>
        <Link to="/create" className="btn btn-primary mt-4 sm:mt-0">
          <Plus size={16} className="mr-2" />
          Create New Page
        </Link>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-4 text-sm font-medium ${
              activeTab === 'all'
                ? 'border-b-2 border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('published')}
            className={`py-4 text-sm font-medium ${
              activeTab === 'published'
                ? 'border-b-2 border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300'
            }`}
          >
            Published
          </button>
          <button
            onClick={() => setActiveTab('drafts')}
            className={`py-4 text-sm font-medium ${
              activeTab === 'drafts'
                ? 'border-b-2 border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300'
            }`}
          >
            Drafts
          </button>
        </nav>
      </div>

      {/* Pages list */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {filteredPages.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredPages.map((page, index) => (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="relative p-4 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <div className="mb-4 mr-4 h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg sm:mb-0">
                    <img
                      src={page.previewImage}
                      alt={page.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="mb-1 flex items-center">
                      <h3 className="font-medium">{page.title}</h3>
                      {page.status === 'draft' && (
                        <span className="ml-2 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                          Draft
                        </span>
                      )}
                      {page.privacy === 'unlisted' && (
                        <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          Unlisted
                        </span>
                      )}
                      {page.privacy === 'private' && (
                        <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          Private
                        </span>
                      )}
                    </div>
                    
                    <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                      {page.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>Created: {formatDate(page.createdAt)}</span>
                      {page.status === 'published' && (
                        <>
                          <span className="flex items-center">
                            <Eye size={14} className="mr-1" />
                            {page.views} views
                          </span>
                          <span>{page.reactions} reactions</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center space-x-2 sm:mt-0 sm:ml-4">
                    {page.status === 'published' && (
                      <Link
                        to={`/view/${page.id}`}
                        className="rounded-md bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        title="View Page"
                      >
                        <ExternalLink size={18} />
                      </Link>
                    )}
                    
                    <Link
                      to={`/edit/${page.id}`}
                      className="rounded-md bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      title="Edit Page"
                    >
                      <Edit size={18} />
                    </Link>
                    
                    <button
                      onClick={() => setShowDeleteConfirm(page.id)}
                      className="rounded-md bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-error-100 hover:text-error-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-error-900/30 dark:hover:text-error-400"
                      title="Delete Page"
                    >
                      <Trash2 size={18} />
                    </button>
                    
                    <div className="relative">
                      <button
                        className="rounded-md bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        title="More Options"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Delete confirmation */}
                {showDeleteConfirm === page.id && (
                  <div className="mt-4 rounded-md bg-error-50 p-4 dark:bg-error-900/20">
                    <p className="mb-3 text-sm text-error-800 dark:text-error-200">
                      Are you sure you want to delete "{page.title}"? This action cannot be undone.
                    </p>
                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowDeleteConfirm(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="accent"
                        size="sm"
                        onClick={() => handleDeletePage(page.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="mb-4 rounded-full bg-gray-100 p-3 dark:bg-gray-700">
              <Plus size={24} className="text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="mb-1 text-lg font-medium">No pages found</h3>
            <p className="mb-4 text-center text-gray-600 dark:text-gray-400">
              {activeTab === 'drafts'
                ? "You don't have any draft pages yet."
                : activeTab === 'published'
                ? "You haven't published any pages yet."
                : "You haven't created any pages yet."}
            </p>
            <Link to="/create" className="btn btn-primary">
              Create Your First Page
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;