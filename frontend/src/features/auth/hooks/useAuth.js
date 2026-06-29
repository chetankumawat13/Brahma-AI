import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { login } from "../services/auth.api"


export const useAuth = () => {
    const context = useContext(AuthContext)
    const {loading,setLoading,user,setUser} = context

    const handleLogin = async (email,password) => {
            try{
                setLoading(true)
                const response = await login(email,password)
                setUser(response)

            }catch(err){
                console.log(err);
            }finally{
                setLoading(false)
            }
    }




    return {
        user,loading,handleLogin
    }
}