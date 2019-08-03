import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  font-family: Quicksand;
  font-size: 1.5em;
  border: #ffffff33 2px solid;
  color: #fff;
  border-radius: 50px;
  padding: 10px 40px;
`

export interface City {
  children: string
}

function City({ children }: City) {
  return <Container>{children}</Container>
}

export default City
