import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import type { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// NOTE: Make sure SizeSelector path is correct
// import SizeSelector from "../../other/SizeSelector";

// --- TYPE DEFINITIONS ---
// 1. Interface for the nested recipe steps
export interface RecipeStep {
  inventory_id: number;
  inventory_name: string;
  amount: number;
  writer: string;
  description: string; // This is the actual instruction/step detail
}

// 2. Interface for the main menu item
export interface MenuItem {
  id: number;
  name: string; // Used for CardHeader title
  size: string;
  category: string;
  current_price: number;
  // NOTE: You'll need to update 'image' source in MenuList or component
  // as it's not present in your current API item structure.
  image?: string;
  serving: boolean;
  description: string; // Used for CardContent body text
  recipes: RecipeStep[]; // Array of RecipeStep objects
}

// Interface for the custom styled component
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

// --- STYLED COMPONENT ---
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// --- CARD COMPONENT ---
interface MenuItemCardProps {
  menuItem: MenuItem;
}

export default function MenuItemCard({ menuItem }: MenuItemCardProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Helper to format currency (assuming the price is in a large unit and needs to be formatted)
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD", // Change 'USD' to your currency code (e.g., 'IDR' for Indonesian Rupiah)
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(menuItem.current_price);

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      {/* Dynamic Data Mapping: 'name' is the title, 'category' is the subheader */}
      <CardHeader
        title={`${menuItem.name} (${menuItem.size.toUpperCase()})`}
        subheader={`${menuItem.category} | ${formattedPrice}`}
      />

      <CardMedia
        component="img"
        height="100"
        // IMPORTANT: Update this to a dynamic image path or handle it in MenuList
        // image={menuItem.image || "/images/menu/default.avif"}
        image={"/images/menu/default.avif"}
        alt={menuItem.name}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {menuItem.description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        {/* <SizeSelector /> */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more details"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recipe (Ingredients):
          </Typography>

          {/* Mapping over the nested 'recipes' array */}
          {menuItem.recipes.map((step, index) => (
            <Typography key={index} paragraph>
              **{step.inventory_name}** ({step.amount} unit) - *
              {step.description}*
            </Typography>
          ))}

          <Typography variant="caption" display="block" mt={2}>
            Category: {menuItem.category} | Available:{" "}
            {/* {menuItem.number_available} */}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
