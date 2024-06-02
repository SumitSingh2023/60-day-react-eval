import React from 'react'
import { Box, Button, Flex, Link, Text } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'



const Navbar = () => {
    const {authState,logout}= useAuth()
    const handleLogout=()=>{
        logout()

    }
    return (
        <Box bg='teal.500' p='5' color='white'>
            <Flex justifyContent='space-between' alignItems='center'>
                {authState.isAuthenticated ? (
                    <>
                        <Text>{authState.email}</Text>
                        <Flex alignItems='center'>
                            <Link as={ReactRouterLink} to='/home' mx={2}>Home</Link>
                            <Button colorScheme='red' variant='solid' onClick={handleLogout}>LOGOUT</Button>
                        </Flex>

                    </>
                ):(
                    <Link as={ReactRouterLink} to='/login'>LOGIN</Link>
                )}

            </Flex>
        </Box>
    )
}

export default Navbar