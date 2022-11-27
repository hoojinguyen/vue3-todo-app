import type { ITodo, ITodoCreate, ITodoUpdate } from "@/types"
import { createRecord, deleteRecord, query, updateRecord } from "thin-backend"
import { useQuery } from "thin-backend-vue"
import { ref, type Ref } from "vue"

export interface IUseTodo {
    todos: Ref<ITodo[] | null>
    isLoading: Ref<boolean>
    add: (todo: ITodoCreate) => Promise<void>
    update: (todo: ITodoUpdate) => Promise<void>
    deleteById: (id: string) => Promise<void>
    //   deleteByIds?: (ids: string[]) => Promise<void>;
}

export function useTodoThinBackend(): IUseTodo {
    const isLoading = ref(false)
    const todos = useQuery(query("todos").orderBy("createdAt"))

    const add = async (todo: ITodoCreate) => {
        isLoading.value = true

        if (!todo.name) return
        await createRecord("todos", { name: todo.name })

        isLoading.value = false
    }

    const update = async (todo: ITodoUpdate) => {
        isLoading.value = true

        updateRecord("todos", todo.id, {
            name: todo.name,
            isFinish: todo.isFinish,
        })

        isLoading.value = false
    }

    const deleteById = async (id: string) => {
        isLoading.value = true

        await deleteRecord("todos", id)

        isLoading.value = false
    }

    return {
        todos,
        isLoading,
        add,
        update,
        deleteById,
    }
}
