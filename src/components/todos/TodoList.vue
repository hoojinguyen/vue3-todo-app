<template>
  <div class="todo-list">
    <ol class="list-decimal" v-for="item in todoStore.list" :key="item.id">
      <li>
        <strong>ID: {{ item.id }}</strong>
        <h3>NAME: {{ item.name }}</h3>
        <button @click="remoteTodo(item.id)">Remove</button>
        <button @click="$emit('edit', item)">Edit</button>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore, type TodoItem } from "@/stores/todo";

defineEmits<{
  (e: "edit", value: TodoItem): void;
}>();

const todoStore = useTodoStore();

const remoteTodo = (id: string) => {
  todoStore.remove(id);
};
</script>

<style scoped>
.todo-list {
  margin-top: 30px;
}

button {
  border: 1px solid black;
  padding: 5px;
  font-weight: bold;
}

li {
  display: flex;
  flex-direction: column;
  gap: 15px;

  margin-bottom: 20px;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 10px;

  cursor: pointer;
}

li:hover {
  border: 1px solid red;
}
</style>
