import React from "react";
import { Stack, Box,Typography } from "@mui/material";

import { Link } from "react-router-dom";
import NoChat from "../../assets/Illustration/NoChat";

import { useTheme } from "@mui/material/styles"
import Chats from './Chats.js';
import Conversation from "../../components/Conversation/index.js";
import Contact from "../../components/Contact.js";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages.js";
import StarredMessages from "../../components/StarredMessages.js";
const GeneralApp = () => {

  const theme = useTheme();
  const { sideBar , room_id ,chat_type } = useSelector((state) => state.app);

  
  return (
    <Stack direction="row" sx={{ width: "100%" }}>
    {
      /* Chats*/
    }
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
        {room_id!=null && chat_type === "individual" ?
        <Conversation /> :
        <Stack
        spacing={2}
        sx={{ height: "100%", width: "100%" }}
        alignItems="center"
        justifyContent={"center"}
        >

        <NoChat />
              <Typography variant="subtitle2">
                Select a conversation or start a{" "}
                <Link
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                  }}
                  to="/"
                >
                  new one
                </Link>
              </Typography>
        </Stack>

      }

      </Box>

      {sideBar.open &&
        (() => {
          switch (sideBar.type) {
            case "CONTACT":
              return <Contact />;

            case "STARRED":
              return <StarredMessages/>;

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