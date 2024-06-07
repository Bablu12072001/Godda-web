import React from "react";
import Header from "../Component/AppBar";
import Footer from "../Component/footer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link, Stack, Grid,Card,CardContent } from "@mui/material";
import ImageComponent from "../Component/ImageComponent";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";

import lt from "../Assets/lt.jpg";
export default function LeadershipTeamPage() {
  const navigate = useNavigate();
  function handleClick(event, path) {
    event.preventDefault();
    navigate(path);
  }

   const MemberCard = ({ title, district }) => {
     return (
       <Grid item xs={12} sm={6}>
         <Card
           sx={{
             margin: "10px",
             backgroundColor: "#f0f0f0",
             borderRadius: "12px",
             overflow: "hidden",
             cursor: "pointer",
             transition: "box-shadow 0.3s",
             "&:hover": {
               boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)", // Adjusted shadow color
             },
           }}
           onClick={() => {
             navigate(`/leadership-team/${title}`);
           }}
         >
           <CardContent>
             <Typography variant="h5" component="div" align="center">
               {title}
             </Typography>
           </CardContent>
         </Card>
       </Grid>
     );
   };


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
      About Us
    </Typography>,
    <Typography key="3" color="text.primary">
      Leadership Team
    </Typography>,
  ];

  return (
    <>
      <div>
        <div>
          <Header value={"aboutUs"} />
        </div>

        <div>
          <ImageComponent imageName={lt} altText={"lt"} />
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
          {/* <LeadershipTeam /> */}
          <Grid container spacing={3} justifyContent="center">
            <MemberCard title="State Leadership Team"  />
            <MemberCard title="District Leadership Team" />
            <MemberCard title="Divisonal Leadership Team" />
          </Grid>
        </div>
        <br />
        <br />
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
