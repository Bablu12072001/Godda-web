import React from "react";
// import { useTheme } from "@mui/material/styles";
import { Stack, Menu, MenuItem } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";
export default function NavBarUnderCarousel() {
  const navigate = useNavigate();
  // const theme = useTheme();
  // console.log(theme);
  // const isMatch = useMediaQuery(
  //   theme.breakpoints.up("sm") && theme.breakpoints.down("md")
  // );
  // const isTablet = useMediaQuery(
  //   theme.breakpoints.down("lg") && theme.breakpoints.up("md")
  // );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log("close");
    // alert("close");
    setAnchorEl(null);
  };

  const isSmall = useMediaQuery("(max-width:360px)");
  const isMatch = useMediaQuery("(min-width:361px) and (max-width:600px)");
  const isTablet = useMediaQuery("(min-width:601px) and (max-width:1050px)");
  const isBig = useMediaQuery("(min-width:1051px)");
  // let h = "9vh";
  let sp = 14;
  let fs = "18px";
  if (isSmall) {
    // h = "7vh";
    sp = 1;
    fs = "13px";
    // console.log("small");
  } else if (isMatch) {
    // h = "6vh";
    sp = 4;
    fs = "14px";
    // console.log("mobile");
  } else if (isTablet) {
    // h = "7vh";
    sp = 6;
    fs = "16px";
    // console.log("Tab");
  } else if (isBig) {
    // h = "10vh";
    sp = 14;
    fs = "22px";
    // console.log("pc");
  }
  // console.log(isMatch);
  // alert(sp);
  return (
    <>
      <div>
        <div
          style={{
            // zIndex: "10",
            padding: 10,
            // fontSize: isMatch ? "12px" : "18px",
            fontSize: fs,
            fontWeight: "500",
            fontFamily: "Open Sans, sans-serif",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#652B7C",
            color: "white",

            // height: isMatch ? "5vh" : "9vh",
            height: "auto",
            width: "100%",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <Stack
            direction={"row"}
            // spacing={isMatch ? 2 : 20}
            spacing={sp}
            sx={{ overflow: "hidden" }}
          >
            <button
              onClick={() => {
                navigate("/affiliation");
              }}
            >
              Affiliation
            </button>
            <button
              onClick={() => {
                navigate("/circular");
              }}
            >
              Circular
            </button>
            <button
              onClick={() => {
                navigate("/training");
              }}
            >
              Training
            </button>
            <button onClick={handleClick}>
              Gallery
              {isMatch || isSmall ? "" : <ArrowDropDownIcon />}
              {/* {isDropdownOpen && ( */}
              {/* {alert(Boolean(anchorEl))} */}
              {/* )} */}
            </button>
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
                  navigate("/image-gallery");
                }}
              >
                Image Gallery
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/video-gallery");
                }}
              >
                Video Gallery
              </MenuItem>
            </Menu>
            {isTablet || isBig ? (
              <>
                <button
                  onClick={() => {
                    navigate("/press-photos-and-videos");
                  }}
                >
                  Press Photos & Videos
                </button>
                <button
                  onClick={() => {
                    navigate("/news-and-event");
                  }}
                >
                  News & Events
                </button>
              </>
            ) : (
              ""
            )}
          </Stack>
        </div>
      </div>
    </>
  );
}
