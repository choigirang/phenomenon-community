'use client';
import React from 'react';

export default function Gallery() {
  return (
    <React.Fragment>
      <h2 className="text-lg text-blue border-b-4 border-darkBlue font-bold">갤러리</h2>
      <div className="flex justify-center w-full">
        <div className="animate-pulse h-[300px] bg-gray" />
      </div>
    </React.Fragment>
  );
}
