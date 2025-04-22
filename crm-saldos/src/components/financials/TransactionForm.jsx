import { useState } from 'react';
import { TextField, MenuItem, Grid, InputAdornment, Button } from '@mui/material';

const TransactionForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    type: 'income',
    amount: '',
    description: '',
    category: 'venta'
  });

  const categories = {
    income: ['venta', 'devolución', 'otros ingresos'],
    expense: ['compra', 'gastos operativos', 'salarios']
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Tipo"
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <MenuItem value="income">Ingreso</MenuItem>
            <MenuItem value="expense">Egreso</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Descripción"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Monto"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Categoría"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            {categories[form.type].map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            Registrar Transacción
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TransactionForm;