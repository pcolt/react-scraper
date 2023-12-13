import ReactDOM from 'react-dom/client'
import App from './App'
// import './styles/index.css'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
// import { repos } from './assets/repos.js'
import { GlobalStyle } from './styles/global'


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </StrictMode>
)