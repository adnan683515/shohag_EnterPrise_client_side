import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Login from './components/Auth/Login.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Login></Login>
  </StrictMode>,
)
