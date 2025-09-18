import React from "react";
import { AppBar as MuiAppBar, Toolbar, Typography } from "@mui/material";

const appBarHeight = 64; // Use standard MUI height (64px)

const AppBar: React.FC = () => {
  return (
    <MuiAppBar
      position="fixed"
      sx={{
        height: appBarHeight,
        width: { xs: "100%", md: `calc(100% - 280px)` }, // Adjust for sidebar
        ml: { xs: 0, md: "280px" }, // Shift right on desktop
        zIndex: (theme) => theme.zIndex.drawer - 1, // Behind sidebar
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            flexGrow: 1,
            fontWeight: "bold",
            fontFamily: "Monospace",
            letterSpacing: 3,
          }}
        >
          Cafe Venty
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
