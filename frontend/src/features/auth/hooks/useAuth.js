import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { login, register } from "../services/auth.api"


export const useAuth = () => {
    const context = useContext(AuthContext)
    const {loading,setLoading,user,setUser} = context
    const handleLogin = async (email,password) => {
            try{
                setLoading(true)
                const response = await login(email,password)
                setUser(response)

            }finally{
                setLoading(false)
            }
    }

    const handleRegister = async (email,username,password) => {
        try{
            setLoading(true)
            const response = await register(email,username,password)
            setUser(response)
        }finally{
            setLoading(false)
        }
    }




    return {
        user,loading,handleLogin,handleRegister
    }
}