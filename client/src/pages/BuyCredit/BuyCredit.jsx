import React, { useCallback, useContext } from 'react'
import { assets, plans } from '../../assets/assets'
import { appContext } from '../../context/appContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from 'react-toastify'

const BuyCredit = () => {

  const { backendURL, loadCreditData } = useContext(appContext)

  const navigate = useNavigate()

  const { getToken } = useAuth()

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: 'Credits Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        const token = await getToken()

        try {
          const {data} = await axios.post(backendURL+'/api/user/verify-razor',response,{headers:{token}})
          if(data.success){
            loadCreditData()
            navigate('/')
            toast.success("Credit Added")
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const paymentRazorpay = async (planId) => {
    console.log("RUN");
    try {
      const token = await getToken();
      const response = await axios.post(`${backendURL}/api/user/pay-razor`, { planId }, { headers: { token } });
      
      if (response.data.success) {
        initPay(response.data.order);
      } else {
        console.error("Payment initiation failed:", response.data.message);
      }
    } catch (error) {
      console.log("Error in paymentRazorpay:", error);
    }
  };
  

  return (
    <div className='mx-4 text-center mb-10 pt-14 min-h-[80vh]'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-4xl text-center xl:text-5xl 2xl:text-6xl font-semibold text-neutral-700 leading-tight mb-6 sm:mb-10'>Choose the plan thats right for you</h1>
      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-700 hover:scale-105 transition-all duration-700' key={index}>
            <img width={40} src={assets.logo_icon} alt="" />
            <p className='mt-3 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6 '>
              <span className='text-3xl font-medium '>${item.price}</span>/ {item.credits} credits
            </p>
            <button className='w-full  bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52' onClick={() => paymentRazorpay(item.id)}>Purchase</button>
          </div>
        ))}
      </div>

    </div>
  )
}

export default BuyCredit