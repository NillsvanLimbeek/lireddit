import { FieldError } from './';
import { User } from '../entities';

export interface UserResponse {
    errors?: FieldError[];
    user?: User;
}
