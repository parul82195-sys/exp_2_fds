import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike, removePost, incrementComments } from '../features/posts/postsSlice';
import '../styles/PostCard.css';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(toggleLike(post.id));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(removePost(post.id));
    }
  };

  const handleComment = () => {
    dispatch(incrementComments(post.id));
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-meta">
          <h3 className="post-title">{post.title}</h3>
          <div className="post-info">
            <span className="author">{post.author}</span>
            <span className="platform" style={{ color: '#666' }}>
              • {post.platform}
            </span>
            <span className="date">• {formatDate(post.timestamp)}</span>
          </div>
        </div>
        <button className="btn-delete" onClick={handleDelete} title="Delete post">
          ✕
        </button>
      </div>

      <p className="post-content">{post.content}</p>

      <div className="post-actions">
        <button
          className={`action-btn like-btn ${post.liked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <span className="icon">♥</span>
          <span className="count">{post.likes}</span>
        </button>
        <button className="action-btn comment-btn" onClick={handleComment}>
          <span className="icon">💬</span>
          <span className="count">{post.comments}</span>
        </button>
        <button className="action-btn share-btn">
          <span className="icon">↗</span>
          <span className="count">{post.shares}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
