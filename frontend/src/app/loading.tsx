'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Gallery from './(common)/(aboutContent)/(skelete)/gallery';

const SKELETON: { [key: string]: React.ReactNode } = {
  gallery: Gallery(),
};

export default function Loading() {
  const path = usePathname();
  const [SkeletonComponent, setSkeletonComponent] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const matchedSkeleton = Object.keys(SKELETON).find(key => path.slice(1).startsWith(key));
    setSkeletonComponent(matchedSkeleton ? SKELETON[matchedSkeleton] : null);
  }, [path]);

  if (!SkeletonComponent) return null;

  return <div>{SkeletonComponent}</div>;
}
