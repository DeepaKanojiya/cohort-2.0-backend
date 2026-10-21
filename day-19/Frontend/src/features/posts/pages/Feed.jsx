import React, { useEffect } from "react";
import "./../style/feed.scss";
import Post from "../components/Post";
import { usePosts } from "../hooks/usePosts";
import NavBar from "../../shared/components/NavBar";

function Feed() {
  const { feed, handleGetFeed, loading } = usePosts();
  console.log(feed);

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (
      <main>
        <h1>feed is loading....</h1>
      </main>
    );
  }

  return (
    <>
      <NavBar />
      <main>
        <div className="feed-page">
          <div className="posts">
            {feed.map((posts, index) => {
              return <Post key={index} user={posts.user} post={posts} />;
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default Feed;
