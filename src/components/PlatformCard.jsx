import React from 'react';
import { useDispatch } from 'react-redux';
import { togglePlatformStatus, removePlatform } from '../features/platforms/platformsSlice';
import '../styles/PlatformCard.css';

const PlatformCard = ({ platform }) => {
  const dispatch = useDispatch();

  const handleToggleStatus = () => {
    dispatch(togglePlatformStatus(platform.id));
  };

  const handleDelete = () => {
    if (window.confirm(`Delete ${platform.name}?`)) {
      dispatch(removePlatform(platform.id));
    }
  };

  const formatFollowers = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className={`platform-card ${platform.isActive ? 'active' : 'inactive'}`}>
      <div className="platform-header">
        <div className="platform-icon" style={{ backgroundColor: platform.color }}>
          {platform.icon}
        </div>
        <div className="platform-name-info">
          <h3>{platform.name}</h3>
          <p className="platform-description">{platform.description}</p>
        </div>
      </div>

      <div className="platform-stats">
        <div className="stat">
          <span className="stat-label">Followers</span>
          <span className="stat-value">{formatFollowers(platform.followers)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Status</span>
          <span className={`stat-badge ${platform.isActive ? 'active' : 'inactive'}`}>
            {platform.isActive ? '🟢 Active' : '⚪ Inactive'}
          </span>
        </div>
      </div>

      <div className="platform-actions">
        <button
          className={`action-btn ${platform.isActive ? 'deactivate' : 'activate'}`}
          onClick={handleToggleStatus}
        >
          {platform.isActive ? 'Deactivate' : 'Activate'}
        </button>
        <button className="action-btn delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PlatformCard;
