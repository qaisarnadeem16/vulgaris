
import axios from "axios";

const baseURL= process.env.NEXT_PUBLIC_BACKEND_URL;

export const BuyOneTime = async(sessionType:string,email:string)=>{
    try{
        const response = await axios.post(`${baseURL}/create-checkout-session`,{
           sessionType,
           email
        })
        return response.data;
    }
    catch(error)
    {
        console.log(error)
    }
}
export const BuySubscription = async(sessionType:string,email:string)=>{
    try{
        const response = await axios.post(`${baseURL}/create-checkout-Subscription-session`,{
           sessionType,
           email
        })
        return response.data;
    }
    catch(error)
    {
        console.log(error)
    }
}

export const TogglePaidOneTime = async(email:string)=>{
    await axios.post(`${baseURL}/api/auth/toggle-paid-Onetime`,{
      email
   })
  }