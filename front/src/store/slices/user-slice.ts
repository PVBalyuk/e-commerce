import { getUserStatus } from 'src/core/api/api-modules/user-api';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface IUserState {
    isAuthenticated: boolean;
    isAdmin: boolean;
    isLoading: boolean;
    email: string;
}

export const getUserStatuses = createAsyncThunk(
    'users/checkStatuses', async () => {
        const response = await getUserStatus();

        return response
    })

const initialState: IUserState = {
    isAuthenticated: false,
    isAdmin: false,
    isLoading: false,
    email: 'guest',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: { 
        authorize(state, {payload}) {
            state.isAuthenticated = true;
            state.email = payload.email;
            state.isAdmin = payload.isAdmin;
        },
        unauthorize(state) {
            state.isAuthenticated = false
            state.email = 'guest';
            state.isAdmin = false;
            state.isLoading = false;
        }
    },
    extraReducers(builder) {
        builder.addCase(getUserStatuses.fulfilled, (state, { payload}) => {
            state.isLoading = false;
            state.isAdmin = payload.isAdmin;
            state.isAuthenticated = payload.isAuthed || false;
            state.email = payload.email || 'Anonim';
        });
        builder.addCase(getUserStatuses.pending, (state, {payload}) => {
            state.isLoading = true;
        });
        builder.addCase(getUserStatuses.rejected, (state, { payload}) => {
            state.isLoading = false;
            state.isLoading = false;
            state.isAuthenticated = false;
            state.email = '';
        });
    },
    
})

export const { authorize, unauthorize } = userSlice.actions

export default userSlice.reducer