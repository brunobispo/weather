import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { connect } from 'react-redux'

import { TemperatureUnit } from './types'
import { requestWeather, changeUnit } from './actions'
import { AppState } from './store'
import Temperature from './components/Temperature'
import City from './components/City'
import Background from './components/Background'
import Header from './components/Header'
import UnitSelect from './components/UnitSelect'

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

export interface AppProps {
  temperature: number | null
  unit: TemperatureUnit
  onRequestWeather: () => void
  onChangeUnit: (unit: TemperatureUnit) => void
}

function App({ temperature, unit, onRequestWeather, onChangeUnit }: AppProps) {
  useEffect(() => {
    onRequestWeather()
  }, [onRequestWeather])

  if (temperature === null) return null

  return (
    <>
      <Background />
      <Header>
        <UnitSelect selected={unit} onChange={onChangeUnit} />
      </Header>
      <Container>
        <Temperature key={temperature} unit={unit}>{temperature.toFixed(0)}</Temperature>
        <City>São Paulo, SP</City>
      </Container>
    </>
  )
}

const mapStateToProps = ({ weather: { temperature, unit } }: AppState) => ({
  temperature: temperature
    ? unit === 'F'
      ? temperature.fahrenheit
      : temperature.celsius
    : null,
  unit
})

const mapDispatchToProps = (dispatch: any) => ({
  onRequestWeather: () => dispatch(requestWeather()),
  onChangeUnit: (unit: TemperatureUnit) => dispatch(changeUnit(unit))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
