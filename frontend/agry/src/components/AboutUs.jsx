import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { green } from '@mui/material/colors';

const AboutUs = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      {/* Title Section */}
      <Box textAlign="center" mb={5}>
        <Typography variant="h3" style={{ color: green[700], fontWeight: 'bold' }}>
          About Us
        </Typography>
        <Typography variant="subtitle1" style={{ color: green[600], marginTop: '8px' }}>
          Learn more about our mission, values, and team.
        </Typography>
      </Box>

      {/* Main Content Section */}
      <Grid container spacing={4}>
        {/* Section 1 - Our Mission */}
        <Grid item xs={12} md={6}>
          <Card style={{ border: `2px solid ${green[500]}`, borderRadius: '8px' }}>
            <CardContent>
              <Typography variant="h5" style={{ color: green[700], fontWeight: 'bold' }}>
                Our Mission
              </Typography>
              <Typography variant="body1" style={{ color: green[800], marginTop: '8px' }}>
                Our mission is to provide innovative solutions that empower individuals and communities,
                leveraging technology to solve real-world problems. We strive to innovate, collaborate,
                and inspire every step of the way.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Section 2 - Our Values */}
        <Grid item xs={12} md={6}>
          <Card style={{ border: `2px solid ${green[500]}`, borderRadius: '8px' }}>
            <CardContent>
              <Typography variant="h5" style={{ color: green[700], fontWeight: 'bold' }}>
                Our Values
              </Typography>
              <Typography variant="body1" style={{ color: green[800], marginTop: '8px' }}>
                We value integrity, innovation, collaboration, and community growth. We believe in fostering
                a culture of transparency, trust, and teamwork, which allows us to achieve excellence and
                innovation in every project we undertake.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Section 3 - Meet the Team */}
        <Grid item xs={12}>
          <Typography variant="h5" style={{ color: green[700], fontWeight: 'bold', marginBottom: '16px' }}>
            Meet The Team
          </Typography>
          <Grid container spacing={2}>
            {['Alice', 'Bob', 'Charlie', 'Dana'].map((teamMember, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Card style={{ border: `2px solid ${green[500]}`, borderRadius: '8px' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://via.placeholder.com/150?text=${teamMember}`}
                    alt={teamMember}
                  />
                  <CardContent>
                    <Typography variant="body1" style={{ color: green[700], fontWeight: 'bold' }}>
                      {teamMember}
                    </Typography>
                    <Typography variant="body2" style={{ color: green[600], marginTop: '4px' }}>
                      Team Member
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Footer Section */}
      <Box mt={5} textAlign="center">
        <Typography variant="body2" style={{ color: green[500] }}>
          © {new Date().getFullYear()} All rights reserved. Built with care.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
