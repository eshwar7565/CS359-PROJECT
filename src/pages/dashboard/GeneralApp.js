import React from "react";
import { Stack, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles"
import Chats from './Chats.js';
import Conversation from "../../components/Conversation/index.js";
import Contact from "../../components/Contact.js";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages.js";
const GeneralApp = () => {

  const theme = useTheme();
  const { sideBar } = useSelector((state) => state.app);

  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      <Chats />
      <Box
        sx={{
          height: "100%",
          width: sideBar.open
              ? `calc(100vw - 740px )`
              : "calc(100vw - 420px )",
          backgroundColor: theme.palette.mode === "light"
            ? "#F0F4FA"
            : theme.palette.background.default,

        }}
      >
        {
          // Conversation
        }
        <Conversation />

      </Box>

      {sideBar.open &&
        (() => {
          switch (sideBar.type) {
            case "CONTACT":
              return <Contact />;

            case "STARRED":
              break;

            case "SHARED":
              return <SharedMessages />;

            default:
              break;
          }
        })()}
  

    </Stack>

  );
};

export default GeneralApp;