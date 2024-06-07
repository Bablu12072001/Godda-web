import React,{useEffect} from "react";
import Header from "../Component/AppBar";
import Footer from "../Component/footer";
import img from "../Assets/circularBg.jpg";
import ImageComponent from "../Component/ImageComponent";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Circular from "../Component/Circular";
import Auth from "../Authentication";
import { useNavigate } from "react-router-dom";

export default function CircularPage() {
const navigate = useNavigate();
const { decoded } = Auth(); 

  useEffect(() => {
    if (!decoded) {
      // console.log("User not authenticated, redirecting to login...");
      navigate("/login");
    }
  }, [decoded, navigate]);

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
      Circular
    </Typography>,
  ];

  return (
    <>
      <div>
        <div>
          <Header value={null} />
        </div>
        <div>
          <ImageComponent imageName={img} altText={"logo"} />
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
        <center>
          <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-600 pb-2 inline-block text-blue-900">
            CIRCULAR
          </h1>
        </center>
      </div>
      <div>
        <Circular />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
