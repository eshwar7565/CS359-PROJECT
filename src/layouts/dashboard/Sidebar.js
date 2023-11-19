import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Divider, IconButton, Stack} from "@mui/material";
import AntSwitch from "../../components/AntSwitch";
import Logo from "../../assets/Images/logo.ico";
import useSettings from "../../hooks/useSettings";
import { Nav_Buttons, Nav_Settings } from "../../data";
import ProfileMenu from "./ProfileMenu";


import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

import { UpdateTab } from "../../redux/slices/app"; 

const getPath = (index) => {
  switch (index) {
    case 0:
      return "/app";

    case 1:
      return "/group";

    case 2:
      return "/call";

    case 3:
      return "/settings";

    default:
      break;
  }
};

const Sidebar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { tab } = useSelector((state) => state.app);

  const navigate = useNavigate();
  const { onToggleMode } = useSettings();

  const selectedTab = tab;
  const handleChangeTab = (index) => {
    dispatch(UpdateTab({ tab: index }));
    navigate(getPath(index));
  };
  return (
    <Box
      p={2}
      sx={{
        backgroundColor:
        theme.palette.mode === "light"
          ? "#F0F4FA"
          : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0 ,0.25)",
        height: "100vh", width: 100
      }}>

      <Stack
      
       alignItems={"center"} 
       sx={{ height: "100%" }}
        py={3}
        justifyContent={"space-between"}>
        <Stack
          alignItems={"center"} spacing={4}>

          <Box sx={{
            backgroundColor: theme.palette.primary.main,
            height: 64,
            width: 64,
            borderRadius: 1.5,
          }}>
            <img src={Logo} alt="Chat App Logo" />
          </Box>


          <Stack direction="column"
           alignItems={"center"}
            sx={{ width: "max-content" }} spacing={3}>

            {Nav_Buttons.map((el) => (
              el.index === selectedTab ? (
                <Box
                
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}>
                  <IconButton
                  onClick={() => {
                    handleChangeTab(el.index);
                  }}
                  sx={{ width: "max-content", color: "#ffffff" }}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              ):(

               
                  <IconButton
                    onClick={() => {
                      handleChangeTab(el.index);
                    }}
                    sx={{
                      width: "max-content",
                      color:
                        theme.palette.mode === "light"
                          ? "#080707"
                          : theme.palette.text.primary,
                    }}
                   >
                    {el.icon}
                  </IconButton>
              )

            ))}
            <Divider sx={{ width: 48 }} />
            {Nav_Settings.map((el) => {
              return el.index === selectedTab ? (
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                  p={1}
                >
                  <IconButton
                    onClick={() => {
                      handleChangeTab(el.index);
                    }}
                    sx={{ width: "max-content", color: "#ffffff" }}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    handleChangeTab(el.index);

                   
                  }}
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "light"
                        ? "#080707"
                        : theme.palette.text.primary,
                  }}
                >
                  {el.icon}
                </IconButton>
              );
            })}

          </Stack>
        </Stack>


        <Stack spacing={4}>
          <AntSwitch
          defaultChecked={theme.palette.mode === "dark"}
           onChange={onToggleMode}>

          </AntSwitch>
          <ProfileMenu />
        </Stack>
      </Stack>

    </Box>
  )
}

export default Sidebar;
