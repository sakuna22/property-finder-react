import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  const location = useLocation();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <HomeIcon sx={{ color: 'primary.main', fontSize: 32 }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: 'secondary.main',
                letterSpacing: '-0.5px',
              }}
            >
              Estate<span style={{ color: '#00DEB6' }}>Agent</span>
            </Typography>
          </Link>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/"
              startIcon={<SearchIcon />}
              variant={location.pathname === '/' ? 'contained' : 'text'}
              color="primary"
            >
              Search
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
