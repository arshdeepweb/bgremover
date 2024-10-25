import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home/Home.jsx';
import Result from './pages/Result/Result.jsx';
import BuyCredit from './pages/BuyCredit/BuyCredit.jsx';
import { ClerkProvider } from '@clerk/clerk-react'
import AppContextProvider from './context/appContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "result",
        element: <Result />
      },
      {
        path: "buycredit",
        element: <BuyCredit />,

      }
    ]
  }
])

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </ClerkProvider>
  </StrictMode >,
)
