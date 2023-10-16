

import React from "react";
import { useTheme } from "@mui/material/styles";

import { Box, Divider, IconButton, Stack, Avatar, Menu, MenuItem } from "@mui/material";
import AntSwitch from "../../components/AntSwitch";

import Logo from "../../assets/Images/logo.ico";

import useSettings from "../../hooks/useSettings";
import { Nav_Buttons, Profile_Menu } from "../../data";

import { Gear } from "phosphor-react";
import { useState } from "react";
import { faker } from "@faker-js/faker";

import { useNavigate } from "react-router-dom";

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

const getMenuPath = (index) =>
{

  switch (index) {
    case 0:
      return "/profile";  
    case 1:
      return "/settings";
    default :
      break;
  }

}

const Sidebar = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();
  const { onToggleMode } = useSettings();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
   




  };

 // 
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      p={2}
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0 ,0.25)",
        height: "100vh", width: 100
      }}>

      <Stack direction="column" alignItems={"center"} sx={{ height: "100%" }} spacing={3}
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


          <Stack direction="column" alignItems={"center"} sx={{ width: "max-content" }} spacing={3}>

            {Nav_Buttons.map((el) => (
              el.index === selected ?
                <Box
                  p={1}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}>
                  <IconButton
                    sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : "#fff" }}
                    key={el.index}>
                    {el.icon}
                  </IconButton>
                </Box>
                :

                <Box
                  p={1}
                  sx={{

                    borderRadius: 1.5,
                  }}>
                  <IconButton
                    onClick={() => {
                      setSelected(el.index);
                      navigate(getPath(el.index));
                    }}
                    sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : "#fff" }}
                    key={el.index}>
                    {el.icon}
                  </IconButton>
                </Box>

            ))}
            <Divider sx={{ width: "48px" }} />
            {selected === 3 ?
              <Box
                p={1}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 1.5,
                }}>
                <IconButton sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : "#fff" }}>
                  <Gear>

                  </Gear>
                </IconButton>

              </Box>
              :

              <IconButton onClick={() => {
                setSelected(3);
                navigate(getPath(3));
              }}
                sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : "#fff" }}>
                <Gear>

                </Gear>
              </IconButton>
            }


          </Stack>
        </Stack>


        <Stack spacing={4}>
          <AntSwitch onChange={() => {
            onToggleMode();
          }}>

          </AntSwitch>
          <Avatar id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            src={faker.image.avatar()} />
          <Menu

            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}

            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"

            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
          >
            <Stack spacing={1} p={1}>

              {Profile_Menu.map((el,idx) => (
                <MenuItem onClick={ () =>{
                  handleClick();
                 
                } }>
                  <Stack 
                  onClick = {() => {
                    navigate(getMenuPath(idx));
                  }}
                  sx={{
                    width: 100,

                  }} direction={"row"} alignItems={"center"}
                    justifyContent="space-between">
                    <span>{el.title}</span>{el.icon}
                  </Stack></MenuItem>
              ))}
            </Stack>
          </Menu>
        </Stack>
      </Stack>

    </Box>
  )
}

export default Sidebar;
