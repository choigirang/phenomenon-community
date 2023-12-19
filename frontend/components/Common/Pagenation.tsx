import React, { useState, useEffect } from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  initialPageCount?: number; // 새로운 prop 추가
}

const Pagination = ({ pageCount, onPageChange }: PaginationProps) => {
  return (
    <Container>
      <ReactPaginate
        pageCount={pageCount}
        previousLabel={<AiFillCaretLeft />}
        nextLabel={<AiFillCaretRight />}
        pageRangeDisplayed={5} // 보여질 페이지 수
        marginPagesDisplayed={1} // 페이지네이션 컴포넌트의 좌우 여백 페이지 수
        onPageChange={onPageChange}
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: var(--margin-solo);

  ul {
    display: flex;
  }

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    font-size: var(--size-text);
    overflow: hidden;
    border: var(--border-solid1) var(--color-dark-blue);
    border-radius: 5px;
    box-shadow: 1px 3px 3px #666;
  }

  .previous {
    margin-right: var(--margin-small);
  }

  .active {
    background-color: var(--color-dark-blue);
    color: white;
    font-weight: 500;
  }

  .next {
    margin-left: var(--margin-small);
  }
`;

export default Pagination;
