import React from "react";
import { Typography, Paper } from "@mui/material";

const Dashboard: React.FC = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography>Welcome to your cafe management dashboard!</Typography>
    </Paper>
  );
};

export default Dashboard;
