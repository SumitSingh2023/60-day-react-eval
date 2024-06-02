import React, {createContext, useState,useContext} from 'react'

export const AuthContext= createContext()

export const AuthProvider =({children})=>{
    const [authState, setAuthState] = useState({
        isAuthenticated:false,
        token:null,
        email:null,
    })

    const login=(email,token)=>{
        setAuthState({isAuthenticated:true,email,token})
    }

    const logout=(email,token)=>{
        setAuthState({isAuthenticated:false,email:null,token:null})
    }

    return (
        <AuthContext.Provider value={{authState,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth=()=>{
    return useContext(AuthContext)
}