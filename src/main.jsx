import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { LanguageProvider } from './contexts/LanguageContext.jsx'
import { MusicProvider } from './contexts/MusicContext.jsx'
import { FavoritesProvider } from './contexts/FavoritesContext.jsx'
import { router } from './routes/index.jsx'
import './styles/typography.css'
import './styles/theme.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <MusicProvider>
            <FavoritesProvider>
              <RouterProvider router={router} />
            </FavoritesProvider>
          </MusicProvider>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
)
