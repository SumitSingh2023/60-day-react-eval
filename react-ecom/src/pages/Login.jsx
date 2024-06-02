import React,{useState,useEffect,useRef} from 'react'
import{Box,Button,Input,Text,useToast} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import axios from'axios'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const [email,setEmail] = useState('')
    const [password, setpassword] = useState("")
    const emailInputRef= useRef(null)
    const toast = useToast()
    const navigate = useNavigate()
    const {login} = useAuth()

    useEffect(()=>{
        emailInputRef.current.focus()
    },[])

    const handleLogin = async()=>{
        try {
            const response =await axios.post("https://reqres.in/api/login",{email,password})
            login(email,response.data.token)
            console.log(response.data.token)
            navigate('/home')
        } catch (error) {
            toast({
                title:"login failed"
            })
            
        }
    }
  return (
    <div>Login</div>
  )
}

export default Login