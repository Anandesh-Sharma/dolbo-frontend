import React, { Suspense, useEffect } from 'react';
import nprogress from 'nprogress';

interface SuspenseProgressProps {
  children: React.ReactNode;
}

export default function SuspenseProgress({ children }: SuspenseProgressProps) {
  useEffect(() => {
    nprogress.start();
    setTimeout(() => {
      nprogress.done();
    }, 1000);
  }, []);

  return <Suspense fallback={null}>{children}</Suspense>;
} 