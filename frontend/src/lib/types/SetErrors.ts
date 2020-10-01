import { FormikErrors } from 'formik';

export type SetErrors<T> = (errors: FormikErrors<T>) => void;
