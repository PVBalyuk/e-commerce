import { showNotification } from 'src/store/slices/notification-slice';
import { useAppDispatch } from './../../store/hooks';
import { MutationKey } from 'src/core/constants/mutation-keys';
import { useMutation, UseMutationResult } from 'react-query';
import { ILoginSchema } from './types';
import { login } from 'src/core/api/api-modules/user-api';
import { authorize } from 'src/store/slices/user-slice';

interface IProps {
    closeModal: () => void;
}

export const useLogin = ({closeModal}: IProps): UseMutationResult<any, any, ILoginSchema> => {
    const dispatch = useAppDispatch();
    return useMutation({
        mutationKey: MutationKey.LOGIN,
        mutationFn: async (data) => await login(data),
        onSuccess: (responseData) => {
            localStorage.setItem('token', responseData.tokens.accessToken)
            dispatch(showNotification({
                message: 'Successfully logged in',
                type: 'success',
                timeInspiration: 3000,
            }));
            dispatch(authorize({ email: responseData.email, isAdmin: responseData.isAdmin }))
            closeModal();
        },  
        
    })
}