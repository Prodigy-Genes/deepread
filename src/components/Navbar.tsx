import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import the search icon from react-icons (Feather pack)
import '../styles/Navbar.css';
import { getCurrentUser } from '../Authentication/authService';
import SignInButton from './SignInButton';  


export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const location = useLocation();
  const [, setUser] = useState<unknown>(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);


  // Update mobile view state on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll effect: add "scrolled" class once user has scrolled >50px
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside the navbar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest('.navbar')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Helper to check active link
  const isLinkActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Handle auth state changes from SignInButton
  const handleAuthStateChange = (newUser: unknown) => {
    setUser(newUser);
    console.log('Auth state changed:', newUser ? 'Signed in' : 'Signed out');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand/logo */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <span className="brand-text">Deep</span>
          <span className="brand-accent">read</span>
        </Link>

        {/* Link menu */}
        <div className="navbar-menu">
          {['/', '/blog', '/about', '/contact'].map((path, idx) => {
            const label = ['Home', 'Blog', 'About', 'Contact'][idx];
            return (
              <Link
                key={path}
                to={path}
                className={`navbar-link${isLinkActive(path) ? ' active' : ''}`}
                onClick={closeMobileMenu}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="navbar-actions">
           {/* Sign In/Out Button Component */}
          <SignInButton 
            showText={!isMobileView}
            onAuthStateChange={handleAuthStateChange}
          />


          {/* Mobile menu toggle: only on mobile screens */}
          {isMobileView && (
            <button
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                // X (close) icon
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                // Hamburger icon
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu: only on mobile view */}
      {isMobileView && isMobileMenuOpen && (
        <div className="mobile-menu active">
          {['/', '/blog', '/about', '/contact'].map((path, idx) => {
            const label = ['Home', 'Blog', 'About', 'Contact'][idx];
            return (
              <Link
                key={path}
                to={path}
                className={`navbar-link${isLinkActive(path) ? ' active' : ''}`}
                onClick={closeMobileMenu}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
