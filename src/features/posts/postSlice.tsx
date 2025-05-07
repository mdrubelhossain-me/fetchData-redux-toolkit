import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the Post interface to describe the shape of a post object
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Define the state structure for the posts slice
interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

// Initial state for the posts slice
const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

// Async thunk to fetch posts from an external API
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data; // Return the posts data
});

// Create the posts slice
const postSlice = createSlice({
  name: "posts", // Name of the slice
  initialState,
  reducers: {}, // No synchronous reducers in this slice

  // Handle lifecycle actions for the async thunk (pending, fulfilled, rejected)
  extraReducers: (builder) => {
    builder
      // When the fetchPosts action is dispatched and pending
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // When the fetchPosts action is fulfilled with data
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      // When the fetchPosts action is rejected due to an error
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
        state.posts = [];
      });
  },
});

// Export the reducer to be included in the store
export default postSlice.reducer;
