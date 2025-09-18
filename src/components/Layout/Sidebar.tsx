import React from "react";
import { Drawer, Box, Typography } from "@mui/material";
import MultipleSelectCheckmarks from "../buttons/DropDownCheck";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import SettingsIcon from "@mui/icons-material/Settings";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { styled } from "@mui/material/styles";
import Badge, { badgeClasses } from "@mui/material/Badge";
import { display } from "@mui/system";

const drawerWidth = 280;

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0",
          background: "linear-gradient(180deg, #070707ff 0%, #1a0606ff 100%)",
          borderRight: "1px solid #0f0808ff",
          overflow: "hidden",
        },
      }}
    >
      {/* Top Section - Fixed */}
      <Box
        sx={{
          width: "100%",
          padding: "16px",
          backgroundColor: "black",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          zIndex: 10,
          flexShrink: 0,
        }}
      >
        <Typography
          variant="h6"
          sx={{ marginBottom: "16px", display: "flex", alignItems: "center" }}
        >
          <FilterListIcon sx={{ marginRight: "8px" }} />
          Filters
        </Typography>
        <MultipleSelectCheckmarks />
      </Box>

      {/* Middle Section - Scrollable */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          flexGrow: 1,
          padding: "16px",
          overflowY: "auto",
          gap: "12px",
          // Dark blue scrollbar styling
          "&::-webkit-scrollbar": {
            width: "10px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#000000ff",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#1976d2", // Dark blue color
            borderRadius: "4px",
            border: "2px solid #100909ff",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#1565c0", // Darker blue on hover
          },
          // Firefox scrollbar styling
          scrollbarWidth: "thin",
          scrollbarColor: "#1976d290 #000000ff",
        }}
      >
        {[...Array(15)].map((_, index) => (
          <Button
            key={index}
            variant={index === 0 ? "contained" : "outlined"}
            startIcon={<DeleteIcon />}
            sx={{
              justifyContent: "flex-start",
              py: 1.5,
            }}
          >
            Option {index + 1}
          </Button>
        ))}
      </Box>

      {/* Bottom Section - Fixed */}
      <Box
        sx={{
          width: "100%",
          padding: "16px",
          backgroundColor: "black",
          boxShadow: "0 -2px 4px rgba(0,0,0,0.1)",
          textAlign: "center",
          zIndex: 10,
          flexShrink: 0,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src="/public/images/selfie3.png"
          sx={{ width: 56, height: 56 }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <Typography variant="body2" color="textSecondary" fontSize="medium">
            Manager
          </Typography>
          <Typography variant="body2" color="textSecondary" fontSize="small">
            Mr.Ali Khodayar
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: "20px",
              marginBlockStart: "10px",
            }}
          >
            <IconButton>
              <ShoppingCartIcon fontSize="small" />
              <CartBadge badgeContent={2} color="primary" overlap="circular" />
            </IconButton>
            <IconButton>
              <ShoppingCartIcon fontSize="small" />
              <CartBadge badgeContent={2} color="primary" overlap="circular" />
            </IconButton>
            <IconButton>
              <ShoppingCartIcon fontSize="small" />
              <CartBadge badgeContent={2} color="primary" overlap="circular" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
