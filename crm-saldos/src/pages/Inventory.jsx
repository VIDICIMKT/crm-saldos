import { useState, useEffect } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import InventoryTable from '../components/inventory/InventoryTable';
import ProductForm from '../components/inventory/ProductForm';
import { Box, Typography } from '@mui/material';

const Inventory = () => {
  const { getDocuments, addDocument } = useFirestore();
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const data = await getDocuments('products');
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddProduct = async (product) => {
    await addDocument('products', {
      ...product,
      price: Number(product.price),
      stock: Number(product.stock),
      createdAt: new Date()
    });
    loadProducts();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Inventario</Typography>
      <ProductForm onSubmit={handleAddProduct} />
      <InventoryTable products={products} />
    </Box>
  );
};

export default Inventory;