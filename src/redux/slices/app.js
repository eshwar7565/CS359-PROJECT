import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";



const initialState = {
user:{},
  sideBar: {
    open: false,
    type: "CONTACT", // can be CONTACT, STARRED, SHARED
  },

  isLoggedIn: true,
  tab: 0, // [0, 1, 2, 3]
  snackbar: {
    open: 0,
    severity: null,
    message: null,
  },

  users:[],
  friends : [] ,
  friendRequests:[],
  chat_type: null,
  room_id: null,


}


const slice = createSlice({

  name: "app",
  initialState,

  reducers: {
    fetchUser(state, action) {
      state.user = action.payload.user;
    },
    updateUser(state, action) {
      state.user = action.payload.user;
    },

    toggleSideBar(state) {
      state.sideBar.open = !state.sideBar.open;
    },

    updateSideBarType(state, action) {
      state.sideBar.type = action.payload.type;
    },
    updateTab(state, action) {
      state.tab = action.payload.tab;
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

    updateUsers(state,action)
    {
      state.users = action.payload.users ;

    },
    updateFriends(state,action)
    {
      state.users = action.payload.friends ;
      
    },
    updateFriendRequests(state,action)
    {
      state.users = action.payload.request ;
      
    },
    selectConversation(state, action) {
      state.chat_type = "individual";
      state.room_id = action.payload.room_id;
    },

    
    

  }


})

export default slice.reducer;

export const closeSnackBar = () => async (dispatch, getState) => {
  dispatch(slice.actions.closeSnackBar());
};



export function showSnackbar({ severity, message }) {

  return async (dispatch, getState) => {
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
}

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

export function UpdateTab(tab) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateTab(tab));
  };
}

export function FetchUsers() {
  return async (dispatch, getState) => {
    await axios
      .get(
        "/user/get-users",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        dispatch(slice.actions.updateUsers({ users: response.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function FetchAllUsers() {
  return async (dispatch, getState) => {
    await axios
      .get(
        "/user/get-all-verified-users",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.updateAllUsers({ users: response.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function FetchFriends() {
  return async (dispatch, getState) => {
    await axios
      .get(
        "/user/get-friends",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        dispatch(slice.actions.updateFriends({ friends: response.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function FetchFriendRequests() {
  return async (dispatch, getState) => {
    await axios
      .get(
        "/user/get-requests",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.updateFriendRequests({ requests: response.data.data })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export const SelectConversation = ({ room_id }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.selectConversation({ room_id }));
  };
};

export const FetchUserProfile = () => {
  return async (dispatch, getState) => {
    axios
      .get("/user/get-me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.fetchUser({ user: response.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const UpdateUserProfile = (formValues) => {
  return async (dispatch, getState) => {
    // Assuming your server API endpoint for updating the user profile is /update-profile
    const apiUrl = '/user/update-me';

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        // If needed, dispatch an action to handle a successful update
        // dispatch(updateUserProfileSuccessAction());
      } else {
        // If the update fails, you might want to handle the error
        console.error('Update failed:', response.statusText);
        // dispatch(updateUserProfileFailureAction(response.statusText));
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Update error:', error);
      // dispatch(updateUserProfileFailureAction('Failed to update profile'));
    }
  };
};

