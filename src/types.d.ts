export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    userId: string;
}

export interface User {
    id: string;
    userName: string;
    userMail: string;
}