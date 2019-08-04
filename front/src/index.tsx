import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createGlobalStyle } from 'styled-components/macro'
import { Provider } from 'react-redux'
import store from './store'

const Style = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Quicksand:400,700&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');
    font-family: 'Nunito';
    margin: 0;
  }
`

ReactDOM.render(
  <Provider store={store}>
    <Style />
    <App />
  </Provider>,
  document.getElementById('root')
)
