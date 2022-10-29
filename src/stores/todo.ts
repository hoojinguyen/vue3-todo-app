import { ref } from "vue";
import { defineStore } from "pinia";

export type TodoItem = {
  id: string;
  name: string;
  descripton: string;
};

export type TodoList = TodoItem[];

export const useTodoStore = defineStore("todo", () => {
  const list = ref<TodoList>([]);

  const add = (item: TodoItem) => list.value.push(item);

  const remove = (id: string) =>
    list.value.splice(
      list.value.findIndex((item) => item.id === id),
      1
    );

  const update = (itemUpdated: TodoItem) => {
    const index = list.value.findIndex((item) => item.id === itemUpdated.id);
    if (index !== -1) {
      list.value[index] = itemUpdated;
    }
  };

  return { list, add, remove, update };
});
