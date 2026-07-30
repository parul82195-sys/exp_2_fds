import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../features/posts/postsSlice';
import '../styles/PostForm.css';

const PostForm = () => {
  const dispatch = useDispatch();
  const platforms = useSelector((state) => state.platforms.items);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    platform: 'Twitter',
    author: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      alert('Please fill in all fields');
      return;
    }

    dispatch(addPost({
      title: formData.title,
      content: formData.content,
      platform: formData.platform,
      author: formData.author,
    }));

    // Reset form
    setFormData({
      title: '',
      content: '',
      platform: 'Twitter',
      author: '',
    });

    alert('Post created successfully!');
  };

  return (
    <div className="post-form-container">
      <div className="form-header">
        <h2>What's on your mind?</h2>
      </div>
      
      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="author">Author Name</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Post Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What's the title of your post?"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Post Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your post content here..."
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="platform">Select Platform</label>
          <select
            id="platform"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
          >
            {platforms.length > 0 ? (
              platforms.map((platform) => (
                <option key={platform.id} value={platform.name}>
                  {platform.name}
                </option>
              ))
            ) : (
              <>
                <option value="Twitter">Twitter</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
              </>
            )}
          </select>
        </div>

        <button type="submit" className="btn-submit">
          Post Now
        </button>
      </form>
    </div>
  );
};

export default PostForm;
