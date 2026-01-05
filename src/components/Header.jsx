import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.items);
  const { currentUser, isAuthenticated } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

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

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title={`Favourites (${favourites.length})`}>
              <IconButton component={Link} to="/" sx={{ color: 'error.main' }}>
                <FavoriteIcon />
                {favourites.length > 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      borderRadius: '50%',
                      width: 16,
                      height: 16,
                      fontSize: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {favourites.length}
                  </Box>
                )}
              </IconButton>
            </Tooltip>

            <Button
              startIcon={<AddBusinessIcon />}
              variant="outlined"
              color="primary"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              List Property
            </Button>

            {isAuthenticated ? (
              <>
                <Tooltip title="Account">
                  <IconButton onClick={handleMenuOpen}>
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        backgroundColor: 'primary.main',
                        fontSize: 14,
                      }}
                    >
                      {getInitials(currentUser?.name)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{ sx: { minWidth: 200, mt: 1 } }}
                >
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {currentUser?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {currentUser?.email}
                    </Typography>
                  </Box>
                  <Divider />
                  <MenuItem onClick={handleMenuClose}>
                    <PersonIcon sx={{ mr: 1 }} fontSize="small" />
                    My Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                    <LogoutIcon sx={{ mr: 1 }} fontSize="small" />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  startIcon={<LoginIcon />}
                  variant="text"
                  color="secondary"
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  startIcon={<PersonAddIcon />}
                  variant="contained"
                  color="primary"
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
