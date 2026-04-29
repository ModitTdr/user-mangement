import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './routes/router.tsx'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main>
      <Toaster />
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </main>
  </StrictMode>,
)
