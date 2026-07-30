import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API call - simulating fetching posts
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
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
        ]);
      }, 500);
    });
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  filter: 'all',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Add a new post
    addPost: (state, action) => {
      const newPost = {
        id: state.items.length > 0 ? Math.max(...state.items.map(p => p.id)) + 1 : 1,
        ...action.payload,
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: new Date().toISOString(),
        liked: false,
      };
      state.items.push(newPost);
    },

    // Remove a post
    removePost: (state, action) => {
      state.items = state.items.filter(post => post.id !== action.payload);
    },

    // Update a post
    updatePost: (state, action) => {
      const { id, updates } = action.payload;
      const post = state.items.find(p => p.id === id);
      if (post) {
        Object.assign(post, updates);
      }
    },

    // Toggle like on a post
    toggleLike: (state, action) => {
      const post = state.items.find(p => p.id === action.payload);
      if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
      }
    },

    // Increment comment count
    incrementComments: (state, action) => {
      const post = state.items.find(p => p.id === action.payload);
      if (post) {
        post.comments += 1;
      }
    },

    // Set filter
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  addPost,
  removePost,
  updatePost,
  toggleLike,
  incrementComments,
  setFilter,
} = postsSlice.actions;

export default postsSlice.reducer;
