import { createRecord, deleteRecord, query, updateRecord } from "thin-backend";
import { useQuery } from "thin-backend-vue";
import { computed, ref, type Ref } from "vue";

export interface ITodo {
  id: string;
  name: string;
  userId?: string;
  isFinish?: boolean;
  updatedAt?: string;
  createdAt?: string;
}

export interface ITodoCreate {
  name: string;
}

export interface ITodoUpdate extends ITodo {}

export type IStore = "thin-backend" | "localStorage";

export interface IUseTodo {
  store: Ref<IStore>;
  todos: Ref<ITodo[] | null>;
  isLoading: Ref<boolean>;
  switchStore: (store: IStore) => void;
  add: (todo: ITodoCreate) => Promise<void>;
  update: (todo: ITodoUpdate) => Promise<void>;
  deleteById: (id: string) => Promise<void>;
  //   deleteByIds?: (ids: string[]) => Promise<void>;
}

export function useTodo(): IUseTodo {
  const isLoading = ref(false);
  const store = ref<IStore>("thin-backend");
  const todos = useQuery(query("todos").orderBy("createdAt"));

  //   const isLocalStorage = computed(() => store.value === "localStorage");
  const isThinBackedn = computed(() => store.value === "thin-backend");

  const switchStore = (v: IStore) => {
    store.value = v;
  };

  const add = async (todo: ITodoCreate) => {
    isLoading.value = true;

    if (!todo.name) return;
    if (isThinBackedn.value) await createRecord("todos", { name: todo.name });

    isLoading.value = false;
  };

  const update = async (todo: ITodoUpdate) => {
    isLoading.value = true;

    updateRecord("todos", todo.id, {
      name: todo.name,
      isFinish: todo.isFinish,
    });

    isLoading.value = false;
  };

  const deleteById = async (id: string) => {
    isLoading.value = true;

    await deleteRecord("todos", id);

    isLoading.value = false;
  };

  return {
    todos,
    store,
    isLoading,
    switchStore,
    add,
    update,
    deleteById,
  };
}
