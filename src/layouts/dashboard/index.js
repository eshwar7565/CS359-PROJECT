import React , {useEffect} from "react";
import { Navigate,Outlet } from "react-router-dom";
import { Stack } from "@mui/material";


import  Sidebar  from "./Sidebar";
import {   useDispatch, useSelector } from "react-redux";


import {FetchUserProfile , SelectConversation, showSnackbar } from "../../redux/slices/app";
import { connectSocket, socket } from "../../socket";
import {
  AddDirectMessage, 
  AddDirectConversation,
  UpdateDirectConversation 
} from "../../redux/slices/conversation";

import AudioCallNotification from "../../sections/dashboard/Audio/AudioCallNotification";

import {
  PushToAudioCallQueue,
  UpdateAudioCallDialog,
} from "../../redux/slices/audioCall";

import AudioCallDialog from "../../sections/dashboard/Audio/AudioCallDialog";

// TODO  video calls 

const DashboardLayout = () => {

  const dispatch = useDispatch();
 
  const {user_id} = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);

  // TO DO audio and video calls 
 
  const { open_audio_notification_dialog, open_audio_dialog } = useSelector(
    (state) => state.audioCall
  );


  const { conversations, current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );
  

  // Use effect and get fetch user profile need to done

  useEffect(() => {
    dispatch(FetchUserProfile());
  }, []);
  

  const handleCloseAudioDialog = () => {
    dispatch(UpdateAudioCallDialog({ state: false }));
  };

  // const handleCloseVideoDialog = () => {
  //   dispatch(UpdateVideoCallDialog({ state: false }));
  // };


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
      window.onload();
      if(!socket)
      {
        connectSocket(user_id);
      }

      socket.on("audio_call_notification", (data) => {
        // TODO => dispatch an action to add this in call_queue
        dispatch(PushToAudioCallQueue(data));
      });
      
      // socket.on("video_call_notification", (data) => {
      //   // TODO => dispatch an action to add this in call_queue
      //   dispatch(PushToVideoCallQueue(data));
      // });
      

      socket.on("new_message", (data) => {
        const message = data.message;
        console.log(current_conversation, data);
        // check if msg we got is from currently selected conversation
        if (current_conversation?.id === data.conversation_id) {
          dispatch(
            AddDirectMessage({
              id: message._id,
              type: "msg",
              subtype: message.type,
              message: message.text,
              incoming: message.to === user_id,
              outgoing: message.from === user_id,
            })
          );
        }
      });
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
      });
    }

    return () =>
    {
      socket.off("new_friend_request");
      socket.off("request_accepted");
      socket.off("request_sent");
      socket?.off("start_chat");
      socket?.off("new_message");
      socket?.off("audio_call_notification");
    };

  }, [conversations,current_conversation,dispatch,user_id,isLoggedIn,socket]) ;


  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  
  return (
    <>
    <Stack direction="row">

      <Sidebar/>
     
      <Outlet />
    </Stack>

    {open_audio_notification_dialog && (
      <AudioCallNotification open={open_audio_notification_dialog} />
    )}

    {open_audio_dialog && (
      <AudioCallDialog
        open={open_audio_dialog}
        handleClose={handleCloseAudioDialog}
      />
    )}

    
    </>
  );
};

export default DashboardLayout;
