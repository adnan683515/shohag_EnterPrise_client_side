import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'

import Authprovider from './Context/Authprovider.tsx'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { route } from './Routes/route.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>


    <Provider store={store}>


      <Authprovider>
        <RouterProvider router={route}></RouterProvider>

        <Toaster position="top-right" />
      </Authprovider>


    </Provider>


  </StrictMode>,
)
