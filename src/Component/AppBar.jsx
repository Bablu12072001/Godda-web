import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../Assets/government-of-jharkhand.png";
import Auth from "../Authentication";
import {
  Menu,
  MenuItem,
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  styled,
} from "@mui/material";

// import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import DrawerComp from "./Drawer";
import { useNavigate } from "react-router-dom";
import ProfileSection from "./ProfileSection";
const Header = (props) => {
  const navigate = useNavigate();
  const themes = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
    },
  });

  const StyledTab = styled(Tab)`
    text-transform: none; // Prevent automatic capitalization
    && {
      text-transform: capitalize; // Capitalize the first letter
      font-size: 18px; // Set the font size to your desired value
      // font-family: "Roboto", sans-serif; // Set the font family to your desired value
      font-family: "Open Sans", sans-serif;
    }
  `;

  const [value, setValue] = useState(props.value);
  // console.log(value);
  const theme = useTheme();
  // console.log(theme);
  const isLogo = useMediaQuery("(min-width:1200px)");
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  // console.log(isMatch);
  const { decoded } = Auth();
  // console.log(decoded);
  const isTablet = useMediaQuery("(min-width:601px) and (max-width:960px)");
  let sp = "20px";
  if (isTablet) {
    sp = "4px";
  }
  // console.log("sp", sp);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setValue(null);
  };
  const handleClose = () => {
    // console.log("close");
    // alert("close");
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <AppBar
        sx={{
          textDecoration: "none",
          background: "#f8f9fa",
          fontWeight: "900",
          color: "#000246e0",
        }}
      >
        {/* {" 063970"} */}

        <Toolbar>
          {/* <AddBusinessRoundedIcon sx={{ transform: "scale(2)" }} /> */}
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "1.5rem" }}>
                {/* JMOA(Collectorate Cadre) */}
                {/* <img className="w-20 h-16" src={logo} alt="logo" /> */}
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              {isLogo ? (
                <Typography sx={{ fontSize: "2rem" }}>
                  {/* JMOA(Collectorate Cadre) */}
                  {/* <img
                    className="w-20 h-16"
                    src={logo}
                    alt="logo"
                    style={{ height: "9vh", width: "100%" }}
                  /> */}
                </Typography>
              ) : (
                ""
              )}
              <Tabs
                sx={{
                  marginLeft: "auto",
                  marginRight: "10px",
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <StyledTab
                  onClick={() => {
                    navigate("/");
                  }}
                  label="Home"
                  sx={{
                    marginRight: sp,
                    color: "black",
                    fontWeight: "900",
                    borderBottom: value === 0 && "2px solid #000",
                  }}
                />
                <ThemeProvider theme={themes}>
                  <Button
                    onClick={handleClick}
                    sx={{
                      marginRight: sp,
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "18px",
                      opacity: value === "aboutUs" ? "0.9" : "0.6",
                      fontFamily: "Open Sans, sans-serif",
                      borderBottom: value === "aboutUs" && "2px solid #000",
                    }}
                  >
                    About Us
                    <ArrowDropDownIcon />
                  </Button>
                </ThemeProvider>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate("/president's-message");
                    }}
                  >
                    President's Message
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate("/leadership-team");
                    }}
                  >
                    Leadership Team
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate("/mission-vision");
                    }}
                  >
                    Mission & Vision
                  </MenuItem>
                </Menu>
                <StyledTab
                  label="Be A Member"
                  onClick={() => {
                    navigate("/be-a-member");
                  }}
                  sx={{
                    marginRight: sp,
                    color: "black",
                    fontWeight: "900",
                    borderBottom: value === 3 && "2px solid #000",
                  }}
                />
                <StyledTab
                  label="Member List"
                  onClick={() => {
                    navigate("/member-list");
                  }}
                  sx={{
                    marginRight: sp,
                    color: "black",
                    fontWeight: "900",
                    borderBottom: value === 4 && "2px solid #000",
                  }}
                />
                <StyledTab
                  label="Blog"
                  onClick={() => {
                    navigate("/blog");
                  }}
                  sx={{
                    marginRight: sp,
                    color: "black",
                    fontWeight: "900",
                    borderBottom: value === 5 && "2px solid #000",
                  }}
                />
                <StyledTab
                  label="Contact Us"
                  onClick={() => {
                    navigate("/contact-us");
                  }}
                  sx={{
                    marginRight: sp,
                    color: "black",
                    fontWeight: "900",
                    borderBottom: value === 6 && "2px solid #000",
                  }}
                />
              </Tabs>
              {decoded?.role === "member" ? (
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    navigate("/userPortal");
                  }}
                >
                  User Portal
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Button>
              )}
              {/* <Button sx={{ marginLeft: "10px" }} variant="contained">
                SignUp
              </Button> */}
              {decoded?.role === "member" ? (
                <>
                  &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                  <ProfileSection />
                </>
              ) : (
                ""
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
