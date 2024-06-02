import React, { useState, useEffect,useRef} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import {
    Box,
    Button,
    Image,
    Spinner,
    Text,
    useToast,
    useDisclosure,
    AlertDialog,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogBody,

} from '@chakra-ui/react'

const ProductDetails = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products/${id}`)
                setProduct(response.data.data)
                console.log(`data ${response.data.data}`)
            } catch (error) {
                setError(error)
                toast({
                    title: "Error loading products",
                    description: 'There was an error loading the product',
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            } finally {
                setIsLoading(false)
            }
        }
        fetchProduct()
    }, [id, toast])

    if (isLoading) {
        return <Spinner />
    }

    if (error) {
        return <Text>Error loading Product.</Text>
    }

    const handleAddToCart = () => {
        onClose()
        toast({
            title: "item added to cart",
            description: "item has been added to your cart",
            status: "success",
            duration: 2000,
            isClosable: true,

        })
    }
    return (
        <Box maxW='md' mx='auto' mt={10} p={5} borderWidth='1px' borderRadius='lg'>
            <Image src={product.image} alt={product.title} mb={4} />
            <Text mb={2}>{product.title}</Text>
            <Text mb={2}>{product.category}</Text>
            <Text mb={4}>{product.price}</Text>
            <Text mb={2}>{product.description}</Text>

            <Button colorScheme='green' onClick={onOpen}>Add to Cart</Button>

            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Add to Cart
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to add this item to cart?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='green' onClick={handleAddToCart} ml={3}>
                                Confirm
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    )
}

export default ProductDetails