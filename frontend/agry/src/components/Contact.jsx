import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { green } from '@mui/material/colors';

const ContactUs = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      {/* Page Title */}
      <Box textAlign="center" mb={5}>
        <Typography variant="h3" style={{ color: green[700], fontWeight: 'bold' }}>
          Contact Us
        </Typography>
        <Typography variant="subtitle1" style={{ color: green[600], marginTop: '8px' }}>
          We'd love to hear from you. Reach out to us with your inquiries or feedback!
        </Typography>
      </Box>

      {/* Main Content Section */}
      <Grid container spacing={4}>
        {/* Contact Form Section */}
        <Grid item xs={12} md={7}>
          <Card style={{ border: `2px solid ${green[500]}`, borderRadius: '8px', padding: '16px' }}>
            <CardContent>
              <Typography variant="h6" style={{ color: green[700], fontWeight: 'bold', marginBottom: '16px' }}>
                Send Us a Message
              </Typography>
              <form>
                <TextField
                  fullWidth
                  label="Your Name"
                  variant="outlined"
                  margin="normal"
                  style={{ marginBottom: '16px' }}
                />
                <TextField
                  fullWidth
                  label="Your Email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  style={{ marginBottom: '16px' }}
                />
                <TextField
                  fullWidth
                  label="Subject"
                  variant="outlined"
                  margin="normal"
                  style={{ marginBottom: '16px' }}
                />
                <TextField
                  fullWidth
                  label="Your Message"
                  multiline
                  rows={4}
                  variant="outlined"
                  margin="normal"
                  style={{ marginBottom: '16px' }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  style={{
                    backgroundColor: green[600],
                    color: 'white',
                    padding: '10px',
                    fontWeight: 'bold',
                    borderRadius: '4px',
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Information Section */}
        <Grid item xs={12} md={5}>
          <Card style={{ border: `2px solid ${green[500]}`, borderRadius: '8px', padding: '16px' }}>
            <CardContent>
              <Typography variant="h6" style={{ color: green[700], fontWeight: 'bold', marginBottom: '8px' }}>
                Our Contact Info
              </Typography>
              <Typography variant="body1" style={{ marginBottom: '8px', color: green[800] }}>
                <strong>Email:</strong> contact@yourcompany.com
              </Typography>
              <Typography variant="body1" style={{ marginBottom: '8px', color: green[800] }}>
                <strong>Phone:</strong> +1 (555) 123-4567
              </Typography>
              <Typography variant="body1" style={{ marginBottom: '8px', color: green[800] }}>
                <strong>Address:</strong> 123 Greenway Blvd, Springfield, USA
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Footer Section */}
      <Box mt={5} textAlign="center">
        <Typography variant="body2" style={{ color: green[500] }}>
          © {new Date().getFullYear()} All rights reserved. Reach out anytime.
        </Typography>
      </Box>
    </Container>
  );
};

export default ContactUs;
