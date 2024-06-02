import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Select, SimpleGrid, Spinner, Text, useToast } from '@chakra-ui/react';
import ProductCard from '../component/ProductCard';
import { useSearchParams } from 'react-router-dom';

const HomePage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const toast = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products');
        setAllProducts(response.data.data);
        //setProducts(response.data.data);
      } catch (error) {
        setError(error);
        toast({
          title: "Error loading products.",
          description: "There was an error loading the products.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  const handleSortChange = (e) => {
    const sort = e.target.value;
    searchParams.set('sort', sort);
    setSearchParams(searchParams);
  };

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    console.log(filter)
    searchParams.set('filter', filter);
    setSearchParams(searchParams);
    console.log(searchParams)
  };

  useEffect(() => {
    const sort = searchParams.get('sort');
    const filter = searchParams.get('filter');

    let filteredProducts = [...allProducts];
    if (filter) {
      filteredProducts = filteredProducts.filter(product => product.category === filter);
    }
    if (sort) {
      filteredProducts.sort((a, b) => (sort === 'ascending' ? a.price - b.price : b.price - a.price));
    }

    setProducts(filteredProducts);
  }, [searchParams, allProducts]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>Error loading products.</Text>;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Select placeholder="Sort by Price" onChange={handleSortChange} value={searchParams.get('sort') || ''}>
          <option value="ascending">Low-to-high</option>
          <option value="descending">High-to-Low</option>
        </Select>
        <Select placeholder="Filter by Category" onChange={handleFilterChange} value={searchParams.get('filter') || ''}>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
          <option value="Home Decor">Home Decor</option>
        </Select>
      </Box>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default HomePage;

