import React from 'react';
import styled from 'styled-components';

export default function LeftBox() {
  return (
    <Container>
      <div className="first-box">
        <ul className="hof-article"></ul>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 70%;
  height: 100%;
`;
