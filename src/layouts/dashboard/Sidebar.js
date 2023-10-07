

import React from "react";
import { useTheme } from "@mui/material/styles";

import { Box, Divider, IconButton, Stack,Avatar } from "@mui/material";
import AntSwitch from "../../components/AntSwitch";

import Logo from "../../assets/Images/logo.ico";

import useSettings from "../../hooks/useSettings";
import { Nav_Buttons } from "../../data";

import { Gear } from "phosphor-react";
import { useState } from "react";
import { faker } from "@faker-js/faker";



const Sidebar = () => {
    const theme = useTheme();
    const [selected, setSelected] = useState(0);
    const { onToggleMode } = useSettings();
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
        <Avatar src={faker.image.avatar()} />
      </Stack>
    </Stack>

  </Box>
  )
}

export default Sidebar;
