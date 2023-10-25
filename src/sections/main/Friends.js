import React, { useEffect } from 'react'

import { Dialog,DialogContent, Tab, Stack, Tabs, Slide } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";


import {
  FetchFriends,
    // FetchFriendRequests,
    // FetchFriends,
    // FetchUsers,
  } from "../../redux/slices/app";

  import { FriendElement, 
    // FriendRequestElement, UserElement 
  } from "../../components/Friends";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



 


 



const Friends = ({ open, handleClose }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            sx={{ p: 4 }}
        >

            <Stack p={2} sx={{ width: "100%" }}>
                <Tabs value={value} onChange={handleChange} centered>
                 
                    <Tab label="Friends" />
              
                </Tabs>
            </Stack>

            <DialogContent>
                <Stack sx={{ height: "100%" }}>
                    <Stack spacing={2.4}>
                        {(() => {
                            

                                // case 1: // display friends in this list
                                    return <FriendsList />;

                          
                        })()}
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default Friends;


const FriendsList = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(FetchFriends());
  });

  return (
    <>
      {users.map((el, idx) => {
        return <FriendElement key={idx} {...el} />;
      })}
    </>
  );
};