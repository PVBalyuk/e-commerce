import { IRegistrationSchema } from 'src/components/registration-form/types';
import { api } from '../api'
import { API_ENDPOINTS } from './api-endpoints'
import { ILoginSchema } from 'src/components/login-form/types';

export const register = async (data: IRegistrationSchema): Promise<any> => {
    const response = await api.post(API_ENDPOINTS.USER_ENDPOINTS.REGISTRATION, data);

    return response.data
}

export const login = async (data: ILoginSchema): Promise<any> => {
    const response = await api.post(API_ENDPOINTS.USER_ENDPOINTS.LOGIN, data);
    return response.data
}

export const logout = async (): Promise<any> => {
    await api.post(API_ENDPOINTS.USER_ENDPOINTS.LOGOUT);
}

export const getUserStatus = async (): Promise<any> =>  {
    const response = await api.get(API_ENDPOINTS.USER_ENDPOINTS.ADMIN_STATUS)
    return response.data
}
