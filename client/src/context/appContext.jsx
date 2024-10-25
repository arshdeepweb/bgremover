import { useAuth } from "@clerk/clerk-react";
import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const appContext = createContext(null)

const AppContextProvider = (props) => {

  const [credit, setCredit] = useState(false)
  const backendURL = import.meta.env.VITE_BACKEND_URL

  const {getToken} = useAuth()

  const loadCreditData = async () =>{
    try {
      console.log("RUN");
      const token = await getToken()
      const response = await axios.get(backendURL+"/api/user/credit",{headers:{token}})
      console.log(response)
      if(response.data.success){
        console.log(response.data)
        setCredit(response.data.credits)
      }



    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    
  }, [])
  


  const contextValue = {
    credit,
    setCredit,
    backendURL,
    loadCreditData
  }

  return(
    <appContext.Provider value={contextValue} >
      {props.children}
    </appContext.Provider>
  )
}

export default AppContextProvider