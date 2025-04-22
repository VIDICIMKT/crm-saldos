import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import AppLayout from './components/ui/AppLayout';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Financials from './pages/Financials';
import AuthPage from './pages/AuthPage';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/inventario" element={<PrivateRoute><Inventory /></PrivateRoute>} />
            <Route path="/ventas" element={<PrivateRoute><Sales /></PrivateRoute>} />
            <Route path="/finanzas" element={<PrivateRoute><Financials /></PrivateRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;