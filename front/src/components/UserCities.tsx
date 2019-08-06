import React from 'react'
import styled from 'styled-components'

import { City } from '../types'

const Container = styled.div`
  display: flex;
  padding: 10px;
  max-width: 30vw;
  flex-wrap: wrap;
  justify-content: center;
`

const CityLabel = styled.label`
  font-family: Quicksand;
  font-size: .8em;
  border-radius: 25px;
  padding: 10px 20px;
  background: #ffffff33;
  font-weight: bold;
  color: #fff;
  margin: 2px 2px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 300ms;
  &:hover {
    background: #ffffff66;
  }
`

export interface UserCitiesProps {
  cities: City[],
  onChange: (city: City) => void
}

function UserCities({ cities, onChange }: UserCitiesProps) {
  if (!cities) return null

  return (
    <Container>
      {cities.map(city => (
        <CityLabel onClick={() => onChange(city)}>
          {city.name}, {city.state}
        </CityLabel>
      ))}
    </Container>
  )
}

export default UserCities
