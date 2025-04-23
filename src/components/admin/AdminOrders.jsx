import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Chip } from '@mui/material';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data } = await axios.get('/api/orders');
    setOrders(data);
  };

  const handleMarkAsDelivered = async (id) => {
    await axios.put(`/api/orders/${id}/deliver`);
    fetchOrders();
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 220 },
    { 
      field: 'user', 
      headerName: 'User', 
      width: 200,
      valueGetter: (params) => params.row.user?.name || 'Guest'
    },
    { 
      field: 'createdAt', 
      headerName: 'Date', 
      width: 150,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
    { 
      field: 'totalPrice', 
      headerName: 'Total', 
      width: 120,
      valueFormatter: (params) => `$${params.value.toFixed(2)}`
    },
    { 
      field: 'isPaid', 
      headerName: 'Paid', 
      width: 120,
      renderCell: (params) => (
        params.value ? (
          <Chip label="Paid" color="success" size="small" />
        ) : (
          <Chip label="Not Paid" color="error" size="small" />
        )
      )
    },
    { 
      field: 'isDelivered', 
      headerName: 'Delivered', 
      width: 120,
      renderCell: (params) => (
        params.value ? (
          <Chip label="Delivered" color="success" size="small" />
        ) : (
          <Button 
            size="small" 
            variant="outlined" 
            onClick={() => handleMarkAsDelivered(params.row._id)}
          >
            Mark Delivered
          </Button>
        )
      )
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={orders}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowId={(row) => row._id}
      />
    </Box>
  );
};

export default AdminOrders;
