import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import axios from 'axios';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await axios.get('/api/products');
    setProducts(data);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setOpen(true);
  };

  const handleAdd = () => {
    setCurrentProduct({
      name: '',
      description: '',
      price: 0,
      category: 'furniture',
      image: ''
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/products/${id}`);
    fetchProducts();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productData = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: parseFloat(formData.get('price')),
      category: formData.get('category'),
      image: formData.get('image')
    };

    if (currentProduct._id) {
      await axios.put(`/api/products/${currentProduct._id}`, productData);
    } else {
      await axios.post('/api/products', productData);
    }
    setOpen(false);
    fetchProducts();
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'category', headerName: 'Category', width: 150 },
    { 
      field: 'price', 
      headerName: 'Price', 
      width: 100,
      valueFormatter: (params) => `$${params.value.toFixed(2)}`
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEdit(params.row)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
          Add Product
        </Button>
      </Box>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowId={(row) => row._id}
      />

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{currentProduct?._id ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="normal"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={currentProduct?.name}
              required
            />
            <TextField
              margin="normal"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={currentProduct?.description}
              required
              multiline
              rows={4}
            />
            <TextField
              margin="normal"
              name="price"
              label="Price"
              type="number"
              fullWidth
              variant="standard"
              defaultValue={currentProduct?.price}
              required
              inputProps={{ step: "0.01" }}
            />
            <TextField
              margin="normal"
              name="category"
              label="Category"
              select
              fullWidth
              variant="standard"
              defaultValue={currentProduct?.category || 'furniture'}
              required
              SelectProps={{ native: true }}
            >
              <option value="furniture">Furniture</option>
              <option value="lighting">Lighting</option>
              <option value="textiles">Textiles</option>
              <option value="decor">Decor</option>
            </TextField>
            <TextField
              margin="normal"
              name="image"
              label="Image URL"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={currentProduct?.image}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default AdminProducts;
