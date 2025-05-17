import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white py-8 dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="mb-4 flex items-center space-x-2">
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                TheEnd<span className="text-accent-500">.page</span>
              </span>
            </Link>
            <p className="mb-4 max-w-md text-gray-600 dark:text-gray-400">
              Create beautiful, expressive pages to mark the end of your adventures, 
              whether it's a job, project, relationship, or any chapter in life.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/gallery" 
                  className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link 
                  to="/create" 
                  className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  Create a Page
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/privacy" 
                  className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-200 pt-8 dark:border-gray-800 md:flex-row">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} TheEnd.page. All rights reserved.
          </p>
          <p className="mt-4 flex items-center text-sm text-gray-600 dark:text-gray-400 md:mt-0">
            Made with 
            <Heart size={16} className="mx-1 text-accent-500" /> 
            for all life's endings and new beginnings
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;