import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Text fontSize="xl" fontWeight="bold">{product.title}</Text>
      <Text>{product.category}</Text>
      <Text>${product.price}</Text>
      <Button as={RouterLink} to={`/product/${product.id}`} mt={3}>
        More Details
      </Button>
    </Box>
  );
};

export default ProductCard;
