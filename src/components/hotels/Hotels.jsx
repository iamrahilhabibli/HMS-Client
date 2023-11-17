import React, { useEffect, useState } from "react";
import { getHotelsList } from "../../configs/apiConfigs";
import { CircularProgress, Pagination } from "@mui/material";
import HotelCard from "./HotelCard";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 3;
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await getHotelsList(currentPage, itemsPerPage);
        setHotels(response.data.items);
        setTotalCount(response.data.totalCount);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHotels();
  }, []);
  const nPages = Math.ceil(totalCount / itemsPerPage);
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />;
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <h1>Hotels</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {hotels.map((hotel, index) => (
          <div key={hotel.Id} style={{ flex: "0 0 15%", margin: "16px" }}>
            <HotelCard hotel={hotel} />
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pagination count={nPages} defaultPage={1} shape="rounded" />
      </div>
    </div>
  );
}
