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
import ArticleIcon from '@mui/icons-material/Article'; 
import QrCodeIcon from '@mui/icons-material/QrCode';
import InfoIcon from '@mui/icons-material/Info';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

const Sidebar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const buttonSx = {
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
  };

  return (
    <>
      <Tooltip title="Open navigation">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(prev => !prev)}
          sx={{ position: 'fixed', top: 8, left: 8, zIndex: 1400, backgroundColor: 'white' }}
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250, paddingTop: '40px' }} role="presentation">
          <List>
            {/* Top */}
            <ListItem disablePadding>
              <ListItemButton component="a" href="#top" onClick={() => setOpen(false)} sx={buttonSx}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Top" />
              </ListItemButton>
            </ListItem>

            <Divider />

            {/* History */}
          <ListItem disablePadding>
            <ListItemButton component="a" href="#history" onClick={() => setOpen(false)} sx={buttonSx}>
              <ListItemIcon><ArticleIcon /></ListItemIcon> {/* changed icon */}
              <ListItemText primary="History" />
            </ListItemButton>
          </ListItem>

            {/* Register */}
            <ListItem disablePadding>
              <ListItemButton component="a" href="#register" onClick={() => setOpen(false)} sx={buttonSx}>
                <ListItemIcon><QrCodeIcon /></ListItemIcon>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>

            <Divider />

            {/* Information */}
            <ListItem disablePadding>
              <ListItemButton component="a" href="#footer" onClick={() => setOpen(false)} sx={buttonSx}>
                <ListItemIcon><InfoIcon /></ListItemIcon>
                <ListItemText primary="Information" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
