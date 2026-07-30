import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API call - simulating fetching platforms
export const fetchPlatforms = createAsyncThunk(
  'platforms/fetchPlatforms',
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
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
        ]);
      }, 500);
    });
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  selectedPlatform: null,
};

const platformsSlice = createSlice({
  name: 'platforms',
  initialState,
  reducers: {
    // Add a new platform
    addPlatform: (state, action) => {
      const newPlatform = {
        id: state.items.length > 0 ? Math.max(...state.items.map(p => p.id)) + 1 : 1,
        ...action.payload,
        isActive: false,
        followers: 0,
      };
      state.items.push(newPlatform);
    },

    // Remove a platform
    removePlatform: (state, action) => {
      state.items = state.items.filter(platform => platform.id !== action.payload);
    },

    // Toggle platform active status
    togglePlatformStatus: (state, action) => {
      const platform = state.items.find(p => p.id === action.payload);
      if (platform) {
        platform.isActive = !platform.isActive;
      }
    },

    // Update platform followers
    updateFollowers: (state, action) => {
      const { id, followers } = action.payload;
      const platform = state.items.find(p => p.id === id);
      if (platform) {
        platform.followers = followers;
      }
    },

    // Select platform
    selectPlatform: (state, action) => {
      state.selectedPlatform = action.payload;
    },

    // Deselect platform
    deselectPlatform: (state) => {
      state.selectedPlatform = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlatforms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlatforms.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPlatforms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  addPlatform,
  removePlatform,
  togglePlatformStatus,
  updateFollowers,
  selectPlatform,
  deselectPlatform,
} = platformsSlice.actions;

export default platformsSlice.reducer;
