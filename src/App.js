// routes
// theme
// components
import React from "react";

import ThemeSettings from "./components/settings";
import ThemeProvider from "./theme";
import Router from "./routes";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar , closeSnackBar } from "./redux/slices/app";

const vertical = "bottom";
const horizontal = "center";


const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));


function App() {

  const dispatch = useDispatch();

  // const {  open ,severity, message } = useSelector(
  //   (state) => state.app.snackbar
  // );


  return (

    <>
    <ThemeProvider>
    <ThemeSettings>
      {" "}
      <Router />{" "}
    </ThemeSettings>
  </ThemeProvider>


    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      // open={open} 
      autoHideDuration={4000}
      key={vertical + horizontal}
      onClose={() => {
        console.log("This is clicked");
        dispatch(closeSnackBar());
      }}
    >
      <Alert
        onClose={() => {
          console.log("This is clicked");
          dispatch(closeSnackBar());
        }}
        // severity={severity}
        sx={{ width: "100%" }}
      >
        
      </Alert>
    </Snackbar>

    
    </>
 




  );
}

export default App;