import { Metadata } from 'next';
import React from 'react';
import PrePosts from './(posts)/prePosts';
import PreGallery from './(gallery)/preGallery';
import { getMetadata } from '@/constant/metaData';

/** home page meta */
export const generateMetadata = async (): Promise<Metadata> => {
  return getMetadata({
    asPath: `/`,
  });
};

/** 2024/05/11 - home page with latest gallery & latest post */
export default function Page() {
  return (
    <main className="flex flex-col gap-2">
      <PreGallery />
      <PrePosts />
    </main>
  );
}
