import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './styles/index.css'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
// import { repos } from './assets/repos.js'
import { GlobalStyle } from './styles/styledComponents'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </React.StrictMode>
)