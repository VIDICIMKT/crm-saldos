import { useState } from 'react';
import { TextField, Button, Grid, InputAdornment } from '@mui/material';

const ProductForm = ({ onSubmit }) => {
  const [product, setProduct] = useState({
    name: '',
    sku: '',
    price: '',
    stock: '',
    category: 'herramientas'
  });

  const categories = [
    'herramientas', 
    'ropa', 
    'juguetes', 
    'electrónicos', 
    'hogar'
  ];

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(product); }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nombre del Producto"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="SKU/Código"
            name="sku"
            value={product.sku}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Categoría"
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Precio"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Stock Inicial"
            name="stock"
            type="number"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            Agregar Producto
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;