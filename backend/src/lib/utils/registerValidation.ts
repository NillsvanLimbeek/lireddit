import { FieldError } from './../types/FieldError';
import { RegisterUser } from '../types';

export function registerValidation({
    input,
}: RegisterUser): FieldError[] | null {
    if (input.username.length <= 2) {
        return [
            {
                field: 'username',
                message: 'username should be at least 2 characters',
            },
        ];
    }

    if (!input.email.includes('@')) {
        return [
            {
                field: 'email',
                message: 'email is not an valid email',
            },
        ];
    }

    if (input.password.length <= 3) {
        return [
            {
                field: 'password',
                message: 'password should be at least 3 characters',
            },
        ];
    }

    return null;
}
