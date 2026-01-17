'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Clerk sign-in page
    router.push('/sign-in');
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-lg">Redirecting to sign in...</p>
    </div>
  );
}
