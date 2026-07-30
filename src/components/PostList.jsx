import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../features/posts/postsSlice';
import PostCard from './PostCard';
import '../styles/PostList.css';

const PostList = () => {
  const dispatch = useDispatch();
  const { items: posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    // Fetch posts when component mounts
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="posts-container">
        <div className="loading">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="posts-container">
        <div className="error">Error loading posts: {error}</div>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h2>Posts Feed</h2>
        <p className="posts-count">{posts.length} posts so far</p>
      </div>
      
      {posts.length === 0 ? (
        <div className="empty-state">
          <p>No posts yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
