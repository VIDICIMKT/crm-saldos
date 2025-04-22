import { Card, CardContent, Typography } from '@mui/material';

const SalesSummary = ({ sales }) => {
  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
  const avgSale = sales.length > 0 ? totalSales / sales.length : 0;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Resumen de Ventas</Typography>
        <Typography>Total de ventas: ${totalSales.toFixed(2)}</Typography>
        <Typography>Ventas realizadas: {sales.length}</Typography>
        <Typography>Ticket promedio: ${avgSale.toFixed(2)}</Typography>
      </CardContent>
    </Card>
  );
};

export default SalesSummary;