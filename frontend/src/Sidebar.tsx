import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import QrCodeIcon from '@mui/icons-material/QrCode';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import InfoIcon from '@mui/icons-material/Info';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

const Sidebar: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (value: boolean) => () => {
    setOpen(value);
  };

  const scrollTo = (id: string) => () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Open navigation">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(prev => !prev)} // toggle on each click
          sx={{ position: 'fixed', top: 8, left: 8, zIndex: 1400, backgroundColor: 'white' }}
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, paddingTop: '40px' }} role="presentation" onKeyDown={toggleDrawer(false)}>
          <List>
        <ListItem disablePadding>
          <ListItemButton onClick={scrollTo('top')}>
            <ListItemIcon>
          <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Top" />
          </ListItemButton>
        </ListItem>

            <Divider />

            <ListItem disablePadding>
              <ListItemButton onClick={scrollTo('register')}>
                <ListItemIcon>
                  <QrCodeIcon />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={scrollTo('verify')}>
                <ListItemIcon>
                  <VerifiedUserIcon />
                </ListItemIcon>
                <ListItemText primary="Verify" />
              </ListItemButton>
            </ListItem>

            <Divider />

            <ListItem disablePadding>
              <ListItemButton onClick={scrollTo('footer')}>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Footer" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
