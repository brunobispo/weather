import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  width: 100%;
  background: linear-gradient(#00000066, #00000000);
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 20px;
  justify-content: space-between;
  box-sizing: border-box;
`

const Header:React.FC = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

export default Header

