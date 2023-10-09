import React from 'react'
import { useTheme } from "@mui/material/styles";
import {
    Box,
    IconButton,
    Stack,
    Typography
} from "@mui/material";
import { useDispatch } from "react-redux";
import { UpdateSidebarType } from "../redux/slices/app";
import { ArrowLeft } from "phosphor-react";
import Message from './Conversation/Message';


const StarredMessages = () => {
    const theme = useTheme();
    const dispatch = useDispatch();



    return (
        <Box
            sx={{
                width: 320,
                maxHeight: "100vh"
            }}
        >
            <Stack sx={{ height: "100%" }}>
                <Box
                    sx={{
                        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                        width: "100%",
                        backgroundColor:
                            theme.palette.mode === "light"
                                ? "#F8FAFF"
                                : theme.palette.background,
                    }}
                >
                    <Stack
                        sx={{ height: "100%", p: 2 }}
                        direction="row"
                        alignItems={"center"}
                        spacing={3}
                    >
                        <IconButton
                            onClick={() => {
                                dispatch(UpdateSidebarType("CONTACT"));
                            }}
                        >
                            <ArrowLeft />
                        </IconButton>
                        <Typography variant="subtitle2">StarredMessages</Typography>
                    </Stack>
                </Box>


                <Stack
                    sx={{
                        height: "100%",
                        position: "relative",
                        flexGrow: 1,
                        overflow: "scroll",
                    }}
                    spacing={3}
                    padding={2}
                >

                    <Message />

                </Stack>

            </Stack>
        </Box>
    )
}

export default StarredMessages
