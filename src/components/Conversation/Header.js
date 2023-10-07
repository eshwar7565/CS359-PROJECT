import React from 'react';
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StyledBadge from '../Styledbadge';
import { faker } from "@faker-js/faker";
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from 'phosphor-react';
const Header = () => {
    const theme = useTheme();

    return (
        <Box
            p={2}
            sx={{

                width: "100%",
                backgroundColor: theme.palette.mode === "light"
                    ? "#F8FAFF"
                    : theme.palette.background.paper,
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"

            }}>

            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}

                sx={{
                    width: "100%",
                    height: "100%",
                }}
            >

                <Stack

                    spacing={2}
                    direction="row"
                >
                    <Box>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            variant="dot"
                        >
                            <Avatar

                                src={faker.image.avatar()}
                            />
                        </StyledBadge>

                    </Box>
                    <Stack spacing={0.2}>
                        <Typography variant='subtitle2'>
                            {faker.name.fullName()}
                        </Typography>
                        <Typography variant='caption' >
                            Online
                        </Typography>
                    </Stack>
                </Stack>

                <Stack direction={"row"} alignItems={"center"} spacing={3}>

                    <IconButton>
                        <VideoCamera>
                        </VideoCamera>
                    </IconButton>
                    <IconButton>
                        <Phone>
                        </Phone>
                    </IconButton>
                    <IconButton>
                        <MagnifyingGlass>
                        </MagnifyingGlass>
                    </IconButton>
                    <Divider orientation='vertical' flexItem />
                    <IconButton>
                        <CaretDown></CaretDown>

                    </IconButton>

                </Stack>

            </Stack>

        </Box>
    )
}

export default Header;
