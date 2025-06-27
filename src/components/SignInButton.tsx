import { useState, useEffect } from 'react';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { signIn, signOut, getCurrentUser } from '../Authentication/authService';
  import { useCallback } from 'react';

interface SignInButtonProps {
  className?: string;
  showText?: boolean;
  onAuthStateChange?: (user: unknown) => void;
}

export default function SignInButton({ 
  className = '', 
  showText = true,
  onAuthStateChange 
}: SignInButtonProps) {
  const [user, setUser] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  const checkAuthState = useCallback(async () => {
    try {
      setIsLoading(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      onAuthStateChange?.(currentUser);
    } catch (err) {
      console.error('Error checking auth state:', err);
      setUser(null);
      onAuthStateChange?.(null);
    } finally {
      setIsLoading(false);
    }
  }, [onAuthStateChange]);

  useEffect(() => {
    // Check for authenticated user on component mount
    checkAuthState();
  }, [checkAuthState]);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Initiating sign in...');
      await signIn();
      // Note: signInWithRedirect will redirect the page, so we won't reach this point
      // The auth state will be updated when the user returns from the redirect
    } catch (err: unknown) {
      console.error('Sign in failed:', err);
      const errorMessage =
        typeof err === 'object' && err !== null && 'message' in err
          ? (err as { message?: string }).message
          : undefined;
      setError(errorMessage || 'Sign in failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Signing out...');
      await signOut();
      setUser(null);
      onAuthStateChange?.(null);
      console.log('Sign out successful');
    } catch (err: unknown) {
      console.error('Sign out failed:', err);
      const errorMessage =
        typeof err === 'object' && err !== null && 'message' in err
          ? (err as { message?: string }).message
          : undefined;
      setError(errorMessage || 'Sign out failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    if (user) {
      handleSignOut();
    } else {
      handleSignIn();
    }
  };

  // Show error message if there's an error
  if (error) {
    return (
      <div className="signin-error">
        <button
          className={`search-btn error ${className}`}
          onClick={() => setError(null)}
          title={error}
        >
          ⚠️ {showText && 'Error'}
        </button>
      </div>
    );
  }

  return (
    <button
      className={`search-btn ${className}`}
      onClick={handleClick}
      disabled={isLoading}
      aria-label={user ? 'Sign Out' : 'Sign In'}
      title={user ? 'Sign Out' : 'Sign In'}
    >
      {isLoading ? (
        // Loading spinner
        <div className="loading-spinner">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" opacity="0.3"/>
            <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 12 12"
                to="360 12 12"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      ) : user ? (
        // Signed in state
        <>
          <FiLogOut size={20} />
          {showText && <span className="signin-btn-text">Sign Out</span>}
        </>
      ) : (
        // Signed out state
        <>
          <FiLogIn size={20} />
          {showText && <span className="signin-btn-text">Sign In</span>}
        </>
      )}
    </button>
  );
}