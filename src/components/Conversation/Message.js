import { Box, Stack } from '@mui/material'
import React from 'react'
import { Chat_History } from '../../data'
import { Timeline, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg } from './MsgTypes'

const Message = () => {
    return (

        <Box p={3}>

            <Stack spacing={3}>


                {
                    Chat_History.map((el) => {
                        switch (el.type) {
                            case "divider":
                                return <Timeline el={el} />;

                            case "msg":
                                switch (el.subtype) {
                                    case "img":
                                        return <MediaMsg el={el} />;

                                    case "doc":
                                        return <DocMsg el={el} />;
                                    case "link":
                                        return <LinkMsg el={el} />;
                                    case "reply":
                                        return <ReplyMsg el={el} />

                                    default:
                                        return <TextMsg el={el} />;


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
