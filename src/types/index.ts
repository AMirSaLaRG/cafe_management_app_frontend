export interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export interface RecipeItem {
  inventory_id: number;
  amount: number;
}

export interface MenuItemFormData {
  name: string;
  size: "s" | "m" | "l";
  category: string;
  value_added_tax: number;
  description?: string;
  recipe_items: RecipeItem[];
  profit_margin?: number;
  sales_forecast?: number;
}

export interface InventoryItem {
  id: number;
  name: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  error?: string | Record<string, any>;
  items?: T;
}
