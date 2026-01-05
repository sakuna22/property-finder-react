import React from 'react';
import { Box, Container, Typography, Link, Grid, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#2C3E50',
        color: '#ffffff',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <HomeIcon sx={{ color: '#00DEB6' }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Estate<span style={{ color: '#00DEB6' }}>Agent</span>
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Find your perfect property with our comprehensive search platform.
              Browse houses, flats, and apartments across Sri Lanka.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                Search Properties
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                About Us
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
                Contact
              </Link>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Contact Info
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
              Email: info@estateagent.lk
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
              Phone: +94 11 234 5678
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Colombo, Sri Lanka
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

        <Typography variant="body2" sx={{ textAlign: 'center', opacity: 0.7 }}>
          © {new Date().getFullYear()} EstateAgent. All rights reserved. | 5COSC026W Coursework
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
