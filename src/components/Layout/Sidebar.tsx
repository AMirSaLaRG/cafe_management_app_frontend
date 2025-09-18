import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MultipleSelectCheckmarks from "../buttons/DropDownCheck";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalCafeOutlinedIcon from "@mui/icons-material/LocalCafeOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { styled } from "@mui/material/styles";
import Badge, { badgeClasses } from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu"; // Import the hamburger icon
import CloseIcon from "@mui/icons-material/Close"; // Import close icon

const drawerWidth = 280;

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -6px;
    right: -6px;
  }
`;

const Sidebar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <>
      {/* Top Section - Fixed */}
      <Box
        sx={{
          width: "100%",
          padding: "7px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          zIndex: 10,
          flexShrink: 0,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginBottom: "7px",
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            fontFamily: "Monospace",
            letterSpacing: 3,
          }}
        >
          <LocalCafeOutlinedIcon
            sx={{
              marginRight: "8px",
            }}
          />
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
    </>
  );
  return (
    <>
      {/* humburger menu button for mobile */}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: "fixed",
            top: 7,
            left: 16,
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: "Background.paper",
            boxShadow: 2,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* the drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: isMobile ? "100%" : drawerWidth,
          flexShrink: 0,
          position: "fixed",
          height: "100vh",
          zIndex: (theme) => theme.zIndex.drawer + 2,
          "& .MuiDrawer-paper": {
            width: isMobile ? "80%" : drawerWidth,
            position: "fixed",
            height: "100vh",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0",
            borderRight: "1px solid #0f0808ff",
            overflow: "hidden",
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {/* Close button for mobile */}
        {isMobile && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              p: 1,
            }}
          >
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
