import PrePosts from './(community)/prePosts';
import PreGallery from './(gallery)/preGallery';
import React from 'react';

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <PreGallery />
      <PrePosts />
    </div>
  );
}
