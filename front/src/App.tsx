import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { connect } from 'react-redux'

import { TemperatureUnit, User } from './types'
import {
  requestWeather,
  changeUnit,
  requestSignIn,
  requestSignOut,
  requestCheckSession
} from './actions'
import { AppState } from './store'
import Temperature from './components/Temperature'
import CityInput from './components/CityInput'
import Background from './components/Background'
import Header from './components/Header'
import UnitSelect from './components/UnitSelect'
import UserButton from './components/UserButton'

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
  user: User | null
  onRequestWeather: () => void
  onChangeUnit: (unit: TemperatureUnit) => void
  onRequestSignIn: () => void
  onRequestSignOut: () => void
  onCheckSession: () => void
}

function App({
  temperature,
  unit,
  user,
  onRequestWeather,
  onChangeUnit,
  onRequestSignIn,
  onRequestSignOut,
  onCheckSession
}: AppProps) {
  useEffect(() => {
    onRequestWeather()
    onCheckSession()
  }, [onRequestWeather, onCheckSession])

  if (temperature === null) return null

  return (
    <>
      <Background />
      <Header>
        <UnitSelect selected={unit} onChange={onChangeUnit} />
        <UserButton
          user={user}
          onSignIn={onRequestSignIn}
          onSignOut={onRequestSignOut}
        />
      </Header>
      <Container>
        <Temperature key={temperature} unit={unit}>
          {temperature.toFixed(0)}
        </Temperature>
        <CityInput />
      </Container>
    </>
  )
}

const mapStateToProps = ({
  weather: { temperature, unit },
  user: { logged }
}: AppState) => ({
  temperature: temperature
    ? unit === 'F'
      ? temperature.fahrenheit
      : temperature.celsius
    : null,
  unit,
  user: logged
})

const mapDispatchToProps = (dispatch: any) => ({
  onRequestWeather: () => dispatch(requestWeather()),
  onChangeUnit: (unit: TemperatureUnit) => dispatch(changeUnit(unit)),
  onRequestSignIn: () => dispatch(requestSignIn()),
  onRequestSignOut: () => dispatch(requestSignOut()),
  onCheckSession: () => dispatch(requestCheckSession())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
