import { createSlice } from "@reduxjs/toolkit";


// import { dispatch } from '../store';

const initialState = {
   
    sideBar: {
      open: false,
      type: "CONTACT", // can be CONTACT, STARRED, SHARED
    }
}

const slice = createSlice({
    name: "app",
    initialState,

    reducers: {
        toggleSideBar(state) {
            state.sideBar.open = !state.sideBar.open;
          },

          updateSideBarType(state, action) {
            state.sideBar.type = action.payload.type;
          },
          openSnackBar(state, action) {
            console.log(action.payload);
            state.snackbar.open = true;
            state.snackbar.severity = action.payload.severity;
            state.snackbar.message = action.payload.message;
          },
          closeSnackBar(state) {
            console.log("This is getting executed");
            state.snackbar.open = false;
            state.snackbar.message = null;
          },
        }

})

export const closeSnackBar = () => async (dispatch, getState) => {
  dispatch(slice.actions.closeSnackBar());
};



export const showSnackbar =
  ({ severity, message }) =>
  async (dispatch, getState) => {
    dispatch(
      slice.actions.openSnackBar({
        message,
        severity,
      })
    );

    setTimeout(() => {
      dispatch(slice.actions.closeSnackBar());
    }, 4000);
  };


export function ToggleSidebar() {
    return async (dispatch, getState) => {
      dispatch(slice.actions.toggleSideBar());
    };
  }
  export function UpdateSidebarType(type) {
    return async (dispatch, getState) => {
      dispatch(slice.actions.updateSideBarType({ type }));
    };
  }
  
export default slice.reducer;