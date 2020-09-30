import { UserResponse, RegisterUser } from '../types';

export function registerValidation({ input }: RegisterUser) {
    let response: UserResponse = {};

    if (input.username.length <= 2) {
        response = {
            errors: [
                {
                    field: 'username',
                    message: 'username should be at least 2 characters',
                },
            ],
        };
    }

    if (!input.email.includes('@')) {
        response = {
            errors: [
                {
                    field: 'email',
                    message: 'email is not an valid email',
                },
            ],
        };
    }

    if (input.password.length <= 3) {
        response = {
            errors: [
                {
                    field: 'password',
                    message: 'password should be at least 3 characters',
                },
            ],
        };
    }

    return response;
}
