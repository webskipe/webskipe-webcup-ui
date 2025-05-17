import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit, Trash2, Plus, Eye, ExternalLink, MoreHorizontal } from 'lucide-react';
import Button from '../components/ui/Button';
import { deletePage, fetchUserPages } from '../services/pageService';
import { UserPage } from '../types/userPage';



const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [filters, setFilters] = useState<any>({me: true});
  const  [datas, setData] = useState<UserPage[]>([]);
  const [loading, setLoading] = useState(true);
  // const [pageNumber, setPageNumber] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  // const [currentPage, setCurrentPage] = useState(1);

  const handlePublishedTab = () => {
    setActiveTab('published');
    setFilters({...filters, status: 'published'});
  };

  const handleDraftsTab = () => {
    setActiveTab('drafts');
    setFilters({...filters, status: 'draft'});
  };

  const handleAllTab = () => {
    setActiveTab('all');
    setFilters({me: true});
  };

  const loadPages = async () => {
    try {
      const data = await fetchUserPages(filters);
      console.log('Pages reçues:', data.results);
      setData(Array.isArray(data.results) ? data.results : []);
    } catch (error) {
      console.error('Failed to fetch pages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
    console.log("data", datas);
    console.log("filters", filters);
  }, [filters]);


  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };


  // // Handle page deletion
  const handleDeletePage = (slug: string) => {
    deletePage(slug).then(() => {
      loadPages();
    });
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
            onClick={handleAllTab}
            className={`py-4 text-sm font-medium ${
              activeTab === 'all'
                ? 'border-b-2 border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={handlePublishedTab}
            className={`py-4 text-sm font-medium ${
              activeTab === 'published'
                ? 'border-b-2 border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300'
            }`}
          >
            Published
          </button>
          <button
            onClick={handleDraftsTab}
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
        {datas.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {datas.map((data, index) => (
              <motion.div
                key={data.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="relative p-4 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <div className="mb-4 mr-4 h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg sm:mb-0">
                    <img
                      src={data.previewImage}
                      alt={data.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="mb-1 flex items-center">
                      <h3 className="font-medium">{data.title}</h3>
                      {data.status === 'draft' && (
                        <span className="ml-2 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                          Draft
                        </span>
                      )}
                      {data.privacy === 'unlisted' && (
                        <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          Unlisted
                        </span>
                      )}
                      {data.privacy === 'private' && (
                        <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          Private
                        </span>
                      )}
                    </div>
                    
                    <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                      {data.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>Created: {formatDate(data.createdAt)}</span>
                      {data.status === 'published' && (
                        <>
                          <span className="flex items-center">
                            <Eye size={14} className="mr-1" />
                            {data.views} views
                          </span>
                          <span>{data.reactions} reactions</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center space-x-2 sm:mt-0 sm:ml-4">
                    {data.status === 'published' && (
                      <Link
                        to={`/view/${data.slug}`}
                        className="rounded-md bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        title="View Page"
                      >
                        <ExternalLink size={18} />
                      </Link>
                    )}
                    
                    <Link
                      to={`/edit/${data.id}`}
                      className="rounded-md bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      title="Edit Page"
                    >
                      <Edit size={18} />
                    </Link>
                    
                    <button
                      onClick={() => setShowDeleteConfirm(data.id)}
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
                {showDeleteConfirm === data.id && (
                  <div className="mt-4 rounded-md bg-error-50 p-4 dark:bg-error-900/20">
                    <p className="mb-3 text-sm text-error-800 dark:text-error-200">
                      Are you sure you want to delete "{data.title}"? This action cannot be undone.
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
                        onClick={() => handleDeletePage(data.slug)}
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