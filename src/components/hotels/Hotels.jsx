import React, { useEffect, useState } from "react";
import { getHotelsList } from "../../configs/apiConfigs";
import { CircularProgress, Pagination } from "@mui/material";
import HotelCard from "./HotelCard";
import { useLocation } from "react-router-dom";

export default function Hotels() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageValue = queryParams.get("page");
  const [isLoading, setIsLoading] = useState(true);
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(pageValue);
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
  }, [currentPage, itemsPerPage]);
  const nPages = Math.ceil(totalCount / itemsPerPage);
  const handlePageChange = (event, value) => {
    window.history.pushState(null, null, `/hotels?page=${value}`);
    setCurrentPage(value);
  };
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
    <>
      <h1>Hotels</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {hotels?.map((hotel) => (
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
        ></div>
      </div>
      <Pagination
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onChange={handlePageChange}
        count={nPages}
        page={parseInt(currentPage)}
        defaultPage={1}
        shape="rounded"
      />
    </>
  );
}
