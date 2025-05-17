import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-40 bg-white bg-opacity-90 shadow backdrop-blur dark:bg-gray-900 dark:bg-opacity-90">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
            TheEnd<span className="text-accent-500">.page</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
              }`
            }
          >
            Gallery
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                    isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
                  }`
                }
              >
                Create
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                    isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 transition-colors hover:text-error-600 dark:text-gray-300 dark:hover:text-error-400"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                    isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
                  }`
                }
              >
                Login
              </NavLink>
              <Link
                to="/register"
                className="btn btn-primary"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute left-0 right-0 z-20 bg-white px-4 py-6 shadow-md dark:bg-gray-900 md:hidden">
          <nav className="flex flex-col space-y-4">
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                  isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
                }`
              }
              onClick={closeMenu}
            >
              Gallery
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink
                  to="/create"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                      isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
                    }`
                  }
                  onClick={closeMenu}
                >
                  Create
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                      isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
                    }`
                  }
                  onClick={closeMenu}
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-sm font-medium text-gray-700 transition-colors hover:text-error-600 dark:text-gray-300 dark:hover:text-error-400"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                      isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
                    }`
                  }
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
                <Link
                  to="/register"
                  className="btn btn-primary w-full text-center"
                  onClick={closeMenu}
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;