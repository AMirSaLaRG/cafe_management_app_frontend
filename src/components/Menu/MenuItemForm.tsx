import * as React from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem as MuiMenuItem, // Renamed to avoid collision
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";

// Define the shape of the data being sent to the API
interface NewMenuItemData {
  name: string;
  description: string;
  current_price: number;
  category: string;
  size: string;
  // You might want to add default values for these if required by your API
  // recipes: any[];
  // number_available: number;
}

interface MenuItemFormProps {
  onCreationSuccess: () => void; // A callback function to refresh the menu list
}

export default function MenuItemForm({ onCreationSuccess }: MenuItemFormProps) {
  const API_ENDPOINT = "http://192.168.1.10:8000/api/menu/create/";

  const [formData, setFormData] = React.useState<NewMenuItemData>({
    name: "",
    description: "",
    current_price: 0,
    category: "",
    size: "s", // Default size to 's'
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Handle changes in input fields
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "current_price" ? parseFloat(value) : value,
    }));
  };

  // Handle changes for Select component (requires a different event type)
  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission and POST request
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Prepare data to send (match your API's expected payload)
    const payload = {
      ...formData,
      // Add any missing required fields with default values for creation
      recipes: [],
      number_available: 100,
      suggested_price: formData.current_price * 1.5, // Example calculation
      value_added_tax: 0.1,
      serving: true,
    };

    try {
      const response = await axios.post(API_ENDPOINT, payload);

      if (response.data.success) {
        alert("New menu item created successfully!");
        setFormData({
          name: "",
          description: "",
          current_price: 0,
          category: "",
          size: "s",
        }); // Clear form
        onCreationSuccess(); // Trigger the refresh in the parent component
      } else {
        setError("Creation failed. API reported an error.");
      }
    } catch (err: any) {
      console.error("POST request failed:", err);
      setError(`Failed to create item: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        m: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Create New Menu Item
      </Typography>

      <TextField
        name="name"
        label="Item Name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={3}
        fullWidth
        required
      />

      <TextField
        name="current_price"
        label="Price"
        type="number"
        value={formData.current_price === 0 ? "" : formData.current_price}
        onChange={handleChange}
        fullWidth
        required
        inputProps={{ step: "0.01" }}
      />

      {/* Category Select Field */}
      <FormControl fullWidth required>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          name="category"
          value={formData.category}
          label="Category"
          onChange={handleSelectChange}
        >
          <MuiMenuItem value="">
            <em>None</em>
          </MuiMenuItem>
          <MuiMenuItem value="hot drinks">Hot Drinks</MuiMenuItem>
          <MuiMenuItem value="cold drinks">Cold Drinks</MuiMenuItem>
          <MuiMenuItem value="pastries">Pastries</MuiMenuItem>
        </Select>
      </FormControl>

      {/* Size Select Field */}
      <FormControl fullWidth required>
        <InputLabel id="size-label">Size</InputLabel>
        <Select
          labelId="size-label"
          name="size"
          value={formData.size}
          label="Size"
          onChange={handleSelectChange}
        >
          <MuiMenuItem value="s">Small (S)</MuiMenuItem>
          <MuiMenuItem value="m">Medium (M)</MuiMenuItem>
          <MuiMenuItem value="l">Large (L)</MuiMenuItem>
        </Select>
      </FormControl>

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ mt: 1 }}
      >
        {loading ? <CircularProgress size={24} /> : "Create Item"}
      </Button>
    </Box>
  );
}
