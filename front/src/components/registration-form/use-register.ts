import { MutationKey } from 'src/core/constants/mutation-keys';
import { showNotification } from 'src/store/slices/notification-slice';
import { useAppDispatch } from 'src/store/hooks';
import { IRegistrationSchema } from './types';
import { register } from 'src/core/api/api-modules/user-api';
import { useMutation, UseMutationResult } from 'react-query'

interface IProps {
    closeModal: () => void;
}


export const useRegister = ({closeModal}: IProps): UseMutationResult<any, any, IRegistrationSchema> => {
    const dispatch = useAppDispatch();
    return useMutation({
        mutationKey: MutationKey.REGISTER,
        mutationFn: async (data) => await register(data), 
        onSuccess: () => {
            dispatch(showNotification({ message: 'Successful registration', type: 'success', timeInspiration: 5000}))
            closeModal();
        },
        
    })
}