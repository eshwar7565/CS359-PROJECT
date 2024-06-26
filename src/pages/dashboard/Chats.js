import React, {useEffect} from 'react';
import {
    Box,
    Divider,
    IconButton,
    Stack,
    Typography
} from '@mui/material';
import { Users } from 'phosphor-react';
// import { SimpleBarStyle } from '../../components/Scrollbar';
import { useTheme } from "@mui/material/styles";
// import useResponsive from "../../hooks/useResponsive";
// import BottomNav from "../../layouts/dashboard/BottomNav";
// import { ChatList } from "../../data";
import ChatElement from "../../components/ChatElement";
// import {
//     Search,
//     SearchIconWrapper,
//     StyledInputBase,
// } from "../../components/Search";
import Friends from '../../sections/main/Friends';
import { socket } from "../../socket";
import { useDispatch, useSelector } from 'react-redux';
import { FetchDirectConversations } from '../../redux/slices/conversation';
import { useState } from 'react';
const user_id = window.localStorage.getItem("user_id");

const Chats = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const {conversations} = useSelector((state) => state.conversation.direct_chat);
    useEffect(() =>
    {
        socket.emit("get_direct_conversations", { user_id }, (data) => 
    {
      dispatch(FetchDirectConversations({ conversations: data }));});}, [dispatch]);
      const [openDialog, setOpenDialog] = useState(false);
      const handleCloseDialog = () => {setOpenDialog(false);};
      const handleOpenDialog = () => { setOpenDialog(true);};
    return (
        <>
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
                <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
                    <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
                        <Typography variant='h5'>
                            Chats
                        </Typography>
                        <Stack direction="row"
                            alignItems="center"
                            spacing={1}>
                            <IconButton onClick={
                                () => {
                                    handleOpenDialog();
                                }
                            }>
                                <Users />
                            </IconButton>
                        </Stack>
                    </Stack>
                    <Stack spacing={1}>
                        <Divider />
                    </Stack>
                    <Stack sx={{ flexGrow: 1, height: "100%" }}>
                        <Stack spacing={2.4}>
                           { /*<Typography variant="subtitle2" sx={{ color: "#676667" }}>
                                Pinned
                            </Typography>

                            {ChatList.filter((el) => el.pinned).map((el, idx) => {
                                return <ChatElement {...el} />;
                            })} */
                        }
                            <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                                All Chats
                            </Typography>
                            {/* Chat List */}
                            {conversations.filter((el) => !el.pinned).map((el, idx) => {
                                return <ChatElement {...el} />;
                            })}
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
            {openDialog && (
                <Friends open={openDialog} handleClose={handleCloseDialog} />
            )}
        </>
    );
};
export default Chats
