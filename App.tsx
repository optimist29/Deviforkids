
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AvatarsPage from './pages/AvatarsPage';
import StoriesPage from './pages/StoriesPage';
import ActivitiesPage from './pages/ActivitiesPage';
import VideosPage from './pages/VideosPage';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash || '#home');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#home');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    switch (route) {
      case '#avatars':
        return <AvatarsPage />;
      case '#stories':
        return <StoriesPage />;
      case '#activities':
        return <ActivitiesPage />;
      case '#videos':
        return <VideosPage />;
      case '#home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-light text-brand-dark">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
