import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Lightbulb as LightBulb } from 'lucide-react';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import ViewPage from './pages/ViewPage';
import GalleryPage from './pages/GalleryPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useThemeStore } from './stores/themeStore';

function App() {
  const { theme, toggleTheme } = useThemeStore();
  const location = useLocation();

  // Apply theme class to body
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen transition-colors duration-200">
      <button
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-gray-200 p-3 text-gray-800 shadow-md transition-all hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        aria-label="Toggle theme"
      >
        <LightBulb size={20} />
      </button>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="view/:id" element={<ViewPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="create" element={<CreatePage />} />
            <Route path="dashboard" element={<DashboardPage />} />
          </Route>
          
          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;