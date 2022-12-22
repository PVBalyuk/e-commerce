import { createSlice } from "@reduxjs/toolkit"

interface IPayloadBody {
    message: string;
    type: 'success' | 'danger';
    timeInspiration: number;
}

interface IPayload {
    payload: IPayloadBody;
    type: any;
}

interface INotificationState {
    isVisible: boolean;
    message: string;
    type: 'success' | 'danger';
    timeInspiration: number;
}

const initialState: INotificationState = {
    isVisible: false,
    message: '',
    type: 'success',
    timeInspiration: 10000,
}

const notificationSlice = createSlice({
    name: 'user',
    initialState,
    reducers: { 
        showNotification(state, payload: IPayload) {
            state.isVisible = true;
            state.message = payload.payload.message;
            state.type = payload.payload.type;
            state.timeInspiration = payload.payload.timeInspiration

        },
        hideNotification(state) {
            state.isVisible = false;
            state.message = '';
        }
    }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export default notificationSlice.reducer