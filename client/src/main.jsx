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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:"",
        element:<Home />
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
