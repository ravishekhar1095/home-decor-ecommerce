import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';


const AccountPage = () => {
  const { user, updateUserProfile } = useAuth();
  const [success, setSuccess] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Account
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Formik
          initialValues={{
            name: user.name,
            email: user.email,
            password: '',
            confirmPassword: ''
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await updateUserProfile({
                name: values.name,
                email: values.email,
                password: values.password || undefined
              });
              setSuccess(true);
            } catch (error) {
              console.error('Update failed:', error);
            }
            setSubmitting(false);
          }}
        >
          {({ values, errors, touched, handleChange, isSubmitting }) => (
            <Form>
              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <TextField
                margin="normal"
                fullWidth
                name="confirmPassword"
                label="Confirm New Password"
                type="password"
                id="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
              {success && (
                <Typography color="success.main" sx={{ mt: 2 }}>
                  Profile updated successfully!
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{ mt: 3 }}
              >
                Update Profile
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default AccountPage;
