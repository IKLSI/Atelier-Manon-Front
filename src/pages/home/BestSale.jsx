import React, { useState, useEffect } from 'react';
import { Box, Grid2, Stack, Typography, CardMedia, CardContent } from '@mui/material';
import Banner from '../../components/Banner';

import {getBestSellers, getProductImage} from "../../services/ProductService";

const BestSale = ({ products }) => {

  console.log(products)

  return (
    <Stack sx={{ margin: '0 auto', padding: '2rem' }}>
      <Typography
        variant="sectionTitle"
        sx={{
          fontSize: '2.5rem',
          textAlign: 'center',
          letterSpacing: '0.1em',
          marginBottom: '2rem',
        }}
      >
        Bijoux les plus vendus
      </Typography>

      <Box sx={{ width: '100%', margin: '0 auto' }}>
        <Grid2 container spacing={4} justifyContent="center">
          {products && products.length > 1 && products.map((product, index) => (
            <BestSellerItem product={product} />
          ))}
        </Grid2>
      </Box>
      <Banner />
    </Stack>
  );
};


const BestSellerItem = ({ product }) => {

  const [image, setImage] = useState(null);

  useEffect(() => {
    const exec = async () => {
      const img = await getProductImage(product.photo);
      if (!img) return;
      setImage(img);
      console.log(img);
    }
    exec();
  })


  return (

    <Grid2 item xs={12} sm={6} md={4}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CardMedia
          component="img"
          alt={product.photo}
          src={image}
          sx={{ width: '365px', objectFit: 'cover' }}
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="cardTitle" sx={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>
            {product.libProd}
          </Typography>
          <br />
          <Typography variant="cardPrice" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
            {product.prix} €
          </Typography>
        </CardContent>
      </Box>
    </Grid2>
  )
}


export default BestSale;