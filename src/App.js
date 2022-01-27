import React, { useState, useEffect } from "react";

import sanityClient from "./client";

const App = () => {
  const [postsState, setPostsState] = useState([]);
  const [contributorsState, setContributorsState] = useState([]);

  const fetchPostsFromSanity = async () => {
    try {
      const posts = await sanityClient.fetch(`*[_type == "post"]`);
      setPostsState(posts);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchContributorsFromSanity = async () => {
    try {
      const contributors = await sanityClient.fetch(
        `*[_type == "contributor"] {
          name,
          profilePicture
        }`
      );
      setContributorsState(contributors);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPostsFromSanity();
    fetchContributorsFromSanity();
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
      <h1>CONTRIBUTORS (custom schema test)</h1>
      {contributorsState.map((contributor) => {
        return (
          <div key={contributor._id}>
            <div>{contributor.name}</div>
            <div>
              <img src={contributor.profilePicture._upload.previewImage} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
