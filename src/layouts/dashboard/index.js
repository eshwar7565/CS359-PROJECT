import React from "react";
import { Navigate,Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import  Sidebar  from "./Sidebar";
import {   useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { connectSocket, socket } from "../../socket";
import { SelectConversation, showSnackbar } from "../../redux/slices/app";
import { AddDirectConversation, UpdateDirectConversation } from "../../redux/slices/conversation";

const DashboardLayout = () => {

  const { isLoggedIn } = useSelector((state) => state.auth);

  const user_id = window.localStorage.getItem("user_id");

  const { conversations, current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const dispatch = useDispatch();
  useEffect(()=>
  {
    if(isLoggedIn )
    {
      window.onload = function () 
      {
        if(!window.location.hash)

        {
          window.location = window.location + '#loaded' ;
          window.location.reload() ;
        }
      }

     

      if(!socket)
      {
        connectSocket(user_id);
      }

      socket.on("start_chat", (data) => 
        {
          console.log(data);
           // add / update to conversation list
          const existing_conversation = conversations.find(
            (el) => el?.id === data._id
          );
          if (existing_conversation) {
            // update direct conversation
            dispatch(UpdateDirectConversation({ conversation: data }));
          } else {
            // add direct conversation
            dispatch(AddDirectConversation({ conversation: data }));
          }
          dispatch(SelectConversation({ room_id: data._id }));
        });

      // new friend request 

      socket.on("new_friend-request" , (data) => 
      {
        dispatch(showSnackbar({severity :"success" , message : data.message})) ;
      })

      //request accepted
      socket.on("request_accepted" , (data) => 
      {
        dispatch(showSnackbar({severity :"success" , message : data.message})) ;
      })

      socket.on("request_sent" , (data) => 
      {
        dispatch(showSnackbar({severity :"success" , message : data.message})) ;
      })


    }

    return () =>
    {
      socket.off("new_friend_request");
      socket.off("request_accepted");
      socket.off("request_sent");
      socket?.off("start_chat");
    }

  },) ;


  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  
  return (
    <Stack direction="row">

      <Sidebar/>
     
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
