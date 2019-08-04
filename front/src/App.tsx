import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { connect } from 'react-redux'

import Temperature from './components/Temperature'
import City from './components/City'
import Background from './components/Background'
import { requestWeather } from './actions'
import { AppState } from './store'

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
  onRequestWeather: () => void
}

function App({ temperature, onRequestWeather }: AppProps) {
  useEffect(() => {
    onRequestWeather()
  }, [onRequestWeather])

  if (temperature === null) return null

  return (
    <>
      <Background />
      <Container>
        <Temperature unit='F'>{temperature.toFixed(0)}</Temperature>
        <City>São Paulo, SP</City>
      </Container>
    </>
  )
}

const mapStateToProps = (state: AppState) => ({
  temperature: state.weather.temperature
})

const mapDispatchToProps = (dispatch: any) => ({
  onRequestWeather: () => dispatch(requestWeather())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
