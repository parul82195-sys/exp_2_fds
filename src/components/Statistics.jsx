import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/Statistics.css';

const Statistics = () => {
  const posts = useSelector((state) => state.posts.items);
  const platforms = useSelector((state) => state.platforms.items);

  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.comments, 0);
  const totalShares = posts.reduce((sum, post) => sum + post.shares, 0);
  const totalFollowers = platforms.reduce((sum, platform) => sum + platform.followers, 0);
  const activePlatforms = platforms.filter((p) => p.isActive).length;

  return (
    <div className="statistics-container">
      <div className="statistics-header">
        <h2>Dashboard Stats</h2>
      </div>

      <div className="stats-grid">
        <div className="stat-card posts">
          <div className="stat-icon">📝</div>
          <div className="stat-info">
            <span className="stat-label">Posts</span>
            <span className="stat-value">{posts.length}</span>
          </div>
        </div>

        <div className="stat-card platforms">
          <div className="stat-icon">🌐</div>
          <div className="stat-info">
            <span className="stat-label">Platforms</span>
            <span className="stat-value">{platforms.length}</span>
          </div>
        </div>

        <div className="stat-card active-platforms">
          <div className="stat-icon">✓</div>
          <div className="stat-info">
            <span className="stat-label">Active</span>
            <span className="stat-value">{activePlatforms}</span>
          </div>
        </div>

        <div className="stat-card likes">
          <div className="stat-icon">♥</div>
          <div className="stat-info">
            <span className="stat-label">Likes</span>
            <span className="stat-value">{totalLikes}</span>
          </div>
        </div>

        <div className="stat-card comments">
          <div className="stat-icon">💬</div>
          <div className="stat-info">
            <span className="stat-label">Comments</span>
            <span className="stat-value">{totalComments}</span>
          </div>
        </div>

        <div className="stat-card shares">
          <div className="stat-icon">↗</div>
          <div className="stat-info">
            <span className="stat-label">Shares</span>
            <span className="stat-value">{totalShares}</span>
          </div>
        </div>

        <div className="stat-card engagement">
          <div className="stat-icon">⚡</div>
          <div className="stat-info">
            <span className="stat-label">Engagement</span>
            <span className="stat-value">{totalLikes + totalComments + totalShares}</span>
          </div>
        </div>

        <div className="stat-card followers">
          <div className="stat-icon">👤</div>
          <div className="stat-info">
            <span className="stat-label">Followers</span>
            <span className="stat-value">
              {totalFollowers >= 1000000
                ? (totalFollowers / 1000000).toFixed(1) + 'M'
                : totalFollowers >= 1000
                ? (totalFollowers / 1000).toFixed(1) + 'K'
                : totalFollowers}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
