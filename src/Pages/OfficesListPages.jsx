import React from "react";
import Header from "../Component/AppBar";
import ImageComponent from "../Component/ImageComponent";
import { Breadcrumbs, Link, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import img from "../Assets/offices.jpg";
import OfficesList from "../Component/OfficesList";
import Footer from "../Component/footer";
export default function OfficesListPages() {
  const navigate = useNavigate();
  const breadcrumbs = [
    <Link
      underline="hover"
      style={{ cursor: "pointer" }}
      key="1"
      color="inherit"
      // //href="/"
      onClick={() => {
        navigate("/");
      }}
    >
      Home
    </Link>,
    <Typography key="3" color="text.primary">
      Offices List
    </Typography>,
  ];

  return (
    <>
      <div>
        <Header value={4} />
      </div>
      <div>
        <ImageComponent imageName={img} altText={"img"} />
      </div>
      <br />
      <div>
        <Stack spacing={2} paddingLeft={5}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </div>
      <br />
      <div>
        <OfficesList />
      </div>
      <br />
      <div>
        <Footer />
      </div>
    </>
  );
}
