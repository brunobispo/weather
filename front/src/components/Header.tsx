import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100px;
  background: linear-gradient(#00000066, #00000000);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Header:React.FC = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

export default Header

