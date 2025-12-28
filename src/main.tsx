import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'

import Authprovider from './Context/Authprovider.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { route } from './Routes/route.tsx'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryclient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>


    {/* redux provider */}
    <Provider store={store}>

      {/* tanstack query provider */}
      <QueryClientProvider client={queryclient}>

        <Authprovider>

          {/* router provider */}
          <RouterProvider router={route}></RouterProvider>

          {/* toaster provider */}
          <Toaster
            position="top-right"
            reverseOrder={false}
          />

          
        </Authprovider>


      </QueryClientProvider>



    </Provider>


  </StrictMode>,
)
