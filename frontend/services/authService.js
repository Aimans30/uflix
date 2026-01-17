import api from './api';
import { useAuth, useUser } from '@clerk/nextjs';

// Sync Clerk user to backend database
export const syncUser = async () => {
  try {
    const response = await api.post('/auth/sync');
    return response.data;
  } catch (error) {
    console.error('User sync failed:', error);
    throw error;
  }
};

// Get current user from backend
export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Check if user is authenticated (use Clerk's useAuth hook in components)
export const isAuthenticated = () => {
  // This is a placeholder - use Clerk's useAuth hook in components
  // In server components, use auth() from @clerk/nextjs
  return typeof window !== 'undefined' && window.Clerk?.user !== null;
};

// Check if user is admin
export const isAdmin = () => {
  // This should be checked from backend user data
  // Use getCurrentUser() to get role from database
  return false; // Placeholder
};

// Get stored user data (from Clerk)
export const getStoredUser = () => {
  if (typeof window !== 'undefined' && window.Clerk?.user) {
    return {
      id: window.Clerk.user.id,
      email: window.Clerk.user.primaryEmailAddress?.emailAddress,
      name: window.Clerk.user.fullName,
    };
  }
  return null;
};

// Logout is handled by Clerk's SignOutButton or useClerk hook
export const logout = async () => {
  if (typeof window !== 'undefined' && window.Clerk) {
    await window.Clerk.signOut();
  }
};
