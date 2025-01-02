import * as React from "react";
import Sidebar from "@layouts/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { Box, Radio, Typography } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useTheme } from "@contexts/ThemeContext";

type Props = {
  children: React.ReactNode;
  fullWidth?: boolean;
  title?: string;
};

const AppLayout = (props: Props) => {
  const { children, fullWidth, title } = props || {};

  const [isSideBarOpen, setSideBarOpen] = React.useState(false);

  const handleSideBarToggle = () => setSideBarOpen(!isSideBarOpen);

  const { mode, toggleTheme, theme } = useTheme();

  return (
    <Box display="flex" position={"relative"}>
      <Box
        component="nav"
        sx={{
          width: { md: 300 },
          flexShrink: { md: 0 },
        }}
      >
        <Sidebar open={isSideBarOpen} onClose={handleSideBarToggle} />
      </Box>
      <Box sx={{ position: "absolute", display: { md: "none", sm: "block" } }}>
        <IconButton color="primary" aria-label="open sidebar" onClick={handleSideBarToggle}>
          <MenuIcon sx={{ width: "30px", height: "30px" }} />
        </IconButton>
      </Box>
      <Box width={"100%"} sx={{ backgroundColor: theme.background }}>
        <Container maxWidth={false}>
          <Box
            px={4}
            pt={4}
            height={"100vh"}
            overflow={"hidden"}
            boxSizing={"border-box"}
            mr={{ md: fullWidth ? 0 : 8 }}
          >
            <Box height={"15%"} display={"flex"} justifyContent={"space-between"}>
              <Typography variant="h2">{title}</Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={mode}
                  onChange={toggleTheme}
                >
                  <FormControlLabel value="light" control={<Radio />} label="Light Mode" />
                  <FormControlLabel value="dark" control={<Radio />} label="Dark Mode" />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box height={"85%"}>{children}</Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AppLayout;
