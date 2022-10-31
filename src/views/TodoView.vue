<template>
  <div class="todo">
    <div class="wrapper">
      <h1 class="text-3xl font-bold underline">This is a todo page</h1>
      <form class="todo-form" @submit.prevent="submitForm">
        <input
          v-model="form.name"
          type="text"
          placeholder="Enter name"
          required
        />
        <input
          v-model="form.descripton"
          placeholder="Enter description"
          type="text"
          required
        />
        <button>
          {{ form.id ? "update" : "create" }}
        </button>
      </form>
      <TodoList
        :list="todoStore.list"
        @remove="removeTodo"
        @update="updateTodo"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore, type TodoItem } from "@/stores/todo";
import { uuid } from "@/utils";
import { ref } from "vue";

import TodoList from "@/components/todos/TodoList.vue";

const todoStore = useTodoStore();

const form = ref<TodoItem>({ id: "", name: "", descripton: "" });

const removeTodo = (id: string) => {
  todoStore.remove(id);
};

const updateTodo = (item: TodoItem) => {
  form.value = { ...item };
};

const submitForm = () => {
  const isUpdate = form.value.id;
  if (isUpdate) {
    todoStore.update(form.value);
  } else {
    todoStore.add({ ...form.value, id: uuid() });
  }

  // reset form
  form.value = { id: "", name: "", descripton: "" };
};
</script>

<style>
@media (min-width: 1024px) {
  .todo {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

  .todo-form {
    margin-top: 30px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  input {
    border: 1px solid black;
    padding: 10px;
  }

  button {
    border: 1px solid black;
    padding: 5px;
    font-weight: bold;
  }
}
</style>
