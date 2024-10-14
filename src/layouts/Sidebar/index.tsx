import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListItemButton from "@mui/material/ListItemButton";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { COLORS } from "@constants/colors";
import ROUTES from "@constants/routes";
import theme from "@styles/theme";
import { IMAGES } from "@constants/images";

const Sidebar = (props: any) => {
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const { pathname } = useLocation();

  type ListItemProps = {
    text: string;
    path: string;
    active: string[];
    icon?: string;
  };

  const generateListItem = ({ text, path, active, icon }: ListItemProps) => {
    return (
      <ListItem key={path}>
        <ListItemButton onClick={() => navigate(path)} selected={active?.includes(pathname)}>
          {/* <img src={icon} alt="" /> */}
          <ListItemText
            primary={text}
            primaryTypographyProps={{
              fontWeight: 700,
              fontSize: "16px",
              color: COLORS.dark.light,
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Drawer
      variant={isMdUp ? "permanent" : "temporary"}
      {...props}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#a8ca55",
        },
      }}
    >
      <List
        className="MuiList-sideBar-menu"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ListItem sx={{ my: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box
            component="img"
            src={IMAGES.BG}
            alt="logo"
            sx={{
              width: "86px",
              height: "78px",
              objectFit: "contain",
              borderRadius: 2,
            }}
          ></Box>
        </ListItem>
        {generateListItem({
          text: "Dashboard",
          path: ROUTES.DASHBOARD,
          active: [ROUTES.DASHBOARD],
        })}

        <div style={{ flex: 1 }} />
        <Box position={"absolute"} zIndex={999} bottom={100} right={5}></Box>
        <ListItem sx={{ position: "relative" }} onClick={() => alert("logout")}>
          <ListItemButton>
            <ListItemText
              sx={{ ml: 2 }}
              primary={
                <Box gap={2} component="span" sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    component="span"
                    sx={{
                      fontWeight: 800,
                      fontSize: "23px",
                      color: COLORS.black.main,
                    }}
                  >
                    Log Out
                  </Box>
                </Box>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
