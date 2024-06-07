import React from "react";
import Header from "../Component/AppBar";
import ImageComponent from "../Component/ImageComponent";
import gallery from "../Assets/Blog.jpg";
import Footer from "../Component/footer";
import { Breadcrumbs, Link, Typography, Stack } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
// import Affiliation from "../Component/Affiliations";
import Blog from "../Component/BlogPage";
export default function AffiliationPage() {
  const navigate = useNavigate();
  function handleClick(event, path) {
    event.preventDefault();
    navigate(path);
  }

  const breadcrumbs = [
    <Link
      underline="hover"
      style={{ cursor: "pointer" }}
      key="1"
      color="inherit"
      //href="/"
      onClick={(e) => {
        handleClick(e, "/");
      }}
    >
      Home
    </Link>,
    <Typography key="3" color="text.primary">
      Blogs
    </Typography>,
  ];

  return (
    <>
      <div>
        <Header value={5} />
      </div>

      <div>
        <ImageComponent imageName={gallery} altText={"banner"} />
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
        <Blog />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
