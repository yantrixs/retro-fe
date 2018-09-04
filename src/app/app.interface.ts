export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UserPayload {
    exp: number;
    username: string;
    email: string;
}
