import React from "react";
import { Stack, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles"
import Chats from './Chats.js';
import Conversation from "../../components/Conversation/index.js";
import Contact from "../../components/Contact.js";
const GeneralApp = () => {

  const theme = useTheme();

  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      <Chats />
      <Box
        sx={{
          height: "100%",
          width: "calc(100vw)",
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

      <Contact />

    </Stack>

  );
};

export default GeneralApp;