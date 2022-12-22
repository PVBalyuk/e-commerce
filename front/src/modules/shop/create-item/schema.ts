import * as yup from 'yup'
import { ICreateItemSchema } from './types'

export const createItemSchema: yup.SchemaOf<ICreateItemSchema> = yup.object().shape({
    description: yup.string().required('can\'t be empty').nullable(false),
    image: yup.mixed(),
    price: yup.string().required('can\'t be empty').nullable(false),
    title: yup.string().required('can\'t be empty').nullable(false),
})