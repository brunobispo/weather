import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { connect } from 'react-redux'

import { TemperatureUnit, User, City } from './types'
import {
  requestWeather,
  changeUnit,
  requestSignIn,
  requestSignOut,
  requestCheckSession,
  selectCity
} from './actions'
import { AppState } from './store'
import Temperature from './components/Temperature'
import CityInput from './components/CityInput'
import Background from './components/Background'
import Header from './components/Header'
import UnitSelect from './components/UnitSelect'
import UserButton from './components/UserButton'
import UserCities from './components/UserCities'

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
  userCities: City[]
  onRequestWeather: () => void
  onChangeUnit: (unit: TemperatureUnit) => void
  onRequestSignIn: () => void
  onRequestSignOut: () => void
  onCheckSession: () => void
  onChangeCity: (city: City) => void
}

function App({
  temperature,
  unit,
  user,
  userCities,
  onRequestWeather,
  onChangeUnit,
  onRequestSignIn,
  onRequestSignOut,
  onCheckSession,
  onChangeCity
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
        <UserCities cities={userCities} onChange={onChangeCity} />
      </Container>
    </>
  )
}

const mapStateToProps = ({
  weather: { temperature, unit },
  user: { logged },
  cities: { userCities }
}: AppState) => ({
  temperature: temperature
    ? unit === 'F'
      ? temperature.fahrenheit
      : temperature.celsius
    : null,
  unit,
  user: logged,
  userCities
})

const mapDispatchToProps = (dispatch: any) => ({
  onRequestWeather: () => dispatch(requestWeather()),
  onChangeUnit: (unit: TemperatureUnit) => dispatch(changeUnit(unit)),
  onRequestSignIn: () => dispatch(requestSignIn()),
  onRequestSignOut: () => dispatch(requestSignOut()),
  onCheckSession: () => dispatch(requestCheckSession()),
  onChangeCity: (city: City) => dispatch(selectCity(city))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
