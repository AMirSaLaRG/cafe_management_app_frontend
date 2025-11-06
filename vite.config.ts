import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    // This setting tells Vite to listen on all network interfaces (0.0.0.0),
    // making it accessible via your local IP address.
    host: "0.0.0.0",
    port: 5173, // Optional: Explicitly set the port if needed
  },
});
