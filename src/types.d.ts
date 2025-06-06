export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    userId: string;
}

export interface NewTodo extends Omit<Todo, 'id'> { }

export interface User {
    userId: string;
    userName: string;
    email: string;
}

export interface NewUser extends Omit<User, 'id'> { }