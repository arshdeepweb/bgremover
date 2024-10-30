import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'

export const appContext = createContext(null)

const AppContextProvider = (props) => {

  const [credit, setCredit] = useState(false)
  const [image, setImage] = useState(false)
  const [resultImage, setResultImage] = useState(false)
  const backendURL = import.meta.env.VITE_BACKEND_URL

  const {getToken} = useAuth()
  const {isSignedIn} = useUser()
  const {openSignedIn} = useClerk()
  const navigate = useNavigate()

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
  
  const removeBG = async (image) =>{
    try {
      
      if(!isSignedIn){
        return openSignedIn()
      }
      setImage(image)
      setResultImage(false)

      navigate('/result')

      const token = await getToken()
      console.log(token);
      const formData = new FormData()
      image && formData.append('image', image[0])
      console.log("req start");
      const {data} = await axios.post(backendURL+'/api/image/remove-bg', formData, {headers:{token}})
      console.log("req complete");
      if(data.success){
        setResultImage(data.resultImage)
        data.creditBalance && setCredit(data.creditBalance)
      } else {
        toast.error(data.message)
        data.creditBalance && setCredit(data.creditBalance)
        if(data.creditBalance === 0){
          navigate('/buy')
        }
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const contextValue = {
    credit,
    setCredit,
    backendURL,
    loadCreditData,
    image,
    setImage,
    removeBG,
    resultImage,
    setResultImage
  }

  return(
    <appContext.Provider value={contextValue} >
      {props.children}
    </appContext.Provider>
  )
}

export default AppContextProvider