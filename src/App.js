import React, { useState, useEffect } from "react";
import sanityClient from "./client";

const App = () => {
  const [postsState, setPostsState] = useState([]);

  const fetchPostsFromSanity = async () => {
    try {
      const posts = await sanityClient.fetch(`*[_type == "post"]`);
      setPostsState(posts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPostsFromSanity();
  }, []);

  return (
    <div>
      <h1>POSTS</h1>
      {postsState.map((post) => (
        <div
          key={post._id}
          style={{
            marginBottom: "20px",
            border: "2px solid black",
            padding: "10px",
          }}
        >
          <div>{post.title}</div>
          <div>{post._createdAt}</div>
        </div>
      ))}
    </div>
  );
};

export default App;
