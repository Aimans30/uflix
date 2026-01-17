'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Clerk sign-up page
    router.push('/sign-up');
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-lg">Redirecting to sign up...</p>
    </div>
  );
}
