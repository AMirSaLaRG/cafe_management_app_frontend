import React from "react";
import { Box, CssBaseline } from "@mui/material";
import AppBar from "./components/Layout/AppBar";
import Sidebar from "./components/Layout/Sidebar";
import MainContent from "./components/Layout/MainContent";
import Dashboard from "./components/Dashbboard/Dashboard";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // ← This changes everything to dark mode
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <AppBar />
        <MainContent>
          <Dashboard />
        </MainContent>
      </Box>
    </ThemeProvider>
  );
}

export default App;
