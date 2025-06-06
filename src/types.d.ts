export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    userId: string;
}

export interface NewTodo extends Omit<Todo, 'id'> { }

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface NewUser extends Omit<User, 'id'> { }
export interface NoSencitiveUser extends Omit<User, 'password'> { }