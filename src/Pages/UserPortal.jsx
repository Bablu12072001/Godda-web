import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
  AppBar,
  Toolbar,
  Divider,
  Button,
  Stack,
  Link,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MenuIcon from "@mui/icons-material/Menu";
import PollTable from "../Component/Voting";
import Circular from "../Component/Circular";
import Auth from "../Authentication";
import Training from "../Component/Training";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function UserPortal() {
  const navigate = useNavigate();
  const { decoded } = Auth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [view, setView] = useState("home");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (event, tabName) => {
    event.preventDefault();
    setActiveTab(tabName);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const handleViewChange = (newView) => {
    setView(newView);
    setActiveTab(newView === "home" ? "home" : "dashboard");
  };

  const getBreadcrumbs = () => {
    const baseBreadcrumbs = [
      <Link
        underline="hover"
        style={{ cursor: "pointer" }}
        key="1"
        color="inherit"
        onClick={() => navigate("/")}
      >
        Home
      </Link>,
      <Typography key="2" color="text.primary">
        {view === "home" ? "Home" : "User Portal"}
      </Typography>,
    ];

    if (activeTab && activeTab !== "home" && activeTab !== "dashboard") {
      baseBreadcrumbs.push(
        <Typography key="3" color="text.primary">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </Typography>
      );
    }

    return baseBreadcrumbs;
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {view === "home"
          ? ["home", "circular"].map((text) => (
              <ListItem key={text}>
                <ListItemButton
                  onClick={(e) => handleClick(e, text)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#ddd",
                    },
                    backgroundColor:
                      activeTab === text ? "#bbb" : "transparent",
                    borderRadius: "4px",
                  }}
                >
                  <ListItemText
                    primary={text.charAt(0).toUpperCase() + text.slice(1)}
                  />
                </ListItemButton>
              </ListItem>
            ))
          : ["dashboard", "circular", "vote", "training"].map((text) => (
              <ListItem key={text}>
                <ListItemButton
                  onClick={(e) => handleClick(e, text)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#ddd",
                    },
                    backgroundColor:
                      activeTab === text ? "#bbb" : "transparent",
                    borderRadius: "4px",
                  }}
                >
                  <ListItemText
                    primary={text.charAt(0).toUpperCase() + text.slice(1)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
      </List>
    </div>
  );

  const renderContent = () => {
    if (view === "home") {
      return (
        <Box sx={{ textAlign: "center", p: 3 }}>
          {activeTab === "home" && (
            <Typography variant="h4" gutterBottom>
              Welcome to the Home Page
            </Typography>
          )}
          {activeTab === "circular" && <Circular />}
        </Box>
      );
    } else if (view === "userPortal") {
      return (
        <Box sx={{ display: "flex" }}>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  backgroundColor: "#f5f5f5",
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Toolbar />
            <Stack spacing={2} paddingLeft={5}>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                {getBreadcrumbs()}
              </Breadcrumbs>
            </Stack>
            <Box sx={{ flexGrow: 1 }}>
              {activeTab === "dashboard" && (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <Typography
                    variant="h3"
                    style={{ color: "#3f51b5", marginBottom: "10px" }}
                  >
                    Welcome back, {decoded.name}!
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{ color: "#616161", marginBottom: "10px" }}
                  >
                    We're thrilled to have you here.
                  </Typography>
                  <Typography variant="h5" style={{ color: "#616161" }}>
                    Please choose one of the options from the menu to proceed
                    further.
                  </Typography>
                </div>
              )}
              {activeTab === "vote" && <PollTable />}
              {activeTab === "circular" && <Circular />}
              {activeTab === "training" && <Training />}
            </Box>
            <Box
              component="footer"
              sx={{
                p: 2,
                mt: "auto",
                bgcolor: "background.paper",
                textAlign: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                &copy; {new Date().getFullYear()} Your Company. All rights
                reserved.
              </Typography>
            </Box>
          </Box>
        </Box>
      );
    }
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {view === "home" ? "Home" : "User Portal"}
          </Typography>
          <Button
            color="inherit"
            onClick={() =>
              handleViewChange(view === "home" ? "userPortal" : "home")
            }
          >
            {view === "home" ? "User Portal" : "Home"}
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {renderContent()}
    </>
  );
}
