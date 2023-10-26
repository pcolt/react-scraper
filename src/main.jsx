import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import './index.css'
import { repos } from './assets/repos.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <App repos={repos}/>
  )