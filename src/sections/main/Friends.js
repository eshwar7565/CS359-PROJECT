import React from 'react'

import { Dialog,Tab,Stack,Tabs,Slide} from '@mui/material';


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
      <Tab label="Explore" />
      <Tab label="Friends" />
      <Tab label="Requests" />
    </Tabs>
  </Stack>
    </Dialog>
  )
}

export default Friends
