import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./postSlice";
import type { RootState, AppDispatch } from "../../apps/store";
import type { Post } from "./postSlice";

const PostView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, posts } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <h1>Posts</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
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
        !loading && <p>No posts available</p>
      )}
      <button onClick={() => dispatch(fetchPosts())}>Refresh</button>
    </div>
  );
};

export default PostView;
