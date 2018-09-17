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

export interface Template {
    code: string;
    name: string;
    description: string;
    imageName: string;
    categories: Array<CardCategory>;
}

export interface CardCategory {
    name: string;
    description: string;
    color: string;
}

export interface UserBoard {
    title: string;
    categories: Array<CardCategory>;
}
