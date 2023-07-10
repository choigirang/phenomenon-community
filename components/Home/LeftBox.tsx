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
  width: 100%;
  height: 100%;
  background: lightblue;
`;
