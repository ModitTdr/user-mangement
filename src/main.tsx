import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './routes/router.tsx'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeProvider.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { fetchCurrentUser } from './features/Authentication/authSlice.ts'

store.dispatch(fetchCurrentUser())
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main>
      <Provider store={store}>
        <Toaster />
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </main>
  </StrictMode>,
)
