import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  events: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setEvents: (state,action) => {
      if(state.user){
      state.events = action.payload.events;
    }else{
      console.log("Nothing present");
    }
    },
    setEvent: (state,action) => {
      const updatedEvents= state.events.map((event) => {
        if (event._id === action.payload.event._id) return action.payload.event;
        return event;
      });
      state.events = updatedEvents;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setEvents, setEvent } =
  authSlice.actions;
export default authSlice.reducer;
