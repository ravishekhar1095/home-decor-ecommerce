import { useState, useEffect } from 'react';
import { Box, Container, Typography, Tabs, Tab, Paper } from '@mui/material';
import AdminUsers from '../../components/admin/AdminUsers';
import AdminProducts from '../../components/admin/AdminProducts';
import AdminOrders from '../../components/admin/AdminOrders';
import { useAuth } from '../../contexts/AuthContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AdminDashboard = () => {
  const [value, setValue] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (user && !user.isAdmin) {
      window.location.href = '/';
    }
  }, [user]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Users" />
          <Tab label="Products" />
          <Tab label="Orders" />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <AdminUsers />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdminProducts />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AdminOrders />
      </TabPanel>
    </Container>
  );
};

export default AdminDashboard;
