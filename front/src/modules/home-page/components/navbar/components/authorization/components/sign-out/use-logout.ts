import { showNotification } from 'src/store/slices/notification-slice';
import { unauthorize } from 'src/store/slices/user-slice';
import { useAppDispatch } from 'src/store/hooks';
import { MutationKey } from 'src/core/constants/mutation-keys';
import { useMutation, UseMutationResult } from 'react-query';
import { logout } from 'src/core/api/api-modules/user-api';


export const useLogout = (): UseMutationResult<void, any, void> => {
    const dispatch = useAppDispatch();

    return useMutation({
        mutationKey: MutationKey.LOGOUT,
        mutationFn: async () => await logout(),
        onSuccess: () => {
            dispatch(unauthorize());
            dispatch(showNotification({
                message: 'Logged out',
                type: 'success',
                timeInspiration: 2000,
            }));
            localStorage.removeItem('token')
        },
        onError: (e) => {
            if (e.response.status === 401) {
                dispatch(unauthorize());
                dispatch(showNotification({
                message: 'Logged out',
                type: 'success',
                timeInspiration: 2000,
            }));
            localStorage.removeItem('token')
            return;
            }
        }
        
    })
}