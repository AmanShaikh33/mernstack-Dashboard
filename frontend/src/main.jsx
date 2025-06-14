import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserContextProvider } from './context/UserContext.jsx'
import { MoodContextProvider } from './context/MoodContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>  
    <UserContextProvider>  
      <MoodContextProvider>
       <App />
       </MoodContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
