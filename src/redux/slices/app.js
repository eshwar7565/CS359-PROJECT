import { createSlice } from "@reduxjs/toolkit";


import { dispatch } from "../store";

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
        }

})

export default slice.reducer;