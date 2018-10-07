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
    isLiked: boolean;
    likeMessage: string;
    dislikeMessage: string;
    cardDate: string;
    cardInfo: any;
    votes: Vote;
}

export interface Vote {
    id: number;
    boardMember: BoardMember;
    isLiked: boolean;
}

export interface EmailValidation {
    isValid: boolean;
    invalidStr: string;
    emailList: Array<string>;
}

export interface BoardMember {
    id: number;
    name: string;
    abbreviation: string;
    firstName: string;
    lastName: string;
    fullName: string;
    emailAddress: string;
    isBoardOwner: string;
    isActive: string;
    canContribute: boolean;
    mailSentSuccess: boolean;
}


