import React from "react";
import Box from "@mui/material/Box";

interface MainContentProps {
  children: React.ReactNode;
}

const drawerWidth = 280;
const appBarHeight = 64;

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <Box
      component="main"
      sx={{
        width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
        ml: { xs: 0, md: `${drawerWidth}px` },
        mt: `${appBarHeight}px`, // Push content below AppBar
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(auto-fit, minmax(300px, 1fr))", // Better responsive grid
        },
        gap: 3,
        alignItems: "start",
        p: 3,
        minHeight: `calc(100vh - ${appBarHeight}px)`, // Full height minus AppBar
        overflow: "visible", // Change to visible
        bgcolor: "background.default", // Remove pink, use theme background
      }}
    >
      {children}
    </Box>
  );
};

export default MainContent;
