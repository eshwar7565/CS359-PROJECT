import React , { useEffect } from 'react';

import { Dialog,
    DialogContent,
    DialogTitle,
    Slide,
    Stack, 
} from '@mui/material';



import { CallElement } from '../../components/CallElement';
// import { CallList } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllUsers } from "../../redux/slices/app";
import {faker} from "@faker-js/faker";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const StartCall = ({ open, handleClose }) => {
    const {all_users} = useSelector((state) => state.app);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(FetchAllUsers());
    }, [dispatch]);

    // console.log(CallList, all_users, "Call List Info");

    const list = all_users.map((el) => ({
        id: el?._id,
        name: el?.firstName ,
        avatar : faker.image.avatar() ,
   
      }));
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
            <DialogTitle>{"Start New Conversation"}</DialogTitle>

            <DialogContent>
                <Stack sx={{ height: "100%" }}>
            
                    <Stack spacing={2.4}>
                    
                        {list.map((el) => { // changing this to list will trigger the for users
                            return <CallElement  {...el} handleClose={handleClose} />;
                        })}
                    </Stack>
                </Stack>
            </DialogContent>

        </Dialog>
    )
}

export default StartCall
