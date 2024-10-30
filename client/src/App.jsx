import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppContextProvider from './context/appContext.jsx';

const App = () => {
  return (
    <div>

      <AppContextProvider>
        <div>
          <ToastContainer position='bottom-right' />
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      </AppContextProvider>
    </div>
  )
}

export default App