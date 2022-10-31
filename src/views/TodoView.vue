<template>
  <div class="todo">
    <div class="wrapper">
      <h1 class="text-3xl font-bold underline">This is a todo page</h1>
      <TodoForm :data="formData" @reset="resetForm" />
      <TodoList @edit="editTodo" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TodoItem } from "@/stores/todo";
import { ref } from "vue";

import TodoForm from "@/components/todos/TodoForm.vue";
import TodoList from "@/components/todos/TodoList.vue";

const initialData = { id: "", name: "", descripton: "" };
const formData = ref<TodoItem>(initialData);

const editTodo = (item: TodoItem) => {
  formData.value = { ...item };
};

const resetForm = () => {
  formData.value = { id: "", name: "", descripton: "" };
};
</script>

<style scoped>
@media (min-width: 1024px) {
  .todo {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
