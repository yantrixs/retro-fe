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

export interface CardInfo {
    id: number;
    boardName: string;
    boardTitle: string;
    cardCategoryName: string;
    memberEmail: string;
    memberName: string;
    memberAbbreviation: string;
    message: string;
    likeCount: number;
    likeMessage: string;
    dislikeCount: string;
    dislikeMessage: string;
    cardDate: string;
}

export interface BoardMember {
    email: string;
    name: string;
}

export interface Votes {
    boardMember: BoardMember;
    id: number;
    isLike: boolean;
}

export interface Vote {
    id: number;
}

export interface EmailValidation {
    isValid: boolean;
    invalidStr: string;
}
