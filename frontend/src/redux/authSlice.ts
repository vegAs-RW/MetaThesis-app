import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    role: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    role: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ token: string; role: string }>) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.role = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;