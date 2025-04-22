import { useState, useEffect } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import SaleForm from '../components/sales/SaleForm';
import SalesSummary from '../components/sales/SalesSummary';
import { Box, Typography } from '@mui/material';

const Sales = () => {
  const { getDocuments, addDocument } = useFirestore();
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  const loadData = async () => {
    const [productsData, salesData] = await Promise.all([
      getDocuments('products'),
      getDocuments('sales')
    ]);
    setProducts(productsData);
    setSales(salesData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddSale = async (sale) => {
    await addDocument('sales', {
      ...sale,
      date: new Date(),
      userId: auth.currentUser.uid
    });
    loadData();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Ventas</Typography>
      <SaleForm products={products} onSubmit={handleAddSale} />
      <SalesSummary sales={sales} />
    </Box>
  );
};

export default Sales;