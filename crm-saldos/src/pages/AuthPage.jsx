import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Box, Tabs, Tab, Paper, styled } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const AuthContainer = styled(Paper)(({ theme }) => ({
  maxWidth: 450,
  margin: 'auto',
  padding: theme.spacing(4),
  marginTop: theme.spacing(8),
}));

const AuthPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const { loading } = useAuth();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <AuthContainer elevation={3}>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Iniciar Sesión" />
        <Tab label="Registrarse" />
      </Tabs>
      <Box p={3}>
        {tabValue === 0 ? <LoginForm /> : <RegisterForm />}
      </Box>
    </AuthContainer>
  );
};

export default AuthPage;