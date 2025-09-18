import React from "react";
import { AppBar as MuiAppBar, Toolbar, Typography } from "@mui/material";

const AppBar: React.FC = () => {
  return (
    <MuiAppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Cafe Management
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
