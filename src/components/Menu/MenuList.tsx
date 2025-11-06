import * as React from "react";
import axios from "axios";
import { Box, Typography, CircularProgress } from "@mui/material";
// NOTE: Adjust the path if your structure is different
import MenuItemCard from "./MenuCard/MenuItemCard";
import type { MenuItem } from "./MenuCard/MenuItemCard"; // Import the type for safety

export default function MenuList() {
  const [data, setData] = React.useState<MenuItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const API_ENDPOINT = "http://192.168.1.10:8000/api/menu";

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ENDPOINT);

        // --- CRITICAL FIX: Extract data from the 'items' key ---
        if (response.data.success && Array.isArray(response.data.items)) {
          // You might need to add a temporary 'image' field if your item data doesn't include it
          const itemsWithDefaults: MenuItem[] = response.data.items.map(
            (item: any) => ({
              ...item,
              // Add a default or dynamic image path here, since 'image' is missing in your API item
              image: `/images/menu/${item.name}.avif`, // Example of dynamic path based on 'name'
            })
          );

          setData(itemsWithDefaults);
        } else {
          throw new Error(
            "API returned 'success: false' or invalid data format."
          );
        }
      } catch (err) {
        console.error("Failed to fetch data.", err);
        setError(
          "Failed to load menu items. Please check the network connection."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- Render States ---

  if (loading) {
    // Show a loading spinner
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
        <Typography ml={2}>Loading Menu...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ p: 2 }}>
        Error: {error}
      </Typography>
    );
  }

  if (data.length === 0) {
    return <Typography sx={{ p: 2 }}>No menu items found.</Typography>;
  }

  // --- Main Render: Mapping the Cards ---
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 2, // Use gap property for spacing
        p: 2,
      }}
    >
      {/* Loop over the corrected data array */}
      {data.map((item) => (
        // The key must be a unique value from the item
        <MenuItemCard key={item.id} menuItem={item} />
      ))}
    </Box>
  );
}
