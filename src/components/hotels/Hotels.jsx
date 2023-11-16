import React, { useEffect, useState } from "react";
import { getAllHotels } from "../../configs/apiConfigs";
import { CircularProgress } from "@mui/material";
import HotelCard from "./HotelCard";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await getAllHotels();
        setHotels(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHotels();
  }, []);
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <h1>Hotels</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {hotels.map((hotel) => (
          <div key={hotel.Id} style={{ flex: "1", margin: "16px" }}>
            <HotelCard hotel={hotel} />
          </div>
        ))}
      </div>
    </div>
  );
}
