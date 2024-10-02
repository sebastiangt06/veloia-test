export interface Person{
    id: number;
    fullName: string;
    age: number;
    abilities: string[];
}

export interface Task{
    id: number;
    date: string;
    title: string;
    completed: boolean;
    persons: Person [];
}