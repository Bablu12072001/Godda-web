import React from "react";
import Header from "../Component/AppBar";
import Footer from "../Component/footer";
import ImageComponent from "../Component/ImageComponent";
import { Breadcrumbs, Stack, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import BeAMemberForm from "../Component/BeaMember";
import img from "../Assets/Be-a-member.jpg";
export default function BeAMemberPage() {
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
      Be A Member
    </Typography>,
  ];
  return (
    <>
      <div>
        <Header value={3} />
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
        <BeAMemberForm />
      </div>
      <br />
      <div>
        <Footer />
      </div>
    </>
  );
}
