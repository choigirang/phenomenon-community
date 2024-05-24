import React from 'react';

import { Notice } from '@/type/common';
import { PostType } from '@/type/community/type';
import { GalleryType } from '@/type/gallery/type';

interface NoticeProps extends Notice {
  author: string;
  views: undefined;
  likes: undefined;
}

interface Props extends React.PropsWithChildren {
  data: PostType | GalleryType | NoticeProps;
  src: string;
}

// type guard - notice
function isNotice(data: PostType | GalleryType | NoticeProps): data is NoticeProps {
  return (data as NoticeProps).noticeNumber !== undefined;
}

/** 2024/05/21 - title in page */
export default function Title({ data, src, children }: Props) {
  return (
    <React.Fragment>
      <h2 className="text-lg text-blue border-b-4 border-darkBlue font-bold">{src}</h2>
      {/* author*/}
      <div className="flex flex-col border-b">
        <div className="flex justify-between">
          <h2 className="font-bold py-default">{data.title}</h2>
          {children}
        </div>
        <div className="flex justify-between gap-3 text-xs py-default">
          <div className="flex gap-3">
            <h3>{src === '공지사항' ? '운영자' : data.author}</h3>
            <span>|</span>
            <h3>{data.date}</h3>
          </div>
          {/* views & likes when post or gallery each page*/}
          {data.views && data.likes && (
            <div className="flex gap-3">
              <span>조회 : {data.views}</span>
              <span>스크랩 : {data.likes.length}</span>
            </div>
          )}
          {/* notice number when notice page */}
          {isNotice(data) && <span>번호 {data.noticeNumber}</span>}
        </div>
      </div>
    </React.Fragment>
  );
}
