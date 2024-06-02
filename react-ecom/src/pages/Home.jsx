import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Container, HStack } from '@chakra-ui/react'


const Home = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [searchParams, setSearchParams] = useState([])

    useEffect(() => {
        setIsLoading(true)
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products")
                console.log(response.data.data)
                setProducts(response?.data?.data)
                setIsLoading(false)
            } catch (error) {
                setError(error)
                console.log(error)
                setIsLoading(false)
            }
        }
        fetchProducts()
    }, [])

    return (
        <Box>
            {products.map((ele) => (
                <Box>
                    <img src= {ele.image} alt="" />
                    Title: {ele.title}
                    Price: {ele.price}
                </Box>
            ))}


        </Box>
    )
}

export default Home