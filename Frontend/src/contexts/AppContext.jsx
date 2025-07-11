import { Children, createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL

const AppContext= createContext();

export const AppProvider=({children})=>{
    const navigate= useNavigate();

    const [token, settoken] = useState(null)
    const [blogs, setblogs] = useState([])
    const [input, setinput] = useState("")

    const fetchblogs= async()=>{
        try {
            const {data}= await axios.get('/api/blog/all')
            data.success?setblogs(data.blogs):toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
      fetchblogs();
      const token =localStorage.getItem('token');
      if (token) {
        settoken(token);
        axios.defaults.headers.common['Authorization']=`${token}`;
      }
    }, [])
    
    const value={
        axios,navigate,token,settoken,blogs,setblogs,input,setinput
    }
    return(
       <AppContext.Provider value={value}>
        {children}
       </AppContext.Provider>
    )
}

export const useAppcontext=()=>{
    return useContext(AppContext)
}