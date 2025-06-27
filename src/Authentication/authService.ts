// Utility functions for authentication using AWS Amplify v6+
import { signInWithRedirect, signOut as amplifySignOut, getCurrentUser as amplifyGetCurrentUser } from '@aws-amplify/auth';

/**
 * Launches the hosted Cognito Sign-In / Sign-Up UI (federated or email/pw).
 */
export async function signIn(): Promise<void> {
  try {
    console.log('Attempting to sign in...');
    await signInWithRedirect();
    console.log('Sign in redirect initiated');
  } catch (error) {
    console.error('Sign in failed:', error);
    throw error;
  }
}

/**
 * Signs out the current user and clears session data.
 */
export async function signOut(): Promise<void> {
  try {
    console.log('Attempting to sign out...');
    await amplifySignOut();
    console.log('Sign out successful');
  } catch (error) {
    console.error('Sign out failed:', error);
    throw error;
  }
}

/**
 * Retrieves the currently authenticated user, or null if none.
 */
export async function getCurrentUser() {
  try {
    const user = await amplifyGetCurrentUser();
    console.log('Current user:', user);
    return user;
  } catch {
    console.log('No authenticated user');
    return null;
  }
}