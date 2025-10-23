import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from '@mui/icons-material/GitHub';
import Tooltip from '@mui/material/Tooltip';


const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Login Code Generator Example
        </Typography>


<Tooltip title="Open on GitHub">
  <IconButton
    aria-label="github"
    component="a"
    href="https://github.com/UnibsMatt/2fa_react_fastapi"
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      color: 'white', // makes the icon white
      '&:hover': {
        color: '#52b7ffff', // optional hover color
      },
    }}
  >
    <GitHubIcon />
  </IconButton>
</Tooltip>




      </Toolbar>
    </AppBar>
  );
};

export default Header;
