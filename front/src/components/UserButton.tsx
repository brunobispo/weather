import React from 'react'
import styled from 'styled-components'

import { User } from '../types'

const Container = styled.button`
  font-family: Quicksand;
  font-weight: bold;
  color: #fff;
  font-size: .8em;
  padding: 8px 20px;
  border-radius: 50px;
  border: #ffffff 2px solid;
  transition: all 200ms;
  background: #ffffff00;
  align-self: right;
  cursor: pointer;
  &:hover {
    background: #ffffff66;
  }
  &:focus {
    outline: none;
  }
`

export interface UserButtonProps {
  user: User | null
  onSignIn: () => void
  onSignOut: () => void
}

function UnitSelect({ user, onSignIn, onSignOut }: UserButtonProps) {
  return (
    <Container onClick={user ? onSignOut : onSignIn}>
      {user ? user.name : 'Entrar com Facebook'}
    </Container>
  )
}

export default UnitSelect
