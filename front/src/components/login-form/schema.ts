import { ILoginSchema } from './types';
import * as yup from 'yup'

export const loginSchema: yup.SchemaOf<ILoginSchema> = yup.object().shape({
    loginName: yup.string().trim().required('login field can\'t be empty').nullable(false),
    password: yup.string().trim().required('password field can\'t be empty').nullable(false),
})