import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Auth from "../Authentication";
import MenuIcon from "@mui/icons-material/Menu";
import ProfileSection from "./ProfileSection";

// const pages = [
//   "Home",
//   "About Us",
//   "Be A Member",
//   "Member List",
//   "Blog",
//   "Contact Us",
// ];

const DrawerComp = () => {
  const navigate = useNavigate();
  const { decoded } = Auth();
  const [openDrawer, setOpenDrawer] = useState(false);
  let pages = [];
  if (
    decoded?.role !== undefined &&
    decoded?.role === "member" &&
    decoded?.role !== null
  ) {
    pages = [
      {
        title: "Home",
        path: "/",
      },
      {
        title: "President's Message",
        path: "/president's-message",
      },
      {
        title: "Leadership Team",
        path: "/leadership-team",
      },
      {
        title: "Mission & Vision",
        path: "/mission-vision",
      },
      {
        title: "Be A Member",
        path: "/be-a-member",
      },
      {
        title: "Member List",
        path: "/member-list",
      },
      {
        title: "Blog",
        path: "/blog",
      },
      {
        title: "Contact Us",
        path: "/contact-us",
      },
      {
        title: "User Portal",
        path: "/userPortal",
      },
      {
        title: "Press Photos & Videos",
        path: "/press-photos-and-videos",
      },
      {
        title: "News & Events",
        path: "/news-and-event",
      },
    ];
  } else {
    pages = [
      {
        title: "Home",
        path: "/",
      },
      {
        title: "President's Message",
        path: "/president's-message",
      },
      {
        title: "Leadership Team",
        path: "/leadership-team",
      },
      {
        title: "Mission & Vision",
        path: "/mission-vision",
      },
      {
        title: "Be A Member",
        path: "/be-a-member",
      },
      {
        title: "Member List",
        path: "/member-list",
      },
      {
        title: "Blog",
        path: "/blog",
      },
      {
        title: "Contact Us",
        path: "/contact-us",
      },

      {
        title: "Press Photos & Videos",
        path: "/press-photos-and-videos",
      },
      {
        title: "News & Events",
        path: "/news-and-event",
      },
      {
        title: "Login",
        path: "/login",
      },
    ];
  }
  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          {pages.map((page, index) => (
            <ListItemButton key={index}>
              <ListItemIcon>
                <ListItemText>
                  <button
                    onClick={() => {
                      navigate(page.path);
                    }}
                  >
                    {page.title}
                  </button>
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
          {decoded?.role === "member" ? (
            <div
              style={{
                // display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
                marginLeft: 10,
              }}
            >
              &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
              <ProfileSection />
            </div>
          ) : (
            ""
          )}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "black", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
