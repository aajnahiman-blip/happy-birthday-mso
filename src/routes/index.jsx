import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { HomePage } from '../pages/HomePage'
import { IntroPage } from '../pages/IntroPage'
import { OurMemoriesPage } from '../pages/OurMemoriesPage'
import { OurPhotosPage } from '../pages/OurPhotosPage'
import { GraduationPage } from '../pages/GraduationPage'
import { UmrahPage } from '../pages/UmrahPage'
import { MemoryBookPage } from '../pages/MemoryBookPage'
import { BirthdayVideosPage } from '../pages/BirthdayVideosPage'
import { LettersPage } from '../pages/LettersPage'
import { FinalSurprisePage } from '../pages/FinalSurprisePage'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <IntroPage />,
  },
  {
    path: '/home',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: 'gallery',
        element: <OurMemoriesPage />,
      },
      {
        path: 'our-photos',
        element: <OurPhotosPage />,
      },
      {
        path: 'graduation',
        element: <GraduationPage />,
      },
      {
        path: 'umrah',
        element: <UmrahPage />,
      },
      {
        path: 'memory-book',
        element: <MemoryBookPage />,
      },
      {
        path: 'videos',
        element: <BirthdayVideosPage />,
      },
      {
        path: 'letters',
        element: <LettersPage />,
      },
      {
        path: 'final-surprise',
        element: <FinalSurprisePage />,
      },
      {
        path: 'music',
        element: <HomePage />,
      },
      {
        path: 'favorites',
        element: <HomePage />,
      },
    ],
  },
])
