import type { ITodo, ITodoCreate, ITodoUpdate } from "@/types";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

import { Storage, uuid } from "@/utils";

const storage = new Storage<ITodo[]>("todos", "sessionStorage");
export interface IUseTodoStore {
  todos: Ref<ITodo[]>;
  add: (todo: ITodoCreate) => void;
  update: (todo: ITodoUpdate) => void;
  deleteById: (id: string) => void;
}

export const useTodoStore = defineStore("todo", () => {
  const getDataFromStorage = () => storage.get();
  const setDataForStorage = (data: ITodo[]) => storage.set(data);

  const todos = ref<ITodo[]>(getDataFromStorage() || []);

  const add = (todo: ITodoCreate) => {
    todos.value.push({ ...todo, id: uuid() });
    setDataForStorage(todos.value);
  };

  const update = (todo: ITodoUpdate) => {
    const index = todos.value.findIndex((item) => item.id === todo.id);
    if (index !== -1) {
      todos.value[index] = todo;
      setDataForStorage(todos.value);
    }
  };

  const deleteById = (id: string) => {
    todos.value.splice(
      todos.value.findIndex((item) => item.id === id),
      1
    );
    setDataForStorage(todos.value);
  };

  return { todos, add, update, deleteById };
});
