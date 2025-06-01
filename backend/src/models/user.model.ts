export interface User {
    id?: number;
    phone: string;
    name?: string;
    email?: string;
    blood_group?: string;
    age?: number;
    created_at?: string;
}

export interface UserCreateDTO {
    phone: string;
    name?: string;
    email?: string;
    blood_group?: string;
    age?: number;
}

export interface UserUpdateDTO {
    name?: string;
    email?: string;
    blood_group?: string;
    age?: number;
}
