import React from "react";
import { Stack, Box } from "@mui/material";
import {useTheme} from "@mui/material/styles"
import Chats from './Chats.js';
import Conversation from "../../components/Conversation/index.js";
const GeneralApp = () => {

  const theme = useTheme();

  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      <Chats />
      <Box 
      sx={{
        width: "100%", height: "100%", 
        backgroundColor :  theme.palette.mode === "light"
        ? "#F0F4FA"
        : theme.palette.background.default,

      }}
      >
      {
        // Conversation
      }
      <Conversation/>
    
      </Box>

    </Stack>

  );
};

export default GeneralApp;