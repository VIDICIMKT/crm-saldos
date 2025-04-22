import { Box, CssBaseline } from '@mui/material';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#f5f7fa',
          minHeight: '100vh',
          marginLeft: '240px' // Ajusta según el ancho de tu navbar
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;