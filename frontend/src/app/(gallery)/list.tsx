import Image from 'next/image';
import Link from 'next/link';

import { GalleryType } from '@/type/gallery/type';

import { EyeIcon } from '@heroicons/react/16/solid';
import { GALLERY_URL } from '@/constant/constant';

/** 2024/05/10 - gallery img list in home page (parent: preGallery) */
export default function List(data: GalleryType) {
  return (
    <li className="relative flex justify-center items-center w-full min-h-[120px] h-full p-1 bg-lightBlue rounded overflow-hidden">
      <Link href={`/gallery/${data.galleryNumber}`}>
        <Image
          width={150}
          height={150}
          src={GALLERY_URL(data.images[0].src)}
          alt="gallery img"
          priority
          className="rounded"
        />
        <div className="absolute left-0 bottom-0 w-full flex justify-between text-xs text-white px-2 py-1 bg-black/60">
          <div className="flex flex-col">
            <span>{data.title}</span>
            <span>{data.author}</span>
          </div>
          <span>
            <EyeIcon width={12} height={12} color="gray" /> {data.views}
          </span>
        </div>
      </Link>
    </li>
  );
}
