import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import the async thunk to fetch posts
import { fetchPosts } from "./postSlice";

// Import RootState and AppDispatch types from the store for type safety
import type { RootState, AppDispatch } from "../../apps/store";

// Import the Post type for proper typing of the posts array
import type { Post } from "./postSlice";

const PostView: React.FC = () => {
  // Get the dispatch function with the correct AppDispatch type
  const dispatch = useDispatch<AppDispatch>();

  // Extract posts state from the Redux store
  const { loading, error, posts } = useSelector(
    (state: RootState) => state.posts
  );

  // Dispatch fetchPosts once when the component mounts
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <h1>Posts</h1>

      {/* Show loading indicator */}
      {loading && <p>Loading...</p>}

      {/* Show error message if any */}
      {error && <p>{error}</p>}

      {/* Render the list of posts if available */}
      {posts.length > 0 ? (
        <ul>
          {posts.map((post: Post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        // Show this only if not loading and no posts are present
        !loading && <p>No posts available</p>
      )}

      {/* Button to manually refresh posts */}
      <button onClick={() => dispatch(fetchPosts())}>Refresh</button>
    </div>
  );
};

export default PostView;
