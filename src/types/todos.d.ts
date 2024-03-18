declare module 'todos' {
    export function getTodosController(num: number): void;
}

export interface todoType {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}