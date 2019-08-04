import React from 'react'
import styled from 'styled-components'

import { TemperatureUnit } from '../types'

const Container = styled.div`
  display: inline-block;
  font-family: Quicksand;
  color: #fff;
`

const Option = styled.button<{ selected: boolean }>`
  font-size: .8em;
  border: none;
  padding: 8px 20px;
  font-weight: bold;
  color: ${props => (props.selected ? '#174d9e' : '#fff')}
  background: ${props => (props.selected ? '#fff' : 'transparent')}
  border-radius: 50px;
  border: #ffffff 2px solid;
  transition: all 200ms;
  cursor:pointer;
  &:hover {
    background: ${props => (props.selected ? '#fff' : '#ffffff66')}
  }
  &:focus {
    outline: none;
  }
  &:first-child {
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &:last-child {
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`

export interface UnitSelectProps {
  onChange: (unit: TemperatureUnit) => void
  selected: TemperatureUnit
}

function UnitSelect({ selected, onChange }: UnitSelectProps) {
  return (
    <Container>
      <Option selected={selected === 'F'} onClick={() => onChange('F')}>F</Option>
      <Option selected={selected === 'C'} onClick={() => onChange('C')}>C</Option>
    </Container>
  )
}

export default UnitSelect
