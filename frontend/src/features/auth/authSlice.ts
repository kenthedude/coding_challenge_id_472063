import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Define the type for the state
interface AuthState {
  token: string | null;
  name: string | null;
  email: string | null;
}

// Define the default values when the state initiates
const initialState: AuthState = {
  token: localStorage.getItem('token'),
  name: null,
  email: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set the JWT token
    setToken: (state, action: PayloadAction<AuthState>) => {
      const { token, name, email } = action.payload;
      state.token = token;
      state.name = name;
      state.email = email;
      localStorage.setItem('token', token as string);
    },
    // Clear the JWT token
    logout: (state) => {
      console.log('logging out');
      state.token = null;
      state.name = null;
      state.email = null;
      localStorage.removeItem('token');
    },
  },
});

// Export actions for dispatching
export const { setToken, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;

