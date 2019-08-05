import React, { useRef } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import useMeasure from 'use-measure'

import { City } from '../types'
import { AppState } from '../store'
import {
  startEditingCity,
  stopEditingCity,
  selectCity,
  searchCities
} from '../actions'

const Container = styled.div<{ editing: boolean; width: number }>`
  position: relative;
  height: 50px;
  z-index: 2
  display: flex;
  font-family: Quicksand;
  font-size: 1.5em;
  color: #fff;
  border-radius: 50px;
  border: 2px solid;
  transition: all 500ms, background 200ms, border-color 200ms;
  width: ${props => (props.editing ? '400px' : `${props.width}px`)};
  border-color: ${props => (props.editing ? '#fff' : '#ffffff33')};
  &:hover {
    cursor: pointer;
    border-color: ${props => (props.editing ? '#ffffffff' : 'transparent')};
    background: ${props => (props.editing ? 'transparent' : '#ffffff66')};
  }
`

const Label = styled.div<{ editing: boolean }>`
  position: absolute;
  white-space: nowrap;
  padding: 10px 40px;
  visibility: ${props => (props.editing ? 'hidden' : 'visible')};
`

const Input = styled.input`
  font-family: Quicksand;
  background: transparent;
  border: none;
  padding: 10px 40px;
  font-size: 1em;
  color: #fff;
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: #ffffff66;
  }
`

const Autocomplete = styled.div`
  position: absolute;
  padding: 10px 40px;
  color: #ffffff66;
`

export interface CityInputProps {
  editing: boolean
  selected: City | null
  searchTerm: string | null
  searchCity: City | null
  onStartEditingCity: () => void
  onStopEditingCity: () => void
  onSelectCity: (city: City) => void
  onSearchCities: (term: string) => void
}

function CityInput({
  editing,
  selected,
  searchTerm,
  searchCity,
  onStartEditingCity,
  onStopEditingCity,
  onSearchCities,
  onSelectCity
}: CityInputProps) {
  const labelRef = useRef(null)
  const labelMeasurement = useMeasure(labelRef)
  const completeLabel =
    searchCity && searchTerm ? searchCity.name.substring(searchTerm.length) : ''

  if (!selected) return null

  return (
    <Container editing={editing} width={labelMeasurement.width + 80}>
      <Label
        editing={editing}
        ref={labelRef}
        onClick={() => onStartEditingCity()}
      >
        {selected.name}, {selected.state}
      </Label>
      {editing && (
        <>
          <Input
            autoFocus
            onBlur={() => onStopEditingCity()}
            onInput={event => onSearchCities(event.currentTarget.value)}
            onKeyPress={event =>
              searchCity && event.key === 'Enter' && onSelectCity(searchCity)
            }
            placeholder='Digite o nome da cidade'
          />
          {completeLabel && (
            <Autocomplete>
              {searchTerm}
              {completeLabel}
            </Autocomplete>
          )}
        </>
      )}
    </Container>
  )
}

const mapStateToProps = ({
  cities: { editing, selected, searchTerm, searchCities, loading }
}: AppState) => ({
  editing,
  selected,
  searchTerm,
  searchCity: searchCities ? searchCities[0] : null,
  loading
})

const mapDispatchToProps = (dispatch: any) => ({
  onStartEditingCity: () => dispatch(startEditingCity()),
  onStopEditingCity: () => dispatch(stopEditingCity()),
  onSelectCity: (city: City) => dispatch(selectCity(city)),
  onSearchCities: (term: string) => dispatch(searchCities(term))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityInput)
