import { userNameRegex } from './../../core/constants/regex';
import { phoneRegex, passwordRegex, emailRegex } from 'src/core/constants';
import { IRegistrationSchema } from './types';
import * as yup from 'yup'

export const registrationSchema: yup.SchemaOf<IRegistrationSchema> = yup.object({
    userName: yup.string().trim().matches(userNameRegex, {
        message: 'username should be at least 3 characters, at least 1 digit, 1 uppercase letter, 1 lowercase letter'
    }).required().nullable(false),
    phoneNumber: yup.string().matches(phoneRegex, {
        message: 'incorrect phone number'
    }).required().nullable(false),
    email: yup.string().email().required().matches(emailRegex, {
        message: 'incorrect email'
    }).nullable(false),
    password: yup.string().required().matches(passwordRegex, {
        message: 'error'
    }).nullable(false),
})