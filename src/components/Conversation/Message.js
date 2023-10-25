import { Box, Stack } from '@mui/material'
import React, { useEffect, useRef }  from 'react'
import { Chat_History } from '../../data'
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { Timeline, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg } from './MsgTypes'

import {
    FetchCurrentMessages,
    SetCurrentConversation,
  } from "../../redux/slices/conversation";
  import { socket } from "../../socket";
const Message = ({menu}) => {

    const dispatch = useDispatch();

    const { conversations, current_messages } = useSelector(
      (state) => state.conversation.direct_chat
    );
    const { room_id } = useSelector((state) => state.app);

    useEffect(() => {
      const current = conversations.find((el) => el?.id === room_id);
  
      socket.emit("get_messages", { conversation_id: current?.id }, (data) => {
        // data => list of messages
        console.log(data, "List of messages");
        dispatch(FetchCurrentMessages({ messages: data }));
      });
  
     
    }, []);

    return (

        <Box p={3}>

            <Stack spacing={3}>


                {
                    current_messages.map((el) => {
                        switch (el.type) {
                            case "divider":
                                return <Timeline el={el} />;

                            case "msg":
                                switch (el.subtype) {
                                    case "img":
                                        return <MediaMsg el={el} menu={menu} />;

                                    case "doc":
                                        return <DocMsg el={el} menu={menu}  />;
                                    case "link":
                                        return <LinkMsg el={el} menu={menu}  />;
                                    case "reply":
                                        return <ReplyMsg el={el} menu={menu}  />

                                    default:
                                        return <TextMsg el={el} menu={menu} />;


                                }

                            default:
                                return null;

                        }


                    })}

            </Stack>
            
        </Box>

    )
}

export default Message
