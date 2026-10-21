import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";
import {
  CreatePost,
  getFeed,
  likePost,
  unlikePost,
} from "../services/post.api";

export const usePosts = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, post, setPost, feed, setFeed } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.posts);
    setLoading(false);
  };

  const handlePostCreate = async (imageFile, caption) => {
    setLoading(true);
    const data = await CreatePost(imageFile, caption);
    setFeed([data.post, ...feed]);
    setLoading(false);
  };

  const handleLike = async (postId) => {
    const data = await likePost(postId);
    handleGetFeed();
  };

  const handleUnlike = async (postId) => {
    const data = await unlikePost(postId);
    handleGetFeed();
  };

  useEffect(() => {
    handleGetFeed();
  }, []);

  return {
    feed,
    loading,
    handleGetFeed,
    handlePostCreate,
    handleLike,
    handleUnlike,
  };
};
