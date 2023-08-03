import styled from 'styled-components';

// 로고
export const Logo = styled.img`
  width: ${props => props.width || '250px'};
  height: ${props => props.height || '50px'};
`;

// 회원가입 버튼
export const NextPage = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100px;
    min-height: 40px;
    color: white;
    font-size: var(--size-sub-title);
    font-weight: 500;
    padding: var(--padding-text);
    background-color: var(--color-gray);
    border: solid 2px #606060;
    cursor: pointer;
  }
`;

// 회원가입 공통 양식
export const Bottom = styled.form`
  width: 100%;
  padding: var(--padding-base);
  margin-bottom: var(--margin-solo);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--padding-side);
`;
