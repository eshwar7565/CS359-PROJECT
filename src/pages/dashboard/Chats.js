import React from 'react';
import { Avatar, Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import { ArchiveBox, CircleDashed, MagnifyingGlass } from 'phosphor-react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import {SimpleBarStyle} from '../../components/Scrollbar';
import { useTheme } from "@mui/material/styles";

import {
    Search,
    SearchIconWrapper,
    StyledInputBase,
} from "../../components/Search";
import { faker } from '@faker-js/faker';
import { ChatList } from '../../data';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));





const ChatElement = ({ id, name, img, msg, time, unread, online }) => {
    const theme = useTheme();
    return (
        <Box sx={{
            width: "100%",
            backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background,
            borderRadius: 1,
        


        }}
            p={2}>
            <Stack direction="row"
                alignItems={"center"}
                justifyContent="space-between"

            >
                <Stack direction="row" spacing={2}>

                    {online ? <StyledBadge overlap='circular'
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot">
                        <Avatar src={faker.image.avatar()} />
                    </StyledBadge>
                        :
                        <Avatar src={faker.image.avatar()} />
                    }


                    <Stack spacing={0.3}>
                        <Typography variant='subtitle2'>
                            {name}</Typography>
                        <Typography variant='subtitle2'>
                            {msg}</Typography>
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


        </Box>
    )
}





const Chats = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: "relative",
                height: "100%",
                width: 320,
                backgroundColor:
                theme.palette.mode === "light"
                  ? "#F8FAFF"
                  : theme.palette.background,

                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            }}
        >
            <Stack p={3} spacing={2} sx= {{height : "120vh" , }}>
                <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                    <Typography variant='h5'>
                        Chats
                    </Typography>
                    <IconButton>
                        <CircleDashed>
                        </CircleDashed>
                    </IconButton>


                </Stack>
                <Stack sx={{ width: "100%" }}>
                    <Search>
                        <SearchIconWrapper>
                            <MagnifyingGlass color="#709CE6" />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>
                </Stack>
                <Stack spacing={1}>
                    <Stack direction={"row"} spacing={1.5} alignItems="center">
                        <ArchiveBox size={24} />
                        <Button variant="text">Archive</Button>
                    </Stack>
                    <Divider />
                </Stack>
                <Stack sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}>
                <SimpleBarStyle timeout={500} clickOnTrack={false}>
                  <Stack spacing={2.4}>
                     <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                      Pinned
                    </Typography> 
                    
                    {ChatList.filter((el) => el.pinned).map((el, idx) => {
                      return <ChatElement {...el} />;
                    })}
                    <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                      All Chats
                    </Typography>
                    {/* Chat List */}
                   
                  </Stack>
                </SimpleBarStyle>

                </Stack>

            </Stack>

        </Box>
    );
};

export default Chats