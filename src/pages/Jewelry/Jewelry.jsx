import React, { useEffect, useState } from 'react';
import JewelryCollection from './JewelryCollection';
import { getProducts } from '../../services/ProductService';

const Jewelry = () => {
  const [jewelryData, setJewelryData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const params = {
        search: '',
        category: null,
        priceInf: null,
        priceSup: null,
        nbDisplay: 10,
        page: 1,
      };

      const products = await getProducts(params);

      if (products && products.produits) {
        const formattedData = products.produits.map((product) => ({
          id: product.idProd,
          image: `${import.meta.env.VITE_API_URL}img/${product.tabPhoto[0]}`,
          title: product.libProd,
          price: `${product.prix}€`,
        }));

        setJewelryData(formattedData);
      }
    };

    fetchProducts();
  }, []);

  return (
    <JewelryCollection
      collectionData={jewelryData}
      backgroundImage="/src/assets/img/bijoux.webp"
      collectionName="Bijoux"
      collectionTitle="Retrouvez ici tous les bijoux disponibles !"
    />
  );
};

export default Jewelry;