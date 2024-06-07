import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../constants";
import axios from "axios";

const DistrictCard = ({ district, onClick }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box
        component={Card}
        onClick={() => onClick(district)}
        sx={{
          cursor: "pointer",
          margin: "10px",
          borderRadius: "12px",
          transition: "box-shadow 0.3s",
          backgroundColor: "#f3f3f3",
          "&:hover": {
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.3)",
          },
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            align="center"
            color="#652b7c"
          >
            {district}
          </Typography>
        </CardContent>
      </Box>
    </Grid>
  );
};

const DistrictList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/jmoa_district_all_data`);
        setDistricts(response.data["body-json"]["body"]["Item"]["district"]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching districts:", error);
        setLoading(false);
      }
    };

    fetchDistricts();
  }, []);

  const handleDistrictClick = (district) => {
    navigate(`/member-list/${district}`);
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      {loading
        ? // Display skeleton loading state while waiting for data
          Array.from({ length: 15 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box sx={{ width: "100%", padding: "20px" }}>
                <Skeleton variant="rectangular" height={100} />
              </Box>
            </Grid>
          ))
        : // Render district cards when data is available
          districts.map((district, index) => (
            <DistrictCard
              key={index}
              district={district}
              onClick={handleDistrictClick}
            />
          ))}
    </Grid>
  );
};

export default DistrictList;
