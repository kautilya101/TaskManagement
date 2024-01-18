import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Header from './container/Header/Header.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    // <Board />
    <BrowserRouter>
      <App/> 
    </BrowserRouter>
)
