// Mock API Service
// In a real application, these would make actual HTTP requests using axios

export const mockDelay = (ms = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Posts API endpoints
export const postsAPI = {
  getAll: async () => {
    await mockDelay(500);
    return [
      {
        id: 1,
        title: 'My First Post',
        content: 'This is my first post on the social media platform!',
        platform: 'Twitter',
        author: 'John Doe',
        likes: 15,
        comments: 3,
        shares: 2,
        timestamp: new Date().toISOString(),
        liked: false,
      },
      {
        id: 2,
        title: 'Learning Redux',
        content: 'Redux Toolkit makes state management so much easier!',
        platform: 'LinkedIn',
        author: 'Jane Smith',
        likes: 45,
        comments: 8,
        shares: 5,
        timestamp: new Date().toISOString(),
        liked: false,
      },
      {
        id: 3,
        title: 'Web Development Tips',
        content: 'Always remember to keep your code clean and maintainable.',
        platform: 'Facebook',
        author: 'Mike Johnson',
        likes: 28,
        comments: 12,
        shares: 7,
        timestamp: new Date().toISOString(),
        liked: false,
      },
    ];
  },

  getById: async (id) => {
    await mockDelay(300);
    const posts = await postsAPI.getAll();
    return posts.find(p => p.id === id);
  },

  create: async (postData) => {
    await mockDelay(400);
    return {
      id: Math.random() * 1000,
      ...postData,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date().toISOString(),
      liked: false,
    };
  },

  update: async (id, postData) => {
    await mockDelay(400);
    return { id, ...postData };
  },

  delete: async (id) => {
    await mockDelay(300);
    return { success: true, id };
  },
};

// Platforms API endpoints
export const platformsAPI = {
  getAll: async () => {
    await mockDelay(500);
    return [
      {
        id: 1,
        name: 'Twitter',
        icon: '𝕏',
        description: 'Share thoughts in 280 characters',
        followers: 125000,
        isActive: true,
        color: '#1DA1F2',
      },
      {
        id: 2,
        name: 'LinkedIn',
        icon: 'in',
        description: 'Professional networking platform',
        followers: 98000,
        isActive: true,
        color: '#0A66C2',
      },
      {
        id: 3,
        name: 'Facebook',
        icon: 'f',
        description: 'Connect with friends and family',
        followers: 245000,
        isActive: true,
        color: '#1877F2',
      },
      {
        id: 4,
        name: 'Instagram',
        icon: '📷',
        description: 'Share visual stories',
        followers: 187000,
        isActive: false,
        color: '#E4405F',
      },
      {
        id: 5,
        name: 'TikTok',
        icon: '♪',
        description: 'Short-form video platform',
        followers: 156000,
        isActive: false,
        color: '#000000',
      },
    ];
  },

  getById: async (id) => {
    await mockDelay(300);
    const platforms = await platformsAPI.getAll();
    return platforms.find(p => p.id === id);
  },

  create: async (platformData) => {
    await mockDelay(400);
    return {
      id: Math.random() * 1000,
      ...platformData,
      isActive: false,
      followers: 0,
    };
  },

  update: async (id, platformData) => {
    await mockDelay(400);
    return { id, ...platformData };
  },

  delete: async (id) => {
    await mockDelay(300);
    return { success: true, id };
  },
};
