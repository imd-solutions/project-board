export interface Auth {
    access_token: string;
    refresh_token: string;
    user: AuthUser;
}

interface AuthUser {
    name: string;
    email: string;
    avatar: string;
}

export interface User {
    name: string;
    email: string;
}

export interface UserSubmit {
    email?: string;
    token?: string;
    username?: string;
    password?: string;
    password_confirmation?: string;
}
export interface Message {
    status: string;
    message: string;
    css?: string;
    title?: string;
}
