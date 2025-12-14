import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import { RouterProvider } from 'react-router'
import { route } from './Routes/route.ts'
import Authprovider from './Context/Authprovider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>


    <Authprovider>
      <RouterProvider router={route}></RouterProvider>
    </Authprovider>



  </StrictMode>,
)
