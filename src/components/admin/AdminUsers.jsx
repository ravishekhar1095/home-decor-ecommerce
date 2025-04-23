import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await axios.get('/api/auth');
    setUsers(data);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/auth/${id}`);
    fetchUsers();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      isAdmin: formData.get('isAdmin') === 'on'
    };

    await axios.put(`/api/auth/${currentUser._id}`, userData);
    setOpen(false);
    fetchUsers();
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { 
      field: 'isAdmin', 
      headerName: 'Admin', 
      width: 100,
      renderCell: (params) => (params.value ? 'Yes' : 'No')
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
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowId={(row) => row._id}
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={currentUser?.name}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              defaultValue={currentUser?.email}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <input
                type="checkbox"
                name="isAdmin"
                id="isAdmin"
                defaultChecked={currentUser?.isAdmin}
              />
              <label htmlFor="isAdmin" style={{ marginLeft: '8px' }}>Admin</label>
            </Box>
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

export default AdminUsers;
