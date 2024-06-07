import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Header from "../Component/AppBar";
import ImageComponent from "../Component/ImageComponent";
import Footer from "../Component/footer";
import img from "../Assets/circularBg.jpg";
import { Breadcrumbs, Link, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useParams } from "react-router-dom";

export default function SelectMemberOption() {
  const navigate = useNavigate();
  const { district } = useParams();
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
            navigate(`/member-list/${district}/${title}`);
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
      onClick={() => {
        navigate("/");
      }}
    >
      Home
    </Link>,

    <Link
      underline="hover"
      style={{ cursor: "pointer" }}
      key="1"
      color="inherit"
      //href="/"
      onClick={() => {
        navigate("/member-list");
      }}
    >
      Member-List
    </Link>,
    <Typography key="3" color="text.primary">
      {district}
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
      <Grid container spacing={3} justifyContent="center">
        <MemberCard title="Core Members" district={district} />
        <MemberCard title="All Members" district={district} />
      </Grid>

      <div>
        <Footer />
      </div>
    </>
  );
}
