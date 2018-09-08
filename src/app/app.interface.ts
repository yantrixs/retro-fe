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
    name: string;
    description: string;
    imageName: string;
    cardCategories: Array<CardCategory>;
}

export interface CardCategory {
    name: string;
    description: string;
    color: string;
}
