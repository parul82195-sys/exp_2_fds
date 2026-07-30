import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlatforms } from '../features/platforms/platformsSlice';
import PlatformCard from './PlatformCard';
import '../styles/PlatformList.css';

const PlatformList = () => {
  const dispatch = useDispatch();
  const { items: platforms, loading, error } = useSelector((state) => state.platforms);

  useEffect(() => {
    // Fetch platforms when component mounts
    dispatch(fetchPlatforms());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="platforms-container">
        <div className="loading">Loading platforms...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="platforms-container">
        <div className="error">Error loading platforms: {error}</div>
      </div>
    );
  }

  const activePlatforms = platforms.filter((p) => p.isActive);
  const inactivePlatforms = platforms.filter((p) => !p.isActive);

  return (
    <div className="platforms-container">
      <div className="platforms-header">
        <h2>Social Platforms</h2>
        <div className="platforms-stats">
          <div className="stat-box active">
            <span className="label">Active</span>
            <span className="number">{activePlatforms.length}</span>
          </div>
          <div className="stat-box inactive">
            <span className="label">Inactive</span>
            <span className="number">{inactivePlatforms.length}</span>
          </div>
          <div className="stat-box total">
            <span className="label">Total</span>
            <span className="number">{platforms.length}</span>
          </div>
        </div>
      </div>

      {platforms.length === 0 ? (
        <div className="empty-state">
          <p>No platforms found. Add one to get started!</p>
        </div>
      ) : (
        <>
          {activePlatforms.length > 0 && (
            <div className="platforms-section">
              <h3 className="section-title">Active</h3>
              <div className="platforms-grid">
                {activePlatforms.map((platform) => (
                  <PlatformCard key={platform.id} platform={platform} />
                ))}
              </div>
            </div>
          )}

          {inactivePlatforms.length > 0 && (
            <div className="platforms-section">
              <h3 className="section-title">Inactive</h3>
              <div className="platforms-grid">
                {inactivePlatforms.map((platform) => (
                  <PlatformCard key={platform.id} platform={platform} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PlatformList;
