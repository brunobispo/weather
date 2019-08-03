import React from 'react'
import styled, { createGlobalStyle } from 'styled-components/macro'

import Temperature from './components/Temperature'
import City from './components/City'
import Background from './components/Background'

const Style = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Quicksand:400,700&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');
    font-family: 'Nunito';
    margin: 0;
  }
`

const Container = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  background: linear-gradient(#174d9e, #59a6fb9f);
`

function App() {
  return (
    <>
      <Style />
      <Background />
      <Container>
        <Temperature unit='C'>12</Temperature>
        <City>São Paulo, SP</City>
      </Container>
    </>
  )
}

export default App
