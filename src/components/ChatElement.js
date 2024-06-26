import React from "react";
import { Box, Badge, Stack, Avatar, Typography } from "@mui/material";
import { styled, useTheme,alpha} from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { SelectConversation } from "../redux/slices/app";
import {SetCurrentConversation} from "../redux/slices/conversation";

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));
const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  
const ChatElement = ({  img,name, time, unread, online ,id}) => {
  const dispatch = useDispatch(); 
  const {room_id} = useSelector((state) => state.app); 
  const selectedChatId = room_id?.toString();
  let isSelected = +selectedChatId === id;
  const { conversations } = useSelector((state) => state.conversation.direct_chat);
  const current = conversations.find((el) => el?.id === room_id);
  if (!selectedChatId) {
    isSelected = false;
  }
  const theme = useTheme();
    return (

      <StyledChatBox
      onClick={() => {
        dispatch(SelectConversation({room_id: id}));
        dispatch(SetCurrentConversation(current));
    
      }}
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: isSelected
          ? theme.palette.mode === "light"
            ? alpha(theme.palette.primary.main, 0.5)
            : theme.palette.primary.main
          : theme.palette.mode === "light"
          ? "#fff"
          : theme.palette.background.paper,
      }}
      p={2}
    >
            <Stack direction="row"
                alignItems={"center"}
                justifyContent="space-between"
            >
                <Stack direction="row" spacing={2}>
                {" "}
                    {online ? <StyledBadge overlap='circular'
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot">
                        <Avatar />
                    </StyledBadge>
                        :
                        <Avatar />
                    }
                    <Stack spacing={0.3}>
                        <Typography variant='subtitle2'>
                            {name}</Typography>
                    </Stack>
                    <Stack alignItems="center" spacing={2}>
                        <Typography>
                            {time}
                        </Typography>
                        <Badge color="primary" badgeContent={unread}>
                        </Badge>
                    </Stack>
                </Stack>
            </Stack>
        </StyledChatBox>
    )
}

// const truncateText = (string, n) => {
//   return string?.length > n ? `${string?.slice(0, n)}...`: string;
// };

export default ChatElement;