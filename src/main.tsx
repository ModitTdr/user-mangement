import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeProvider.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <main>
    <Provider store={store}>
      <Toaster />
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </main>
)
