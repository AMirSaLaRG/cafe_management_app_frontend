import axios from "axios";
import { useEffect, useState } from "react";

// Define the interface for your data structure
interface InventoryItem {
  id?: number;
  name?: string;
  quantity?: number;
  // Add other properties that your API returns
}

interface InventoryData {
  items: InventoryItem[];
  // Add other properties that your API returns
}

const TestComponent = () => {
  const [data, setData] = useState<InventoryData | null>(null);
  const API_ENDPOINT = "http://192.168.1.10:8000/api"; // Use your exact API URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ENDPOINT + "/inventory");
        setData(response.data);
        console.log("Successfully fetched data!");
      } catch (error) {
        console.error(
          "Failed to fetch data. Check CORS and server status.",
          error
        );
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Data from Django API:</h2>

      {/* Show the raw data */}
      <h3>Raw Data:</h3>
      <pre>{data ? JSON.stringify(data, null, 4) : "Loading..."}</pre>

      {/* Show items if they exist */}
      <h3>Items:</h3>
      {data && data.items ? (
        <ul>
          {data.items.map((item, index) => (
            <li key={index}>{JSON.stringify(item.name)}</li>
          ))}
        </ul>
      ) : (
        "No items found"
      )}
    </div>
  );
};
export default TestComponent;
