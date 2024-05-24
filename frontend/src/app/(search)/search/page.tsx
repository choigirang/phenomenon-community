import { Suspense } from 'react';
import GalleryData from '../galleryData';
import PostData from '../postData';

import { SearchParams } from '@/type/common';

/** 2024/05/24 - divide search data */
export default async function Page(props: SearchParams) {
  const keyword = props.searchParams.keyword;

  return (
    <div className="flex flex-col gap-2">
      {/* gallery data */}
      <Suspense fallback={<h6>갤러리를 받아오고 있습니다.</h6>}>
        <GalleryData keyword={keyword} />
      </Suspense>
      {/* post data */}
      <Suspense fallback={<h6>게시글을 받아오고 있습니다.</h6>}>
        <PostData keyword={keyword} />
      </Suspense>
    </div>
  );
}
