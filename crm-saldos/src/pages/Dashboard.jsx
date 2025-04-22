import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar,
  LinearProgress
} from '@mui/material';
import { 
  Inventory as InventoryIcon,
  PointOfSale as SalesIcon,
  AttachMoney as FinanceIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useFirestore } from '../../hooks/useFirestore';

const Dashboard = () => {
  const { getDocuments } = useFirestore();
  const [stats, setStats] = useState({
    products: 0,
    sales: 0,
    revenue: 0,
    loading: true
  });

  useEffect(() => {
    const loadData = async () => {
      const [products, sales] = await Promise.all([
        getDocuments('products'),
        getDocuments('sales')
      ]);
      
      setStats({
        products: products.length,
        sales: sales.length,
        revenue: sales.reduce((sum, sale) => sum + sale.total, 0),
        loading: false
      });
    };
    
    loadData();
  }, []);

  const StatCard = ({ icon, title, value, color }) => (
    <Card sx={{ 
      height: '100%', 
      borderRadius: 3,
      boxShadow: 3,
      background: `linear-gradient(135deg, ${color} 0%, #ffffff 100%)`
    }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ 
            bgcolor: 'rgba(255,255,255,0.3)', 
            mr: 2,
            color: 'white'
          }}>
            {icon}
          </Avatar>
          <Typography variant="h6" color="textSecondary">{title}</Typography>
        </Box>
        {stats.loading ? (
          <LinearProgress />
        ) : (
          <Typography variant="h4" fontWeight={700}>
            {title === 'Ingresos' ? `$${value.toLocaleString()}` : value}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          mb: 4,
          fontWeight: 700,
          color: 'primary.main',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        Panel de Control
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<InventoryIcon />} 
            title="Productos" 
            value={stats.products} 
            color="#4361ee" 
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<SalesIcon />} 
            title="Ventas" 
            value={stats.sales} 
            color="#4cc9f0" 
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<FinanceIcon />} 
            title="Ingresos" 
            value={stats.revenue} 
            color="#4895ef" 
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            icon={<PersonIcon />} 
            title="Usuario" 
            value="Activo" 
            color="#3a0ca3" 
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, borderRadius: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Resumen Reciente</Typography>
            {/* Aquí puedes agregar un gráfico o lista de actividades */}
            <Box sx={{ 
              height: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'text.secondary'
            }}>
              Gráfico o lista de actividades
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, borderRadius: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Acciones Rápidas</Typography>
            {/* Botones de acción rápida */}
            <Box sx={{ 
              height: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'text.secondary'
            }}>
              Botones de acción rápida
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;