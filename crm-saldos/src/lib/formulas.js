export const calculateProfit = (sales, purchases) => {
  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalPurchases = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);
  return totalSales - totalPurchases;
};

export const calculateInventoryValue = (products) => {
  return products.reduce((sum, product) => sum + (product.price * product.stock), 0);
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(value);
};