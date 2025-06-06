export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    userId: string;
}

export interface User {
    id: string;
    userId: string;
    userName: string;
    email: string;
}