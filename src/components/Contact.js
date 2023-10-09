import React, { useState } from 'react'
import { Box, Button, Stack, Typography, IconButton, Avatar, Divider } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { faker } from "@faker-js/faker";
import {
    Bell,
    CaretRight,
    Phone,
    VideoCamera,
    Prohibit,
    Star,
    Trash,
    X,
} from "phosphor-react";

import {
    useDispatch,
} from "react-redux";
import {
    ToggleSidebar, UpdateSidebarType
} from "../redux/slices/app";
import AntSwitch from "../components/AntSwitch";

const Contact = () => {
    const theme = useTheme();
    const [
        // openBlock,
        setOpenBlock] = useState(false);
    const [
        // openDelete,
        setOpenDelete] = useState(false);
    const dispatch = useDispatch();

    return (


        <Box
            sx={{
                width: 320,
                maxHeight: "100vh"
            }}
        >
            <Stack sx={{ height: "100%" }}>
                {
                    // Header
                }
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
                        justifyContent="space-between"
                        spacing={3}
                    >
                        <Typography variant="subtitle2">Contact Info</Typography>
                        <IconButton
                            onClick={() => {
                                dispatch(ToggleSidebar());
                            }}
                        >
                            <X />
                        </IconButton>
                    </Stack>

                </Box>


                {
                    // Body
                }

                <Stack
                    sx={{
                        height: "100%",
                        position: "relative",
                        flexGrow: 1,
                        overflow: "scroll",
                    }}
                    p={3}
                    spacing={3}

                >
                    <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar
                            src={faker.image.avatar()}
                            alt={faker.name.firstName()}
                            sx={{ height: 64, width: 64 }}
                        />
                        <Stack spacing={0.5}>
                            <Typography variant="article" fontWeight={600}>
                                {faker.name.fullName()}
                            </Typography>
                            <Typography variant="body2" fontWeight={500}>
                                {"+91 62543 28 739"}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent={"space-evenly"}
                    >
                        <Stack alignItems={"center"} spacing={1}>
                            <IconButton>
                                <Phone />
                            </IconButton>

                            <Typography variant="overline">Voice</Typography>
                        </Stack>
                        <Stack alignItems={"center"} spacing={1}>
                            <IconButton>
                                <VideoCamera />
                            </IconButton>

                            <Typography variant="overline">Video</Typography>


                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack spacing={0.5}>
                        <Typography variant="article" fontWeight={600}>
                            About
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                            about
                        </Typography>
                    </Stack>


                    <Divider />

                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent={"space-between"}
                    >
                        <Typography variant="subtitle2">Media, Links & Docs</Typography>
                        <Button
                            onClick={() => {
                                dispatch(UpdateSidebarType("SHARED"));
                            }}
                            endIcon={<CaretRight />}
                        >
                            401
                        </Button>
                    </Stack>

                    <Stack direction={"row"} alignItems="center" spacing={2}>
                        {[1, 2, 3].map((el) => (
                            <Box>
                                <img src={faker.image.city()} alt={faker.internet.userName()} />
                            </Box>
                        ))}
                    </Stack>

                    <Divider />
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent={"space-between"}
                    >
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Star size={21} />
                            <Typography variant="subtitle2">Starred Messages</Typography>
                        </Stack>

                        <IconButton
                            onClick={() => {
                                dispatch(UpdateSidebarType("STARRED"));
                            }}
                        >
                            <CaretRight />
                        </IconButton>
                    </Stack>
                    <Divider />

                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent={"space-between"}
                    >
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Bell size={21} />
                            <Typography variant="subtitle2">Mute Notifications</Typography>
                        </Stack>

                        <AntSwitch />
                    </Stack>
                    <Divider />
                    <Typography variant="body2">1 group in common</Typography>
                    <Stack direction="row" alignItems={"center"} spacing={2}>
                        <Avatar src={faker.image.imageUrl()} alt={faker.name.fullName()} />
                        <Stack direction="column" spacing={0.5}>
                            <Typography variant="subtitle2">Camel Gang</Typography>
                            <Typography variant="caption">
                                Owl, Parrot, Rabbit , You
                            </Typography>
                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack direction="row" alignItems={"center"} spacing={2}>
                        <Button
                            onClick={() => {
                                setOpenBlock(true);
                            }}
                            fullWidth
                            startIcon={<Prohibit />}
                            variant="outlined"
                        >
                            Block
                        </Button>
                        <Button
                            onClick={() => {
                                setOpenDelete(true);
                            }}
                            fullWidth
                            startIcon={<Trash />}
                            variant="outlined"
                        >
                            Delete
                        </Button>
                    </Stack>



                </Stack>
            </Stack>




        </Box>

    )
}

export default Contact
