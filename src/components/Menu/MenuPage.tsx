import * as React from "react";
import { Container, Typography, Box } from "@mui/material";
// NOTE: Import Grid and its type definitions for the workaround
import Grid from "@mui/material/Grid";
import type { GridTypeMap } from "@mui/material/Grid";
import type { DefaultComponentProps } from "@mui/material/OverridableComponent";

import MenuList from "./MenuList";
import MenuItemForm from "./MenuItemForm";

// Define a type for Grid items that resolves the conflict
type GridItemProps = DefaultComponentProps<GridTypeMap<{}, "div">> & {
  item?: boolean;
  container?: boolean;
  // We explicitly exclude the conflicting props to narrow the type assertion
  xs?: any;
  md?: any;
};

export default function MenuPage() {
  const [refreshTrigger, setRefreshTrigger] = React.useState(0);

  const handleCreationSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Menu Management
      </Typography>

      {/* FIX: Apply type assertion to the container Grid */}
      <Grid
        container
        spacing={4}
        {...({} as React.ComponentProps<typeof Grid>)}
      >
        {/* 1. Menu Item Creation Form - FIX: Apply type assertion */}
        <Grid item xs={12} md={4} {...({} as GridItemProps)}>
          <Box
            sx={{
              minHeight: "100px",
              position: "sticky",
              top: 80,
              p: 2,
              borderRadius: 1,
              bgcolor: "background.paper",
              boxShadow: 3,
            }}
          >
            <MenuItemForm onCreationSuccess={handleCreationSuccess} />
          </Box>
        </Grid>

        {/* 2. Menu Item List Display - FIX: Apply type assertion */}
        <Grid item xs={12} md={8} {...({} as GridItemProps)}>
          <MenuList key={refreshTrigger} />
        </Grid>
      </Grid>
    </Container>
  );
}
