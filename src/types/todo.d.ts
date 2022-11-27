export interface ITodo {
    id: string
    name: string
    userId?: string
    isFinish?: boolean
    updatedAt?: string
    createdAt?: string
}

export interface ITodoCreate extends ITodo {
    id?: string
    name: string
}

export type ITodoUpdate = ITodo
