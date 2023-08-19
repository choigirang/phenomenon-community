import React, { useEffect } from 'react';
import styled from 'styled-components';

/** 작성한 본문 */
export default function ShowWritingData({ data }: { data: string }) {
  // ref
  const viewContainerRef = React.useRef<HTMLDivElement>(null);

  // useEffect
  useEffect(() => {
    if (viewContainerRef.current) {
      viewContainerRef.current.innerHTML += data;
    }
  }, []);
  return (
    <Contents.Container>
      <Contents.ViewContainer ref={viewContainerRef} />
    </Contents.Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: var(--padding-content);
  border: var(--border-solid1) var(--color-blue);
`;

const Contents = {
  Container: styled.div`
    width: 100%;
    margin: 0 auto;
    font-size: var(--size-sub-title);
    font-weight: 300;

    & > div {
      width: 100%;

      padding: 16px;

      box-sizing: border-box;

      line-break: anywhere;
    }
  `,

  HtmlContainer: styled.div`
    border: 2px solid orange;
  `,

  ViewContainer: styled.div`
    border: 2px solid var(--color-blue);
    border-radius: 3px;
    background-color: var(--color-dark-white);
  `,
};
