import { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, InputAdornment } from '@mui/material';

const SaleForm = ({ products, onSubmit }) => {
  const [sale, setSale] = useState({
    customer: '',
    items: [{ productId: '', quantity: 1 }],
    paymentMethod: 'efectivo'
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = sale.items.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    setTotal(newTotal);
  }, [sale.items, products]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...sale.items];
    newItems[index][field] = value;
    setSale({ ...sale, items: newItems });
  };

  const addItem = () => {
    setSale({ ...sale, items: [...sale.items, { productId: '', quantity: 1 }] });
  };

  const removeItem = (index) => {
    const newItems = sale.items.filter((_, i) => i !== index);
    setSale({ ...sale, items: newItems });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ ...sale, total }); }}>
      <TextField
        fullWidth
        label="Cliente"
        value={sale.customer}
        onChange={(e) => setSale({ ...sale, customer: e.target.value })}
        margin="normal"
      />
      
      {sale.items.map((item, index) => (
        <Grid container spacing={2} key={index} alignItems="center">
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Producto"
              value={item.productId}
              onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
              SelectProps={{ native: true }}
              required
            >
              <option value=""></option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} (${product.price})
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Cantidad"
              type="number"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Button onClick={() => removeItem(index)} color="error">
              Eliminar
            </Button>
          </Grid>
        </Grid>
      ))}
      
      <Button onClick={addItem} sx={{ mt: 1 }}>+ Agregar Producto</Button>
      
      <TextField
        select
        fullWidth
        label="Método de Pago"
        value={sale.paymentMethod}
        onChange={(e) => setSale({ ...sale, paymentMethod: e.target.value })}
        margin="normal"
      >
        <MenuItem value="efectivo">Efectivo</MenuItem>
        <MenuItem value="tarjeta">Tarjeta</MenuItem>
        <MenuItem value="transferencia">Transferencia</MenuItem>
      </TextField>
      
      <Typography variant="h6" sx={{ mt: 2 }}>
        Total: ${total.toFixed(2)}
      </Typography>
      
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Registrar Venta
      </Button>
    </form>
  );
};

export default SaleForm;