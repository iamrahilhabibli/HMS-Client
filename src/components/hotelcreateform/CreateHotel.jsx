import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { createHotel } from "../../configs/apiConfigs";
import { useUser } from "../../customhooks/useUser";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

export default function CreateHotel() {
  const { userId } = useUser();
  const [hotelExists, setHotelExists] = useState(false);
  const { REACT_APP_API_BASE_URL } = process.env;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSnackbarClose = (event, reason) => {
    if (reason == "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const mutation = useMutation(
    (hotelCreateDto) => createHotel(userId, hotelCreateDto),
    {
      onSuccess: (data) => {
        console.log(data);
        alert("success");
      },
      onError: (error) => {
        console.error(error.response);
        alert("something went wrong");
      },
    }
  );
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      floorNumber: 0,
      roomNumber: 0,
      checkInTime: "",
      checkOutTime: "",
      isEarlyCheckInAllowed: true,
      isLateCheckOutAllowed: true,
      isSmokingAllowed: false,
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.get(
          `${REACT_APP_API_BASE_URL}/hotels/CheckHotelExists/${userId}`
        );
        if (response) {
          setHotelExists(true);
          setSnackbarMessage("You have already created a hotel");
          setSnackbarOpen(true);
          return;
        }
      } catch (error) {
        console.error(error);
        return;
      }
      mutation.mutate(values);
    },
  });

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="error"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      <Box
        sx={{
          my: 8,
          mx: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Hotel Name"
              type="text"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              type="text"
              id="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="floorNumber"
              label="Number of floors"
              type="number"
              id="floorNumber"
              value={formik.values.floorNumber}
              onChange={formik.handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="roomNumber"
              label="Number of rooms"
              type="number"
              id="roomNumber"
              value={formik.values.roomNumber}
              onChange={formik.handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="checkInTime"
              label="Check-in time"
              type="time"
              id="checkInTime"
              value={formik.values.checkInTime}
              onChange={formik.handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="checkOutTime"
              label="Check-Out time"
              type="time"
              id="checkOutTime"
              value={formik.values.checkOutTime}
              onChange={formik.handleChange}
            />

            <FormControlLabel
              control={
                <Checkbox
                  id="isEarlyCheckInAllowed"
                  checked={formik.values.isEarlyCheckInAllowed}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "isEarlyCheckInAllowed",
                      e.target.checked
                    )
                  }
                />
              }
              label="Early Check in allowed"
            />

            <FormControlLabel
              control={
                <Checkbox
                  id="isLateCheckOutAllowed"
                  checked={formik.values.isLateCheckOutAllowed}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "isLateCheckOutAllowed",
                      e.target.checked
                    )
                  }
                />
              }
              label="Late Check out allowed"
            />

            <FormControlLabel
              control={
                <Checkbox
                  id="isSmokingAllowed"
                  checked={formik.values.isSmokingAllowed}
                  onChange={(e) =>
                    formik.setFieldValue("isSmokingAllowed", e.target.checked)
                  }
                />
              }
              label="Smoking allowed"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, position: "relative" }}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: -12,
                    marginLeft: -12,
                  }}
                />
              )}
              Create hotel
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
